"""Create a synthetic video only for the CI renderer smoke test; no API calls or approvals."""
import json
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parents[1] / 'scripts'))
import design

slug = 'review-smoke'
root = Path(__file__).parents[1]
video, job = root / 'src/videos' / slug, root / 'jobs' / slug
video.mkdir(parents=True, exist_ok=True)
job.mkdir(parents=True, exist_ok=True)
lines = [[0, 1.5, 'Hallo!'], [1.5, 3, 'Welt!']]
(video / 'lines.json').write_text(json.dumps(lines))
(video / 'timing.json').write_text(json.dumps({
    'duration': 3, 'precision': 'word', 'orig': [[0, 1.5], [1.5, 3]], 'new': [[0, 1.5], [1.5, 3]],
    'chunks': [{'s': 0, 'e': 1.4, 'w': [['Hallo!', 0, 1.4]]}, {'s': 1.5, 'e': 3, 'w': [['Welt!', 1.5, 3]]}],
}))
board = [{'t0': a, 't1': b, 'lines': [i], 'title_vi': f'Test {i + 1}', 'desc_vi': 'Synthetic motion fixture',
          'action': 'A circle moves right', 'key_word': lines[i][2], 'key_time': a + .5,
          'expected': 'Circle changes position; subtitle stays readable'} for i, (a, b, _) in enumerate(lines)]
design.write_outputs(slug, '<style_json>{"subtitle":"pop","subtitle_y":900,"dust":false,"vignette":false}</style_json>\n<scene_js>\nfunction scene(t) { return `<rect width="1080" height="1920" fill="#234567"/><circle cx="${200 + 150 * t}" cy="600" r="140" fill="#ffd23f" stroke="#ffffff" stroke-width="8"/><rect x="80" y="1200" width="920" height="140" fill="#456789"/>`; }\n</scene_js>\n<events_json>{"music":false,"bed":false,"events":[]}</events_json>\n<storyboard_json>' + json.dumps(board) + '</storyboard_json>')


# The same fixture now exercises independent shot sources, not a shared scene body.
import scene_modules
shots = video / 'shots'
shots.mkdir(exist_ok=True)
for i, shot in enumerate(board):
    shot.update(subject='Moving circle', composition='Circle above subtitle zone', takeaway='The diagram progresses')
    shot['scene_module'] = f'shots/{i + 1:03d}.js'
    shot['review_detail'] = 'simple' if i == 0 else 'complex'
    (shots / f'{i + 1:03d}.js').write_text('export default function(t) { return `<rect width="1080" height="1920" fill="#234567"/><circle cx="${200 + 150 * t}" cy="600" r="140" fill="#ffd23f" stroke="#ffffff" stroke-width="8"/><rect x="80" y="1200" width="920" height="140" fill="#456789"/><rect x="80" y="1400" width="920" height="80" fill="#345678"/>`; }')
(video / 'storyboard.json').write_text(json.dumps(board))
(video / 'scene.js').write_text(scene_modules.source(video, board))
scene_modules.dependencies(root, video, board)
