# Motion recipes for this SVG renderer

Adapted from Paldom/storytelling-animation's smooth-motion-choreography references at 2c6dd3408ac13d3695cf3246da16b1c671a1ed30 (MIT); see ../LICENSE.
Use as starting points under the canonical visual rules, never as a fixed move/timing quota.

| Need | Recipe | Check |
|---|---|---|
| Reach/grip/lift | gaze/torso orient → hand reaches target → fingers close → hand and prop move as one | object does not travel before contact; wrist/arm stay attached |
| Step/sit/lean | shift weight toward support → move limb/body → settle on the support | no foot sliding, floating seat or body passing through furniture |
| Explain a mechanism | establish parts → move the cause → show its visible result | arrow/flow/component relationships match the script |
| Enter a label | short fade/rise or reveal, then settle for reading | no scale-from-zero pop, reflow or endless bounce |
| Reveal/compare | reframe toward a meaningful detail or put comparable objects side by side | new information, not a crop used to reset the pacing timer |
| Cut | finish the readable action/result, then reveal the next useful view | identity, object state and screen direction remain understandable |
| Optional loop | preserve pose and movement direction/velocity across the boundary | inspect last frames followed by first frames, and watch at normal speed |

Derive progress from authored time, not elapsed wall time. With existing engine helpers:
```js
const p = cl((t - actionStart) / Math.max(0.001, actionDuration));
const reach = eio(p);
const handX = lerp(restX, gripX, reach);
// Until gripTime: keep the prop at its support.
// After gripTime: derive the prop transform from the hand and local grip offset.
```
The snippet is a planning pattern, not a complete shot. Choose actual timings from this video's word timing.

Clamp completed actions so they do not extrapolate or restart. Seed any randomness.
Do not use timers, Date.now, Math.random, CSS transitions or interactive React state.
Use acceleration/deceleration where it represents a gesture; retain appropriate physics for gravity or steady mechanisms.
One small secondary action can support the event; breathing, dust and drifting alone do not complete it.
Keep important text settled long enough to read. A deliberate hold may serve comprehension.
For a difficult movement, inspect a short actual-composition motion segment plus close-spaced frames around the suspect instant.
