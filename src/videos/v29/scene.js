// @ts-nocheck
// AUTO-GENERATED scene for v29. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const P = { paper: '#F4EFE6', grid: '#E3DCCF', ink: '#2B2B2B', blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', teal: '#14A38B', purple: '#7A5AF8', mark: '#FFD84D', lav: '#E4DCFF', soft: '#DDD5C7' };
const SANS = `font-family:'Inter';font-weight:900`;
const SERIF = `font-family:'Liberation Serif','DejaVu Serif',serif;font-style:italic;font-weight:400`;
const DUR = 63.66;
const CARDS = [0, 3.92, 6.06, 8.42, 14.24, 19.44, 22.66, 26.02, 32.8, 36.64, 39.04, 41.72, 44.2, 48.58, 52.1, 53.49, 56.12, 57.34, 59.88];
const SHAKES = [[3.46, 16], [17.6, 8], [31.82, 14], [40.95, 14], [43.12, 22], [55.0, 12], [0.3, 8]];

const fit = (txt, max, w = 860, k = 0.74) => Math.min(max, w / (Math.max(1, txt.length) * k));

// ---------- primitives ----------
function kw(txt, x, y, size, col, t0, t, o = {}) {
  if (t < t0) return '';
  const p = back(prog(t, t0, t0 + .24));
  const pulse = o.pulse ? 1 + .05 * Math.sin(prog(t, o.pulse, o.pulse + .35) * Math.PI) : 1;
  const idle = 1 + .008 * Math.sin(t * 3.1 + x * .01);
  const s = (o.from !== undefined ? lerp(o.from, 1, p) : p) * pulse * idle;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})" opacity="${cl(prog(t, t0, t0 + .08) * 1.2)}"><text x="0" y="0" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px;letter-spacing:-1px" fill="${col}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 8}" paint-order="stroke"` : ''}>${txt}</text></g>`;
}
function words(list, x, y, size, t, col = P.ink) {
  // list: [[word, t0], ...] — one centred serif-italic line, each word appears when spoken
  if (t < list[0][1]) return '';
  const sp = list.map(([w, t0]) => `<tspan fill-opacity="${cl(prog(t, t0, t0 + .12))}">${w} </tspan>`).join('');
  const dy = 18 * (1 - eout(prog(t, list[0][1], list[0][1] + .25)));
  return `<text x="${x}" y="${y + dy}" text-anchor="middle" style="${SERIF};font-size:${size}px" fill="${col}">${sp}</text>`;
}
function marker(x, y, w, h, t0, t1, t, col = P.mark) {
  const p = eout(prog(t, t0, t1));
  if (p <= 0) return '';
  return `<path d="M ${x} ${y + h * .15} L ${x + w * p} ${y} L ${x + w * p} ${y + h} L ${x} ${y + h * .9} Z" fill="${col}" opacity=".85"/>`;
}
function check(x, y, s, t0, t, col = P.teal) {
  const p = eout(prog(t, t0, t0 + .28));
  if (p <= 0) return '';
  return `<path d="M ${x - 40 * s} ${y} L ${x - 10 * s} ${y + 32 * s} L ${x + 48 * s} ${y - 40 * s}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function cross(x, y, s, t0, t, col = P.red) {
  const a = eout(prog(t, t0, t0 + .16)), b = eout(prog(t, t0 + .14, t0 + .3));
  if (a <= 0) return '';
  return `<path d="M ${x - 38 * s} ${y - 38 * s} L ${x + 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${a} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>
    ${b > 0 ? `<path d="M ${x + 38 * s} ${y - 38 * s} L ${x - 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${b} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>` : ''}`;
}
function stamp(txt, x, y, size, col, rot, t0, t) {
  if (t < t0 - .12) return '';
  const p = prog(t, t0 - .12, t0);
  const s = lerp(2.4, 1, ein(p)) * (1 + .06 * ring(t, t0, 5, 9));
  const w = txt.length * size * .74 + 60, h = size * 1.25;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${cl(p * 2)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="10"/>
    <rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="8" fill="none" stroke="${col}" stroke-width="3"/>
    <text x="0" y="4" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px" fill="${col}">${txt}</text></g>`;
}
function burst(x, y, t0, t, col = P.ink, n = 8, r0 = 70, r1 = 150) {
  const p = prog(t, t0, t0 + .35);
  if (p <= 0 || p >= 1) return '';
  let g = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + .3, ra = lerp(r0, r1, eout(p)), rb = lerp(r0, r1, eout(cl(p * 1.6)));
    g += `<line x1="${x + Math.cos(a) * ra}" y1="${y + Math.sin(a) * ra}" x2="${x + Math.cos(a) * rb}" y2="${y + Math.sin(a) * rb}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return g;
}
function dashBox(x, y, w, h, t0, t, col = P.ink) {
  const p = eout(prog(t, t0, t0 + .3));
  if (p <= 0) return '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${col}" stroke-width="5" stroke-dasharray="22 14" stroke-dashoffset="${-t * 40}" pathLength="${1000}" opacity="${p}" transform="translate(${x + w / 2} ${y + h / 2}) scale(${lerp(1.15, 1, p)}) translate(${-x - w / 2} ${-y - h / 2})"/>`;
}

