#!/usr/bin/env python3
"""Scene design with Claude: turns a job (script + real voice timing + reference images) into
src/videos/<slug>/scene.js + events.json + storyboard.json.

Modes:
  direct  --slug S                  one streaming request now (full price)
  submit  --slugs S1,S2             one Message Batch for many videos (50 % cheaper, async)
  collect                           fetch ended batches from jobs/_batches/*.json and write results
  revise  --slug S --comment-file F one streaming request with the user's change request
  fix     --slug S --error-file F   one streaming request to repair code that failed validation
  mock    --slug S                  no API call: writes a simple placeholder animation (pipeline testing)

API key: ANTHROPIC_API_KEY. Model: ANTHROPIC_MODEL (default claude-opus-5-5).
Usage and cost of every call is appended to jobs/<slug>/usage.jsonl.
"""
import argparse, base64, glob, json, os, re, subprocess, sys, time, urllib.request, urllib.error

API = 'https://api.anthropic.com/v1'
KEY = os.environ.get('ANTHROPIC_API_KEY', '')
MODEL = os.environ.get('ANTHROPIC_MODEL', 'claude-opus-5-5')
MAX_TOKENS = int(os.environ.get('DESIGN_MAX_TOKENS', '48000'))
PRICES = {  # USD per million tokens: input, output, cache_write(5m), cache_read
    'claude-opus-5-5': (4, 20, 5, 0.2), 'claude-sonnet-5-5': (2, 10, 2.5, 0.1), 'claude-haiku-5-5': (0.1, 0.5, 0.125, 0.01)}
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(HERE)
ENGINE_NAMES = 'C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust'


def die(msg):
    print(f'::error::{msg}'); sys.exit(1)


def headers():
    return {'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json'}


def http(method, url, body=None, timeout=600):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, headers=headers(), method=method)
    try:
        with urllib.request.urlopen(r, timeout=timeout) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def check_status(code, raw):
    if code == 401: die('Claude API: key sai (401). Kiểm tra secret ANTHROPIC_API_KEY.')
    if code == 403: die('Claude API: không có quyền (403).')
    if code == 400 and b'credit' in raw.lower(): die('Claude API: hết tiền trong tài khoản API (credit balance). Nạp thêm ở platform.claude.com → Billing.')
    if code >= 400: die(f'Claude API lỗi {code}: {raw[:400].decode("utf-8", "replace")}')


# ---------------------------------------------------------------- prompt building
def system_blocks():
    sysmd = open(os.path.join(REPO, 'prompts', 'scene_system.md'), encoding='utf-8').read()
    ex = open(os.path.join(REPO, 'prompts', 'exemplar_geister.js'), encoding='utf-8').read()
    lp = os.path.join(REPO, 'prompts', 'lessons.md')
    lessons = open(lp, encoding='utf-8').read() if os.path.exists(lp) else ''
    core = open(os.path.join(REPO, 'src', 'engine', 'core.js'), encoding='utf-8').read()
    return [
        {'type': 'text', 'text': sysmd + ('\n\n# Lessons\n' + lessons if lessons.strip() else '')},
        {'type': 'text', 'text': '# Engine source (for reference — already in scope)\n```js\n' + core + '\n```\n\n# Exemplar: approved video "Gibt es Geister wirklich?" (its own timeline; study the staging, timing and detail)\n```js\n' + ex + '\n```',
         'cache_control': {'type': 'ephemeral'}},
    ]


def image_blocks(slug):
    blocks = []
    order = lambda p: ({'style': 0, 'video': 1, 'scene': 2}.get(os.path.basename(p).split('_')[0], 3), p)
    for p in sorted(glob.glob(os.path.join(REPO, 'jobs', slug, 'refs', '*')), key=order)[:12]:
        ext = p.rsplit('.', 1)[-1].lower()
        mt = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'webp': 'image/webp', 'gif': 'image/gif'}.get(ext)
        if not mt or os.path.getsize(p) > 4_500_000:
            continue
        label = os.path.basename(p)
        blocks.append({'type': 'text', 'text': f'Reference image `{label}` ' + ('(for the whole video style)' if label.startswith('style') else '(keyframe of the reference video: style, framing, pacing)' if label.startswith('video_') else f'(for scene {label.split("_")[1]})' if label.startswith('scene_') else '')})
        blocks.append({'type': 'image', 'source': {'type': 'base64', 'media_type': mt, 'data': base64.b64encode(open(p, 'rb').read()).decode()}})
    return blocks


