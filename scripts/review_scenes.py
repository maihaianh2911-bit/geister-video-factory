#!/usr/bin/env python3
"""Plan per-scene visual evidence and validate a review written after inspecting it.

plan SLUG: render plan (JSON); init SLUG --round N: pending review form;
check SLUG: fail closed on missing, failed or stale reviews. No automatic aesthetic score.
"""
import argparse
import copy
import hashlib
import json
import math
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FPS = 30
CRITERIA = ('content', 'action', 'motion', 'composition', 'timing')
GLOBAL = ('hook', 'continuity', 'pacing')


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def slug_paths(slug):
    if not re.fullmatch(r'[A-Za-z0-9_-]+', slug):
        raise ValueError('Mã video không hợp lệ')
    return ROOT / 'src/videos' / slug, ROOT / 'jobs' / slug


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def snapshot(slug, scoped=False):
    video, job = slug_paths(slug)
    paths = [video / n for n in ('scene.js', 'storyboard.json', 'timing.json', 'lines.json', 'style.json', 'events.json', 'mix.json')]
    paths += [job / 'job.json', job / 'style.md']
    paths += [ROOT / n for n in ('src/SvgVideo.tsx', 'src/Root.tsx', 'src/engine/core.js',
                                'src/index.ts', 'scripts/gen_registry.py', 'scripts/scene_modules.py', 'scripts/module_dependencies.cjs',
                                'scripts/local_stills.cjs', 'scripts/review_scenes.py',
                                'package-lock.json', 'remotion.config.ts')]
    if scoped: paths = [p for p in paths if p != video / 'storyboard.json']
    values = {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() if p.is_file() else None for p in paths}
    return fingerprint(values)


def number(value):
    return isinstance(value, (float, int)) and not isinstance(value, bool) and math.isfinite(value)


def text(value):
    return isinstance(value, str) and bool(value.strip())


