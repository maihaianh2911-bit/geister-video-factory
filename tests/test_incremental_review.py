import copy
import importlib.util
import json
from pathlib import Path
import shutil
import unittest

from review_test_helpers import ReviewFixture, review
import sys
sys.path.insert(0, str(Path(__file__).parents[1] / 'scripts'))
import scene_modules


class IncrementalReviewTests(ReviewFixture):
    def setUp(self):
        super().setUp()
        # Give the fixture root its own static dependency reader; it uses the installed parser.
        (self.root / 'scripts').mkdir()
        shutil.copy(Path(__file__).parents[1] / 'scripts/module_dependencies.cjs', self.root / 'scripts/module_dependencies.cjs')
        # NODE_PATH is only needed because this fixture lives outside the project tree.
        import os
        self.addCleanup(lambda: os.environ.pop('NODE_PATH', None) if self.old_node_path is None else os.environ.__setitem__('NODE_PATH', self.old_node_path))
        self.old_node_path = os.environ.get('NODE_PATH')
        os.environ['NODE_PATH'] = str(Path(__file__).parents[1] / 'node_modules')
        shots = self.video / 'shots'
        shots.mkdir()
        self.board = []
        lines = []
        for i in range(5):
            a, b = i * 1.5, (i + 1) * 1.5
            lines.append([a, b, f'Satz {i + 1}'])
            self.board.append({'t0': a, 't1': b, 'lines': [i], 'key_time': a + .5,
                               'key_word': f'Satz {i + 1}', 'action': 'Reveal diagram', 'expected': 'Visible result',
                               'subject': 'Diagram', 'composition': 'Large central diagram', 'takeaway': 'Visible progression',
                               'review_detail': 'simple', 'scene_module': f'shots/{i + 1:03d}.js'})
            (shots / f'{i + 1:03d}.js').write_text(f'export default function(t) {{ return "shot-{i + 1}" + t; }}')
        self.write(self.video / 'storyboard.json', self.board)
        self.write(self.video / 'lines.json', lines)
        self.write(self.video / 'timing.json', {'duration': 7.5})
        self.build()
        self.make_evidence()
        self.passed_report()

    def build(self):
        (self.video / 'scene.js').write_text(scene_modules.source(self.video, self.board))

    # Inherited monolithic-source tests live in SceneReviewTests; these methods exercise module-specific behaviour.
    def test_complete_review_passes(self):
        self.assertEqual(review.check('v1'), 5)

    def test_single_scene_edit_keeps_unaffected_reviews_only(self):
        old_plan = review.plan('v1')
        (self.video / 'shots/003.js').write_text('export default function(t) { return "new-shot" + t; }')
        new_plan = review.plan('v1')
        old_groups = {g['file']: g for g in old_plan['groups']}
        new_groups = {g['file']: g for g in new_plan['groups']}
        self.assertEqual(old_groups['scene-001.jpg'], new_groups['scene-001.jpg'])
        self.assertNotEqual(old_groups['scene-003.jpg'], new_groups['scene-003.jpg'])
        self.make_evidence()
        report = review.init('v1', 2)
        self.assertEqual([s['scene'] for s in report['scenes'] if s['carried']], [1, 5])
        self.assertEqual(report['whole_video']['hook']['status'], 'pass')
        self.assertEqual(report['whole_video']['continuity']['status'], 'pending')
        with self.assertRaises(ValueError): review.check('v1')

    def test_simple_scenes_have_three_frames_complex_has_more(self):
        plan = review.plan('v1')
        self.assertTrue(all(len(s['frames']) == 3 for s in plan['shots']))
        self.board[2]['review_detail'] = 'complex'
        self.write(self.video / 'storyboard.json', self.board)
        self.build()
        self.assertGreater(len(review.plan('v1')['shots'][2]['frames']), 3)

    def test_unchanged_review_is_preserved(self):
        report = review.init('v1', 2)
        self.assertTrue(all(s['carried'] for s in report['scenes']))
        self.assertEqual(review.check('v1'), 5)

    def test_shared_import_change_invalidates_all_importers(self):
        shared = self.video / 'shared.js'
        shared.write_text('export const label = "old";')
        for i in range(5):
            (self.video / f'shots/{i + 1:03d}.js').write_text('import {label} from "../shared.js"; export default function(t) { return label + t; }')
        self.make_evidence()
        self.passed_report()
        shared.write_text('export const label = "new";')
        self.make_evidence()
        report = review.init('v1', 2)
        self.assertFalse(any(s['carried'] for s in report['scenes']))

    def test_router_edit_cannot_hide_source_changes(self):
        (self.video / 'scene.js').write_text('export function __scene(t) { return "changed"; }')
        with self.assertRaisesRegex(ValueError, 'Router'): review.plan('v1')

    def test_dynamic_or_external_dependencies_rejected(self):
        for source in ('export default async function(t) { return import("./other.js"); }',
                       'import fs from "node:fs"; export default function(t) { return "x"; }'):
            (self.video / 'shots/001.js').write_text(source)
            with self.assertRaises(ValueError): review.plan('v1')

    def test_custom_motion_samples_must_stay_inside_scene(self):
        self.board[0]['review_times'] = [.1, .2, .3]
        self.write(self.video / 'storyboard.json', self.board)
        self.build()
        self.assertIn(6, review.plan('v1')['shots'][0]['frames'])
        self.board[0]['review_times'] = [9]
        self.write(self.video / 'storyboard.json', self.board)
        with self.assertRaises(ValueError): review.plan('v1')