def job_text(slug):
    job = json.load(open(os.path.join(REPO, 'jobs', slug, 'job.json'), encoding='utf-8'))
    tm = json.load(open(os.path.join(REPO, 'src', 'videos', slug, 'timing.json'), encoding='utf-8'))
    lines = []
    for i, de in enumerate(job['de']):
        s, e = tm['new'][i]
        vi = job['vi'][i] if i < len(job['vi']) else ''
        lines.append(f'{i}. [{s:.2f}–{e:.2f}s] DE: {de}\n   VI: {vi}')
    words = []
    for c in tm['chunks']:
        words += [f'{w}@{s:.2f}' for w, s, _ in c['w']]
    txt = (f'# Video `{slug}` — {job.get("title", "")}\n'
           f'DURATION (video length incl. ending beat): {tm["duration"]:.2f} s; voice ends at {tm.get("audio_duration", tm["duration"]):.2f} s.\n\n'
           '## Script lines with real voice timing\n' + '\n'.join(lines) + '\n\n'
           '## Word timings (word@start)\n' + ' '.join(words) + '\n\n'
           + sound_text()
           + (f'## Sources\n' + '\n'.join(job['sources']) + '\n\n' if job.get('sources') else '')
           + (f'## Visual notes from the channel owner (Vietnamese — follow them)\n{job["notes"]}\n\n' if job.get('notes') else '')
           + ('## Reference images follow. Take palette, composition, character shapes and mood from them; redraw in our flat-vector style — never trace or copy logos/characters.\n' if glob.glob(os.path.join(REPO, 'jobs', slug, 'refs', '*')) else ''))
    return txt


def sound_text():
    """What the sound layer offers this run: music moods and recorded sound types (folders under assets/)."""
    def dirs(d):
        out = set()
        for p in (os.path.join(REPO, 'assets', d), os.path.join(REPO, 'sound', 'extra', d)):
            if os.path.isdir(p): out |= {x for x in os.listdir(p) if os.path.isdir(os.path.join(p, x)) and not x.startswith('.')}
        return sorted(out)
    m, f = dirs('music'), dirs('sfx')
    return ('## Sound\n' + f'Music moods: {", ".join(m) if m else "(none yet: leave music out)"}\n'
            + f'Recorded sound types: {", ".join(f) if f else "(none yet)"}\n\n')


def request_params(slug, extra_text=None):
    content = [{'type': 'text', 'text': job_text(slug)}] + image_blocks(slug)
    if extra_text:
        content.append({'type': 'text', 'text': extra_text})
    else:
        content.append({'type': 'text', 'text': 'Design and animate the whole video now. Return <style_md>, <style_json>, <plan>, <scene_js>, <events_json>, <storyboard_json>.'})
    return {'model': MODEL, 'max_tokens': MAX_TOKENS, 'system': system_blocks(), 'messages': [{'role': 'user', 'content': content}]}


# ---------------------------------------------------------------- API calls
def stream_message(params):
    p = dict(params); p['stream'] = True
    r = urllib.request.Request(API + '/messages', data=json.dumps(p).encode(), headers=headers(), method='POST')
    text, usage = [], {}
    try:
        resp = urllib.request.urlopen(r, timeout=1800)
    except urllib.error.HTTPError as e:
        check_status(e.code, e.read())
    for raw in resp:
        line = raw.decode('utf-8', 'replace').strip()
        if not line.startswith('data:'):
            continue
        try:
            ev = json.loads(line[5:].strip())
        except Exception:
            continue
        t = ev.get('type')
        if t == 'message_start':
            usage.update(ev['message'].get('usage', {}))
        elif t == 'content_block_delta' and ev['delta'].get('type') == 'text_delta':
            text.append(ev['delta']['text'])
        elif t == 'message_delta':
            usage.update(ev.get('usage', {}))
        elif t == 'error':
            die(f'Claude API stream error: {ev}')
    return ''.join(text), usage