def plan(slug):
    video, _ = slug_paths(slug)
    tm, board, lines = read(video / 'timing.json'), read(video / 'storyboard.json'), read(video / 'lines.json')
    duration = tm['duration']
    if not number(duration) or duration <= 0 or not isinstance(board, list) or not board:
        raise ValueError('Thiếu thời lượng hoặc phân cảnh')
    last = math.ceil(duration * FPS) - 1
    orig, new = tm.get('orig', []), tm.get('new', [])
    if bool(orig) != bool(new) or len(orig) != len(new):
        raise ValueError('Bản đồ timing orig/new không khớp')
    authored_duration = orig[-1][1] if orig else duration

    def warp(t):
        if not orig: return t
        for (a, b), (x, y) in zip(orig, new):
            if a <= t < b:
                return x + (t - a) / max(b - a, 1e-9) * (y - x)
        if abs(t - authored_duration) <= 0.001: return duration
        raise ValueError('Mốc phân cảnh nằm ngoài bản đồ timing')

    modular = any('scene_module' in shot for shot in board)
    deps = None
    if modular:
        if not all('scene_module' in shot for shot in board): raise ValueError('Không trộn cảnh module và cảnh nguyên khối')
        import scene_modules
        deps = scene_modules.dependencies(ROOT, video, board)
    common = snapshot(slug, scoped=modular)
    shots, groups = [], []
    prev = 0
    for i, shot in enumerate(board, 1):
        a, b, key = shot.get('t0'), shot.get('t1'), shot.get('key_time')
        if not all(number(x) for x in (a, b, key)) or not (0 <= a < b <= authored_duration + 0.001 and a <= key < b):
            raise ValueError(f'Cảnh {i}: t0/t1/key_time không hợp lệ')
        if abs(a - prev) > 0.001:
            raise ValueError(f'Cảnh {i}: phân cảnh bị hở hoặc chồng thời gian')
        if modular and any(not text(shot.get(field)) for field in ('subject', 'composition', 'takeaway')):
            raise ValueError(f'Cảnh {i}: cần chốt chủ thể, bố cục và ý chính trước khi viết module')
        refs = shot.get('lines')
        if not isinstance(refs, list) or not refs or any(type(n) is not int or not 0 <= n < len(lines) for n in refs):
            raise ValueError(f'Cảnh {i}: thiếu dòng kịch bản hợp lệ')
        for field in ('action', 'expected', 'key_word'):
            if not text(shot.get(field)):
                raise ValueError(f'Cảnh {i}: thiếu {field}')
        if shot['key_word'].casefold() not in ' '.join(lines[n][2] for n in refs).casefold():
            raise ValueError(f'Cảnh {i}: key_word không nằm trong dòng lời đọc đã chọn')
        prev = b
        a, b, key = warp(a), warp(b), warp(key)
        first, end = math.ceil(a * FPS - 1e-6), min(last, math.ceil(b * FPS - 1e-6) - 1)
        if first > end:
            raise ValueError(f'Cảnh {i}: ngắn hơn một khung hình')
        detail = shot.get('review_detail', 'complex')
        if detail not in ('simple', 'complex'): raise ValueError(f'Cảnh {i}: review_detail không hợp lệ')
        custom = shot.get('review_times', [])
        if not isinstance(custom, list) or any(not number(t) or not shot['t0'] <= t < shot['t1'] for t in custom):
            raise ValueError(f'Cảnh {i}: review_times nằm ngoài cảnh')
        samples = [a, key, b - 1 / FPS] if detail == 'simple' else [a, a + .2, key - .15, key, key + .15, (key + b) / 2, b - 1 / FPS]
        frames = sorted({max(first, min(end, round(t * FPS))) for t in samples + [warp(t) for t in custom]})
        render_key = fingerprint([common, deps[i - 1] if deps else None, a, b, frames])
        shots.append({'scene': i, 't0': a, 't1': b, 'action': shot['action'], 'expected': shot['expected'],
                      'key_word': shot['key_word'], 'key_time': key, 'frames': frames,
                      'render_key': render_key, 'content_key': fingerprint([render_key, shot])})
        groups.append({'file': f'scene-{i:03d}.jpg', 'frames': frames})
        groups.append({'file': f'poster-{i:03d}.jpg', 'frames': [min(frames, key=lambda f: abs(f / FPS - (a + b) / 2))]})
    if abs(prev - authored_duration) > 0.001:
        raise ValueError('Phân cảnh phải phủ hết video, gồm nhịp kết thúc')
    hook_last = min(last, math.ceil(min(3, duration) * FPS) - 1)
    groups.append({'file': 'hook.jpg', 'frames': sorted({0, hook_last} | {f for shot in shots for f in shot['frames'] if f <= hook_last})})
    groups.append({'file': 'overview.jpg', 'frames': [min(s['frames'], key=lambda f: abs(f / FPS - (s['t0'] + s['t1']) / 2)) for s in shots]})
    for i, shot in enumerate(shots):
        # Review the edited scene AND its neighbours, while reusing unaffected images.
        shot['review_key'] = fingerprint([s['content_key'] for s in shots[max(0, i - 1):i + 2]])
    # Two frames around every cut, split into small pages for readable review.
    cuts = [max(1, math.ceil(s['t0'] * FPS - 1e-6)) for s in shots[1:]]
    for page in range(0, len(cuts), 6):
        groups.append({'file': f'cuts-{page // 6 + 1:03d}.jpg', 'frames': [f for cut in cuts[page:page + 6] for f in (cut - 1, min(last, cut))]})
    for group in groups:
        owners = [s['render_key'] for s in shots if any(s['t0'] <= f / FPS < s['t1'] for f in group['frames'])]
        group['fingerprint'] = fingerprint([owners, group['frames']])
    global_keys = {'hook': fingerprint([next(g for g in groups if g['file'] == 'hook.jpg'), [s['content_key'] for s in shots if s['t0'] < 3]]),
                   'continuity': fingerprint([s['review_key'] for s in shots]),
                   'pacing': fingerprint([s['content_key'] for s in shots])}
    return {'schema': 2, 'slug': slug, 'fingerprint': fingerprint([snapshot(slug), deps]), 'shots': shots, 'groups': groups, 'global_keys': global_keys}


def evidence(slug):
    _, job = slug_paths(slug)
    current = plan(slug)
    manifest = read(job / 'review/manifest.json')
    if manifest.get('plan') != current:
        raise ValueError('Ảnh duyệt đã cũ: dựng lại local_stills.cjs --review')
    expected = {g['file'] for g in current['groups']}
    files = manifest.get('files', {})
    if not isinstance(files, dict) or set(files) != expected:
        raise ValueError('Thiếu ảnh bằng chứng cho một hoặc nhiều cảnh')
    for name, digest in files.items():
        p = job / 'review' / name
        if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest() != digest:
            raise ValueError(f'Ảnh duyệt thiếu hoặc đã thay đổi: {name}')
    return current, hashlib.sha256((job / 'review/manifest.json').read_bytes()).hexdigest()


def passed(values, required):
    return isinstance(values, dict) and set(values) == set(required) and all(
        isinstance(v, dict) and v.get('status') == 'pass' and text(v.get('notes')) for v in values.values())


