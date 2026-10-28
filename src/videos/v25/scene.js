// @ts-nocheck
// AUTO-GENERATED scene for v25. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v25 — 25 Pferde: Warum sechs Rennen nicht reichen. Ivory reasoning board, one simple horse chip icon.
const P = {
  bg: '#f4efe2', bg2: '#ebe4d2', bg3: '#e2d9c3', ink: '#24262c', ink2: '#6a6c72', grey: '#c9c2b1', chip: '#fffdf7',
  yel: '#f3c437', yelSh: '#d6a419', grn: '#3fae5c', grnSh: '#2c8a45', red: '#e0473a', redSh: '#b8352a',
  lane: '#e8dfc9', lane2: '#f0e9d7', gate: '#3a3d45'
};
const FONT = `font-family:'Inter';font-weight:900`;
const LET = 'ABCDE';
// original group (grid row) -> letter after race 6 (race 6 order: g1, g4, g0, g2, g3)
const LIDX = [2, 0, 3, 4, 1];
// grid column of the chip that finished rank r in group g
const PERM = [[2, 0, 4, 1, 3], [1, 3, 0, 4, 2], [4, 2, 1, 3, 0], [0, 4, 3, 2, 1], [3, 1, 2, 0, 4]];
const colX = c => 230 + 150 * c;
const rowY = r => 700 + 140 * r;
const laneY = i => 560 + 150 * i;

function T(s, x, y, size, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${fill}" opacity="${o.op ?? 1}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 10}" paint-order="stroke" stroke-linejoin="round"` : ''} style="${FONT};font-size:${size}px">${s}</text>`;
}
function S(cx, cy, s, inner) {
  if (s <= 0.001) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
}
const pp = (t, t0, d = .26) => back(prog(t, t0, t0 + d));
function slamS(t, t0) { // big -> 1 with a settle
  if (t < t0) return 0;
  const p = eout(prog(t, t0, t0 + .16));
  return lerp(1.9, 1, p) + .06 * ring(t, t0 + .16, 3.5, 8);
}
function shakeOf(t, hits) {
  let a = 0;
  for (const h of hits) if (t >= h && t < h + .5) a += 14 * Math.exp(-(t - h) * 9);
  return [a * Math.sin(t * 97), a * Math.cos(t * 83)];
}

function bgBoard(t, tone = 0) {
  let g = '';
  for (let i = 0; i < 12; i++) g += `<line x1="${i * 100 + 40}" y1="0" x2="${i * 100 + 40}" y2="1920" stroke="${P.bg3}" stroke-width="2" opacity=".55"/>`;
  for (let j = 0; j < 20; j++) g += `<line x1="0" y1="${j * 100 + 20}" x2="1080" y2="${j * 100 + 20}" stroke="${P.bg3}" stroke-width="2" opacity=".55"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${tone ? P.bg2 : P.bg}"/>${g}`;
}

