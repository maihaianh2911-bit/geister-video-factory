import json
from pathlib import Path
import subprocess
import tempfile
import unittest


class DeterminismTests(unittest.TestCase):
    def validate(self, body):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            video = root / 'src/videos/v1'
            video.mkdir(parents=True)
            (video / 'scene.js').write_text(body)
            (video / 'timing.json').write_text(json.dumps({'duration': 2}))
            (video / 'events.json').write_text('{"events":[]}')
            result = subprocess.run(['node', str(Path(__file__).parents[1] / 'scripts/validate_scene.mjs'), 'v1'], cwd=root, text=True, capture_output=True)
            return result.returncode, json.loads(result.stdout)

    def test_pure_frame_function_passes(self):
        code, report = self.validate('export function __scene(t) {return "<rect width=\\"1080\\" height=\\"1920\\" fill=\\"#123456\\"/>" + " ".repeat(240) + t;}')
        self.assertEqual(code, 0, report)

    def test_stateful_frame_function_is_rejected(self):
        code, report = self.validate('let n=0; export function __scene(t) {return "<rect width=\\"1080\\" height=\\"1920\\" fill=\\"#123456\\"/>" + " ".repeat(240) + n++;}')
        self.assertNotEqual(code, 0)
        self.assertTrue(any('không xác định' in error for error in report['errors']), report)