def init(slug, round_number):
    current, digest = evidence(slug)
    _, job = slug_paths(slug)
    try: old = read(job / 'scene_review.json')
    except (OSError, ValueError): old = {}
    manifest = read(job / 'review/manifest.json')
    compatible = (old.get('schema') == 2 and old.get('slug') == slug and text(old.get('reviewer'))
                  and type(old.get('round')) is int and 1 <= old['round'] <= 3)
    previous = {s.get('scene'): s for s in old.get('scenes', []) if isinstance(s, dict)} if compatible else {}
    blank = lambda keys: {k: {'status': 'pending', 'notes': ''} for k in keys}
    scenes = []
    for shot in current['shots']:
        i, key = shot['scene'], shot['review_key']
        image = f'scene-{i:03d}.jpg'
        prior = previous.get(i, {})
        carry = prior.get('review_key') == key and prior.get('evidence_sha') == manifest['files'][image] and passed(prior.get('checks'), CRITERIA)
        scenes.append({'scene': i, 'evidence': image, 'evidence_sha': manifest['files'][image], 'review_key': key,
                       'carried': bool(carry), 'checks': copy.deepcopy(prior['checks']) if carry else blank(CRITERIA)})
    whole = blank(GLOBAL)
    if compatible:
        for key in GLOBAL:
            prior = old.get('whole_video', {}).get(key)
            if old.get('global_keys', {}).get(key) == current['global_keys'][key] and passed({key: prior}, (key,)):
                whole[key] = copy.deepcopy(prior)
    report = {'schema': 2, 'slug': slug, 'fingerprint': current['fingerprint'], 'manifest_sha': digest,
              'round': round_number, 'reviewer': old['reviewer'] if compatible else '',
              'scenes': scenes, 'whole_video': whole, 'global_keys': current['global_keys']}
    (job / 'scene_review.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return report


def check(slug):
    current, digest = evidence(slug)
    _, job = slug_paths(slug)
    report = read(job / 'scene_review.json')
    if report.get('schema') != 2 or report.get('slug') != slug or report.get('fingerprint') != current['fingerprint'] or report.get('manifest_sha') != digest:
        raise ValueError('Phiếu duyệt đã cũ hoặc không khớp ảnh hiện tại')
    if type(report.get('round')) is not int or not 1 <= report['round'] <= 3 or not text(report.get('reviewer')):
        raise ValueError('Thiếu người duyệt hoặc số vòng duyệt (1–3)')
    scenes = report.get('scenes')
    if not isinstance(scenes, list) or len(scenes) != len(current['shots']):
        raise ValueError('Chưa duyệt đủ các cảnh')

    def checks(values, required, label):
        if not isinstance(values, dict) or set(values) != set(required):
            raise ValueError(f'{label}: thiếu tiêu chí duyệt')
        for name, result in values.items():
            if not isinstance(result, dict) or result.get('status') != 'pass' or not text(result.get('notes')):
                raise ValueError(f'{label}/{name}: chưa đạt hoặc thiếu nhận xét')

    for s, expected in zip(scenes, current['shots']):
        if not isinstance(s, dict) or s.get('scene') != expected['scene'] or s.get('evidence') != f"scene-{expected['scene']:03d}.jpg":
            raise ValueError('Cảnh bị trùng, sai thứ tự hoặc thiếu bằng chứng')
        manifest = read(job / 'review/manifest.json')
        if s.get('review_key') != expected['review_key'] or s.get('evidence_sha') != manifest['files'][s['evidence']]:
            raise ValueError('Nhận xét cảnh không khớp nguồn hoặc ảnh hiện tại')
        checks(s.get('checks'), CRITERIA, f"Cảnh {s['scene']}")
    if report.get('global_keys') != current['global_keys']: raise ValueError('Nhận xét toàn video đã cũ')
    checks(report.get('whole_video'), GLOBAL, 'Toàn video')
    return len(scenes)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('command', choices=('plan', 'init', 'check'))
    ap.add_argument('slug')
    ap.add_argument('--round', type=int, choices=(1, 2, 3), default=1)
    a = ap.parse_args()
    try:
        if a.command == 'plan': print(json.dumps(plan(a.slug), ensure_ascii=False))
        elif a.command == 'init':
            report = init(a.slug, a.round)
            pending = [s['scene'] for s in report['scenes'] if not s['carried']]
            print(f'Cảnh cần duyệt: {pending}; chỉ giữ nhận xét đạt khi nguồn, ảnh và hai chỗ nối không đổi.')
        else: print(f'PASS: {check(a.slug)} cảnh và toàn video đã được ghi nhận duyệt.')
    except (ValueError, KeyError, TypeError, OSError) as e:
        print(f'Chưa qua duyệt cảnh: {e}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__': main()