// ---- the one horse icon (side view, facing right). ph = leg phase while running, null when standing
function horse(x, y, s, ph, col = P.ink) {
  const run = ph !== null && ph !== undefined;
  const leg = (lx, off) => {
    const a = run ? 26 * Math.sin(ph + off) : 0;
    return `<g transform="rotate(${a} ${lx} 6)"><rect x="${lx - 4}" y="4" width="8" height="32" rx="4" fill="${col}"/></g>`;
  };
  const tail = run ? 6 * Math.sin(ph * 1.3) : 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -34 -8 Q -50 ${-8 + tail} -54 ${16 + tail} Q -44 ${6 + tail} -36 2 Z" fill="${col}"/>
    ${leg(-27, 0)}${leg(-17, 2.4)}${leg(17, 3.1)}${leg(26, .7)}
    <ellipse cx="-4" cy="0" rx="34" ry="15" fill="${col}"/>
    <path d="M 12 -6 L 26 -34 L 38 -34 L 32 6 Z" fill="${col}"/>
    <path d="M 26 -38 Q 36 -45 44 -38 L 57 -22 Q 59 -15 52 -15 L 37 -22 Z" fill="${col}"/>
    <path d="M 29 -38 L 31 -50 L 37 -40 Z" fill="${col}"/>
    <circle cx="41" cy="-33" r="3" fill="${P.chip}"/>
  </g>`;
}

function shapeG(k, x, y, r, fill) {
  if (k === 0) return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  if (k === 1) return `<polygon points="${x},${y - r * 1.1} ${x + r * 1.05},${y + r * .8} ${x - r * 1.05},${y + r * .8}" fill="${fill}"/>`;
  if (k === 2) return `<rect x="${x - r * .9}" y="${y - r * .9}" width="${r * 1.8}" height="${r * 1.8}" rx="${r * .2}" fill="${fill}"/>`;
  if (k === 3) return `<polygon points="${x},${y - r * 1.2} ${x + r},${y} ${x},${y + r * 1.2} ${x - r},${y}" fill="${fill}"/>`;
  let pts = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .48 : r * 1.15; pts += `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)} `; }
  return `<polygon points="${pts}" fill="${fill}"/>`;
}

// chip: o.st 'n'|'cand'|'win'|'out'; o.code text; o.shape k (+ o.rank); o.q '?' label; o.ph leg phase; o.dash; o.glow
function chip(x, y, s, o = {}) {
  const st = o.st || 'n';
  const fill = st === 'cand' ? P.yel : st === 'win' ? P.grn : st === 'out' ? '#e4ddcc' : P.chip;
  const ink = st === 'out' ? '#a59e8f' : P.ink;
  const txt = st === 'win' ? '#ffffff' : ink;
  let label = '';
  if (o.q) label = T('?', 0, 50, 38, txt);
  else if (o.code) label = T(o.code, 0, 50, 36, txt);
  else if (o.shape !== undefined) {
    const rk = o.rank ? cl(o.rank, 0, 1) : 0;
    label = rk > 0 ? shapeG(o.shape, -18, 37, 12, txt) + S(18, 37, back(rk), T(o.rankN, 18, 50, 36, txt)) : shapeG(o.shape, 0, 37, 13, txt);
  }
  const bob = o.ph !== undefined && o.ph !== null ? -7 * Math.abs(Math.sin(o.ph)) : 0;
  const rot = o.rot || 0;
  return `<g transform="translate(${x} ${y + bob}) rotate(${rot}) scale(${s})" opacity="${o.op ?? 1}">
    ${o.glow ? `<rect x="-78" y="-76" width="156" height="152" rx="30" fill="none" stroke="${o.glowC || P.yel}" stroke-width="${10 * o.glow}" opacity="${o.glow}"/>` : ''}
    <rect x="-62" y="-54" width="124" height="118" rx="20" fill="#000" opacity="${st === 'out' ? .05 : .13}" transform="translate(0 8)"/>
    <rect x="-62" y="-60" width="124" height="120" rx="20" fill="${fill}" stroke="${ink}" stroke-width="5"${o.dash ? ' stroke-dasharray="14 9"' : ''}/>
    ${horse(0, -14, .92, o.ph, st === 'win' ? '#ffffff' : ink)}
    ${label}
  </g>`;
}

function badge(x, y, n, s, col = P.ink, tc = P.chip) {
  return S(x, y, s, `<circle cx="${x}" cy="${y}" r="27" fill="${col}" stroke="${P.chip}" stroke-width="5"/>${T(n, x, y + 12, 34, tc)}`);
}
function bigX(cx, cy, r, p, col = P.red, w = 26) {
  if (p <= 0) return '';
  const a = cl(p * 2), b = cl(p * 2 - 1);
  return `<path d="M ${cx - r} ${cy - r} L ${cx - r + 2 * r * a} ${cy - r + 2 * r * a}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
    ${b > 0 ? `<path d="M ${cx + r} ${cy - r} L ${cx + r - 2 * r * b} ${cy - r + 2 * r * b}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` : ''}`;
}
function check(cx, cy, r, p, col = P.grn) {
  if (p <= 0) return '';
  return `<path d="M ${cx - r} ${cy} L ${cx - r * .3} ${cy + r * .7} L ${cx + r} ${cy - r * .8}" stroke="${col}" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="${p} 1"/>`;
}

// counter pill (top-left)
function counterVal(t) {
  const ticks = [18.5, 19.04, 19.58, 20.12, 20.66, 25.0, 60.76];
  let n = 0, last = -9;
  for (const k of ticks) if (t >= k) { n++; last = k; }
  return [n, last];
}
function counter(t, show = 1) {
  if (show <= 0) return '';
  const [n, last] = counterVal(t);
  const b = 1 + .35 * Math.exp(-(t - last) * 7) * (t >= last ? 1 : 0);
  return S(175, 160, show, `<rect x="50" y="102" width="268" height="116" rx="30" fill="${P.ink}"/>
    ${T('RENNEN', 70, 175, 38, P.bg, { a: 'start' })}
    ${S(262, 160, b, T(n, 262, 190, 84, P.yel))}`);
}

// ---- race on 5 lanes. runners[i] = {o: chip opts, rank}; t0 start; dur = time of winner
function track(t, gateOpen, o = {}) {
  let lanes = '';
  for (let i = 0; i < 5; i++) {
    const y = laneY(i);
    lanes += `<rect x="40" y="${y - 72}" width="1000" height="144" fill="${i % 2 ? P.lane : P.lane2}"/>`;
    lanes += `<line x1="40" y1="${y + 72}" x2="1040" y2="${y + 72}" stroke="${P.ink}" stroke-width="4" stroke-dasharray="30 18" opacity=".35"/>`;
  }
  let chk = '';
  for (let j = 0; j < 38; j++) chk += `<rect x="${800 + (j % 2) * 16}" y="${488 + j * 20}" width="16" height="20" fill="${P.ink}"/>`;
  let gates = '';
  const g = cl(gateOpen);
  for (let i = 0; i < 5; i++) {
    const y = laneY(i), sl = o.slam ? o.slam[i] : 1;
    if (sl <= 0) continue;
    const dy = (1 - eout(sl)) * -260;
    gates += `<g transform="translate(0 ${dy})"><rect x="68" y="${y - 70}" width="22" height="140" fill="${P.gate}"/>
      <rect x="${200 + 40 * g}" y="${y - 70 - 120 * eio(g)}" width="14" height="140" rx="4" fill="${P.gate}" opacity="${1 - g}"/>
      <rect x="68" y="${y - 76}" width="148" height="14" rx="6" fill="${P.gate}"/>${T(i + 1, 142, y - 82, 26, P.ink2)}</g>`;
  }
  return `<rect x="40" y="474" width="1000" height="772" rx="10" fill="${P.lane}"/>${lanes}${chk}
    <rect x="40" y="474" width="1000" height="772" rx="10" fill="none" stroke="${P.ink}" stroke-width="6"/>${gates}`;
}
function runX(t, t0, win, rank) {
  const tf = t0 + win * (1 + .1 * rank);
  if (t <= t0) return [150, null, tf];
  if (t < tf) { const u = (t - t0) / (tf - t0); return [150 + 640 * (u * u * .45 + u * .55), (t - t0) * 24 + rank, tf]; }
  return [790 + 70 * (1 - Math.exp(-(t - tf) * 5)), t - tf < .35 ? (t - t0) * 24 + rank : null, tf];
}
function runners(t, t0, win, list, s = .9, badges = true) {
  let out = '', bd = '';
  list.forEach((r, i) => {
    const [x, ph, tf] = runX(t, t0, win, r.rank);
    const y = laneY(i);
    out += chip(x, y, s, Object.assign({}, r.o, { ph }));
    if (badges && t > tf) bd += badge(x + 58, y - 52, r.rank + 1, pp(t, tf, .2), r.rank === 0 ? P.ink : P.ink2);
  });
  return out + bd;
}

// ---- podium
const POD = [[540, 1060, 240], [300, 1140, 160], [780, 1190, 110]];
function podium(t, items, sh = 1) {
  let g = '';
  for (let k = 0; k < 3; k++) {
    const [x, top, h] = POD[k];
    g += `<rect x="${x - 115}" y="${top}" width="230" height="${1330 - top}" rx="10" fill="${k === 0 ? P.ink : P.gate}" opacity="${k === 0 ? 1 : .88}"/>
      ${T(k + 1, x, top + Math.min(130, (1330 - top) * .72), 96, k === 0 ? P.yel : P.bg)}`;
  }
  return `<rect x="120" y="1326" width="840" height="16" rx="8" fill="${P.ink}"/>${g}${items}`;
}
function slotQ(t, k, t0, wob = 1) {
  const [x, top] = POD[k];
  const s = pp(t, t0, .3);
  const r = wob * 7 * Math.sin(t * 5 + k);
  return S(x, top - 80, s, `<g transform="rotate(${r} ${x} ${top - 80})"><rect x="${x - 62}" y="${top - 140}" width="124" height="120" rx="20" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="14 9"/>${T('?', x, top - 50, 86, P.red)}</g>`);
}

// ---- the board (table of 25)
// o: sP sort progress per row g (fn), rP rename progress, rank shown fn(g), lab 'shape'|'letter', state fn(L,n,t)
function chipBoard(g, r, o, t) {
  const sP = o.sP ? o.sP(g) : 1, rP = o.rP ?? 1;
  const col = lerp(PERM[g][r], r, eio(sP));
  const row = lerp(g, LIDX[g], eio(rP));
  const L = LET[LIDX[g]];
  const lab = rP > .5 ? { code: L + (r + 1) } : { shape: g, rank: o.rank ? o.rank(g) : 0, rankN: r + 1 };
  const st = o.state ? o.state(L, r + 1, t) : { st: 'n' };
  return { x: colX(col), y: rowY(row) + (st.dy || 0), opt: Object.assign(lab, st) };
}
function board(t, o = {}) {
  let rows = '', chips = '', gts = '';
  const rP = o.rP ?? 1;
  for (let g = 0; g < 5; g++) {
    const row = lerp(g, LIDX[g], eio(rP));
    const y = rowY(row);
    const lp = o.labelP ? o.labelP(g) : 1;
    const lab = rP > .5
      ? `<circle cx="92" cy="${y}" r="40" fill="${P.ink}"/>${T(LET[LIDX[g]], 92, y + 19, 54, P.yel)}`
      : `<circle cx="92" cy="${y}" r="40" fill="none" stroke="${P.ink}" stroke-width="5"/>${shapeG(g, 92, y, 20, P.ink)}`;
    rows += S(92, y, back(lp), lab);
    if (o.frames) rows += `<rect x="${155}" y="${y - 70}" width="${750}" height="140" rx="26" fill="${P.bg2}" opacity="${o.frames}"/>`;
    for (let r = 0; r < 5; r++) {
      const c = chipBoard(g, r, o, t);
      chips += chip(c.x, c.y, o.cs || .95, c.opt);
    }
    if (o.gt) for (let c = 0; c < 4; c++) gts += T('›', colX(c) + 75, y + 18, 56, P.ink2, { op: cl(o.gt(g, c)) });
  }
  return rows + gts + chips;
}

// state of each named chip over the elimination act
const STRIKE = { D: [45.08, 0], E: [45.54, 0], C: [49.62, 2], B: [51.3, 3], A: [53.4, 4] };
const CAND = { C1: 50.04, B1: 51.56, B2: 52.32, A2: 54.08, A3: 54.66 };
function namedState(L, n, t) {
  const code = L + n;
  if (code === 'A1' && t >= 32.4) {
    const pul = Math.exp(-Math.max(0, t - 32.4) * 4) + (t > 55.32 ? Math.exp(-(t - 55.32) * 4) : 0);
    return { st: 'win', glow: cl(pul), glowC: P.grn };
  }
  const sk = STRIKE[L];
  if (sk && n > sk[1]) {
    const [t0, first] = sk;
    const tc = t0 + (n - first - 1) * .07;
    if (t >= tc + .05) return { st: 'out', dy: 4 * ring(t, tc + .05, 3, 6) };
  }
  if (CAND[code] !== undefined && t >= CAND[code]) return { st: 'cand', glow: cl(Math.exp(-(t - CAND[code]) * 4)) };
  return { st: 'n' };
}
function strikes(t) {
  let s = '';
  for (const L of 'DECBA') {
    const [t0, first] = STRIKE[L];
    const p = eio(prog(t, t0, t0 + .35));
    if (p <= 0) continue;
    const y = rowY(LET.indexOf(L));
    const x0 = colX(first) - 70, x1 = colX(4) + 70;
    s += `<line x1="${x0}" y1="${y}" x2="${lerp(x0, x1, p)}" y2="${y + 6}" stroke="${P.red}" stroke-width="16" stroke-linecap="round" opacity=".9"/>`;
  }
  return s;
}
// one chain of "faster than" at a time (top bar)
function chain(t, t0, codes, tX, tStep = .3) {
  if (t < t0) return '';
  const xs = [220, 420, 620, 820], y = 330;
  let s = `<rect x="110" y="235" width="860" height="190" rx="32" fill="${P.chip}" stroke="${P.ink}" stroke-width="5" opacity="${eout(prog(t, t0, t0 + .15))}"/>`;
  codes.forEach((c, i) => {
    const ti = t0 + i * tStep;
    const st = i === 3 ? (t > tX ? 'out' : 'n') : c === 'A1' ? 'win' : (CAND[c] !== undefined && t >= CAND[c] ? 'cand' : 'n');
    s += S(xs[i], y, pp(t, ti, .22), chip(xs[i], y, .95, { code: c, st }));
    if (i < 3) s += S(xs[i] + 100, y, pp(t, ti + .1, .2), T('&gt;', xs[i] + 100, y + 26, 76, P.ink));
  });
  s += bigX(820, 330, 52, prog(t, tX, tX + .22), P.red, 18);
  return s;
}

function marker(x, y, rot = -35) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-20" y="-200" width="40" height="150" rx="10" fill="${P.ink}"/>
    <rect x="-22" y="-60" width="44" height="40" rx="6" fill="${P.red}"/>
    <path d="M -14 -20 L 14 -20 L 6 0 L -6 0 Z" fill="${P.red}"/>
    <rect x="-8" y="-180" width="8" height="100" rx="4" fill="#ffffff" opacity=".25"/></g>`;
}
function stopwatch(cx, cy, s, hand) {
  return S(cx, cy, s, `<rect x="${cx - 18}" y="${cy - 150}" width="36" height="34" rx="6" fill="${P.ink}"/>
    <circle cx="${cx}" cy="${cy}" r="120" fill="${P.chip}" stroke="${P.ink}" stroke-width="14"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => { const a = i * Math.PI / 6; return `<line x1="${cx + 92 * Math.sin(a)}" y1="${cy - 92 * Math.cos(a)}" x2="${cx + 104 * Math.sin(a)}" y2="${cy - 104 * Math.cos(a)}" stroke="${P.ink}" stroke-width="6"/>`; }).join('')}
    <line x1="${cx}" y1="${cy}" x2="${cx + 84 * Math.sin(hand)}" y2="${cy - 84 * Math.cos(hand)}" stroke="${P.red}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="12" fill="${P.ink}"/>`);
}
function ticket(x, y, s, n, st = 'n', o = {}) { // a mini race card: 5 tiny lanes + number
  const fill = st === 'out' ? '#e4ddcc' : P.chip;
  let l = '';
  for (let i = 0; i < 4; i++) l += `<line x1="${x - 44}" y1="${y - 40 + i * 22}" x2="${x + 44}" y2="${y - 40 + i * 22}" stroke="${P.ink}" stroke-width="3" opacity=".35"/>`;
  return S(x, y, s, `<rect x="${x - 56}" y="${y - 78}" width="112" height="156" rx="16" fill="${fill}" stroke="${o.col || P.ink}" stroke-width="5"${o.dash ? ' stroke-dasharray="12 8"' : ''}/>${l}
    <rect x="${x + 30}" y="${y - 62}" width="6" height="90" fill="${P.ink}" opacity=".6"/>${T(n, x, y + 62, 40, o.col || P.ink)}`);
}

