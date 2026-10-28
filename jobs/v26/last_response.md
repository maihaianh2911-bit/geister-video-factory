<style_md>
# v26 — Eine Explosion über Hanoi (Gedankenexperiment) — style bible
- **Mood:** calm, serious explainer graphic, not news, not horror. A thought experiment told with motion graphics; no people, no injuries, no bodies.
- **Two worlds:** (1) a 2D dusk skyline of Hanoi (river + steel arch bridge, tube houses and towers as flat shapes); (2) a dark top-down SCHEMATIC map with rings. Cuts between them always have a cause (flash, match cut fireball → map centre, a card flip).
- **Skyline palette:** sky top #5a4a6e → mid #d98a5a → horizon #f6cf73; far buildings #8f7f84 (haze); mid buildings #3e3a46; foreground bridge #1d1a22; window light #ffd27a; river reflects the sky darker.
- **Explosion palette:** flash #fffbe8 (fast, gone in ~0.4 s); heat sky #8a3a1e/#e8652a/#ffc35a; fireball radial gradient #fff6d0 → #ffb347 → #e8572a → #7a2a1a; smoke #2a2024/#4a3a38; embers #ffb347.
- **Map palette:** ground #181d20, blocks #222a2e, roads #33403f, water #0e171c with edge #2f4a55, fields #26332a.
- **Rings (always this order and colour):** 1 km #fff4e0 FEUERBALL · 3 km #ff9a3c · 7 km #e8452e (ZERSTÖRUNG) · 11 km #ffd23f HITZE · 18 km #a9b1b5 GLAS. Centre fixed; the camera zooms, rings never jump. Fallout plume #c8b860 → transparent, always pointing the same way as the wind arrow (towards upper-right, −28°).
- **Shapes/line:** flat vector, no outlines on skyline silhouettes; map strokes 3–5 px; rings 5 px with soft glow underlay; rounded caps.
- **Text:** Inter 900, only: GEDANKENEXPERIMENT, HANOI, 1 MEGATONNE, km numbers, FEUERBALL / ZERSTÖRUNG / HITZE / GLAS, SCHEMATISCH under the map. Small caps with letter-spacing for tags, big numbers in the top-left HUD.
- **Camera:** wide skyline trucks (parallax), low-angle for the fireball, street-level medium for the shockwave, map zooms/pans; shots 2–7 s, no picture still > 2 s.
- **Effects:** fireball and dust as shapes/gradients, heat shimmer lines, shock ring, dust particles, wind streaks; vignette on, engine dust off.
- **Subtitles:** clean (white, outlined, no box).
- **Avoid:** photorealism, 3D, real-news look, sirens, casualties, design/yield parameters, green "safe" zone outside 18 km, exact-forecast claims, copying the reference's logo/watermark/Vietnamese or Russian text.
</style_md>
<style_json>{"dust": false, "vignette": true, "subtitle": "clean"}</style_json>
<plan>
0–4.88 L1: hook on the schematic map — camera pulls back, 18 km ring sweeps in, measure line to a house just outside; a dust plume already slips past the ring towards it, house pulses amber on "Gefahr".
4.88–8.59 L2: dusk skyline of Hanoi trucking right, birds, windows lighting; "1 MEGATONNE" and "HANOI" tags; a dashed marker point appears above the city on "über Hanoi".
8.59–12.22 L3: skyline turns into a pencil drawing on a grid, brackets snap in, GEDANKENEXPERIMENT stamp; warning triangle pops and is struck out on "keine aktuelle Warnung".
12.22–15.28 L4a: skyline wide: light point → white flash (fast, gone) → orange heat → shock ring through the sky with dust skirt on the horizon.
15.28–17.64 L4b: street level: the pressure wave runs through the street right→left, trees bend, signs swing, windows glint and go dark, dust and leaves fly; camera shake.
17.64–22.12 L5: low angle: fireball grows and rises with a dust stem, houses turn into black silhouettes with orange rim light, embers.
22.12–25.31 L6: match cut top-down: fireball glow shrinks into one clean circle; heat, dust and shards push it out of shape until it cracks on "Kreis".
25.31–32.0 L7: the schematic map builds (river, lakes, roads, blocks), SCHEMATISCH, five ruler ticks on "fünf", then rings 1→3→7→11→18 km each on its word with zoom-out and rising tings.
32.0–42.44 L8–10: zoom into the centre (FEUERBALL disk), out to 3–7 km (ZERSTÖRUNG, little houses topple), 7–11 km heat waves (HITZE), magnifier shows a window cracking (GLAS) at 18 km.
42.44–46.54 L11: rings lift apart as an exploded stack (different effects), drop back and their edges become fuzzy dashed bands (no safe borders).
46.54–49.34 L12: close on the 7 km line: a heat/glass pulse crosses it and reaches a house outside, "!".
49.34–53.98 L13: rings wobble out of shape as weather, terrain and buildings icons pop.
53.98–71.48 L14–18: map flips to the fallout scenario, wind sock; dust rises from the centre, wind arrow, particles drift; a clean circle morphs into an irregular plume; camera pulls out over the countryside; dashed city boundary drawn, the plume crosses it.
71.48–77.48 L19: warm familiar skyline, then it darkens, smoke columns and glow rise, damage rings sweep across the whole city.
77.48–81.78 L20: map, measure line to the house, "18 km" tile slams in, then tips and falls on "nicht mehr".
81.78–86.63 L21: calm night skyline, windows light up one by one (hope), GEDANKENEXPERIMENT frame closes the thought.
</plan>
<scene_js>
// v26 — Eine Explosion über Hanoi (Gedankenexperiment). Flat 2D motion graphics: dusk skyline + schematic ring map.
const P = {
  skyTop: '#5a4a6e', skyMid: '#d98a5a', skyHor: '#f6cf73',
  far: '#8f7f84', mid: '#3e3a46', bridge: '#1d1a22', win: '#ffd27a', river: '#4a3a4a',
  mapBg: '#181d20', block: '#222a2e', road: '#33403f', water: '#0e171c', waterE: '#2f4a55', field1: '#26332a', field2: '#2c3a2c',
  ink: '#0d0f12', white: '#f4efe6', grey: '#8d969a', amber: '#ffb347', plume: '#c8b860', smoke: '#2a2024', smoke2: '#4a3a38',
  bp: '#141b26', bpGrid: '#1f2a38', bpLine: '#9cc3e6'
};
const RK = [1, 3, 7, 11, 18];
const RC = ['#fff4e0', '#ff9a3c', '#e8452e', '#ffd23f', '#a9b1b5'];
const FONT = `font-family:'Inter';font-weight:900`;
const WU = [Math.cos(-28 * Math.PI / 180), Math.sin(-28 * Math.PI / 180)]; // wind direction (screen, y down)
const WN = [WU[1], -WU[0]]; // perpendicular (up-left)
const HOUSE_K = 18.6;
function T(s, x, y, size, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${fill}" opacity="${o.op ?? 1}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 8}" paint-order="stroke" stroke-linejoin="round"` : ''} style="${FONT};font-size:${size}px;letter-spacing:${o.ls || 0}px">${s}</text>`;
}
function pop(t, t0, cx, cy, inner, d = .28) {
  const p = back(prog(t, t0, t0 + d));
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})">${inner}</g>`;
}
function slam(t, t0, cx, cy, inner) {
  if (t < t0) return '';
  const p = eout(prog(t, t0, t0 + .18)), sc = lerp(1.8, 1, p) + .05 * ring(t, t0 + .18, 4, 9);
  return `<g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})" opacity="${cl(p * 3)}">${inner}</g>`;
}
const shk = (t, t0, a, d) => t < t0 ? [0, 0] : [a * Math.exp(-(t - t0) * d) * Math.sin((t - t0) * 83), a * Math.exp(-(t - t0) * d) * Math.cos((t - t0) * 61)];
const H = (i, s) => hash(i * 13.71 + s * 91.37);
function hx(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
function mix(a, b, p) {
  p = cl(p); const A = hx(a), B = hx(b);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], p)).toString(16).padStart(2, '0')).join('');
}
const f1 = v => v.toFixed(1);

