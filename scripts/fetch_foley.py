#!/usr/bin/env python3
"""Fill sound/extra/sfx/<type>/ and sound/extra/music/<mood>/ with CC0 recordings, no human needed.

Searches CC0 sounds through the Openverse API (no key; Freesound + other CC0 sources), downloads the
best-ranked candidates, prepares them (trim, length, fades, level) and judges them by measurement:
too short, silent, clipped, noise-like or gappy files are rejected. Keeps the first passing ones
(at most one per creator), writes them as MP3 and records their source in CREDITS.md + credits.json.
Runs on GitHub Actions (workflow "Thư viện âm thanh"), which packs sound/extra into the sound-kit release.
Your own files in assets/sfx and assets/music always win over these (scripts/audio.py).

Usage: fetch_foley.py [--out sound/extra] [--only creak,steps] [--keep 3] [--review out/foley]
Writes review sheets (waveform + spectrogram of every kept file) to --review, and a summary to stdout.
"""
import argparse, concurrent.futures, json, os, subprocess, sys, time, urllib.parse, urllib.request, urllib.error
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(HERE)
SR = 48000
UA = 'geister-video-factory/0.2 (CC0 sound fetch; github.com)'
MAX_BYTES = 25_000_000          # skip huge originals (full albums)
PER_QUERY = 12                  # candidates tried per search, in parallel
STATE = {'deadline': float('inf'), 'limited': 0, 'errors': 0}
REPORT = []                     # per type: what was searched, what came back, why candidates were rejected

# kind: impact (peak near the start) | one (one-shot, any shape) | loop (long bed: ambience, music)
# raw: accepted length of the original (s); keep: (min, max) length after preparing (s); flat: max spectral flatness
SFX = {
    'creak':          dict(q=['door creak', 'creaking door', 'floor creak'], kind='one', raw=(0.4, 20), keep=(0.5, 3.0), flat=0.5),
    'steps':          dict(q=['footsteps concrete', 'footsteps hallway walking'], kind='one', raw=(1, 40), keep=(1.5, 4.0), flat=0.55),
    'heart':          dict(q=['heartbeat', 'heart beat'], kind='one', raw=(0.8, 40), keep=(1.0, 4.0), flat=0.45),
    'drip':           dict(q=['water drip', 'single drop water'], kind='impact', raw=(0.1, 15), keep=(0.15, 1.5), flat=0.45),
    'crash':          dict(q=['glass break', 'ceramic shatter'], kind='impact', raw=(0.3, 15), keep=(0.4, 3.0), flat=0.55),
    'crack':          dict(q=['glass crack', 'ice crack'], kind='impact', raw=(0.1, 15), keep=(0.1, 1.5), flat=0.5),
    'clank':          dict(q=['metal clank', 'metal impact'], kind='impact', raw=(0.1, 15), keep=(0.15, 2.0), flat=0.4),
    'door_slam':      dict(q=['door slam', 'metal door slam'], kind='impact', raw=(0.3, 15), keep=(0.4, 3.0), flat=0.45),
    'knock_heavy':    dict(q=['heavy door knock', 'door banging'], kind='one', raw=(0.3, 20), keep=(0.4, 3.0), flat=0.4),
    'scream_distant': dict(q=['distant scream', 'scream far'], kind='one', raw=(0.5, 20), keep=(0.6, 4.0), flat=0.4),
    'phone':          dict(q=['phone vibrate', 'phone notification'], kind='one', raw=(0.2, 15), keep=(0.2, 3.0), flat=0.4),
    'alarm':          dict(q=['building alarm', 'alarm siren'], kind='one', raw=(1, 40), keep=(1.5, 5.0), flat=0.4),
    'ambience':       dict(q=['apartment room tone', 'fluorescent hum ambience', 'eerie ambience'], kind='loop', raw=(25, 400), keep=(25, 40), flat=0.6),
}
MUSIC = {
    'horror_tension':  dict(q=['horror music loop', 'dark ambient music', 'suspense loop']),
    'mystery':         dict(q=['mystery music loop', 'mysterious music']),
    'explainer_light': dict(q=['calm music loop', 'piano loop', 'acoustic loop']),
    'funny':           dict(q=['funny music loop', 'quirky music', 'ukulele loop']),
    'science_curious': dict(q=['electronic music loop', 'ambient music loop']),
    'documentary':     dict(q=['nostalgic piano music', 'documentary music', 'melancholic strings']),
    'cinematic_suspense': dict(q=['cinematic tension music', 'suspense drone music', 'thriller music loop']),
    'uplifting':       dict(q=['uplifting music loop', 'positive background music', 'happy acoustic music']),
    'lofi_calm':       dict(q=['lofi music loop', 'chill hip hop loop', 'lo-fi beat']),
}
for v in MUSIC.values(): v.update(kind='loop', raw=(30, 600), keep=(30, 90), flat=0.5, music=True)


