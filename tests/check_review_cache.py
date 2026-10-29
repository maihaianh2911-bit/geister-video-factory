"""Integration smoke test. Approvals here are ONLY for the synthetic review-smoke fixture."""
import json
import os
from pathlib import Path
import subprocess
import sys
sys.path.insert(0, 'scripts')
import review_scenes as review

slug = 'review-smoke'
job = Path('jobs') / slug
video = Path('src/videos') / slug

def render():
    result = subprocess.run(['node', 'scripts/local_stills.cjs', slug, '--review'], text=True, capture_output=True, check=True)
    print(result.stdout)
    return json.loads(result.stdout)

def approve_fixture():
    report = review.init(slug, 1)
    assert report['slug'] == 'review-smoke'
    report['reviewer'] = 'CI synthetic fixture only'
    for scene in report['scenes']:
        for result in scene['checks'].values(): result.update(status='pass', notes='Synthetic test fixture')
    for result in report['whole_video'].values(): result.update(status='pass', notes='Synthetic test fixture')
    (job / 'scene_review.json').write_text(json.dumps(report))
    assert review.check(slug) == 2

cold = render()
assert cold['frames'] > 0
initial = review.init(slug, 1)
assert all(not s['carried'] for s in initial['scenes'])
try: review.check(slug)
except ValueError: pass
else: raise AssertionError('Pending review passed')
approve_fixture()
warm = render()
assert warm['frames'] == 0 and warm['rendered_sheets'] == 0, warm
assert all(s['carried'] for s in review.init(slug, 2)['scenes'])
assert review.check(slug) == 2

# Storyboard preview must byte-copy the reviewed posters without preparing a renderer.
result = subprocess.run(['node', 'scripts/preview.mjs', slug, slug], env={**os.environ, 'SKIP_CLIP': '1'}, text=True, capture_output=True, check=True)
print(result.stdout)
assert 'reused 2 reviewed storyboard posters' in result.stdout
for i in (1, 2):
    assert (Path('out/preview') / slug / f'sb_{i:03d}.jpg').read_bytes() == (job / 'review' / f'poster-{i:03d}.jpg').read_bytes()
subprocess.run(['bash', 'scripts/storyboard_sheet.sh', slug], check=True)
assert (Path('out/preview') / slug / 'storyboard.jpg').stat().st_size > 0

# Editing the second source changes only its pictures; other raw samples can be reused.
p = video / 'shots/002.js'
p.write_text(p.read_text().replace('#ffd23f', '#ff4567'))
try: review.check(slug)
except ValueError: pass
else: raise AssertionError('Stale review passed')
changed = render()
assert 0 < changed['frames'] < cold['frames'], (cold, changed)
assert changed['reused_sheets'] > 0 and changed['reused_frames'] > 0
report = review.init(slug, 2)
assert not any(s['carried'] for s in report['scenes']), 'Edited scene and neighbour both need inspection'

# A corrupted cached sheet must be rebuilt, not silently reused.
(job / 'review/scene-001.jpg').write_bytes(b'corrupt')
repair = render()
assert repair['rendered_sheets'] > 0
assert (job / 'review/scene-001.jpg').read_bytes() != b'corrupt'
print('Cache, selective render, storyboard reuse and stale/tampered evidence checks passed')
