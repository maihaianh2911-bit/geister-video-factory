# v89 — Was wäre, wenn du hören könntest, was deine beste Freundin wirklich denkt? (style bible)

- **Style:** "đầu tròn đen" (`prompts/styles/dau-tron-den/`), shapes reused from `reference.svg`: solid black round heads (`#1d1d1d`, r 100) with a soft white highlight, white-only faces, rounded tops with 5 px black outline, black stick legs and oval feet, dot hands; arms only when acting.
- **Mood:** serious everyday psychology; the only "humour" is the contrast between what Lena says and thinks. No comic sounds.
- **Cast (fixed in every shot, helper `person()` in `shots/lib.js`):** du = teal hoodie `#2fa59a` with light strings, no accessory (a small black quiff only in the Wednesday café shots, the "new hairstyle"); Lena = bun + small yellow hair clip `#f5c23a`, pink sweater `#e89aa8`; café friends = yellow cap `#f2c14e` + orange hoodie `#d9663a`, glasses + light-blue top `#a9c6e8`. Friday: the same mustard jacket `#c9862f` on du and Lena.
- **Hearing thoughts:** a yellow glow `#ffd23f` with two sound arcs around du's head; turns on at "hören" (shot 1), flares on every heard thought, switches off at "niemand" (shot 16).
- **Bubbles:** said = white rounded bubble with a pointed tail; thought = white pill with two small trailing circles. German text exactly as spoken, Inter 800, dark grey. When a thought appears, the speech bubble dims to 55 %.
- **Labels:** day cards MONTAG / MITTWOCH / FREITAG / SONNTAG at the top in yellow with a thick black outline; small white chips for key phrases (BEFÖRDERUNG, ZWEI SEKUNDEN SPÄTER, UNTER VIER AUGEN, VOR ANDEREN, LETZTE WOCHE).
- **Sets (blurred, feGaussianBlur 8 + vignette):** street (hook/ending thought), office (Monday), café (Wednesday + ending background), hallway with door (Friday), living room with sharp blue sofa (Sunday).
- **Camera:** one shot per script line (18 shots, 1.9–5.2 s), slow pushes; push-ins on the thought reveals (shots 8, 14); split screen top/bottom for line 9.
- **Motion:** idle bob + blinking always, bubbles pop with overshoot, walking in, shrugging, hands to ears/head, hug.
- **Sound:** composed score (tension → lofi D minor → warm pad), heartbeat on each heard thought, small hits on the day cards, real phone buzz, steps, light switch when the glow turns off. ~14 events/min.
- **Avoid:** subtitles area y 1420–1680; nothing important at x > 920 below y 900; no logos, no slapstick.
