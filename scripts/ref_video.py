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
# Shot changes. ffmpeg's scene score misses fades through black and slow cross-fades (common in
# story channels), so measure on small greyscale frames: a hard cut is a big frame-to-frame jump,
# a fade is a dip to near-black between two brighter stretches, a cross-fade is a big change over 0.5 s.
import numpy as np
FPS = 10
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-an', '-vf', f'fps={FPS},scale=64:114,format=gray', '-f', 'rawvideo', '-'],
                     capture_output=True).stdout
g = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 114, 64).astype(np.float32)[:, 8:90, :]   # skip burnt-in subtitles
cuts = []
if len(g) > FPS:
    luma = g.mean(axis=(1, 2)); step = np.abs(np.diff(g, axis=0)).mean(axis=(1, 2))
    span = np.abs(g[FPS // 2:] - g[:-(FPS // 2)]).mean(axis=(1, 2))            # change over 0.5 s
    hard = np.where(step > max(12.0, 6 * np.median(step)))[0] + 1
    dark = luma < max(6.0, 0.25 * np.median(luma))
    fades = [i for i in range(1, len(dark)) if dark[i] and not dark[i - 1]]
    soft = np.where(span > max(18.0, 6 * np.median(span)))[0] + FPS // 4
    for i in sorted(set(hard.tolist()) | set(fades) | set(soft.tolist())):
        t = i / FPS
        if not cuts or t - cuts[-1] > 0.8: cuts.append(round(t, 2))
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
avg = dur / max(1, len(shots))
job['ref_video'] = {'duration_s': round(dur, 1), 'frames': n, 'cuts': len(bounds) - 2, 'avg_shot_s': round(avg, 2)}
if avg > 8:   # implausible for a short-form video: the detector missed the transitions — don't mislead the designer
    job['ref_video'].update(cuts=None, avg_shot_s=None, note='pacing unknown (transitions not detected); keep a new action or shot at least every 2 s')
json.dump(job, open(jp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
rv = job['ref_video']
print(f"video mẫu: {dur:.1f}s, " + (f"{rv['cuts']} lần cắt (trung bình {rv['avg_shot_s']}s/cảnh)" if rv['avg_shot_s'] else "không đo được nhịp cắt") + f", {n} khung hình", file=sys.stderr)
