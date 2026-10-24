#!/usr/bin/env python3
"""Build the Vietnamese review comment for a preview. Usage: preview_comment.py <slug> <owner/repo> [--mock]"""
import glob, json, os, sys

slug, repo = sys.argv[1], sys.argv[2]; mock = '--mock' in sys.argv
base = f'https://github.com/{repo}/blob/renders/previews/{slug}'
sb = json.load(open(f'src/videos/{slug}/storyboard.json', encoding='utf-8')) if os.path.exists(f'src/videos/{slug}/storyboard.json') else []
val = json.load(open(f'jobs/{slug}/validate.json', encoding='utf-8')) if os.path.exists(f'jobs/{slug}/validate.json') else {}
usd = 0.0
for p in glob.glob(f'jobs/{slug}/usage.jsonl'):
    for line in open(p):
        try: usd += json.loads(line).get('usd', 0)
        except Exception: pass
tm = json.load(open(f'src/videos/{slug}/timing.json', encoding='utf-8'))
out = [f'## 🎞️ Bản xem trước `{slug}`' + (' — **MOCK (không phải thiết kế thật của Claude)**' if mock else ''), '',
       f'**Storyboard:** [mở ảnh]({base}/storyboard.jpg) · **10 giây đầu (có tiếng):** [mở video]({base}/first10.mp4) · **Giọng đọc:** [nghe]({base}/voice.mp3)', '',
       f'![storyboard]({base}/storyboard.jpg?raw=true)', '',
       '| # | Thời gian | Cảnh |', '|---|---|---|']
for i, s in enumerate(sb, 1):
    out.append(f"| {i} | {s.get('t0', 0):.1f}–{s.get('t1', 0):.1f}s | **{s.get('title_vi', '')}** — {s.get('desc_vi', '')} |")
out += ['', f"Video dài {tm['duration']:.1f}s · {val.get('sfx_events', 0)} hiệu ứng âm thanh · chi phí Claude đến giờ: **${usd:.2f}**"]
if val.get('warnings'):
    out += ['', '⚠️ ' + ' · '.join(val['warnings'])]
out += ['', '**Tiếp theo:**',
        '- Ưng → gắn nhãn **`visual-ok`** → máy dựng bản hoàn chỉnh (~15 phút).',
        '- Chưa ưng → bình luận yêu cầu sửa, ghi số cảnh, ví dụ: *"Cảnh 3: cho con ma to hơn và rơi chậm lại. Cảnh 5: đổi nền thành bãi biển."* → máy sửa ngay (~10–20 phút).',
        '- Đổi giọng → bình luận `/voice clone_112` (hoặc mã giọng khác).']
print('\n'.join(out))
