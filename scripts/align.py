#!/usr/bin/env python3
"""Word-level alignment of a locked script against the real voice audio.

Input : --audio voice.mp3, --lines lines.json  ([[orig_start, orig_end, "German text"], ...])
Output: --out timing.json with
  duration   : audio length (s) + tail
  orig/new   : per-line [start, end] in the prototype timeline and in the real audio
               (used to time-warp the animation so every line's visuals sit on its spoken words)
  chunks     : subtitle phrases (2-4 words) with per-word times, spelled exactly as in the script
  precision  : "word" when Whisper aligned the words, "estimated" otherwise

Script words are matched to Whisper words with difflib; unmatched script words get times
interpolated from their matched neighbours (never an even split of the whole line).
"""
import argparse, difflib, json, re, subprocess


def norm(w):
    w = w.lower().replace('ß', 'ss')
    return re.sub(r'[^0-9a-zäöü]+', '', w)


def audio_duration(path):
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', path])
    return float(out.decode().strip())


# Whisper settings tried in order. Plain decoding sometimes drops or garbles whole sentences (v65, v71, v74, v77 on
# 30/10: 55-80 % of the words matched, lines squeezed to 0.05 s); silence filtering without carry-over context helps.
# The script prompt can also make Whisper skip text it "expects" (v71), so the last try decodes without it.
DECODES = [dict(vad_filter=False, condition_on_previous_text=True, prompt=True),
           dict(vad_filter=True, condition_on_previous_text=False, prompt=True),
           dict(vad_filter=True, condition_on_previous_text=False, prompt=False)]


def whisper_words(audio, prompt, model_name):
    """Yields the word list of each decode setting in DECODES."""
    from faster_whisper import WhisperModel
    model = WhisperModel(model_name, device='cpu', compute_type='int8')
    for opts in DECODES:
        segs, _ = model.transcribe(audio, language='de', word_timestamps=True, beam_size=5,
                                   initial_prompt=prompt[:800] if opts['prompt'] else None,
                                   vad_filter=opts['vad_filter'], condition_on_previous_text=opts['condition_on_previous_text'])
        words = []
        for s in segs:
            for w in (s.words or []):
                words.append((w.word.strip(), float(w.start), float(w.end)))
        yield words


def match_words(A, words):
    times = [None] * len(A)
    sm = difflib.SequenceMatcher(a=A, b=[norm(w[0]) for w in words], autojunk=False)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            w = words[blk.b + k]
            times[blk.a + k] = [w[1], w[2]]
    return times


def chunk_tokens(tokens):
    """tokens: list of (text, start, end). Break on punctuation, 4 words, or ~24 chars."""
    chunks, cur = [], []
    for tok in tokens:
        cur.append(tok)
        txt = ' '.join(t[0] for t in cur)
        end_punct = re.search(r'[.!?:;,]$', tok[0]) is not None
        if end_punct or len(cur) >= 4 or len(txt) >= 24:
            chunks.append(cur); cur = []
    if cur:
        chunks.append(cur)
    # merge a dangling single short word into the previous chunk
    out = []
    for c in chunks:
        if out and len(c) == 1 and len(c[0][0]) <= 4 and not re.search(r'[.!?]$', out[-1][-1][0]):
            out[-1] = out[-1] + c
        else:
            out.append(c)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--audio', required=True)
    ap.add_argument('--lines', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--model', default='small')
    ap.add_argument('--tail', type=float, default=0.9)
    ap.add_argument('--orig-from', help='old timing.json: keep scenes designed on the old voice and warp them onto the new one')
    ap.add_argument('--identity', action='store_true', help='scenes are authored on the real voice timeline: orig = new')
    a = ap.parse_args()

    lines = json.load(open(a.lines, encoding='utf-8'))
    script_tokens = []  # (text, line_index)
    for i, (_, _, text) in enumerate(lines):
        for w in text.split():
            script_tokens.append((w, i))
    dur = audio_duration(a.audio)
    full_text = ' '.join(l[2] for l in lines)

    A = [norm(t[0]) for t in script_tokens]
    times, matched, seen = [None] * len(A), -1, []
    for words in whisper_words(a.audio, full_text, a.model):
        cand = match_words(A, words)
        n = sum(1 for t in cand if t)
        print(f'decode {len(seen) + 1}: {n}/{len(A)} words matched')
        seen.append(n)
        if n > matched:
            times, matched = cand, n
        if matched >= 0.95 * len(A):
            break
    precision = 'word' if matched >= 0.6 * len(times) else 'estimated'

    # interpolate unmatched tokens between matched neighbours
    known = [i for i, t in enumerate(times) if t]
    if not known:
        for i in range(len(times)):
            s = dur * i / len(times); times[i] = [s, s + dur / len(times)]
    else:
        for i in range(len(times)):
            if times[i]:
                continue
            prev = max([k for k in known if k < i], default=None)
            nxt = min([k for k in known if k > i], default=None)
            t0 = times[prev][1] if prev is not None else 0.0
            t1 = times[nxt][0] if nxt is not None else dur
            p0 = prev if prev is not None else -1
            p1 = nxt if nxt is not None else len(times)
            f0 = (i - p0) / (p1 - p0); f1 = (i + 1 - p0) / (p1 - p0)
            times[i] = [t0 + (t1 - t0) * f0, t0 + (t1 - t0) * f1]

    # monotonic clean-up
    for i in range(1, len(times)):
        if times[i][0] < times[i - 1][0]:
            times[i][0] = times[i - 1][0]
        if times[i][1] < times[i][0]:
            times[i][1] = times[i][0] + 0.05

    n = len(lines)
    starts = []
    for li in range(n):
        idx = [k for k, (_, l) in enumerate(script_tokens) if l == li]
        starts.append(times[idx[0]][0] if idx else (starts[-1] if starts else 0.0))
    starts[0] = 0.0
    total = dur + a.tail
    new = [[starts[i], starts[i + 1] if i + 1 < n else total] for i in range(n)]
    orig = [[l[0], l[1]] for l in lines]
    if a.identity:
        orig = [[round(x, 3), round(y, 3)] for x, y in new]
    if a.orig_from:
        orig = json.load(open(a.orig_from, encoding='utf-8'))['orig']

    toks = [(script_tokens[i][0], round(times[i][0], 3), round(times[i][1], 3)) for i in range(len(times))]
    chunks = []
    for c in chunk_tokens(toks):
        chunks.append({'s': c[0][1], 'e': c[-1][2], 'w': [[t, s, e] for t, s, e in c]})

    import hashlib
    voice_sha = hashlib.sha1(open(a.audio, 'rb').read()).hexdigest()[:12]
    res = {'voice_sha': voice_sha, 'duration': round(total, 3), 'audio_duration': round(dur, 3), 'precision': precision,
           'matched_words': matched, 'script_words': len(times), 'orig': orig,
           'new': [[round(x, 3), round(y, 3)] for x, y in new], 'chunks': chunks}
    json.dump(res, open(a.out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'aligned {matched}/{len(times)} words ({precision}); audio {dur:.2f}s; {len(chunks)} subtitle chunks')


if __name__ == '__main__':
    main()
