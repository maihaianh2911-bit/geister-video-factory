#!/usr/bin/env python3
"""Sound for one video: events.json + timing.json -> cue sheet -> tools/sound-layer/mix.py -> mix.m4a.

Usage: audio.py <slug> <out.m4a> [--work out/audio/<slug>]

Where each event's sound comes from, first match wins:
  1. "sound" written in the event: a kit id (hit/fs-560156-...), a kit type, or a file path
  2. assets/sfx/<type>/  your own recordings for that event type (Sonniss, Pixabay, ...),
     then sound/extra/sfx/<type>/  CC0 recordings fetched automatically (scripts/fetch_foley.py)
  3. the CC0 kit (sound/kit, built by the "Thư viện âm thanh" workflow) for types it covers
  4. the old procedural synth in scripts/sfx.py, so no event is ever silent

Music: events.json "music" = a mood folder in assets/music/ or sound/extra/music/ ("horror_tension"), a file path, or false.
No music -> the old synth bed (if "bed" is not false), kept quiet with music.lufs.
mix.json (optional): energy punchy|calm, lufs, duck_db, music_lufs, room (false = dry).
Writes <work>/cues.json, mix.wav, mix-report.json, CREDITS.md and <out.m4a>.
"""
import argparse, json, math, os, subprocess, sys, wave, zlib

HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import sfx as synth  # noqa: E402  (old procedural instruments + time warp)

KIT = os.path.join(REPO, 'sound', 'kit')
EXTRA = os.path.join(REPO, 'sound', 'extra')
SFX_DIRS = [os.path.join(REPO, 'assets', 'sfx'), os.path.join(EXTRA, 'sfx')]        # yours first
MUSIC_DIRS = [os.path.join(REPO, 'assets', 'music'), os.path.join(EXTRA, 'music')]
AUDIO_EXT = ('.wav', '.mp3', '.ogg', '.flac', '.m4a', '.aiff', '.aif')
# Sounds whose loudest moment is the impact itself: their peak goes on the event time.
IMPACT = {'hit', 'thud', 'pop', 'plop', 'click', 'tick', 'switch', 'bonk', 'crash', 'crack', 'clank', 'stamp',
          'door_slam', 'knock', 'knock_heavy', 'slam', 'punch'}


def kit_types():
    try:
        cat = json.load(open(os.path.join(KIT, 'catalog.json')))
        return {k for k, v in cat['types'].items() if v.get('count')}
    except Exception:
        return set()


def files_in(d):
    if not os.path.isdir(d): return []
    return sorted(os.path.join(d, f) for f in os.listdir(d) if f.lower().endswith(AUDIO_EXT))


def first_files(dirs, name):
    for d in dirs:
        fs = files_in(os.path.join(d, name))
        if fs: return fs
    return []


def kit_plan(e, have):
    """Event of the project's own vocabulary -> (kit sound, align, cue time, extra) or None."""
    ty, t = e['type'], float(e['t'])
    dur = float(e.get('dur', 0) or 0)
    hero = e.get('weight') == 'hero' or (ty == 'hit' and float(e.get('gain', 0)) >= 0.7)
    m = {
        'hit':     ('hit+boom' if hero and 'boom' in have else 'hit', 'peak', t),
        'thud':    ('thump', 'peak', t),
        'pop':     ('pop', 'peak', t),
        'plop':    ('pop', 'peak', t, {'pitch': -5}),
        'whoosh':  ('transition' if (dur or .6) >= 1.0 else 'whoosh', 'peak', t + (dur or .6) / 2),
        'riser':   ('riser', 'peak', t + (dur or 1.0)),
        'click':   ('click', 'peak', t),
        'switch':  ('click', 'peak', t),
        'tick':    ('tick', 'peak', t),
        'rustle':  ('swish', 'peak', t + (dur or .5) / 2),
        'shimmer': ('shimmer', 'start', t),
        'static':  ('glitch', 'start', t) if (dur or .5) <= 1.2 else None,
    }.get(ty)
    if not m: return None
    sound = m[0]
    if any(p not in have for p in sound.split('+')): return None
    return sound, m[1], m[2], (m[3] if len(m) > 3 else {}), hero


