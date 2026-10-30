# Lessons (bài học của kênh)

Canonical visual rules: [scene_system.md — Visual direction](scene_system.md#visual-direction-canonical-quality-rules).
This file records past mistakes and their prevention. Do not duplicate the full brief or introduce competing timing/style rules. New owner feedback: merge into the matching lesson; add a new line only for a distinct failure. Keep this list around 40 lines or fewer.

- Grip and orientation: fingers wrap the prop; it follows the hand until released (v13: bottle upside down). It may tilt when the action calls for it.
- Show the action the script describes. A closed door is not a substitute for a visible person's reaction. Expressions match the event, rather than one fixed expression for all scenes.
- Preserve identity across shots and close-ups: silhouette, proportions, hair, clothes, accessories; arms connect through shoulders/wrists with natural lengths.
- Check support and contact in motion: feet on the floor, body on the seat, hands on their target; no floating props or limbs crossing through objects.
- Keep the subtitle area readable on every background; light/busy scenes need the subtitle box (v31: white text vanished on cream and over a basket).
- Time counters to the spoken word; compute related values together so they agree (v30: fold count/thickness; v31: area).
- Do not invent factual names, dates or quantities (v31: invented towns). Neutral set dressing is allowed when it does not imply an unsupported fact.
- Cards, boards and screens appear with their content; no empty containers or repeated tableau carrying unrelated lines (v42).
- Frame zero must reveal the topic at phone size; a dark scene still needs a clear focal point — in night videos every shot keeps a lit, phone-sized subject (a person doing the action, not abstract dots or arcs), and no shot breaks the video's tone with a full-frame flat colour. Repeated title cards (e.g. REGEL n) share one size, position and backdrop style (v60). Use the canonical opening rules instead of a decorative flash/zoom.
- Use the canonical pacing targets; compare progression rather than merely counting cuts. Repeated crops, dust or idle loops do not fix a static scene.
- Match the chosen style within the video. Lottie/3D or engine helpers must fit its palette and proportions; do not assemble mismatched clip-art.
- Serious, clear cause and effect for these channels; no silly gags or comic boing/womp effects.
- Before delivery, inspect the actual final video. Fix clipped/overlapping text, unreadable subtitles, unexplained blank/static sections, distorted/changing bodies, mismatched assets, poor subject contrast, incorrect facts and visuals out of sync with the voice. Use short motion segments for contact/timing problems; stills alone can miss them.
- Record only inspections actually performed. Technical checks do not judge beauty or motion. Use the existing per-scene review and final-video QA; failures receive the existing `🤖 QA-FIX:` process.
- Asynchronous loading (fonts, data) takes its `delayRender()` handle inside a component, never at module load: a module-level handle is orphaned when Remotion re-initialises and times out mid-render although the load finished.
