<style_md>
# 30 Tage kalt duschen — style bible
- Mood: friendly, clean, bright morning; curious and a little funny, honest at the twist.
- Palette: turquoise `#2EC4B6` (dark `#1E9C90`, light `#9BE7DF`), white, organ pink `#FF8FA3` (dark `#E06A82`, light `#FFC2CD`), ink navy `#16324F` (outlines), warm skin `#F1C6A5`, pastel room `#EAF6F4`, tiles `#D6EEEA`; hot water `#FF6B5B`, cold water `#4DA8F0`/`#BFE6FF`; highlight yellow `#FFD166` for noradrenaline sparks, sick notes and warnings.
- Line: 4–6 px navy outline, round shapes, soft radial glows (warm vs cold), no textures.
- Character: a young woman with a dark-brown hair bun `#5B3A29`, round face, rosy cheeks, turquoise towel wrapped at the chest; same design in every shot. Organs (lungs, heart, blood vessel, adrenal gland) have simple faces.
- Devices: shower head + mixer lever switching red → blue, magnifying lens into the chest, stopwatch with coloured arcs (1 s, 60 s, 30–90 s), bar chart (×6), stack of yellow sick notes, two groups of person icons, day card `TAG n` top-left in the bathroom (TAG 1 → 30).
- Camera: everyday shot → lens/organ close-up → back to her; cut on every line, 1.5–3 s per shot; impacts get a small shake.
- On-screen text: only `TAG n`, `× 6 NORADRENALIN`, `−29 % KRANKMELDUNGEN`, `KRANK: GLEICH OFT`, plus symbols (`?`, `!`, `=`).
- Subtitles: default dark box; nothing important below y 1400.
- Avoid: nudity (towel always on), medical claims beyond the script, dark horror looks.
</style_md>
<style_json>{"dust": false, "vignette": false, "subtitle": "default"}</style_json>
<plan>
0–2.24 shower flips hot→cold, she gasps, TAG 1→30 · 2.24–4.5 squint + "?" · 4.5–5.82 stopwatch: second one · 5.82–7.76 cold water hits her chest · 7.76–9.1 huge gasp · 9.1–10.18 lens: lungs gulp · 10.18–11.64 she clamps her mouth, the gasp escapes · 11.64–12.88 heart races · 12.88–14.96 fast shallow breathing + trace · 14.96–16.44 ice-block shiver · 16.44–17.98 stone-age ancestor falls into icy water, same gasp · 17.98–21.22 stopwatch one minute, breathing calms · 21.22–22.9 skin turns rosy · 22.9–26.4 vessel narrows then widens · 26.4–29.7 adrenal gland bursts noradrenaline sparks · 29.7–33.38 wide awake, pushes the coffee away · 33.38–37.68 lab: person in a 14-degree tank, one hour on the stopwatch · 37.68–40.92 bar grows ×6, card · 40.92–44.38 TAG 4, smaller gasp · 44.38–47.3 lungs gulp less · 47.3–49.3 heart calm · 49.3–50.48 TAG 30 ? · 50.48–52.38 Dutch houses · 52.38–55.06 3000 people fill the screen · 55.06–59.28 warm then cold, 30–90 s arc · 59.28–64.2 sick-note stack shrinks, card −29 % · 64.2–66.32 the twist card flips · 66.32–69.48 two groups equally sick, card · 69.48–72.58 she kicks off the blanket · 72.58–77.54 heart with bandage, warning, irregular trace · 77.54–81.04 doctor talk · 81.04–84.1 she grins at you, hand on the lever, shower turns cold (loop).
</plan>
<scene_js>
// 30 Tage kalt duschen – Kênh 2: sạch, thân thiện, cơ quan có mặt; phòng tắm kiểu Đức buổi sáng.
const Q = {
  tq: '#2EC4B6', tqD: '#1E9C90', tqL: '#9BE7DF', white: '#FFFFFF', pink: '#FF8FA3', pinkD: '#E06A82', pinkL: '#FFC2CD', ink: '#16324F',
  skin: '#F1C6A5', skinSh: '#D9A27F', blush: '#F59A8A', room: '#EAF6F4', tile: '#D6EEEA', tileL: '#BFE2DC', hair: '#5B3A29', hairHi: '#7A5038',
  hot: '#FF6B5B', cold: '#4DA8F0', coldL: '#BFE6FF', yel: '#FFD166', grey: '#9AAEBF', greyL: '#DCE6EE', steel: '#B8C7D3', red: '#E5484D',
};
const OL = (w = 4) => `stroke="${Q.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
const shk = (t, t0, a, d = 7) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
const blinkAt = (t, off = 0) => { const k = (t + off) % 3.1; return k > 2.95 ? Math.sin((k - 2.95) / .15 * Math.PI) : 0; };
const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 16)) : 0;
const DEF = `<defs>
<radialGradient id="qGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
<radialGradient id="qCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#BFE6FF" stop-opacity=".8"/><stop offset="1" stop-color="#BFE6FF" stop-opacity="0"/></radialGradient>
<radialGradient id="qWarm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB3A6" stop-opacity=".7"/><stop offset="1" stop-color="#FFB3A6" stop-opacity="0"/></radialGradient>
<radialGradient id="qBody" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFE3E8"/><stop offset="1" stop-color="#FFC2CD"/></radialGradient>
</defs>`;

// one card style for all on-screen keyword cards (owner's text only)
function card(str, cx, cy, sz, p, col = Q.ink, bg = Q.white) {
  if (p <= 0) return '';
  const w = str.length * sz * .62 + sz * 1.2, h = sz * 1.6;
  return `<g transform="translate(${cx} ${cy}) scale(${back(cl(p))}) rotate(${-2})">
    <rect x="${-w / 2 + 10}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="22" fill="${Q.ink}" opacity=".18"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="22" fill="${bg}" ${OL(5)}/>
    ${TX(str, 0, sz * .36, sz, col)}
  </g>`;
}
function dayCard(n, x, y, s = 1, flip = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-130" y="-66" width="260" height="140" rx="18" fill="${Q.white}" ${OL(5)}/>
    <rect x="-130" y="-66" width="260" height="38" rx="16" fill="${Q.tq}" ${OL(5)}/>
    <g transform="translate(0 ${-14 * flip}) scale(1 ${1 - .7 * flip})">${TX('TAG ' + n, 0, 48, 62, Q.ink)}</g>
  </g>`;
}

