"""Make synchronized old/trial comparisons using the exact original audio; never regenerate voice."""
import json
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'out/v43-quality'
ORIGINAL=OUT/'original/video.mp4'
CONFIG=json.loads((ROOT/'experiments/v43-quality/segments.json').read_text())
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def ff(*args):
 subprocess.run(['ffmpeg','-v','error','-y',*map(str,args)],check=True)

panels=[]
for seg in CONFIG['segments']:
 name=seg['slug'];start=seg['start'];duration=seg['duration']
 before=OUT/f'{name}-before.mp4';after=OUT/f'{name}-after.mp4'
 ff('-ss',start,'-i',ORIGINAL,'-t',duration,'-c:v','libx264','-preset','veryfast','-crf','18','-c:a','aac','-b:a','192k','-movflags','+faststart',before)
 ff('-i',OUT/f'{name}-silent.mp4','-ss',start,'-i',ORIGINAL,'-map','0:v:0','-map','1:a:0','-t',duration,
    '-vf','scale=in_range=full:out_range=tv,format=yuv420p','-c:v','libx264','-preset','veryfast','-crf','18','-af','afade=t=out:st=14.92:d=0.08','-c:a','aac','-b:a','192k','-movflags','+faststart',after)
 # One audio track for both sides of the comparison.
 vf=(f"[0:v]scale=540:960,pad=540:1036:0:76:color=0xF4EFE6,drawtext=fontfile={FONT}:text='BẢN CŨ':x=(w-tw)/2:y=24:fontsize=27:fontcolor=0x2B2B2B[l];"
     f"[1:v]scale=540:960,pad=540:1036:0:76:color=0xF4EFE6,drawtext=fontfile={FONT}:text='BẢN THỬ':x=(w-tw)/2:y=24:fontsize=27:fontcolor=0x2F4BDB[r];[l][r]hstack=inputs=2[v]")
 pair=OUT/f'{name}-comparison.mp4'
 ff('-i',before,'-i',after,'-filter_complex',vf,'-map','[v]','-map','0:a:0','-t',duration,'-c:v','libx264','-preset','veryfast','-crf','18','-c:a','copy','-movflags','+faststart',pair)
 ff('-ss',seg['poster_time'],'-i',ORIGINAL,'-frames:v','1',OUT/f'{name}-before.png')
 # A captioned old/trial still pair for each scene, plus temporal strips for inspection.
 images=[Image.open(OUT/f'{name}-{kind}.png').convert('RGB').resize((360,640)) for kind in ('before','after')]
 panel=Image.new('RGB',(736,724),'#F4EFE6');draw=ImageDraw.Draw(panel)
 draw.text((14,8),seg['title_vi'],font=ImageFont.truetype(FONT,22),fill='#2B2B2B')
 for i,image in enumerate(images):
  draw.text((14+i*368,43),'BẢN CŨ' if i==0 else 'BẢN THỬ',font=ImageFont.truetype(FONT,19),fill='#2B2B2B' if i==0 else '#2F4BDB')
  panel.paste(image,(i*368,78))
 panel.save(OUT/f'{name}-comparison.jpg',quality=92);panels.append(panel)
 frames=sorted(OUT.glob(f'{name}-motion-*.png'),key=lambda p:int(p.stem.rsplit('-',1)[1]))
 cols=6;tilew=270;tileh=510
 strip=Image.new('RGB',(tilew*cols,tileh*((len(frames)+cols-1)//cols)),'#F4EFE6')
 dr=ImageDraw.Draw(strip)
 for i,p in enumerate(frames):
  x=(i%cols)*tilew;y=(i//cols)*tileh
  dr.text((x+10,y+6),f"{seg['review_times'][i]:.2f}s",font=ImageFont.truetype(FONT,17),fill='#2B2B2B')
  strip.paste(Image.open(p).convert('RGB'),(x,y+30))
 strip.save(OUT/f'{name}-motion.jpg',quality=92)

join=OUT/'join.txt'
join.write_text('\n'.join(f"file '{s['slug']}-comparison.mp4'" for s in CONFIG['segments'])+'\n')
ff('-f','concat','-safe','0','-i',join,'-c','copy','-movflags','+faststart',OUT/'v43-15s-comparison.mp4')
contact=Image.new('RGB',(736,724*len(panels)),'#F4EFE6')
for i,p in enumerate(panels):contact.paste(p,(0,724*i))
contact.save(OUT/'v43-before-after.jpg',quality=92)
print('Comparison complete:',OUT/'v43-15s-comparison.mp4')

import shutil
shutil.copy2(OUT/'opening15-after.mp4', OUT/'v43-redesign-15s.mp4')