# ---------------------------------------------------------------- search + download
def freesound(query, n, spec):
    """Freesound API v2 text search, CC0 only, best rated first. Needs FREESOUND_API_KEY (free)."""
    key = os.environ.get('FREESOUND_API_KEY', '')
    lo, hi = spec['raw']
    p = dict(query=query, filter=f'license:"Creative Commons 0" duration:[{lo} TO {hi}]', sort='rating_desc',
             fields='id,name,username,license,duration,previews,url', page_size=n, token=key)
    req = urllib.request.Request('https://freesound.org/apiv2/search/text/?' + urllib.parse.urlencode(p), headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: res = json.load(r).get('results', [])
    except Exception as e:
        REPORT.append(f'  - lỗi Freesound "{query}": {str(e)[:80]}'); STATE['errors'] += 1; return []
    return [dict(id=f"fs{x['id']}", url=x['previews'].get('preview-hq-mp3'), creator=x.get('username'), license='cc0',
                 title=x.get('name'), duration=int(float(x.get('duration') or 0) * 1000), source='freesound',
                 foreign_landing_url=x.get('url')) for x in res if 'Creative Commons 0' in (x.get('license') or '') or x.get('license', '').endswith('/zero/1.0/')]


def search(query, n, spec):
    if os.environ.get('FREESOUND_API_KEY') and not spec.get('music'):
        res = freesound(query, n, spec)
        if res: return res
    return openverse(query, n, spec.get('music', False))


def openverse(query, n=20, music=False):
    # CC0 music outside Freesound is almost nonexistent on Openverse (Jamendo/ccMixter are CC BY/NC),
    # while Freesound has many CC0 music loops and beds: search Freesound for both.
    p = dict(q=query, license='cc0', page_size=n, filter_dead='true', source='freesound')
    for attempt in range(3):
        if STATE['limited'] >= 3 or time.time() > STATE['deadline']: return []
        req = urllib.request.Request('https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode(p), headers={'User-Agent': UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                STATE['limited'] = 0
                return json.load(r).get('results', [])
        except urllib.error.HTTPError as e:
            if e.code == 429:
                STATE['limited'] += 1; print(f'  search "{query}": giới hạn tốc độ (429), chờ…', flush=True); time.sleep(15 * (attempt + 1)); continue
            if e.code == 400 and 'category' in p: p.pop('category'); continue   # older API: no category filter
            REPORT.append(f'  - lỗi tìm "{query}": HTTP {e.code}'); STATE['errors'] += 1
            if e.code in (401, 403): STATE['limited'] = 3                       # blocked: stop asking today
            return []
        except Exception as e:
            REPORT.append(f'  - lỗi tìm "{query}": {str(e)[:80]}'); STATE['errors'] += 1; time.sleep(5)
    if STATE['limited'] >= 3: REPORT.append('  - Openverse đang giới hạn tốc độ: dừng tìm, lượt chạy hằng ngày sẽ thử tiếp')
    return []


def fetch(url, dst):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=45) as r, open(dst + '.part', 'wb') as fh:
        if int(r.headers.get('Content-Length') or 0) > MAX_BYTES: raise ValueError('too big')
        data = r.read(MAX_BYTES + 1)
        if len(data) > MAX_BYTES: raise ValueError('too big')
        fh.write(data)
    os.replace(dst + '.part', dst)


def decode(path, ch):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    return x.reshape(-1, ch)


# ---------------------------------------------------------------- prepare + judge
def env_db(m, win=0.01):
    n = max(1, int(SR * win)); k = len(m) // n
    if k == 0: return np.array([-120.0])
    r = np.sqrt(np.mean(m[:k * n].reshape(k, n) ** 2, axis=1))
    return 20 * np.log10(r + 1e-12)


def flatness(m):
    seg = m[: SR * 30]
    if len(seg) < 2048: return 1.0
    hop = 1024; fr = np.lib.stride_tricks.sliding_window_view(seg, 2048)[::hop] * np.hanning(2048)
    p = np.abs(np.fft.rfft(fr, axis=1)) ** 2 + 1e-12
    loud = p.sum(axis=1) > np.percentile(p.sum(axis=1), 50)          # judge the sound, not its tail
    f = np.exp(np.mean(np.log(p[loud]), axis=1)) / np.mean(p[loud], axis=1)
    return float(np.mean(f))


def prepare(x, spec):
    """x: (n, ch). Returns (prepared (n, ch), measures, list of reasons it was rejected)."""
    why = []
    clip = float(np.mean(np.abs(x) > 0.995))
    if clip > 0.001: why.append(f'clipped {clip * 100:.1f}%')
    m = x.mean(axis=1)
    pk = float(np.max(np.abs(m))) if len(m) else 0.0
    if pk < 10 ** (-40 / 20): return x, {}, ['silent']
    e = env_db(m); top = e.max(); on = np.where(e > top - 40)[0]
    lo, hi = spec['keep']
    if spec['kind'] == 'loop':
        mid = len(x) // 2; half = int(min(hi, len(x) / SR) * SR / 2)
        y = x[max(0, mid - half): mid + half].copy()
        quiet = float(np.mean(env_db(y.mean(axis=1), 1.0) < 20 * np.log10(np.max(np.abs(y)) + 1e-12) - 35))
        if quiet > 0.2: why.append(f'gaps {quiet * 100:.0f}%')
        f = int(SR * 1.0)
    else:
        a = max(0, on[0] * int(SR * 0.01) - int(SR * 0.005))           # 5 ms before it starts
        b = min(len(x), (on[-1] + 1) * int(SR * 0.01))
        y = x[a: min(b, a + int(hi * SR))].copy()
        if spec['kind'] == 'impact':
            rise = (np.argmax(np.abs(y.mean(axis=1))) / SR) * 1000
            if rise > 40: why.append(f'soft attack {rise:.0f} ms')
        f = int(SR * min(0.04, len(y) / SR / 4))
    d = len(y) / SR
    if d < lo: why.append(f'too short {d:.2f}s')
    fl = flatness(y.mean(axis=1))
    if fl > spec['flat']: why.append(f'noise-like {fl:.2f}')
    if f: y[:min(int(SR * 0.005), len(y))] *= np.linspace(0, 1, min(int(SR * 0.005), len(y)))[:, None]; y[-f:] *= np.linspace(1, 0, f)[:, None]
    y *= 10 ** (-3 / 20) / (np.max(np.abs(y)) + 1e-12)                  # peak -3 dBFS; mix.py sets the real level
    return y, dict(dur_s=round(d, 2), flatness=round(fl, 3)), why


def encode(y, dst):
    ch = y.shape[1]
    p = subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-',
                        '-c:a', 'libmp3lame', '-b:a', '160k' if ch > 1 else '128k', dst], input=y.astype(np.float32).tobytes())
    if p.returncode: raise RuntimeError('mp3 encode failed')