// ---------- the woman ----------
function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${Q.ink}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` };
}
function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
const wReach = (x, y, s, side, tx, ty, flip) => ik(side, side * 100, 30, (tx - x) / s, (ty - y) / s, 125, 115, flip);
function wHead(o = {}) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1, sk = o.red ? Q.blush : Q.skin;
  const eyes = [-30, 30].map(ex => o.squeeze ? `<path d="M ${ex - 16} -8 L ${ex + 12} 0 L ${ex - 16} 8" fill="none" ${OL(5)}/>` : `<ellipse cx="${ex}" cy="-2" rx="${13 * es}" ry="${Math.max(2, 16 * es * (1 - bl))}" fill="${Q.white}" ${OL(4)}/>` + (bl < .6 ? `<circle cx="${ex + lx * .7}" cy="${ly * .7}" r="${7 * Math.min(es, 1.15)}" fill="${Q.ink}"/><circle cx="${ex + lx * .7 + 3}" cy="${ly * .7 - 3}" r="2.5" fill="#fff"/>` : '')).join('');
  const B = { calm: [[-46, -34, -16, -36], [16, -36, 46, -34]], up: [[-46, -46, -16, -50], [16, -50, 46, -46]], worry: [[-46, -32, -16, -44], [16, -44, 46, -32]], sly: [[-46, -36, -16, -34], [16, -48, 46, -44]] }[o.brow || 'calm'];
  const brows = B.map(b => `<path d="M ${b[0]} ${b[1]} L ${b[2]} ${b[3]}" stroke="${Q.hair}" stroke-width="8" stroke-linecap="round"/>`).join('');
  const m = o.mouth || 'smile', my = 50, tk = o.talk || 0;
  let mouth;
  if (m === 'gasp') mouth = `<ellipse cx="0" cy="${my + 6}" rx="${22 * (o.gasp || 1)}" ry="${30 * (o.gasp || 1)}" fill="#7A2E3A" ${OL(4)}/>`;
  else if (m === 'puff') mouth = `<path d="M -12 ${my} L 12 ${my}" ${OL(5)}/>`;
  else if (tk > .05 || m === 'o') mouth = `<ellipse cx="0" cy="${my}" rx="14" ry="${m === 'o' ? 14 : 4 + 12 * tk}" fill="#7A2E3A" ${OL(4)}/>`;
  else if (m === 'grin') mouth = `<path d="M -28 ${my - 6} Q 0 ${my + 30} 28 ${my - 6} Z" fill="#7A2E3A" ${OL(4)}/><path d="M -20 ${my - 2} L 20 ${my - 2}" stroke="#fff" stroke-width="6"/>`;
  else if (m === 'flat') mouth = `<path d="M -16 ${my} L 16 ${my}" ${OL(5)}/>`;
  else if (m === 'teeth') mouth = `<rect x="-26" y="${my - 12}" width="52" height="24" rx="8" fill="#fff" ${OL(4)}/><path d="M -13 ${my - 12} v 24 M 0 ${my - 12} v 24 M 13 ${my - 12} v 24" stroke="${Q.ink}" stroke-width="3"/>`;
  else mouth = `<path d="M -22 ${my - 4} Q 0 ${my + 14} 22 ${my - 4}" fill="none" ${OL(5)}/>`;
  const puff = o.puff || 0;
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="0" cy="-128" r="44" fill="${Q.hair}" ${OL(4)}/><path d="M -20 -150 Q 0 -160 20 -150" stroke="${Q.hairHi}" stroke-width="6" fill="none"/>
   <circle cx="-80" cy="6" r="15" fill="${Q.skinSh}" ${OL(4)}/><circle cx="80" cy="6" r="15" fill="${Q.skinSh}" ${OL(4)}/>
   <ellipse cx="0" cy="4" rx="${78 + 10 * puff}" ry="88" fill="${sk}" ${OL(5)}/>
   <path d="M -80 -10 Q -86 -98 0 -98 Q 86 -98 80 -10 Q 70 -60 20 -62 Q -40 -70 -80 -10 Z" fill="${Q.hair}" ${OL(4)}/>
   <path d="M -40 -84 Q 0 -94 40 -84" stroke="${Q.hairHi}" stroke-width="7" fill="none" stroke-linecap="round"/>
   <ellipse cx="-48" cy="30" rx="${14 + 8 * puff}" ry="${9 + 6 * puff}" fill="${Q.blush}" opacity="${.5 + .4 * (o.red ? 1 : 0)}"/><ellipse cx="48" cy="30" rx="${14 + 8 * puff}" ry="${9 + 6 * puff}" fill="${Q.blush}" opacity="${.5 + .4 * (o.red ? 1 : 0)}"/>
   <path d="M -2 6 Q -8 22 4 24" fill="none" stroke="${Q.skinSh}" stroke-width="5" stroke-linecap="round"/>
   ${eyes}${brows}${mouth}
  </g>`;
}
function woman(x, y, s, o = {}) { // origin = centre of the shoulder line; turquoise towel wrapped at chest
  const aL = o.aL || [12, 6], aR = o.aR || [12, 6], sk = o.red ? Q.blush : Q.skin;
  const L = arm(-100, 30, aL[0], aL[1], -1, 125, 115, sk, 42), R = arm(100, 30, aR[0], aR[1], 1, 125, 115, sk, 42);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="21" fill="${sk}" ${OL(4)}/>`;
  const sh = o.shiver ? 4 * Math.sin(o.t * 60) : 0;
  return `<g transform="translate(${x + sh} ${y}) rotate(${o.lean || 0}) scale(${s * (o.sx || 1)} ${s * (o.sy || 1)})">
    <path d="M -110 40 Q -112 4 -70 -4 L 70 -4 Q 112 4 110 40 L 112 80 L -112 80 Z" fill="${sk}" ${OL(5)}/>
    <rect x="-24" y="-40" width="48" height="50" fill="${sk}"/>
    <path d="M -126 70 Q 0 52 126 70 L 140 520 L -140 520 Z" fill="${Q.tq}" ${OL(5)}/>
    <path d="M -126 70 Q 0 52 126 70 L 128 104 Q 0 86 -128 104 Z" fill="${Q.tqL}" ${OL(4)}/>
    <path d="M 60 104 L 80 500 M -40 110 L -46 500" stroke="${Q.tqD}" stroke-width="7" opacity=".7"/>
    <g transform="translate(${o.hdx || 0} ${-100 + (o.hdy || 0)})">${wHead(o)}</g>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${o.noArmL ? '' : L.svg + hnd(L)}${o.noArmR ? '' : R.svg + hnd(R)}
    ${o.frost ? `<path d="M -110 40 l 20 -20 l 10 18 M 100 30 l -16 -18 l -10 20 M -50 -150 l 10 -16 l 12 14" stroke="#fff" stroke-width="6" fill="none" opacity="${o.frost}"/>` : ''}
  </g>`;
}

// ---------- sets & props ----------
function bathroom(o = {}) {
  let tl = '';
  for (let r = 0; r < 16; r++) tl += `<line x1="0" y1="${r * 110}" x2="1080" y2="${r * 110}" stroke="${Q.tileL}" stroke-width="4"/>`;
  for (let c = 1; c < 10; c++) tl += `<line x1="${c * 110}" y1="0" x2="${c * 110}" y2="1920" stroke="${Q.tileL}" stroke-width="4"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.tile}"/>${tl}
   <rect x="${o.winX ?? 720}" y="180" width="260" height="300" rx="20" fill="#FFF3D6" ${OL(5)}/><path d="M ${(o.winX ?? 720) + 130} 180 V 480 M ${o.winX ?? 720} 330 H ${(o.winX ?? 720) + 260}" ${OL(5)}/>
   <ellipse cx="${(o.winX ?? 720) + 130}" cy="330" rx="260" ry="260" fill="url(#qGlow)" opacity=".5"/>`;
}
function showerHead(x, y, s, temp, t, on = 1) { // temp 0 = hot (red) … 1 = cold (blue)
  const col = temp < .5 ? Q.hot : Q.cold;
  let drops = '';
  if (on > 0) for (let i = 0; i < 16; i++) { const ph = (t * 2.6 + hash(i)) % 1, dx = (hash(i + 3) - .5) * 220; drops += `<line x1="${dx * (.3 + ph)}" y1="${60 + ph * 700}" x2="${dx * (.3 + ph) + dx * .05}" y2="${100 + ph * 700}" stroke="${temp < .5 ? '#FFB3A6' : '#7CC4F7'}" stroke-width="7" stroke-linecap="round" opacity="${on * (1 - ph * .6)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 0 -200 V -60 Q 0 -20 -40 -20" fill="none" stroke="${Q.steel}" stroke-width="18"/><path d="M 0 -200 V -60 Q 0 -20 -40 -20" fill="none" ${OL(3)} opacity=".4"/>
    <g transform="translate(-40 0)">${drops}<path d="M -90 0 Q 0 -60 90 0 L 70 30 L -70 30 Z" fill="${Q.steel}" ${OL(5)}/><rect x="-70" y="24" width="140" height="14" rx="6" fill="${col}" ${OL(3)}/></g>
  </g>`;
}
function tap2(x, y, s, temp) { // mixer handle; the dial shows red ↔ blue
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-30" width="140" height="60" rx="28" fill="${Q.steel}" ${OL(4)}/>
   <g transform="rotate(${lerp(-60, 60, temp)})"><rect x="-12" y="-90" width="24" height="90" rx="12" fill="${Q.white}" ${OL(4)}/></g>
   <circle cx="-48" cy="0" r="10" fill="${Q.hot}"/><circle cx="48" cy="0" r="10" fill="${Q.cold}"/></g>`;
}
function lens(cx, cy, r, p, inner, id) { // magnifying glass looking inside the body
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${back(cl(p))})">
    <line x1="${r * .7}" y1="${r * .7}" x2="${r * 1.25}" y2="${r * 1.25}" stroke="${Q.ink}" stroke-width="54" stroke-linecap="round"/><line x1="${r * .7}" y1="${r * .7}" x2="${r * 1.25}" y2="${r * 1.25}" stroke="${Q.tqD}" stroke-width="38" stroke-linecap="round"/>
    <clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="url(#qBody)"/>
    <g clip-path="url(#${id})">${inner}</g>
    <circle r="${r}" fill="none" stroke="${Q.white}" stroke-width="22"/><circle r="${r}" fill="none" ${OL(6)}/><circle r="${r + 11}" fill="none" ${OL(4)}/>
    <path d="M ${-r * .6} ${-r * .5} Q ${-r * .4} ${-r * .75} ${-r * .1} ${-r * .8}" stroke="#fff" stroke-width="12" fill="none" opacity=".7" stroke-linecap="round"/>
  </g>`;
}
function oFace(o = {}) { // small face for organs
  const m = o.mouth || 'smile', es = o.eyeS || 1;
  const eyes = o.squeeze ? `<path d="M -36 -8 l 18 8 l -18 8 M 36 -8 l -18 8 l 18 8" fill="none" ${OL(5)}/>` : `<ellipse cx="-22" cy="0" rx="${10 * es}" ry="${13 * es}" fill="#fff" ${OL(3)}/><ellipse cx="22" cy="0" rx="${10 * es}" ry="${13 * es}" fill="#fff" ${OL(3)}/><circle cx="-22" cy="2" r="${6 * Math.min(es, 1.2)}" fill="${Q.ink}"/><circle cx="22" cy="2" r="${6 * Math.min(es, 1.2)}" fill="${Q.ink}"/>`;
  const mm = m === 'o' ? `<ellipse cx="0" cy="28" rx="10" ry="14" fill="#7A2E3A" ${OL(3)}/>` : m === 'gasp' ? `<ellipse cx="0" cy="30" rx="16" ry="20" fill="#7A2E3A" ${OL(3)}/>` : m === 'flat' ? `<path d="M -12 28 H 12" ${OL(4)}/>` : m === 'sweat' ? `<path d="M -14 30 q 7 -8 14 0 q 7 8 14 0" fill="none" ${OL(4)}/>` : `<path d="M -16 24 Q 0 38 16 24" fill="none" ${OL(4)}/>`;
  return eyes + mm + (o.brow === 'up' ? `<path d="M -34 -22 l 20 -6 M 34 -22 l -20 -6" ${OL(4)}/>` : o.brow === 'calm' ? `<path d="M -32 -20 h 18 M 32 -20 h -18" ${OL(4)}/>` : '');
}
function lungs(x, y, s, inf, o = {}) { // inf 0..1 inflation
  const k = 1 + .22 * inf;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -14 -260 V -120 M 14 -260 V -120 M 0 -120 L -60 -60 M 0 -120 L 60 -60" stroke="${Q.ink}" stroke-width="30" stroke-linecap="round" fill="none"/>
    <path d="M -14 -260 V -120 M 14 -260 V -120 M 0 -120 L -60 -60 M 0 -120 L 60 -60" stroke="#F7D5DC" stroke-width="18" stroke-linecap="round" fill="none"/>
    <g transform="scale(${k})"><path d="M -30 -120 Q -200 -140 -210 60 Q -214 200 -110 200 Q -30 200 -30 100 Z" fill="${Q.pink}" ${OL(5)}/><path d="M 30 -120 Q 200 -140 210 60 Q 214 200 110 200 Q 30 200 30 100 Z" fill="${Q.pink}" ${OL(5)}/>
     <path d="M -150 -40 Q -110 0 -120 80 M 150 -40 Q 110 0 120 80" stroke="${Q.pinkD}" stroke-width="8" fill="none" stroke-linecap="round"/></g>
    <g transform="translate(-120 40)">${oFace(o)}</g><g transform="translate(120 40)">${oFace(o)}</g>
  </g>`;
}
function heart(x, y, s, beat, o = {}) {
  const k = 1 + .14 * beat;
  return `<g transform="translate(${x} ${y}) scale(${s * k} ${s * (2 - k * .9 - .1)})">
    <path d="M 0 140 C -40 100 -190 20 -190 -70 C -190 -150 -90 -170 0 -90 C 90 -170 190 -150 190 -70 C 190 20 40 100 0 140 Z" fill="${o.col || Q.pink}" ${OL(6)}/>
    <path d="M -130 -100 Q -150 -60 -130 -30" stroke="#fff" stroke-width="12" fill="none" opacity=".6" stroke-linecap="round"/>
    <rect x="-60" y="-200" width="40" height="80" rx="16" fill="${Q.pinkD}" ${OL(4)}/><rect x="10" y="-210" width="44" height="90" rx="16" fill="#8FA9E6" ${OL(4)}/>
    <g transform="translate(0 -20)">${oFace(o)}</g>
    ${o.bandage ? `<g transform="rotate(-30 60 -40)"><rect x="10" y="-60" width="120" height="44" rx="14" fill="#F4E3C9" ${OL(4)}/><circle cx="50" cy="-38" r="4" fill="${Q.ink}"/><circle cx="90" cy="-38" r="4" fill="${Q.ink}"/></g>` : ''}
  </g>`;
}
function stopwatch(x, y, s, frac, o = {}) {
  const a = frac * 2 * Math.PI;
  const arc = (f0, f1, col) => { const a0 = f0 * 2 * Math.PI - Math.PI / 2, a1 = f1 * 2 * Math.PI - Math.PI / 2, lg = f1 - f0 > .5 ? 1 : 0; return `<path d="M 0 0 L ${150 * Math.cos(a0)} ${150 * Math.sin(a0)} A 150 150 0 ${lg} 1 ${150 * Math.cos(a1)} ${150 * Math.sin(a1)} Z" fill="${col}" opacity=".85"/>`; };
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-26" y="-230" width="52" height="40" rx="10" fill="${Q.steel}" ${OL(4)}/><rect x="-40" y="-250" width="80" height="24" rx="10" fill="${Q.tq}" ${OL(4)}/>
    <circle r="190" fill="${Q.white}" ${OL(8)}/>
    ${o.arc ? arc(o.arc[0], o.arc[1], o.arcCol || Q.cold) : (frac > 0 ? arc(0, Math.min(frac, .999), o.col || Q.tqL) : '')}
    ${[...Array(12)].map((_, i) => `<line x1="${165 * Math.sin(i * Math.PI / 6)}" y1="${-165 * Math.cos(i * Math.PI / 6)}" x2="${145 * Math.sin(i * Math.PI / 6)}" y2="${-145 * Math.cos(i * Math.PI / 6)}" stroke="${Q.ink}" stroke-width="${i % 3 ? 5 : 10}"/>`).join('')}
    <line x1="0" y1="0" x2="${150 * Math.sin(a)}" y2="${-150 * Math.cos(a)}" stroke="${Q.red}" stroke-width="10" stroke-linecap="round"/><circle r="14" fill="${Q.ink}"/>
  </g>`;
}
function person(x, y, s, col, o = {}) { // simple study-participant icon
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-120" r="36" fill="${Q.skin}" ${OL(4)}/><path d="M -50 -70 Q 0 -96 50 -70 L 56 0 L -56 0 Z" fill="${col}" ${OL(4)}/>${o.sick ? `<line x1="10" y1="-108" x2="60" y2="-130" stroke="${Q.ink}" stroke-width="10" stroke-linecap="round"/><circle cx="60" cy="-130" r="8" fill="${Q.red}"/>` : ''}</g>`;
}
const ripple = (t, t0, x, y, col = Q.tq, n = 2, r1 = 220) => { let s = ''; for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .1, t0 + .7 + k * .1); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${30 + p * r1}" fill="none" stroke="${col}" stroke-width="${10 * (1 - p)}" opacity="${1 - p}"/>`; } return s; };
const BOT = (y = 1400) => `<rect x="0" y="${y}" width="1080" height="${1920 - y}" fill="${Q.room}"/><rect x="0" y="${y}" width="1080" height="10" fill="${Q.tqL}"/>`;

