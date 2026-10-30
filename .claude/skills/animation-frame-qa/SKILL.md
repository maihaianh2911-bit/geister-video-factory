---
name: animation-frame-qa
description: Inspect a final MP4 from this repository at phone size using bounded frame sheets, safe-area overlays, metadata and luminance diagnostics. Use after final rendering or when reported defects need locating; complement the existing per-scene review without auto-approving it.
---

# Animation frame QA

Adapted from Paldom/storytelling-animation, commit 2c6dd3408ac13d3695cf3246da16b1c671a1ed30 (MIT).
Source: https://github.com/Paldom/storytelling-animation/tree/2c6dd3408ac13d3695cf3246da16b1c671a1ed30/skills/animation-frame-qa
The bundled LICENSE preserves the upstream copyright. These instructions are adapted for this repository's SVG-string renderer and existing review process.

## Repository contract
Use this after a final MP4 exists, or for a specific rendered defect.
Keep the existing scene-review schema, evidence signatures, maximum three fix rounds and QA-FIX workflow.
This helper produces inspection evidence; it never changes issue labels, marks native scene review passed, starts production or publishes a video.
No new owner approval or second full-video draft is needed.

## Apply
1. Obtain the actual final MP4 through the repository's normal render workflow. Keep the source unchanged.
2. Reuse equivalent fresh final-video evidence when it already exists. Otherwise use a new empty output folder:
```sh
python3 .claude/skills/animation-frame-qa/scripts/qa_frames.py /tmp/v59-final.mp4 --out /tmp/v59-final-qa --family repo --max-samples 60
```
Replace the example paths with the video being reviewed. Add `--wrap` only for an intentionally looping film.
3. Open `contact.png`, the `phone-*.png` frames and `safe-*.png` overlays. Read `report.json` for decoded duration/fps/frame count and candidate luminance jumps.
4. Apply [the checklist](references/review-checklist.md). Treat red safe rectangles as guides for key visuals, not a ban on subtitles in their intended band.
5. Use native per-shot evidence for every scene. Do not pass this repo's storyboard JSON to this helper's upstream-only `--storyboard` option; the schema and voice-remapped clock differ.
6. Watch actual motion at normal speed, especially around contact errors, cuts or suspected flashes. Sparse sheets and mean-luminance measurements do not prove natural movement or visual quality.
7. Record observed faults and exact scene/time references using the current review/QA process. Use the existing QA-FIX path for defects; keep successful parts and refresh invalidated evidence after a fix.
8. Report what was actually inspected. A helper exit code of zero means evidence generation succeeded without a detected technical failure; manual checks may still be pending. Never convert it into blanket approval.

## Helper details
`--family repo` is the default and follows the canonical 1080×1920 key-visual region (x 40–920, y 150–1400), scaled with resolution.
Other upstream platform presets remain diagnostic references.
The report fingerprints the source MP4; do not reuse evidence after its content changes.
The generic report's manual decisions are supplemental; the repository's native review gate remains authoritative.
