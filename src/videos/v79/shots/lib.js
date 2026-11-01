// v79 shared drawing kit: warm flat-vector style, two fixed characters, evening kitchen set, cards, props.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ol: '#3a281f', cream: '#f8eedd', ink: '#33231b', accent: '#d9603b', accentD: '#b04a2c', gold: '#f2b24c',
  wall: '#cf9364', wallHi: '#e6b17f', wallSh: '#a9714a', win: '#1b2440', winHi: '#2d3c63',
  wood: '#9a5f38', woodHi: '#bd7f4c', woodSh: '#6f4126', cab: '#7f9a84', cabSh: '#647c69', counter: '#efe2cc',
  wSkin: '#f2c39e', wSkinSh: '#dea37e', wHair: '#6e4429', wHairHi: '#8f5c3a', sweater: '#5e7845', sweaterSh: '#4b6136', sweaterHi: '#6f8b53',
  mSkin: '#e2a982', mSkinSh: '#c68b65', mHair: '#1e1a1c', shirt: '#f4f0e7', shirtSh: '#d8d0c1', jacket: '#2e3d5c', jacketSh: '#223049',
  red: '#d8423a', green: '#5f9a58', blue: '#4f78b8',
};
const OL = K.ol;
export const TEXT = (size, fill = K.ink, anchor = 'middle', w = 900) => `font-family="Inter" font-weight="${w}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" style="font-family:'Inter';font-weight:${w}"`;

export function cam(svg, z = 1, cx = 540, cy = 960) {
  return `<g transform="translate(540 960) scale(${z}) translate(${-cx} ${-cy})">${svg}</g>`;
}
export const pop = (t, t0, d = .35) => back(prog(t, t0, t0 + d), 2.2);
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
// talking mouth amount 0..1 while speaking between a and b
export const talk = (t, a, b, f = 9) => (t >= a && t < b) ? .35 + .65 * Math.abs(Math.sin((t - a) * f)) : 0;
export const blink = (t, seed = 0) => { const p = (t + seed * 1.37) % 3.3; return p > 3.15 ? 1 - Math.abs(p - 3.225) / .075 : 0; };

// two-bone arm, elbow bent outward (side -1 left, +1 right)
function ik(S, H, L1, L2, side) {
  let dx = H[0] - S[0], dy = H[1] - S[1]; let d = Math.hypot(dx, dy) || 1;
  const dm = Math.min(d, (L1 + L2) * .995); const ux = dx / d, uy = dy / d;
  const a = (L1 * L1 - L2 * L2 + dm * dm) / (2 * dm), h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  const P = [S[0] + ux * a, S[1] + uy * a]; let px = -uy, py = ux;
  if (px * side * .5 + py < 0) { px = -px; py = -py; }
  const E = [P[0] + px * h, P[1] + py * h];
  const Hr = [S[0] + ux * dm, S[1] + uy * dm];
  return { E, H: d > dm ? Hr : H };
}
function handShape(H, E, kind, skin, sh) {
  const ang = Math.atan2(H[1] - E[1], H[0] - E[0]) * 180 / Math.PI - 90;
  let g;
  if (kind === 'palm') g = `<g transform="translate(${H[0]} ${H[1]}) rotate(${ang + 180})"><rect x="-24" y="-8" width="48" height="44" rx="18" fill="${skin}" stroke="${OL}" stroke-width="4"/>
    ${[-17, -6, 5, 16].map((x, i) => `<rect x="${x - 5}" y="${30}" width="11" height="${30 - Math.abs(i - 1.5) * 4}" rx="5.5" fill="${skin}" stroke="${OL}" stroke-width="3.5"/>`).join('')}
    <rect x="18" y="-2" width="26" height="12" rx="6" fill="${skin}" stroke="${OL}" stroke-width="3.5" transform="rotate(35 20 4)"/></g>`;
  else if (kind === 'point') g = `<g transform="translate(${H[0]} ${H[1]}) rotate(${ang + 180})"><rect x="-6" y="24" width="13" height="46" rx="6.5" fill="${skin}" stroke="${OL}" stroke-width="3.5"/><rect x="-22" y="-10" width="44" height="42" rx="18" fill="${skin}" stroke="${OL}" stroke-width="4"/></g>`;
  else g = `<g transform="translate(${H[0]} ${H[1]}) rotate(${ang})"><ellipse cx="0" cy="6" rx="27" ry="24" fill="${skin}" stroke="${OL}" stroke-width="4"/><path d="M -14 14 q 14 8 28 0" stroke="${sh}" stroke-width="4" fill="none"/></g>`;
  return g;
}
function arm(S, H, side, o) {
  const { E, H: Hh } = ik(S, H, 150, 145, side);
  const sleeve = o.sleeve, sleeveSh = o.sleeveSh;
  const fore = o.rolled ? `<path d="M ${E[0]} ${E[1]} L ${Hh[0]} ${Hh[1]}" stroke="${OL}" stroke-width="46" stroke-linecap="round"/><path d="M ${E[0]} ${E[1]} L ${Hh[0]} ${Hh[1]}" stroke="${o.skin}" stroke-width="38" stroke-linecap="round"/>`
    : `<path d="M ${E[0]} ${E[1]} L ${Hh[0]} ${Hh[1]}" stroke="${OL}" stroke-width="58" stroke-linecap="round"/><path d="M ${E[0]} ${E[1]} L ${Hh[0]} ${Hh[1]}" stroke="${sleeve}" stroke-width="50" stroke-linecap="round"/>`;
  const upper = `<path d="M ${S[0]} ${S[1]} L ${E[0]} ${E[1]}" stroke="${OL}" stroke-width="64" stroke-linecap="round"/><path d="M ${S[0]} ${S[1]} L ${E[0]} ${E[1]}" stroke="${sleeve}" stroke-width="56" stroke-linecap="round"/><path d="M ${lerp(S[0], E[0], .2) + side * 14} ${lerp(S[1], E[1], .2)} L ${lerp(S[0], E[0], .85) + side * 14} ${lerp(S[1], E[1], .85)}" stroke="${sleeveSh}" stroke-width="12" stroke-linecap="round" opacity=".7"/>`;
  const cuffP = [lerp(E[0], Hh[0], o.rolled ? .02 : .82), lerp(E[1], Hh[1], o.rolled ? .02 : .82)];
  const ca = Math.atan2(Hh[1] - E[1], Hh[0] - E[0]) * 180 / Math.PI;
  const cuff = o.rolled ? `<rect x="-14" y="-31" width="28" height="62" rx="12" fill="${sleeve}" stroke="${OL}" stroke-width="4" transform="translate(${cuffP[0]} ${cuffP[1]}) rotate(${ca})"/>`
    : `<rect x="-12" y="-27" width="24" height="54" rx="9" fill="${o.cuff}" stroke="${OL}" stroke-width="4" transform="translate(${cuffP[0]} ${cuffP[1]}) rotate(${ca})"/>`;
  const hh = [Hh[0] + (Hh[0] - E[0]) / 145 * 10, Hh[1] + (Hh[1] - E[1]) / 145 * 10];
  return upper + fore + cuff + handShape(hh, E, o.hand, o.skin, o.skinSh);
}