// ---------------- skyline world ----------------
const GY = 1000;
const FAR = [], MID = [];
{ let x = -500, i = 0; while (x < 1700) { const w = 34 + H(i, 1) * 60, h = 50 + H(i, 2) * 140 + (H(i, 3) > .84 ? 150 : 0); FAR.push([x, w, h, H(i, 4) > .78]); x += w * (.7 + H(i, 5) * .45); i++; } }
{ let x = -500, i = 0; while (x < 1700) { const w = 64 + H(i, 6) * 90, h = 110 + H(i, 7) * 250 + (H(i, 8) > .8 ? 170 : 0); MID.push([x, w, h, i]); x += w + 6 + H(i, 9) * 46; i++; } }
const DECK = x => 1340 - (x + 60) * 190 / 1200;
function skyCols(o) {
  let top = P.skyTop, mid = P.skyMid, hor = P.skyHor;
  const steps = [[o.heat, '#7a2e1a', '#e8652a', '#ffc35a'], [o.dark, '#140e10', '#3e2016', '#93401c'], [o.night, '#070a14', '#121a2c', '#2a2c44']];
  for (const [p, a, b, c] of steps) if (p > 0) { top = mix(top, a, p); mid = mix(mid, b, p); hor = mix(hor, c, p); }
  return [top, mid, hor];
}
function fireball(t, x, y, r, b, stem) {
  if (r <= 0) return '';
  let s = `<defs><radialGradient id="v26fb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ff9a3c"/><stop offset="1" stop-color="#e8572a"/></radialGradient></defs>`;
  if (stem > 0) {
    for (let k = 0; k < 9; k++) {
      const yy = y + r * .7 + k * (GY - y - r * .7) / 8, rr = (r * .28 + k * 6) * (.8 + .2 * Math.sin(t * 2 + k));
      s += `<circle cx="${f1(x + 10 * Math.sin(t * 1.3 + k))}" cy="${f1(yy)}" r="${f1(rr * stem)}" fill="${k < 3 ? '#a5502c' : P.smoke2}" opacity="${.9 * stem}"/>`;
    }
    s += `<ellipse cx="${x}" cy="${f1(y + r * .25)}" rx="${f1(r * 1.25 * stem)}" ry="${f1(r * .38 * stem)}" fill="${P.smoke2}" opacity="${.7 * stem}"/>`;
  }
  s += `<circle cx="${x}" cy="${y}" r="${f1(r * 2.2)}" fill="#ff9a3c" opacity="${.35 * b}" filter="url(#blur40)"/>`;
  s += `<circle cx="${x}" cy="${y}" r="${f1(r)}" fill="url(#v26fb)" opacity="${b}"/>`;
  for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + t * .6; s += `<circle cx="${f1(x + Math.cos(a) * r * .55)}" cy="${f1(y + Math.sin(a) * r * .5)}" r="${f1(r * .32)}" fill="#ffd27a" opacity="${.25 * b}"/>`; }
  return s;
}
function skyline(t, o = {}) {
  const pan = o.pan || 0, heat = o.heat || 0, dark = o.dark || 0, night = o.night || 0, sil = o.sil || 0, lit = o.lit ?? .2;
  const [top, mid, hor] = skyCols({ heat, dark, night });
  const sunOp = (1 - heat) * (1 - dark) * (1 - night);
  let s = `<defs><linearGradient id="v26sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".62" stop-color="${mid}"/><stop offset="1" stop-color="${hor}"/></linearGradient>
    <linearGradient id="v26riv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(hor, P.river, .45)}"/><stop offset=".5" stop-color="${mix(mid, '#1a1420', .55)}"/><stop offset="1" stop-color="${mix(top, '#0a0a10', .6)}"/></linearGradient></defs>
    <rect x="-40" y="-40" width="1160" height="${GY + 40}" fill="url(#v26sky)"/>`;
  if (night > 0) for (let i = 0; i < 46; i++) s += `<circle cx="${f1(H(i, 21) * 1080)}" cy="${f1(H(i, 22) * 760)}" r="${1.5 + H(i, 23) * 2}" fill="#fff" opacity="${night * (.4 + .5 * Math.sin(t * 2 + i))}"/>`;
  if (sunOp > 0) s += `<circle cx="${f1(260 - pan * .08)}" cy="880" r="200" fill="#ffe7a0" opacity="${.45 * sunOp}" filter="url(#blur40)"/><circle cx="${f1(260 - pan * .08)}" cy="880" r="66" fill="#fff0c0" opacity="${sunOp}"/>`;
  for (let i = 0; i < 6; i++) {
    const cx = ((i * 260 + t * (12 + i * 3) - pan * .15) % 1500) - 200;
    s += `<ellipse cx="${f1(cx)}" cy="${300 + i * 95}" rx="${150 + i * 20}" ry="${10 + i * 2}" fill="${mix(mid, top, .4)}" opacity="${.55 * (1 - night)}"/>`;
  }
  if (o.fire) s += fireball(t, o.fire.x - pan * .35, o.fire.y, o.fire.r, o.fire.b, o.fire.stem || 0);
  if (o.marker) s += o.marker;
  // far layer
  const farC = mix(mix(P.far, '#1e1418', Math.max(sil, dark * .8)), '#151827', night);
  let fl = '';
  for (const [x0, w, h, sp] of FAR) {
    const x = x0 - pan * .35; if (x > 1100 || x + w < -20) continue;
    fl += `<rect x="${f1(x)}" y="${f1(GY - h)}" width="${f1(w)}" height="${f1(h + 4)}"/>`;
    if (sp) fl += `<rect x="${f1(x + w / 2 - 3)}" y="${f1(GY - h - 50)}" width="6" height="52"/>`;
  }
  s += `<g fill="${farC}">${fl}</g>`;
  // mid layer
  const midC = mix(mix(P.mid, '#0c090b', Math.max(sil, dark * .7)), '#0c0f1a', night);
  let ml = '', wl = '', rim = '';
  const fireX = o.fire ? o.fire.x - pan * .35 : -9999;
  for (const [x0, w, h, i] of MID) {
    const x = x0 - pan * .6; if (x > 1100 || x + w < -20) continue;
    ml += `<rect x="${f1(x)}" y="${f1(GY - h)}" width="${f1(w)}" height="${f1(h + 4)}"/>`;
    if (i % 4 === 1) ml += `<polygon points="${f1(x)},${f1(GY - h)} ${f1(x + w / 2)},${f1(GY - h - 34)} ${f1(x + w)},${f1(GY - h)}"/>`;
    if (o.rim > 0) { const left = fireX < x + w / 2; rim += `<rect x="${f1(left ? x : x + w - 7)}" y="${f1(GY - h)}" width="7" height="${f1(h)}"/>`; }
    const cols = Math.floor((w - 16) / 24), rows = Math.floor((h - 24) / 32);
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const k = i * 997 + c * 31 + r * 7;
      if (H(k, 11) < lit && !(o.off && H(k, 12) < o.off)) wl += `<rect x="${f1(x + 12 + c * 24)}" y="${f1(GY - h + 18 + r * 32)}" width="11" height="15"/>`;
    }
  }
  s += `<g fill="${midC}">${ml}</g>`;
  if (rim) s += `<g fill="#ff9a3c" opacity="${o.rim}">${rim}</g>`;
  if (wl) s += `<g fill="${P.win}" opacity="${1 - sil}">${wl}</g>`;
  if (o.smoke > 0) s += smokeCols(t, o.smoke, pan);
  // bank + river
  s += `<rect x="-40" y="${GY}" width="1160" height="22" fill="${mix(midC, '#000', .3)}"/><rect x="-40" y="${GY + 22}" width="1160" height="960" fill="url(#v26riv)"/>`;
  let ref = '';
  for (let i = 0; i < 16; i++) { const y = GY + 40 + i * 26 + 4 * Math.sin(t * 2 + i); const w = (160 - i * 7) * (1 + .2 * Math.sin(t * 3 + i * 1.7)); ref += `<rect x="${f1(260 - pan * .08 - w / 2 + 12 * Math.sin(t + i))}" y="${f1(y)}" width="${f1(w)}" height="5" rx="2"/>`; }
  s += `<g fill="${o.fire ? '#ffb347' : '#ffe7a0'}" opacity="${.5 * Math.max(sunOp, o.fire ? o.fire.b : 0)}">${ref}</g>`;
  // bridge (foreground)
  s += bridge(t, pan, mix(mix(P.bridge, '#050405', sil), '#070910', night), o.carLights ?? 1);
  if (o.heat > 0 && o.shimmer) { let w = ''; for (let i = 0; i < 9; i++) { const y = 600 + i * 45; w += `<path d="M -20 ${y} q 60 ${-8 * Math.sin(t * 9 + i)} 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0" stroke="#fff0c0" stroke-width="3" fill="none"/>`; } s += `<g opacity="${.18 * o.shimmer}">${w}</g>`; }
  return s;
}
function bridge(t, pan, col, lights) {
  let s = '', span = 260, x0 = -200 - (pan % span);
  for (let x = x0; x < 1200; x += span) {
    const xa = x, xb = x + span, ya = DECK(xa), yb = DECK(xb), xm = (xa + xb) / 2, ym = (ya + yb) / 2 - 120;
    s += `<path d="M ${f1(xa)} ${f1(ya)} Q ${f1(xm)} ${f1(ym - 70)} ${f1(xb)} ${f1(yb)}" stroke="${col}" stroke-width="9" fill="none"/>`;
    for (let k = 1; k < 8; k++) {
      const p = k / 8, bx = lerp(xa, xb, p), by = DECK(bx), ty = (1 - p) * (1 - p) * ya + 2 * p * (1 - p) * (ym - 70) + p * p * yb;
      const p2 = (k + (k % 2 ? 1 : -1)) / 8, bx2 = lerp(xa, xb, p2), ty2 = (1 - p2) * (1 - p2) * ya + 2 * p2 * (1 - p2) * (ym - 70) + p2 * p2 * yb;
      s += `<line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(bx)}" y2="${f1(ty)}" stroke="${col}" stroke-width="4"/><line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(bx2)}" y2="${f1(ty2)}" stroke="${col}" stroke-width="3"/>`;
    }
    s += `<rect x="${f1(xa - 14)}" y="${f1(ya)}" width="28" height="${f1(1500 - ya)}" fill="${col}"/>`;
  }
  s += `<polygon points="-60,${DECK(-60)} 1140,${DECK(1140)} 1140,${DECK(1140) + 22} -60,${DECK(-60) + 22}" fill="${col}"/>`;
  if (lights > 0) for (let k = 0; k < 5; k++) {
    const x = ((t * (70 + k * 9) + k * 290) % 1400) - 150, y = DECK(x) - 6;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="#fff3c4" opacity="${lights}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="#ffd27a" opacity="${.3 * lights}" filter="url(#blur8)"/>`;
  }
  return s;
}
function smokeCols(t, p, pan) {
  let s = '';
  const xs = [140, 360, 600, 820, 990];
  xs.forEach((x0, j) => {
    const x = x0 - pan * .5, pj = cl(p * 1.3 - j * .08);
    if (pj <= 0) return;
    s += `<ellipse cx="${x}" cy="${GY - 10}" rx="${90 * pj}" ry="40" fill="#ff7a2a" opacity="${.55 * pj}" filter="url(#blur20)"/>`;
    for (let k = 0; k < 10; k++) {
      const yy = GY - 40 - k * 80 * pj, rr = (36 + k * 13) * (.85 + .15 * Math.sin(t * 1.6 + k + j));
      s += `<circle cx="${f1(x + k * 14 + 12 * Math.sin(t * .9 + k * .7 + j))}" cy="${f1(yy)}" r="${f1(rr * pj)}" fill="${k % 2 ? P.smoke : P.smoke2}" opacity="${.9 * pj}"/>`;
    }
  });
  for (let i = 0; i < 22; i++) { const a = (t * .35 + H(i, 31)) % 1; s += `<circle cx="${f1(H(i, 32) * 1080 + 30 * Math.sin(t + i))}" cy="${f1(GY - a * 800)}" r="${2 + H(i, 33) * 3}" fill="#ffb347" opacity="${p * (1 - a)}"/>`; }
  return s;
}
function birds(t, t0) {
  let s = '';
  for (let i = 0; i < 6; i++) {
    const x = -80 + (t - t0) * (150 + i * 8) + i * 46, y = 420 + i * 22 + 10 * Math.sin(t * 2 + i), f = 10 * Math.sin(t * 14 + i * 2);
    s += `<path d="M ${f1(x - 16)} ${f1(y - f)} Q ${f1(x - 8)} ${f1(y - 4)} ${f1(x)} ${f1(y)} Q ${f1(x + 8)} ${f1(y - 4)} ${f1(x + 16)} ${f1(y - f)}" stroke="#2a2030" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
function brackets(t, t0, inset = 0) {
  const p = back(prog(t, t0, t0 + .3)); if (p <= 0) return '';
  const d = lerp(160, 0, p) - inset, L = 110;
  const c = (x, y, sx, sy) => `<path d="M ${x + sx * d} ${y + sy * d + sy * L} V ${y + sy * d} H ${x + sx * d + sx * L}" stroke="${P.white}" stroke-width="9" fill="none" stroke-linecap="round" opacity="${cl(p)}"/>`;
  return c(80, 240, -1, -1) + c(1000, 240, 1, -1) + c(80, 1380, -1, 1) + c(1000, 1380, 1, 1);
}
function topTag(s, op = 1, y = 170) { return T(s, 540, y, 28, P.white, { op: .8 * op, ls: 8 }); }

// ---------------- map world (km coordinates, camera = centre cx,cy + px/km z) ----------------
const RIVER = [[11, -34], [7, -18], [3.6, -7], [2.1, -1.6], [2.5, 2.6], [4.2, 7.5], [6.8, 14], [9.5, 23], [13, 36]];
const RIVER2 = [[3.6, -7], [8, -8.6], [14, -9.6], [23, -13], [34, -15]];
const LAKES = [[-2.6, -3.8, 1.5, 1], [-1.2, -2.2, .4, 2], [.15, .25, .3, 3], [-1.6, 2.6, .42, 4], [1.0, 4.6, .5, 5], [-4.2, 3.1, .36, 6], [-6, -6.5, .7, 7]];
function blob(cx, cy, r, seed, z, X, Y) {
  let pts = [];
  for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283, rr = r * (1 + .22 * Math.sin(a * 3 + seed) + .12 * Math.sin(a * 5 + seed * 2)); pts.push(`${f1(X(cx + rr * Math.cos(a)))},${f1(Y(cy + rr * Math.sin(a) * .8))}`); }
  return pts.join(' ');
}
function mapBase(t, M) {
  const { cx, cy, z } = M, b = M.build ?? 1;
  const X = k => cx + k * z, Y = k => cy + k * z;
  let s = `<rect x="-40" y="-40" width="1160" height="2000" fill="${P.mapBg}"/>`;
  // countryside fields
  if (M.fields > 0) {
    const sp = 6; let fl = '';
    const i0 = Math.floor(-cx / z / sp) - 1, i1 = Math.ceil((1080 - cx) / z / sp), j0 = Math.floor(-cy / z / sp) - 1, j1 = Math.ceil((1920 - cy) / z / sp);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const d = Math.hypot(i * sp, j * sp); if (d < 19 || H(i * 71 + j, 41) < .35) continue;
      fl += `<rect x="${f1(X(i * sp) + 2)}" y="${f1(Y(j * sp) + 2)}" width="${f1(sp * z - 4)}" height="${f1(sp * z - 4)}" fill="${H(i * 13 + j * 7, 42) > .5 ? P.field1 : P.field2}"/>`;
    }
    s += `<g opacity="${M.fields}">${fl}</g>`;
    for (let k = 0; k < 4; k++) { const hx0 = [30, 40, 18, 48][k], hy0 = [-30, -6, -38, -22][k]; for (let r = 1; r <= 3; r++) s += `<ellipse cx="${f1(X(hx0))}" cy="${f1(Y(hy0))}" rx="${f1(r * 2.4 * z)}" ry="${f1(r * 1.5 * z)}" fill="none" stroke="#3a4a3a" stroke-width="3" opacity="${M.fields}"/>`; }
  }
  // city blocks (level of detail by zoom)
  const sp = z > 70 ? .7 : z > 34 ? 1.4 : 2.8;
  let bl = '';
  const i0 = Math.floor(-cx / z / sp) - 1, i1 = Math.ceil((1080 - cx) / z / sp), j0 = Math.floor(-cy / z / sp) - 1, j1 = Math.ceil((1920 - cy) / z / sp);
  for (let i = Math.max(i0, -40); i <= Math.min(i1, 40); i++) for (let j = Math.max(j0, -40); j <= Math.min(j1, 40); j++) {
    const kx = i * sp, ky = j * sp, d = Math.hypot(kx, ky), h = H(i * 31 + j * 17 + sp * 5, 43);
    if (h > cl(1 - d / 17) * .95) continue;
    const ap = cl((b * 1.5 - d / 20) * 4); if (ap <= 0) continue;
    const w = sp * z * (.42 + .35 * H(i * 7 + j * 3, 44));
    bl += `<rect x="${f1(X(kx) - w / 2)}" y="${f1(Y(ky) - w * .4)}" width="${f1(w)}" height="${f1(w * .8)}" opacity="${f1(ap)}"/>`;
  }
  s += `<g fill="${P.block}">${bl}</g>`;
  // roads
  const rw = cl(.12 * z, 2, 6);
  let rd = '';
  for (let k = 0; k < 10; k++) {
    const a0 = k / 10 * 6.283 + .3, pts = [];
    for (const r of [.3, 2, 5, 10, 20, 32, 50]) { const a = a0 + .06 * Math.sin(r * .3 + k); pts.push(`${f1(X(r * Math.cos(a)))},${f1(Y(r * Math.sin(a)))}`); }
    rd += `<polyline points="${pts.join(' ')}" pathLength="1" stroke-dasharray="${f1(cl(b * 1.3 - k * .03))} 1"/>`;
  }
  for (const R of [2.4, 5.2, 9.5]) {
    const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283, rr = R * (1 + .07 * Math.sin(a * 3 + R)); pts.push(`${f1(X(rr * Math.cos(a)))},${f1(Y(rr * Math.sin(a) * .92))}`); }
    rd += `<polyline points="${pts.join(' ')}" pathLength="1" stroke-dasharray="${f1(cl(b * 1.4 - .2))} 1"/>`;
  }
  s += `<g stroke="${P.road}" stroke-width="${f1(rw)}" fill="none" stroke-linecap="round">${rd}</g>`;
  // water
  const rp = RIVER.map(([a, c]) => `${f1(X(a))},${f1(Y(c))}`).join(' '), rp2 = RIVER2.map(([a, c]) => `${f1(X(a))},${f1(Y(c))}`).join(' ');
  const wb = cl(b * 1.6);
  s += `<g fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1">
    <polyline points="${rp}" stroke="${P.waterE}" stroke-width="${f1(1.1 * z + 6)}" pathLength="1" stroke-dasharray="${f1(wb)} 1"/><polyline points="${rp}" stroke="${P.water}" stroke-width="${f1(1.1 * z)}" pathLength="1" stroke-dasharray="${f1(wb)} 1"/>
    <polyline points="${rp2}" stroke="${P.waterE}" stroke-width="${f1(.55 * z + 5)}" pathLength="1" stroke-dasharray="${f1(cl(wb * 1.2 - .2))} 1"/><polyline points="${rp2}" stroke="${P.water}" stroke-width="${f1(.55 * z)}" pathLength="1" stroke-dasharray="${f1(cl(wb * 1.2 - .2))} 1"/></g>`;
  for (const [lx, ly, lr, sd] of LAKES) {
    const lp = back(prog(b, .25 + sd * .06, .45 + sd * .06)); if (lp <= 0) continue;
    s += `<polygon points="${blob(lx, ly, lr * lp, sd, z, X, Y)}" fill="${P.water}" stroke="${P.waterE}" stroke-width="4"/>`;
  }
  // city boundary (dashed)
  if (M.bound > 0) {
    const pts = [], n = 120, m = Math.round(n * M.bound);
    for (let i = 0; i <= m; i++) { const a = -2.2 + i / n * 6.283, rr = 20 + 2.5 * Math.sin(2 * a + .6) + 1.5 * Math.sin(5 * a + 2); pts.push(`${f1(X(rr * Math.cos(a)))},${f1(Y(rr * Math.sin(a)))}`); }
    s += `<polyline points="${pts.join(' ')}" fill="none" stroke="${P.white}" stroke-width="5" stroke-dasharray="20 14" stroke-dashoffset="${f1(-t * 20)}" opacity="${.85 * (M.boundOp ?? 1)}"/>`;
  }
  if (M.dim) s += `<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity="${M.dim}"/>`;
  return s;
}
function ringPts(cx, cy, R, wob, t, seed, frac = 1, n = 96) {
  const pts = [], m = Math.max(1, Math.round(n * frac));
  for (let i = 0; i <= m; i++) {
    const a = -Math.PI / 2 + i / n * 6.283;
    const rr = R * (1 + wob * (.55 * Math.sin(3 * a + seed + t * .9) + .3 * Math.sin(5 * a - seed * 2 + t * 1.4) + .15 * Math.sin(9 * a + seed)));
    pts.push(`${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a))}`);
  }
  return pts;
}
// R: {vis[5] draw 0..1, fill[5], wob, fz (fuzzy 0..1), op, lab[5], hot}
function rings(t, M, R) {
  const { cx, cy, z } = M; let s = '';
  const wob = R.wob || 0, fz = R.fz || 0, op = R.op ?? 1;
  for (let i = 4; i >= 0; i--) {
    const f = (R.fill || [])[i] || 0; if (f <= 0) continue;
    const outer = ringPts(cx, cy, RK[i] * z, wob, t, i), inner = i > 0 ? ringPts(cx, cy, RK[i - 1] * z, wob, t, i - 1) : null;
    const d = 'M' + outer.join(' L') + ' Z' + (inner ? ' M' + inner.slice().reverse().join(' L') + ' Z' : '');
    if (i === 0) s += `<circle cx="${cx}" cy="${cy}" r="${f1(z * 1.6)}" fill="#ffd27a" opacity="${.35 * f}" filter="url(#blur20)"/>`;
    s += `<path d="${d}" fill="${RC[i]}" fill-rule="evenodd" opacity="${f1(f * (i === 0 ? .85 : .3))}"/>`;
  }
  for (let i = 4; i >= 0; i--) {
    const v = (R.vis || [])[i] || 0; if (v <= 0) continue;
    const pts = ringPts(cx, cy, RK[i] * z, wob, t, i, v);
    const hot = (R.hot || [])[i] || 0;
    const pl = pts.join(' ');
    s += `<polyline points="${pl}" fill="none" stroke="${RC[i]}" stroke-width="${f1(14 + 18 * fz + 10 * hot)}" opacity="${f1(op * (.18 + .25 * hot))}" stroke-linecap="round"${fz > 0 ? ' filter="url(#blur8)"' : ''}/>`;
    s += `<polyline points="${pl}" fill="none" stroke="${RC[i]}" stroke-width="${f1(5 + 3 * hot)}" opacity="${f1(op * (1 - .45 * fz))}" stroke-linecap="round"${fz > 0 ? ` stroke-dasharray="16 12" stroke-dashoffset="${f1(-t * 30)}"` : ''}/>`;
  }
  // km labels
  const LA = [-90, -112, -132, -150, -164];
  for (let i = 0; i < 5; i++) {
    const v = (R.lab || [])[i] || 0, rpx = RK[i] * z; if (v <= 0 || rpx < 40) continue;
    const a = LA[i] * Math.PI / 180, x = cx + rpx * Math.cos(a), y = cy + rpx * Math.sin(a);
    if (x < 40 || x > 1040 || y < 60 || y > 1880) continue;
    const vv = v * cl((rpx - 40) / 30);
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(back(cl(vv)))})" opacity="${f1(op)}"><rect x="-52" y="-24" width="104" height="44" rx="22" fill="${P.ink}" opacity=".85"/>${T(RK[i] + ' km', 0, 10, 28, RC[i])}</g>`;
  }
  return s;
}
function gzDot(t, cx, cy, op = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${10 + 3 * Math.sin(t * 6)}" fill="${P.white}" opacity="${op}"/><circle cx="${cx}" cy="${cy}" r="26" fill="none" stroke="${P.white}" stroke-width="3" opacity="${.5 * op}"/>`;
}
function hud(t, items) {
  let cur = null;
  for (const it of items) if (t >= it[0]) cur = it;
  if (!cur) return '';
  const [t0, big, small, col] = cur, p = back(prog(t, t0, t0 + .25));
  return `<g transform="translate(${lerp(-60, 0, p)} 0)" opacity="${cl(p * 2)}">${T(big, 70, 330, 112, col, { a: 'start', st: P.ink, sw: 10 })}${small ? T(small, 74, 392, 40, P.white, { a: 'start', ls: 6, st: P.ink, sw: 8 }) : ''}</g>`;
}
function schem(op = 1) { return T('SCHEMATISCH', 540, 1392, 26, P.grey, { ls: 10, op }); }
function housePin(x, y, s, glow = 0, wob = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(wob)}) scale(${s})">
    ${glow > 0 ? `<circle cx="0" cy="-46" r="${60 + 20 * glow}" fill="${P.amber}" opacity="${.45 * glow}" filter="url(#blur8)"/>` : ''}
    <path d="M 0 0 C -12 -22 -34 -34 -34 -58 A 34 34 0 1 1 34 -58 C 34 -34 12 -22 0 0 Z" fill="${mix(P.white, P.amber, glow)}" stroke="${P.ink}" stroke-width="4"/>
    <path d="M -16 -50 L 0 -66 L 16 -50 V -38 H -16 Z" fill="${P.ink}"/></g>`;
}
function plumePts(cx, cy, z, L, t, m = 1, R0 = 1.8, circR = 0) {
  const pts = [], phi = Math.atan2(WU[1], WU[0]);
  for (let i = 0; i <= 120; i++) {
    const a = i / 120 * 6.283, d = Math.cos(a - phi);
    let r = R0 + L * Math.pow(Math.max(0, d), 5) + .25 * L * Math.pow(Math.max(0, d), 30);
    r *= 1 + .14 * Math.sin(4 * a + t * .8) + .08 * Math.sin(9 * a - t * 1.2) * Math.max(0, d);
    if (circR > 0) r = lerp(circR, r, m);
    pts.push(`${f1(cx + r * z * Math.cos(a))},${f1(cy + r * z * Math.sin(a))}`);
  }
  return pts.join(' ');
}
function plume(t, cx, cy, z, L) {
  if (L <= 0) return '';
  const tipX = cx + (1.8 + L) * z * WU[0], tipY = cy + (1.8 + L) * z * WU[1];
  return `<defs><linearGradient id="v26pl" gradientUnits="userSpaceOnUse" x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(tipX)}" y2="${f1(tipY)}"><stop offset="0" stop-color="${P.plume}" stop-opacity=".85"/><stop offset=".7" stop-color="${P.plume}" stop-opacity=".45"/><stop offset="1" stop-color="${P.plume}" stop-opacity=".12"/></linearGradient></defs>
    <polygon points="${plumePts(cx, cy, z, L, t)}" fill="url(#v26pl)" stroke="${P.plume}" stroke-width="4" stroke-opacity=".7"/>
    <polygon points="${plumePts(cx, cy, z, L * .55, t + 3, 1, 1.1)}" fill="${P.plume}" opacity=".35"/>`;
}
function windArrow(t, cx, cy, p, len = 330, off = 120) {
  if (p <= 0) return '';
  const sx = cx + WN[0] * off + WU[0] * 40, sy = cy + WN[1] * off + WU[1] * 40;
  const ex = sx + WU[0] * len * eout(p), ey = sy + WU[1] * len * eout(p);
  const hx0 = ex - WU[0] * 40, hy0 = ey - WU[1] * 40;
  return `<g opacity="${cl(p * 3)}"><line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(hx0)}" y2="${f1(hy0)}" stroke="${P.white}" stroke-width="14" stroke-linecap="round"/>
    <polygon points="${f1(ex)},${f1(ey)} ${f1(hx0 + WN[0] * 26)},${f1(hy0 + WN[1] * 26)} ${f1(hx0 - WN[0] * 26)},${f1(hy0 - WN[1] * 26)}" fill="${P.white}"/></g>`;
}
function windStreaks(t, op) {
  if (op <= 0) return '';
  let s = '';
  for (let i = 0; i < 12; i++) {
    const ph = (t * .45 + H(i, 51)) % 1, bx = H(i, 52) * 1300 - 300, by = 300 + H(i, 53) * 1100;
    const x = bx + WU[0] * ph * 700, y = by + WU[1] * ph * 700;
    s += `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x + WU[0] * 90)}" y2="${f1(y + WU[1] * 90)}" stroke="${P.white}" stroke-width="3" stroke-linecap="round" opacity="${f1(op * .35 * Math.sin(ph * Math.PI))}"/>`;
  }
  return s;
}
function windsock(t, x, y, p) {
  if (p <= 0) return '';
  const a = -28 + 6 * Math.sin(t * 5);
  let segs = '';
  for (let k = 0; k < 4; k++) segs += `<rect x="${k * 34}" y="${-24 + k * 3}" width="34" height="${48 - k * 6}" fill="${k % 2 ? P.white : '#e8452e'}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${back(cl(p))})"><rect x="-5" y="0" width="10" height="150" fill="${P.grey}"/>
    <g transform="rotate(${f1(a)}) skewY(${f1(4 * Math.sin(t * 7))})">${segs}</g></g>`;
}