// ---------- icons ----------
function brain(x, y, s, o = {}) {
  const t = o.t || 0, look = o.look || 0;
  const br = 1 + .025 * Math.sin(t * 4);
  const mouth = o.mouth === 'o' ? `<ellipse cx="0" cy="48" rx="14" ry="16" fill="${P.ink}"/>` : o.mouth === 'sad' ? `<path d="M -22 56 Q 0 38 22 56" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>` : `<path d="M -24 40 Q 0 62 24 40" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const blink = o.blink ? .15 : 1;
  return `<g transform="translate(${x} ${y}) scale(${s * br} ${s / br}) rotate(${o.tilt || 0})">
    <ellipse cx="0" cy="104" rx="${110}" ry="14" fill="${P.ink}" opacity=".12"/>
    <path d="${scallop(0, 0, 130, 98, 11)}" fill="#B9A6FF" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 0 -96 C -10 -50 12 -20 0 20" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -96 -30 q 30 -18 52 6 M -88 40 q 30 10 46 -10 M 50 -60 q 30 4 40 34 M 56 50 q 30 -2 44 -26" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="${-34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/><ellipse cx="${34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/>
    <circle cx="${-30 + look}" cy="-5" r="4" fill="#fff"/><circle cx="${38 + look}" cy="-5" r="4" fill="#fff"/>
    ${mouth}${o.sweat ? `<path d="M 118 -50 q 14 24 0 34 q -14 -10 0 -34 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3" transform="translate(0 ${12 * ((t * 1.6) % 1)})"/>` : ''}
  </g>`;
}
function nameTag(x, y, s, rot, inner = '') {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-300" y="-170" width="600" height="360" rx="34" fill="${P.ink}" opacity=".14" transform="translate(10 16)"/>
    <rect x="-300" y="-180" width="600" height="360" rx="34" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -300 -100 V -146 Q -300 -180 -266 -180 H 266 Q 300 -180 300 -146 V -100 Z" fill="${P.red}" stroke="${P.ink}" stroke-width="6"/>
    <text x="0" y="-130" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:50px;letter-spacing:6px" fill="#fff">HALLO</text>
    <line x1="-230" y1="130" x2="230" y2="130" stroke="${P.soft}" stroke-width="5" stroke-dasharray="14 10"/>
    ${inner}</g>`;
}
// handwritten name inside a tag, revealed left→right by a pen (wipe 0..1) and removed by an eraser (erase 0..1)
function tagName(name, id, wipe, erase, col = P.blue) {
  if (wipe <= 0) return '';
  const x0 = -240 + 480 * erase, x1 = -240 + 480 * wipe;
  if (x1 <= x0) return '';
  return `<clipPath id="${id}"><rect x="${x0}" y="-90" width="${x1 - x0}" height="220"/></clipPath>
    <g clip-path="url(#${id})"><text x="0" y="22" text-anchor="middle" dominant-baseline="central" transform="skewX(-10)" style="${SANS};font-size:150px;letter-spacing:4px" fill="${col}">${name}</text></g>`;
}
function pen(x, y, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M 0 0 L 22 -40 L 60 -170 L 92 -160 L 54 -30 Z" fill="${P.orange}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M 0 0 L 22 -40 L 34 -36 Z" fill="${P.ink}"/></g>`;
}
function eraser(x, y, rot = -20) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-55" y="-120" width="110" height="160" rx="16" fill="#F7A6B4" stroke="${P.ink}" stroke-width="5"/><rect x="-55" y="-120" width="110" height="70" rx="14" fill="${P.blue}" stroke="${P.ink}" stroke-width="5"/></g>`;
}
function crumbs(x, y, t0, t, n = 8) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const dt = t - t0 - i * .04;
    if (dt <= 0 || dt > .8) continue;
    g += `<circle cx="${x + (hash(i + 3) - .5) * 160 + dt * 60 * (hash(i) - .5)}" cy="${y + 40 + 500 * dt * dt + 30 * hash(i + 7)}" r="${4 + 4 * hash(i + 11)}" fill="#E7A3AE" opacity="${1 - dt / .8}"/>`;
  }
  return g;
}
function stopwatch(x, y, r, ang, fill = 0, col = P.red) {
  const a0 = -Math.PI / 2, a1 = a0 + fill * Math.PI * 2;
  const sector = fill > 0.001 ? `<path d="M 0 0 L ${r * .82 * Math.cos(a0)} ${r * .82 * Math.sin(a0)} A ${r * .82} ${r * .82} 0 ${fill > .5 ? 1 : 0} 1 ${r * .82 * Math.cos(a1)} ${r * .82 * Math.sin(a1)} Z" fill="${col}" opacity=".3"/>` : '';
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<line x1="${Math.cos(a) * r * .72}" y1="${Math.sin(a) * r * .72}" x2="${Math.cos(a) * r * .84}" y2="${Math.sin(a) * r * .84}" stroke="${P.ink}" stroke-width="${i % 3 ? 3 : 6}"/>`; }
  return `<g transform="translate(${x} ${y})">
    <rect x="${-r * .16}" y="${-r * 1.28}" width="${r * .32}" height="${r * .26}" rx="6" fill="${P.ink}"/>
    <circle cx="0" cy="0" r="${r}" fill="#fff" stroke="${P.ink}" stroke-width="7"/>${sector}${ticks}
    <line x1="0" y1="0" x2="${Math.cos(ang - Math.PI / 2) * r * .7}" y2="${Math.sin(ang - Math.PI / 2) * r * .7}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    <circle r="${r * .1}" fill="${P.ink}"/></g>`;
}
function person(x, y, s, fill, o = {}) {
  const j = o.jit || 0;
  return `<g transform="translate(${x + j * Math.sin((o.t || 0) * 70)} ${y}) scale(${s})">
    <path d="M -62 96 Q -62 30 0 30 Q 62 30 62 96 Z" fill="${fill}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="0" cy="-12" r="38" fill="${fill}" stroke="${P.ink}" stroke-width="5"/>
    <circle cx="-12" cy="-14" r="4.5" fill="${P.ink}"/><circle cx="12" cy="-14" r="4.5" fill="${P.ink}"/>
    ${o.label ? `<text x="0" y="72" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:36px" fill="#fff">${o.label}</text>` : ''}
    ${o.sweat ? `<path d="M 40 -40 q 10 18 0 26 q -10 -8 0 -26 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3"/>` : ''}</g>`;
}
function bubble(x, y, w, h, tailX, tailY, s, inner, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M ${-w / 2 + 24} ${-h / 2} H ${w / 2 - 24} Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 24} V ${h / 2 - 24} Q ${w / 2} ${h / 2} ${w / 2 - 24} ${h / 2} H ${18} L ${tailX} ${tailY} L ${-14} ${h / 2} H ${-w / 2 + 24} Q ${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 24} V ${-h / 2 + 24} Q ${-w / 2} ${-h / 2} ${-w / 2 + 24} ${-h / 2} Z" fill="#fff" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    ${inner}</g>`;
}