def render_synth(e, path):
    fn = synth.INSTR.get(e['type'])
    if not fn: return False
    x = fn(e).astype(float); pk = max(1e-9, float(abs(x).max()))
    x = x / pk * 0.7
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(synth.SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())
    return True


def midi(f): return int(round(69 + 12 * math.log2(max(f, 20) / 440)))


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('slug'); ap.add_argument('out'); ap.add_argument('--work')
    a = ap.parse_args()
    s = a.slug; work = os.path.abspath(a.work or os.path.join(REPO, 'out', 'audio', s))
    os.makedirs(os.path.join(work, 'synth'), exist_ok=True)
    vd = os.path.join(REPO, 'src', 'videos', s)
    ev = json.load(open(os.path.join(vd, 'events.json'), encoding='utf-8'))
    tm = json.load(open(os.path.join(vd, 'timing.json'), encoding='utf-8'))
    mixcfg = json.load(open(os.path.join(vd, 'mix.json'))) if os.path.exists(os.path.join(vd, 'mix.json')) else {}
    warp = synth.warp_fn(tm); T = float(tm['duration']); have = kit_types()
    rot = {}; cues = []; src_count = {'event': 0, 'own': 0, 'kit': 0, 'synth': 0, 'skip': 0}

    for i, e in enumerate(ev.get('events', [])):
        ty = str(e.get('type', '')); t = float(e.get('t', -1))
        if t < 0: src_count['skip'] += 1; continue
        base = {'id': f'e{i:03d}-{ty}', 'pan': float(e.get('pan', 0.0))}
        if e.get('weight') in ('hero', 'support'): base['weight'] = e['weight']
        own = first_files(SFX_DIRS, ty)
        if e.get('sound'):                                   # 1. chosen by the designer
            snd = e['sound']
            if not os.path.isabs(snd) and os.path.exists(os.path.join(REPO, snd)): snd = os.path.join(REPO, snd)
            cue = dict(base, sound=snd, align=e.get('align', 'peak'), t=warp(t)); src_count['event'] += 1
        elif own:                                            # 2. your own recordings
            k = rot.get(ty, zlib.crc32((s + ty).encode())); rot[ty] = k + 1
            cue = dict(base, sound=own[k % len(own)], align='peak' if ty in IMPACT else 'start', t=warp(t)); src_count['own'] += 1
        elif ty == 'ting':                                   # counting bells keep their pitch
            cue = dict(base, sound='synth:bell', note=midi(float(e.get('f', 660))), align='start', t=warp(t)); src_count['synth'] += 1
        elif (p := kit_plan(e, have)):                       # 3. CC0 kit
            sound, align, tc, extra, hero = p
            cue = dict(base, sound=sound, align=align, t=warp(tc), **extra)
            if hero: cue['weight'] = 'hero'
            src_count['kit'] += 1
        else:                                                # 4. old synth
            f = os.path.join(work, 'synth', f'{i:03d}-{ty}.wav')
            if not render_synth(e, f):
                print(f'::warning::{s}: không có âm thanh cho loại "{ty}" (bỏ qua)'); src_count['skip'] += 1; continue
            cue = dict(base, sound=f, align='start', t=warp(t)); src_count['synth'] += 1
        if 0 <= cue['t'] < T: cues.append(cue)
        else: src_count['skip'] += 1

    C = {'fps': 30, 'duration_s': T, 'energy': mixcfg.get('energy', 'punchy'), 'kit': KIT,
         'voice': [{'file': os.path.join(REPO, 'assets', s, 'voice.mp3'), 'start_s': 0}],
         'duck_db': mixcfg.get('duck_db', 10), 'cues': cues}
    for k in ('lufs', 'room'):
        if k in mixcfg: C[k] = mixcfg[k]
    C.setdefault('lufs', -14)   # social-video loudness for every video (a calm mix used to land at −18 and sound quiet)
    music, mus = ev.get('music'), None
    if ev.get('score'):                                   # music composed for this video (scripts/music_gen.py)
        import music_gen
        f = os.path.join(work, 'synth', 'score.wav')
        music_gen.write_wav(f, music_gen.render(ev['score'], warp, T)); mus = f
        C['music'] = {'file': f, 'loop': False, 'fade_out_s': 1.0, 'lufs': mixcfg.get('music_lufs', -24)}
    elif isinstance(music, str) and music:
        # only the owner's own tracks (assets/music, a file path); downloaded CC0 tracks are no longer used:
        # the owner found them unfitting (29/10) — the designer writes a "score" instead
        p = music if os.path.isabs(music) else os.path.join(REPO, music)
        cand = [p] if os.path.isfile(p) else first_files(MUSIC_DIRS[:1], music)
        if cand: mus = cand[zlib.crc32(s.encode()) % len(cand)]
        else: print(f'::warning::{s}: không có nhạc riêng "{music}" → không nhạc')
        if mus:
            C['music'] = {'file': mus, 'loop': True, 'fade_out_s': 1.2}
            if 'music_lufs' in mixcfg: C['music']['lufs'] = mixcfg['music_lufs']
    elif music is not False and ev.get('bed') is True:
        f = os.path.join(work, 'synth', 'bed.wav'); b = synth.bed(T) * 0.5
        with wave.open(f, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(synth.SR); w.writeframes((b / max(1e-9, abs(b).max()) * 0.7 * 32767).astype('<i2').tobytes())
        C['music'] = {'file': f, 'loop': False, 'fade_out_s': 1.5, 'lufs': mixcfg.get('bed_lufs', -34)}

    json.dump(C, open(os.path.join(work, 'cues.json'), 'w'), indent=1)
    mus_label = (f"tự sáng tác ({len(ev['score'])} đoạn)" if ev.get('score') else
                 os.path.relpath(mus, REPO) if mus else ('nền tổng hợp' if 'music' in C else 'không'))
    print(f'{s}: {len(cues)} cues  (ghi sẵn {src_count["event"]} · của bạn {src_count["own"]} · kho CC0 {src_count["kit"]} · tổng hợp {src_count["synth"]} · bỏ {src_count["skip"]})'
          f'  nhạc: {mus_label}')
    subprocess.run([sys.executable, os.path.join(REPO, 'tools', 'sound-layer', 'mix.py'), os.path.join(work, 'cues.json'), '--out', work], check=True)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(work, 'mix.wav'), '-c:a', 'aac', '-b:a', '256k', a.out], check=True)
    write_credits(s, work, mus)


def write_credits(s, work, mus):
    rep = json.load(open(os.path.join(work, 'mix-report.json')))
    used = sorted({os.path.abspath(f) for e in rep['events'] for f in e['files'] if not str(f).startswith('synth:')})
    credit = {}
    try:
        for x in json.load(open(os.path.join(KIT, 'catalog.json')))['sounds']: credit[os.path.abspath(os.path.join(KIT, x['file']))] = x.get('credit', '')
    except Exception: pass
    try:
        for k, v in json.load(open(os.path.join(EXTRA, 'credits.json'))).items(): credit[os.path.abspath(os.path.join(EXTRA, k))] = v
    except Exception: pass
    lines = [f'# Âm thanh dùng trong `{s}`', '']
    for f in used + ([os.path.abspath(mus)] if mus else []):
        rel = os.path.relpath(f, REPO)
        if rel.startswith('out'): continue                   # synthesized here, no credit needed
        src = credit.get(f) or ('xem assets/CREDITS.md' if rel.startswith('assets') else '')
        lines.append(f'- `{rel}`' + (f' — {src}' if src else ''))
    open(os.path.join(work, 'CREDITS.md'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')


if __name__ == '__main__':
    main()