function eyes(o, skin, id, female) {
  const tx = (o.turn || 0) * 18, lk = cl(o.look || 0, -1, 1) * 7, lky = cl(o.lookY || 0, -1, 1) * 5;
  const lid = cl(Math.max(o.lid || 0, o.blink || 0), 0, 1), wide = o.wide || 0;
  const ry = 13 + wide * 4;
  let s = '';
  for (const sx of [-1, 1]) {
    const cx = sx * 35 + tx, cy = -452;
    const cid = `${id}e${sx > 0 ? 'r' : 'l'}`;
    s += `<clipPath id="${cid}"><ellipse cx="${cx}" cy="${cy}" rx="18" ry="${ry}"/></clipPath>
      <ellipse cx="${cx}" cy="${cy}" rx="18" ry="${ry}" fill="#fffaf2"/>
      <g clip-path="url(#${cid})"><circle cx="${cx + lk}" cy="${cy + lky + 1}" r="10" fill="${female ? '#5a3a22' : '#3a2a1e'}"/><circle cx="${cx + lk}" cy="${cy + lky + 1}" r="5" fill="#1a110c"/><circle cx="${cx + lk + 3}" cy="${cy + lky - 3}" r="2.6" fill="#fff"/>
      <rect x="${cx - 20}" y="${cy - ry - 2}" width="40" height="${(2 * ry + 4) * lid}" fill="${skin}"/></g>
      <path d="M ${cx - 19} ${cy - ry * (1 - lid) * .35 + lid * ry * 1.2 - 1} Q ${cx} ${cy - ry * 1.25 + lid * ry * 2.1} ${cx + 19} ${cy - ry * (1 - lid) * .35 + lid * ry * 1.2 - 1}" stroke="${OL}" stroke-width="${female ? 5 : 4.5}" fill="none" stroke-linecap="round"/>
      ${female ? `<path d="M ${cx + sx * 18} ${cy - 4 + lid * 10} l ${sx * 7} -5" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>` : ''}`;
  }
  // brows: brow -1 stern, 0 calm, 1 worried; browY raises both
  const b = o.brow || 0, by = -484 - (o.browY || 0) * 10 - wide * 6;
  for (const sx of [-1, 1]) {
    const inner = [sx * 14 + tx, by + (b < 0 ? 10 * -b : -11 * b)], outer = [sx * 54 + tx, by + (b > 0 ? 5 * b : -4 * -b)];
    s += `<path d="M ${inner[0]} ${inner[1]} Q ${(inner[0] + outer[0]) / 2} ${Math.min(inner[1], outer[1]) - 7} ${outer[0]} ${outer[1]}" stroke="${female ? K.wHair : K.mHair}" stroke-width="${female ? 7 : 10}" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
function mouth(o, x, y, female) {
  const m = o.mouth || 'neutral', a = cl(o.talk || 0, 0, 1);
  if (a > 0.02 || m === 'open') { const h = m === 'open' ? 16 : 5 + a * 13; return `<path d="M ${x - 20} ${y - 2} Q ${x} ${y - 6} ${x + 20} ${y - 2} Q ${x} ${y + h * 1.6} ${x - 20} ${y - 2} Z" fill="#7a2f2a" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M ${x - 10} ${y + h * .9} q 10 -5 20 0" stroke="#e07a6e" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
  if (m === 'smile') return `<path d="M ${x - 22} ${y - 4} Q ${x} ${y + 14} ${x + 22} ${y - 4}" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (m === 'tight') return `<path d="M ${x - 17} ${y} L ${x + 17} ${y}" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`;
  if (m === 'frown') return `<path d="M ${x - 20} ${y + 6} Q ${x} ${y - 8} ${x + 20} ${y + 6}" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (m === 'wavy') return `<path d="M ${x - 22} ${y + 2} q 7 -7 14 0 q 7 7 14 0 q 7 -7 14 0" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<path d="M ${x - 18} ${y} Q ${x} ${y + 6} ${x + 18} ${y}" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
}

// Common: returns {body, arms}. (x,y) = bottom centre of the torso at table level, s = scale.
// o: t (breathing), turn, look, lookY, lid, blink, brow, browY, wide, mouth, talk, tilt (deg), dy (head drop), lean (deg),
//    hL, hR = hand targets in local coords, handL/handR = 'rest'|'palm'|'point', id (unique clip prefix), sweat 0..1
function figure(x, y, s, o, female) {
  const t = o.t || 0, br = Math.sin(t * 2.1 + (female ? 0 : 1.3)) * 3;
  const skin = female ? K.wSkin : K.mSkin, skinSh = female ? K.wSkinSh : K.mSkinSh;
  const id = o.id || (female ? 'w' : 'm');
  const sw = female ? 150 : 164;
  const hy = -440 + br + (o.dy || 0), tilt = o.tilt || 0;
  const head = female ? `<ellipse cx="0" cy="-440" rx="84" ry="98" fill="${skin}" stroke="${OL}" stroke-width="5"/>`
    : `<path d="M -84 -470 C -86 -560 86 -560 84 -470 L 80 -400 C 70 -345 30 -330 0 -330 C -30 -330 -70 -345 -80 -400 Z" fill="${skin}" stroke="${OL}" stroke-width="5"/>`;
  const ear = sx => `<ellipse cx="${sx * (female ? 84 : 84)}" cy="-440" rx="15" ry="24" fill="${skin}" stroke="${OL}" stroke-width="4.5"/>`;
  const tx = (o.turn || 0) * 18;
  const hairBack = female ? `<path d="M -98 -430 C -110 -560 110 -560 98 -430 C 96 -400 80 -386 60 -382 L -60 -382 C -80 -386 -96 -400 -98 -430 Z" fill="${K.wHair}" stroke="${OL}" stroke-width="5"/>
      <path d="M ${54 - tx} -372 C ${96 - tx} -366 ${112 - tx} -320 ${100 - tx} -270 C ${92 - tx} -246 ${70 - tx} -262 ${74 - tx} -290 C ${78 - tx} -322 ${64 - tx} -346 ${46 - tx} -356 Z" fill="${K.wHair}" stroke="${OL}" stroke-width="5"/>
      <circle cx="${56 - tx}" cy="-366" r="11" fill="${K.accent}" stroke="${OL}" stroke-width="4"/>` : '';
  const hairFront = female ? `<path d="M -94 -432 C -104 -556 104 -560 94 -432 C 84 -500 40 -520 ${-6 + tx} -506 C -40 -522 -84 -496 -94 -432 Z" fill="${K.wHair}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M ${-6 + tx} -506 C 20 -528 60 -530 78 -500" stroke="${K.wHairHi}" stroke-width="7" fill="none" stroke-linecap="round"/>`
    : `<path d="M -88 -462 C -96 -575 96 -580 88 -462 C 84 -500 66 -514 ${36 + tx} -506 C 6 -520 -50 -515 -88 -462 Z" fill="${K.mHair}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M -86 -470 L -84 -430 L -76 -440 Z M 86 -470 L 84 -430 L 76 -440 Z" fill="${K.mHair}"/>
      <path d="M -60 -380 C -40 -340 40 -340 60 -380" stroke="${skinSh}" stroke-width="10" fill="none" opacity=".35"/>`;
  const face = `${eyes(o, skin, id, female)}
      <path d="M ${tx + 2} -440 q 8 22 -6 28" stroke="${skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${female ? `<ellipse cx="${-50 + tx}" cy="-410" rx="16" ry="9" fill="#e8907a" opacity=".45"/><ellipse cx="${50 + tx}" cy="-410" rx="16" ry="9" fill="#e8907a" opacity=".45"/>` : ''}
      ${mouth(o, tx * .8, female ? -392 : -386, female)}
      ${o.sweat ? `<path d="M ${70 + tx * .3} -500 q 12 22 0 30 q -12 -8 0 -30 Z" fill="#bfe4ff" stroke="${OL}" stroke-width="3" opacity="${o.sweat}" transform="translate(0 ${(1 - o.sweat) * -10})"/>` : ''}`;
  const headG = `<g transform="translate(0 ${hy + 440}) rotate(${tilt} 0 -360)">${hairBack}${ear(-1)}${ear(1)}${head}${face}${hairFront}</g>`;
  const neck = `<rect x="-28" y="-370" width="56" height="80" fill="${skinSh}" stroke="${OL}" stroke-width="5"/>`;
  const torso = female
    ? `<path d="M ${-sw} 40 L ${-sw} -200 Q ${-sw} -292 -64 -300 L 64 -300 Q ${sw} -292 ${sw} -200 L ${sw} 40 Z" fill="${K.sweater}" stroke="${OL}" stroke-width="5"/>
       <path d="M -46 -300 Q 0 -262 46 -300" stroke="${K.sweaterHi}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M -46 -300 Q 0 -262 46 -300" stroke="${OL}" stroke-width="4" fill="none"/>
       ${[-90, -45, 0, 45, 90].map(x => `<path d="M ${x} -230 L ${x} 30" stroke="${K.sweaterSh}" stroke-width="5" opacity=".45"/>`).join('')}`
    : `<path d="M ${-sw} 40 L ${-sw} -200 Q ${-sw} -290 -64 -302 L 64 -302 Q ${sw} -290 ${sw} -200 L ${sw} 40 Z" fill="${K.shirt}" stroke="${OL}" stroke-width="5"/>
       <path d="M -30 -302 L 0 -240 L 30 -302 Z" fill="${skinSh}" stroke="${OL}" stroke-width="4"/>
       <path d="M -34 -306 L -60 -250 L -8 -262 Z M 34 -306 L 60 -250 L 8 -262 Z" fill="${K.shirt}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>
       <path d="M 0 -240 L 0 40" stroke="${K.shirtSh}" stroke-width="5"/>${[-200, -140, -80, -20].map(yy => `<circle cx="9" cy="${yy}" r="4" fill="${K.shirtSh}"/>`).join('')}
       <path d="M ${sw - 30} -230 L ${sw - 30} 30 M ${-sw + 30} -230 L ${-sw + 30} 30" stroke="${K.shirtSh}" stroke-width="8" opacity=".6"/>`;
  const lean = o.lean || 0;
  const tr = `translate(${x} ${y}) scale(${s}) rotate(${lean} 0 0)`;
  const SL = [-sw + 22, -262 + br * .6], SR = [sw - 22, -262 + br * .6];
  const armO = female ? { sleeve: K.sweater, sleeveSh: K.sweaterSh, cuff: K.sweaterHi, skin, skinSh, rolled: false } : { sleeve: K.shirt, sleeveSh: K.shirtSh, cuff: K.shirt, skin, skinSh, rolled: true };
  const hL = o.hL || [-80, -24], hR = o.hR || [80, -24];
  const arms = `<g transform="${tr}">${arm(SL, hL, -1, { ...armO, hand: o.handL || 'rest' })}${arm(SR, hR, 1, { ...armO, hand: o.handR || 'rest' })}</g>`;
  const body = `<g transform="${tr}">${torso}${neck}${headG}</g>`;
  return { body, arms };
}
export const woman = (x, y, s, o = {}) => figure(x, y, s, o, true);
export const man = (x, y, s, o = {}) => figure(x, y, s, o, false);

export function chair(x, y, s, jacket) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-150" y="-470" width="300" height="420" rx="40" fill="${K.woodSh}" stroke="${OL}" stroke-width="5"/>
    <rect x="-120" y="-440" width="240" height="40" rx="18" fill="${K.wood}"/>
    ${jacket ? `<path d="M 60 -476 C 140 -486 190 -470 186 -420 L 196 -120 L 112 -110 L 104 -380 C 90 -420 70 -440 60 -476 Z" fill="${K.jacket}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><path d="M 120 -440 L 150 -380 L 132 -150" stroke="${K.jacketSh}" stroke-width="8" fill="none"/>` : ''}</g>`;
}

// evening kitchen / dining room. o: T (table top y), dim 0..1, clock (time in hours, or null), mugs
export function kitchen(o = {}) {
  const dim = o.dim || 0, clock = o.clock;
  return `<defs><radialGradient id="kLamp" cx=".5" cy=".18" r=".7"><stop offset="0" stop-color="#ffe2a6" stop-opacity=".95"/><stop offset=".45" stop-color="${K.wallHi}" stop-opacity=".5"/><stop offset="1" stop-color="${K.wallSh}" stop-opacity="0"/></radialGradient>
    <linearGradient id="kWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151c33"/><stop offset="1" stop-color="${K.winHi}"/></linearGradient></defs>
    <rect x="-400" y="-400" width="1880" height="2720" fill="${K.wallSh}"/><rect width="1080" height="1920" fill="url(#kLamp)"/>
    <g><rect x="0" y="250" width="400" height="250" fill="${K.counter}" stroke="${OL}" stroke-width="5"/>
      <path d="M 133 250 L 133 500 M 266 250 L 266 500" stroke="${OL}" stroke-width="4"/>${[66, 200, 333].map(x => `<rect x="${x - 4}" y="440" width="8" height="34" rx="4" fill="${K.woodSh}"/>`).join('')}
      <rect x="0" y="500" width="400" height="330" fill="#e9d6b8"/>${[0, 1, 2, 3, 4].map(i => `<path d="M 0 ${540 + i * 60} L 400 ${540 + i * 60}" stroke="#d8c09d" stroke-width="3"/>`).join('')}
      <rect x="-10" y="820" width="430" height="34" rx="6" fill="${K.counter}" stroke="${OL}" stroke-width="5"/>
      <rect x="0" y="854" width="400" height="400" fill="${K.cab}" stroke="${OL}" stroke-width="5"/><path d="M 200 854 L 200 1250" stroke="${OL}" stroke-width="4"/>
      <path d="M 70 820 L 70 760 Q 70 730 100 730 L 150 730 Q 180 730 180 760 L 180 820 Z" fill="${K.accent}" stroke="${OL}" stroke-width="5"/><rect x="88" y="716" width="74" height="16" rx="8" fill="${K.ol}"/>
      <path d="M 270 820 Q 270 780 330 780 Q 390 780 390 820 Z" fill="#c9784a" stroke="${OL}" stroke-width="4"/></g>
    <g><rect x="620" y="330" width="360" height="560" rx="10" fill="${K.counter}" stroke="${OL}" stroke-width="5"/><rect x="642" y="352" width="316" height="516" fill="url(#kWin)"/>
      ${[[680, 700], [720, 700], [860, 640], [900, 640], [860, 700]].map(([a, b], i) => `<rect x="${a}" y="${b}" width="22" height="26" fill="#f6c76a" opacity="${.5 + .3 * hash(i)}"/>`).join('')}
      <path d="M 642 760 L 700 680 L 760 690 L 800 600 L 958 610 L 958 868 L 642 868 Z" fill="#11172b" opacity=".8"/>
      <ellipse cx="760" cy="470" rx="40" ry="18" fill="#ffe2a6" opacity=".25"/>
      <path d="M 800 352 L 800 868 M 642 610 L 958 610" stroke="${K.counter}" stroke-width="14"/></g>
    ${clock !== undefined && clock !== null ? clockFace(110, 160, 58, clock) : ''}
    <g><path d="M 540 0 L 540 250" stroke="${OL}" stroke-width="5"/><path d="M 440 330 Q 440 250 540 246 Q 640 250 640 330 Z" fill="${K.gold}" stroke="${OL}" stroke-width="5"/><ellipse cx="540" cy="334" rx="40" ry="12" fill="#fff4cf"/></g>
    ${dim ? `<rect width="1080" height="1920" fill="#20140e" opacity="${dim}"/>` : ''}`;
}
export function table(T = 1180, o = {}) {
  return `<rect x="-400" y="${T - 34}" width="1880" height="${2400 - T}" fill="${K.wood}" stroke="${OL}" stroke-width="5"/>
    <rect x="-400" y="${T - 34}" width="1880" height="36" fill="${K.woodHi}" stroke="${OL}" stroke-width="5"/>
    ${[0, 1, 2].map(i => `<path d="M ${-20} ${T + 60 + i * 90} C 300 ${T + 40 + i * 90} 700 ${T + 90 + i * 90} 1100 ${T + 60 + i * 90}" stroke="${K.woodSh}" stroke-width="4" fill="none" opacity=".5"/>`).join('')}
    ${o.mugs === false ? '' : `${mug(470, T - 20, '#e8dccb')}${mug(640, T - 20, K.accent)}`}`;
}
export function mug(x, y, col) {
  return `<g transform="translate(${x} ${y})"><path d="M 30 -60 q 34 0 34 26 q 0 24 -34 22" stroke="${OL}" stroke-width="12" fill="none"/><path d="M 30 -60 q 34 0 34 26 q 0 24 -34 22" stroke="${col}" stroke-width="5" fill="none"/>
    <path d="M -34 -78 L 34 -78 L 30 0 Q 0 8 -30 0 Z" fill="${col}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-78" rx="34" ry="8" fill="#5b3a26" stroke="${OL}" stroke-width="4"/></g>`;
}
export function clockFace(cx, cy, r, hours) {
  const m = (hours % 1) * 360, h = (hours % 12) / 12 * 360;
  return `<g transform="translate(${cx} ${cy})"><circle r="${r}" fill="${K.cream}" stroke="${OL}" stroke-width="6"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="${-r + 8}" width="6" height="${i % 3 ? 8 : 14}" fill="${OL}" transform="rotate(${i * 30})"/>`).join('')}
    <rect x="-4" y="${-r * .5}" width="8" height="${r * .5}" rx="4" fill="${OL}" transform="rotate(${h})"/><rect x="-3" y="${-r * .78}" width="6" height="${r * .78}" rx="3" fill="${K.accent}" transform="rotate(${m})"/><circle r="7" fill="${OL}"/></g>`;
}

// standard two-shot at the table
export function twoShot(t, wo = {}, mo = {}, o = {}) {
  const T = o.T || 1300, wx = o.wx ?? 285, mx = o.mx ?? 790, s = o.s || 1.25;
  const W = woman(wx, T + 20, o.ws || s, { t, ...wo }), M = man(mx, T + 20, o.ms || s, { t, ...mo });
  const chairs = `${chair(wx, T + 20, o.ws || s, false)}${chair(mx, T + 20, o.ms || s, true)}`;
  const bodies = o.manFront ? `${W.body}${M.body}` : `${M.body}${W.body}`;
  return `${kitchen(o)}${o.noChairs ? '' : chairs}${o.under || ''}${bodies}${table(T, o)}${W.arms}${M.arms}`;
}

// persistent method chip at the top
export function chip(text, a = 1) {
  const w = text.length * 25 + 70;
  return `<g opacity="${a}"><rect x="${540 - w / 2}" y="132" width="${w}" height="70" rx="35" fill="${K.ink}" opacity=".88"/><text x="540" y="180" ${TEXT(38, K.cream)}>${text}</text></g>`;
}

// numbered method card over a dimmed kitchen
export function card(t, t0, t1, num, words, icon) {
  const a = pop(t, t0 + .05, .45), out = 1 - fade(t, t1 - .25, .25);
  const lines = words.length > 12 ? words.split(' ') : [words];
  const fs = 92;
  const iy = 740 + Math.sin(t * 2.4) * 6;
  return `<g filter="url(#blur8)">${twoShot(t, { look: 1, mouth: 'neutral' }, { look: -1 }, {})}</g><rect width="1080" height="1920" fill="#22150f" opacity=".62"/>
    <g opacity="${out}" transform="translate(540 820) scale(${.6 + .4 * a}) translate(-540 -820)" >
      <rect x="110" y="420" width="860" height="${lines.length > 1 ? 820 : 720}" rx="60" fill="${K.cream}" stroke="${OL}" stroke-width="6"/>
      <circle cx="540" cy="420" r="96" fill="${K.accent}" stroke="${OL}" stroke-width="6"/><text x="540" y="458" ${TEXT(112, K.cream)}>${num}</text>
      <g transform="translate(540 ${iy}) scale(${eout(prog(t, t0 + .3, t0 + .8))})">${icon(t)}</g>
      ${lines.map((l, i) => `<text x="540" y="${1010 + i * 100}" ${TEXT(fs)}>${l}</text>`).join('')}
    </g>`;
}

// speech bubble (rounded rect) with tail pointing at (tx,ty)
export function speech(x, y, w, h, tx, ty, inner = '', o = {}) {
  const fill = o.fill || '#fffaf0', st = o.stroke || OL;
  const bx = cl(tx, x + 40, x + w - 40), by = ty < y ? y : y + h;
  const tail = `M ${bx - 26} ${by} L ${tx} ${ty} L ${bx + 26} ${by}`;
  return `<g><path d="${tail}" fill="${fill}" stroke="${st}" stroke-width="6" stroke-linejoin="round"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(46, h / 2)}" fill="${fill}" stroke="${st}" stroke-width="6"/>
    <path d="M ${bx - 22} ${by} L ${bx + 22} ${by}" stroke="${fill}" stroke-width="9"/>${inner}</g>`;
}
export function thought(cx, cy, rx, ry, fromX, fromY, inner = '') {
  let d = ''; const n = 12;
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; d += `<ellipse cx="${cx + Math.cos(a) * rx * .82}" cy="${cy + Math.sin(a) * ry * .78}" rx="${rx * .34}" ry="${ry * .34}" fill="#fffaf0" stroke="${OL}" stroke-width="6"/>`; }
  const dots = [0.25, 0.5, 0.75].map((f, i) => `<circle cx="${lerp(fromX, cx, f * .55)}" cy="${lerp(fromY, cy + ry * .7, f * .55 + .1)}" r="${10 + i * 6}" fill="#fffaf0" stroke="${OL}" stroke-width="5"/>`).join('');
  return `<g>${dots}${d}<ellipse cx="${cx}" cy="${cy}" rx="${rx * .86}" ry="${ry * .82}" fill="#fffaf0"/>${inner}</g>`;
}

// ---------- props / icons (centred at 0,0, ~200px) ----------
export const icons = {
  mute: () => `<path d="M -100 -70 Q -100 -100 -70 -100 L 70 -100 Q 100 -100 100 -70 L 100 20 Q 100 50 70 50 L -10 50 L -50 90 L -45 50 L -70 50 Q -100 50 -100 20 Z" fill="#fff" stroke="${OL}" stroke-width="7"/><path d="M -60 -50 L 60 -50 M -60 0 L 30 0" stroke="#d8c8b0" stroke-width="12" stroke-linecap="round"/><path d="M -80 70 L 80 -120" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`,
  rewind: () => `<circle r="105" fill="#fff" stroke="${OL}" stroke-width="7"/><path d="M 0 -50 L -60 0 L 0 50 Z M 60 -50 L 0 0 L 60 50 Z" fill="${K.accent}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`,
  third: () => `${tinyPerson(-70, 60, .9, '#8a6fb0', '#c38b5a')}${tinyPerson(70, 60, .9, K.shirt, K.mHair)}<path d="M -20 -80 Q 0 -110 20 -80" stroke="${OL}" stroke-width="7" fill="none"/><path d="M -10 -60 L 10 -60" stroke="${OL}" stroke-width="7" stroke-linecap="round"/>`,
  door: (t) => `<rect x="-80" y="-110" width="160" height="220" fill="#2b2230" stroke="${OL}" stroke-width="7"/><path d="M -80 -110 L 30 -90 L 30 130 L -80 110 Z" fill="${K.woodHi}" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/><circle cx="12" cy="10" r="8" fill="${OL}"/><path d="M 40 -100 L 80 -110 L 80 110 L 40 120 Z" fill="#ffe2a6" opacity=".8"/>`,
  clock: (t) => clockFace(0, 0, 105, 18 + t * .4),
  ruler: () => `<g transform="rotate(-30)"><rect x="-130" y="-34" width="260" height="68" rx="8" fill="${K.gold}" stroke="${OL}" stroke-width="7"/>${Array.from({ length: 11 }, (_, i) => `<path d="M ${-115 + i * 23} -34 L ${-115 + i * 23} ${i % 5 ? -14 : 0}" stroke="${OL}" stroke-width="5"/>`).join('')}</g>`,
};
export function tinyPerson(x, y, s, shirt, hair) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -48 40 L -48 -10 Q -48 -40 -20 -42 L 20 -42 Q 48 -40 48 -10 L 48 40 Z" fill="${shirt}" stroke="${OL}" stroke-width="5"/><circle cx="0" cy="-80" r="34" fill="${K.wSkin}" stroke="${OL}" stroke-width="5"/><path d="M -36 -84 C -40 -126 40 -126 36 -84 C 20 -100 -20 -100 -36 -84 Z" fill="${hair}" stroke="${OL}" stroke-width="4"/></g>`;
}
export function house(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -70 0 L -70 -70 L 0 -125 L 70 -70 L 70 0 Z" fill="${K.cream}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M -88 -60 L 0 -135 L 88 -60" stroke="${K.accent}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="-20" y="-50" width="40" height="50" fill="${K.woodSh}" stroke="${OL}" stroke-width="5"/><rect x="28" y="-60" width="26" height="24" fill="#f6c76a" stroke="${OL}" stroke-width="4"/></g>`;
}
export function road(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 0 L -14 -130 L 14 -130 L 40 0 Z" fill="#59606e" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M 0 -120 L 0 -100 M 0 -80 L 0 -55 M 0 -35 L 0 -5" stroke="#f6e7a0" stroke-width="7"/><rect x="40" y="-120" width="10" height="120" fill="${OL}"/><circle cx="45" cy="-126" r="14" fill="${K.gold}" stroke="${OL}" stroke-width="4"/></g>`;
}
export function office(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-55" y="-140" width="110" height="140" fill="${K.blue}" stroke="${OL}" stroke-width="6"/>${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${-42 + c * 30}" y="${-126 + r * 30}" width="20" height="20" fill="#cfe0f5"/>`).join('')).join('')}<rect x="-14" y="-24" width="28" height="24" fill="${OL}"/></g>`;
}
export function mall(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-150" y="-150" width="300" height="150" fill="#e9d2a8" stroke="${OL}" stroke-width="6"/><path d="M -170 -150 L 170 -150 L 150 -195 L -150 -195 Z" fill="${K.accent}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    ${[-110, -40, 30, 100].map((xx, i) => `<rect x="${xx - 24}" y="-130" width="58" height="60" fill="#bfe0ee" stroke="${OL}" stroke-width="4"/>`).join('')}
    <rect x="-40" y="-62" width="80" height="62" fill="#9fc9dc" stroke="${OL}" stroke-width="5"/><path d="M 0 -62 L 0 0" stroke="${OL}" stroke-width="4"/>
    <path d="M -120 -40 L -80 -40 L -84 -6 L -116 -6 Z" fill="${K.gold}" stroke="${OL}" stroke-width="4"/><path d="M 84 -40 L 124 -40 L 120 -6 L 88 -6 Z" fill="#c87fa8" stroke="${OL}" stroke-width="4"/></g>`;
}
export function car(x, y, s = 1, o = {}) {
  const body = o.color || K.accent;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.flip ? -1 : 1)} ${s})"><path d="M -150 -30 L -150 -70 Q -150 -90 -120 -92 L -80 -94 L -40 -150 L 70 -150 L 120 -94 Q 160 -90 160 -60 L 160 -30 Z" fill="${body}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M -30 -140 L 10 -140 L 10 -96 L -64 -96 Z" fill="#cfe7f2" stroke="${OL}" stroke-width="4"/><path d="M 22 -140 L 64 -140 L 104 -96 L 22 -96 Z" fill="#cfe7f2" stroke="${OL}" stroke-width="4"/>
    ${o.inner || ''}
    <circle cx="-90" cy="-28" r="30" fill="${OL}"/><circle cx="-90" cy="-28" r="12" fill="#bbb"/><circle cx="100" cy="-28" r="30" fill="${OL}"/><circle cx="100" cy="-28" r="12" fill="#bbb"/></g>`;
}
export function magnifier(x, y, s = 1, rot = -30) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})"><rect x="-12" y="70" width="24" height="110" rx="10" fill="${K.woodSh}" stroke="${OL}" stroke-width="6"/><circle r="78" fill="#dff1ff" fill-opacity=".35" stroke="${OL}" stroke-width="14"/><circle r="78" fill="none" stroke="${K.gold}" stroke-width="6"/><path d="M -40 -40 Q -20 -60 10 -60" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
}
export function puzzle(x, y, s, col, rot = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})"><path d="M -40 -40 L -10 -40 Q -12 -60 0 -60 Q 12 -60 10 -40 L 40 -40 L 40 -10 Q 60 -12 60 0 Q 60 12 40 10 L 40 40 L -40 40 Z" fill="${col}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/></g>`;
}
export function cross(x, y, s = 1, a = 1) {
  return `<g opacity="${a}" transform="translate(${x} ${y}) scale(${s})"><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/></g>`;
}
export function check(x, y, s = 1, a = 1) {
  return `<g opacity="${a}" transform="translate(${x} ${y}) scale(${s})"><circle r="60" fill="${K.green}" stroke="${OL}" stroke-width="6"/><path d="M -28 2 L -8 24 L 30 -22" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
