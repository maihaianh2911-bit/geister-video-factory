#!/usr/bin/env python3
"""Reference video -> keyframes + pacing for the designer.

Usage: ref_video.py <slug>   (reads jobs/<slug>/job.json "ref_videos"; needs ffmpeg, curl, GH_TOKEN for private attachments)
Writes jobs/<slug>/refs/video_01.jpg … (≤ 10 frames: one per shot, spread over the whole video) and
job.json "ref_video": {duration_s, cuts, avg_shot_s, frames}. Prints problems as lines starting with "- ".
"""
import json, os, re, subprocess, sys

slug = sys.argv[1]; jp = f'jobs/{slug}/job.json'; job = json.load(open(jp, encoding='utf-8'))
refs = f'jobs/{slug}/refs'; os.makedirs(refs, exist_ok=True)
urls = job.get('ref_videos') or []
if not urls: sys.exit(0)
src = f'/tmp/{slug}_ref.bin'; tok = os.environ.get('GH_TOKEN', '')
ok = subprocess.run(['curl', '-fsSL', '--max-filesize', '300000000', '-H', f'Authorization: Bearer {tok}', '-o', src, urls[0]]).returncode == 0 \
     or subprocess.run(['curl', '-fsSL', '--max-filesize', '300000000', '-o', src, urls[0]]).returncode == 0
if not ok: print('- `video mẫu`: không tải được'); sys.exit(0)
try:
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', src]).decode().strip())
except Exception:
    print('- `video mẫu`: file tải về không phải video'); sys.exit(0)
log = subprocess.run(['ffmpeg', '-hide_banner', '-i', src, '-an', '-vf', "select='gt(scene,0.30)',metadata=print", '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
cuts = sorted({round(float(x), 2) for x in re.findall(r'pts_time:([0-9.]+)', log)})
bounds = [0.0] + [c for c in cuts if 0.2 < c < dur - 0.2] + [dur]
shots = [(a, b) for a, b in zip(bounds, bounds[1:]) if b - a > 0.15]
pick = shots if len(shots) <= 10 else [shots[round(i * (len(shots) - 1) / 9)] for i in range(10)]
if len(pick) < 4: pick = [(dur * i / 6, dur * (i + 1) / 6) for i in range(6)]   # few/no cuts: spread evenly
for f in os.listdir(refs):
    if f.startswith('video_'): os.remove(os.path.join(refs, f))
n = 0
for a, b in pick:
    n += 1
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{(a + b) / 2:.2f}', '-i', src, '-frames:v', '1',
                    '-vf', "scale='min(720,iw)':-2", '-q:v', '4', f'{refs}/video_{n:02d}.jpg'])
job['ref_video'] = {'duration_s': round(dur, 1), 'cuts': len(bounds) - 2, 'avg_shot_s': round(dur / max(1, len(shots)), 2), 'frames': n}
json.dump(job, open(jp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f"video mẫu: {dur:.1f}s, {job['ref_video']['cuts']} lần cắt (trung bình {job['ref_video']['avg_shot_s']}s/cảnh), {n} khung hình", file=sys.stderr)
