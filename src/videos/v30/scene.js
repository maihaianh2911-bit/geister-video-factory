// @ts-nocheck
// AUTO-GENERATED scene for v30. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const P = { bg: '#15142A', face: '#211E44', w: '#F4F1FF', lav: '#B8A9FF', dim: '#6E62B5', gold: '#FFD27A', cyan: '#7FE3F0', red: '#FF6B8A' };
const FW = "font-family:'Inter';font-weight:";
const NS = 'vector-effect="non-scaling-stroke"';

function de(v, dec = 0) {
  const s = v.toFixed(dec); const parts = s.split('.');
  const i = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts[1] ? i + ',' + parts[1] : i;
}
function TX(s, x, y, size, col, o = {}) {
  const st = `${FW}${o.w || 800};font-size:${size}px;letter-spacing:${o.ls || 0}px`;
  const op = o.op === undefined ? 1 : o.op;
  if (o.outline) return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" opacity="${op}" style="${st}" fill="${col}" fill-opacity=".14" stroke="${col}" stroke-width="${o.sw || 3.5}" stroke-linejoin="round">${s}</text>`;
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" opacity="${op}" style="${st}" fill="${col}">${s}</text>`;
}
function popIn(t, t0, cx, cy, inner, d = .3) {
  const p = back(prog(t, t0, t0 + d));
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})">${inner}</g>`;
}
function bigNum(t, t0, s, x, y, size = 150, col = P.w) { return popIn(t, t0, x, y - size * .35, TX(s, x, y, size, col, { outline: 1 })); }
function countNum(t, t0, t1, val, dec, unit, x, y, size = 140, col = P.gold) {
  if (t < t0) return '';
  const v = val * eout(prog(t, t0, t1));
  return popIn(t, t0, x, y - size * .35, TX(de(v, dec) + unit, x, y, size, col, { outline: 1 }), .25);
}
function bg(hx = 540, hy = 860, hr = 900) {
  return `<defs><radialGradient id="h30"><stop offset="0" stop-color="#3B2C78" stop-opacity=".8"/><stop offset=".55" stop-color="#241C4E" stop-opacity=".4"/><stop offset="1" stop-color="${P.bg}" stop-opacity="0"/></radialGradient>
  <filter id="gl30" filterUnits="userSpaceOnUse" x="-200" y="-200" width="1480" height="2320"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect x="0" y="0" width="1080" height="1920" fill="${P.bg}"/><circle cx="${hx}" cy="${hy}" r="${hr}" fill="url(#h30)"/>`;
}
function starsF(t, n, seed, y0 = 0, y1 = 1300, op = 1) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = hash(i * 3.1 + seed) * 1080, y = y0 + hash(i * 7.7 + seed) * (y1 - y0);
    const tw = .35 + .45 * (0.5 + 0.5 * Math.sin(t * (1.5 + hash(i + seed) * 3) + i));
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.2 + 1.8 * hash(i + seed * 2)).toFixed(1)}" fill="${P.w}" opacity="${(tw * op).toFixed(2)}"/>`;
  }
  return s;
}
function burst(t, t0, cx, cy, n = 16, R = 240, col = P.gold, dur = .8) {
  const p = prog(t, t0, t0 + dur);
  if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + hash(i) * .4, r = R * eout(p) * (.6 + .4 * hash(i + 5));
    s += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="${(5 * (1 - p) + 1).toFixed(1)}" fill="${col}"/>`;
  }
  return s;
}
function ringPulse(t, t0, cx, cy, R = 200, col = P.gold) {
  const p = prog(t, t0, t0 + .6);
  if (p <= 0 || p >= 1) return '';
  return `<circle cx="${cx}" cy="${cy}" r="${20 + R * eout(p)}" fill="none" stroke="${col}" stroke-width="${4 * (1 - p) + .5}" opacity="${1 - p}"/>`;
}
function hud(n, o = {}) {
  const k = Math.floor(n + 1e-6);
  let s = '';
  for (let i = 0; i < 42; i++) {
    const x = 150 + i * 19.03, on = i < k, red = o.red === i;
    const r = on ? 6.5 : red ? 7 + 2 * Math.sin((o.t || 0) * 30) : 4;
    s += `<circle cx="${x.toFixed(1)}" cy="168" r="${r.toFixed(1)}" fill="${red ? P.red : on ? P.gold : 'none'}" stroke="${red ? P.red : on ? P.gold : P.dim}" stroke-width="2"/>`;
  }
  s += TX(`${k}×`, 540, 238, 46, P.gold, { w: 700, ls: 2 });
  return `<g opacity="${o.op === undefined ? 1 : o.op}">${s}</g>`;
}
// stick figure, origin at the feet, ≈280·s tall. arm angles: 0 = down, 90 = sideways, 180 = up (outward per side)
function stick(x, y, s, o = {}) {
  const c = o.col || P.w, sw = o.sw || 4;
  const v = (a, sd) => [sd * Math.sin(a * Math.PI / 180), Math.cos(a * Math.PI / 180)];
  const arm = (sd, a, b) => {
    const S = [sd * 4, -192], u = v(a, sd), e = [S[0] + u[0] * 54, S[1] + u[1] * 54], w2 = v(a + b, sd), h = [e[0] + w2[0] * 50, e[1] + w2[1] * 50];
    return `<path d="M ${S[0]} ${S[1]} L ${e[0].toFixed(1)} ${e[1].toFixed(1)} L ${h[0].toFixed(1)} ${h[1].toFixed(1)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${NS}/>`;
  };
  const ph = o.walk;
  const leg = sd => { const sw2 = ph === undefined ? 0 : 24 * Math.sin(ph + (sd > 0 ? 0 : Math.PI)); const kx = sd * 14 + sw2 * .6, ky = -55 - (ph === undefined ? 0 : 8 * Math.max(0, Math.sin(ph + (sd > 0 ? 0 : Math.PI)))); return `<path d="M 0 -112 L ${kx.toFixed(1)} ${ky.toFixed(1)} L ${(sd * 26 + sw2).toFixed(1)} 0" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${NS}/>`; };
  const lk = o.look || 0, lky = o.lookY || 0, blink = o.blink ? .2 : 1;
  const mouth = o.mouth === 'o' ? `<ellipse cx="${lk * .6}" cy="-224" rx="6" ry="8" fill="none" stroke="${c}" stroke-width="3" ${NS}/>` : o.mouth === 'smile' ? `<path d="M ${-10 + lk * .6} -226 Q ${lk * .6} -216 ${10 + lk * .6} -226" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" ${NS}/>` : o.mouth === 'strain' ? `<path d="M ${-10} -222 L 10 -222" stroke="${c}" stroke-width="3" stroke-linecap="round" ${NS}/>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.lean || 0})">
    ${leg(-1)}${leg(1)}
    <path d="M 0 -112 L 0 -205" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" ${NS}/>
    ${arm(-1, o.aL === undefined ? 18 : o.aL, o.bL || 0)}${arm(1, o.aR === undefined ? 18 : o.aR, o.bR || 0)}
    <g transform="rotate(${o.headTilt || 0} 0 -205)">
      <circle cx="0" cy="-240" r="32" fill="${P.face}" stroke="${c}" stroke-width="${sw}" ${NS}/>
      <ellipse cx="${-11 + lk}" cy="${-244 + lky}" rx="3.6" ry="${4.5 * blink}" fill="${c}"/><ellipse cx="${11 + lk}" cy="${-244 + lky}" rx="3.6" ry="${4.5 * blink}" fill="${c}"/>
      ${mouth}${o.head || ''}
    </g>${o.extra || ''}</g>`;
}
// vertical column of folded paper: bottom yb, top yt, centre x, width w
function column(x, yb, yt, w, t, col = P.w) {
  const h = Math.max(0, yb - yt);
  if (h < .5) return '';
  let lines = '';
  const gap = 16, off = (t * 40) % gap;
  for (let y = yb - off; y > yt + 2 && lines.length < 9000; y -= gap) lines += `<line x1="${x - w / 2 + 3}" y1="${y.toFixed(1)}" x2="${x + w / 2 - 3}" y2="${y.toFixed(1)}" stroke="${P.lav}" stroke-width="1.5" opacity=".55"/>`;
  return `<rect x="${x - w / 2}" y="${yt.toFixed(1)}" width="${w}" height="${h.toFixed(1)}" fill="${P.lav}" fill-opacity=".12" stroke="${col}" stroke-width="3"/>${w > 12 ? lines : ''}
    <line x1="${x - w / 2 - 6}" y1="${yt.toFixed(1)}" x2="${x + w / 2 + 6}" y2="${yt.toFixed(1)}" stroke="${P.gold}" stroke-width="4" stroke-linecap="round"/>`;
}
function moonF(cx, cy, r, op = 1) {
  return `<g opacity="${op}"><circle cx="${cx}" cy="${cy}" r="${r * 1.6}" fill="${P.gold}" opacity=".08"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${P.face}" stroke="${P.gold}" stroke-width="3"/>
    <circle cx="${cx - r * .3}" cy="${cy - r * .2}" r="${r * .18}" fill="none" stroke="${P.gold}" stroke-width="2" opacity=".6"/><circle cx="${cx + r * .32}" cy="${cy + r * .25}" r="${r * .12}" fill="none" stroke="${P.gold}" stroke-width="2" opacity=".6"/><circle cx="${cx + r * .1}" cy="${cy - r * .45}" r="${r * .08}" fill="none" stroke="${P.gold}" stroke-width="2" opacity=".6"/></g>`;
}
// top-view sheet with two folds: p1 folds the right half over the left, p2 folds the top half down
function sheetTop(cx, cy, w, h, p1, p2) {
  const L = cx - w / 2, T = cy - h / 2, B = cy + h / 2;
  const face = `fill="${P.face}" stroke="${P.w}" stroke-width="3" stroke-linejoin="round"`;
  if (p2 <= 0) {
    const fx = cx + (w / 2) * Math.cos(Math.PI * p1), lift = 50 * Math.sin(Math.PI * p1);
    const base = p1 <= 0 ? `<rect x="${L}" y="${T}" width="${w}" height="${h}" ${face}/>` : `<rect x="${L}" y="${T}" width="${w / 2}" height="${h}" ${face}/>`;
    const flap = p1 <= 0 ? '' : `<polygon points="${cx},${T} ${fx.toFixed(1)},${(T - lift).toFixed(1)} ${fx.toFixed(1)},${(B - lift * .4).toFixed(1)} ${cx},${B}" ${face} fill-opacity="${p1 > .5 ? 1 : .9}"/>`;
    return base + flap + (p1 >= 1 ? `<line x1="${L + 8}" y1="${T + 8}" x2="${L + 8}" y2="${B - 8}" stroke="${P.lav}" stroke-width="2" opacity=".6"/>` : '');
  }
  const fy = cy - (h / 2) * Math.cos(Math.PI * p2), sh = 40 * Math.sin(Math.PI * p2);
  return `<rect x="${L}" y="${cy}" width="${w / 2}" height="${h / 2}" ${face}/>
    <polygon points="${L},${cy} ${cx},${cy} ${(cx + sh * .5).toFixed(1)},${fy.toFixed(1)} ${(L + sh).toFixed(1)},${fy.toFixed(1)}" ${face}/>`;
}
// side view: m layers from xa to xb at baseline y0, the right half folding over with progress p
function sideFold(xa, xb, y0, m, gap, p, col = P.w) {
  const xm = (xa + xb) / 2;
  let left = '', right = '';
  for (let i = 0; i < m; i++) {
    const y = y0 - i * gap;
    left += `<line x1="${xa}" y1="${y}" x2="${xm}" y2="${y}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;
    right += `<line x1="${xm}" y1="${y}" x2="${xb}" y2="${y}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;
  }
  const yt = y0 - (m - 1) * gap - gap / 2;
  const bend = p >= 1 ? `<path d="M ${xm} ${y0} A ${m * gap / 2} ${m * gap / 2} 0 0 0 ${xm} ${y0 - (2 * m - 1) * gap}" fill="none" stroke="${P.lav}" stroke-width="2.5" opacity=".7"/>` : '';
  return left + `<g transform="rotate(${(-180 * p).toFixed(2)} ${xm} ${yt})">${right}</g>` + bend;
}

