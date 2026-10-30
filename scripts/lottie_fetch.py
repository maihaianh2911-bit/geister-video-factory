#!/usr/bin/env python3
"""Find and download free Lottie animations for scene layers (see prompts/scene_system.md "Lottie & 3D").

  python3 scripts/lottie_fetch.py search <keyword> [n]   # list up to n free .lottie files from LottieFiles
  python3 scripts/lottie_fetch.py get <url> <name>       # save as public/lottie/<name>.json (+ SOURCES.md line)

LottieFiles "free animations" use the Lottie Simple License: free for commercial use, no attribution required.
Images inside a .lottie are inlined as data URIs so the JSON works on its own.
"""
import base64, datetime, io, json, mimetypes, os, re, sys, urllib.request, zipfile

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'public', 'lottie')
UA = {'User-Agent': 'Mozilla/5.0 (geister-video-factory)'}


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read()


def search(keyword, n=12):
    slug = re.sub(r'[^a-z0-9]+', '-', keyword.lower()).strip('-')
    html = fetch(f'https://lottiefiles.com/free-animations/{slug}').decode('utf-8', 'replace')
    urls = list(dict.fromkeys(re.findall(r'https://assets-v2\.lottiefiles\.com/a/[0-9a-f-]+/[A-Za-z0-9]+\.lottie', html)))
    for u in urls[:n]:
        print(u)
    if not urls:
        print(f'(không thấy file nào cho "{keyword}" — thử từ khóa tiếng Anh khác)')


def load_animation(url):
    raw = fetch(url)
    if raw[:2] == b'PK':   # .lottie = zip with animations/*.json and images/*
        z = zipfile.ZipFile(io.BytesIO(raw))
        name = sorted(n for n in z.namelist() if n.startswith('animations/') and n.endswith('.json'))[0]
        data = json.loads(z.read(name))
        for a in data.get('assets', []):
            p = a.get('p')
            if p and not str(p).startswith('data:') and a.get('e', 0) != 1:
                for cand in (f"images/{p}", (a.get('u') or '').lstrip('/') + p):
                    if cand in z.namelist():
                        mime = mimetypes.guess_type(p)[0] or 'image/png'
                        a.update(u='', p=f'data:{mime};base64,' + base64.b64encode(z.read(cand)).decode(), e=1)
                        break
        return data
    return json.loads(raw)


def get(url, name):
    if not re.fullmatch(r'[a-z0-9][a-z0-9_-]*', name):
        raise SystemExit('name: chữ thường, số, - hoặc _')
    data = load_animation(url)
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f'{name}.json')
    json.dump(data, open(path, 'w'), separators=(',', ':'))
    fr = data.get('fr', 30) or 30
    secs = (data.get('op', 0) - data.get('ip', 0)) / fr
    with open(os.path.join(OUT, 'SOURCES.md'), 'a') as f:
        f.write(f'- `{name}.json` — {url} — LottieFiles Free (Lottie Simple License) — {datetime.date.today()}\n')
    print(f'{path}: {data.get("w")}x{data.get("h")}, {fr} fps, {secs:.2f} s, {os.path.getsize(path) // 1024} KB')


if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) >= 2 and a[0] == 'search':
        search(a[1], int(a[2]) if len(a) > 2 else 12)
    elif len(a) == 3 and a[0] == 'get':
        get(a[1], a[2])
    else:
        raise SystemExit(__doc__)