def cost(usage, batch=False):
    pi, po, pcw, pcr = PRICES.get(MODEL, PRICES['claude-opus-5-5'])
    c = (usage.get('input_tokens', 0) * pi + usage.get('output_tokens', 0) * po +
         usage.get('cache_creation_input_tokens', 0) * pcw + usage.get('cache_read_input_tokens', 0) * pcr) / 1e6
    return round(c * (0.5 if batch else 1), 4)


def log_usage(slug, kind, usage, batch=False):
    rec = {'time': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'kind': kind, 'model': MODEL, 'batch': batch,
           'usage': usage, 'usd': cost(usage, batch)}
    with open(os.path.join(REPO, 'jobs', slug, 'usage.jsonl'), 'a') as f:
        f.write(json.dumps(rec) + '\n')
    print(f'usage {slug} {kind}: {usage} -> ${rec["usd"]}')
    return rec


# ---------------------------------------------------------------- output handling
def tag(text, name):
    m = re.search(rf'<{name}>\s*(.*?)\s*</{name}>', text, re.S)
    return m.group(1) if m else None


def write_outputs(slug, text):
    js = tag(text, 'scene_js'); ev = tag(text, 'events_json'); sb = tag(text, 'storyboard_json')
    smd = tag(text, 'style_md'); sjs = tag(text, 'style_json')
    if not js or 'function scene' not in js:
        raise ValueError('Câu trả lời thiếu <scene_js> hoặc không có function scene(t).')
    js = re.sub(r'^```(?:js|javascript)?\s*|```\s*$', '', js.strip())
    d = os.path.join(REPO, 'src', 'videos', slug)
    if smd: open(os.path.join(REPO, 'jobs', slug, 'style.md'), 'w', encoding='utf-8').write(smd.strip() + '\n')
    sp = os.path.join(d, 'style.json'); style = {'dust': True, 'vignette': True, 'subtitle': 'default'}
    try: style.update(json.load(open(sp)))
    except Exception: pass
    if sjs:
        try: style.update(json.loads(re.sub(r'^```(?:json)?\s*|```\s*$', '', sjs.strip())))
        except Exception: print('::warning::style_json không hợp lệ — giữ kiểu cũ')
    if style.get('subtitle') not in ('default', 'horror', 'clean'): style['subtitle'] = 'default'
    json.dump(style, open(sp, 'w'), indent=1)
    header = (f"// @ts-nocheck\n// AUTO-GENERATED scene for {slug}. Change it by commenting on the issue.\n"
              f"import {{ {ENGINE_NAMES} }} from '../../engine/core.js';\n\n")
    footer = (f"\n\nconst __style = {json.dumps(style)};\nexport const subtitleStyle = __style.subtitle;\n"
              "export const __scene = scene;\n"
              "export function renderSvg(t) {\n  let body = '';\n  try { body = scene(t); } catch (e) { body = `<rect width=\"1080\" height=\"1920\" fill=\"#1a0b12\"/>`; }\n"
              "  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x=\"0\" y=\"0\" width=\"1080\" height=\"1920\" fill=\"url(#gVig)\"/>`);\n}\n"
              "export function subtitleAt(t) { return ''; }\n")
    open(os.path.join(d, 'scene.js'), 'w', encoding='utf-8').write(header + js + footer)
    try:
        evj = json.loads(re.sub(r'^```(?:json)?\s*|```\s*$', '', (ev or '{"events":[]}').strip()))
    except Exception:
        evj = {'events': []}; print('::warning::events_json không hợp lệ — bỏ qua âm thanh sự kiện')
    if isinstance(evj, list): evj = {'events': evj}
    evj.setdefault('bed', True); evj.setdefault('bed_gain', 0.09)
    json.dump(evj, open(os.path.join(d, 'events.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    try:
        sbj = json.loads(re.sub(r'^```(?:json)?\s*|```\s*$', '', (sb or '[]').strip()))
    except Exception:
        sbj = []
    json.dump(sbj, open(os.path.join(d, 'storyboard.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(os.path.join(REPO, 'jobs', slug, 'last_response.md'), 'w', encoding='utf-8').write(text)
    print(f'wrote scene.js ({len(js)} chars), {len(evj.get("events", []))} events, {len(sbj)} storyboard shots for {slug}')


# ---------------------------------------------------------------- mock (no API)
def mock(slug):
    tm = json.load(open(os.path.join(REPO, 'src', 'videos', slug, 'timing.json'), encoding='utf-8'))
    spans = tm['new']
    js = ['const SPANS = ' + json.dumps(spans) + ';', r'''
function shotA(t, a, b, i) {           // person reacts, ghost pops up behind
  const p = prog(t, a, a + 0.5), g = back(prog(t, a + 0.6, a + 1.0));
  return `<rect width="1080" height="1920" fill="url(#gWall)"/><rect y="1300" width="1080" height="700" fill="url(#gFloor)"/>`
    + (g > 0 ? ghostX(lerp(900, 780, g), 820 - 10 * Math.sin(t * 3), 0.9 * g, { t, mouth: 'grin', brows: 'mean', aL: 120 }) : '')
    + personF(lerp(-200, 420, eout(p)), 1360, 0.95, { look: g > 0 ? 14 : 0, brow: g, mouth: g > 0 ? 'o' : 'flat', aR: g > 0 ? -150 : -12, lean: g > 0 ? -6 : 0 });
}
function shotB(t, a, b, i) {           // number of ghosts pops in, counted
  let s = '<rect width="1080" height="1920" fill="#0b1124"/>' + stars(50, i + 3);
  const n = 1 + (i % 5) * 2;
  for (let k = 0; k < n; k++) { const p = back(prog(t, a + 0.15 * k, a + 0.15 * k + 0.3)); if (p <= 0) continue;
    const an = -Math.PI + (k / Math.max(1, n - 1)) * Math.PI; s += ghostX(540 + 330 * Math.cos(an), 860 + 330 * Math.sin(an), 0.45 * p, { t: t + k }); }
  return s + earth(t, 540, 900, 160);
}
function shotC(t, a, b, i) {           // hallway, door shakes, vase wobbles
  return hallway(t, { vaseRot: 8 * ring(t, a + 0.3, 3, 2), bulge: Math.abs(ring(t, a + 0.3, 4, 3)) * 2 });
}
function scene(t) {
  let i = SPANS.findIndex(([a, b]) => t >= a && t < b); if (i < 0) i = SPANS.length - 1;
  const [a, b] = SPANS[i];
  return [shotA, shotB, shotC][i % 3](t, a, b, i);
}''']
    events = []
    for i, (a, b) in enumerate(spans):
        events.append({'t': round(a, 3), 'type': 'hit', 'gain': 0.4, 'f0': 100, 'f1': 40, 'dur': 1.0})
        if i % 3 == 0: events.append({'t': round(a + 0.6, 3), 'type': 'pop', 'gain': 0.4})
        if i % 3 == 1:
            for k in range(1 + (i % 5) * 2): events.append({'t': round(a + 0.15 * k + 0.05, 3), 'type': 'ting', 'f': 440 * 2 ** (k / 12 * 2), 'gain': 0.3})
        if i % 3 == 2: events.append({'t': round(a + 0.3, 3), 'type': 'thud', 'gain': 0.8})
    job = json.load(open(os.path.join(REPO, 'jobs', slug, 'job.json'), encoding='utf-8'))
    sb = [{'t0': a, 't1': b, 'lines': [i], 'title_vi': f'Cảnh {i + 1} (MOCK)', 'desc_vi': (job['vi'][i] if i < len(job['vi']) else job['de'][i]) + ' — [bản mock, chưa do Claude thiết kế]'} for i, (a, b) in enumerate(spans)]
    text = '<plan>mock</plan><scene_js>' + '\n'.join(js) + '</scene_js><events_json>' + json.dumps({'events': events}) + '</events_json><storyboard_json>' + json.dumps(sb, ensure_ascii=False) + '</storyboard_json>'
    write_outputs(slug, text)


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(); ap.add_argument('mode', choices=['direct', 'submit', 'collect', 'revise', 'fix', 'mock'])
    ap.add_argument('--slug'); ap.add_argument('--slugs'); ap.add_argument('--comment-file'); ap.add_argument('--error-file')
    a = ap.parse_args()
    if a.mode == 'mock':
        return mock(a.slug)
    if not KEY:
        die('Thiếu secret ANTHROPIC_API_KEY (hoặc chạy chế độ mock).')
    if a.mode == 'direct':
        text, usage = stream_message(request_params(a.slug)); log_usage(a.slug, 'design', usage); write_outputs(a.slug, text)
    elif a.mode in ('revise', 'fix'):
        d = os.path.join(REPO, 'src', 'videos', a.slug)
        cur = open(os.path.join(d, 'scene.js'), encoding='utf-8').read()
        body = cur.split("from '../../engine/core.js';", 1)[-1].split('export const __scene', 1)[0].strip()
        evs = open(os.path.join(d, 'events.json'), encoding='utf-8').read()
        sb = open(os.path.join(d, 'storyboard.json'), encoding='utf-8').read()
        if a.mode == 'revise':
            ask = open(a.comment_file, encoding='utf-8').read()
            stp = os.path.join(REPO, 'jobs', a.slug, 'style.md')
            cur_style = open(stp, encoding='utf-8').read() if os.path.exists(stp) else ''
            extra = (('# Current style bible\n<style_md>\n' + cur_style + '</style_md>\n' if cur_style else '') + '# Current version\n<scene_js>\n' + body + '\n</scene_js>\n<events_json>' + evs + '</events_json>\n<storyboard_json>' + sb + '</storyboard_json>\n\n'
                     '# Change request from the channel owner (Vietnamese). Apply it precisely; keep everything else that was not mentioned. '
                     'Scene numbers refer to the storyboard order (1-based).\n' + ask + '\n\nReturn the COMPLETE updated <plan>, <scene_js>, <events_json>, <storyboard_json>.')
        else:
            err = open(a.error_file, encoding='utf-8').read()
            extra = ('# Your previous code failed automatic validation\n```\n' + err[-4000:] + '\n```\n# Code\n<scene_js>\n' + body + '\n</scene_js>\n<events_json>' + evs + '</events_json>\n<storyboard_json>' + sb + '</storyboard_json>\n'
                     'Fix the problems with minimal changes and return the COMPLETE <plan>, <scene_js>, <events_json>, <storyboard_json>.')
        text, usage = stream_message(request_params(a.slug, extra)); log_usage(a.slug, a.mode, usage); write_outputs(a.slug, text)
    elif a.mode == 'submit':
        slugs = [s for s in (a.slugs or '').split(',') if s]
        if not slugs: print('Không có video nào trong hàng chờ.'); return
        body = {'requests': [{'custom_id': s, 'params': request_params(s)} for s in slugs]}
        code, raw = http('POST', API + '/messages/batches', body); check_status(code, raw)
        b = json.loads(raw); os.makedirs(os.path.join(REPO, 'jobs', '_batches'), exist_ok=True)
        json.dump({'id': b['id'], 'slugs': slugs, 'created': b.get('created_at'), 'model': MODEL},
                  open(os.path.join(REPO, 'jobs', '_batches', b['id'] + '.json'), 'w'), indent=1)
        print(f'batch {b["id"]} submitted for {slugs}')
    elif a.mode == 'collect':
        done = []
        for f in sorted(glob.glob(os.path.join(REPO, 'jobs', '_batches', '*.json'))):
            meta = json.load(open(f))
            code, raw = http('GET', f'{API}/messages/batches/{meta["id"]}'); check_status(code, raw)
            st = json.loads(raw)
            print(f'batch {meta["id"]}: {st.get("processing_status")} {st.get("request_counts")}')
            if st.get('processing_status') != 'ended':
                continue
            code, raw = http('GET', st['results_url']); check_status(code, raw)
            for line in raw.decode('utf-8').splitlines():
                if not line.strip(): continue
                r = json.loads(line); slug = r['custom_id']; res = r['result']
                if res['type'] != 'succeeded':
                    print(f'::warning::{slug}: batch result {res["type"]}'); open(os.path.join(REPO, 'jobs', slug, 'design_failed'), 'w').write(json.dumps(res)); continue
                msg = res['message']; text = ''.join(c.get('text', '') for c in msg['content'] if c.get('type') == 'text')
                log_usage(slug, 'design', msg.get('usage', {}), batch=True)
                try:
                    write_outputs(slug, text); done.append(slug)
                except Exception as e:
                    print(f'::warning::{slug}: {e}'); open(os.path.join(REPO, 'jobs', slug, 'design_failed'), 'w').write(str(e))
            os.remove(f)
        open(os.path.join(REPO, 'jobs', '_collected.txt'), 'w').write('\n'.join(done))
        print('collected:', done)


if __name__ == '__main__':
    main()
