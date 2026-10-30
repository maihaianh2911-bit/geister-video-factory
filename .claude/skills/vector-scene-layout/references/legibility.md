# Phone-size layout reference

Adapted from Paldom/storytelling-animation's vector-scene-layout/references/legibility.md at 2c6dd3408ac13d3695cf3246da16b1c671a1ed30 (MIT); see ../LICENSE.

- Judge the actual 1080×1920 frame at about 390 px wide, with real subtitles. A full-size desktop preview can hide tiny text.
- At 1080 px design width, upstream starting points are 32 px small labels, 48 px body, 84 px headline and 120 px display. These are starting points, not quotas or permission to make small essential labels.
- Give the subject one focal point. For a comparison, arrange the compared objects so their shared scale and difference can be read immediately. Do not force a fixed percentage of empty space.
- Put contrast in lightness, not only hue. For flat colour pairs, the bundled helper compares 4.5:1 text contrast (3:1 with --large); moving/textured backgrounds still need rendered inspection.
- Follow this repo's subtitle/UI safe zones. Do not replace them with the upstream LinkedIn/PowerPoint margins or a generic bottom-35-percent rule.
- Keep the selected font and line breaks stable. Shorten a German heading before shrinking it; do not change font-size or line width during an entrance and cause reflow.
- Preserve the selected line weight/material. Very fine strokes can disappear after scaling/encoding; inspect the final phone-sized result instead of imposing the same thick outline on every style.
- Keep empty space when it helps the composition. Add a shadow, texture, icon or detail only when it clarifies form, depth or meaning.