// ---------------- shots ----------------
function s1(t) { // 0–4.88 hook: 18 km
  const z = lerp(34, 23.5, eout(prog(t, 0, 1.0))), cx = 540, cy = 760;
  const M = { cx, cy, z, build: 1, dim: .15 };
  const r18 = back(prog(t, .1, .7));
  const hp = [cx + HOUSE_K * z * WU[0], cy + HOUSE_K * z * WU[1]];
  const L = 16.5 * eio(prog(t, 2.2, 4.5));
  const danger = prog(t, 3.19, 3.5) * (t < 4.4 ? 1 : 1);
  let s = mapBase(t, M) + plume(t, cx, cy, z, L);
  s += rings(t, M, { vis: [1, 1, 1, 1, r18], fill: [1, .7, .6, .5, .35 * r18], lab: [0, 0, 0, 0, prog(t, .3, .6)], hot: [0, 0, 0, 0, Math.exp(-Math.max(0, t - .7) * 2)] });
  // sweep wave
  const sw = prog(t, .05, .75); if (sw > 0 && sw < 1) s += `<circle cx="${cx}" cy="${cy}" r="${f1(18 * z * eout(sw))}" fill="none" stroke="${P.white}" stroke-width="${f1(30 * (1 - sw))}" opacity="${f1(.7 * (1 - sw))}"/>`;
  s += gzDot(t, cx, cy);
  // measure line to the house
  const ml = eout(prog(t, 1.29, 1.85));
  if (ml > 0) s += `<line x1="${cx}" y1="${cy}" x2="${f1(lerp(cx, hp[0], ml))}" y2="${f1(lerp(cy, hp[1], ml))}" stroke="${P.white}" stroke-width="4" stroke-dasharray="12 10"/>`;
  const wob = 8 * ring(t, 3.19, 3, 3);
  s += pop(t, 1.6, hp[0], hp[1], housePin(hp[0], hp[1], 1, cl(danger) * (.6 + .4 * Math.sin(t * 9)), wob));
  s += pop(t, 3.54, hp[0], hp[1] - 150, T('!', hp[0], hp[1] - 112, 90, P.amber, { st: P.ink, sw: 10 }));
  s += windStreaks(t, prog(t, 2.2, 2.8));
  s += hud(t, [[.12, '18 km', '', P.white]]);
  s += topTag('GEDANKENEXPERIMENT') + schem();
  const [dx, dy] = shk(t, .7, 6, 6);
  return `<g transform="translate(${f1(dx)} ${f1(dy)})">${s}</g>`;
}
function s2(t) { // 4.88–8.59 dusk skyline, Megatonne, Hanoi
  const pan = lerp(0, 160, eio(prog(t, 4.88, 8.7)));
  const mk = prog(t, 7.32, 7.6);
  const mx = 660 - pan * .35, my = 520;
  const marker = mk > 0 ? `<line x1="${f1(mx)}" y1="${my}" x2="${f1(mx)}" y2="${f1(lerp(my, 900, eout(mk)))}" stroke="${P.white}" stroke-width="3" stroke-dasharray="10 10" opacity=".8"/>
    <circle cx="${f1(mx)}" cy="${my}" r="${f1(12 * back(mk))}" fill="${P.white}"/><circle cx="${f1(mx)}" cy="${my}" r="${f1(30 + 14 * Math.sin(t * 6))}" fill="none" stroke="${P.white}" stroke-width="3" opacity="${.6 * mk}"/>` : '';
  let s = skyline(t, { pan, lit: lerp(.06, .32, prog(t, 4.9, 7.5)), marker });
  s += birds(t, 4.88);
  s += slam(t, 6.8, 540, 300, T('1 MEGATONNE', 540, 318, 50, P.white, { ls: 6, st: '#3a2a3a', sw: 8 }));
  s += pop(t, 7.6, 540, 220, T('HANOI', 540, 240, 76, P.skyHor, { ls: 14, st: '#3a2a3a', sw: 10 }));
  return s;
}
const OUTLINE = (() => {
  let d = 'M -20 1000', pan = 160;
  for (const [x0, w, h] of MID) { const x = x0 - pan * .6; if (x > 1100 || x + w < -20) continue; d += ` L ${f1(x)} 1000 L ${f1(x)} ${f1(1000 - h)} L ${f1(x + w)} ${f1(1000 - h)} L ${f1(x + w)} 1000`; }
  return d + ' L 1100 1000';
})();
function s3(t) { // 8.59–12.22 Gedankenexperiment, keine Warnung
  const tr = prog(t, 8.59, 9.0);
  let s = `<rect x="-40" y="-40" width="1160" height="2000" fill="${P.bp}"/>`;
  let g = '';
  for (let x = 0; x <= 1080; x += 60) g += `<line x1="${x}" y1="0" x2="${x}" y2="1920"/>`;
  for (let y = 0; y <= 1920; y += 60) g += `<line x1="0" y1="${y}" x2="1080" y2="${y}"/>`;
  s += `<g stroke="${P.bpGrid}" stroke-width="2" transform="translate(${f1(-(t * 12) % 60)} 0)">${g}</g>`;
  if (tr < 1) s += `<g opacity="${1 - eio(tr)}">${skyline(t, { pan: 160, lit: .32 })}</g>`;
  const dr = eio(prog(t, 8.7, 10.2));
  s += `<path d="${OUTLINE}" fill="none" stroke="${P.bpLine}" stroke-width="5" stroke-linejoin="round" pathLength="1" stroke-dasharray="${f1(dr)} 1"/>`;
  s += `<line x1="-20" y1="1000" x2="1100" y2="1000" stroke="${P.bpLine}" stroke-width="3" opacity=".6"/>`;
  s += `<path d="M -60 ${DECK(-60)} L 1140 ${DECK(1140)}" stroke="${P.bpLine}" stroke-width="4" pathLength="1" stroke-dasharray="${f1(prog(t, 9.4, 10.4))} 1" opacity=".7"/>`;
  // hypothetical point above the city (dashed circle)
  const mx = 604, my = 520, mp = back(prog(t, 9.0, 9.3));
  if (mp > 0) s += `<circle cx="${mx}" cy="${my}" r="${f1(46 * mp)}" fill="none" stroke="${P.white}" stroke-width="4" stroke-dasharray="10 8" transform="rotate(${f1(t * 40)} ${mx} ${my})"/><circle cx="${mx}" cy="${my}" r="${f1(9 * mp)}" fill="${P.white}"/>`;
  s += brackets(t, 8.75);
  const st = prog(t, 9.38, 9.56);
  if (st > 0) {
    const sc = lerp(1.7, 1, eout(st)) + .04 * ring(t, 9.56, 4, 8);
    s += `<g transform="translate(540 420) rotate(-4) scale(${f1(sc)})" opacity="${f1(cl(st * 3))}"><rect x="-430" y="-62" width="860" height="112" rx="12" fill="none" stroke="${P.amber}" stroke-width="8"/>${T('GEDANKENEXPERIMENT', 0, 18, 54, P.amber, { ls: 4 })}</g>`;
  }
  // warning triangle: pops, struck out, shrinks away
  const wp = back(prog(t, 10.5, 10.78)) * (1 - ein(prog(t, 11.7, 12.15)));
  if (wp > 0) {
    const strike = eout(prog(t, 11.0, 11.25)), dc = mix('#ffd23f', '#6a6f74', strike);
    s += `<g transform="translate(540 1110) scale(${f1(wp)}) rotate(${f1(6 * ring(t, 11.25, 3, 5))})">
      <path d="M 0 -150 L 150 110 L -150 110 Z" fill="${dc}" stroke="${P.ink}" stroke-width="12" stroke-linejoin="round"/>
      <rect x="-14" y="-70" width="28" height="110" rx="12" fill="${P.ink}"/><circle cx="0" cy="72" r="16" fill="${P.ink}"/>
      <line x1="-190" y1="-150" x2="${f1(-190 + 380 * strike)}" y2="${f1(-150 + 300 * strike)}" stroke="${P.white}" stroke-width="26" stroke-linecap="round"/>
      <line x1="-190" y1="-150" x2="${f1(-190 + 380 * strike)}" y2="${f1(-150 + 300 * strike)}" stroke="${P.ink}" stroke-width="8" stroke-linecap="round" opacity=".5"/></g>`;
  }
  return s;
}
function s4(t) { // 12.22–15.28 flash, heat, shock ring
  const pan = lerp(160, 210, prog(t, 12.22, 15.3));
  const fx = 660, fy = 520, sx = fx - pan * .35;
  const pre = prog(t, 12.45, 12.85);
  const heat = eio(prog(t, 13.3, 14.1));
  const fr = t >= 12.85 ? lerp(30, 120, eout(prog(t, 12.85, 15.3))) : 0;
  let s = skyline(t, { pan, lit: .32, heat, shimmer: prog(t, 13.6, 14.2), rim: heat * .8, fire: fr > 0 ? { x: fx, y: fy, r: fr, b: 1, stem: prog(t, 14.2, 15.3) * .6 } : null, off: prog(t, 14.9, 15.2) });
  if (pre > 0 && t < 12.85) s += `<circle cx="${f1(sx)}" cy="${fy}" r="${f1(6 + 40 * ein(pre))}" fill="#fffbe8"/><circle cx="${f1(sx)}" cy="${fy}" r="${f1(60 + 160 * pre)}" fill="#fffbe8" opacity="${.5 * pre}" filter="url(#blur20)"/>`;
  // shock ring in the sky + dust skirt on the horizon
  const sp = prog(t, 14.6, 15.4);
  if (sp > 0 && sp < 1) {
    s += `<circle cx="${f1(sx)}" cy="${fy}" r="${f1(80 + 900 * eout(sp))}" fill="none" stroke="#fff3d6" stroke-width="${f1(26 * (1 - sp))}" opacity="${f1(.8 * (1 - sp))}"/>`;
    const w = 50 + 800 * eout(sp);
    s += `<ellipse cx="${f1(sx)}" cy="${GY - 10}" rx="${f1(w)}" ry="${f1(26 + 40 * sp)}" fill="#c8a07a" opacity="${f1(.8 * (1 - sp * .5))}"/>`;
  }
  const fl = t >= 12.85 ? Math.exp(-(t - 12.85) * 7) : 0;
  if (fl > .01) s += `<rect x="-40" y="-40" width="1160" height="2000" fill="#fffbe8" opacity="${f1(fl)}"/>`;
  const [a, b] = shk(t, 12.85, 10, 5), [c, d] = shk(t, 14.9, 8, 6);
  return `<g transform="translate(${f1(a + c)} ${f1(b + d)})">${s}</g>`;
}
function tube(x, w, h, i, dark, lights) {
  const cols = ['#5a4f58', '#4c4f5c', '#62544a', '#4f5a56'];
  let s = `<rect x="${x}" y="${1250 - h}" width="${w}" height="${h + 4}" fill="${mix(cols[i % 4], '#141014', dark)}"/>`;
  for (let r = 0; r < Math.floor((h - 160) / 120); r++) {
    const y = 1250 - h + 40 + r * 120;
    s += `<rect x="${x + 18}" y="${y}" width="${w - 36}" height="70" fill="${H(i * 9 + r, 61) < lights ? P.win : mix('#2a2630', '#0a080a', dark)}"/>`;
    s += `<rect x="${x + 8}" y="${y + 76}" width="${w - 16}" height="10" fill="${mix('#8a7a6a', '#1a1414', dark)}"/>`;
  }
  return s;
}
function s4b(t) { // 15.28–17.64 street level pressure wave
  const t0 = 15.28, wx = lerp(1400, -500, eio(prog(t, t0 + .1, t0 + 1.6)));
  const passed = x => t > t0 + .1 && wx < x;
  const tp = x => t0 + .1 + 1.5 * cl((1400 - x) / 1900);
  let s = `<rect x="-40" y="-40" width="1160" height="1400" fill="#e8652a"/><rect x="-40" y="600" width="1160" height="700" fill="#ffc35a" opacity=".6"/>`;
  s += `<circle cx="760" cy="420" r="260" fill="#fff0c0" opacity=".35" filter="url(#blur40)"/>`;
  const B = [[-30, 230, 860], [210, 190, 980], [410, 240, 780], [660, 200, 940], [870, 240, 820]];
  B.forEach(([x, w, h], i) => {
    const dark = passed(x + w / 2) ? .55 : .2;
    s += tube(x, w, h, i, dark, passed(x + w / 2) ? .05 : .6);
    // swinging sign
    const sa = passed(x + w / 2) ? -30 * Math.exp(-(t - tp(x + w / 2)) * 2) * Math.cos((t - tp(x + w / 2)) * 12) - 12 : 4 * Math.sin(t * 2 + i);
    s += `<g transform="rotate(${f1(sa)} ${x + w - 30} ${1250 - h + 300})"><rect x="${x + w - 50}" y="${1250 - h + 300}" width="40" height="150" rx="6" fill="${['#e8452e', '#ffd23f', '#3fa0c8', '#e8452e', '#ffd23f'][i]}" stroke="${P.ink}" stroke-width="4"/></g>`;
    // glint as the wave passes
    const gp = prog(t, tp(x + w / 2), tp(x + w / 2) + .25);
    if (gp > 0 && gp < 1) s += `<circle cx="${x + w / 2}" cy="${1250 - h + 200}" r="${f1(40 + 80 * gp)}" fill="#fffbe8" opacity="${f1(.8 * (1 - gp))}"/>`;
  });
  s += `<rect x="-40" y="1250" width="1160" height="90" fill="#6a5a50"/><rect x="-40" y="1340" width="1160" height="620" fill="#2a2428"/>`;
  for (let i = 0; i < 8; i++) s += `<rect x="${i * 160 - ((t * 0) % 160)}" y="1520" width="90" height="14" fill="#c8b8a0" opacity=".5"/>`;
  // trees and lamps bend
  [[120, 1.0], [520, 1.15], [880, .95]].forEach(([x, sc], i) => {
    const tt = tp(x); const bend = t > tt ? -26 * eout(prog(t, tt, tt + .15)) * (1 - .6 * prog(t, tt + .2, tt + 1.2)) + 6 * ring(t, tt + .2, 2, 3) : 3 * Math.sin(t * 1.5 + i);
    s += `<g transform="translate(${x} 1300) scale(${sc}) rotate(${f1(bend * .4)})"><rect x="-12" y="-300" width="24" height="300" fill="#2a1e1a"/>
      <g transform="rotate(${f1(bend)} 0 -280)"><circle cx="-60" cy="-360" r="90" fill="#1f3326"/><circle cx="50" cy="-380" r="100" fill="#264030"/><circle cx="0" cy="-450" r="90" fill="#2c4a36"/></g></g>`;
  });
  // the wave: bright distortion band + dust wall behind it
  if (wx < 1300 && wx > -480) {
    s += `<rect x="${f1(wx - 40)}" y="-40" width="80" height="2000" fill="#fffbe8" opacity=".35" filter="url(#blur20)"/>`;
    let dw = '';
    for (let k = 0; k < 14; k++) dw += `<circle cx="${f1(wx + 60 + (k % 4) * 70 + 20 * Math.sin(t * 6 + k))}" cy="${1340 - (k * 47) % 600}" r="${60 + (k % 3) * 30}"/>`;
    s += `<g fill="#b48a68" opacity=".75">${dw}</g>`;
    let lv = '';
    for (let k = 0; k < 18; k++) { const lx = wx - 40 - H(k, 71) * 400, ly = 700 + H(k, 72) * 800 + 40 * Math.sin(t * 8 + k); lv += `<rect x="${f1(lx)}" y="${f1(ly)}" width="14" height="8" rx="4" transform="rotate(${f1(t * 400 + k * 40)} ${f1(lx)} ${f1(ly)})"/>`; }
    s += `<g fill="#3a5a3a">${lv}</g>`;
  }
  const [a, b] = t > tp(540) ? shk(t, tp(540), 16, 5) : [0, 0];
  return `<g transform="translate(${f1(a)} ${f1(b)})">${s}</g>`;
}
function s5(t) { // 17.64–22.12 fireball grows, silhouettes
  const r = lerp(120, 300, eout(prog(t, 17.64, 21.0))), y = lerp(560, 430, eio(prog(t, 17.64, 22.1)));
  const sil = eio(prog(t, 19.3, 20.9));
  const inner = skyline(t, { pan: 210 - 40 * prog(t, 17.64, 22.12), heat: 1, sil, rim: .9, lit: .32, off: .5 + .5 * sil, fire: { x: 600 + 210 * .35, y, r, b: 1, stem: .4 + .6 * prog(t, 17.64, 20) }, carLights: 0 });
  let emb = '';
  for (let i = 0; i < 26; i++) { const a = (t * .5 + H(i, 81)) % 1; emb += `<circle cx="${f1(200 + H(i, 82) * 700 + 30 * Math.sin(t * 2 + i))}" cy="${f1(1000 - a * 700)}" r="${f1(2 + H(i, 83) * 3)}" opacity="${f1(1 - a)}"/>`; }
  const sc = lerp(1.42, 1.52, prog(t, 17.64, 22.12));
  return `<g transform="translate(540 1050) scale(${f1(sc)}) translate(-560 -1000)">${inner}</g><g fill="#ffb347">${emb}</g>`;
}
function s6(t) { // 22.12–25.31 one circle is not enough
  const cx = 540, cy = 820, z = 23.5;
  let s = mapBase(t, { cx, cy, z, build: 0, dim: 0 });
  const g = 1 - eio(prog(t, 22.12, 22.7));
  s += `<circle cx="${cx}" cy="${cy}" r="${f1(260 + 200 * g)}" fill="#ff9a3c" opacity="${f1(.6 * g + .12)}" filter="url(#blur40)"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${f1(60 + 280 * g)}" fill="#ffe08a" opacity="${f1(.9 * g)}"/>`;
  const R = 230, dr = eio(prog(t, 22.41, 22.95)), brk = prog(t, 24.81, 25.25);
  const push = eout(prog(t, 23.05, 24.6));
  if (brk <= 0) {
    const pts = [];
    for (let i = 0; i <= Math.round(96 * dr); i++) {
      const a = -Math.PI / 2 + i / 96 * 6.283;
      const bump = push * (28 * Math.max(0, Math.sin(3 * a + t * 3)) + 18 * Math.max(0, Math.sin(5 * a - t * 4))) + 5 * ring(t, 23.44, 6, 6);
      pts.push(`${f1(cx + (R + bump) * Math.cos(a))},${f1(cy + (R + bump) * Math.sin(a))}`);
    }
    if (pts.length > 1) s += `<polyline points="${pts.join(' ')}" fill="none" stroke="${P.white}" stroke-width="9" stroke-linecap="round"/>`;
  } else {
    for (let k = 0; k < 8; k++) {
      const a0 = k / 8 * 6.283, a1 = a0 + .62, rr = R + 400 * eout(brk);
      s += `<path d="M ${f1(cx + rr * Math.cos(a0))} ${f1(cy + rr * Math.sin(a0))} A ${f1(rr)} ${f1(rr)} 0 0 1 ${f1(cx + rr * Math.cos(a1))} ${f1(cy + rr * Math.sin(a1))}" stroke="${P.white}" stroke-width="9" fill="none" opacity="${f1(1 - brk)}" stroke-linecap="round"/>`;
    }
    for (let i = 0; i < 5; i++) s += `<circle cx="${cx}" cy="${cy}" r="${f1(RK[i] * z * eout(brk))}" fill="none" stroke="${RC[i]}" stroke-width="4" opacity="${f1(.7 * brk)}"/>`;
  }
  // pushers: heat squiggles, dust puffs, shards
  if (t > 23.0 && brk < 1) for (let k = 0; k < 12; k++) {
    const a = k / 12 * 6.283 + .2, ph = (t * .9 + k * .37) % 1, r = lerp(70, R + 20 * push, eout(ph)), x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    const o = f1(cl((t - 23.0) * 3) * (1 - brk));
    if (k % 3 === 0) s += `<path d="M ${f1(x)} ${f1(y)} q 10 -12 20 0 t 20 0" transform="rotate(${f1(a * 57.3)} ${f1(x)} ${f1(y)})" stroke="#ff9a3c" stroke-width="6" fill="none" opacity="${o}"/>`;
    else if (k % 3 === 1) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(14 + 8 * ph)}" fill="#8a8078" opacity="${o}"/>`;
    else s += `<polygon points="${f1(x)},${f1(y - 14)} ${f1(x + 10)},${f1(y + 8)} ${f1(x - 8)},${f1(y + 6)}" fill="#cfe6f0" opacity="${o}"/>`;
  }
  s += gzDot(t, cx, cy);
  return s;
}
function s7(t) { // 25.31–32.0 map builds, five distances
  const b = prog(t, 25.35, 27.4);
  const zk = [[28.35, 23.5], [28.6, 150], [29.05, 115], [29.5, 52], [29.95, 34], [30.55, 23.5]];
  let z = 23.5;
  for (let i = 1; i < zk.length; i++) if (t >= zk[i - 1][0]) z = lerp(zk[i - 1][1], zk[i][1], eio(prog(t, zk[i - 1][0], zk[i - 1][0] + .4)));
  const cx = 540, cy = 760, M = { cx, cy, z, build: b };
  const rt = [28.67, 29.13, 29.53, 30.04, 30.61];
  const vis = rt.map(a => eio(prog(t, a - .05, a + .3)));
  let s = mapBase(t, M);
  s += rings(t, M, { vis, fill: vis.map(v => v * .35), lab: rt.map(a => prog(t, a, a + .25)), hot: rt.map(a => t > a ? Math.exp(-(t - a) * 3) : 0) });
  // ruler with five ticks along the east axis
  const rl = eout(prog(t, 27.3, 27.7));
  if (rl > 0 && t < 28.7) {
    const op = 1 - prog(t, 28.4, 28.7);
    s += `<line x1="${cx}" y1="${cy}" x2="${f1(cx + 18 * z * rl)}" y2="${cy}" stroke="${P.white}" stroke-width="5" opacity="${f1(op)}"/>`;
    RK.forEach((k, i) => { const p = back(prog(t, 27.54 + i * .08, 27.7 + i * .08)); if (p > 0) s += `<rect x="${f1(cx + k * z - 4)}" y="${f1(cy - 20 * p)}" width="8" height="${f1(40 * p)}" rx="4" fill="${RC[i]}" opacity="${f1(op)}"/>`; });
  }
  s += gzDot(t, cx, cy, cl(b * 3));
  const ti = [[28.67, '1 km', '', RC[0]], [29.13, '3 km', '', RC[1]], [29.53, '7 km', '', RC[2]], [30.04, '11 km', '', RC[3]], [30.61, '18 km', '', RC[4]]];
  s += hud(t, ti);
  s += topTag('HANOI · 1 MEGATONNE', cl(b * 2));
  s += slam(t, 26.62, 540, 1380, schem());
  return s;
}
function house(x, y, s, rot) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="0" y="-26" width="34" height="26" fill="#d8cfc0" stroke="${P.ink}" stroke-width="3"/><polygon points="-4,-26 17,-44 38,-26" fill="#a85a3a" stroke="${P.ink}" stroke-width="3"/></g>`;
}
function sRings(t) { // 32.0–42.44 feuerball, zerstörung, hitze, glas
  const zk = [[32.0, 23.5, 150], [34.08, 150, 52], [38.06, 52, 35], [40.5, 35, 23.5]];
  let z = 23.5;
  for (const [a, z0, z1] of zk) if (t >= a) z = lerp(z0, z1, eio(prog(t, a, a + .8)));
  const cx = 540, cy = 760, M = { cx, cy, z, build: 1 };
  const fb = prog(t, 33.0, 33.4), dz = prog(t, 35.7, 36.1), ht = prog(t, 39.0, 39.4), gl = prog(t, 41.45, 41.8);
  let s = mapBase(t, M);
  s += rings(t, M, { vis: [1, 1, 1, 1, 1], fill: [.35 + .65 * fb, .35 + .5 * dz, .35 + .5 * dz, .35 + .5 * ht, .35 + .4 * gl], lab: [1, 1, 1, 1, 1], hot: [fb * (1 - prog(t, 34, 34.5)), dz * (1 - prog(t, 38, 38.5)), dz * (1 - prog(t, 38, 38.5)), ht * (1 - prog(t, 40.6, 41)), gl] });
  if (fb > 0 && t < 34.6) s += `<circle cx="${cx}" cy="${cy}" r="${f1(z * (.92 + .05 * Math.sin(t * 9)))}" fill="#fffbe8" opacity="${f1(.5 * fb)}" filter="url(#blur8)"/>`;
  // houses in the 3–7 km band topple
  if (t > 34.2 && t < 38.8) for (let k = 0; k < 10; k++) {
    const a = -2.6 + k * .62, r = 3.6 + (k % 3) * 1.1, x = cx + r * z * Math.cos(a), y = cy + r * z * Math.sin(a);
    const tk = 36.68 + k * .08, tp = ein(prog(t, tk, tk + .3));
    s += house(x - 17, y + 13, z / 52, 88 * tp);
    const dp = prog(t, tk + .28, tk + .9);
    if (dp > 0 && dp < 1) s += `<circle cx="${f1(x + 10)}" cy="${f1(y + 8)}" r="${f1(10 + 30 * dp)}" fill="#8a8078" opacity="${f1(.7 * (1 - dp))}"/>`;
  }
  // heat waves in the 7–11 km band
  if (t > 38.4 && t < 41.6) for (let k = 0; k < 14; k++) {
    const a = k / 14 * 6.283 + .1, ph = (t * .7 + k * .29) % 1, r = (7.3 + 3.4 * ph) * z, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    s += `<path d="M ${f1(x - 18)} ${f1(y)} q 9 -10 18 0 t 18 0" transform="rotate(${f1(a * 57.3 + 90)} ${f1(x)} ${f1(y)})" stroke="#ffd23f" stroke-width="5" fill="none" opacity="${f1(Math.sin(ph * Math.PI) * prog(t, 38.4, 38.8))}"/>`;
  }
  // magnifier: a window cracks (glass)
  const lp = back(prog(t, 40.35, 40.65)) * (1 - prog(t, 42.2, 42.44));
  if (lp > 0) {
    const a = -2.45, kr = 14.5, px = cx + kr * z * Math.cos(a), py = cy + kr * z * Math.sin(a), lx = 300, ly = 560;
    const cr = eout(prog(t, 40.66, 40.95)), sh = prog(t, 41.0, 41.7);
    let cracks = '';
    for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283 + .3, L = 140 * cr * (.6 + .4 * H(k, 91)); cracks += `<path d="M 20 -10 L ${f1(20 + L * .5 * Math.cos(an) + 10)} ${f1(-10 + L * .5 * Math.sin(an))} L ${f1(20 + L * Math.cos(an + .2))} ${f1(-10 + L * Math.sin(an + .2))}"/>`; }
    let shards = '';
    for (let k = 0; k < 6; k++) { const sx = -60 + k * 24, sy = 20 + 260 * sh * sh * (.6 + .1 * k); shards += `<polygon points="${sx},${f1(sy)} ${sx + 16},${f1(sy + 6)} ${sx + 4},${f1(sy + 22)}" transform="rotate(${f1(sh * 300 + k * 50)} ${sx} ${f1(sy)})"/>`; }
    s += `<line x1="${f1(px)}" y1="${f1(py)}" x2="${lx}" y2="${ly}" stroke="${P.white}" stroke-width="3" stroke-dasharray="8 8" opacity="${f1(lp)}"/><circle cx="${f1(px)}" cy="${f1(py)}" r="8" fill="${RC[4]}"/>
      <g transform="translate(${lx} ${ly}) scale(${f1(lp)})"><line x1="105" y1="105" x2="175" y2="175" stroke="#2b2f3d" stroke-width="28" stroke-linecap="round"/>
      <clipPath id="v26lens"><circle cx="0" cy="0" r="150"/></clipPath><circle cx="0" cy="0" r="150" fill="#3a3540"/>
      <g clip-path="url(#v26lens)"><rect x="-110" y="-120" width="220" height="250" fill="#8a6a4a"/><rect x="-92" y="-102" width="184" height="214" fill="#9fd0e8"/>
        <path d="M -60 -90 L -20 -100 L -80 40 Z" fill="#fff" opacity=".35"/><g stroke="${P.ink}" stroke-width="4" fill="none">${cracks}</g><g fill="#cfe6f0" stroke="${P.ink}" stroke-width="2">${shards}</g>
        <rect x="-6" y="-102" width="12" height="214" fill="#8a6a4a"/></g>
      <circle cx="0" cy="0" r="150" fill="none" stroke="#c9d2e6" stroke-width="16"/><circle cx="0" cy="0" r="150" fill="none" stroke="${P.ink}" stroke-width="5"/></g>`;
  }
  s += gzDot(t, cx, cy);
  s += hud(t, [[32.0, '18 km', '', RC[4]], [32.3, '1 km', '', RC[0]], [33.1, '1 km', 'FEUERBALL', RC[0]], [34.5, '3 · 7 km', '', RC[2]], [35.8, '3 · 7 km', 'ZERSTÖRUNG', RC[2]], [38.6, '11 km', '', RC[3]], [39.06, '11 km', 'HITZE', RC[3]], [41.48, '18 km', 'GLAS', RC[4]]]);
  s += topTag('HANOI · 1 MEGATONNE') + schem();
  return s;
}
function s11(t) { // 42.44–46.54 different effects, no safe borders
  const cx = 540, cy = 860, z = 23.5;
  const p = eio(prog(t, 42.58, 43.4)) * (1 - eio(prog(t, 44.3, 44.75)));
  const sq = lerp(1, .42, eio(prog(t, 42.5, 43.2)) * (1 - eio(prog(t, 44.3, 44.75))));
  const fz = eio(prog(t, 44.7, 45.4));
  const M = { cx, cy, z, build: 1 };
  const tf = `translate(${cx} ${cy}) scale(1 ${f1(sq * 100) / 100}) translate(${-cx} ${-cy})`;
  let s = `<rect x="-40" y="-40" width="1160" height="2000" fill="${P.mapBg}"/><g transform="${tf}" opacity="${f1(1 - .6 * p)}">${mapBase(t, M)}</g>`;
  const names = ['FEUERBALL', 'ZERSTÖRUNG', '', 'HITZE', 'GLAS'];
  for (let i = 4; i >= 0; i--) {
    const off = (4 - i) * 95 * p + 6 * Math.sin(t * 2.4 + i) * p;
    const vis = [0, 0, 0, 0, 0], fill = [0, 0, 0, 0, 0]; vis[i] = 1; fill[i] = .9;
    s += `<g transform="translate(0 ${f1(-off)})"><g transform="${tf}">${rings(t, M, { vis, fill, fz, wob: .015 * fz })}</g></g>`;
    const lp = prog(t, 43.32 + (4 - i) * .1, 43.6 + (4 - i) * .1) * (1 - prog(t, 44.2, 44.4));
    if (lp > 0 && names[i]) {
      const y = cy - off + RK[i] * z * sq + 44;
      s += `<g opacity="${f1(lp)}"><rect x="${540 - 150}" y="${f1(y - 34)}" width="300" height="48" rx="24" fill="${P.ink}" opacity=".85"/>${T(names[i], 540, y, 32, RC[i], { ls: 3 })}</g>`;
    }
  }
  s += gzDot(t, cx, cy - 4 * 95 * p);
  s += topTag('HANOI · 1 MEGATONNE') + schem();
  return s;
}
function s12(t) { // 46.54–49.34 danger beyond a line
  const z = lerp(110, 90, eio(prog(t, 46.54, 49.34)));
  const cx = 540 + 7 * z + lerp(0, 120, eio(prog(t, 46.7, 47.8))), cy = 880;
  const M = { cx, cy, z, build: 1 };
  let s = mapBase(t, M) + rings(t, M, { vis: [1, 1, 1, 1, 1], fill: [.6, .4, .4, .35, .25], fz: 1, lab: [1, 1, 1, 1, 1] });
  const hk = [-7.9, -.4], hxp = cx + hk[0] * z, hyp = cy + hk[1] * z;
  const wp = prog(t, 47.9, 48.7);
  if (wp > 0 && wp < 1) {
    const r = lerp(6, 8.6, wp) * z;
    s += `<path d="M ${f1(cx - r * Math.cos(.35))} ${f1(cy - r * Math.sin(.35))} A ${f1(r)} ${f1(r)} 0 0 0 ${f1(cx - r * Math.cos(-.35))} ${f1(cy - r * Math.sin(-.35))}" stroke="${P.amber}" stroke-width="${f1(30 * (1 - wp) + 6)}" fill="none" opacity="${f1(.8 * (1 - wp * .6))}" filter="url(#blur8)"/>`;
    for (let k = 0; k < 5; k++) { const a = Math.PI + (k - 2) * .07, rr = r - 20; s += `<polygon points="${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a) - 10)} ${f1(cx + rr * Math.cos(a) + 12)},${f1(cy + rr * Math.sin(a) + 6)} ${f1(cx + rr * Math.cos(a) - 8)},${f1(cy + rr * Math.sin(a) + 8)}" fill="#cfe6f0"/>`; }
  }
  const hit = prog(t, 48.32, 48.5);
  s += pop(t, 46.8, hxp, hyp, housePin(hxp, hyp, 1.6, hit * (.7 + .3 * Math.sin(t * 10)), 10 * ring(t, 48.32, 3, 3)));
  s += pop(t, 48.68, hxp, hyp - 220, T('!', hxp, hyp - 170, 110, P.amber, { st: P.ink, sw: 10 }));
  s += topTag('HANOI · 1 MEGATONNE') + schem();
  return s;
}
function icon(kind, x, y) {
  if (kind === 0) return `<g transform="translate(${x} ${y})"><path d="${scallop(0, 0, 70, 40, 9)}" fill="#cfd6da" stroke="${P.ink}" stroke-width="4"/><g stroke="#7fb8e0" stroke-width="5" stroke-linecap="round"><line x1="-30" y1="50" x2="-38" y2="72"/><line x1="0" y1="50" x2="-8" y2="72"/><line x1="30" y1="50" x2="22" y2="72"/></g></g>`;
  if (kind === 1) return `<g transform="translate(${x} ${y})"><path d="M -80 50 L -30 -30 L 5 20 L 35 -10 L 80 50 Z" fill="#5a7a5a" stroke="${P.ink}" stroke-width="4"/><path d="M -30 -30 L -42 -10 L -18 -10 Z" fill="#e8eef0"/></g>`;
  return `<g transform="translate(${x} ${y})" stroke="${P.ink}" stroke-width="4"><rect x="-70" y="-30" width="40" height="80" fill="#8a8f9a"/><rect x="-25" y="-60" width="50" height="110" fill="#a4a9b3"/><rect x="30" y="-10" width="40" height="60" fill="#8a8f9a"/></g>`;
}
function s13(t) { // 49.34–53.98 depends on circumstances
  const cx = 540, cy = 700, z = 23.5, M = { cx, cy, z, build: 1 };
  const it = [51.46, 52.18, 52.7];
  let jolt = 0; it.forEach(a => { jolt += Math.abs(ring(t, a, 2.5, 3)); });
  const wob = .015 + .05 * eio(prog(t, 49.6, 51.2)) + .05 * jolt;
  let s = mapBase(t, M) + rings(t, M, { vis: [1, 1, 1, 1, 1], fill: [.6, .35, .35, .3, .2], fz: 1, wob, lab: [1, 1, 1, 1, 1] });
  s += gzDot(t, cx, cy);
  [[0, 250], [1, 540], [2, 800]].forEach(([k, x], i) => {
    s += pop(t, it[i], x, 1240, `<circle cx="${x}" cy="1240" r="96" fill="${P.ink}" opacity=".8"/>` + icon(k, x, 1235 + 6 * Math.sin(t * 3 + i)));
  });
  s += topTag('HANOI · 1 MEGATONNE');
  return s;
}
function sFall(t) { // 53.98–71.48 fallout scenario
  // camera
  const pz = eio(prog(t, 64.54, 68.4));
  let z = lerp(23.5, 11, pz), cx = lerp(540, 300, pz), cy = lerp(760, 1080, pz);
  // plume length (km beyond R0)
  let L = 0;
  if (t > 57.5) L = 3 * eout(prog(t, 57.5, 59.0));
  if (t > 59.08) L = lerp(3, 9, eio(prog(t, 59.08, 60.6)));
  if (t > 60.6) L = lerp(9, 10, prog(t, 60.6, 64.54));
  if (t > 64.54) L = lerp(10, 15, eio(prog(t, 64.54, 68.4)));
  if (t > 69.6) L = lerp(15, 40, eio(prog(t, 69.6, 71.4)));
  const flip = prog(t, 54.2, 54.9), fs = Math.abs(Math.cos(flip * Math.PI));
  const after = flip >= .5;
  const M = { cx, cy, z, build: 1, fields: prog(t, 64.6, 66), bound: eio(prog(t, 68.9, 69.7)), dim: after ? .1 : 0 };
  let w = mapBase(t, M);
  if (!after) w += rings(t, M, { vis: [1, 1, 1, 1, 1], fill: [.6, .35, .35, .3, .2], fz: 1, wob: .03, lab: [1, 1, 1, 1, 1] });
  else w += rings(t, M, { vis: [1, 1, 1, 1, 1], op: .3, fz: 1, lab: [0, 0, 0, 0, 0] });
  // clean circle that morphs into the plume (L16)
  const cp = prog(t, 60.44, 61.0), mo = eio(prog(t, 62.64, 63.6));
  if (after && cp > 0 && t < 64.54) {
    const pts = plumePts(cx, cy, z, L, t, mo, 1.8, 8 * eout(cp));
    w += plume(t, cx, cy, z, L * eio(prog(t, 59.0, 59.6)) * (1 - 0));
    w += `<polygon points="${pts}" fill="none" stroke="${P.white}" stroke-width="7" stroke-dasharray="${mo < .99 ? '22 14' : 'none'}" opacity="${f1(1 - .5 * mo)}"/>`;
  } else if (after) w += plume(t, cx, cy, z, L);
  // dust rising from the centre and drifting with the wind (L15)
  if (after && t > 57.3 && t < 64.6) {
    let d = '';
    for (let i = 0; i < 46; i++) {
      const bt = 57.4 + i * .035, age = t - bt; if (age < 0) continue;
      const a = H(i, 101) * 6.283, rr = 14 + 40 * H(i, 102) * Math.min(1, age);
      const drift = t > 59.0 ? Math.pow(t - 59.0, 1.4) * (90 + 60 * H(i, 103)) : 0;
      const x = cx + rr * Math.cos(a) + WU[0] * drift, y = cy + rr * Math.sin(a) * .6 - Math.min(age, 1) * 30 + WU[1] * drift;
      d += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(5 + 5 * H(i, 104))}" opacity="${f1(cl(age * 4) * (1 - prog(t, 63.5, 64.6)))}"/>`;
    }
    const puff = back(prog(t, 57.5, 57.9)) * (1 - prog(t, 59.2, 60.2));
    w += `<g fill="#d8d0a0">${d}</g>`;
    if (puff > 0) w += `<circle cx="${cx}" cy="${cy - 20}" r="${f1(60 * puff)}" fill="#b8b090" opacity=".8"/><circle cx="${cx - 30}" cy="${cy - 5}" r="${f1(40 * puff)}" fill="#c8c0a0" opacity=".8"/>`;
  }
  if (after) {
    w += windArrow(t, cx, cy, prog(t, 59.08, 59.6), lerp(330, 300, pz), lerp(130, 160, pz));
    w += windStreaks(t, prog(t, 58.9, 59.5));
    // boundary crossing pulse
    const xp = prog(t, 70.05, 70.6);
    if (xp > 0 && xp < 1) { const br = 18.4 * z, bx = cx + br * WU[0], by = cy + br * WU[1]; w += `<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(20 + 90 * xp)}" fill="none" stroke="${P.white}" stroke-width="${f1(10 * (1 - xp))}" opacity="${f1(1 - xp)}"/>`; }
  }
  w += gzDot(t, cx, cy);
  const sh = `<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity="${f1(.5 * (1 - fs))}"/>`;
  let s = `<rect x="-40" y="-40" width="1160" height="2000" fill="#0b0d0f"/><g transform="translate(540 0) scale(${f1(Math.max(.02, fs))} 1) translate(-540 0)">${w}${sh}</g>`;
  s += windsock(t, 840, 260, prog(t, 55.46, 55.8) * (1 - prog(t, 64.3, 64.6)));
  s += topTag('HANOI · 1 MEGATONNE') + schem();
  return s;
}
function s19(t) { // 71.48–77.48 familiar skyline → damage area
  const pan = lerp(120, 20, eio(prog(t, 71.48, 77.48)));
  const dk = eio(prog(t, 73.84, 75.0));
  let s = skyline(t, { pan, lit: .34, dark: dk, off: dk, smoke: eio(prog(t, 74.0, 76.8)), carLights: 1 - dk });
  const rp = prog(t, 75.3, 76.7);
  if (rp > 0) for (let i = 0; i < 5; i++) {
    const R = (RK[i] / 18) * 1300 * eout(cl(rp * 1.3 - i * .08));
    if (R > 0) s += `<ellipse cx="${f1(560 - pan * .35)}" cy="1006" rx="${f1(R)}" ry="${f1(R * .09)}" fill="none" stroke="${RC[i]}" stroke-width="5" opacity=".85"/>`;
  }
  s += topTag('GEDANKENEXPERIMENT', prog(t, 74.16, 74.6) * (1 - prog(t, 77.0, 77.4)));
  return s;
}
function s20(t) { // 77.48–81.78 the distance number falls away
  const pz = eio(prog(t, 77.48, 81.78));
  const z = lerp(23.5, 30, pz), hxT = lerp(926, 760, pz), hyT = lerp(555, 640, pz);
  const cx = hxT - HOUSE_K * z * WU[0], cy = hyT - HOUSE_K * z * WU[1];
  const M = { cx, cy, z, build: 1, dim: .2 };
  let s = mapBase(t, M) + rings(t, M, { vis: [1, 1, 1, 1, 1], fill: [.3, .2, .2, .15, .1], fz: 1, op: .6, lab: [0, 0, 0, 0, 0] });
  const ml = eout(prog(t, 77.68, 78.5)) * (1 - eio(prog(t, 80.1, 80.9)));
  const hp = [cx + HOUSE_K * z * WU[0], cy + HOUSE_K * z * WU[1]];
  if (ml > 0) {
    s += `<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(lerp(cx, hp[0], ml))}" y2="${f1(lerp(cy, hp[1], ml))}" stroke="${P.white}" stroke-width="5" stroke-dasharray="14 10"/>`;
    const mx = lerp(cx, hp[0], ml * .5), my = lerp(cy, hp[1], ml * .5) - 40;
    if (mx > 60 && mx < 900) s += T(`${Math.round(18 * ml)} km`, mx, my, 40, P.white, { st: P.ink, sw: 8, op: cl(ml * 2) });
  }
  s += gzDot(t, cx, cy, .8);
  s += housePin(hp[0], hp[1], 1.3, .25 + .15 * Math.sin(t * 2), 0);
  // the big number tile
  const ti = prog(t, 78.52, 78.7);
  if (ti > 0) {
    const shake = t > 79.08 && t < 79.5 ? 8 * Math.sin(t * 60) : 0;
    const fall = prog(t, 79.5, 80.4), rot = 70 * ein(fall), dy = 1500 * ein(fall);
    s += `<g transform="translate(${f1(540 + shake)} ${f1(300 + dy)}) rotate(${f1(rot)}) scale(${f1(lerp(1.6, 1, eout(ti)))})" opacity="${f1(cl(ti * 3))}">
      <rect x="-200" y="-90" width="400" height="180" rx="26" fill="${P.ink}" stroke="${RC[4]}" stroke-width="6"/>${T('18 km', 0, 38, 110, P.white)}</g>`;
  }
  s += schem();
  return s;
}
function s21(t) { // 81.78–86.63 night skyline, hope
  const pan = lerp(0, 110, eio(prog(t, 81.78, 86.63)));
  const lit = lerp(.04, .5, eio(prog(t, 82.3, 85.6)));
  let s = skyline(t, { pan, night: 1, lit, carLights: prog(t, 82.4, 83) });
  s += brackets(t, 84.14, 20 * eio(prog(t, 85.8, 86.6)));
  s += pop(t, 84.6, 540, 200, T('GEDANKENEXPERIMENT', 540, 210, 34, P.white, { ls: 8, op: .85 }));
  return s;
}
function scene(t) {
  if (t < 4.88) return s1(t);
  if (t < 8.59) return s2(t);
  if (t < 12.22) return s3(t);
  if (t < 15.28) return s4(t);
  if (t < 17.64) return s4b(t);
  if (t < 22.12) return s5(t);
  if (t < 25.31) return s6(t);
  if (t < 32.0) return s7(t);
  if (t < 42.44) return sRings(t);
  if (t < 46.54) return s11(t);
  if (t < 49.34) return s12(t);
  if (t < 53.98) return s13(t);
  if (t < 71.48) return sFall(t);
  if (t < 77.48) return s19(t);
  if (t < 81.78) return s20(t);
  return s21(t);
}
</scene_js>
<events_json>{"music":"mystery","events":[
{"t":0.05,"type":"whoosh","dur":0.7,"gain":0.5,"weight":"hero"},
{"t":0.35,"type":"pop","gain":0.4},
{"t":1.3,"type":"tick","f":1600,"gain":0.25},
{"t":1.65,"type":"pop","gain":0.3},
{"t":2.2,"type":"air","dur":2.0,"gain":0.3},
{"t":3.19,"type":"heart","gain":0.35},
{"t":3.55,"type":"pop","gain":0.3},
{"t":4.88,"type":"ambience","dur":3.6,"gain":0.3},
{"t":6.8,"type":"stamp","gain":0.4},
{"t":7.6,"type":"pop","gain":0.4},
{"t":7.35,"type":"tick","f":2000,"gain":0.2},
{"t":8.6,"type":"whoosh","dur":0.4,"gain":0.35},
{"t":9.38,"type":"stamp","gain":0.6,"weight":"hero"},
{"t":10.5,"type":"pop","gain":0.4},
{"t":11.0,"type":"click","gain":0.4},
{"t":11.7,"type":"whoosh","dur":0.4,"gain":0.25},
{"t":12.25,"type":"riser","dur":0.6,"f0":200,"f1":1200,"gain":0.35},
{"t":12.85,"type":"hit","gain":0.7,"f0":70,"f1":30,"dur":2.5,"weight":"hero"},
{"t":13.6,"type":"air","dur":1.2,"gain":0.3},
{"t":14.65,"type":"whoosh","dur":0.8,"gain":0.4},
{"t":15.3,"type":"hit","gain":0.4,"f0":45,"f1":25,"dur":2.0},
{"t":15.6,"type":"rustle","dur":1.2,"gain":0.35},
{"t":16.0,"type":"crack","gain":0.25},
{"t":17.64,"type":"air","dur":3.5,"gain":0.3},
{"t":20.84,"type":"whoosh","dur":0.5,"gain":0.2},
{"t":22.12,"type":"whoosh","dur":0.5,"gain":0.35},
{"t":22.45,"type":"shimmer","dur":0.5,"gain":0.3},
{"t":23.44,"type":"thud","gain":0.3},
{"t":24.81,"type":"crack","gain":0.5,"weight":"hero"},
{"t":25.35,"type":"whoosh","dur":0.5,"gain":0.3},
{"t":26.62,"type":"stamp","gain":0.35},
{"t":27.54,"type":"tick","f":1500,"gain":0.2},
{"t":27.86,"type":"tick","f":1700,"gain":0.2},
{"t":28.4,"type":"whoosh","dur":0.3,"gain":0.3},
{"t":28.67,"type":"ting","f":440,"gain":0.4,"decay":1.5},
{"t":29.13,"type":"ting","f":523.25,"gain":0.4,"decay":1.5},
{"t":29.53,"type":"ting","f":587.33,"gain":0.4,"decay":1.5},
{"t":30.04,"type":"ting","f":659.25,"gain":0.4,"decay":1.5},
{"t":30.61,"type":"ting","f":783.99,"gain":0.5,"decay":2,"weight":"hero"},
{"t":32.0,"type":"whoosh","dur":0.6,"gain":0.35},
{"t":33.1,"type":"shimmer","dur":0.8,"gain":0.4},
{"t":34.1,"type":"whoosh","dur":0.6,"gain":0.3},
{"t":35.8,"type":"thud","gain":0.45},
{"t":36.7,"type":"thud","gain":0.25},
{"t":37.0,"type":"thud","gain":0.25},
{"t":37.4,"type":"thud","gain":0.25},
{"t":38.1,"type":"whoosh","dur":0.6,"gain":0.3},
{"t":39.06,"type":"air","dur":1.4,"gain":0.35},
{"t":40.4,"type":"pop","gain":0.3},
{"t":40.66,"type":"crack","gain":0.45},
{"t":41.0,"type":"crash","gain":0.35,"dur":0.6},
{"t":41.48,"type":"pop","gain":0.35},
{"t":42.58,"type":"whoosh","dur":0.8,"gain":0.35},
{"t":43.4,"type":"tick","f":1400,"gain":0.2},
{"t":44.35,"type":"whoosh","dur":0.4,"gain":0.3},
{"t":45.14,"type":"shimmer","dur":0.8,"gain":0.3},
{"t":46.6,"type":"whoosh","dur":0.6,"gain":0.3},
{"t":46.85,"type":"pop","gain":0.3},
{"t":48.32,"type":"thud","gain":0.4},
{"t":48.68,"type":"pop","gain":0.4,"weight":"hero"},
{"t":49.5,"type":"slide","f0":300,"f1":220,"dur":1.0,"gain":0.2},
{"t":51.46,"type":"pop","gain":0.35},
{"t":52.18,"type":"pop","gain":0.35},
{"t":52.7,"type":"pop","gain":0.35},
{"t":54.2,"type":"whoosh","dur":0.6,"gain":0.45,"weight":"hero"},
{"t":55.46,"type":"rustle","dur":1.0,"gain":0.3},
{"t":57.5,"type":"air","dur":1.5,"gain":0.35},
{"t":59.08,"type":"whoosh","dur":1.4,"gain":0.4},
{"t":60.44,"type":"shimmer","dur":0.6,"gain":0.3},
{"t":62.64,"type":"slide","f0":400,"f1":250,"dur":0.9,"gain":0.3},
{"t":64.54,"type":"air","dur":4.0,"gain":0.3},
{"t":66.28,"type":"whoosh","dur":0.8,"gain":0.3},
{"t":68.9,"type":"tick","f":1600,"gain":0.25},
{"t":70.08,"type":"thud","gain":0.35,"weight":"hero"},
{"t":71.48,"type":"ambience","dur":2.4,"gain":0.3},
{"t":73.84,"type":"hit","gain":0.45,"f0":50,"f1":28,"dur":2.5},
{"t":75.4,"type":"whoosh","dur":1.2,"gain":0.35},
{"t":77.7,"type":"tick","f":1500,"gain":0.2},
{"t":78.52,"type":"stamp","gain":0.45,"weight":"hero"},
{"t":79.08,"type":"tick","f":1200,"gain":0.2},
{"t":79.5,"type":"slide","f0":600,"f1":120,"dur":0.9,"gain":0.35},
{"t":81.8,"type":"ambience","dur":4.8,"gain":0.25},
{"t":82.5,"type":"switch","gain":0.25},
{"t":83.5,"type":"switch","gain":0.2},
{"t":84.14,"type":"shimmer","dur":1.0,"gain":0.3},
{"t":84.6,"type":"pop","gain":0.3}
]}</events_json>
<storyboard_json>[
{"t0":0.0,"t1":4.88,"lines":[0],"title_vi":"18 km vẫn chưa an toàn","desc_vi":"Mở trên bản đồ giản lược: camera lùi, vòng 18 km quét ra, đường đo tới một ngôi nhà ngay ngoài vòng; vệt bụi theo gió đã trườn qua vòng, nhà nháy cam ở chữ 'Gefahr'. Chữ nhỏ GEDANKENEXPERIMENT."},
{"t0":4.88,"t1":8.59,"lines":[1],"title_vi":"Hà Nội lúc hoàng hôn","desc_vi":"Skyline xám đậm trời vàng cam, camera trượt ngang, chim bay, cửa sổ sáng dần; bật nhãn 1 MEGATONNE và HANOI, một điểm đánh dấu nét đứt trên bầu trời."},
{"t0":8.59,"t1":12.22,"lines":[2],"title_vi":"Chỉ là giả định","desc_vi":"Skyline thành nét vẽ trên lưới, khung góc bật vào, dấu đóng GEDANKENEXPERIMENT; biển cảnh báo hiện ra rồi bị gạch bỏ."},
{"t0":12.22,"t1":15.28,"lines":[3],"title_vi":"Chớp sáng và sức nóng","desc_vi":"Điểm sáng → chớp trắng tắt nhanh → trời chuyển cam nóng, vòng sóng xung kích lan trên trời và bụi tung dọc chân trời."},
{"t0":15.28,"t1":17.64,"lines":[3],"title_vi":"Sóng xung kích qua phố","desc_vi":"Góc ngang phố: dải sóng chạy từ phải sang trái, cây oằn, biển hiệu lắc, cửa kính lóe rồi tắt đèn, bụi và lá bay, rung máy. Không có người."},
{"t0":17.64,"t1":22.12,"lines":[4],"title_vi":"Quả cầu lửa lớn dần","desc_vi":"Góc thấp: cầu lửa gradient lớn và bốc lên với cột bụi, nhà cửa chuyển thành bóng đen viền cam, tàn lửa bay."},
{"t0":22.12,"t1":25.31,"lines":[5],"title_vi":"Một vòng tròn không đủ","desc_vi":"Chuyển cảnh nhìn từ trên: ánh cầu lửa co thành một vòng tròn trắng; nhiệt, bụi, mảnh kính đẩy méo vòng rồi vòng vỡ tung."},
{"t0":25.31,"t1":32.0,"lines":[6],"title_vi":"Năm mốc khoảng cách","desc_vi":"Bản đồ giản lược tự vẽ (sông, hồ, đường), chữ SCHEMATISCH; năm vạch thước hiện ở 'fünf', rồi vòng 1→3→7→11→18 km bật đúng từng số, camera lùi dần, tiếng chuông cao dần."},
{"t0":32.0,"t1":42.44,"lines":[7,8,9],"title_vi":"Từng vòng một","desc_vi":"Zoom vào tâm: FEUERBALL; ra vùng 3–7 km: ZERSTÖRUNG, nhà nhỏ đổ; vùng 7–11 km: sóng nhiệt, HITZE; kính lúp cho thấy cửa kính nứt vỡ, GLAS ở 18 km."},
{"t0":42.44,"t1":46.54,"lines":[10],"title_vi":"Không phải ranh giới an toàn","desc_vi":"Các vòng tách thành tầng chồng lên nhau (mỗi tầng một tác động), rồi hạ xuống và mép vòng thành dải mờ nét đứt."},
{"t0":46.54,"t1":49.34,"lines":[11],"title_vi":"Ngoài vạch vẫn nguy hiểm","desc_vi":"Cận đường vòng 7 km: một xung nhiệt và mảnh kính vượt qua vạch tới ngôi nhà bên ngoài, nhà nháy cam, dấu '!'."},
{"t0":49.34,"t1":53.98,"lines":[12],"title_vi":"Tùy hoàn cảnh","desc_vi":"Các vòng méo lắc khi biểu tượng thời tiết, địa hình, nhà cao tầng lần lượt bật lên."},
{"t0":53.98,"t1":60.32,"lines":[13,14],"title_vi":"Bụi phóng xạ và gió","desc_vi":"Bản đồ lật sang kịch bản bụi phóng xạ, ống gió; bụi bốc lên từ tâm, mũi tên gió vẽ ra và hạt bụi trôi cùng hướng."},
{"t0":60.32,"t1":64.54,"lines":[15],"title_vi":"Không còn là vòng tròn","desc_vi":"Một vòng tròn nét đứt gọn gàng hiện ra rồi biến hình thành vệt bụi méo kéo dài theo gió."},
{"t0":64.54,"t1":71.48,"lines":[16,17],"title_vi":"Vệt trải qua địa hình","desc_vi":"Camera lùi ra đồng ruộng, đồi; vệt bụi kéo dài không đều; đường ranh thành phố nét đứt hiện ra và vệt vượt qua nó."},
{"t0":71.48,"t1":77.48,"lines":[18],"title_vi":"Skyline thành vùng thiệt hại","desc_vi":"Skyline quen thuộc lúc hoàng hôn, rồi tối sầm, cột khói và ánh lửa bốc lên, các vòng thiệt hại quét ngang cả thành phố."},
{"t0":77.48,"t1":81.78,"lines":[19],"title_vi":"Con số không còn quan trọng","desc_vi":"Bản đồ: đường đo tới nhà, ô số '18 km' đập vào rồi rung, nghiêng và rơi khỏi khung ở 'nicht mehr'."},
{"t0":81.78,"t1":86.63,"lines":[20],"title_vi":"Hy vọng","desc_vi":"Skyline đêm yên tĩnh, sao, cửa sổ sáng lên từng ô, đèn xe trên cầu; khung GEDANKENEXPERIMENT khép lại."}
]</storyboard_json>