// ---------- shots ----------
function sHook(t, t0, dayFrom, dayTo, loop) { // woman under the shower: hot → cold, gasp
  const temp = eout(prog(t, t0 + .1, t0 + .35)), hit = prog(t, t0 + .3, t0 + .45);
  const gasp = back(prog(t, t0 + .32, t0 + .55)), [sx, sy] = shk(t, t0 + .35, 16);
  const n = dayFrom === dayTo ? dayFrom : Math.min(dayTo, dayFrom + Math.floor(prog(t, t0 + .18, t0 + 1.9) * (dayTo - dayFrom)));
  return `<g transform="translate(${sx} ${sy})">${bathroom({ winX: 760 })}
   <ellipse cx="480" cy="900" rx="520" ry="560" fill="url(#${temp > .5 ? 'qCold' : 'qWarm'})"/>
   ${showerHead(560, 330, 1.2, temp, t, 1)}
   ${woman(500, 1020 + 30 * gasp, 1.25, { t, mouth: hit > 0 ? 'gasp' : 'smile', gasp: .6 + .5 * gasp, eyeS: 1 + .35 * gasp, brow: hit > 0 ? 'up' : 'calm', aL: hit > 0 ? [lerp(12, 150, gasp), lerp(6, 170, gasp)] : [12, 6], aR: hit > 0 ? [lerp(12, 150, gasp), lerp(6, 170, gasp)] : [20, -120], sy: 1 - .06 * gasp, holdR: hit > 0 ? null : (x, y) => '', blink: hit > 0 ? 0 : blinkAt(t) })}
   ${tap2(900, 900, 1.1, temp)}
   ${hit > 0 ? ripple(t, t0 + .35, 500, 880, Q.cold, 3, 380) : ''}
   ${BOT(1420)}
   ${dayCard(n, 220, 230, 1.1)}</g>`;
}
function s01(t) { return sHook(t, 0, 1, 30); }
function s02(t) { // "… something unexpected": she squints, a big ? pops
  const q = back(prog(t, 2.95, 3.25)), tilt = 8 * eout(prog(t, 2.3, 2.7));
  return `${bathroom({ winX: 60 })}
   ${woman(560, 1080, 1.55, { t, mouth: 'flat', brow: 'sly', look: 12, lookY: -6, tilt, aR: [30, -140], blink: blinkAt(t, 1) })}
   <g transform="translate(860 520) scale(${q}) rotate(${10 * Math.sin(t * 4)})"><circle r="130" fill="${Q.yel}" ${OL(6)}/>${TX('?', 0, 70, 200, Q.ink)}</g>
   ${BOT(1430)}${dayCard(30, 220, 230, 1.1)}`;
}
function s03(t) { // second one: the stopwatch ticks
  const f = cl((t - 4.5) / 60) + (t > 5.02 ? 1 / 60 : 0) * eout(prog(t, 5.02, 5.1));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   <circle cx="540" cy="820" r="${330 + 10 * Math.sin(t * 8)}" fill="${Q.tqL}" opacity=".5"/>
   ${stopwatch(540, 820, 1.4, t > 5.02 ? 1 / 60 : 0)}
   ${ripple(t, 5.02, 540, 820, Q.tq, 2, 330)}
   ${dayCard(1, 220, 230, 1.1)}`;
}
function s04(t) { // close: the cold water hits her chest
  const hit = prog(t, 6.5, 6.62), fl = back(prog(t, 6.58, 6.85));
  let spl = ''; for (let i = 0; i < 12; i++) { const a = -Math.PI + i / 11 * Math.PI, p = prog(t, 6.6 + hash(i) * .2, 7.3 + hash(i) * .2); if (p > 0 && p < 1) spl += `<circle cx="${540 + Math.cos(a) * 300 * p}" cy="${1060 + Math.sin(a) * 260 * p + 200 * p * p}" r="${12 * (1 - p) + 4}" fill="${Q.cold}" opacity="${1 - p}"/>`; }
  return `${bathroom({ winX: 760 })}
   <ellipse cx="540" cy="1000" rx="600" ry="600" fill="url(#qCold)" opacity="${.8 * hit}"/>
   ${woman(540, 1100, 1.9, { t, mouth: hit > 0 ? 'teeth' : 'flat', squeeze: hit > 0, brow: 'up', sy: 1 - .05 * fl, hdy: 30 * fl, aL: [lerp(12, 40, fl), lerp(6, -150, fl)], aR: [lerp(12, 40, fl), lerp(6, -150, fl)], shiver: hit > 0 })}
   ${showerHead(560, 140, 1.3, 1, t, 1)}
   ${[0, 1, 2, 3, 4].map(i => `<path d="M ${380 + i * 80} 300 L ${420 + i * 40} ${lerp(300, 1060, prog(t, 5.82, 6.5))}" stroke="${Q.cold}" stroke-width="16" stroke-linecap="round" opacity=".85"/>`).join('')}
   ${spl}${BOT(1460)}${dayCard(1, 220, 230, 1.1)}`;
}
function s05(t) { // gasp! huge, involuntary
  const g = back(prog(t, 7.78, 8.05)), [sx, sy] = shk(t, 7.8, 12);
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="${Q.coldL}"/>
   ${[...Array(10)].map((_, i) => `<line x1="540" y1="760" x2="${540 + 900 * Math.cos(i * .63)}" y2="${760 + 900 * Math.sin(i * .63)}" stroke="#fff" stroke-width="40" opacity="${.5 * g}"/>`).join('')}
   ${woman(540, 1200, 2.4, { t, mouth: 'gasp', gasp: .5 + .8 * g, eyeS: 1 + .5 * g, brow: 'up', hdy: -20 * g, noArmL: true, noArmR: true })}
   ${[0, 1, 2].map(i => { const p = (t * 2 + i / 3) % 1; return `<path d="M ${540 - 60 + i * 60} ${1060 - 260 * p} q 20 -20 0 -40" fill="none" stroke="#fff" stroke-width="10" opacity="${1 - p}" stroke-linecap="round" transform="translate(0 ${-60})"/>`; }).join('')}
   ${BOT(1470)}</g>`;
}
function s06(t) { // lens on the chest: the lungs gulp air on their own
  const g = t < 9.3 ? 0 : back(prog(t, 9.3, 9.6)) * (1 - .3 * prog(t, 9.9, 10.18));
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="url(#qBody)"/>${lungs(0, 40, .95, g, { mouth: g > .3 ? 'gasp' : 'flat', eyeS: 1 + .4 * g })}
     ${[0, 1, 2].map(i => { const p = prog(t, 9.3 + i * .05, 9.8 + i * .05); return p > 0 && p < 1 ? `<path d="M ${-40 + i * 40} ${-380 + 300 * p} l 0 -60" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity="${1 - p}"/>` : ''; }).join('')}`;
  return `${bathroom({ winX: 60 })}
   ${woman(540, 1080, 1.6, { t, mouth: 'gasp', gasp: .7, eyeS: 1.2, brow: 'up', noArmL: true, noArmR: true })}
   ${lens(540, 980, 330, prog(t, 9.1, 9.35) * 1.0 + .0001, inner, 'qL6')}
   ${BOT(1470)}`;
}
function s07(t) { // she clamps her mouth shut — the gasp escapes anyway
  const cl0 = eout(prog(t, 10.2, 10.45)), burst = prog(t, 10.86, 11.0);
  const puff = cl0 * (1 - burst);
  const handY = lerp(1260, 1000, cl0) - 120 * burst;
  return `${bathroom({ winX: 760 })}
   ${woman(540, 1120, 1.7, { t, mouth: burst > 0 ? 'gasp' : 'puff', gasp: .9, puff: puff * 1.3, eyeS: 1 + .3 * puff, brow: 'worry', aR: wReach(540, 1120, 1.7, 1, 560, handY), aL: [12, 6] })}
   ${burst > 0 ? `<g transform="translate(540 980)">${[...Array(8)].map((_, i) => { const a = i / 8 * Math.PI * 2, r = 120 + 300 * eout(burst); return `<circle cx="${r * Math.cos(a)}" cy="${r * Math.sin(a) * .7}" r="${30 * (1 - burst) + 6}" fill="#fff" ${OL(3)}/>`; }).join('')}</g>` : ''}
   ${BOT(1470)}`;
}
function s08(t) { // the heart races
  const beat = Math.max(0, Math.sin((t - 11.64) * Math.PI * 2 * 3.2)) ** 3;
  let sp = ''; for (let i = 0; i < 6; i++) { const p = (t * 3 + i / 6) % 1; sp += `<line x1="${200 + i * 140}" y1="${300 + 900 * p}" x2="${200 + i * 140}" y2="${380 + 900 * p}" stroke="${Q.pinkD}" stroke-width="10" stroke-linecap="round" opacity="${.5 * (1 - p)}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.pinkL}"/>${sp}
   ${heart(540, 820, 1.7, beat, { mouth: 'gasp', eyeS: 1.3, brow: 'up' })}
   ${[0, 1].map(i => { const p = ((t - 11.64) * 3.2 + i * .5) % 1; return `<path d="M ${540 - 400 - 60 * p} 820 a 80 80 0 0 1 0 -100 M ${540 + 400 + 60 * p} 820 a 80 80 0 0 0 0 -100" stroke="${Q.pinkD}" stroke-width="10" fill="none" opacity="${1 - p}"/>`; }).join('')}
   ${BOT(1430)}`;
}
function s09(t) { // breathing fast and shallow
  const br = .35 * Math.abs(Math.sin((t - 12.88) * Math.PI * 2.4));
  let ecg = ''; const pts = []; for (let i = 0; i <= 60; i++) { const x = 100 + i * 15, ph = (i / 60 * 6 - t * 2.4) % 1; pts.push(`${x},${1240 - 60 * Math.sin((i / 60 * 6 * 2 - t * 4.8) * Math.PI)}`); } ecg = `<polyline points="${pts.join(' ')}" fill="none" stroke="${Q.tqD}" stroke-width="10" stroke-linejoin="round"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   ${lungs(540, 760, 1.25, br, { mouth: 'sweat', brow: 'up' })}
   <rect x="80" y="1130" width="920" height="220" rx="30" fill="${Q.white}" ${OL(5)}/>${ecg}
   ${BOT(1430)}`;
}
function s10(t) { // cold shock: she freezes into an ice block, shivers
  const ice = eout(prog(t, 15.2, 15.7));
  return `${bathroom({ winX: 760 })}
   ${woman(540, 1080, 1.5, { t, mouth: 'teeth', squeeze: false, eyeS: 1.2, brow: 'worry', aL: [30, -150], aR: [30, -150], shiver: true, frost: ice })}
   <rect x="${540 - 340 * ice}" y="${520 + 200 * (1 - ice)}" width="${680 * ice}" height="${880 * ice}" rx="40" fill="${Q.coldL}" opacity=".45" ${OL(5)}/>
   <path d="M ${560 - 300 * ice} 600 l 60 0 M ${600 + 200 * ice} 1300 l 60 0" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="${ice}"/>
   ${BOT(1440)}`;
}
function s11(t) { // an ancient reflex: a stone-age ancestor falls into icy water — same gasp
  const fall = ein(prog(t, 16.5, 16.85)), g = back(prog(t, 16.85, 17.1));
  const y = lerp(560, 1080, fall);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#DDF3FF"/>
   <path d="M 0 700 L 200 420 L 380 650 L 560 380 L 760 640 L 900 470 L 1080 700 V 1920 H 0 Z" fill="#C6DDE9" ${OL(5)}/>
   <path d="M 0 1100 Q 540 1060 1080 1100 V 1920 H 0 Z" fill="#7CC4F7" ${OL(5)}/>
   <g transform="translate(540 ${y})"><circle cx="0" cy="-120" r="80" fill="${Q.skin}" ${OL(5)}/><path d="M -90 -150 Q -100 -230 0 -230 Q 100 -230 90 -150 Q 60 -190 0 -186 Q -60 -190 -90 -150 Z" fill="#6B4A2F" ${OL(4)}/>
    <ellipse cx="-28" cy="-126" rx="${12 + 8 * g}" ry="${14 + 10 * g}" fill="#fff" ${OL(3)}/><ellipse cx="28" cy="-126" rx="${12 + 8 * g}" ry="${14 + 10 * g}" fill="#fff" ${OL(3)}/><circle cx="-28" cy="-124" r="7" fill="${Q.ink}"/><circle cx="28" cy="-124" r="7" fill="${Q.ink}"/>
    <ellipse cx="0" cy="${-70}" rx="${10 + 14 * g}" ry="${8 + 20 * g}" fill="#7A2E3A" ${OL(3)}/>
    <path d="M -90 -40 L 90 -40 L 110 200 L -110 200 Z" fill="#B88A5A" ${OL(5)}/><path d="M -90 -40 L -40 60 L 10 -40 L 60 60 L 90 -40" fill="none" stroke="#8C6440" stroke-width="8"/>
    <path d="M -90 -20 L ${-160 - 40 * g} ${-120 - 80 * g} M 90 -20 L ${160 + 40 * g} ${-120 - 80 * g}" stroke="${Q.ink}" stroke-width="44" stroke-linecap="round"/><path d="M -90 -20 L ${-160 - 40 * g} ${-120 - 80 * g} M 90 -20 L ${160 + 40 * g} ${-120 - 80 * g}" stroke="${Q.skin}" stroke-width="34" stroke-linecap="round"/></g>
   <path d="M 0 1100 Q 540 ${1060 + 10 * Math.sin(t * 4)} 1080 1100 V 1920 H 0 Z" fill="#7CC4F7" opacity=".85"/>
   ${fall >= 1 ? ripple(t, 16.85, 540, 1100, '#fff', 3, 420) : ''}
   ${BOT(1440)}`;
}
function s12(t) { // after about a minute: the stopwatch goes round, breathing slows
  const f = eio(prog(t, 18.0, 19.6)), br = .3 * Math.abs(Math.sin((t - 18) * Math.PI * lerp(2.2, .5, prog(t, 18, 20.2))));
  const calm = prog(t, 19.8, 20.6);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   ${stopwatch(300, 520, .95, f)}
   ${woman(700, 1060, 1.2, { t, mouth: calm > .5 ? 'smile' : 'o', brow: 'calm', squeeze: calm > .5, eyeS: 1, aL: [12, 6], aR: [12, 6], sy: 1 + .04 * br })}
   ${calm > 0 ? `<path d="M 780 ${940 - 40 * calm} q 60 -20 120 0 q 60 20 120 0" fill="none" stroke="${Q.tq}" stroke-width="10" stroke-linecap="round" opacity="${calm}"/>` : ''}
   ${BOT(1440)}`;
}
function s13(t) { // her skin turns rosy
  const r = eio(prog(t, 21.6, 22.3));
  return `${bathroom({ winX: 60 })}
   ${woman(540, 1100, 1.7, { t, red: r > .5, mouth: 'grin', brow: 'up', look: 10, lookY: 10, aL: [30, -100], aR: [12, 6], blink: blinkAt(t) })}
   <ellipse cx="380" cy="1080" rx="${200 * r}" ry="${160 * r}" fill="${Q.blush}" opacity=".35"/>
   ${r > 0 ? [0, 1, 2].map(i => `<path d="M ${330 + i * 40} ${1000 - 30 * i} l 10 -24 l 10 24" fill="none" stroke="${Q.pinkD}" stroke-width="6" opacity="${r}"/>`).join('') : ''}
   ${BOT(1470)}`;
}
function s14(t) { // vessel in the skin: narrow first, then wide
  const sq = eio(prog(t, 23.7, 24.2)), op = eio(prog(t, 25.3, 25.8));
  const w = lerp(lerp(150, 60, sq), 190, op);
  let cells = ''; const sp = lerp(lerp(260, 120, sq), 420, op);
  for (let i = 0; i < 12; i++) { const x = (i * 110 + t * sp) % 1300 - 110; cells += `<ellipse cx="${x}" cy="${960 + (hash(i) - .5) * w * .7}" rx="${Math.min(34, w * .3)}" ry="${Math.min(22, w * .2)}" fill="${Q.red}" ${OL(3)}/>`; }
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="#FFD8C8"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#FFE6DA"/>
   ${[...Array(9)].map((_, i) => `<path d="M ${hash(i) * 1080} ${hash(i + 3) * 700} q 40 30 80 0" stroke="#F3B9A3" stroke-width="8" fill="none"/>`).join('')}
   <path d="M -20 ${960 - w / 2} Q 540 ${960 - w / 2 - 20 * Math.sin(t * 2)} 1100 ${960 - w / 2} L 1100 ${960 + w / 2} Q 540 ${960 + w / 2 + 20 * Math.sin(t * 2)} -20 ${960 + w / 2} Z" fill="#FF9AA8" ${OL(6)}/>
   ${cells}
   ${sq > 0 && op < 1 ? `<path d="M 540 ${880 - w / 2 - 80} l 0 50 M 540 ${1040 + w / 2 + 80} l 0 -50" stroke="${Q.cold}" stroke-width="14" stroke-linecap="round" opacity="${sq * (1 - op)}"/>` : ''}
   ${op > 0 ? `<path d="M 540 ${960 - w / 2 - 30} l 0 -60 M 540 ${960 + w / 2 + 30} l 0 60" stroke="${Q.hot}" stroke-width="14" stroke-linecap="round" opacity="${op}"/>` : ''}
   <g transform="translate(540 ${960 - w / 2 - 170})">${oFace({ mouth: op > .5 ? 'smile' : sq > .5 ? 'flat' : 'smile', squeeze: sq > .5 && op < .5 })}</g>
   ${BOT(1430)}`;
  void inner;
}
function s15(t) { // noradrenaline bursts from the adrenal gland into the blood
  const p = prog(t, 27.96, 28.9);
  let sp = ''; for (let i = 0; i < 26; i++) { const a = hash(i) * Math.PI * 2, r = 60 + 520 * eout(cl(p * 1.2 - hash(i + 2) * .2)); if (p > 0) sp += `<g transform="translate(${540 + r * Math.cos(a)} ${700 + r * Math.sin(a) * .8}) rotate(${t * 90 + i * 20})"><path d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z" fill="${Q.yel}" ${OL(2)}/></g>`; }
  const jump = back(prog(t, 27.9, 28.2));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   <path d="M -20 1180 Q 540 1120 1100 1180 L 1100 1300 Q 540 1240 -20 1300 Z" fill="#FF9AA8" ${OL(5)}/>
   ${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${(i * 260 + t * 200) % 1300 - 100}" cy="1240" rx="30" ry="18" fill="${Q.red}" ${OL(3)}/>`).join('')}
   <g transform="translate(540 ${880 - 40 * jump})"><path d="M -150 -40 Q -180 -200 0 -200 Q 180 -200 150 -40 Q 120 140 0 120 Q -60 120 -40 40 Q -10 0 -60 0 Q -130 20 -150 -40 Z" fill="#D9707E" ${OL(5)}/>
    <path d="M -110 -190 L 0 -320 L 110 -190 Z" fill="${Q.yel}" ${OL(5)}/><g transform="translate(0 -235) scale(.7)">${oFace({ mouth: p > 0 ? 'o' : 'smile', eyeS: 1 + .3 * jump })}</g>
    <g transform="translate(20 -60)">${oFace({ mouth: 'smile' })}</g></g>
   ${sp}
   ${BOT(1430)}`;
}
function s16(t) { // wide awake without coffee
  const push = eio(prog(t, 32.0, 32.5)), sad = prog(t, 32.4, 32.6);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#FFF6E5"/>
   <rect x="0" y="0" width="1080" height="1920" fill="${Q.tile}" opacity=".5"/>
   <rect x="0" y="1230" width="1080" height="40" fill="${Q.tqD}" ${OL(5)}/>
   ${woman(420, 960, 1.25, { t, mouth: 'grin', eyeS: 1.35, brow: 'up', look: 12, lookY: 8, aR: wReach(420, 960, 1.25, 1, lerp(720, 790, push), 1180), aL: [30, -160] })}
   <g transform="translate(${lerp(760, 960, push)} 1200)"><rect x="-70" y="-120" width="140" height="130" rx="20" fill="${Q.white}" ${OL(5)}/><path d="M 70 -90 q 50 0 50 40 q 0 40 -50 40" fill="none" ${OL(8)}/>
    <ellipse cx="0" cy="-116" rx="62" ry="12" fill="#6B4A2F"/>${oFace({ mouth: sad > .5 ? 'flat' : 'smile', brow: sad > .5 ? 'up' : '' }).replace(/^/, '<g transform="translate(0 -60) scale(.8)">') + '</g>'}
    ${sad < .5 ? [0, 1].map(i => `<path d="M ${-20 + i * 40} -140 q 10 -20 0 -40" stroke="${Q.grey}" stroke-width="6" fill="none"/>`).join('') : ''}</g>
   ${[...Array(6)].map((_, i) => { const a = i / 6 * Math.PI * 2 + t; return `<path d="M ${420 + 200 * Math.cos(a)} ${720 + 160 * Math.sin(a)} l 8 -20 l 8 20 l 20 8 l -20 8 l -8 20 l -8 -20 l -20 -8 Z" fill="${Q.yel}" ${OL(2)}/>`; }).join('')}
   ${BOT(1430)}`;
}
function s17(t) { // researchers: one hour in 14-degree water
  const hr = prog(t, 34.5, 36.9);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.white}"/>
   <rect x="0" y="0" width="1080" height="1920" fill="${Q.room}" opacity=".6"/>
   <rect x="160" y="760" width="560" height="600" rx="30" fill="#DFF1FB" ${OL(6)}/><rect x="170" y="860" width="540" height="490" rx="20" fill="#7CC4F7" opacity=".85"/>
   <path d="M 170 ${860 + 6 * Math.sin(t * 3)} Q 440 ${850} 710 ${860 + 6 * Math.cos(t * 3)}" stroke="#fff" stroke-width="8" fill="none"/>
   <g transform="translate(440 820)">${wHead({ mouth: 'teeth', brow: 'worry', eyeS: 1.1 }).replace('<g transform="rotate(0)">', '<g transform="scale(.9)">')}</g>
   <rect x="170" y="860" width="540" height="490" rx="20" fill="#7CC4F7" opacity=".35"/>
   <g transform="translate(640 900)"><rect x="-16" y="-160" width="32" height="260" rx="16" fill="#fff" ${OL(4)}/><rect x="-8" y="${-40}" width="16" height="140" rx="8" fill="${Q.cold}"/><circle cx="0" cy="110" r="28" fill="${Q.cold}" ${OL(4)}/></g>
   ${stopwatch(820, 430, .7, hr)}
   <g transform="translate(860 1300)"><circle cx="0" cy="-330" r="56" fill="${Q.skin}" ${OL(4)}/><path d="M -40 -380 Q 0 -410 40 -380" stroke="${Q.ink}" stroke-width="20" fill="none"/>
    <rect x="-34" y="-338" width="68" height="20" rx="8" fill="none" ${OL(4)}/>
    <path d="M -80 -260 Q 0 -290 80 -260 L 96 0 L -96 0 Z" fill="${Q.white}" ${OL(5)}/>
    <rect x="-110" y="-230" width="90" height="120" rx="8" fill="#F4E3C9" ${OL(4)} transform="rotate(-10)"/>
    <path d="M -100 -200 h 60 M -100 -180 h 50 M -100 -160 h 60" stroke="${Q.ink}" stroke-width="4" transform="rotate(-10)"/></g>
   ${BOT(1430)}`;
}
function s18(t) { // × 6 NORADRENALIN
  const g = eio(prog(t, 38.72, 39.96)), p = prog(t, 39.96, 40.2);
  const h0 = 110, h1 = h0 * lerp(1, 6, g);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   <line x1="140" y1="1300" x2="940" y2="1300" ${OL(8)}/>
   <rect x="260" y="${1300 - h0}" width="200" height="${h0}" rx="14" fill="${Q.grey}" ${OL(5)}/>
   <rect x="620" y="${1300 - h1}" width="200" height="${h1}" rx="14" fill="${Q.yel}" ${OL(5)}/>
   ${[...Array(5)].map((_, i) => g > (i + 1) / 5 ? `<line x1="620" y1="${1300 - h0 * (i + 1)}" x2="820" y2="${1300 - h0 * (i + 1)}" stroke="${Q.ink}" stroke-width="3" stroke-dasharray="10 8"/>` : '').join('')}
   ${[...Array(8)].map((_, i) => { const a = i / 8 * Math.PI * 2 + t * 2; return `<path d="M ${720 + 140 * Math.cos(a)} ${1300 - h1 - 60 + 60 * Math.sin(a)} l 6 -16 l 6 16 l 16 6 l -16 6 l -6 16 l -6 -16 l -16 -6 Z" fill="${Q.yel}" ${OL(2)} opacity="${g}"/>`; }).join('')}
   ${card('× 6 NORADRENALIN', 540, 330, 74, p)}
   ${BOT(1430)}`;
}
function s19(t) { // a few days later: the shock gets smaller
  const n = 1 + Math.min(3, Math.floor(prog(t, 41.0, 41.6) * 3 + .001)), fl = (prog(t, 41.0, 41.6) * 3) % 1;
  const g = back(prog(t, 42.9, 43.15)) * .45;
  return `${bathroom({ winX: 760 })}
   ${showerHead(560, 330, 1.1, 1, t, 1)}
   ${woman(500, 1060, 1.25, { t, mouth: t > 42.9 ? 'o' : 'smile', eyeS: 1 + .3 * g, brow: t > 42.9 ? 'up' : 'calm', blink: blinkAt(t), aL: [12, 6], aR: [12, 6] })}
   ${t > 42.9 ? ripple(t, 42.9, 500, 900, Q.cold, 2, 140) : ''}
   ${tap2(900, 900, 1.1, 1)}
   ${BOT(1420)}${dayCard(n, 220, 230, 1.1, n < 4 ? fl * .4 : 0)}`;
}
function s20(t) { // lungs: smaller gasp
  const g = back(prog(t, 46.08, 46.4)) * .35 * (1 - prog(t, 46.6, 47.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   ${lungs(540, 820, 1.3, g, { mouth: 'smile', brow: 'calm' })}
   ${dayCard(5, 220, 230, 1.1)}${BOT(1430)}`;
}
function s21(t) { // the heart stays calm
  const beat = Math.max(0, Math.sin((t - 47.3) * Math.PI * 2 * 1.1)) ** 3;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.pinkL}"/>
   ${heart(540, 820, 1.5, beat * .6, { mouth: 'smile', brow: 'calm', squeeze: true })}
   <path d="M 120 1250 ${[...Array(30)].map((_, i) => `L ${120 + i * 30} ${1250 - (i % 10 === 4 ? 90 : i % 10 === 5 ? -40 : 0)}`).join(' ')}" fill="none" stroke="${Q.tqD}" stroke-width="10" stroke-linejoin="round"/>
   ${dayCard(7, 220, 230, 1.1)}${BOT(1430)}`;
}
function s22(t) { // "and after thirty days?"
  const fl = prog(t, 49.79, 50.0), q = back(prog(t, 49.98, 50.2));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.tq}"/>
   ${dayCard(fl < .5 ? 7 : 30, 540, 780, 2.6, fl < 1 ? Math.sin(fl * Math.PI) : 0)}
   <g transform="translate(860 470) scale(${q})"><circle r="110" fill="${Q.yel}" ${OL(6)}/>${TX('?', 0, 60, 170, Q.ink)}</g>
   ${BOT(1430)}`;
}
function s23(t) { // the Netherlands: gabled houses, a windmill
  const rot = t * 70;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#DDF3FF"/>
   <path d="M 0 1200 H 1080 V 1920 H 0 Z" fill="#7CC4F7"/>${[0, 1, 2].map(i => `<path d="M ${(t * 60 + i * 400) % 1300 - 100} ${1300 + i * 60} q 40 -16 80 0" stroke="#fff" stroke-width="8" fill="none"/>`).join('')}
   ${[['#E07A5F', 120], [Q.tq, 300], ['#F2CC8F', 480], ['#81B29A', 660]].map(([c, x], i) => `<g transform="translate(${x} 1200)"><path d="M -80 0 V -${380 + 40 * (i % 2)} L -40 -${430 + 40 * (i % 2)} V -${470 + 40 * (i % 2)} H 40 V -${430 + 40 * (i % 2)} L 80 -${380 + 40 * (i % 2)} V 0 Z" fill="${c}" ${OL(5)}/>${[0, 1, 2].map(r => `<rect x="-50" y="${-120 - r * 100}" width="36" height="56" fill="#fff" ${OL(3)}/><rect x="14" y="${-120 - r * 100}" width="36" height="56" fill="#fff" ${OL(3)}/>`).join('')}</g>`).join('')}
   <g transform="translate(900 900)"><path d="M -60 300 L -30 0 L 30 0 L 60 300 Z" fill="${Q.white}" ${OL(5)}/>
    <g transform="rotate(${rot})">${[0, 1, 2, 3].map(i => `<rect x="-14" y="-260" width="28" height="250" fill="${Q.white}" ${OL(4)} transform="rotate(${i * 90})"/>`).join('')}<circle r="20" fill="${Q.ink}"/></g></g>
   ${BOT(1430)}`;
}
function s24(t) { // over three thousand people tried it
  const p = eio(prog(t, 52.38, 54.4)), n = Math.floor(300 * p);
  let ppl = ''; for (let i = 0; i < n; i++) { const c = i % 20, r = Math.floor(i / 20); ppl += `<g transform="translate(${70 + c * 48} ${300 + r * 72})"><circle cy="-22" r="12" fill="${Q.skin}"/><path d="M -16 0 Q 0 -14 16 0 L 18 22 L -18 22 Z" fill="${i % 7 ? Q.tq : Q.yel}"/></g>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>${ppl}${BOT(1430)}`;
}
function s25(t) { // first warm, then 30–90 seconds cold
  const temp = t < 56.56 ? 0 : eout(prog(t, 56.56, 56.8));
  const a0 = 30 / 120, a1 = lerp(30, 90, eio(prog(t, 56.95, 57.57))) / 120;
  return `${bathroom({ winX: 60 })}
   <ellipse cx="420" cy="900" rx="460" ry="520" fill="url(#${temp > .5 ? 'qCold' : 'qWarm'})"/>
   ${showerHead(470, 330, 1.1, temp, t, 1)}
   ${woman(400, 1080, 1.15, { t, mouth: temp > .5 ? 'teeth' : 'smile', squeeze: temp < .5, brow: temp > .5 ? 'worry' : 'calm', aL: [12, 6], aR: [12, 6], shiver: temp > .5 })}
   ${stopwatch(820, 820, .75, t > 56.95 ? a1 : 0, t > 56.95 ? { arc: [a0, a1], arcCol: Q.cold } : {})}
   ${tap2(820, 1240, 1.0, temp)}
   ${BOT(1440)}`;
}
function s26(t) { // −29 % sick notes: the stack of yellow notes shrinks
  const sh = eio(prog(t, 60.4, 61.6)), p = prog(t, 60.72, 61.0);
  const n = Math.round(lerp(14, 10, sh));
  let st = ''; for (let i = 0; i < 14; i++) { if (i >= n) continue; st += `<rect x="${380 + 6 * Math.sin(i * 2)}" y="${1320 - i * 46}" width="320" height="44" rx="6" fill="${Q.yel}" ${OL(4)}/>`; }
  const fly = n < 14 ? [...Array(14 - n)].map((_, k) => { const q = prog(t, 60.4 + k * .25, 61.0 + k * .25); return `<rect x="${380 + 500 * q}" y="${1320 - (13 - k) * 46 - 300 * q}" width="320" height="44" rx="6" fill="${Q.yel}" ${OL(4)} opacity="${1 - q}" transform="rotate(${40 * q} ${540 + 500 * q} ${1320 - (13 - k) * 46})"/>`; }).join('') : '';
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   <rect x="300" y="1360" width="480" height="40" rx="10" fill="${Q.tqD}" ${OL(4)}/>
   ${st}${fly}
   ${person(220, 1360 - 24 * Math.abs(Math.sin(t * 4)) * prog(t, 61.6, 62), 1.4, Q.tq)}
   ${t > 61.8 ? `<g transform="translate(220 1100) rotate(${20 * Math.sin(t * 6)})"><path d="M -14 -60 l 14 -40 l 14 40 Z" fill="${Q.yel}" ${OL(3)}/></g>` : ''}
   ${card('−29 % KRANKMELDUNGEN', 540, 360 + 10 * Math.sin(t * 2.5), 62, p)}
   ${BOT(1430)}`;
}
function s27(t) { // the twist: a card flips over
  const f = eio(prog(t, 64.72, 65.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.yel}"/>
   ${[...Array(10)].map((_, i) => `<line x1="540" y1="800" x2="${540 + 900 * Math.cos(i * .63 + t)}" y2="${800 + 900 * Math.sin(i * .63 + t)}" stroke="#fff" stroke-width="40" opacity=".35"/>`).join('')}
   <g transform="translate(540 800) scale(${Math.abs(Math.cos(f * Math.PI))} 1)"><rect x="-300" y="-200" width="600" height="400" rx="30" fill="${f < .5 ? Q.white : Q.ink}" ${OL(6)}/>
    ${f < .5 ? `<path d="M -160 0 l 80 80 l 160 -160" fill="none" stroke="${Q.tq}" stroke-width="40" stroke-linecap="round"/>` : `<path d="M -120 -60 Q 0 -160 120 -60 L 80 -60 M 120 -60 L 120 -100 M 120 60 Q 0 160 -120 60 L -80 60 M -120 60 L -120 100" fill="none" stroke="${Q.yel}" stroke-width="24" stroke-linecap="round"/>`}</g>
   ${BOT(1430)}`;
}
function s28(t) { // KRANK: GLEICH OFT — two groups, the same number sick
  const p = prog(t, 67.45, 67.7);
  const L = (x, col, t0) => { let s = ''; for (let i = 0; i < 12; i++) { const c = i % 4, r = Math.floor(i / 4), sick = i % 4 === 1 && r < 3 && t > t0 + r * .2; s += person(x + c * 90, 880 + r * 170, .7, sick ? Q.greyL : col, { sick }); } return s; };
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.room}"/>
   <rect x="60" y="640" width="440" height="620" rx="30" fill="${Q.white}" ${OL(5)}/><rect x="580" y="640" width="440" height="620" rx="30" fill="${Q.white}" ${OL(5)}/>
   <g transform="translate(150 0)">${L(0, Q.tq, 66.5)}</g><g transform="translate(670 0)">${L(0, Q.grey, 66.5)}</g>
   ${showerHead(280, 600, .45, 1, t, 0)}
   ${TX('=', 540, 1000, 140, Q.ink, 'middle', `opacity="${p > 0 ? 1 : 0}"`)}
   ${card('KRANK: GLEICH OFT', 540, 380, 70, p)}
   ${BOT(1430)}`;
}
function s29(t) { // they felt fitter and still got out of bed
  const kick = eout(prog(t, 71.2, 71.6)), sit = eio(prog(t, 70.2, 71.0));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#FFF6E5"/>
   <rect x="80" y="1000" width="920" height="200" rx="30" fill="${Q.white}" ${OL(5)}/><rect x="80" y="880" width="60" height="320" rx="20" fill="${Q.tqD}" ${OL(5)}/>
   <rect x="140" y="930" width="240" height="90" rx="40" fill="${Q.white}" ${OL(4)}/>
   ${woman(lerp(280, 520, sit), lerp(1010, 880, sit), .95, { t, mouth: 'grin', brow: 'up', eyeS: 1.15, aL: [lerp(80, 150, kick), lerp(80, 170, kick)], aR: [lerp(80, 150, kick), lerp(80, 170, kick)], lean: lerp(-70, 0, sit), blink: blinkAt(t) })}
   <path d="M ${lerp(380, 640, kick)} ${lerp(980, 1180, kick)} Q ${lerp(640, 900, kick)} ${lerp(940, 1100, kick)} ${lerp(980, 1080, kick)} ${lerp(990, 1260, kick)} L ${lerp(980, 1080, kick)} ${lerp(1100, 1340, kick)} L ${lerp(380, 640, kick)} ${lerp(1100, 1300, kick)} Z" fill="${Q.tqL}" ${OL(5)}/>
   ${[...Array(5)].map((_, i) => { const a = i / 5 * Math.PI * 2 + t * 2; return `<circle cx="${lerp(280, 520, sit) + 180 * Math.cos(a)}" cy="${lerp(860, 730, sit) + 120 * Math.sin(a)}" r="10" fill="${Q.yel}" ${OL(2)}/>`; }).join('')}
   ${BOT(1430)}`;
}
function s30(t) { // caution: heart problems
  const w = back(prog(t, 72.82, 73.1)), irr = t > 74.68;
  const pts = []; for (let i = 0; i <= 40; i++) { const x = 120 + i * 21, k = (i + Math.floor(t * 10)) % 40; pts.push(`${x},${1240 - (irr ? (hash(k) - .5) * 160 : (k % 10 === 4 ? 90 : 0))}`); }
  return `<rect x="0" y="0" width="1080" height="1920" fill="#FFECEC"/>
   ${heart(540, 760, 1.3, irr ? hash(Math.floor(t * 8)) * .6 : 0, { mouth: 'sweat', brow: 'up', bandage: 1, col: '#FF9AA8' })}
   <rect x="100" y="1130" width="880" height="220" rx="30" fill="${Q.white}" ${OL(5)}/><polyline points="${pts.join(' ')}" fill="none" stroke="${Q.red}" stroke-width="10" stroke-linejoin="round"/>
   <g transform="translate(840 380) scale(${w}) rotate(${6 * Math.sin(t * 6)})"><path d="M 0 -120 L 120 90 L -120 90 Z" fill="${Q.yel}" ${OL(8)}/>${TX('!', 0, 60, 150, Q.ink)}</g>
   ${BOT(1430)}`;
}
function s31(t) { // talk to your doctor first
  const talkD = talkAt(t, 77.6, 79.4), nod = Math.sin(t * 5) * 4 * prog(t, 79.5, 80.0);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Q.white}"/><rect x="0" y="0" width="1080" height="1920" fill="${Q.room}" opacity=".7"/>
   <rect x="80" y="260" width="300" height="220" rx="20" fill="${Q.white}" ${OL(4)}/><path d="M 230 300 V 440 M 160 370 H 300" stroke="${Q.red}" stroke-width="26"/>
   <g transform="translate(330 1000) scale(1.05)">
    <path d="M -120 40 Q -122 -2 -80 -12 L 80 -12 Q 122 -2 120 40 L 150 520 L -150 520 Z" fill="${Q.white}" ${OL(5)}/>
    <path d="M -50 -6 Q -60 120 -10 160 M 50 -6 Q 60 120 10 160" stroke="${Q.ink}" stroke-width="8" fill="none"/><circle cx="0" cy="170" r="20" fill="${Q.steel}" ${OL(4)}/>
    <g transform="translate(0 -100)"><circle cx="0" cy="-60" r="70" fill="#3A2A20" ${OL(4)}/>${wHead({ mouth: talkD > 0 ? 'smile' : 'smile', talk: talkD, brow: 'calm', look: 12, blink: blinkAt(t, .5) }).replace('<circle cx="0" cy="-128" r="44" fill="#5B3A29"', '<circle cx="0" cy="-128" r="0" fill="#5B3A29"')}</g></g>
   ${woman(800, 1080, .95, { t, mouth: 'smile', brow: 'calm', look: -12, tilt: nod, aL: [12, 6], aR: [12, 6] })}
   ${BOT(1440)}`;
}
function s32(t) { // would you last thirty days? she looks at YOU, hand on the cold lever
  const pt = back(prog(t, 82.38, 82.6)), temp = eout(prog(t, 83.3, 83.6));
  return `${bathroom({ winX: 760 })}
   <ellipse cx="480" cy="900" rx="520" ry="560" fill="url(#${temp > .5 ? 'qCold' : 'qWarm'})"/>
   ${showerHead(560, 330, 1.2, temp, t, 0)}
   ${woman(500, 1050, 1.25, { t, mouth: talkAt(t, 81.04, 82.6) > 0 ? 'grin' : 'grin', brow: 'sly', look: 0, lookY: 4, aR: wReach(500, 1050, 1.25, 1, 870, 830), aL: [lerp(12, 40, pt), lerp(6, -110, pt)], blink: blinkAt(t, .2) })}
   ${tap2(900, 900, 1.1, temp)}
   ${BOT(1420)}${dayCard(30, 220, 230, 1.1)}`;
}

const SHOTS = [
  [0, s01], [2.24, s02], [4.5, s03], [5.82, s04], [7.76, s05], [9.1, s06], [10.18, s07], [11.64, s08], [12.88, s09], [14.96, s10], [16.44, s11],
  [17.98, s12], [21.22, s13], [22.9, s14], [26.4, s15], [29.7, s16], [33.38, s17], [37.68, s18], [40.92, s19], [44.38, s20], [47.3, s21],
  [49.3, s22], [50.48, s23], [52.38, s24], [55.06, s25], [59.28, s26], [64.2, s27], [66.32, s28], [69.48, s29], [72.58, s30], [77.54, s31], [81.04, s32],
];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  return DEF + f(t);
}

</scene_js>
<events_json>{"music": "explainer_light", "events": [{"t": 0.0, "type": "drip", "gain": 0.3}, {"t": 0.1, "type": "click", "gain": 0.5}, {"t": 0.3, "type": "whoosh", "dur": 0.5, "gain": 0.5}, {"t": 0.35, "type": "hit", "gain": 0.75, "weight": "hero"}, {"t": 0.4, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 0.8, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 1.2, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 1.6, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 1.9, "type": "ting", "f": 783.99, "gain": 0.35}, {"t": 2.4, "type": "slide", "f0": 300, "f1": 500, "dur": 0.3, "gain": 0.25}, {"t": 2.95, "type": "pop", "f0": 500, "f1": 900, "gain": 0.45}, {"t": 4.5, "type": "click", "gain": 0.4}, {"t": 5.02, "type": "tick", "f": 1200, "gain": 0.5}, {"t": 5.82, "type": "whoosh", "dur": 0.6, "gain": 0.45}, {"t": 6.58, "type": "plop", "f": 200, "gain": 0.6, "weight": "hero"}, {"t": 6.6, "type": "drip", "gain": 0.4}, {"t": 7.78, "type": "air", "dur": 0.8, "gain": 0.7, "weight": "hero"}, {"t": 9.1, "type": "pop", "f0": 400, "f1": 700, "gain": 0.35}, {"t": 9.3, "type": "air", "dur": 0.5, "gain": 0.5}, {"t": 10.2, "type": "slide", "f0": 500, "f1": 300, "dur": 0.3, "gain": 0.25}, {"t": 10.86, "type": "pop", "f0": 300, "f1": 900, "gain": 0.6}, {"t": 11.64, "type": "heart", "gain": 0.7}, {"t": 12.88, "type": "air", "dur": 2.0, "gain": 0.3}, {"t": 15.2, "type": "crack", "gain": 0.4}, {"t": 15.62, "type": "shimmer", "dur": 0.6, "gain": 0.3}, {"t": 16.5, "type": "whoosh", "dur": 0.4, "gain": 0.4}, {"t": 16.85, "type": "plop", "f": 150, "gain": 0.7}, {"t": 18.0, "type": "tick", "f": 1000, "gain": 0.2}, {"t": 18.82, "type": "tick", "f": 1000, "gain": 0.2}, {"t": 19.6, "type": "ting", "f": 659.25, "gain": 0.4}, {"t": 20.2, "type": "air", "dur": 0.8, "gain": 0.3}, {"t": 21.6, "type": "shimmer", "dur": 0.7, "gain": 0.3}, {"t": 23.96, "type": "slide", "f0": 600, "f1": 300, "dur": 0.4, "gain": 0.3}, {"t": 25.58, "type": "slide", "f0": 300, "f1": 700, "dur": 0.4, "gain": 0.3}, {"t": 27.96, "type": "pop", "f0": 400, "f1": 1000, "gain": 0.5, "weight": "hero"}, {"t": 28.0, "type": "shimmer", "dur": 1.0, "gain": 0.4}, {"t": 31.06, "type": "ting", "f": 880, "gain": 0.35}, {"t": 32.0, "type": "slide", "f0": 400, "f1": 200, "dur": 0.5, "gain": 0.3}, {"t": 32.5, "type": "womp", "gain": 0.35}, {"t": 33.38, "type": "plop", "f": 250, "gain": 0.3}, {"t": 34.5, "type": "tick", "f": 900, "gain": 0.2}, {"t": 35.44, "type": "tick", "f": 900, "gain": 0.2}, {"t": 36.4, "type": "tick", "f": 900, "gain": 0.2}, {"t": 38.72, "type": "riser", "dur": 1.2, "f0": 300, "f1": 900, "gain": 0.35}, {"t": 39.96, "type": "stamp", "gain": 0.7, "weight": "hero"}, {"t": 41.0, "type": "rustle", "dur": 0.2, "gain": 0.25}, {"t": 41.2, "type": "rustle", "dur": 0.2, "gain": 0.25}, {"t": 41.4, "type": "rustle", "dur": 0.2, "gain": 0.25}, {"t": 42.9, "type": "pop", "f0": 400, "f1": 600, "gain": 0.3}, {"t": 46.08, "type": "air", "dur": 0.4, "gain": 0.25}, {"t": 47.3, "type": "heart", "gain": 0.35}, {"t": 49.79, "type": "rustle", "dur": 0.3, "gain": 0.3}, {"t": 49.98, "type": "pop", "f0": 500, "f1": 900, "gain": 0.45}, {"t": 50.48, "type": "whoosh", "dur": 0.5, "gain": 0.3}, {"t": 52.38, "type": "riser", "dur": 2.0, "f0": 300, "f1": 700, "gain": 0.3}, {"t": 55.06, "type": "drip", "gain": 0.3}, {"t": 55.96, "type": "ting", "f": 523.25, "gain": 0.3}, {"t": 56.56, "type": "click", "gain": 0.5}, {"t": 56.95, "type": "tick", "f": 1200, "gain": 0.3}, {"t": 57.57, "type": "ting", "f": 783.99, "gain": 0.35}, {"t": 60.4, "type": "rustle", "dur": 1.0, "gain": 0.3}, {"t": 60.72, "type": "stamp", "gain": 0.7, "weight": "hero"}, {"t": 64.72, "type": "whoosh", "dur": 0.6, "gain": 0.45}, {"t": 65.28, "type": "hit", "gain": 0.6}, {"t": 66.5, "type": "pop", "f0": 300, "f1": 500, "gain": 0.25}, {"t": 67.45, "type": "stamp", "gain": 0.7, "weight": "hero"}, {"t": 70.2, "type": "rustle", "dur": 0.8, "gain": 0.35}, {"t": 71.3, "type": "whoosh", "dur": 0.4, "gain": 0.45}, {"t": 72.82, "type": "alarm", "dur": 0.5, "gain": 0.35}, {"t": 74.68, "type": "heart", "gain": 0.5}, {"t": 77.54, "type": "steps", "dur": 0.8, "gain": 0.3}, {"t": 79.5, "type": "pop", "f0": 500, "f1": 700, "gain": 0.25}, {"t": 82.38, "type": "pop", "f0": 600, "f1": 900, "gain": 0.4}, {"t": 83.3, "type": "click", "gain": 0.5}, {"t": 83.6, "type": "whoosh", "dur": 0.4, "gain": 0.35}]}</events_json>
<storyboard_json>[{"t0": 0, "t1": 2.24, "lines": [0], "title_vi": "30 ngày tắm lạnh", "desc_vi": "Vòi sen chuyển đỏ → xanh, nước lạnh xối xuống, cô gái hớp hơi; lịch lật TAG 1 → TAG 30."}, {"t0": 2.24, "t1": 4.5, "lines": [0], "title_vi": "Điều bất ngờ", "desc_vi": "Cô nheo mắt nghi ngờ, dấu ? vàng bật ra."}, {"t0": 4.5, "t1": 5.82, "lines": [1], "title_vi": "Giây thứ nhất", "desc_vi": "Đồng hồ bấm giờ nhích một vạch."}, {"t0": 5.82, "t1": 7.76, "lines": [1], "title_vi": "Nước đập vào ngực", "desc_vi": "Tia nước lạnh xối vào ngực, cô nhắm tịt mắt, nghiến răng, run."}, {"t0": 7.76, "t1": 9.1, "lines": [2], "title_vi": "Hớp hơi", "desc_vi": "Cận mặt: miệng há to hớp hơi, tia sáng tỏa ra."}, {"t0": 9.1, "t1": 10.18, "lines": [2], "title_vi": "Phổi tự hớp", "desc_vi": "Kính lúp vào ngực: phổi phồng to bất ngờ."}, {"t0": 10.18, "t1": 11.64, "lines": [2], "title_vi": "Không ngăn được", "desc_vi": "Cô lấy tay bịt miệng, má phồng, hơi vẫn bật ra."}, {"t0": 11.64, "t1": 12.88, "lines": [3], "title_vi": "Tim đập dồn", "desc_vi": "Trái tim có mặt đập nhanh, vệt tốc độ."}, {"t0": 12.88, "t1": 14.96, "lines": [3], "title_vi": "Thở nhanh và nông", "desc_vi": "Phổi thở nhanh từng nhịp nhỏ, đường biểu đồ dày đặc."}, {"t0": 14.96, "t1": 16.44, "lines": [4], "title_vi": "Sốc lạnh", "desc_vi": "Cô đông cứng trong khối băng, run cầm cập."}, {"t0": 16.44, "t1": 17.98, "lines": [4], "title_vi": "Phản xạ xa xưa", "desc_vi": "Người tiền sử rơi xuống hồ băng, cũng hớp hơi y hệt."}, {"t0": 17.98, "t1": 21.22, "lines": [5], "title_vi": "Sau một phút", "desc_vi": "Đồng hồ quay đủ một vòng, hơi thở dịu lại, cô thở ra nhẹ nhõm."}, {"t0": 21.22, "t1": 22.9, "lines": [6], "title_vi": "Da đỏ lên", "desc_vi": "Da cô ửng hồng."}, {"t0": 22.9, "t1": 26.4, "lines": [6], "title_vi": "Mạch máu co – giãn", "desc_vi": "Mạch máu dưới da co hẹp lại rồi giãn rộng, hồng cầu chảy nhanh."}, {"t0": 26.4, "t1": 29.7, "lines": [7], "title_vi": "Noradrenalin", "desc_vi": "Tuyến thượng thận nhảy lên, tia lấp lánh vàng bùng vào máu."}, {"t0": 29.7, "t1": 33.38, "lines": [8], "title_vi": "Tỉnh như sáo", "desc_vi": "Cô tỉnh táo cười tươi, đẩy cốc cà phê đi, cốc buồn thiu."}, {"t0": 33.38, "t1": 37.68, "lines": [9], "title_vi": "Thí nghiệm", "desc_vi": "Người ngâm trong bể nước lạnh, nhiệt kế thấp, đồng hồ một giờ, nhà nghiên cứu cầm bảng."}, {"t0": 37.68, "t1": 40.92, "lines": [10], "title_vi": "× 6 NORADRENALIN", "desc_vi": "Cột vàng mọc cao gấp sáu cột xám, thẻ × 6 NORADRENALIN."}, {"t0": 40.92, "t1": 44.38, "lines": [11], "title_vi": "Vài ngày sau", "desc_vi": "Lịch lật TAG 4, dưới vòi lạnh cô chỉ giật mình nhẹ."}, {"t0": 44.38, "t1": 47.3, "lines": [12], "title_vi": "Ít hớp hơi hơn", "desc_vi": "Phổi chỉ phồng nhẹ, mỉm cười."}, {"t0": 47.3, "t1": 49.3, "lines": [12], "title_vi": "Tim bình tĩnh", "desc_vi": "Trái tim đập chậm, nhắm mắt thư thái."}, {"t0": 49.3, "t1": 50.48, "lines": [13], "title_vi": "Sau 30 ngày?", "desc_vi": "Lịch lật thành TAG 30, dấu ? vàng."}, {"t0": 50.48, "t1": 52.38, "lines": [14], "title_vi": "Hà Lan", "desc_vi": "Dãy nhà mái nhọn bên kênh và cối xay gió."}, {"t0": 52.38, "t1": 55.06, "lines": [14], "title_vi": "Hơn 3.000 người", "desc_vi": "Hàng trăm biểu tượng người lấp kín khung hình."}, {"t0": 55.06, "t1": 59.28, "lines": [15], "title_vi": "Ấm trước, lạnh sau", "desc_vi": "Vòi sen đỏ rồi xanh, đồng hồ tô cung 30 → 90 giây."}, {"t0": 59.28, "t1": 64.2, "lines": [16], "title_vi": "−29 % KRANKMELDUNGEN", "desc_vi": "Chồng giấy nghỉ ốm vàng vơi bớt, thẻ −29 %."}, {"t0": 64.2, "t1": 66.32, "lines": [17], "title_vi": "Cú lật", "desc_vi": "Tấm thẻ lật từ dấu ✓ sang mũi tên xoay vòng."}, {"t0": 66.32, "t1": 69.48, "lines": [18], "title_vi": "KRANK: GLEICH OFT", "desc_vi": "Hai nhóm người, số người ốm bằng nhau, dấu =, thẻ chữ."}, {"t0": 69.48, "t1": 72.58, "lines": [19], "title_vi": "Vẫn rời giường", "desc_vi": "Cô ngồi dậy, đá tung chăn, năng lượng lấp lánh."}, {"t0": 72.58, "t1": 77.54, "lines": [20], "title_vi": "Cẩn thận", "desc_vi": "Trái tim băng dán, tam giác cảnh báo, nhịp tim loạn."}, {"t0": 77.54, "t1": 81.04, "lines": [21], "title_vi": "Hỏi bác sĩ", "desc_vi": "Bác sĩ áo trắng ống nghe nói chuyện, cô gái gật đầu."}, {"t0": 81.04, "t1": 84.108, "lines": [22], "title_vi": "Bạn dám thử?", "desc_vi": "Cô cười nhìn thẳng người xem, tay đặt lên cần gạt, vòi sen chuyển lạnh."}]</storyboard_json>
