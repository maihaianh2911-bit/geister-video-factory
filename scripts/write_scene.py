#!/usr/bin/env python3
"""Write a scene design (same tagged format as the API path) into src/videos/<slug>/.
Usage: write_scene.py <slug> <response.md>
The response must contain <scene_js>…</scene_js>, <events_json>…</events_json>, <storyboard_json>…</storyboard_json>
(<plan> optional). scene_js defines `function scene(t)` using engine names already in scope."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import design  # noqa: E402

slug, resp = sys.argv[1], sys.argv[2]
design.write_outputs(slug, open(resp, encoding='utf-8').read())
