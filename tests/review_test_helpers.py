import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('review', Path(__file__).parents[1] / 'scripts/review_scenes.py')
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)


class ReviewFixture(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.patch = patch.object(review, 'ROOT', self.root)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.video = self.root / 'src/videos/v1'
        self.job = self.root / 'jobs/v1'
        self.video.mkdir(parents=True)
        (self.job / 'review').mkdir(parents=True)
        self.board = [
            {'t0': 0, 't1': 1.5, 'lines': [0], 'action': 'Reach, pause, look', 'key_word': 'Hallo', 'key_time': .5, 'expected': 'Hand pauses'},
            {'t0': 1.5, 't1': 3, 'lines': [1], 'action': 'Look, turn, smile', 'key_word': 'Welt', 'key_time': 2, 'expected': 'Face turns'},
        ]
        self.write(self.video / 'storyboard.json', self.board)
        self.write(self.video / 'lines.json', [[0, 1.5, 'Hallo!'], [1.5, 3, 'Welt!']])
        self.write(self.video / 'timing.json', {'duration': 3})
        (self.video / 'scene.js').write_text('function scene(t) { return String(t); }')
        self.make_evidence()
        self.passed_report()

    def write(self, path, value):
        path.write_text(json.dumps(value))

    def make_evidence(self):
        plan = review.plan('v1')
        files = {}
        for group in plan['groups']:
            path = self.job / 'review' / group['file']
            path.write_bytes(b'fixture-image-' + group['file'].encode())
            files[group['file']] = hashlib.sha256(path.read_bytes()).hexdigest()
        self.write(self.job / 'review/manifest.json', {'plan': plan, 'files': files})

    def passed_report(self):
        report = review.init('v1', 1)
        report['reviewer'] = 'Test reviewer (fixture only)'
        for scene in report['scenes']:
            for result in scene['checks'].values():
                result.update(status='pass', notes='Fixture observation')
        for result in report['whole_video'].values():
            result.update(status='pass', notes='Fixture observation')
        self.write(self.job / 'scene_review.json', report)
        return report

