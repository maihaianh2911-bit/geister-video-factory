#!/usr/bin/env python3
"""Parse a "🎬 Yêu cầu video mới" issue into jobs/<slug>/job.json and src/videos/<slug>/lines.json.

Usage: issue_parse.py --issue-json issue.json [--write]
  issue.json = output of `gh issue view N --json number,title,body`
Prints a Vietnamese report (markdown) to stdout; exit code 2 when the script is invalid.
"""
import argparse, json, os, re, sys

PLACEHOLDERS = ('(kịch bản tiếng Đức', '(bản dịch tiếng Việt', '(nguồn số liệu')
IMG_RE = re.compile(r'!\[[^\]]*\]\((https?://[^)\s]+)\)|<img[^>]+src="(https?://[^"]+)"')
FILE_RE = re.compile(r'\[[^\]]*\]\((https?://[^)\s]+\.(?:mp3|wav|m4a|srt))\)|(https://github\.com/user-attachments/(?:assets|files)/[^\s)]+)', re.I)
VOICE_RE = re.compile(r'\b(clone_\d+|[A-Za-z0-9]{20})\b')


def sections(body):
    out, cur = {}, None
    for line in (body or '').replace('\r', '').split('\n'):
        m = re.match(r'^###\s+(.*)$', line)
        if m:
            cur = m.group(1).strip(); out[cur] = []
        elif cur is not None:
            out[cur].append(line)
    return {k: '\n'.join(v).strip() for k, v in out.items()}


def pick(secs, prefix):
    for k, v in secs.items():
        if k.lower().startswith(prefix.lower()):
            return '' if v.strip() in ('_No response_', 'None') else v
    return ''


def script_parts(text):
    parts, cur = {'DE': [], 'VI': [], 'NGUỒN': []}, None
    for line in text.split('\n'):
        m = re.match(r'^\s*##\s*(DE|VI|NGU[ỒO]N)\b', line, re.I)
        if m:
            k = m.group(1).upper(); cur = 'NGUỒN' if k.startswith('NGU') else k; continue
        if cur and line.strip() and not line.strip().startswith(PLACEHOLDERS):
            parts[cur].append(line.strip())
    return parts


def images(text):
    res, scene = [], None
    for line in text.split('\n'):
        m = re.search(r'[Cc]ảnh\s*(\d+)', line)
        if m:
            scene = int(m.group(1))
        for a, b in IMG_RE.findall(line):
            res.append({'scene': scene, 'url': a or b})
    return res


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--issue-json', required=True); ap.add_argument('--write', action='store_true')
    a = ap.parse_args()
    iss = json.load(open(a.issue_json, encoding='utf-8'))
    n = iss['number']; slug = f'v{n}'
    secs = sections(iss.get('body', ''))
    sc = script_parts(pick(secs, 'Kịch bản'))
    errs, warns = [], []
    de, vi = sc['DE'], sc['VI']
    if not de:
        errs.append('Không thấy phần `## DE` (kịch bản tiếng Đức) hoặc phần này còn để chữ mẫu.')
    if vi and len(vi) != len(de):
        warns.append(f'Số dòng tiếng Việt ({len(vi)}) khác số dòng tiếng Đức ({len(de)}). Máy vẫn chạy, nhưng mô tả storyboard có thể lệch dòng.')
    if not vi:
        warns.append('Chưa có bản dịch `## VI` — storyboard sẽ chỉ có tiếng Đức.')
    chars = sum(len(x) for x in de) + max(0, len(de) - 1)
    words = sum(len(x.split()) for x in de)
    est_s = round(words / 2.45, 1)
    if words and not (90 <= words <= 320):
        warns.append(f'Kịch bản có {words} từ (~{est_s} giây). Khoảng hợp lý cho 60–90 giây là 150–230 từ.')
    long_lines = [i + 1 for i, x in enumerate(de) if len(x.split()) > 30]
    if long_lines:
        warns.append('Dòng ' + ', '.join(map(str, long_lines)) + ' quá dài (>30 từ); mỗi dòng nên là 1–2 câu để mỗi dòng có một hành động riêng.')

    voice_txt = pick(secs, 'Giọng đọc')
    notes = pick(secs, 'Ghi chú')
    voice = os.environ.get('VN11_VOICE_ID', 'clone_113')
    m = re.search(r'clone_\d+', voice_txt)
    if m:
        voice = m.group(0)
    elif voice_txt.startswith('Giọng khác'):
        m2 = VOICE_RE.search(notes)
        if m2: voice = m2.group(1)
        else: warns.append('Bạn chọn "Giọng khác" nhưng không ghi voice_id trong Ghi chú — dùng giọng mặc định.')
    own = pick(secs, 'File MP3')
    own_url = None
    for x, y in FILE_RE.findall(own):
        own_url = x or y; break
    style_imgs = images(pick(secs, 'Ảnh mẫu phong cách'))
    scene_imgs = images(pick(secs, 'Ảnh mẫu theo cảnh'))
    job = {'issue': n, 'slug': slug, 'title': iss.get('title', ''), 'de': de, 'vi': vi, 'sources': sc['NGUỒN'],
           'notes': notes, 'voice': voice, 'own_audio_url': own_url,
           'style_images': [i['url'] for i in style_imgs], 'scene_images': scene_imgs,
           'stats': {'lines': len(de), 'words': words, 'chars': chars, 'est_seconds': est_s}}

    rep = [f'**Máy đã đọc phiếu** → mã video `{slug}`', '',
           f'- Kịch bản: **{len(de)} dòng**, {words} từ, {chars} ký tự (ước tính ~{est_s} giây giọng đọc)',
           f'- Giọng: `{voice}`' + (' — dùng file MP3 bạn đính kèm' if own_url else ''),
           f'- Ảnh mẫu phong cách: {len(style_imgs)} · ảnh theo cảnh: {len(scene_imgs)}',
           f'- Ghi chú hình ảnh: {"có" if notes else "không"}']
    if errs: rep += ['', '❌ **Cần sửa trước khi chạy:**'] + [f'- {e}' for e in errs]
    if warns: rep += ['', '⚠️ **Lưu ý:**'] + [f'- {w}' for w in warns]
    if not errs: rep += ['', 'Khi đã chắc kịch bản, gắn nhãn **`script-ready`** để máy tạo giọng và đưa vào hàng chờ thiết kế đêm nay.']
    print('\n'.join(rep))

    if a.write and not errs:
        os.makedirs(f'jobs/{slug}', exist_ok=True); os.makedirs(f'src/videos/{slug}', exist_ok=True)
        json.dump(job, open(f'jobs/{slug}/job.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        json.dump([[0, 0, x] for x in de], open(f'src/videos/{slug}/lines.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    sys.exit(2 if errs else 0)


if __name__ == '__main__':
    main()