def review_sheet(items, png):
    if not items: return
    import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
    fig, ax = plt.subplots(len(items), 2, figsize=(11, 1.3 * len(items) + 0.4), squeeze=False, gridspec_kw=dict(width_ratios=[1, 2]))
    for row, (label, y) in zip(ax, items):
        m = y.mean(axis=1)[: SR * 20]; t = np.arange(len(m)) / SR
        row[0].plot(t, m, lw=0.4, color='k'); row[0].set_yticks([]); row[0].set_title(label, fontsize=7, loc='left')
        row[1].specgram(m, NFFT=512, Fs=SR, noverlap=384, cmap='magma', vmin=-120); row[1].set_ylim(0, 12000); row[1].tick_params(labelsize=6)
    fig.tight_layout(); os.makedirs(os.path.dirname(png), exist_ok=True); fig.savefig(png, dpi=80); plt.close(fig)


# ---------------------------------------------------------------- main
def try_candidate(r, spec, tmp):
    """Download + prepare one search result. Returns (r, y, measures) or (r, None, reason)."""
    raw = os.path.join(tmp, f"{r['id'][:12]}.src")
    try:
        fetch(r['url'], raw)
        y, meas, why = prepare(decode(raw, 2 if spec.get('music') else 1), spec)
        return (r, None, ', '.join(why)) if why else (r, y, meas)
    except Exception as e:
        return r, None, str(e)[:60]
    finally:
        try: os.remove(raw)
        except OSError: pass


