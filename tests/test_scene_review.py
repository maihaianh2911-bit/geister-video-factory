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


class SceneReviewTests(unittest.TestCase):
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

    def test_complete_review_passes(self):
        self.assertEqual(review.check('v1'), 2)

    def test_init_is_pending_and_never_auto_approves(self):
        review.init('v1', 2)
        with self.assertRaisesRegex(ValueError, 'người duyệt'):
            review.check('v1')

    def test_each_failed_or_unobserved_criterion_blocks(self):
        original = self.passed_report()
        for key in review.CRITERIA:
            for change in ({'status': 'fail'}, {'status': 'pending'}, {'notes': ''}):
                report = copy.deepcopy(original)
                report['scenes'][1]['checks'][key].update(change)
                self.write(self.job / 'scene_review.json', report)
                with self.subTest(key=key, change=change), self.assertRaises(ValueError):
                    review.check('v1')

    def test_missing_duplicate_or_reordered_scene_blocks(self):
        original = self.passed_report()
        for scenes in (original['scenes'][:1], [original['scenes'][0]] * 2, original['scenes'][::-1]):
            report = copy.deepcopy(original)
            report['scenes'] = scenes
            self.write(self.job / 'scene_review.json', report)
            with self.assertRaises(ValueError): review.check('v1')

    def test_whole_video_checks_required(self):
        report = self.passed_report()
        del report['whole_video']['continuity']
        self.write(self.job / 'scene_review.json', report)
        with self.assertRaises(ValueError): review.check('v1')

    def test_changed_scene_timing_style_or_events_invalidates_review(self):
        for name in ('scene.js', 'timing.json', 'style.json', 'events.json'):
            path = self.video / name
            old = path.read_bytes() if path.exists() else None
            if name == 'timing.json': self.write(path, {'duration': 3, 'voice_sha': 'new-voice'})
            else: path.write_text('changed')
            with self.subTest(file=name), self.assertRaisesRegex(ValueError, 'đã cũ'):
                review.check('v1')
            if old is None: path.unlink()
            else: path.write_bytes(old)

    def test_changed_render_source_invalidates_review(self):
        p = self.root / 'src/SvgVideo.tsx'
        p.write_text('new subtitle renderer')
        with self.assertRaisesRegex(ValueError, 'đã cũ'): review.check('v1')

    def test_missing_or_modified_evidence_blocks(self):
        p = self.job / 'review/scene-002.jpg'
        p.write_bytes(b'modified')
        with self.assertRaisesRegex(ValueError, 'Ảnh duyệt'): review.check('v1')
        p.unlink()
        with self.assertRaises(ValueError): review.check('v1')

    def test_pending_new_manifest_cannot_reuse_old_report(self):
        self.make_evidence()
        manifest = self.job / 'review/manifest.json'
        manifest.write_text(manifest.read_text() + '\n')
        with self.assertRaisesRegex(ValueError, 'Phiếu duyệt'): review.check('v1')

    def test_invalid_plan_rejected(self):
        for change in ({'key_time': 5}, {'t0': .1}, {'key_word': 'invented'}, {'action': ''}, {'lines': [99]}):
            board = copy.deepcopy(self.board)
            board[0].update(change)
            self.write(self.video / 'storyboard.json', board)
            with self.subTest(change=change), self.assertRaises(ValueError): review.plan('v1')

    def test_plan_samples_every_scene_hook_and_both_sides_of_cuts(self):
        plan = review.plan('v1')
        groups = {g['file']: g['frames'] for g in plan['groups']}
        self.assertIn(15, groups['scene-001.jpg'])
        self.assertIn(60, groups['scene-002.jpg'])
        self.assertEqual(groups['cuts-001.jpg'], [44, 45])
        self.assertEqual(groups['hook.jpg'][0], 0)
        for shot in plan['shots']:
            self.assertTrue(all(shot['t0'] <= f / 30 < shot['t1'] for f in shot['frames']))

    def test_round_limit_and_missing_report(self):
        report = self.passed_report()
        report['round'] = 4
        self.write(self.job / 'scene_review.json', report)
        with self.assertRaises(ValueError): review.check('v1')
        (self.job / 'scene_review.json').unlink()
        with self.assertRaises(OSError): review.check('v1')

    def test_voice_change_samples_warped_scene_times(self):
        self.write(self.video / 'timing.json', {
            'duration': 6, 'orig': [[0, 1.5], [1.5, 3]], 'new': [[0, 3], [3, 6]],
        })
        plan = review.plan('v1')
        self.assertEqual(plan['shots'][1]['t0'], 3)
        self.assertEqual(plan['shots'][1]['key_time'], 4)
        self.assertIn(120, plan['shots'][1]['frames'])
        self.assertEqual(plan['groups'][-1]['frames'], [89, 90])


if __name__ == '__main__': unittest.main()
