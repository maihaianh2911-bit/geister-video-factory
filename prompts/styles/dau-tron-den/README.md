# Style "đầu tròn đen" (round black heads)

Chosen by the owner on 02/11/2026 for story videos ("Was wäre, wenn …?" scenarios, dấu hiệu / signs told as scenes). A video uses it when its notes say `PHONG CÁCH: đầu tròn đen`.

Reference frames:
- `reference2.jpg` (source `reference2.svg`), **the quality bar since 02/11/2026**: medium shot, big characters, detailed lit room, sharp foreground props, light pool and vignette. Every shot must look at least this rich.
- `reference.jpg` (source `reference.svg`): the first version (wide shot, small characters, flat blurred background). Its character shapes, bubbles and title code are still valid; its framing and backgrounds are **too plain** — the owner asked for nicer pictures after videos #89–#92 were made in it.

## Characters
- Head: a solid black circle (`#1d1d1d`) with one soft highlight ellipse (white, opacity .15) at the upper left. Size depends on the framing (see Camera), never smaller than r ≈ 110 in a story shot.
- Face drawn in white only: round eyes with black pupils (pupil position shows where they look), white brow strokes for emotion (worried = inner ends up, angry = inner ends down), arcs for closed/happy eyes, a small curve or oval for the mouth. No nose, no skin colour.
- Identity comes from one accessory plus the top colour: bun, glasses, cap, curly hair (cluster of black circles), hair clip, scarf. Keep each character's accessory and colour identical in every scene.
- Body: a rounded hoodie/sweater/coat shape with a 5 px black outline, details inside (hoodie strings, pocket, knit seams).
- Arms only when they act, drawn as thick sleeve-coloured strokes with a black outline under them (outline stroke 10 px wider): hand to chin, arms crossed (two overlapping rounded forearms), pointing, hands on head, holding a phone/cup. Hands are black dots.
- Legs: black stick legs with flat oval feet; a soft blurred ground shadow under every character.
- A character who is thinking hard gets a small rim light on the lamp side of the head.

## Camera (framing)
- Mix three framings, never the same one twice in a row:
  - **Medium shot** (the default, like `reference2`): two characters from head to feet filling the frame width, heads r ≈ 150–165.
  - **Close-up** for reactions and thought bubbles: one head r ≈ 260–320, shoulders cut by the frame edge, background more blurred.
  - **Wide establishing shot** only for the first second of a new place, then push in.
- The camera is never still: every shot has a slow push-in or pan (scale 1.00 → 1.06 over the shot, or x shift ≈ 40 px). A reaction can have a quick push (1.0 → 1.12 in 0.3 s).
- Characters stand off-centre (rule of thirds) with the thought bubble in the free space; no big empty areas.

## Backgrounds (depth and light)
- Three layers, always:
  1. **Far background**, light blur (`stdDeviation` 3–4, not 9): a real, detailed place — shelves with books and plants, framed pictures, a window with a sky and city lights, curtains, a sofa, a fridge with magnets, a whiteboard, café counter with cups. At least 8 recognisable props per place.
  2. **Characters**, sharp.
  3. **Sharp foreground**: a table edge with cups/phone/keys, a desk with a laptop, a plant leaf — overlapping the bottom of the frame to give depth.
- Light: one clear source per scene (floor lamp, window, ceiling light, screen glow) drawn as a soft radial light pool, plus a vignette. Characters get a soft shadow on the floor.
- Colour mood per scene, matched to the feeling of the line: warm amber evening for calm/home, cool blue for worry/night, desaturated grey-blue for shock or loneliness, bright daylight for relief. Change the mood when the emotion changes.
- Use gradients (wall top → bottom, floor), never one flat colour for a whole wall or floor.

## Bubbles and text
- Thought bubbles: white rounded pills with a black outline and two small trailing circles toward the head; dark bold text, ≥ 40 px. A bubble shows the character's thought in German, exactly as spoken. Speech bubbles have a pointed tail instead of circles.
- On-screen labels (day cards such as `MONTAG`, the hook title): heavy sans-serif, white or yellow `#ffd23f`, thick black outline.
- Keep faces, bubbles and labels inside y 150–1400; subtitles sit lower. The sharp foreground may go below 1400 but must not hold anything the viewer has to read.

## Motion (never a still image)
- No shot stands longer than about 4 seconds without a change: cut, camera move, a character turning, walking in, an arm moving, or a bubble popping in.
- Always alive: blinking every few seconds, a slight idle bob, steam from cups, lights flickering softly; bubbles scale in with a small overshoot and fade out.
- Reactions are physical: hands to head, jump back, shrink, lean in, look away (pupils move).

## Tone
Serious German channel: the situations are everyday and recognisable, humour only from contrast between what someone says and what they think; no slapstick, no comic sound effects.