// ---------- background & progress ----------
function paper(t, shift) {
  let g = '';
  const ox = ((shift % 60) + 60) % 60;
  for (let x = -60; x <= 1140; x += 60) g += `<line x1="${x + ox}" y1="0" x2="${x + ox}" y2="1920" stroke="${P.grid}" stroke-width="2"/>`;
  for (let y = 0; y <= 1920; y += 60) g += `<line x1="0" y1="${y}" x2="1080" y2="${y}" stroke="${P.grid}" stroke-width="2"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.paper}"/>${g}
    <radialGradient id="pgV" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#C9BBA4" stop-opacity="0"/><stop offset="1" stop-color="#C9BBA4" stop-opacity=".35"/></radialGradient>
    <rect x="0" y="0" width="1080" height="1920" fill="url(#pgV)"/>`;
}
function progressBar(t) {
  const p = cl(t / DUR), x = lerp(90, 990, p);
  return `<line x1="90" y1="150" x2="990" y2="150" stroke="${P.ink}" stroke-width="4" opacity=".18" stroke-linecap="round"/>
    <line x1="90" y1="150" x2="${x}" y2="150" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${x}" cy="150" r="11" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>`;
}

// ---------- cards ----------
function c0(t) {
  const drop = t < .4 ? lerp(-140, 0, back(prog(t, 0, .36))) : 0;
  const sq = 1 + .07 * ring(t, .36, 3, 8);
  const tagY = 1010 + drop + 6 * Math.sin(t * 2.4);
  const wipe = prog(t, .98, 1.5), erase = eio(prog(t, 3.18, 3.5));
  let g = kw('NAME?', 540, 520, 230, P.blue, 0, t, { from: 1.35, pulse: .98 });
  g += marker(240, 600, 600, 34, .5, .8, t);
  const inner = tagName('LENA', 'c0n', wipe, erase);
  g += `<g transform="translate(540 ${tagY}) scale(${1 / sq} ${sq}) translate(-540 ${-tagY})">${nameTag(540, tagY, 1, -4, inner)}</g>`;
  if (wipe > 0 && wipe < 1) g += pen(540 - 240 + 480 * wipe, tagY + 40, 20);
  if (t > 1.9) {
    const sw = back(prog(t, 1.9, 2.1)), f = prog(t, 1.98, 3.46);
    g += `<g transform="translate(840 760) scale(${sw}) translate(-840 -760)">${stopwatch(840, 760, 78, f * Math.PI * 2, f)}</g>`;
  }
  if (erase > 0 && erase < 1) g += eraser(540 - 240 + 480 * erase, tagY + 10);
  g += crumbs(540, tagY, 3.2, t);
  g += stamp('WEG.', 540, tagY + 10, 170, P.red, -12, 3.46, t);
  return g;
}
function c1(t) {
  let g = words([['Das', 3.92], ['liegt', 4.08], ['nicht', 4.3], ['an', 4.52], ['deinem', 4.74]], 540, 560, 74, t);
  const strike = eout(prog(t, 5.5, 5.75));
  g += kw('GEDÄCHTNIS', 540, 760, fit('GEDÄCHTNIS', 140), P.purple, 5.04, t, { pulse: 5.3 });
  if (strike > 0) g += `<path d="M 110 ${770} L ${110 + 860 * strike} ${750}" stroke="${P.red}" stroke-width="18" stroke-linecap="round"/>`;
  const bs = back(prog(t, 4.3, 4.6));
  if (bs > 0) g += `<g transform="translate(540 1120) scale(${bs}) translate(-540 -1120)">${brain(540, 1120, 1.2, { t, look: t < 5.04 ? 0 : -14, mouth: t > 5.75 ? 'smile' : 'o', tilt: t > 5.75 ? 6 * Math.sin(t * 5) : 0 })}</g>`;
  return g;
}
function c2(t) {
  let g = words([['Es', 6.06], ['liegt', 6.24], ['am', 6.48]], 540, 520, 80, t);
  g += marker(250, 700, 580, 44, 7.0, 7.3, t);
  g += kw('MOMENT', 540, 680, 190, P.orange, 6.7, t, { pulse: 7.72 });
  g += dashBox(150, 570, 780, 230, 7.3, t, P.ink);
  const stop = 7.72;
  const ang = t < stop ? (t - 6.06) * 9 : (stop - 6.06) * 9 + .12 * ring(t, stop, 4, 7);
  const ss = back(prog(t, 6.1, 6.4));
  if (ss > 0) g += `<g transform="translate(540 1110) scale(${ss}) translate(-540 -1110)">${stopwatch(540, 1110, 150, ang, 0, P.orange)}</g>`;
  g += burst(540, 1110, stop, t, P.orange, 10, 175, 250);
  return g;
}
const RING = { cx: 540, cy: 860, r: 290 };
function ringPos(i) { const a = Math.PI / 2 + (i + 1) / 7 * Math.PI * 2; return [RING.cx + RING.r * Math.cos(a), RING.cy + RING.r * Math.sin(a)]; }
function ringBase(t, tHeads, tRing, du) {
  const pr = eio(prog(t, tRing, tRing + .7));
  let g = pr > 0 ? `<circle cx="${RING.cx}" cy="${RING.cy}" r="${RING.r}" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="20 14" pathLength="1000" opacity=".5" style="stroke-dasharray:${pr * 1000} 1000"/>` : '';
  for (let i = 0; i < 7; i++) {
    const [x, y] = ringPos(i), t0 = tHeads + i * (du ? .17 : .06), isDu = i === 6;
    const s = back(prog(t, t0, t0 + .25));
    if (s <= 0) continue;
    const beat = isDu && du ? 1 + .1 * Math.max(ring(t, 13.0, 2.2, 5), ring(t, 13.56, 2.2, 5), 0) : 1;
    g += person(x, y - 30, .95 * s * beat, isDu ? P.red : [P.blue, P.orange, P.teal, P.purple, '#C6A15B', P.blue][i], { label: isDu ? 'DU' : '', jit: isDu && t > 13.0 && du ? 2.5 : 0, t, sweat: isDu && t > 13.28 && du });
  }
  return g;
}
function c3(t) {
  let g = words([['die', 8.72], ['Vorstellungsrunde', 8.96]], 540, 360, 78, t);
  g += marker(250, 378, 580, 24, 9.4, 9.8, t);
  g += ringBase(t, 8.55, 8.45, true);
  const names = ['ANNA', 'TOM', 'JONAS', 'MIA', 'PAUL', 'SARA'];
  const T = [10.54, 10.92, 11.24, 11.62, 12.08, 12.42];
  let cur = -1;
  for (let i = 0; i < 6; i++) if (t >= T[i]) cur = i;
  for (let i = 0; i < 6; i++) {
    if (t < T[i]) continue;
    const end = i < 5 ? T[i + 1] + .2 : 13.0;
    const out = prog(t, end, end + .15);
    if (out >= 1) continue;
    const [x, y] = ringPos(i);
    const dx = x < 540 ? 1 : -1;
    const s = back(prog(t, T[i], T[i] + .2)) * (1 - out);
    const bx = cl(x + dx * 10, 220, 860), by = y - 175;
    g += bubble(bx, by, 230, 100, -10 * dx, 80, s, `<text x="0" y="2" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${fit(names[i], 50, 200, .74)}px" fill="${P.ink}">${names[i]}</text>`);
  }
  // pointer in the middle of the ring
  if (t > 10.4) {
    const target = t >= 13.0 ? 6 : Math.max(cur, 0);
    const [tx, ty] = ringPos(target);
    const prevA = cur > 0 ? Math.atan2(ringPos(cur - 1)[1] - RING.cy, ringPos(cur - 1)[0] - RING.cx) : Math.atan2(ty - RING.cy, tx - RING.cx);
    let a = Math.atan2(ty - RING.cy, tx - RING.cx);
    const tt = t >= 13.0 ? 13.0 : T[Math.max(cur, 0)];
    let pa = prevA; if (t >= 13.0) pa = Math.atan2(ringPos(5)[1] - RING.cy, ringPos(5)[0] - RING.cx);
    while (a - pa > Math.PI) a -= Math.PI * 2; while (pa - a > Math.PI) a += Math.PI * 2;
    const aa = lerp(pa, a, back(prog(t, tt, tt + .22)));
    const ps = back(prog(t, 10.4, 10.6));
    g += `<g transform="translate(${RING.cx} ${RING.cy}) rotate(${aa * 180 / Math.PI}) scale(${ps})"><path d="M -40 -22 L 120 -22 L 120 -50 L 190 0 L 120 50 L 120 22 L -40 22 Z" fill="${t >= 13.0 ? P.red : P.ink}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="5"/></g>`;
  }
  g += kw('DU', 540, 1300, 150, P.red, 13.0, t, { pulse: 13.56 });
  return g;
}
function c4(t) {
  const hs = back(prog(t, 14.24, 14.55));
  const shake = t > 17.6 ? 4 * Math.sin(t * 60) * (t > 18 ? 1 : prog(t, 17.6, 18)) : 0;
  const head = 'M 300 1330 L 300 1180 Q 180 1100 190 860 Q 210 470 560 430 Q 860 420 900 700 Q 905 760 900 800 L 960 900 Q 966 922 940 928 L 905 935 L 912 990 Q 918 1010 900 1018 L 904 1060 Q 905 1110 850 1110 L 760 1105 L 740 1330 Z';
  let rows = '';
  const speed = t < 15.26 ? 0 : 160 + 260 * prog(t, 15.26, 19);
  const off = t < 15.26 ? 0 : (t - 15.26) * speed;
  const phrase = 'WAS SAGE ICH GLEICH? · ';
  const pw = phrase.length * 60 * .70;
  for (let r = 0; r < 6; r++) {
    const dir = r % 2 ? 1 : -1, y = 560 + r * 110;
    const appear = prog(t, 15.26 + r * .12, 15.5 + r * .12);
    if (appear <= 0) continue;
    const x0 = ((dir * off + r * 140) % pw + pw) % pw - pw;
    let s = '';
    for (let k = 0; k < 4; k++) s += `<text x="${x0 + k * pw}" y="${y}" style="${SANS};font-size:60px" fill="${r % 2 ? P.purple : '#9C86FB'}" opacity="${appear}">${phrase}</text>`;
    rows += s;
  }
  let g = `<g transform="translate(${shake} 0) translate(560 880) scale(${hs}) translate(-560 -880)">
    <path d="${head}" fill="${P.ink}" opacity=".12" transform="translate(14 18)"/>
    <path d="${head}" fill="${P.lav}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
    <clipPath id="c4h"><path d="${head}"/></clipPath><g clip-path="url(#c4h)">${rows}</g>
    <path d="${head}" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
    <circle cx="820" cy="760" r="12" fill="${P.ink}"/>
    ${t > 18 ? `<path d="M 230 600 q 16 30 0 44 q -16 -14 0 -44 Z M 880 560 q 16 30 0 44 q -16 -14 0 -44 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3" transform="translate(0 ${30 * ((t * 1.3) % 1)})"/>` : ''}
  </g>`;
  g += words([['in', 14.52], ['deinem', 14.68], ['Kopf', 14.98]], 540, 330, 70, t);
  // the question slams on, word by word
  const W = [['WAS', 16.96, 360, 760], ['SAGE', 17.16, 700, 760], ['ICH', 17.4, 370, 940], ['GLEICH?', 17.6, 680, 940]];
  if (t > 16.9) g += `<rect x="${110}" y="${650}" width="${860}" height="${400}" rx="30" fill="#fff" stroke="${P.ink}" stroke-width="6" opacity="${cl(prog(t, 16.9, 17.0))}" transform="rotate(-3 540 850)"/>`;
  for (const [w, t0, x, y] of W) g += kw(w, x, y, w.length > 5 ? 130 : 150, P.red, t0, t, { rot: -3, pulse: 18.4 + (x > 500 ? .2 : 0) });
  return g;
}
function c5(t) {
  const n = Math.round(lerp(1900, 1973, eout(prog(t, 19.44, 19.95))));
  const land = back(prog(t, 19.95, 20.15));
  let g = marker(200, 560, 680, 50, 20.0, 20.3, t);
  g += kw(String(n), 540, 500, 300, P.orange, 19.44, t, { from: .6, pulse: 19.95 });
  g += burst(540, 500, 19.95, t, P.orange, 12, 260, 360);
  g += words([['ein', 20.2], ['Psychologe', 20.38]], 540, 760, 76, t);
  // clipboard with ticks
  const cs = back(prog(t, 20.4, 20.7));
  if (cs > 0) {
    let lines = '';
    const T = [21.0, 21.32, 21.54];
    for (let i = 0; i < 3; i++) {
      const y = 1010 + i * 105;
      lines += `<rect x="470" y="${y - 8}" width="${200}" height="16" rx="8" fill="${P.soft}"/><rect x="390" y="${y - 32}" width="60" height="60" rx="10" fill="none" stroke="${P.ink}" stroke-width="5"/>${check(420, y, .7, T[i], t)}`;
    }
    g += `<g transform="translate(540 1120) scale(${cs}) rotate(${3 * Math.sin(t * 2)}) translate(-540 -1120)">
      <rect x="340" y="900" width="400" height="430" rx="22" fill="#C99A62" stroke="${P.ink}" stroke-width="6"/>
      <rect x="365" y="935" width="350" height="370" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="4"/>
      <rect x="470" y="880" width="140" height="56" rx="14" fill="#B7BDC9" stroke="${P.ink}" stroke-width="5"/>${lines}</g>`;
  }
  return g;
}
function c6(t) {
  let g = words([['im', 23.46], ['Kreis', 23.64]], 540, 360, 78, t);
  g += ringBase(t, 22.7, 23.64, false);
  const W = ['HUND', 'BAUM', 'GLAS', 'MOND', 'TISCH', 'BALL', 'KATZE'];
  for (let i = 0; i < 7; i++) {
    const t0 = 24.16 + i * .27;
    if (t < t0) continue;
    const [x, y] = ringPos(i);
    const s = back(prog(t, t0, t0 + .18));
    const big = 1 + .25 * (1 - prog(t, t0 + .1, t0 + .45));
    const bx = cl(x, 200, 860), by = y < 860 ? y - 165 : y - 175;
    g += `<g transform="translate(${bx} ${by}) scale(${s * big}) rotate(${(hash(i) - .5) * 10})"><rect x="-105" y="-40" width="210" height="80" rx="12" fill="${i === 6 ? P.red : '#fff'}" stroke="${P.ink}" stroke-width="5"/><text x="0" y="3" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${fit(W[i], 46, 190, .74)}px" fill="${i === 6 ? '#fff' : P.ink}">${W[i]}</text></g>`;
  }
  return g;
}
function c7(t) {
  const W = ['HUND', 'BAUM', 'GLAS', 'MOND', 'TISCH', 'BALL', 'KATZE'];
  const ns = back(prog(t, 26.0, 26.3));
  let rows = '';
  for (let i = 0; i < 7; i++) {
    const y = 560 + i * 102;
    const t0 = 26.3 + i * .12;
    const wipe = prog(t, t0, t0 + .2);
    const lost = i === 4 || i === 5;
    const er = lost ? eio(prog(t, 30.9 + (i - 4) * .25, 31.3 + (i - 4) * .25)) : 0;
    rows += `<line x1="330" y1="${y + 38}" x2="760" y2="${y + 38}" stroke="#BFD4F2" stroke-width="3"/>`;
    if (wipe > 0 && er < 1) rows += `<clipPath id="c7r${i}"><rect x="${340 + 360 * er}" y="${y - 50}" width="${360 * wipe - 360 * er}" height="100"/></clipPath><text x="350" y="${y}" dominant-baseline="central" clip-path="url(#c7r${i})" style="${SANS};font-size:60px" fill="${i === 6 ? P.red : P.ink}">${W[i]}</text>`;
    if (!lost) rows += check(720, y, .6, [27.56, 27.9, 28.26, 28.5, 0, 0, 28.75][i], t);
    else {
      const q = back(prog(t, 28.9 + (i - 4) * .1, 29.1 + (i - 4) * .1));
      if (q > 0 && t < 31.82) rows += `<text x="720" y="${y}" text-anchor="middle" dominant-baseline="central" transform="translate(720 ${y}) scale(${q}) translate(-720 ${-y})" style="${SANS};font-size:70px" fill="${P.orange}">?</text>`;
      rows += cross(720, y, .55, 31.82 + (i - 4) * .08, t);
      if (er > 0 && er < 1) rows += eraser(340 + 360 * er, y + 20, -30);
      rows += crumbs(520, y, 30.9 + (i - 4) * .25, t, 6);
    }
  }
  // bracket around the two lost words + "DU" flag on own word
  const br = eout(prog(t, 30.26, 30.6));
  let extra = '';
  if (br > 0) extra += `<rect x="300" y="${560 + 4 * 102 - 50}" width="490" height="${2 * 102}" rx="18" fill="${P.red}" fill-opacity=".08" stroke="${P.red}" stroke-width="6" stroke-dasharray="18 12" stroke-dashoffset="${-t * 40}" opacity="${br}"/>`;
  const du = back(prog(t, 29.86, 30.1));
  if (du > 0) extra += `<g transform="translate(200 ${560 + 6 * 102}) scale(${du})"><path d="M -70 -40 H 40 L 80 0 L 40 40 H -70 Z" fill="${P.red}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><text x="-10" y="2" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:44px" fill="#fff">DU</text></g>`;
  let g = `<g transform="translate(540 880) scale(${ns}) rotate(${-1.5 + .6 * Math.sin(t * 1.7)}) translate(-540 -880)">
    <rect x="252" y="430" width="590" height="860" rx="24" fill="${P.ink}" opacity=".14"/>
    <rect x="240" y="415" width="590" height="860" rx="24" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <line x1="310" y1="415" x2="310" y2="1275" stroke="${P.red}" stroke-width="3" opacity=".6"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${290 + i * 78}" y="392" width="22" height="50" rx="11" fill="${P.paper}" stroke="${P.ink}" stroke-width="5"/>`).join('')}
    ${rows}${extra}</g>`;
  g += words([['erinnern', 28.26]], 540, 330, 80, t, P.purple);
  return g;
}
function meter(x, y, w, h, fill, col, t) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <clipPath id="mt${Math.round(x)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/></clipPath>
    <rect x="${x}" y="${y}" width="${Math.max(0, w * fill)}" height="${h}" fill="${col}" clip-path="url(#mt${Math.round(x)})"/>
    <text x="${x + w / 2}" y="${y + h / 2 + 2}" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${h * .55}px" fill="${P.ink}">${Math.round(fill * 100)} %</text>`;
}
function c8(t) {
  let g = kw('9', 540, 520, 330, P.red, 33.06, t, { from: 2, pulse: 33.5 });
  g += kw('SEKUNDEN', 540, 720, fit('SEKUNDEN', 130), P.ink, 33.2, t);
  // timeline towards "DU"
  const tl = eio(prog(t, 32.8, 33.2));
  const m = lerp(140, 860, prog(t, 33.3, 36.4));
  g += `<line x1="140" y1="900" x2="${lerp(140, 860, tl)}" y2="900" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>`;
  if (t > 33.06) g += `<rect x="${lerp(860, 520, eout(prog(t, 33.06, 33.4)))}" y="876" width="${lerp(0, 340, eout(prog(t, 33.06, 33.4)))}" height="48" rx="10" fill="${P.red}" opacity=".3"/>`;
  if (tl > .9) g += `<circle cx="${m}" cy="900" r="16" fill="${P.ink}"/>${person(880, 860, .5, P.red, { label: '' })}`;
  // brain trying to save
  const bs = back(prog(t, 34.7, 35.0));
  if (bs > 0) {
    const f = .05 * eout(prog(t, 35.36, 35.6)) + .01 * Math.sin(t * 20) * (t > 35.6 ? 1 : 0);
    g += `<g transform="translate(540 1190) scale(${bs}) translate(-540 -1190)">${brain(270, 1190, .75, { t, mouth: t > 35.5 ? 'o' : 'smile', look: 12 })}${meter(420, 1150, 440, 80, cl(f), P.purple, t)}</g>`;
  }
  return g;
}
function c9(t) {
  let g = words([['komplett', 36.96], ['mit', 37.36]], 540, 330, 76, t);
  g += kw('DIR SELBST', 540, 470, fit('DIR SELBST', 140), P.purple, 37.6, t, { pulse: 38.04 });
  const n = Math.floor(cl((t - 36.9) / .18, 0, 9));
  let orb = '';
  for (let i = 0; i < n; i++) {
    const a = t * 2.6 + i / 9 * Math.PI * 2, x = 540 + 330 * Math.cos(a), y = 960 + 190 * Math.sin(a);
    const front = Math.sin(a) > 0;
    orb += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${front ? 60 : 44}px" fill="${i % 2 ? P.red : P.purple}" opacity="${front ? 1 : .5}">ICH</text>`;
  }
  const busy = t > 38.04 ? 1 : 0;
  let steam = '';
  if (busy) for (let i = 0; i < 4; i++) { const p = ((t - 38.04) * 1.4 + i / 4) % 1; steam += `<circle cx="${470 + i * 45 + 14 * Math.sin(p * 9 + i)}" cy="${780 - 200 * p}" r="${16 + 18 * p}" fill="#fff" stroke="${P.ink}" stroke-width="3" opacity="${1 - p}"/>`; }
  g += steam + orb.replace(/opacity="0.5"/g, 'opacity=".5"');
  g += brain(540, 960, 2.0 + .04 * Math.sin(t * 12) * busy, { t, look: 16 * Math.sin(t * 6), mouth: busy ? 'o' : 'smile', sweat: t > 37.6 });
  return g;
}
function c10(t) {
  let g = words([['Forscher', 39.04], ['nennen', 39.42], ['das', 39.68]], 540, 380, 76, t);
  // queue icon
  for (let i = 0; i < 4; i++) {
    const s = back(prog(t, 39.1 + i * .15, 39.35 + i * .15));
    if (s > 0) g += person(250 + i * 150, 1170, .95 * s, i === 3 ? P.red : '#C9C1B3', { jit: i === 3 && t > 40.95 ? 2 : 0, t, sweat: i === 3 && t > 41.1 });
  }
  const ar = eout(prog(t, 39.9, 40.3));
  if (ar > 0) g += `<path d="M 200 1300 L ${200 + 560 * ar} 1300" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>${ar > .95 ? `<path d="M 760 1278 L 800 1300 L 760 1322" fill="none" stroke="${P.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
  // typed term
  const term = 'NEXT-IN-LINE-';
  const k = Math.floor(cl((t - 40.0) / .065, 0, term.length));
  if (k > 0) g += `<text x="540" y="650" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${fit(term, 120, 880, .66)}px" fill="${P.blue}">${term.slice(0, k)}</text>`;
  g += stamp('EFFEKT', 540, 840, 120, P.teal, -4, 40.95, t);
  return g;
}
function c11(t) {
  const hit = 43.12;
  const sq = t < hit ? 1 : 1 - .32 * Math.exp(-(t - hit) * 6) * Math.cos((t - hit) * 18) ;
  let g = words([['besonders', 42.78]], 540, 400, 76, t);
  const ns = back(prog(t, 41.86, 42.1));
  if (ns > 0) g += `<g transform="translate(540 1100) scale(${(2 - sq) * ns} ${sq * ns}) translate(-540 -1100)"><text x="540" y="1100" text-anchor="middle" style="${SANS};font-size:230px" fill="${P.red}">NAMEN</text></g>`;
  // weight swings in on a rope, then drops
  if (t > 42.2) {
    const sw = 18 * Math.sin((t - 42.2) * 5) * (1 - prog(t, 42.6, 43.0));
    const fall = t < 42.95 ? 0 : ein(prog(t, 42.95, hit));
    const yy = lerp(lerp(160, 560, eout(prog(t, 42.2, 42.6))), 840, fall);
    const bounce = t > hit ? -40 * Math.abs(Math.sin((t - hit) * 10)) * Math.exp(-(t - hit) * 6) : 0;
    g += `<g transform="rotate(${sw} 540 0)">${fall < 1 ? `<line x1="540" y1="0" x2="540" y2="${yy - 110}" stroke="${P.ink}" stroke-width="5"/>` : ''}
      <g transform="translate(540 ${yy + bounce})"><path d="M -120 -110 L 120 -110 L 160 100 L -160 100 Z" fill="#4A4A4A" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/><circle cx="0" cy="-130" r="30" fill="none" stroke="${P.ink}" stroke-width="12"/><text x="0" y="10" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:80px" fill="#fff">!</text></g></g>`;
  }
  g += burst(540, 950, hit, t, P.ink, 12, 300, 430);
  if (t > hit) g += `<path d="M 330 1130 l 30 40 l -20 30 l 34 40 M 760 1120 l -26 44 l 22 26 l -30 44" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${cl(prog(t, hit, hit + .1))}"/>`;
  return g;
}
function c12(t) {
  let g = words([['keine', 45.16]], 540, 320, 74, t);
  g += kw('BEDEUTUNG', 540, 440, fit('BEDEUTUNG', 130), P.red, 45.44, t, { pulse: 46.0 });
  const bx = 540, by = 700;
  g += brain(bx, by, .75, { t, look: 0, mouth: t > 47.5 ? 'sad' : 'smile' });
  // fishing line & hook
  const down = eio(prog(t, 46.22, 46.9));
  const slip = prog(t, 47.44, 47.8);
  let hy = lerp(820, 980, down) - (t > 46.96 && t < 47.44 ? 30 * eout(prog(t, 46.96, 47.2)) : 0);
  const hookX = 540 + 70 * eout(slip) * Math.sin(prog(t, 47.44, 48.5) * 7) * (1 - prog(t, 47.9, 48.58) * .7);
  if (t >= 47.44) hy = lerp(950, 880, eout(slip));
  if (t > 46.0) g += `<line x1="${bx}" y1="${by + 60}" x2="${hookX}" y2="${hy}" stroke="${P.ink}" stroke-width="4"/>
    <path d="M ${hookX} ${hy} v 46 a 26 26 0 1 1 -52 0 l 12 -10" fill="none" stroke="#7A7F8C" stroke-width="10" stroke-linecap="round"/>`;
  // tag (lifts while hooked, then drops back)
  const lift = t > 46.96 && t < 47.44 ? -30 * eout(prog(t, 46.96, 47.2)) : t >= 47.44 ? -30 * (1 - ein(prog(t, 47.44, 47.6))) + 14 * ring(t, 47.6, 3, 6) : 0;
  const tagY = 1160 + lift;
  g += nameTag(540, tagY, .62, 2 * Math.sin(t * 2), tagName('LENA', 'c12n', 1, 0));
  if (t > 47.6) g += kw('?', 760, 640, 140, P.orange, 47.7, t, { rot: 12 });
  return g;
}
function c13(t) {
  let g = words([['ein', 48.58]], 540, 300, 64, t);
  g += kw('BÄCKER', 470, 690, 120, P.teal, 48.88, t, { pulse: 49.5 });
  g += check(860, 680, 1, 49.76, t);
  // top thought bubble with a bread loaf
  const s1 = back(prog(t, 49.0, 49.3));
  if (s1 > 0) {
    const puff = 1 + .08 * Math.sin(prog(t, 49.3, 49.9) * Math.PI);
    g += `<g transform="translate(540 455) scale(${s1})"><path d="${scallop(0, 0, 210, 110, 12)}" fill="#fff" stroke="${P.ink}" stroke-width="5"/>
      <g transform="scale(${puff})"><path d="M -130 40 Q -150 -50 -40 -70 Q 0 -80 40 -70 Q 150 -50 130 40 Z" fill="#D9984A" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M -70 -40 l 30 40 M -10 -50 l 30 40 M 50 -45 l 30 40" stroke="#F3D19E" stroke-width="10" stroke-linecap="round"/></g></g>`;
  }
  g += `<line x1="160" y1="800" x2="${lerp(160, 920, eout(prog(t, 50.5, 50.8)))}" y2="800" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12" opacity=".5"/>`;
  g += words([['Herr', 50.88]], 540, 900, 64, t);
  g += kw('BECKER', 470, 1290, 120, P.red, 51.29, t, { pulse: 51.6 });
  g += cross(860, 1285, 1, 51.48, t);
  const s2 = back(prog(t, 50.9, 51.2));
  if (s2 > 0) {
    const q = back(prog(t, 51.35, 51.55));
    g += `<g transform="translate(540 1070) scale(${s2})"><path d="${scallop(0, 0, 210, 110, 12)}" fill="#fff" stroke="${P.ink}" stroke-width="5" stroke-dasharray="16 10" stroke-dashoffset="${-t * 40}"/>
      ${q > 0 ? `<text x="0" y="6" text-anchor="middle" dominant-baseline="central" transform="scale(${q}) rotate(${8 * Math.sin(t * 6)})" style="${SANS};font-size:130px" fill="${P.ink}" opacity=".35">?</text>` : ''}</g>`;
  }
  return g;
}
function c14(t) {
  const on = t >= 52.7;
  const bs = back(prog(t, 52.1, 52.35));
  let rays = '';
  if (on) for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * .36, p = eout(prog(t, 52.7, 52.9)); rays += `<line x1="${540 + 170 * Math.cos(a)}" y1="${560 + 170 * Math.sin(a)}" x2="${540 + (170 + 70 * p + 10 * Math.sin(t * 9 + i)) * Math.cos(a)}" y2="${560 + (170 + 70 * p + 10 * Math.sin(t * 9 + i)) * Math.sin(a)}" stroke="${P.orange}" stroke-width="10" stroke-linecap="round"/>`; }
  let g = `<g transform="translate(540 600) scale(${bs}) rotate(${4 * Math.sin(t * 3)}) translate(-540 -600)">${rays}
    <circle cx="540" cy="560" r="140" fill="${on ? P.mark : '#fff'}" stroke="${P.ink}" stroke-width="7"/>
    ${on ? `<circle cx="540" cy="560" r="200" fill="${P.mark}" opacity=".25"/>` : ''}
    <path d="M 500 690 L 500 640 Q 540 600 580 640 L 580 690" fill="none" stroke="${P.ink}" stroke-width="6"/>
    <rect x="480" y="690" width="120" height="80" rx="12" fill="#B7BDC9" stroke="${P.ink}" stroke-width="6"/>
    <line x1="480" y1="718" x2="600" y2="718" stroke="${P.ink}" stroke-width="4"/><line x1="480" y1="744" x2="600" y2="744" stroke="${P.ink}" stroke-width="4"/></g>`;
  g += marker(250, 1000, 580, 44, 52.46, 52.7, t);
  g += kw('TRICK', 540, 980, 220, P.orange, 52.2, t, { pulse: 52.7 });
  g += words([['simpel', 52.7]], 540, 1190, 84, t);
  return g;
}
function c15(t) {
  const loud = 55.0;
  const bs = back(prog(t, 53.49, 53.75)) * (1 + .18 * Math.exp(-Math.max(0, t - loud) * 5) * (t > loud ? 1 : 0));
  const nm = prog(t, 54.0, 54.3);
  let waves = '';
  if (t > loud) for (let k = 0; k < 3; k++) { const p = ((t - loud) * 1.6 + k / 3) % 1; waves += `<path d="M ${780 + 60 * p} ${470 - 80 - 40 * p} Q ${840 + 90 * p} 470 ${780 + 60 * p} ${470 + 80 + 40 * p}" fill="none" stroke="${P.blue}" stroke-width="8" stroke-linecap="round" opacity="${1 - p}"/><path d="M ${300 - 60 * p} ${470 - 80 - 40 * p} Q ${240 - 90 * p} 470 ${300 - 60 * p} ${470 + 80 + 40 * p}" fill="none" stroke="${P.blue}" stroke-width="8" stroke-linecap="round" opacity="${1 - p}"/>`; }
  let g = waves + bubble(540, 470, 460, 220, -60, 170, bs, nm > 0 ? `<text x="0" y="4" text-anchor="middle" dominant-baseline="central" transform="scale(${back(nm)})" style="${SANS};font-size:120px" fill="${P.blue}">LENA</text>` : '', -3);
  g += words([['sofort', 54.26], ['einmal', 54.58]], 540, 760, 70, t);
  g += kw('LAUT', 540, 960, 230, P.blue, loud, t, { from: 2.2 });
  g += kw('WIEDERHOLEN', 540, 1170, fit('WIEDERHOLEN', 130), P.teal, 55.32, t, { pulse: 55.8 });
  // circular arrow drawn after "zurück"
  const ca = eout(prog(t, 55.5, 55.9));
  if (ca > 0) g += `<path d="M 905 1260 A 60 60 0 1 0 850 1320" pathLength="1" stroke-dasharray="${ca} 1" fill="none" stroke="${P.teal}" stroke-width="10" stroke-linecap="round" transform="translate(-60 0)"/>`;
  return g;
}
function c16(t) {
  let g = words([['Freut', 56.12], ['mich,', 56.48]], 540, 480, 82, t);
  const wipe = prog(t, 56.2, 56.62);
  const bo = 1 + .06 * ring(t, 56.6, 3, 6);
  g += `<g transform="translate(540 960) scale(${bo}) translate(-540 -960)">${nameTag(540, 960, 1, 3, tagName('LENA', 'c16n', wipe, 0, P.teal))}</g>`;
  if (wipe > 0 && wipe < 1) g += pen(540 - 240 + 480 * wipe, 1000, 20);
  g += check(860, 1180, 1.1, 56.62, t);
  for (let i = 0; i < 6; i++) {
    const p = prog(t, 56.62 + i * .04, 57.2 + i * .04);
    if (p <= 0 || p >= 1) continue;
    const a = i / 6 * Math.PI * 2 + .5, r = 340 + 140 * eout(p);
    g += `<path d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z" transform="translate(${540 + r * Math.cos(a)} ${960 + r * .7 * Math.sin(a)}) scale(${1.4 * (1 - p)})" fill="${P.mark}" stroke="${P.ink}" stroke-width="3"/>`;
  }
  return g;
}
function c17(t) {
  let g = kw('ZWEITE', 540, 470, 170, P.teal, 58.9, t, { pulse: 59.2 });
  g += kw('CHANCE', 540, 640, 170, P.teal, 59.2, t);
  g += marker(260, 700, 560, 34, 59.4, 59.7, t);
  const f = eout(prog(t, 58.28, 59.3));
  const bs = back(prog(t, 57.34, 57.6));
  g += `<g transform="translate(540 1000) scale(${bs}) translate(-540 -1000)">${brain(270, 1010, .8, { t, mouth: 'smile', look: 14, tilt: f >= 1 ? 6 * Math.sin(t * 6) : 0 })}${meter(420, 970, 440, 80, f, P.teal, t)}</g>`;
  g += check(640, 1220, 1.1, 59.3, t);
  if (t < 58.9) g += words([['deinem', 58.02], ['Gehirn', 58.28]], 540, 560, 76, t);
  return g;
}
function c18(t) {
  const names = ['ANNA', 'TOM', 'JONAS', 'MIA', 'PAUL', 'SARA', 'BECKER'];
  const T = [60.0, 60.28, 60.6, 60.88, 61.02, 61.26, 61.52];
  const endT = 62.9;
  const away = eio(prog(t, endT, endT + .3));
  let pile = '', cnt = 0;
  for (let i = 0; i < 7; i++) {
    if (t < T[i]) continue;
    cnt++;
    const p = prog(t, T[i], T[i] + .3);
    const y = lerp(-300, 1200 - i * 46, ein(p)) + (p >= 1 ? 8 * ring(t, T[i] + .3, 3, 8) : 0);
    const x = 540 + (hash(i + 2) - .5) * 220 - away * 1300;
    const er = prog(t, T[i] + .5, T[i] + .8);
    pile += nameTag(x, y, .5, (hash(i + 5) - .5) * 24, tagName(names[i], 'c18n' + i, 1, er, P.ink));
  }
  let g = pile;
  const lead = words([['Wie', 59.88], ['viele', 60.0]], 540, 300, 80, t);
  g += `<g opacity="${1 - away}">${lead}${cnt > 0 ? kw(String(cnt), 540, 540, 260, P.red, 60.0, t, { pulse: T[cnt - 1] }) : ''}${kw('?', 760, 500, 180, P.orange, 61.6, t, { rot: 10 })}</g>`;
  // ending beat: back to the opening composition (loop)
  if (t > endT) {
    const ps = back(prog(t, endT + .1, endT + .45));
    g += kw('NAME?', 540, 520, 230, P.blue, endT + .1, t);
    g += `<g transform="translate(${1300 * (1 - eout(prog(t, endT, endT + .35)))} ${-100 * (1 - ps)})">${nameTag(540, 1010, 1, -4)}</g>`;
  }
  return g;
}
const CARDF = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18];

function scene(t) {
  let k = 0;
  for (let i = 0; i < CARDS.length; i++) if (t >= CARDS[i]) k = i;
  const p = k > 0 ? eout(prog(t, CARDS[k], CARDS[k] + .2)) : 1;
  const dir = k % 2 ? 1 : -1;
  let sh = 0;
  for (const [t0, a] of SHAKES) if (t >= t0 && t < t0 + .6) sh += a * Math.exp(-(t - t0) * 9);
  const sx = sh * Math.sin(t * 91), sy = sh * Math.cos(t * 77);
  const shift = -(k * 1100 * dir) + dir * -1100 * (p - 1);
  let body = '';
  if (p < 1) body += `<g transform="translate(${-dir * 1100 * p} 0)">${CARDF[k - 1](CARDS[k] - .001)}</g>`;
  body += `<g transform="translate(${dir * 1100 * (1 - p)} 0)">${CARDF[k](t)}</g>`;
  return `${paper(t, shift)}<g transform="translate(${sx} ${sy})">${body}</g>${progressBar(t)}`;
}

const __style = {"dust": false, "vignette": false, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