// ===================================================== shots
function sHook(t) { // 0 - 1.74
  let g = '';
  for (let i = 0; i < 25; i++) {
    const r = Math.floor(i / 5), c = i % 5;
    const ti = -1.0 + (hash(i * 3.1) * .45 + i * .03);
    const p = prog(t, ti, ti + .32);
    if (p <= 0) continue;
    const jolt = -40 * Math.sin(Math.PI * prog(t, .53 + r * .04, .78 + r * .04));
    const y = lerp(-180, rowY(r), eio(p)) + 14 * ring(t, ti + .32, 3, 7) + jolt;
    g += chip(colX(c), y, .95, { rot: (1 - p) * (hash(i) * 40 - 20) });
  }
  const s = slamS(t, .51);
  const zoomOut = 1 + .04 * prog(t, .6, 1.74);
  return `${bgBoard(t)}<g transform="translate(540 960) scale(${zoomOut}) translate(-540 -960)">${g}</g>
    ${s ? S(540, 420, s, T('25', 540, 500, 260, P.ink) + `<rect x="340" y="525" width="400" height="18" rx="9" fill="${P.yel}"/>`) : ''}`;
}
function sGates(t) { // 1.74 - 4.42
  const slam = [0, 1, 2, 3, 4].map(i => prog(t, 1.84 + i * .12, 1.84 + i * .12 + .16));
  let ch = '';
  for (let i = 0; i < 5; i++) { const p = pp(t, 2.0 + i * .1, .25); ch += S(150, laneY(i), p, chip(150, laneY(i), .82, { ph: t > 2.6 ? null : null })); }
  const sw = pp(t, 2.96, .3);
  const xp = prog(t, 3.42, 3.7);
  const fall = t > 3.9 ? ein(prog(t, 3.9, 4.42)) : 0;
  const fid = 1.5 * Math.sin(t * 40) * (t > 2.4 ? 1 : 0);
  return `${bgBoard(t)}<g transform="translate(${fid * 0} 120)">${track(t, 0, { slam })}${ch}</g>
    <g transform="translate(0 ${fall * 500}) rotate(${fall * 25} 690 320)">
    ${stopwatch(690, 320, sw * .95, t * 9)}
    ${S(690, 320, sw, bigX(690, 320, 120, xp, P.red, 30))}</g>`;
}
function sQuestion(t) { // 4.42 - 7.8
  const items = [];
  // three anonymous chips drop on the podium, then swap places on "richtigen Reihenfolge"
  const order = t < 6.22 ? [0, 1, 2] : t < 6.75 ? [1, 0, 2] : t < 7.25 ? [1, 2, 0] : [2, 1, 0];
  const sw = t < 6.22 ? 1 : t < 6.75 ? prog(t, 6.22, 6.5) : t < 7.25 ? prog(t, 6.75, 7.02) : prog(t, 7.25, 7.5);
  const prev = t < 6.22 ? [0, 1, 2] : t < 6.75 ? [0, 1, 2] : t < 7.25 ? [1, 0, 2] : [1, 2, 0];
  let g = '';
  for (let h = 0; h < 3; h++) {
    const kNow = order.indexOf(h), kPrev = prev.indexOf(h);
    const p = eio(sw);
    const x = lerp(POD[kPrev][0], POD[kNow][0], p), top = lerp(POD[kPrev][1], POD[kNow][1], p);
    const hop = -150 * Math.sin(p * Math.PI) * (kNow !== kPrev ? 1 : 0);
    const drop = prog(t, 5.2 + h * .12, 5.5 + h * .12);
    const y = lerp(-200, top - 72, eout(drop)) + hop + 10 * ring(t, 5.5 + h * .12, 3, 7);
    if (drop > 0) g += chip(x, y, .95, { q: true });
  }
  const bq = pp(t, 7.0, .3);
  const speed = t > 5.44 && t < 6.1 ? `<g opacity="${1 - prog(t, 5.8, 6.1)}">${[0, 1, 2].map(i => `<line x1="${180 + i * 30}" y1="${700 + i * 60}" x2="${380 + i * 30}" y2="${700 + i * 60}" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>`).join('')}</g>` : '';
  return `${bgBoard(t, 1)}${S(540, 700, pp(t, 4.45, .3), T('TOP 3', 540, 560, 120, P.ink) + `<rect x="370" y="585" width="340" height="16" rx="8" fill="${P.yel}"/>`)}
    ${S(540, 1200, pp(t, 4.5, .3), podium(t, g))}${speed}
    ${S(900, 760, bq, T('?', 900, 840, 220, P.red))}`;
}
function sSix(t) { // 7.8 - 10.88
  const s = slamS(t, 7.8);
  let tk = '';
  for (let i = 0; i < 6; i++) tk += ticket(205 + i * 134, 1060, pp(t, 8.16 + i * .1, .22) * .9, i + 1);
  const ck = eout(prog(t, 8.66, 8.95)) * (t < 9.48 ? 1 : 1 - prog(t, 9.48, 9.6));
  const strike = eio(prog(t, 10.0, 10.25));
  const [sx, sy] = shakeOf(t, [10.08]);
  const sag = t > 10.25 ? 8 * eout(prog(t, 10.25, 10.6)) : 0;
  return `${bgBoard(t)}<g transform="translate(${sx} ${sy})">
    ${s ? S(540, 600, s, `<g transform="rotate(${sag} 540 600)">${T('6', 300, 720, 340, P.ink)}${T('RENNEN', 450, 690, 96, P.ink, { a: 'start' })}</g>`) : ''}
    ${tk}
    ${check(840, 380, 80, ck)}
    ${S(840, 380, pp(t, 9.48, .25), `<circle cx="840" cy="380" r="88" fill="${P.red}"/>${T('!', 840, 418, 110, P.chip)}`)}
    ${strike > 0 ? `<path d="M 180 ${650} L ${180 + 760 * strike} ${560}" stroke="${P.red}" stroke-width="30" stroke-linecap="round"/>` : ''}
    ${S(540, 1300, pp(t, 10.3, .3), T('6 &lt; ?', 540, 1330, 90, P.red))}</g>`;
}
function sSame(t) { // 10.88 - 14.22: same horse, same speed every time
  const ly = [700, 1060];
  let g = '';
  const lane = (y, k) => `<rect x="60" y="${y - 90}" width="960" height="180" rx="16" fill="${k ? P.lane : P.lane2}" stroke="${P.ink}" stroke-width="5"/>
    <rect x="780" y="${y - 90}" width="16" height="180" fill="${P.ink}"/>${T(k ? 'II' : 'I', 110, y + 18, 50, P.ink2)}`;
  const run = (y, t0) => {
    const u = prog(t, t0, t0 + 1.25);
    const x = 190 + 590 * eio(u);
    return chip(x, y, 1.05, { shape: 4, ph: u > 0 && u < 1 ? (t - t0) * 24 : null });
  };
  // both runs leave together: identical speed (lines up at every moment)
  const t0 = 11.0, t1 = 12.95;
  const r1 = t < t1 ? run(ly[0], t0) : run(ly[0], t1), r2 = t < t1 ? run(ly[1], t0) : run(ly[1], t1);
  const u = t < t1 ? prog(t, t0, t0 + 1.25) : prog(t, t1, t1 + 1.25);
  const lx = 190 + 590 * eio(u);
  const eq = pp(t, 12.82, .25);
  g = `${lane(ly[0], 0)}${lane(ly[1], 1)}
    <line x1="${lx}" y1="${ly[0] + 70}" x2="${lx}" y2="${ly[1] - 70}" stroke="${P.grn}" stroke-width="8" stroke-dasharray="16 12"/>${r1}${r2}
    ${S(540, 880, eq, `<circle cx="${lx}" cy="880" r="56" fill="${P.grn}"/>${T('=', lx, 908, 90, P.chip)}`)}`;
  return `${bgBoard(t, 1)}${g}${S(540, 360, pp(t, 10.95, .3), `${T('1×', 380, 420, 150, P.ink)}${horse(680, 370, 2.4, null)}`)}`;
}
function sTie(t) { // 14.22 - 16.32: no ties
  const nudge = eout(prog(t, 15.3, 15.6)) * 120;
  const arrive = eout(prog(t, 14.22, 14.6));
  const xa = lerp(300, 700, arrive) + nudge + (t > 14.6 && t < 15.3 ? 3 * Math.sin(t * 30) : 0), xb = lerp(300, 700, arrive);
  const ph = t < 14.6 || (t > 15.3 && t < 15.6) ? t * 24 : null;
  const tie = t > 14.72 ? 1 : 0;
  const xp = prog(t, 14.9, 15.15);
  return `${bgBoard(t)}<rect x="60" y="500" width="960" height="760" rx="16" fill="${P.lane2}" stroke="${P.ink}" stroke-width="5"/>
    <line x1="60" y1="880" x2="1020" y2="880" stroke="${P.ink}" stroke-width="4" stroke-dasharray="30 18" opacity=".35"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(j => `<rect x="${770 + (j % 2) * 18}" y="${500 + j * 40}" width="18" height="40" fill="${P.ink}"/>`).join('')}
    ${chip(xa, 700, 1.4, { shape: 4, ph })}${chip(xb, 1060, 1.4, { shape: 0, ph })}
    ${tie ? S(540, 360, pp(t, 14.72, .2), `<rect x="330" y="270" width="420" height="180" rx="30" fill="${P.chip}" stroke="${P.ink}" stroke-width="6"/>${T('=', 540, 400, 150, P.ink)}${bigX(540, 360, 70, xp, P.red, 22)}`) : ''}
    ${badge(xa + 85, 620, 1, pp(t, 15.6, .2))}${badge(xb + 85, 980, 2, pp(t, 15.75, .2), P.ink2)}`;
}
function sGroups(t) { // 16.32 - 18.02: grid splits into 5 groups
  const sp = eio(prog(t, 17.04, 17.5));
  let g = '';
  for (let r = 0; r < 5; r++) {
    const y = lerp(720 + 125 * r, rowY(r), sp);
    const fr = pp(t, 17.3 + r * .1, .25);
    g += S(530, y, fr, `<rect x="160" y="${y - 72}" width="750" height="144" rx="28" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="18 12"/>`);
    g += S(92, y, fr, `<circle cx="92" cy="${y}" r="40" fill="none" stroke="${P.ink}" stroke-width="5"/>${shapeG(r, 92, y, 20, P.ink)}`);
    for (let c = 0; c < 5; c++) {
      const jig = t < 17.04 ? 4 * Math.sin(t * 6 + r + c * 2) : 0;
      g += chip(colX(c) + (r % 2 ? -1 : 1) * 30 * (1 - sp), y + jig, .95, fr > .5 ? { shape: r } : {});
    }
  }
  const five = pp(t, 17.04, .3) * (1 - prog(t, 17.7, 17.9));
  return `${bgBoard(t)}${g}${S(540, 420, five, T('5 × 5', 540, 470, 150, P.ink))}`;
}
function sMontage(t) { // 18.02 - 20.38: five group races
  const k = cl(Math.floor((t - 18.0) / .54), 0, 4);
  const t0 = 18.0 + k * .54;
  const list = [];
  for (let c = 0; c < 5; c++) { const rank = PERM[k].indexOf(c); list.push({ o: { shape: k }, rank }); }
  const flash = Math.exp(-(t - t0) * 14) * .6;
  return `${bgBoard(t)}${track(t, prog(t, t0, t0 + .08))}${runners(t, t0 + .02, .3, list, .85)}
    <rect x="0" y="0" width="1080" height="1920" fill="#ffffff" opacity="${flash}"/>
    ${S(540, 1360, 1, `<circle cx="540" cy="1350" r="44" fill="${P.ink}"/>${shapeG(k, 540, 1350, 22, P.bg)}`)}
    ${counter(t)}`;
}
function sFive(t) { // 20.38 - 21.86
  const s = slamS(t, 20.68);
  let tk = '';
  for (let i = 0; i < 5; i++) tk += ticket(235 + i * 152, 1080, pp(t, 20.4 + i * .06, .2), i + 1);
  return `${bgBoard(t, 1)}${tk}${s ? S(540, 640, s, T('5', 540, 760, 360, P.ink)) : ''}${counter(t)}`;
}
function sSorted(t) { // 21.86 - 24.86: inside each group the order is known
  const o = {
    rP: 0,
    sP: g => prog(t, 22.32 + g * .14, 22.75 + g * .14),
    rank: g => prog(t, 22.9 + g * .1, 23.1 + g * .1),
    gt: (g, c) => prog(t, 23.98 + c * .08, 24.15 + c * .08),
  };
  return `${bgBoard(t)}${board(t, o)}${counter(t)}`;
}
function sWinners(t) { // 24.86 - 27.5
  const hi = prog(t, 26.58, 26.9);
  const lift = eio(prog(t, 27.05, 27.5));
  let s = '';
  // dim other columns
  const o = { rP: 0, sP: () => 1, rank: () => 1, gt: () => 1 - hi };
  let base = board(t, o);
  let col = '';
  for (let g = 0; g < 5; g++) {
    const y = rowY(g);
    col += chip(colX(0), lerp(y, laneY(g) - 140 * lift * 0, lift) - 200 * lift, .95 + .15 * back(hi), { shape: g, rank: 1, rankN: 1, glow: hi * (1 - lift) });
  }
  const six = slamS(t, 25.0);
  return `${bgBoard(t)}<g opacity="${1 - .7 * hi}">${base}</g>
    <rect x="${colX(0) - 85}" y="610" width="170" height="${700 * hi}" rx="30" fill="${P.yel}" opacity="${.35 * hi}"/>${col}
    ${six ? S(780, 400, six * (1 - prog(t, 25.6, 25.9)), T('6', 780, 470, 220, P.ink)) : ''}${counter(t)}`;
}
function sRace6(t) { // 27.5 - 31.44
  const t0 = 27.62;
  // race-6 order: g1, g4, g0, g2, g3 -> ranks per lane g
  const rk = [2, 0, 3, 4, 1];
  const list = [0, 1, 2, 3, 4].map(g => ({ o: { shape: g, rank: 1, rankN: 1 }, rank: rk[g] }));
  let out = '', lt = '';
  const times = [29.44, 29.9, 30.24, 30.68, 31.08];
  list.forEach((r, i) => {
    const [x, ph] = runX(t, t0, .95, r.rank);
    const y = laneY(i);
    const flip = prog(t, times[r.rank] - .05, times[r.rank] + .12);
    const named = flip > .5;
    const o = named ? { code: LET[r.rank] + '1' } : r.o;
    const fx = flip > 0 && flip < 1 ? Math.max(.05, Math.abs(1 - 2 * flip)) : 1;
    out += `<g transform="translate(${x} ${y}) scale(${.85 * fx} .85) translate(${-x} ${-y})">${chip(x, y, 1, Object.assign({}, o, { ph }))}</g>`;
    const tf = t0 + .95 * (1 + .1 * r.rank);
    if (t > tf) lt += badge(x + 58, y - 52, r.rank + 1, pp(t, tf, .2), r.rank === 0 ? P.ink : P.ink2);
    if (t > times[r.rank]) lt += S(x - 150, y, pp(t, times[r.rank], .25), `<circle cx="${x - 150}" cy="${y}" r="44" fill="${P.ink}"/>${T(LET[r.rank], x - 150, y + 20, 56, P.yel)}`);
  });
  return `${bgBoard(t)}${track(t, prog(t, t0, t0 + .12))}${out}${lt}${counter(t)}`;
}
function sNamed(t) { // 31.44 - 34.36: rows re-sorted A..E, A1 is the fastest
  const o = { rP: prog(t, 31.5, 32.0), sP: () => 1, rank: () => 1, gt: () => 1, state: namedState };
  const p = prog(t, 32.9, 33.3);
  // proof arrows from A1: along its row and down its column
  const arr = p > 0 ? `<path d="M ${colX(0) + 70} ${rowY(0) - 80} L ${lerp(colX(0) + 70, colX(4), eout(p))} ${rowY(0) - 80}" stroke="${P.grn}" stroke-width="12" stroke-linecap="round"/>
    <path d="M ${colX(0) - 85} ${rowY(0) + 70} L ${colX(0) - 85} ${lerp(rowY(0) + 70, rowY(4), eout(p))}" stroke="${P.grn}" stroke-width="12" stroke-linecap="round"/>` : '';
  const crown = pp(t, 32.4, .3);
  return `${bgBoard(t)}${arr}${board(t, o)}
    ${S(colX(0), rowY(0) - 95, crown, `<path d="M ${colX(0) - 46} ${rowY(0) - 70} L ${colX(0) - 52} ${rowY(0) - 122} L ${colX(0) - 22} ${rowY(0) - 98} L ${colX(0)} ${rowY(0) - 132} L ${colX(0) + 22} ${rowY(0) - 98} L ${colX(0) + 52} ${rowY(0) - 122} L ${colX(0) + 46} ${rowY(0) - 70} Z" fill="${P.yel}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>`)}
    ${counter(t)}`;
}
function sOpen(t) { // 34.36 - 36.68
  const a1 = prog(t, 34.36, 34.66);
  const y1 = lerp(-150, POD[0][1] - 72, eout(a1)) + 10 * ring(t, 34.66, 3, 7);
  const items = `${chip(POD[0][0], y1, .95, { code: 'A1', st: 'win' })}${slotQ(t, 1, 34.86)}${slotQ(t, 2, 35.46)}`;
  const lockO = prog(t, 36.12, 36.4);
  return `${bgBoard(t, 1)}${podium(t, items)}
    ${S(540, 520, pp(t, 36.12, .25), `<rect x="470" y="500" width="140" height="110" rx="18" fill="${P.ink}"/><path d="M 495 500 L 495 ${450 - 30 * lockO} Q 495 ${400 - 30 * lockO} 540 ${400 - 30 * lockO} Q 585 ${400 - 30 * lockO} 585 ${450 - 30 * lockO} L 585 ${470 - 30 * lockO}" fill="none" stroke="${P.ink}" stroke-width="22"/>${T('?', 540, 585, 70, P.yel)}`)}
    ${counter(t)}`;
}
function sMaybe(t) { // 36.68 - 41.12: hypothetical A2, A3 faster than B1
  const zoom = 1.12;
  const fly = (k, t0, code, st) => {
    const p = prog(t, t0, t0 + .35);
    if (p <= 0) return '';
    const [x, top] = POD[k];
    const sx = 960, sy = 600;
    const xx = lerp(sx, x, eio(p)), yy = lerp(sy, top - 72, eio(p)) - 160 * Math.sin(p * Math.PI);
    return chip(xx, yy + 8 * ring(t, t0 + .35, 3, 7), .95, { code, st, dash: true });
  };
  // B1 tries to take slot 3 and is bumped off
  let b1 = '';
  if (t > 39.76) {
    const p = prog(t, 39.76, 40.1), q = prog(t, 40.32, 40.7);
    const [x3, top3] = POD[2];
    const x = lerp(1000, x3 + 40, eio(p)) + lerp(0, 120, eout(q)) - 20 * Math.sin(prog(t, 40.25, 40.4) * Math.PI);
    const y = lerp(top3 - 230, top3 - 260, eout(p)) + lerp(0, 330, eout(q)) - 120 * Math.sin(q * Math.PI);
    b1 = chip(x, y, .95, { code: 'B1', dash: true, rot: 25 * eout(q) });
  }
  const hits = [40.32];
  const [sx, sy] = shakeOf(t, hits);
  const items = `${chip(POD[0][0], POD[0][1] - 72, .95, { code: 'A1', st: 'win' })}
    ${t < 37.74 ? slotQ(t, 1, 34.0, 1) : ''}${t < 38.66 ? slotQ(t, 2, 34.0, 1) : ''}
    ${fly(1, 37.46, 'A2')}${fly(2, 38.36, 'A3')}`;
  const gt = pp(t, 39.02, .25);
  const qB = pp(t, 36.7, .3);
  return `${bgBoard(t, 1)}<g transform="translate(${sx} ${sy}) translate(540 1000) scale(${zoom}) translate(-540 -1000)">${podium(t, items)}${b1}</g>
    ${S(540, 380, qB, `<rect x="250" y="270" width="580" height="200" rx="34" fill="${P.chip}" stroke="${P.ink}" stroke-width="5" stroke-dasharray="20 12"/>
      ${T('A2', 350, 400, 72, P.ink)}${T('A3', 540, 400, 72, P.ink)}${S(700, 370, gt, T('&gt;', 645, 400, 72, P.red) + T('B1', 740, 400, 72, P.ink))}${T('?', 880, 430, 150, P.red)}`)}`;
}
function sLosers(t) { // 41.12 - 44.38: stop looking for winners, cross out sure losers
  const o = { rP: 1, sP: () => 1, rank: () => 1, gt: () => 1, state: namedState };
  const tr = pp(t, 41.76, .3), xp = prog(t, 41.96, 42.2);
  const m = prog(t, 42.9, 43.4);
  const mx = lerp(1200, 860, eio(m)) - (t > 43.4 ? 40 * Math.sin((t - 43.4) * 6) : 0), my = lerp(1400, rowY(4) - 30, eio(m)) + (t > 43.4 ? 12 * Math.sin((t - 43.4) * 9) : 0);
  const nerv = t > 43.8 ? 1 : 0;
  const trophy = `<path d="M 470 270 L 610 270 L 600 360 Q 590 410 540 410 Q 490 410 480 360 Z" fill="${P.yel}" stroke="${P.ink}" stroke-width="7"/>
    <path d="M 474 290 Q 430 290 440 330 Q 450 360 484 360 M 606 290 Q 650 290 640 330 Q 630 360 596 360" fill="none" stroke="${P.ink}" stroke-width="8"/>
    <rect x="525" y="410" width="30" height="34" fill="${P.ink}"/><rect x="490" y="440" width="100" height="22" rx="6" fill="${P.ink}"/>`;
  let shake = '';
  return `${bgBoard(t)}<g transform="translate(${nerv ? 2 * Math.sin(t * 50) : 0} 0)">${board(t, o)}</g>
    ${S(540, 360, tr, trophy + bigX(540, 360, 110, xp, P.red, 24))}
    ${m > 0 ? marker(mx, my) : ''}${counter(t)}`;
}
function camFor(t) { // push-in on the row being worked on
  const keys = [[44.38, 1, 500, 1190], [44.7, 1.07, 500, 1190], [49.2, 1.07, 500, rowY(2)], [50.96, 1.07, 500, rowY(1)], [53.02, 1.07, 500, rowY(0)], [56.54, 1, 500, 960]];
  let k = 0;
  for (let i = 0; i < keys.length; i++) if (t >= keys[i][0]) k = i;
  const a = keys[Math.max(0, k - 1)], b = keys[k];
  const p = eio(prog(t, b[0], b[0] + .35));
  return [lerp(a[1], b[1], p), lerp(a[2], b[2], p), lerp(a[3], b[3], p)];
}
function sCross(t) { // 44.38 - 56.54: the elimination act
  const o = { rP: 1, sP: () => 1, rank: () => 1, gt: () => 1, state: namedState };
  const [z, cx, cy] = camFor(t);
  // marker follows the active strike
  let mk = '';
  for (const L of 'DECBA') {
    const [t0, first] = STRIKE[L];
    if (t >= t0 - .25 && t < t0 + .6) {
      const p = eio(prog(t, t0, t0 + .35));
      const y = rowY(LET.indexOf(L));
      const x = lerp(colX(first) - 70, colX(4) + 70, p);
      mk = marker(x, y + 6 - (t < t0 ? 40 * prog(t, t0 - .25, t0) : 0));
    }
  }
  let ch = '';
  if (t < 49.2) ch = chain(t, 47.1, ['A1', 'B1', 'C1', 'D1'], 48.6, .3);
  else if (t < 50.96) ch = chain(t, 49.24, ['A1', 'B1', 'C1', 'C2'], 49.62, .08);
  else if (t < 53.02) ch = chain(t, 50.96, ['A1', 'B1', 'B2', 'B3'], 51.3, .08);
  else ch = chain(t, 53.02, ['A1', 'A2', 'A3', 'A4'], 53.4, .08);
  // label: "3 faster" counter on the chain
  const lock = t > 55.32 ? pp(t, 55.88, .25) : 0;
  const de = t < 47.1 ? pp(t, 45.08, .25) : 0;
  return `${bgBoard(t)}<g transform="translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})">${board(t, o)}${strikes(t)}${mk}
    ${lock ? S(colX(0), rowY(0), lock, `<circle cx="${colX(0) + 52}" cy="${rowY(0) - 50}" r="28" fill="${P.ink}"/>${T('1', colX(0) + 52, rowY(0) - 38, 34, P.yel)}`) : ''}</g>
    ${ch}${S(540, 330, de * (1 - prog(t, 46.8, 47.1)), `<rect x="300" y="250" width="480" height="160" rx="30" fill="${P.red}"/>${T('D + E', 540, 362, 96, P.chip)}`)}
    ${counter(t)}`;
}
function sFive2(t) { // 56.54 - 59.52: five candidates for two places
  let g = '';
  // struck chips fall away, A1 moves aside, candidates gather
  const fall = prog(t, 56.54, 57.2);
  const gather = eio(prog(t, 56.9, 57.4));
  const cand = ['A2', 'A3', 'B1', 'B2', 'C1'];
  for (let li = 0; li < 5; li++) for (let n = 1; n <= 5; n++) {
    const L = LET[li], code = L + n;
    const st = namedState(L, n, 60);
    const x0 = colX(n - 1), y0 = rowY(li);
    if (st.st === 'out') {
      const d = cl(fall * 1.6 - hash(li * 5 + n) * .6);
      if (d < 1) g += chip(x0 + 60 * d * (hash(n + li) - .5), y0 + 900 * d * d, .95, { code, st: 'out', rot: 60 * d * (hash(n * 3 + li) - .5), op: 1 - d });
    }
  }
  const k = 0;
  cand.forEach((c, i) => {
    const li = LET.indexOf(c[0]), n = +c[1];
    const x = lerp(colX(n - 1), 175 + i * 182, gather), y = lerp(rowY(li), 860, gather);
    const cnt = pp(t, 57.38 + i * .07, .2);
    g += chip(x, y, .95 + .1 * gather, { code: c, st: 'cand' }) + (cnt > 0 ? badge(x + 50, y - 70, i + 1, cnt) : '');
  });
  // A1 aside
  const ax = lerp(colX(0), 900, gather), ay = lerp(rowY(0), 340, gather);
  g += chip(ax, ay, .95, { code: 'A1', st: 'win' }) + badge(ax + 52, ay - 50, 1, 1, P.ink, P.yel);
  // two empty places
  const slots = [2, 3].map((n, i) => S(390 + i * 300, 1200, pp(t, 58.52 + i * .12, .25),
    `<rect x="${290 + i * 300}" y="1110" width="200" height="180" rx="28" fill="none" stroke="${P.ink}" stroke-width="7" stroke-dasharray="20 12"/>${T(n, 390 + i * 300, 1240, 110, P.ink2)}`)).join('');
  return `${bgBoard(t)}${g}${slots}${S(300, 600, pp(t, 57.38, .25), T('5', 230, 640, 140, P.ink) + T('→', 380, 632, 110, P.ink2) + T('2', 520, 640, 140, P.ink))}${counter(t)}`;
}
function sRace7(t) { // 59.52 - 63.6
  const t0 = 61.22;
  const cand = ['A2', 'A3', 'B1', 'B2', 'C1'];
  // codes hidden once the gates open: the result is whoever finishes first and second
  const hide = prog(t, 60.9, 61.15);
  const rk = [3, 1, 4, 0, 2];
  const list = cand.map((c, i) => ({ o: hide > .5 ? { q: true, st: 'cand' } : { code: c, st: 'cand' }, rank: rk[i] }));
  const enter = pp(t, 59.52, .3);
  const a1 = `<rect x="740" y="220" width="300" height="200" rx="30" fill="${P.chip}" stroke="${P.grn}" stroke-width="6" stroke-dasharray="18 10"/>${chip(830, 320, .9, { code: 'A1', st: 'win' })}${badge(960, 320, 1, 1, P.ink, P.yel)}`;
  return `${bgBoard(t)}${track(t, prog(t, t0, t0 + .12))}${S(540, 860, enter, runners(t, t0, 1.2, list, .85, true))}
    ${S(890, 320, pp(t, 59.7, .3), a1)}${counter(t)}`;
}
function sFinal(t) { // 63.6 - 66.68
  const fly = (k, t0, n) => {
    const p = prog(t, t0, t0 + .4);
    const [x, top] = POD[k];
    if (p <= 0) return `${S(x, top - 80, 1, `<rect x="${x - 62}" y="${top - 140}" width="124" height="120" rx="20" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="14 9"/>`)}`;
    const xx = lerp(1020, x, eio(p)), yy = lerp(300, top - 72, eio(p)) - 200 * Math.sin(p * Math.PI);
    return chip(xx, yy + 8 * ring(t, t0 + .4, 3, 7), .95, { q: true, st: 'cand' }) + badge(xx + 52, yy - 50, n, 1, P.ink2);
  };
  const glow = prog(t, 65.4, 65.7);
  let conf = '';
  if (t > 65.4) for (let i = 0; i < 26; i++) {
    const d = t - 65.4, a = hash(i) * Math.PI * 2;
    const x = 540 + Math.cos(a) * 500 * eout(cl(d)) * hash(i + 3), y = 700 + Math.sin(a) * 280 * eout(cl(d)) + 300 * d * d;
    const c = [P.yel, P.grn, P.red, P.ink][i % 4];
    conf += `<rect x="${x}" y="${y}" width="18" height="10" fill="${c}" transform="rotate(${d * 300 + i * 40} ${x} ${y})" opacity="${1 - prog(d, .8, 1.3)}"/>`;
  }
  const items = `${chip(POD[0][0], POD[0][1] - 72, .95, { code: 'A1', st: 'win', glow: glow * (.6 + .4 * Math.sin(t * 6)), glowC: P.grn })}${fly(1, 63.94, 1)}${fly(2, 64.66, 2)}`;
  return `${bgBoard(t, 1)}${S(540, 1150, 1 + .03 * Math.sin(prog(t, 65.4, 65.8) * Math.PI), podium(t, items))}${conf}
    ${S(540, 470, pp(t, 63.62, .3), `<rect x="250" y="370" width="580" height="190" rx="34" fill="${P.ink}"/>${T('TOP 3', 540, 500, 110, P.yel)}`)}${counter(t)}`;
}
function sSeven(t) { // 66.68 - 69.3
  let tk = '';
  for (let i = 0; i < 7; i++) {
    const x = i < 4 ? 210 + i * 170 : 295 + (i - 4) * 170, y = i < 4 ? 1080 : 1280;
    const col = i < 5 ? P.ink : i === 5 ? P.grnSh : P.yelSh;
    tk += ticket(x, y + 6 * Math.sin(t * 4 + i), pp(t, 66.82 + i * .15, .22) * 1.1, i + 1, 'n', { col });
  }
  const s = slamS(t, 68.0);
  const [sx, sy] = shakeOf(t, [68.0]);
  return `${bgBoard(t)}<g transform="translate(${sx} ${sy})">${tk}
    ${s ? S(540, 480, s, T('7', 340, 640, 380, P.ink)) : ''}
    ${S(700, 560, pp(t, 68.52, .25), T('RENNEN', 520, 600, 100, P.ink, { a: 'start' }) + `<rect x="520" y="625" width="410" height="20" rx="10" fill="${P.yel}"/>`)}</g>`;
}
function sMore(t) { // 69.3 - 71.32: more measuring is not the trick
  const n = t < 70.22 ? 7 : t < 70.42 ? 8 : t < 70.62 ? 9 : t < 71.0 ? 10 : 7;
  const lastC = t < 70.22 ? 69.3 : t < 70.42 ? 70.22 : t < 70.62 ? 70.42 : t < 71.0 ? 70.62 : 71.0;
  const nb = 1 + .3 * Math.exp(-(t - lastC) * 8);
  const xp = prog(t, 70.7, 70.95);
  const [sx, sy] = shakeOf(t, [70.7]);
  const sw = pp(t, 69.46, .3);
  const more = n > 7;
  return `${bgBoard(t, 1)}<g transform="translate(${sx} ${sy})">
    ${stopwatch(300, 520, sw * .8, t * 14)}
    ${S(780, 520, pp(t, 69.6, .3), `<rect x="660" y="460" width="240" height="120" rx="14" fill="${P.yel}" stroke="${P.ink}" stroke-width="6"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${680 + i * 25}" y1="460" x2="${680 + i * 25}" y2="${i % 2 ? 495 : 515}" stroke="${P.ink}" stroke-width="5"/>`).join('')}`)}
    ${S(540, 1000, nb, T(n, 540, 1120, 320, more ? P.red : P.ink) + (more ? T('+', 300, 1060, 200, P.red) : ''))}
    ${more ? bigX(540, 1000, 260, xp, P.red, 34) : ''}</g>`;
}
function sInfo(t) { // 71.32 - 73.9: use every piece of information you already had
  const o = { rP: 1, sP: () => 1, rank: () => 1, gt: (g, c) => .3 + .7 * Math.max(0, Math.sin(Math.PI * cl((t - 71.84 - c * .12 - LIDX[g] * .08) / .5))), state: namedState };
  const pulse = t > 72.82 ? .5 + .5 * Math.sin((t - 72.82) * 9) : 0;
  let glow = '';
  for (const c of ['A2', 'A3', 'B1', 'B2', 'C1']) {
    const li = LET.indexOf(c[0]), n = +c[1];
    glow += `<rect x="${colX(n - 1) - 78}" y="${rowY(li) - 76}" width="156" height="152" rx="30" fill="none" stroke="${P.yel}" stroke-width="10" opacity="${pulse}"/>`;
  }
  const z = 1 + .06 * eio(prog(t, 71.32, 73.9));
  return `${bgBoard(t)}<g transform="translate(540 980) scale(${z}) translate(-540 -980)">${board(t, o)}${strikes(t)}${glow}</g>
    ${S(540, 330, pp(t, 71.4, .3), `<rect x="210" y="250" width="660" height="170" rx="30" fill="${P.chip}" stroke="${P.ink}" stroke-width="5"/>
      ${chip(310, 335, .8, { code: 'A1', st: 'win' })}${T('&gt;', 420, 360, 70, P.ink)}${chip(530, 335, .8, { code: 'B1', st: 'cand' })}${T('&gt;', 640, 360, 70, P.ink)}${chip(750, 335, .8, { code: 'C1', st: 'cand' })}`)}${counter(t)}`;
}
function sEnd(t) { // 73.9 - end: 7 RENNEN card
  const s = slamS(t, 73.95);
  let ring7 = '';
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 7 + t * .6;
    const p = pp(t, 74.1 + i * .06, .2);
    ring7 += S(540 + 360 * Math.cos(a), 820 + 360 * Math.sin(a), p * .7, chip(540 + 360 * Math.cos(a), 820 + 360 * Math.sin(a), 1, { st: i < 1 ? 'win' : i < 3 ? 'cand' : 'n' }));
  }
  return `${bgBoard(t)}${ring7}${s ? S(540, 820, s, `<rect x="250" y="620" width="580" height="400" rx="50" fill="${P.ink}"/>${T('7', 540, 860, 260, P.yel)}${T('RENNEN', 540, 975, 96, P.bg)}`) : ''}`;
}

function scene(t) {
  if (t < 1.74) return sHook(t);
  if (t < 4.42) return sGates(t);
  if (t < 7.8) return sQuestion(t);
  if (t < 10.88) return sSix(t);
  if (t < 14.22) return sSame(t);
  if (t < 16.32) return sTie(t);
  if (t < 18.02) return sGroups(t);
  if (t < 20.38) return sMontage(t);
  if (t < 21.86) return sFive(t);
  if (t < 24.86) return sSorted(t);
  if (t < 27.5) return sWinners(t);
  if (t < 31.44) return sRace6(t);
  if (t < 34.36) return sNamed(t);
  if (t < 36.68) return sOpen(t);
  if (t < 41.12) return sMaybe(t);
  if (t < 44.38) return sLosers(t);
  if (t < 56.54) return sCross(t);
  if (t < 59.52) return sFive2(t);
  if (t < 63.6) return sRace7(t);
  if (t < 66.68) return sFinal(t);
  if (t < 69.3) return sSeven(t);
  if (t < 71.32) return sMore(t);
  if (t < 73.9) return sInfo(t);
  return sEnd(t);
}

const __style = {"dust": false, "vignette": false, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