// ---------------- shots ----------------
function s1(t) { // 0–4.74 hook: sheet -> folds -> column to the Moon
  const p1 = eio(prog(t, .1, .38)), p2 = eio(prog(t, .38, .64));
  const zo = eio(prog(t, .95, 2.4));
  const launch = prog(t, .64, .95);
  let s = bg(540, 820, 900) + starsF(t, 40, 3, 0, 1300, .3 + .7 * zo);
  // Earth arc rises from the bottom while zooming out
  const ey = lerp(2200, 1330, zo);
  s += `<path d="M -100 ${ey + 160} Q 540 ${ey - 120} 1180 ${ey + 160}" fill="none" stroke="${P.cyan}" stroke-width="4"/><path d="M -100 ${ey + 190} Q 540 ${ey - 70} 1180 ${ey + 190}" fill="none" stroke="${P.cyan}" stroke-width="1.5" opacity=".4"/>`;
  // moon: faint at the start (loop), bright when reached
  const mr = 105, my = 330;
  const mop = t < 2.6 ? .35 : lerp(.35, 1, eio(prog(t, 2.6, 3.4)));
  s += moonF(540, my, mr * (1 + .12 * Math.sin(prog(t, 4.06, 4.4) * Math.PI)), mop);
  if (t < .95) {
    const k = 1 - .35 * ein(launch);
    s += `<g transform="translate(540 1010) scale(${k}) translate(-540 -1010)">${sheetTop(540, 1010, 460, 650, p1, p2)}</g>`;
    if (launch > 0) s += column(540, 1010, lerp(1010, -60, eout(launch)), 40, t);
  } else {
    const base = lerp(1010, ey - 140, zo);
    const tipT = lerp(-60, 1000, eio(prog(t, .95, 1.6)));
    const tip = t < 2.3 ? tipT : lerp(1000, my + mr, eio(prog(t, 2.3, 4.06)));
    s += column(540, base, Math.min(tip, base - 4), lerp(40, 16, zo), t);
    s += `<rect x="${540 - lerp(150, 10, zo)}" y="${base - 6}" width="${lerp(300, 20, zo)}" height="10" fill="${P.face}" stroke="${P.w}" stroke-width="2.5"/>`;
  }
  s += ringPulse(t, 4.06, 540, my, 260) + burst(t, 4.06, 540, my + mr, 18, 220);
  s += bigNum(t, 1.46, '42×', 270, 860, 190, P.gold);
  const sh = t > .64 && t < 1.1 ? 10 * Math.exp(-(t - .64) * 8) : 0;
  return `<g transform="translate(${sh * Math.sin(t * 90)} ${sh * Math.cos(t * 70)})" filter="url(#gl30)">${s}</g>`;
}
function s2(t) { // 4.74–5.66 Klingt verrückt
  const j = back(prog(t, 4.76, 5.0));
  const circ = t * 22;
  const fx = 70 + 18 * Math.cos(circ), fy = -268 + 14 * Math.sin(circ);
  const spiral = `<path d="M ${fx + 40} ${fy - 20} a 14 14 0 1 1 10 12 a 22 22 0 1 0 -18 -20" fill="none" stroke="${P.lav}" stroke-width="2.5" opacity="${prog(t, 5.0, 5.15)}"/>`;
  let s = bg(540, 900, 820) + starsF(t, 20, 9, 0, 1300, .4);
  s += stick(540, 1300, 1.9, { lean: -8 * j, aL: 30 + 20 * j, bL: 30, aR: lerp(18, 150, eout(prog(t, 4.76, 4.95))), bR: lerp(0, 105, eout(prog(t, 4.76, 4.95))), mouth: 'o', headTilt: -6 * j + 4 * Math.sin(t * 9), look: 6, lookY: -4, head: spiral });
  s += popIn(t, 4.95, 760, 560, TX('?', 760, 640, 230, P.gold, { outline: 1 }));
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s3(t) { // 5.66–7.08 Also rechnen wir nach: calculator
  const taps = [5.9, 6.06, 6.24, 6.42, 6.6];
  const keys = [[2, 3], [3, 0], [2, 3], [0, 3], [2, 1]]; // 0 , 1 × 2 positions (col,row)
  let tapIdx = -1; for (let i = 0; i < taps.length; i++) if (t >= taps[i] - .08) tapIdx = i;
  const txt = ['', '0', '0,', '0,1', '0,1 ×', '0,1 × 2'][tapIdx + 1];
  const enter = eout(prog(t, 5.66, 5.9));
  const by = lerp(1500, 0, enter);
  let k = '';
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    const x = 370 + c * 92, y = 800 + r * 92;
    let hl = 0; for (let i = 0; i < taps.length; i++) if (keys[i][0] === c && keys[i][1] === r) hl = Math.max(hl, 1 - prog(t, taps[i], taps[i] + .25) * (t >= taps[i] ? 1 : 0) - (t < taps[i] ? 1 : 0));
    k += `<rect x="${x}" y="${y}" width="74" height="74" rx="14" fill="${hl > 0 ? P.gold : P.face}" fill-opacity="${hl > 0 ? .35 * hl : 1}" stroke="${hl > 0 ? P.gold : P.lav}" stroke-width="2.5"/>`;
  }
  // finger: tip goes to the current/next key
  const ni = Math.min(taps.length - 1, Math.max(0, tapIdx + (t > (taps[Math.max(0, tapIdx)] || 0) + .06 ? 1 : 0)));
  const tk = keys[ni], kx = 370 + tk[0] * 92 + 37, ky = 800 + tk[1] * 92 + 37;
  let press = 0; for (const tt of taps) press = Math.max(press, Math.sin(prog(t, tt - .08, tt + .06) * Math.PI));
  const fxx = kx + 30 - 18 * press, fyy = ky + 30 - 18 * press;
  const fin = `<path d="M 1100 1500 Q ${fxx + 160} ${fyy + 180} ${fxx} ${fyy}" fill="none" stroke="${P.w}" stroke-width="5" stroke-linecap="round"/><circle cx="${fxx}" cy="${fyy}" r="12" fill="${P.face}" stroke="${P.w}" stroke-width="4"/>`;
  let s = bg(540, 860, 760);
  s += `<g transform="translate(0 ${by})"><rect x="330" y="540" width="420" height="680" rx="36" fill="${P.face}" stroke="${P.w}" stroke-width="4"/>
    <rect x="370" y="590" width="340" height="170" rx="16" fill="${P.bg}" stroke="${P.cyan}" stroke-width="3"/>
    ${TX(txt + (Math.floor(t * 4) % 2 ? '|' : ''), 690, 710, 76, P.cyan, { a: 'end', w: 700 })}${k}</g>`;
  s += enter >= 1 ? fin : '';
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s4(t) { // 7.08–10.36 0,1 mm
  const slide = eout(prog(t, 7.08, 7.5)), rot = eio(prog(t, 7.6, 8.3));
  const sx = lerp(-400, 540, slide);
  const sh = lerp(420, 8, rot), skew = lerp(120, 0, rot);
  const cy = 760;
  let s = bg(540, 820, 800);
  s += `<polygon points="${sx - 300 + skew},${cy - sh / 2} ${sx + 300 + skew},${cy - sh / 2} ${sx + 300 - skew},${cy + sh / 2} ${sx - 300 - skew},${cy + sh / 2}" fill="${P.face}" stroke="${P.w}" stroke-width="3"/>`;
  // ruler
  const rp = eout(prog(t, 7.9, 8.4));
  if (rp > 0) {
    let tk = '';
    for (let i = 0; i <= 60; i++) { const x = 240 + i * 10; if (x > 240 + 600 * rp) break; tk += `<line x1="${x}" y1="${cy + 24}" x2="${x}" y2="${cy + 24 + (i % 10 ? (i % 5 ? 16 : 26) : 40)}" stroke="${P.lav}" stroke-width="2"/>`; }
    s += `<rect x="230" y="${cy + 14}" width="${620 * rp}" height="90" rx="6" fill="none" stroke="${P.dim}" stroke-width="2.5"/>${tk}`;
  }
  // magnifier on the sheet edge
  const mg = back(prog(t, 8.46, 8.85));
  if (mg > 0) {
    const mx = 540, my = 1060, R = 250 * mg;
    let inner = '';
    for (let i = -3; i <= 3; i++) { const x = mx + i * 60; inner += `<line x1="${x}" y1="${my + 30}" x2="${x}" y2="${my + 30 + (i === 0 || Math.abs(i) === 3 ? 120 : 60)}" stroke="${P.lav}" stroke-width="3"/>`; }
    const hl = prog(t, 8.8, 9.2);
    inner += `<rect x="${mx}" y="${my - 40}" width="60" height="44" fill="${P.gold}" fill-opacity="${.25 * hl}" stroke="${P.gold}" stroke-width="3" opacity="${hl}"/>`;
    inner += `<line x1="${mx - 260}" y1="${my - 40}" x2="${mx + 260}" y2="${my - 40}" stroke="${P.w}" stroke-width="3"/><line x1="${mx - 260}" y1="${my + 4}" x2="${mx + 260}" y2="${my + 4}" stroke="${P.w}" stroke-width="3"/>`;
    s += `<line x1="540" y1="${cy + 4}" x2="${mx}" y2="${my - R}" stroke="${P.dim}" stroke-width="2" stroke-dasharray="6 8"/>
      <g transform="translate(${mx} ${my}) scale(${mg}) translate(${-mx} ${-my})"><clipPath id="s4c"><circle cx="${mx}" cy="${my}" r="250"/></clipPath>
      <circle cx="${mx}" cy="${my}" r="250" fill="${P.bg}"/><g clip-path="url(#s4c)">${inner}</g>
      <circle cx="${mx}" cy="${my}" r="250" fill="none" stroke="${P.w}" stroke-width="5"/><line x1="${mx + 180}" y1="${my + 180}" x2="${mx + 300}" y2="${my + 300}" stroke="${P.w}" stroke-width="12" stroke-linecap="round"/></g>`;
    s += `<path d="M ${mx + 80} ${my - 18} L ${mx + 150} ${my - 18}" stroke="${P.gold}" stroke-width="3" opacity="${hl}"/>`;
  }
  s += bigNum(t, 8.70, '0,1 mm', 540, 470, 170, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s5(t) { // 10.36–12.5 Einmal falten: zwei Lagen (top view -> edge)
  const p1 = eio(prog(t, 10.6, 11.15));
  const ed = eio(prog(t, 11.2, 11.5));
  let s = bg(540, 900, 800) + hud(prog(t, 11.1, 11.12));
  const cy = 860;
  if (ed <= 0) s += sheetTop(540, cy, 520, 720, p1, 0);
  else {
    // the folded half tilts to an edge view, then the camera pushes in on its two layers
    const h = lerp(720, 30, ed), sp = 1 + 1.6 * eout(prog(t, 11.45, 11.8));
    const lines = ed >= 1 ? `<line x1="410" y1="${cy - 7}" x2="670" y2="${cy - 7}" stroke="${P.w}" stroke-width="2.5"/><line x1="410" y1="${cy + 7}" x2="670" y2="${cy + 7}" stroke="${P.w}" stroke-width="2.5"/>` : '';
    s += `<g transform="translate(540 ${cy}) scale(${sp}) translate(-540 ${-cy})"><rect x="410" y="${cy - h / 2}" width="260" height="${h}" fill="${P.face}" stroke="${ed >= 1 ? P.dim : P.w}" stroke-width="${ed >= 1 ? 1.5 : 3}"/>${lines}</g>`;
  }
  s += burst(t, 11.5, 540, cy, 10, 160, P.lav, .5);
  s += bigNum(t, 11.5, '2', 540, 560, 200, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s6(t) { // 12.5–14.42 Noch einmal: vier Lagen (side view)
  const p = eio(prog(t, 12.62, 13.4));
  const land = prog(t, 13.4, 13.6);
  const dx = lerp(0, 175, eio(prog(t, 13.45, 13.9)));
  let s = bg(540, 900, 800) + hud(1 + (t >= 13.38 ? 1 : 0));
  s += `<g transform="translate(${dx} ${-12 * Math.sin(land * Math.PI)})">${sideFold(190, 890, 980, 2, 28, p)}</g>`;
  s += `<path d="M ${540 + dx} 1010 l 0 30" stroke="${P.dim}" stroke-width="2"/>`;
  s += ringPulse(t, 13.4, 365 + dx, 940, 160, P.lav);
  // layer count marks beside the stack
  if (t > 13.5) for (let i = 0; i < 4; i++) s += popIn(t, 13.52 + i * .06, 560 + dx, 980 - i * 28, `<circle cx="${570 + dx}" cy="${980 - i * 28}" r="7" fill="${P.gold}"/>`, .2);
  s += bigNum(t, 13.52, '4', 540, 620, 220, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s7(t) { // 14.42–16.48 Jedes Falten verdoppelt die Dicke: doubling bars
  let s = bg(540, 860, 820);
  const base = 1250;
  s += `<line x1="100" y1="${base}" x2="980" y2="${base}" stroke="${P.dim}" stroke-width="3"/>`;
  for (let k = 0; k < 6; k++) {
    const t0 = 14.5 + k * .26;
    const g = eout(prog(t, t0, t0 + .3));
    if (g <= 0) continue;
    const h = 26 * Math.pow(2, k) * g, x = 150 + k * 140, w = 90;
    let ln = ''; const n = Math.min(32, Math.pow(2, k));
    for (let i = 1; i < n && n <= 16; i++) ln += `<line x1="${x + 6}" y1="${(base - h * i / n).toFixed(1)}" x2="${x + w - 6}" y2="${(base - h * i / n).toFixed(1)}" stroke="${P.lav}" stroke-width="1.5" opacity=".5"/>`;
    s += `<rect x="${x}" y="${(base - h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" fill="${P.lav}" fill-opacity=".12" stroke="${P.w}" stroke-width="3"/>${ln}`;
    if (k > 0) {
      const ap = prog(t, Math.max(15.0, t0 + .15), Math.max(15.0, t0 + .15) + .25);
      if (ap > 0) {
        const x0 = x - 140 + 45, y0 = base - 26 * Math.pow(2, k - 1) - 20, x1 = x + 45, y1 = base - 26 * Math.pow(2, k) - 20;
        s += `<path d="M ${x0} ${y0} Q ${(x0 + x1) / 2} ${Math.min(y0, y1) - 90} ${x1} ${y1}" fill="none" stroke="${P.gold}" stroke-width="3" stroke-dasharray="${400 * ap} 400"/>`;
      }
    }
  }
  s += bigNum(t, 15.0, '×2', 330, 520, 200, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s8(t) { // 16.48–19.8 7 folds = notebook, 12,8 mm
  const n = lerp(2, 7, eio(prog(t, 16.55, 17.6)));
  const base = 1260, pxmm = 40; // 12.8 mm -> 512 px
  const hmm = .1 * Math.pow(2, n), h = hmm * pxmm;
  let s = bg(540, 900, 820) + hud(n);
  s += `<line x1="120" y1="${base}" x2="960" y2="${base}" stroke="${P.dim}" stroke-width="3"/>`;
  s += column(330, base, base - h, 300, t);
  // notebook draws itself at "Notizbuch"
  const nb = prog(t, 18.45, 19.0), nh = 12.8 * pxmm;
  if (nb > 0) {
    const L = 2 * (300 + nh) * nb;
    let rings = ''; for (let i = 0; i < 9; i++) rings += `<circle cx="${640 + 14}" cy="${base - nh + 30 + i * 52}" r="12" fill="none" stroke="${P.lav}" stroke-width="2.5" opacity="${prog(t, 18.8 + i * .03, 19.0 + i * .03)}"/>`;
    s += `<rect x="640" y="${base - nh}" width="300" height="${nh}" rx="14" fill="${P.face}" fill-opacity="${nb}" stroke="${P.cyan}" stroke-width="3.5" stroke-dasharray="${L} 4000"/>${rings}`;
    const lv = prog(t, 18.7, 18.95);
    s += `<line x1="200" y1="${base - nh}" x2="${200 + 760 * lv}" y2="${base - nh}" stroke="${P.gold}" stroke-width="2.5" stroke-dasharray="10 10"/>`;
  }
  s += ringPulse(t, 18.75, 330, base - nh, 160);
  s += countNum(t, 16.7, 17.6, 12.8, 1, ' mm', 540, 520, 150);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s9(t) { // 19.8–22.04 10 folds = 10 cm (ruler)
  const n = lerp(7, 10, eio(prog(t, 19.9, 20.75)));
  const base = 1300, pxcm = 72;
  const h = .01 * Math.pow(2, n) * pxcm;
  let s = bg(540, 880, 820) + hud(n);
  let tk = '';
  for (let i = 0; i <= 100; i++) {
    const y = base - i * pxcm / 10, big = i % 10 === 0;
    const near = Math.abs(base - h - y) < 10 ? 1 : 0;
    tk += `<line x1="300" y1="${y.toFixed(1)}" x2="${300 - (big ? 50 : i % 5 ? 18 : 30)}" y2="${y.toFixed(1)}" stroke="${near ? P.gold : P.lav}" stroke-width="${big ? 3 : 1.5}"/>`;
    if (big && i > 0) tk += TX(String(i / 10), 205, y + 12, 34, P.dim, { w: 700, a: 'end' });
  }
  s += `<line x1="300" y1="${base}" x2="300" y2="${base - 10 * pxcm}" stroke="${P.lav}" stroke-width="3"/>${tk}`;
  s += `<line x1="250" y1="${base}" x2="900" y2="${base}" stroke="${P.dim}" stroke-width="3"/>`;
  s += column(560, base, base - h, 280, t);
  s += `<line x1="300" y1="${base - h}" x2="420" y2="${base - h}" stroke="${P.gold}" stroke-width="2" stroke-dasharray="8 8"/>`;
  s += ringPulse(t, 20.75, 560, base - h, 200);
  s += bigNum(t, 20.62, '10 cm', 720, 470, 150, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function house(x, y, w, h) {
  const r = h * .35;
  return `<polygon points="${x},${y} ${x + w},${y} ${x + w},${y - h + r} ${x + w / 2},${y - h} ${x},${y - h + r}" fill="${P.face}" stroke="${P.w}" stroke-width="3.5" stroke-linejoin="round"/>
   <rect x="${x + w * .18}" y="${y - h * .52}" width="${w * .2}" height="${w * .2}" fill="${P.gold}" fill-opacity=".25" stroke="${P.lav}" stroke-width="2.5"/><rect x="${x + w * .6}" y="${y - h * .52}" width="${w * .2}" height="${w * .2}" fill="none" stroke="${P.lav}" stroke-width="2.5"/>
   <rect x="${x + w * .42}" y="${y - h * .26}" width="${w * .18}" height="${h * .26}" fill="none" stroke="${P.lav}" stroke-width="2.5"/>
   <rect x="${x + w * .66}" y="${y - h * .98}" width="${w * .1}" height="${h * .22}" fill="${P.face}" stroke="${P.w}" stroke-width="3"/>`;
}
function s10(t) { // 22.04–24.94 17 folds = 13 m > house
  const n = lerp(10, 17, eio(prog(t, 22.1, 23.95)));
  const base = 1300, pxm = 62;
  const h = .0001 * Math.pow(2, n) * pxm;
  let s = bg(560, 860, 860) + starsF(t, 18, 21, 0, 600, .5) + hud(n);
  s += `<line x1="60" y1="${base}" x2="1020" y2="${base}" stroke="${P.dim}" stroke-width="3"/>`;
  const hh = 9.5 * pxm;
  s += house(560, base, 330, hh);
  // tree
  s += `<line x1="960" y1="${base}" x2="960" y2="${base - 150}" stroke="${P.lav}" stroke-width="3"/><circle cx="960" cy="${base - 200}" r="70" fill="none" stroke="${P.lav}" stroke-width="3"/>`;
  const pass = t > 23.92;
  const lookY = -cl((base - h - (base - 220)) / -60, -8, 0) - 4;
  s += stick(470, base, .42, { look: -3, lookY: Math.max(-6, lookY), aR: pass ? 150 : 25, bR: pass ? 20 : 0, mouth: pass ? 'o' : '', lean: pass ? -4 : 0 });
  s += column(300, base, base - h, 70, t);
  s += `<line x1="300" y1="${base - hh}" x2="725" y2="${base - hh}" stroke="${P.gold}" stroke-width="2" stroke-dasharray="8 8" opacity="${prog(t, 23.6, 23.9)}"/>`;
  s += ringPulse(t, 23.92, 725, base - hh, 170) + burst(t, 23.92, 300, base - hh, 10, 120, P.gold, .6);
  s += bigNum(t, 22.18, '13 m', 300, 380, 150, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s11(t) { // 24.94–29.38 27 folds = 13 km > Everest
  const n = lerp(17, 27, eio(prog(t, 26.0, 28.45)));
  const base = 1300, pxkm = 66;
  const h = .0000001 * Math.pow(2, n) * pxkm;
  const ev = 8.85 * pxkm;
  let s = bg(520, 820, 900) + starsF(t, 30, 33, 0, 700, .6) + hud(n);
  const draw = prog(t, 24.95, 25.9);
  const ridge1 = `M -20 ${base} L 120 ${base - 260} L 230 ${base - 180} L 380 ${base - 430} L 470 ${base - 330} L 600 ${base - ev} L 700 ${base - 420} L 790 ${base - 500} L 900 ${base - 300} L 1100 ${base - 380}`;
  const ridge2 = `M -20 ${base - 120} L 160 ${base - 160} L 300 ${base - 100} L 520 ${base - 240} L 760 ${base - 150} L 1100 ${base - 230}`;
  s += `<path d="${ridge2}" fill="none" stroke="${P.dim}" stroke-width="2.5" stroke-dasharray="${2400 * draw} 3000"/>`;
  s += `<path d="${ridge1} L 1100 ${base} Z" fill="${P.face}" fill-opacity="${draw}" stroke="none"/><path d="${ridge1}" fill="none" stroke="${P.w}" stroke-width="3.5" stroke-linejoin="round" stroke-dasharray="${3000 * draw} 4000"/>`;
  // snow cap + flag
  if (draw > .6) s += `<path d="M 560 ${base - ev + 70} L 600 ${base - ev} L 645 ${base - ev + 60}" fill="none" stroke="${P.cyan}" stroke-width="3"/><line x1="600" y1="${base - ev}" x2="600" y2="${base - ev - 50}" stroke="${P.w}" stroke-width="2.5"/><path d="M 600 ${base - ev - 50} L ${640 + 5 * Math.sin(t * 8)} ${base - ev - 40} L 600 ${base - ev - 30}" fill="${P.red}" fill-opacity=".5" stroke="${P.red}" stroke-width="2"/>`;
  // plane at ~10 km crossing
  const px = lerp(-120, 1200, prog(t, 25.2, 29.3)), py = base - 10 * pxkm;
  s += `<g transform="translate(${px} ${py})"><path d="M -40 0 L 40 0 M 10 0 L -10 -26 M 10 0 L -10 26 M -38 0 L -46 -14" fill="none" stroke="${P.lav}" stroke-width="3" stroke-linecap="round"/><line x1="-60" y1="0" x2="-300" y2="0" stroke="${P.lav}" stroke-width="1.5" stroke-dasharray="6 10" opacity=".5"/></g>`;
  // cloud streaks
  for (let i = 0; i < 4; i++) { const cx = ((t * 40 + i * 300) % 1300) - 110, cy = base - 260 - i * 40; s += `<path d="M ${cx} ${cy} q 40 -26 80 0 q 40 -18 70 0" fill="none" stroke="${P.dim}" stroke-width="2" opacity=".6"/>`; }
  s += column(820, base, base - h, 46, t);
  const lv = prog(t, 28.1, 28.38);
  s += `<line x1="600" y1="${base - ev}" x2="${600 + 220 * lv}" y2="${base - ev}" stroke="${P.gold}" stroke-width="2" stroke-dasharray="8 8"/>`;
  s += ringPulse(t, 28.38, 820, base - ev, 180) + burst(t, 28.38, 820, base - ev, 12, 140);
  s += bigNum(t, 26.02, '13 km', 330, 420, 150, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s12(t) { // 29.38–32.46 30 folds = 107 km, edge of space
  const n = lerp(27, 30, eio(prog(t, 29.45, 30.92)));
  const base = 1300, pxkm = 7;
  const h = .0000001 * Math.pow(2, n) * pxkm;
  const ky = base - 100 * pxkm;
  const hitp = prog(t, 30.92, 31.6);
  let s = bg(540, 980, 900) + starsF(t, 70, 51, 0, ky, prog(t, 30.9, 31.5)) + hud(n);
  s += `<defs><linearGradient id="s12a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${P.cyan}" stop-opacity=".3"/><stop offset="1" stop-color="${P.cyan}" stop-opacity="0"/></linearGradient></defs>`;
  s += `<path d="M -100 ${base + 60} Q 540 ${base - 60} 1180 ${base + 60} L 1180 ${base - 380} Q 540 ${base - 500} -100 ${base - 380} Z" fill="url(#s12a)"/>`;
  s += `<path d="M -100 ${base + 60} Q 540 ${base - 60} 1180 ${base + 60}" fill="none" stroke="${P.cyan}" stroke-width="4"/>`;
  // Kármán line with ripple on contact
  let d = `M -20 ${ky}`;
  for (let x = 0; x <= 1100; x += 20) { const dd = Math.abs(x - 540); const rip = hitp > 0 && hitp < 1 ? 26 * Math.exp(-dd / 260) * Math.sin(dd / 40 - hitp * 18) * (1 - hitp) : 0; d += ` L ${x} ${(ky + rip).toFixed(1)}`; }
  s += `<path d="${d}" fill="none" stroke="${P.lav}" stroke-width="3" stroke-dasharray="14 12"/>`;
  s += TX('100 km', 960, ky - 18, 34, P.lav, { w: 700, a: 'end' });
  s += column(540, base, base - h, 30, t);
  s += ringPulse(t, 30.92, 540, ky, 240, P.cyan) + burst(t, 30.92, 540, ky, 16, 200, P.w);
  s += countNum(t, 29.5, 30.6, 107, 0, ' km', 540, 420, 160);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function chart(t, nCur, nTop, o = {}) {
  const x0 = 140, x1 = 940, yb = o.yb || 1250, H = o.H || 870;
  const X = n => x0 + n / 42 * (x1 - x0), Y = n => yb - H * Math.pow(2, n - nTop);
  let pts = '', last = [X(0), Y(0)];
  for (let n = 0; n <= nCur + 1e-6; n += .25) { const y = Math.max(-400, Y(n)); pts += `${X(n).toFixed(1)},${y.toFixed(1)} `; last = [X(n), y]; }
  const yE = Math.max(-400, Y(nCur)); pts += `${X(nCur).toFixed(1)},${yE.toFixed(1)}`; last = [X(nCur), yE];
  let s = `<line x1="${x0}" y1="${yb}" x2="${x1 + 20}" y2="${yb}" stroke="${P.dim}" stroke-width="3"/><line x1="${x0}" y1="${yb}" x2="${x0}" y2="${yb - H - 40}" stroke="${P.dim}" stroke-width="3"/>`;
  for (let k = 0; k <= 42; k += 6) s += `<line x1="${X(k)}" y1="${yb}" x2="${X(k)}" y2="${yb + 14}" stroke="${P.dim}" stroke-width="2"/>` + TX(String(k), X(k), yb + 52, 30, P.dim, { w: 700 });
  s += `<polyline points="${pts}" fill="none" stroke="${P.gold}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
  return { s, head: last };
}
function s13(t) { // 32.46–34.8 und dann geht es erst richtig los
  const nCur = t < 33.64 ? lerp(0, 30, eio(prog(t, 32.5, 33.5))) : lerp(30, 39, ein(prog(t, 33.64, 34.1)));
  const c = chart(t, nCur, 36);
  const sh = t > 34.04 && t < 34.6 ? 14 * Math.exp(-(t - 34.04) * 7) : 0;
  let s = bg(540, 900, 860) + c.s;
  if (c.head[1] > -50) s += `<circle cx="${c.head[0]}" cy="${c.head[1]}" r="12" fill="${P.gold}"/>`;
  s += burst(t, 34.04, 820, 200, 18, 260, P.gold, .7);
  s += hud(nCur);
  return `<g transform="translate(${sh * Math.sin(t * 90)} ${sh * Math.cos(t * 75)})" filter="url(#gl30)">${s}</g>`;
}
// 34.8–50.3 continuous true-scale zoom-out: Earth + column + Moon
function nAt(t) {
  if (t < 35.9) return lerp(30, 35, eio(prog(t, 34.85, 35.9)));
  if (t < 41.1) return lerp(35, 40, eio(prog(t, 38.0, 39.7)));
  return lerp(40, 42, eio(prog(t, 41.2, 42.9)));
}
function sSpace(t) {
  const n = nAt(t);
  const Lkm = 1e-7 * Math.pow(2, n);
  const k = Math.min(520 / 6371, 1020 / Lkm); // px per km
  const r = 6371 * k, ex = 680, top = 1300, ey = top + r;
  const col = Lkm * k;
  let s = bg(ex, 760, 900) + starsF(t, 70, 77, 0, 1400, 1) + hud(n);
  // Earth
  const merid = t * .6;
  let mer = '';
  if (r > 40) for (let i = 0; i < 4; i++) { const a = Math.cos(merid + i * Math.PI / 4); mer += `<ellipse cx="${ex}" cy="${ey}" rx="${Math.abs(r * a).toFixed(1)}" ry="${r}" fill="none" stroke="${P.cyan}" stroke-width="1.5" opacity=".35"/>`; }
  s += `<circle cx="${ex}" cy="${ey}" r="${r * 1.08}" fill="${P.cyan}" opacity=".07"/><circle cx="${ex}" cy="${ey}" r="${r}" fill="${P.face}" stroke="${P.cyan}" stroke-width="3.5"/>${mer}`;
  if (r > 40) s += `<ellipse cx="${ex}" cy="${ey}" rx="${r}" ry="${r * .25}" fill="none" stroke="${P.cyan}" stroke-width="1.5" opacity=".35"/>`;
  // Moon orbit (from 45.6)
  const mo = prog(t, 45.6, 46.3);
  const D = 384400 * k, moonY = ey - D;
  if (mo > 0) {
    const a0 = -Math.PI / 2 - .14;
    const am = lerp(a0 - .55, a0, eout(prog(t, 45.86, 47.0)));
    s += `<circle cx="${ex}" cy="${ey}" r="${D}" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="${(2 * Math.PI * D * mo * .2).toFixed(0)} 9000" transform="rotate(${-180 / Math.PI * .55 - 90 - 8} ${ex} ${ey})" opacity=".7"/>`;
    const mx = ex + D * Math.cos(am), my = ey + D * Math.sin(am);
    s += moonF(+mx.toFixed(1), +my.toFixed(1), 34, cl(mo * 2));
    // distance bracket Earth -> Moon
    const br = prog(t, 47.2, 47.8);
    if (br > 0) {
      const bx = 820, yTop = lerp(ey, my, br);
      s += `<line x1="${bx}" y1="${ey}" x2="${bx}" y2="${yTop}" stroke="${P.gold}" stroke-width="3"/><line x1="${bx - 14}" y1="${ey}" x2="${bx + 14}" y2="${ey}" stroke="${P.gold}" stroke-width="3"/><line x1="${bx - 14}" y1="${yTop}" x2="${bx + 14}" y2="${yTop}" stroke="${P.gold}" stroke-width="3"/>`;
      s += `<line x1="${mx + 40}" y1="${my}" x2="${bx}" y2="${my}" stroke="${P.gold}" stroke-width="2" stroke-dasharray="8 8" opacity="${br}"/>`;
    }
    // overshoot highlight
    const ov = prog(t, 49.2, 49.5);
    if (ov > 0) s += `<rect x="${ex - 22}" y="${top - col}" width="44" height="${(my - (top - col)).toFixed(1)}" fill="${P.gold}" fill-opacity="${.18 + .14 * Math.sin(t * 14)}" stroke="${P.gold}" stroke-width="3" opacity="${ov}"/>`;
  }
  s += column(ex, top - (r > 40 ? 0 : 0), top - col, r > 100 ? 40 : 18, t);
  // numbers
  if (t < 37.96) s += countNum(t, 35.9, 36.6, 3436, 0, ' km', 330, 470, 120);
  else if (t < 41.1) s += countNum(t, 39.2, 39.9, 109951, 0, ' km', 330, 470, 108);
  else if (t < 45.6) s += countNum(t, 42.84, 44.0, 439805, 0, ' km', 330, 470, 108);
  else {
    s += TX('439.805 km', ex + 40, top - col + 16, 44, P.gold, { a: 'start', w: 700, op: .8 });
    s += countNum(t, 47.2, 48.6, 384400, 0, ' km', 300, 980, 92, P.w);
  }
  s += ringPulse(t, 36.64, ex, top - col, 140) + ringPulse(t, 40.02, ex, top - col, 160) + ringPulse(t, 44.36, ex, top - col, 200) + burst(t, 44.36, ex, top - col, 14, 180);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s18(t) { // 50.3–52.66 Du wärst also schon vorbei
  const my = lerp(900, 1700, eio(prog(t, 50.35, 52.5)));
  let s = bg(540, 700, 900);
  // speed streaks (we are rising)
  for (let i = 0; i < 14; i++) { const x = hash(i + 3) * 1080, y = ((t * 900 + hash(i) * 1900) % 1900); s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 80}" stroke="${P.lav}" stroke-width="2" opacity=".35"/>`; }
  s += moonF(270, my, 170, 1);
  s += column(690, 2000, 940, 150, t);
  const wave = t > 51.5 ? Math.sin((t - 51.5) * 16) * 25 : 0;
  s += stick(690, 940, 1.15, { aL: t > 51.5 ? 150 + wave : 40, bL: t > 51.5 ? 10 : 20, aR: 30, look: -9, lookY: 6, mouth: t > 51.5 ? 'smile' : 'o', lean: 4, headTilt: -10 });
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s19(t) { // 52.66–54.46 Die Kraft der Verdopplung: one cell splits to 256
  const steps = Math.min(8, Math.max(0, Math.floor((t - 52.8) / .18) + 1));
  const fr = cl((t - 52.8 - (steps - 1) * .18) / .12);
  let cols = 1, rows = 1;
  for (let i = 0; i < steps; i++) if (i % 2 === 0) cols *= 2; else rows *= 2;
  const W = 820, H = 1050, x0 = 130, y0 = 300;
  let s = bg(540, 820, 860);
  const cw = W / cols, ch = H / rows;
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const gap = Math.min(10, cw * .12) * (steps ? fr : 1);
    s += `<rect x="${(x0 + c * cw + gap / 2).toFixed(1)}" y="${(y0 + r * ch + gap / 2).toFixed(1)}" width="${Math.max(1, cw - gap).toFixed(1)}" height="${Math.max(1, ch - gap).toFixed(1)}" fill="${P.lav}" fill-opacity="${(.08 + .1 * hash(c * 31 + r)).toFixed(2)}" stroke="${(c + r * 3) % 7 === 0 ? P.gold : P.w}" stroke-width="2"/>`;
  }
  s += bigNum(t, 53.04, '×2', 540, 900, 260, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function sCurve(t) { // 54.46–58.22 Am Anfang fast nichts / am Ende explodiert alles
  const nCur = t < 57.24 ? lerp(0, 34, prog(t, 54.5, 57.1)) : lerp(34, 42, eout(prog(t, 57.24, 57.6)));
  const c = chart(t, nCur, 42, { yb: 1220, H: 920 });
  const sh = t > 57.24 && t < 57.9 ? 14 * Math.exp(-(t - 57.24) * 6) : 0;
  let s = bg(540, 900, 860) + c.s;
  const [hx, hy] = c.head;
  if (t < 57.24) {
    const ph = t * 9;
    s += stick(hx - 6, hy - 4, .5, { walk: ph, aL: 20 + 10 * Math.sin(ph), aR: 20 - 10 * Math.sin(ph), look: 6, blink: Math.floor(t * 2) % 5 === 0, mouth: t > 55.6 && t < 56.3 ? 'o' : '' });
    if (t > 55.6 && t < 56.3) s += TX('z', hx + 40, hy - 170 - 30 * prog(t, 55.6, 56.3), 40, P.lav, { w: 700, op: 1 - prog(t, 56.0, 56.3) });
  } else {
    const fl = prog(t, 57.24, 58.2);
    s += `<circle cx="${hx}" cy="${hy}" r="12" fill="${P.gold}"/>`;
    const fx = lerp(800, 420, fl), fy = lerp(1150, 520, eout(fl)) + 900 * fl * fl * .4;
    s += `<g transform="rotate(${-540 * fl} ${fx} ${fy - 70})">${stick(fx, fy, .5, { aL: 160, aR: 160, mouth: 'o' })}</g>`;
  }
  s += burst(t, 57.24, 940, 300, 22, 320, P.gold, .9) + burst(t, 57.34, 940, 300, 14, 200, P.w, .7);
  return `<g transform="translate(${sh * Math.sin(t * 90)} ${sh * Math.cos(t * 75)})" filter="url(#gl30)">${s}</g>`;
}
function s22(t) { // 58.22–62.5 Der Haken: max. 7 folds by hand
  let s = bg(540, 900, 860);
  // hook drops and swings, then is pulled away
  const drop = back(prog(t, 58.3, 58.7)), away = ein(prog(t, 59.3, 59.6));
  if (away < 1) {
    const sw = 18 * ring(t, 58.6, 1.2, 2.2);
    const hy = lerp(-500, 0, drop) - 900 * away;
    s += `<g transform="translate(540 ${hy}) rotate(${sw} 0 0)"><line x1="0" y1="0" x2="0" y2="760" stroke="${P.lav}" stroke-width="2.5"/>
      <path d="M 0 760 L 0 900 A 70 70 0 1 1 -140 900 L -140 860 L -118 884" fill="none" stroke="${P.w}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  const on = prog(t, 59.4, 59.6);
  if (on > 0) {
    const fold = Math.min(7, Math.floor(prog(t, 59.9, 61.5) * 7 + 1e-6) + (t > 61.42 ? 1 : 0));
    const strain = t > 61.0 ? 1 : prog(t, 60.0, 61.0);
    const fail = prog(t, 61.74, 62.0);
    const jit = strain * 5 * Math.sin(t * 60);
    const wh = 30 + fold * 12, ww = 260 - fold * 8, wy = 1112;
    const sq = 1 - .12 * strain * (1 - fail) + .08 * Math.sin(fail * Math.PI);
    let wad = `<rect x="${540 - ww / 2}" y="${wy - wh / 2}" width="${ww}" height="${wh}" rx="${10 + fold * 4}" fill="${P.face}" stroke="${P.w}" stroke-width="3.5"/>`;
    for (let i = 1; i < fold + 2; i++) wad += `<line x1="${540 - ww / 2 + 14}" y1="${wy - wh / 2 + i * wh / (fold + 2)}" x2="${540 + ww / 2 - 14}" y2="${wy - wh / 2 + i * wh / (fold + 2)}" stroke="${P.lav}" stroke-width="1.5" opacity=".6"/>`;
    s += `<g opacity="${on}">${stick(540 + jit * .3, 1380, 1.6, { aL: 40, bL: 78, aR: 40, bR: 78, mouth: t > 61.74 ? 'o' : 'strain', headTilt: jit * .4, look: 0, lookY: 8 })}
      <g transform="translate(${540 + jit} ${wy}) scale(${sq} ${2 - sq}) translate(-540 ${-wy})">${wad}</g>`;
    // sweat drops
    for (let i = 0; i < 3; i++) { const p = ((t - 60.2 + i * .3) % .9) / .9; if (t > 60.2) s += `<path d="M ${640 + i * 26} ${1380 - 1.6 * 270 + p * 80} q 8 14 0 20 q -8 -6 0 -20" fill="none" stroke="${P.cyan}" stroke-width="2.5" opacity="${(1 - p) * strain}"/>`; }
    s += `</g>`;
    s += hud(fold, { red: t > 61.74 ? 7 : undefined, t });
    if (t > 61.74) s += popIn(t, 61.74, 540, 800, `<path d="M 470 730 L 610 870 M 610 730 L 470 870" stroke="${P.red}" stroke-width="10" stroke-linecap="round"/>`, .25);
  }
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s23(t) { // 62.5–67.02 giant paper rolls: a dozen folds
  let s = bg(540, 900, 860);
  const un = eio(prog(t, 62.6, 64.0));
  const rx = 190, ry = 900, R = lerp(150, 70, un);
  // roll with spiral
  let sp = `M ${rx} ${ry}`;
  for (let a = 0; a < Math.PI * 8; a += .3) { const rr = R * a / (Math.PI * 8); sp += ` L ${(rx + rr * Math.cos(a + t * 4 * (un < 1 ? 1 : 0))).toFixed(1)} ${(ry + rr * Math.sin(a + t * 4 * (un < 1 ? 1 : 0))).toFixed(1)}`; }
  const fk = cl((t - 64.4) / .26, 0, 6);
  const k = Math.floor(fk), p = fk - k;
  const L0 = 820 * un, m = Math.pow(2, k), Lk = L0 / m;
  const y0 = ry + R;
  // band: folded state k with fold progress p
  if (t < 64.4) {
    s += `<line x1="${rx}" y1="${y0}" x2="${rx + L0}" y2="${y0}" stroke="${P.w}" stroke-width="3.5" stroke-linecap="round"/>`;
  } else if (k < 6) {
    s += sideFold(rx, rx + Lk, y0, m, Math.max(2.2, 18 / Math.sqrt(m)), eio(p), P.w);
  } else {
    let ln = ''; const g = 18 / 8; for (let i = 0; i < 64; i++) ln += `<line x1="${rx}" y1="${(y0 - i * g).toFixed(1)}" x2="${rx + Lk}" y2="${(y0 - i * g).toFixed(1)}" stroke="${P.w}" stroke-width="1.6"/>`;
    s += ln;
  }
  s += `<path d="${sp}" fill="none" stroke="${P.lav}" stroke-width="3"/><circle cx="${rx}" cy="${ry}" r="${R}" fill="none" stroke="${P.w}" stroke-width="3.5"/>`;
  // three helpers pull the band, then cheer
  for (let i = 0; i < 3; i++) {
    const fx = t < 64.4 ? rx + L0 + 30 + i * 70 : lerp(rx + 820 + 30 + i * 70, 760 + i * 80, prog(t, 64.4, 64.9));
    const walking = t < 64.0;
    const cheer = t > 66.04;
    s += stick(Math.min(1000, fx), y0 + 6, .55, { walk: walking ? t * 10 + i : undefined, lean: walking ? 12 : 0, aL: cheer ? 160 : walking ? 70 : 20, bL: 10, aR: cheer ? 160 : 20, mouth: cheer ? 'smile' : '', look: walking ? -6 : -4 });
  }
  const cnt = t < 64.4 ? 0 : t < 66.04 ? Math.min(12, Math.floor(lerp(0, 12, prog(t, 64.4, 65.7)))) : 13;
  s += hud(cnt);
  s += ringPulse(t, 66.04, 540, 168, 260);
  s += bigNum(t, 66.04, '13×', 540, 560, 190, P.gold);
  return `<g filter="url(#gl30)">${s}</g>`;
}
function s24(t) { // 67.02–69.3 Wie oft schaffst du es? -> back to the first frame
  let s = bg(540, 820, 900) + starsF(t, 40, 3, 0, 1300, prog(t, 68.6, 69.3) * .3);
  const out = prog(t, 68.5, 69.1);
  s += moonF(540, 330, 105, .35 * prog(t, 68.4, 69.2));
  const enter = eout(prog(t, 67.02, 67.35));
  s += `<g transform="translate(540 1010) scale(${lerp(.6, 1, enter)}) rotate(${lerp(-12, 0, enter)}) translate(-540 -1010)">${sheetTop(540, 1010, 460, 650, 0, 0)}</g>`;
  if (out < 1) s += `<g opacity="${1 - out}">${popIn(t, 67.4, 830, 600, TX('?', 830, 700, 300, P.gold, { outline: 1 }))}${stick(lerp(170, -200, ein(out)), 1300, .9, { aR: 70, bR: 40, look: 8, mouth: 'smile', walk: out > 0 ? t * 10 : undefined })}</g>`;
  s += hud(0, { op: (1 - out) * (.5 + .5 * Math.sin(t * 8)) });
  return `<g filter="url(#gl30)">${s}</g>`;
}

const SHOTS = [[4.74, s1], [5.66, s2], [7.08, s3], [10.36, s4], [12.5, s5], [14.42, s6], [16.48, s7], [19.8, s8], [22.04, s9], [24.94, s10], [29.38, s11], [32.46, s12], [34.8, s13], [50.3, sSpace], [52.66, s18], [54.46, s19], [58.22, sCurve], [62.5, s22], [67.02, s23], [99, s24]];
function scene(t) {
  let i = 0;
  while (i < SHOTS.length - 1 && t >= SHOTS[i][0]) i++;
  let s = SHOTS[i][1](t);
  // quick dip through darkness on each cut
  let d = 0;
  for (let j = 0; j < SHOTS.length - 1; j++) d = Math.max(d, 1 - Math.abs(t - SHOTS[j][0]) / .12);
  if (d > 0) s += `<rect x="0" y="0" width="1080" height="1920" fill="${P.bg}" opacity="${(.85 * d).toFixed(2)}"/>`;
  return s;
}

const __style = {"dust": false, "vignette": true, "subtitle": "clean"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