def run_one(name, spec, folder, keep, tmp, review, root, pool):
    have = sorted(f for f in os.listdir(folder) if f.endswith('.mp3')) if os.path.isdir(folder) else []
    if len(have) >= keep: return f'{name}: đã có {len(have)} file — giữ nguyên', []
    need = keep - len(have); kept, seen, creators, rejected, credits, sheet = 0, set(), set(), 0, [], []
    for q in spec['q']:
        if kept >= need or time.time() > STATE['deadline']: break
        if STATE['limited'] >= 3 and not os.environ.get('FREESOUND_API_KEY'): break
        res = search(q, 20, spec); time.sleep(3.0)
        REPORT.append(f'  - "{q}": {len(res)} kết quả' + (' (giới hạn tốc độ)' if STATE['limited'] else ''))
        cand = []
        for r in res:
            rid = r.get('id', ''); dur = (r.get('duration') or 0) / 1000
            if not rid or rid in seen or not r.get('url') or (r.get('license') or '').lower() != 'cc0': continue
            if dur and not (spec['raw'][0] <= dur <= spec['raw'][1]): continue
            seen.add(rid); cand.append(r)
            if len(cand) >= PER_QUERY: break
        for r, y, meas in pool.map(lambda r: try_candidate(r, spec, tmp), cand):   # results keep search rank
            if kept >= need: break
            who = (r.get('creator') or '?').strip()
            if y is None or who in creators:
                rejected += 1; REPORT.append(f'    - loại: {(r.get("title") or "")[:40]!r} — {meas if y is None else "trùng tác giả"}'); continue
            os.makedirs(folder, exist_ok=True)
            fn = f"ov-{r['id'][:8]}.mp3"; dst = os.path.join(folder, fn); encode(y, dst)
            kept += 1; creators.add(who)
            title = (r.get('title') or '').replace('\n', ' ')[:80]
            land = r.get('foreign_landing_url') or r['url']
            credits.append((os.path.relpath(dst, root), f'"{title}" by {who} ({r.get("source", "openverse")}) {land} — CC0'))
            sheet.append((f'{name}/{fn}  {meas["dur_s"]}s  flat {meas["flatness"]}  "{title[:40]}" by {who}', y))
    try: review_sheet(sheet, os.path.join(review, f'{name}.png'))
    except Exception as e: print(f'  ảnh duyệt {name}: {e}')
    tail = '' if kept >= need else (' — hết giờ' if time.time() > STATE['deadline'] else ' — giới hạn tốc độ tìm kiếm' if STATE['limited'] >= 3 else '') + f' — còn thiếu {need - kept}'
    return f'{name}: +{kept} file (thử {len(seen)}, loại {rejected}){tail if kept < need else ""}', credits


def save_credits(root, credits):
    os.makedirs(root, exist_ok=True); cj = os.path.join(root, 'credits.json')
    allc = json.load(open(cj)) if os.path.exists(cj) else {}
    allc.update(dict(credits)); json.dump(allc, open(cj, 'w'), ensure_ascii=False, indent=1)
    open(os.path.join(root, 'CREDITS.md'), 'w', encoding='utf-8').write(
        '# Âm thanh và nhạc CC0 tự tải (Openverse)\n\n' + '\n'.join(f'- {k} — {v}' for k, v in sorted(allc.items())) + '\n')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--only', default=''); ap.add_argument('--keep', type=int, default=3)
    ap.add_argument('--review', default=os.path.join(REPO, 'out', 'foley'))
    ap.add_argument('--out', default=os.path.join(REPO, 'sound', 'extra'))
    ap.add_argument('--minutes', type=float, default=30, help='time budget; what is found by then is kept')
    a = ap.parse_args()
    root = os.path.abspath(a.out); STATE['deadline'] = time.time() + a.minutes * 60
    only = {x.strip() for x in a.only.split(',') if x.strip()}
    tmp = os.path.join(REPO, 'out', 'foley', '_raw'); os.makedirs(tmp, exist_ok=True); os.makedirs(a.review, exist_ok=True)
    jobs = [(k, v, os.path.join(root, 'sfx', k), a.keep) for k, v in SFX.items()]
    jobs += [(k, v, os.path.join(root, 'music', k), 2) for k, v in MUSIC.items()]
    lines = []
    with concurrent.futures.ThreadPoolExecutor(8) as pool:
        for name, spec, folder, keep in jobs:
            if only and name not in only: continue
            t0 = time.time(); REPORT.append(f'- **{name}**')
            msg, cr = run_one(name, spec, folder, keep, tmp, a.review, root, pool)
            save_credits(root, cr)                              # after every type: progress survives a timeout
            msg += f' [{time.time() - t0:.0f}s]'; print(msg, flush=True); lines.append(msg)
            open(os.path.join(a.review, 'summary.md'), 'w', encoding='utf-8').write('\n'.join(f'- {l}' for l in lines) + '\n')
            open(os.path.join(root, 'fetch-report.md'), 'w', encoding='utf-8').write(
                '# Lượt tải gần nhất\n\n' + '\n'.join(f'- {l}' for l in lines) + '\n\n## Chi tiết\n' + '\n'.join(REPORT[-400:]) + '\n')
    save_credits(root, [])


if __name__ == '__main__':
    main()