// big vertical measuring stick with marks; len in px, label
export function yardstick(x, y, len, s = 1, label = '', col = K.gold, spacing = 40) {
  let marks = '';
  for (let v = 0; v <= len - 10; v += spacing) marks += `<path d="M -36 ${-v} L ${(v / spacing) % 5 ? -14 : 2} ${-v}" stroke="${OL}" stroke-width="5"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-36" y="${-len}" width="72" height="${len}" rx="8" fill="${col}" stroke="${OL}" stroke-width="6"/>${marks}${label ? `<text x="0" y="60" ${TEXT(40)}>${label}</text>` : ''}</g>`;
}
export function notebook(x, y, s = 1, marks = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-6)"><rect x="-90" y="-60" width="180" height="120" rx="8" fill="#fffaf0" stroke="${OL}" stroke-width="5"/>${[0, 1, 2].map(i => `<path d="M -66 ${-30 + i * 30} L 60 ${-30 + i * 30}" stroke="#c9b9a0" stroke-width="5" stroke-linecap="round"/>`).join('')}
    ${marks > 0 ? `<circle cx="-40" cy="-30" r="20" fill="none" stroke="${K.red}" stroke-width="6" opacity="${cl(marks)}"/>` : ''}${marks > 1 ? `<circle cx="30" cy="30" r="20" fill="none" stroke="${K.red}" stroke-width="6" opacity="${cl(marks - 1)}"/>` : ''}</g>`;
}
export function label(x, y, text, size = 48, fill = K.ink, bg = null) {
  const w = text.length * size * .66 + 50;
  return `${bg ? `<rect x="${x - w / 2}" y="${y - size - 6}" width="${w}" height="${size * 1.5}" rx="${size * .5}" fill="${bg}" stroke="${OL}" stroke-width="5"/>` : ''}<text x="${x}" y="${y}" ${TEXT(size, fill)}>${text}</text>`;
}

export const CH = ['', '1 · SCHWEIGEN', '2 · RÜCKWÄRTS ERZÄHLEN', '3 · DRITTE PERSON', '4 · AUSWEG LASSEN', '5 · SPÄTER NACHFRAGEN', '6 · EIGENER MASSSTAB'];
// global position of a local point of a two-shot character (base x, scale s, T)
export const G = (bx, lx, ly, s = 1.25, T = 1300) => [bx + lx * s, T + 20 + ly * s];
export function miniHead(x, y, s, hair, skin = K.wSkin, bun = false) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="26" fill="${skin}" stroke="${OL}" stroke-width="4"/><path d="M -27 -2 C -30 -36 30 -36 27 -2 C 14 -16 -14 -16 -27 -2 Z" fill="${hair}" stroke="${OL}" stroke-width="3.5"/>${bun ? `<circle cx="20" cy="-24" r="11" fill="${hair}" stroke="${OL}" stroke-width="3.5"/>` : ''}<circle cx="-9" cy="4" r="3" fill="${OL}"/><circle cx="9" cy="4" r="3" fill="${OL}"/></g>`;
}
export function jag(cx, cy, r, text, size = 46, col = K.red) {
  let d = ''; const n = 14;
  for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r * .78 : r; d += `${i ? 'L' : 'M'} ${cx + Math.cos(a) * rr * 1.5} ${cy + Math.sin(a) * rr} `; }
  return `<path d="${d}Z" fill="#fff2e8" stroke="${col}" stroke-width="7" stroke-linejoin="round"/><text x="${cx}" y="${cy + size * .36}" ${TEXT(size, col)}>${text}</text>`;
}
