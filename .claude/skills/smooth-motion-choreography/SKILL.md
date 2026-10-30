---
name: smooth-motion-choreography
description: Animate or repair narrated SVG shots in this repository so body movement, grip/release, object state, camera movement and cuts follow clear causes and real word timings. Use when motion is stiff, floaty, jerky, repetitive or out of sync.
---

# Smooth motion choreography

Adapted from Paldom/storytelling-animation, commit 2c6dd3408ac13d3695cf3246da16b1c671a1ed30 (MIT).
Source: https://github.com/Paldom/storytelling-animation/tree/2c6dd3408ac13d3695cf3246da16b1c671a1ed30/skills/smooth-motion-choreography
The bundled LICENSE preserves the upstream copyright. These instructions are adapted for this repository's SVG-string renderer and existing review process.

## Repository contract
Follow the owner's notes, `prompts/scene_system.md` and the existing style bible.
This repo renders SVG from deterministic `renderShot(t)` functions.
Use its time helpers and existing shot modules; do not replace them with React templates, TransitionSeries, CSS animation or an animation library.
Do not import a wall-clock state machine. Do not add dependencies or change the pinned Remotion version.

## Apply
1. Read the shot's action, key spoken word/time and visible expected result. Separate preparation, main movement and result/settle. These are stages of the event, not three mandatory cuts.
2. Keep the character's body support and silhouette stable while articulating the parts needed for the action. A reaching hand connects through shoulder/elbow/wrist; its gaze and torso anticipate the target.
3. Establish contact before moving a prop. While gripped, derive its transform from the hand/grip transform. After release, let the object's own movement take over. Preserve hand, contents and open/closed state across cuts.
4. Derive all values from authored `t`, with clamped progress and the existing `eio`/`eout`/`lerp` helpers. Follow physics for a fall or pour; do not apply generic easing to every event.
5. Apply one useful secondary response: a body settling after a step, water responding to an entry, or a door stopping at its hinge. Idle breathing/dust does not substitute for the main event.
6. Use camera movement to reveal/follow/compare. Keep readable text settled; avoid repeated scale pulses, extreme whole-frame travel and a whoosh on every cut. Choose a clean cut when it communicates better than a transition.
7. Land the important contact/result and audible effect on their actual word/event. Keep the source/authored timeline intact when voice timing is remapped.
8. Inspect existing before/key/after sheets and cut evidence. For a multi-step or questionable action, render and watch a short actual-composition segment around it at normal speed; use closely spaced stills to locate a defect.
9. Fix the implicated shot and neighbours, then refresh only invalidated evidence using the native review tools. Work within the existing three review/fix rounds.

Read [motion vocabulary](references/motion-vocabulary.md) for concrete timing/pose recipes.
A loop is optional; preserve both pose and direction/velocity at the seam when one is requested.
Do not add bounce, stretch, a loop or forced transitions to satisfy a recipe.

## Hand off
Keep action and expected-result descriptions testable in the existing storyboard.
Record actual contact, continuity and timing observations under the normal review fields.
The official `remotion-markup` skill is available for compatible API questions.
