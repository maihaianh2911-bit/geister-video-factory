---
name: vector-scene-layout
description: Design or fix phone-readable vector shots for this repository's narrated videos, including framing, focal points, typography, perspective and body/prop contact. Use before coding a new shot and when a render is crowded, clipped or hard to understand.
---

# Vector scene layout

Adapted from Paldom/storytelling-animation, commit 2c6dd3408ac13d3695cf3246da16b1c671a1ed30 (MIT).
Source: https://github.com/Paldom/storytelling-animation/tree/2c6dd3408ac13d3695cf3246da16b1c671a1ed30/skills/vector-scene-layout
The bundled LICENSE preserves the upstream copyright. These instructions are adapted for this repository's SVG-string renderer and existing review process.

## Repository contract
Read `prompts/scene_system.md` Visual direction and the video's visual notes first.
Use the existing 1080×1920 SVG renderer, storyboard schema and Remotion version.
Work in `src/videos/v<N>/shots/` and `jobs/v<N>/style.md`; keep the approved look when revising.
Do not scaffold a React project, install packages, copy upstream scene templates, change the renderer, replace the character library, or add an owner approval step.

## Apply
1. Read the relevant DE/VI lines and real voice timings. Choose one takeaway and a focal subject for each shot; related lines may share an action.
2. Choose the view that reveals that takeaway: wide for position, medium for interaction, close-up/cutaway for a small mechanism. Draw the actual event before decorating it.
3. Establish relative scale, room layout, light direction and the actor's line of sight. For characters, locate shoulders, elbows, wrists, feet, seat and grip/contact points before drawing the pose.
4. Keep the main subject distinct from the background through shape, spacing or contrast. Use only the detail the selected style needs; do not thicken every outline or fill every gap.
5. Keep the meaningful action clear of the subtitle band and platform controls. Use this repo's safe zones; upstream feed/slide margins are not replacements.
6. Use the short headline/keywords allowed by the brief. Break long German text by meaning; prefer fewer words to tiny type. See [legibility](references/legibility.md).
7. Render with the existing `node scripts/local_stills.cjs v<N> --review`. Inspect the already-generated shot evidence at phone size with actual subtitles; reuse unchanged evidence rather than adding a duplicate storyboard render.
8. Fix clipped text, weak focus, mismatched perspective, disconnected anatomy and prop intersections before motion polish. Record observations in the existing composition/content review fields.

## Small helper
Check a flat colour pair when contrast is uncertain:
```sh
python3 .claude/skills/vector-scene-layout/scripts/frame_tokens.py contrast "#F5F7FF" "#0B1020"
```
The contrast helper is diagnostic; passing it does not prove readability over a moving background.
Its other platform token presets are reference values only, not this project's layout contract.

## Hand off
Use the normal storyboard `subject`, `composition`, `takeaway` and `expected` fields.
Continue with `smooth-motion-choreography`. No extra report or full-video draft is required.
