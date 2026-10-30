// v50 "Was passiert, wenn du Eis zu schnell isst?" — shared drawing helpers for this video only.
// Look: channel 2 (friendly, clean): pastel room, teal + white + organ pink, ink-navy 4–6 px outlines.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../engine/core.js';

export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const P = {
  bg: '#EAF6F4', bg2: '#D7EFEB', teal: '#2EC4B6', tealD: '#1E9E92', white: '#FFFFFF', ink: '#16324F',
  pink: '#FF8FA3', pinkD: '#E8687F', pinkL: '#FFC2CE', skin: '#F1C6A5', skinSh: '#DDA683',
  shirt: '#FFE69A', shirtSh: '#EFCB6A', hair: '#7A4B2A', hairHi: '#A0683F', hairSh: '#5B3620',
  cold: '#5AA9E6', coldL: '#BFE3FA', warm: '#FF9F5A', pain: '#FF4D6D', nerve: '#FFD84D',
  sky: '#CDEFF3', cream: '#FFF3D6', mint: '#8EE0C9', waffle: '#E7B26A', waffleD: '#C98E45', mouth: '#9C3A4E',
};
const OL = P.ink;
const F = `font-family:'Inter';font-weight:900`;

// camera: put world point (fx, fy) at screen (tx, ty) with zoom s
export const cam = (s, fx, fy, tx = 540, ty = 760) => `translate(${tx} ${ty}) scale(${s}) translate(${-fx} ${-fy})`;
export const mix = (a, b, p) => {
  const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const x = h(a), y = h(b);
  return '#' + x.map((v, i) => Math.round(lerp(v, y[i], cl(p))).toString(16).padStart(2, '0')).join('');
};

// ---------- backgrounds ----------
export function pastel(t, o = {}) {
  const c = o.color || P.bg;
  let dots = '';
  for (let i = 0; i < 9; i++) for (let j = 0; j < 14; j++) dots += `<circle cx="${60 + i * 120 + (j % 2) * 60}" cy="${70 + j * 140}" r="5" fill="${P.ink}" opacity=".05"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${c}"/>
    <circle cx="${180 + 20 * Math.sin(t * .6)}" cy="330" r="260" fill="${P.teal}" opacity=".10"/>
    <circle cx="${900 - 20 * Math.sin(t * .5)}" cy="1180" r="320" fill="${P.pink}" opacity=".10"/>${dots}`;
}

// German ice-cream parlour on a summer day (exterior, the girl sits at a table in front)
export function parlour(t, o = {}) {
  let stripes = '';
  for (let i = 0; i < 12; i++) stripes += `<rect x="${-40 + i * 100}" y="250" width="50" height="190" fill="${P.white}"/>`;
  let scal = '';
  for (let i = 0; i < 12; i++) scal += `<path d="M ${-40 + i * 100} 438 a 50 40 0 0 0 100 0" fill="${i % 2 ? P.teal : P.white}" stroke="${OL}" stroke-width="5"/>`;
  const tubs = [P.pink, P.cream, P.mint, '#C9A27A', P.pink, P.cream].map((c, i) =>
    `<rect x="${120 + i * 140}" y="640" width="110" height="60" rx="10" fill="${c}" stroke="${OL}" stroke-width="5"/><ellipse cx="${175 + i * 140}" cy="640" rx="46" ry="${16 + 3 * Math.sin(i)}" fill="${c}" stroke="${OL}" stroke-width="4"/>`).join('');
  const cloud = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" opacity=".95"><ellipse cx="0" cy="0" rx="90" ry="34" fill="#fff"/><ellipse cx="-30" cy="-22" rx="46" ry="34" fill="#fff"/><ellipse cx="34" cy="-16" rx="40" ry="28" fill="#fff"/></g>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${P.sky}"/>
    <circle cx="880" cy="140" r="70" fill="#FFE9A8"/><circle cx="880" cy="140" r="110" fill="#FFE9A8" opacity=".35"/>
    ${cloud(220 + 8 * t % 900, 120, 1)}${cloud(620 + 5 * t % 700, 200, .7)}
    <rect x="-40" y="230" width="1160" height="900" fill="#FFFDF7" stroke="${OL}" stroke-width="6"/>
    <rect x="-40" y="250" width="1160" height="190" fill="${P.teal}"/>${stripes}${scal}
    <rect x="70" y="540" width="940" height="330" rx="16" fill="#E6F7FB" stroke="${OL}" stroke-width="6"/>
    <rect x="70" y="700" width="940" height="40" fill="#F4F4F4" stroke="${OL}" stroke-width="5"/>
    ${tubs}
    <path d="M 120 580 L 300 580 M 760 600 L 960 600" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".8"/>
    <rect x="-40" y="1120" width="1160" height="900" fill="#F2E7D5"/>
    <path d="M -40 1120 H 1120" stroke="${OL}" stroke-width="6"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${-40 + i * 190} 1120 L ${-200 + i * 260} 2000" stroke="#E3D3BA" stroke-width="5"/>`).join('')}`;
}

// round bistro table top in the foreground (y = top edge)
export const table = y => `<ellipse cx="540" cy="${y + 40}" rx="620" ry="90" fill="${P.white}" stroke="${OL}" stroke-width="6"/>
  <rect x="-80" y="${y + 40}" width="1240" height="40" fill="#E2E8EA"/><path d="M -80 ${y + 80} H 1160" stroke="${OL}" stroke-width="5"/>`;

// ---------- props ----------
// waffle cone with three scoops. origin = grip point (middle of the cone)
export function cone(x, y, s, o = {}) {
  const id = o.id || 'cn', bite = o.bite || 0, big = o.bigBite ?? 1, rot = o.rot || 0, bs = o.biteSide || 1;
  let hatch = '';
  for (let i = -6; i <= 6; i++) hatch += `<path d="M ${i * 26 - 80} -70 L ${i * 26 + 80} 170 M ${i * 26 + 80} -70 L ${i * 26 - 80} 170" stroke="${P.waffleD}" stroke-width="5"/>`;
  const br = 70 * big * bite;
  const mask = bite > 0 ? `<mask id="${id}m"><rect x="-200" y="-400" width="400" height="700" fill="#fff"/><circle cx="${38 * bs}" cy="${-300}" r="${br}" fill="#000"/><circle cx="${-14 * bs}" cy="${-318}" r="${br * .7}" fill="#000"/></mask>` : '';
  const drip = (cx, len, c) => `<path d="M ${cx - 12} -66 q 0 ${len} 12 ${len} q 12 0 12 ${-len}" fill="${c}" stroke="${OL}" stroke-width="4"/>`;
  const sc = o.scoops ?? 3;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${mask}
    <clipPath id="${id}c"><polygon points="-64,-66 64,-66 0,172"/></clipPath>
    <polygon points="-64,-66 64,-66 0,172" fill="${P.waffle}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    <g clip-path="url(#${id}c)">${hatch}</g>
    <polygon points="-64,-66 64,-66 0,172" fill="none" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    <g ${bite > 0 ? `mask="url(#${id}m)"` : ''}>
      ${sc >= 1 ? `<circle cx="0" cy="-104" r="70" fill="${P.mint}" stroke="${OL}" stroke-width="6"/>${drip(-30, 26 + 6 * Math.sin((o.t || 0) * 2), P.mint)}<path d="M -40 -140 q 16 -18 38 -16" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/>` : ''}
      ${sc >= 2 ? `<circle cx="8" cy="-196" r="64" fill="${P.cream}" stroke="${OL}" stroke-width="6"/><path d="M -28 -226 q 16 -18 36 -16" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>` : ''}
      ${sc >= 3 ? `<circle cx="-2" cy="-282" r="58" fill="${P.pink}" stroke="${OL}" stroke-width="6"/><path d="M -34 -306 q 14 -16 32 -14" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/><circle cx="18" cy="-268" r="5" fill="${P.pinkD}"/><circle cx="-20" cy="-262" r="4" fill="${P.pinkD}"/>` : ''}
    </g>
    <rect x="-72" y="-82" width="144" height="28" rx="12" fill="${P.waffle}" stroke="${OL}" stroke-width="6"/>
  </g>`;
}

// tall glass with an iced drink. origin = glass centre; level 0..1
export function iceGlass(x, y, s, o = {}) {
  const id = o.id || 'gl', lv = o.level ?? .85, t = o.t || 0;
  const top = 200 - 380 * lv;
  const cubes = (o.cubes ?? [[-40, 0], [30, 30], [-10, 80]]).map(([cx, cy], i) =>
    `<g transform="translate(${cx} ${Math.max(top + 30, cy + top + 40)}) rotate(${12 * Math.sin(t * 2 + i)})"><rect x="-34" y="-30" width="68" height="60" rx="10" fill="#EFFAFF" fill-opacity=".85" stroke="${OL}" stroke-width="5"/><path d="M -22 -18 l 20 0" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <clipPath id="${id}c"><path d="M -110 -200 L 110 -200 L 92 200 Q 0 214 -92 200 Z"/></clipPath>
    ${o.straw !== false ? `<path d="M 30 ${-150} L 90 -330 L 150 -330" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/><path d="M 30 -150 L 90 -330 L 150 -330" fill="none" stroke="${P.teal}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    <path d="M -110 -200 L 110 -200 L 92 200 Q 0 214 -92 200 Z" fill="#F4FCFF" fill-opacity=".7"/>
    <g clip-path="url(#${id}c)"><rect x="-130" y="${top}" width="260" height="440" fill="${o.liquid || '#7FD3E8'}"/>
      <ellipse cx="0" cy="${top}" rx="120" ry="12" fill="#B4E8F4"/>${cubes}
      ${o.straw !== false ? `<line x1="-6" y1="190" x2="30" y2="-150" stroke="${OL}" stroke-width="30"/><line x1="-6" y1="190" x2="30" y2="-150" stroke="${P.teal}" stroke-width="20"/>` : ''}</g>
    <path d="M -110 -200 L 110 -200 L 92 200 Q 0 214 -92 200 Z" fill="none" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -80 -160 L -66 150" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".8"/>
    ${[[-60, 40], [70, -40], [50, 120], [-75, -90]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="5" ry="8" fill="#fff" opacity=".8"/>`).join('')}
  </g>`;
}

export function waterGlass(x, y, s, o = {}) {
  const id = o.id || 'wg', lv = o.level ?? .7;
  const top = 140 - 280 * lv;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <clipPath id="${id}c"><path d="M -90 -150 L 90 -150 L 76 150 Q 0 160 -76 150 Z"/></clipPath>
    <path d="M -90 -150 L 90 -150 L 76 150 Q 0 160 -76 150 Z" fill="#F7FDFF"/>
    <g clip-path="url(#${id}c)"><rect x="-100" y="${top}" width="200" height="320" fill="#CDEBF5"/><ellipse cx="0" cy="${top}" rx="92" ry="10" fill="#E6F6FB"/></g>
    <path d="M -90 -150 L 90 -150 L 76 150 Q 0 160 -76 150 Z" fill="none" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -64 -120 L -54 120" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>`;
}

// ---------- the girl (≈20, pale-yellow T-shirt, brown hair in a ponytail with a teal band) ----------
function ik(sx, sy, hx, hy, L1, L2, outward) {
  let dx = hx - sx, dy = hy - sy, d = Math.hypot(dx, dy);
  d = cl(d, 20, L1 + L2 - 1);
  const a = Math.atan2(dy, dx), c = Math.acos(cl((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const e1 = [sx + L1 * Math.cos(a + c), sy + L1 * Math.sin(a + c)], e2 = [sx + L1 * Math.cos(a - c), sy + L1 * Math.sin(a - c)];
  const el = outward > 0 ? (e1[0] > e2[0] ? e1 : e2) : (e1[0] < e2[0] ? e1 : e2);
  const hx2 = sx + Math.cos(a) * d, hy2 = sy + Math.sin(a) * d;
  return { el, hand: (Math.hypot(hx - sx, hy - sy) > L1 + L2 - 1) ? [hx2, hy2] : [hx, hy] };
}
export function arm(sx, sy, hx, hy, side) {
  const { el, hand } = ik(sx, sy, hx, hy, 190, 185, side);
  const sl = [lerp(sx, el[0], .45), lerp(sy, el[1], .45)];
  return {
    hand,
    svg: `<path d="M ${sx} ${sy} L ${el[0]} ${el[1]} L ${hand[0]} ${hand[1]}" fill="none" stroke="${OL}" stroke-width="70" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${sx} ${sy} L ${el[0]} ${el[1]} L ${hand[0]} ${hand[1]}" fill="none" stroke="${P.skin}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${sx} ${sy} L ${sl[0]} ${sl[1]}" stroke="${OL}" stroke-width="96" stroke-linecap="round"/>
    <path d="M ${sx} ${sy} L ${sl[0]} ${sl[1]}" stroke="${P.shirt}" stroke-width="84" stroke-linecap="round"/>`,
  };
}
export const fist = (x, y, r = 40) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${P.skin}" stroke="${OL}" stroke-width="6"/>`;
export const fingersOver = (x, y, c = P.skin) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="48" ry="42" fill="${c}" stroke="${OL}" stroke-width="6"/>
  <path d="M -20 -30 Q -8 -14 -20 4 M -2 -34 Q 10 -14 -2 8 M 16 -30 Q 28 -14 16 6" stroke="${P.skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="-34" cy="-18" rx="18" ry="26" fill="${c}" stroke="${OL}" stroke-width="5" transform="rotate(30 -34 -18)"/></g>`;

const EYES = {
  open: (lx, ly) => [-55, 55].map(e => `<ellipse cx="${e}" cy="-185" rx="25" ry="29" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${e + lx}" cy="${-183 + ly}" r="14" fill="${OL}"/><circle cx="${e + lx + 5}" cy="${-189 + ly}" r="5" fill="#fff"/><path d="M ${e - 28} -204 Q ${e} -222 ${e + 28} -204" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join(''),
  wide: (lx, ly) => [-55, 55].map(e => `<ellipse cx="${e}" cy="-188" rx="30" ry="36" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${e + lx}" cy="${-186 + ly}" r="10" fill="${OL}"/>`).join(''),
  happy: () => [-55, 55].map(e => `<path d="M ${e - 26} -178 Q ${e} -208 ${e + 26} -178" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join(''),
  half: (lx) => [-55, 55].map(e => `<ellipse cx="${e}" cy="-182" rx="25" ry="20" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${e + lx}" cy="-178" r="12" fill="${OL}"/><path d="M ${e - 27} -186 Q ${e} -196 ${e + 27} -186" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join(''),
  shut: () => `<path d="M -84 -200 L -38 -184 L -84 -168 M 84 -200 L 38 -184 L 84 -168" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M -104 -190 l -14 -8 M -104 -176 l -16 4 M 104 -190 l 14 -8 M 104 -176 l 16 4" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`,
  closed: () => [-55, 55].map(e => `<path d="M ${e - 26} -184 Q ${e} -166 ${e + 26} -184" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join(''),
};
const MOUTHS = {
  smile: () => `<path d="M -42 -92 Q 0 -58 42 -92" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/>`,
  grin: () => `<path d="M -46 -96 Q 0 -40 46 -96 Z" fill="${P.mouth}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M -40 -94 L 40 -94 L 34 -84 L -34 -84 Z" fill="#fff"/>`,
  open: () => `<ellipse cx="0" cy="-82" rx="44" ry="38" fill="${P.mouth}" stroke="${OL}" stroke-width="6"/><ellipse cx="0" cy="-60" rx="26" ry="12" fill="${P.pink}"/>`,
  chew: (c) => `<ellipse cx="0" cy="-84" rx="${30 - 6 * c}" ry="${5 + 9 * c}" fill="${P.mouth}" stroke="${OL}" stroke-width="6"/>`,
  ouch: () => `<rect x="-50" y="-104" width="100" height="36" rx="16" fill="#fff" stroke="${OL}" stroke-width="6"/><path d="M -46 -86 H 46 M -16 -102 V -70 M 16 -102 V -70" stroke="${OL}" stroke-width="4"/>`,
  flat: () => `<path d="M -26 -84 L 26 -84" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>`,
  o: () => `<ellipse cx="0" cy="-80" rx="17" ry="21" fill="${P.mouth}" stroke="${OL}" stroke-width="6"/>`,
  sip: () => `<ellipse cx="0" cy="-82" rx="13" ry="10" fill="${P.mouth}" stroke="${OL}" stroke-width="6"/>`,
  soft: () => `<path d="M -30 -88 Q 0 -70 30 -88" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
};

// Front nerve map (one per side): ganglion in front of the ear, branches to forehead / cheek / jaw
export const NERVE_SIDE = [
  [[118, -160], [100, -215], [72, -262], [40, -318]],   // forehead
  [[118, -160], [96, -138], [62, -128]],                 // cheek
  [[118, -160], [116, -108], [84, -52]],                 // jaw
];
export function polyAt(pts, p) {
  let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let r = cl(p) * L;
  for (let i = 0; i < seg.length; i++) { if (r <= seg[i] || i === seg.length - 1) { const f = seg[i] ? cl(r / seg[i]) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } r -= seg[i]; }
  return pts[pts.length - 1];
}
const pd = pts => 'M ' + pts.map(p => p.join(' ')).join(' L ');
export function glowLine(pts, p, w = 10, col = P.nerve) {
  if (p <= 0) return '';
  const d = pd(pts);
  return `<path d="${d}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${col}" stroke-width="${w * 3}" stroke-linecap="round" stroke-linejoin="round" opacity=".45" filter="url(#blur8)"/>
    <path d="${d}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${OL}" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
export function painGlow(x, y, r, a, t, t0 = 0) {
  if (a <= 0) return '';
  let rings = '';
  for (let k = 0; k < 2; k++) { const p = ((t - t0) * 1.6 + k * .5) % 1; rings += `<circle cx="${x}" cy="${y}" r="${r * (.5 + p)}" fill="none" stroke="${P.pain}" stroke-width="${8 * (1 - p)}" opacity="${a * (1 - p)}"/>`; }
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${P.pain}" opacity="${.55 * a}" filter="url(#blur20)"/>${rings}`;
}

export function girl(x, y, s, o = {}) {
  const t = o.t || 0, tilt = o.tilt || 0, hdy = o.headDy || 0, br = o.brow || 0;
  const lx = o.look || 0, ly = o.lookY || 0;
  const rest = { R: [215, 400], L: [-215, 400] };
  const R = arm(150, 40, ...(o.handR || rest.R), 1), L = arm(-150, 40, ...(o.handL || rest.L), -1);
  const eyes = (EYES[o.eyes || 'open'] || EYES.open)(lx, ly);
  const mouth = (MOUTHS[o.mouth || 'smile'] || MOUTHS.smile)(o.chew || 0);
  const brow = `<path d="M -90 ${lerp(-246, -250, br)} Q -60 ${lerp(-264, -246, br)} ${lerp(-28, -24, br)} ${lerp(-250, -228, br)} M 90 ${lerp(-246, -250, br)} Q 60 ${lerp(-264, -246, br)} ${lerp(28, 24, br)} ${lerp(-250, -228, br)}" stroke="${P.hairSh}" stroke-width="11" fill="none" stroke-linecap="round"/>`;
  const knit = br > .5 ? `<path d="M -10 -262 l 4 18 M 10 -262 l -4 18" stroke="${P.skinSh}" stroke-width="5" stroke-linecap="round" opacity="${(br - .5) * 2}"/>` : '';
  let nerves = '';
  if (o.nerves) {
    const n = o.nerves;
    for (const sd of [1, -1]) NERVE_SIDE.forEach((pts, i) => { nerves += glowLine(pts.map(([a, b]) => [a * sd, b]), n[i] || 0, 9); });
    if ((n[0] || n[1] || n[2])) nerves += [1, -1].map(sd => `<circle cx="${118 * sd}" cy="-160" r="14" fill="${P.nerve}" stroke="${OL}" stroke-width="5"/>`).join('');
  }
  const held = o.hold === 'cone' ? cone(R.hand[0] - 4, R.hand[1] - 30, o.coneS || .9, { id: (o.id || 'g') + 'c', bite: o.bite || 0, t, rot: o.coneRot || 0, scoops: o.scoops })
    : o.hold === 'glass' ? iceGlass(R.hand[0] - 10, R.hand[1] - 20, .62, { id: (o.id || 'g') + 'g', level: o.level, t, straw: o.straw })
      : o.hold === 'water' ? waterGlass(R.hand[0] - 10, R.hand[1] - 20, .7, { id: (o.id || 'g') + 'w', level: o.level }) : '';
  const handR = o.hold && o.hold !== 'none' ? fingersOver(R.hand[0], R.hand[1]) : fist(R.hand[0], R.hand[1]);
  const palmL = o.palmL ? `<g transform="translate(${L.hand[0]} ${L.hand[1]}) rotate(${o.palmL})"><ellipse cx="0" cy="0" rx="62" ry="46" fill="${P.skin}" stroke="${OL}" stroke-width="6"/>${[-30, -10, 10, 30].map(d => `<rect x="${d - 10}" y="-74" width="22" height="50" rx="11" fill="${P.skin}" stroke="${OL}" stroke-width="5"/>`).join('')}<ellipse cx="0" cy="-6" rx="52" ry="38" fill="${P.skin}"/></g>` : fist(L.hand[0], L.hand[1]);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -190 60 Q -195 10 -140 0 L -60 -14 Q 0 22 60 -14 L 140 0 Q 195 10 190 60 L 215 760 L -215 760 Z" fill="${P.shirt}" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 150 120 Q 170 400 180 760" stroke="${P.shirtSh}" stroke-width="26" fill="none"/>
    <path d="M -60 -14 Q 0 40 60 -14" fill="${P.skinSh}" stroke="${OL}" stroke-width="6"/>
    <rect x="-46" y="-90" width="92" height="96" fill="${P.skin}" stroke="${OL}" stroke-width="6"/>
    <rect x="-40" y="-60" width="80" height="22" fill="${P.skinSh}" opacity=".6"/>
    <g transform="translate(0 ${hdy}) rotate(${tilt} 0 -60)">
      <path d="M 92 -330 C 210 -380 280 -270 236 -150 C 222 -112 196 -124 204 -168 C 214 -246 178 -300 108 -306 Z" fill="${P.hair}" stroke="${OL}" stroke-width="6" stroke-linejoin="round" transform="rotate(${4 * Math.sin(t * 2.4)} 100 -320)"/>
      <ellipse cx="-150" cy="-180" rx="24" ry="36" fill="${P.skin}" stroke="${OL}" stroke-width="6"/><ellipse cx="150" cy="-180" rx="24" ry="36" fill="${P.skin}" stroke="${OL}" stroke-width="6"/>
      <ellipse cx="0" cy="-190" rx="150" ry="166" fill="${P.skin}" stroke="${OL}" stroke-width="7"/>
      <path d="M -156 -176 C -170 -330 -60 -372 10 -368 C 112 -366 168 -306 156 -176 C 146 -250 100 -296 40 -290 C 0 -262 -80 -276 -118 -246 C -138 -226 -150 -202 -156 -176 Z" fill="${P.hair}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M -90 -330 Q -20 -356 60 -340" stroke="${P.hairHi}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <rect x="86" y="-352" width="34" height="46" rx="10" fill="${P.teal}" stroke="${OL}" stroke-width="5" transform="rotate(-30 103 -329)"/>
      ${painGlow(0, -290, 90, o.painFore || 0, t)}${painGlow(-132, -215, 60, o.painTemple || 0, t, .3)}${painGlow(132, -215, 60, o.painTemple || 0, t, .3)}
      ${eyes}${brow}${knit}
      <path d="M -4 -150 Q 14 -128 -4 -114" stroke="${P.skinSh}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="-96" cy="-122" rx="26" ry="14" fill="${P.pink}" opacity="${o.blush ?? .45}"/><ellipse cx="96" cy="-122" rx="26" ry="14" fill="${P.pink}" opacity="${o.blush ?? .45}"/>
      ${o.cheek ? `<ellipse cx="128" cy="-112" rx="${38 * o.cheek}" ry="${46 * o.cheek}" fill="${P.skin}"/><path d="M 128 ${-112 - 46 * o.cheek} A ${38 * o.cheek} ${46 * o.cheek} 0 0 1 128 ${-112 + 46 * o.cheek}" fill="none" stroke="${OL}" stroke-width="7"/>` : ''}
      ${mouth}${nerves}${o.headExtra || ''}
    </g>
    ${o.armsBehind ? '' : L.svg + R.svg}${held}${handR}${palmL}
  </g>`;
}

// ---------- profile head (facing right) with optional transparent cross-section ----------
export const HEAD = 'M -150 -40 C -165 -200 -60 -270 50 -262 C 130 -255 172 -200 172 -120 L 172 -70 Q 176 -50 186 -38 L 222 36 Q 226 52 206 56 L 186 60 Q 192 74 186 84 L 182 92 Q 190 100 184 112 Q 178 120 182 132 Q 180 176 132 190 L 80 194 Q 60 196 56 222 L 50 320 L -100 320 L -104 160 Q -160 100 -150 -40 Z';
export const NERVE_PROFILE = {
  main: [[118, 70], [70, 48], [10, 30], [-24, 6]],
  fore: [[-24, 6], [30, -40], [92, -92], [140, -150]],
  temple: [[-24, 6], [10, -40], [44, -84]],
};
export function profileHead(x, y, s, o = {}) {
  const id = o.id || 'ph', xr = o.xray || 0, t = o.t || 0;
  const pal = o.palWarm ? mix(P.pink, P.warm, o.palWarm) : mix(P.pink, P.cold, o.palCold || 0);
  const tu = o.tongueUp || 0;
  const vessel = o.vessel; // { c: 0..1 contracted, w: 0..1 widened }
  let vess = '';
  if (vessel) {
    const wdt = 9 * (1 - .6 * (vessel.c || 0) + .7 * (vessel.w || 0));
    const col = vessel.c > vessel.w ? mix('#E5484D', P.cold, vessel.c) : '#E5484D';
    vess = `<path d="M 60 56 Q 100 46 160 62" stroke="${col}" stroke-width="${wdt}" fill="none" stroke-linecap="round"/>`;
  }
  let frost = '';
  if (o.frost) for (let i = 0; i < 6; i++) { const fx = 70 + i * 18, fy = 58 - 6 * Math.sin(i * .9); frost += `<path d="M ${fx} ${fy} l 0 ${-10 * o.frost} M ${fx - 7 * o.frost} ${fy - 5 * o.frost} l ${14 * o.frost} ${10 * o.frost * 0} " stroke="#fff" stroke-width="3" stroke-linecap="round"/>`; }
  const interior = `
    <ellipse cx="-6" cy="-128" rx="138" ry="96" fill="#FFB7C5" stroke="${OL}" stroke-width="5"/>
    <path d="M -110 -150 q 30 -30 60 0 q 30 30 60 0 q 30 -30 60 0 M -100 -100 q 30 -24 60 0 q 30 24 60 0 q 30 -24 60 0" stroke="${P.pinkD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${o.brainFace ? (o.brainFace === 'wince'
      ? `<path d="M -40 -130 l 22 8 l -22 8 M 40 -130 l -22 8 l 22 8" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="-22" y="-98" width="44" height="18" rx="8" fill="#fff" stroke="${OL}" stroke-width="5"/>`
      : `<circle cx="-26" cy="-122" r="9" fill="${OL}"/><circle cx="26" cy="-122" r="9" fill="${OL}"/><path d="M -14 -96 q 14 10 28 0" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`) : ''}
    <path d="M 40 66 Q 100 44 176 78 L 180 112 Q 120 150 40 146 Z" fill="${P.mouth}"/>
    <path d="M 40 ${148 - 10 * tu} Q 60 ${104 - 40 * tu} 120 ${100 - 38 * tu} Q 160 ${100 - 30 * tu} 176 ${118 - 20 * tu} Q 140 152 40 156 Z" fill="#FF7F98" stroke="${OL}" stroke-width="5"/>
    <path d="M 176 80 Q 120 48 46 66" stroke="${OL}" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M 176 80 Q 120 48 46 66" stroke="${pal}" stroke-width="20" fill="none" stroke-linecap="round"/>
    ${vess}${frost}
    <rect x="170" y="74" width="16" height="16" rx="4" fill="#fff" stroke="${OL}" stroke-width="3"/><rect x="168" y="112" width="16" height="14" rx="4" fill="#fff" stroke="${OL}" stroke-width="3"/>
    ${o.ice ? `<g transform="translate(${o.iceX ?? 120} ${88 - 4 * tu}) scale(${o.ice})"><rect x="-26" y="-16" width="52" height="32" rx="10" fill="${P.pink}" stroke="${OL}" stroke-width="5"/><path d="M -14 -6 h 14" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>` : ''}
    ${glowLine(NERVE_PROFILE.main, o.nMain || 0, 8)}${glowLine(NERVE_PROFILE.fore, o.nFore || 0, 8)}${glowLine(NERVE_PROFILE.temple, o.nTemple || 0, 8)}
    ${(o.nMain || 0) > .95 ? `<circle cx="-24" cy="6" r="13" fill="${P.nerve}" stroke="${OL}" stroke-width="5"/>` : ''}
    ${o.signal !== undefined && o.signal >= 0 ? (() => { const [sx, sy] = o.signalPath ? polyAt(o.signalPath, o.signal) : polyAt(NERVE_PROFILE.main, o.signal); return `<circle cx="${sx}" cy="${sy}" r="30" fill="#fff" opacity=".6" filter="url(#blur8)"/><circle cx="${sx}" cy="${sy}" r="15" fill="#fff" stroke="${P.nerve}" stroke-width="6"/>`; })() : ''}`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <clipPath id="${id}h"><path d="${HEAD}"/></clipPath>
    <path d="M 120 -250 C 240 -320 300 -240 280 -120" fill="none" stroke="none"/>
    <path d="M -120 -190 C -240 -230 -280 -110 -250 -10 C -240 20 -214 10 -220 -26 C -232 -90 -200 -150 -130 -160 Z" fill="${P.hair}" stroke="${OL}" stroke-width="6" stroke-linejoin="round" transform="rotate(${4 * Math.sin(t * 2.4)} -130 -180)"/>
    <path d="${HEAD}" fill="${P.skin}" fill-opacity="${1 - .78 * xr}" stroke="none"/>
    ${xr > 0 ? `<g clip-path="url(#${id}h)" opacity="${xr}">${interior}</g>` : ''}
    <path d="${HEAD}" fill="none" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -150 -40 C -165 -200 -60 -270 50 -262 C 120 -256 160 -214 168 -160 C 120 -190 60 -196 10 -170 C -40 -150 -80 -120 -100 -60 C -110 -30 -130 -10 -150 -40 Z" fill="${P.hair}" fill-opacity="${1 - .6 * xr}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="-150" y="-200" width="34" height="46" rx="10" fill="${P.teal}" stroke="${OL}" stroke-width="5" transform="rotate(20 -133 -177)" opacity="${1 - .5 * xr}"/>
    <ellipse cx="-30" cy="-10" rx="28" ry="42" fill="${P.skin}" fill-opacity="${1 - .7 * xr}" stroke="${OL}" stroke-width="6"/>
    ${o.eye === 'shut' ? `<path d="M 112 -78 L 146 -66 L 112 -56" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<ellipse cx="134" cy="-68" rx="16" ry="20" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${140 + (o.look || 0)}" cy="-66" r="9" fill="${OL}"/>`}
    <path d="M 108 ${o.eye === 'shut' ? -96 : -104} Q 132 ${o.eye === 'shut' ? -94 : -114} 160 -100" stroke="${P.hairSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="120" cy="2" rx="24" ry="13" fill="${P.pink}" opacity="${.45 * (1 - xr)}"/>
    ${painGlow(160, -150, 70, o.painFore || 0, t)}${painGlow(50, -86, 50, o.painTemple || 0, t, .3)}
  </g>`;
}

// ---------- doctor (Ärztin): white coat, teal scrubs, short black bob, stethoscope ----------
export function doctor(x, y, s, o = {}) {
  const R = arm(150, 40, ...(o.handR || [215, 400]), 1), L = arm(-150, 40, ...(o.handL || [-215, 400]), -1);
  const recol = svg => svg.replace(new RegExp(P.shirt, 'g'), '#FFFFFF');
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -190 60 Q -195 10 -140 0 L -60 -14 L 0 120 L 60 -14 L 140 0 Q 195 10 190 60 L 215 760 L -215 760 Z" fill="#FFFFFF" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -60 -14 L 0 120 L 60 -14 Q 0 10 -60 -14 Z" fill="${P.teal}" stroke="${OL}" stroke-width="6"/>
    <path d="M 0 120 V 760" stroke="${OL}" stroke-width="6"/>
    <path d="M -60 -6 Q -90 160 -20 220 M 60 -6 Q 90 160 20 220" stroke="#4A5A6A" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="0" cy="232" r="24" fill="#B9C6D2" stroke="${OL}" stroke-width="5"/>
    <rect x="-46" y="-90" width="92" height="96" fill="#C98F6B" stroke="${OL}" stroke-width="6"/>
    <g>
      <path d="M -168 -190 C -180 -420 180 -420 168 -190 L 174 -86 Q 150 -60 124 -88 L -124 -88 Q -150 -60 -174 -86 Z" fill="#23242B" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="0" cy="-190" rx="140" ry="160" fill="#D9A07A" stroke="${OL}" stroke-width="7"/>
      <path d="M -146 -190 C -156 -420 156 -420 146 -190 C 120 -270 40 -290 -20 -262 C -60 -250 -120 -250 -146 -190 Z" fill="#23242B" stroke="${OL}" stroke-width="6"/>
      ${[-52, 52].map(e => `<ellipse cx="${e}" cy="-180" rx="20" ry="24" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${e + (o.look || 0)}" cy="-178" r="11" fill="${OL}"/>`).join('')}
      <path d="M -80 -224 Q -52 -238 -26 -226 M 80 -224 Q 52 -238 26 -226" stroke="#23242B" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M -4 -150 Q 12 -128 -4 -116" stroke="#B57F5C" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M -34 -90 Q 0 -66 34 -90" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
    ${recol(L.svg + R.svg).replace(new RegExp(P.skin, 'g'), '#D9A07A')}
    <circle cx="${R.hand[0]}" cy="${R.hand[1]}" r="40" fill="#D9A07A" stroke="${OL}" stroke-width="6"/><circle cx="${L.hand[0]}" cy="${L.hand[1]}" r="40" fill="#D9A07A" stroke="${OL}" stroke-width="6"/>
    ${o.extra || ''}
  </g>`;
}

// ---------- graphics ----------
export function label(txt, x, y, size, o = {}) {
  const sc = o.scale ?? 1;
  if (sc <= 0) return '';
  const w = (o.w || txt.length * size * .66) + 70, h = size * 1.35;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${sc})">
    <rect x="${-w / 2}" y="${-h / 2 + 8}" width="${w}" height="${h}" rx="${h * .3}" fill="${OL}" opacity=".25"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .3}" fill="${o.fill || P.white}" stroke="${OL}" stroke-width="6"/>
    <text x="0" y="${size * .36}" text-anchor="middle" style="${F};font-size:${size}px;letter-spacing:2px" fill="${o.color || OL}">${txt}</text></g>`;
}
export function headline(txt, x, y, size, o = {}) {
  const sc = o.scale ?? 1;
  if (sc <= 0) return '';
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${sc})"><text x="0" y="0" text-anchor="middle" style="${F};font-size:${size}px;letter-spacing:1px" fill="${o.color || OL}" stroke="${o.stroke || P.white}" stroke-width="${o.sw ?? 16}" paint-order="stroke" stroke-linejoin="round">${txt}</text></g>`;
}
export function thermo(x, y, s, level, o = {}) {
  const id = o.id || 'th';
  const col = o.col || mix(P.cold, '#E5484D', level);
  const top = 150 - 330 * level;
  let ticks = '';
  for (let i = 0; i < 6; i++) ticks += `<path d="M 34 ${130 - i * 60} h 26" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <clipPath id="${id}"><rect x="-22" y="-220" width="44" height="420"/></clipPath>
    <rect x="-34" y="-232" width="68" height="420" rx="34" fill="#fff" stroke="${OL}" stroke-width="7"/>
    <circle cx="0" cy="210" r="62" fill="${col}" stroke="${OL}" stroke-width="7"/>
    <g clip-path="url(#${id})"><rect x="-20" y="${top}" width="40" height="${420}" fill="${col}"/></g>
    <circle cx="0" cy="210" r="48" fill="${col}"/>${ticks}
    <path d="M -10 -200 V ${Math.min(120, top + 10)}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/></g>`;
}
export function sting(x, y, r, p, rot = 0) {
  if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < 8; i++) {
    const a = rot + i * Math.PI / 4, r0 = r * (.35 + .5 * eout(p)), r1 = r * (.75 + .6 * eout(p));
    s += `<path d="M ${x + r0 * Math.cos(a)} ${y + r0 * Math.sin(a)} L ${x + r1 * Math.cos(a)} ${y + r1 * Math.sin(a)}" stroke="${P.pain}" stroke-width="${16 * (1 - p)}" stroke-linecap="round"/>`;
  }
  return s;
}
export function zap(x, y, s, a = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${a}"><path d="M 12 -80 L -40 10 L 0 10 L -16 80 L 44 -16 L 4 -16 Z" fill="${P.nerve}" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/></g>`;
}
export function snowflake(x, y, s, rot = 0, col = '#fff') {
  let d = '';
  for (let i = 0; i < 6; i++) { const a = rot + i * Math.PI / 3, c = Math.cos(a), sn = Math.sin(a); d += `M 0 0 L ${60 * c} ${60 * sn} M ${36 * c} ${36 * sn} L ${36 * c + 18 * Math.cos(a + .8)} ${36 * sn + 18 * Math.sin(a + .8)} M ${36 * c} ${36 * sn} L ${36 * c + 18 * Math.cos(a - .8)} ${36 * sn + 18 * Math.sin(a - .8)} `; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="${d}" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="8" stroke-linecap="round"/></g>`;
}
export function check(x, y, s, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="${110 * back(cl(p * 2))}" fill="${P.teal}" stroke="${OL}" stroke-width="8"/>
    <path d="M -50 0 L -12 38 L 56 -40" pathLength="1" stroke-dasharray="${cl(p * 2 - .6)} 1" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
export function lens(cx, cy, r, inner, id, sc = 1) {
  if (sc <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})">
    <line x1="${cx + r * .72}" y1="${cy + r * .72}" x2="${cx + r * 1.25}" y2="${cy + r * 1.25}" stroke="${OL}" stroke-width="58" stroke-linecap="round"/>
    <line x1="${cx + r * .72}" y1="${cy + r * .72}" x2="${cx + r * 1.25}" y2="${cy + r * 1.25}" stroke="${P.tealD}" stroke-width="44" stroke-linecap="round"/>
    <clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${P.bg}"/>
    <g clip-path="url(#${id})">${inner}</g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="22"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 11}" fill="none" stroke="${OL}" stroke-width="7"/>
    <path d="M ${cx - r * .6} ${cy - r * .45} A ${r * .75} ${r * .75} 0 0 1 ${cx - r * .1} ${cy - r * .74}" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/></g>`;
}
// blood-vessel tube in cross section. width factor wf (1 normal, .45 narrow, 1.5 wide)
export function vesselTube(cx, cy, len, wf, col, t, flow = 1) {
  const h = 110 * wf;
  let cells = '';
  for (let i = 0; i < 9; i++) {
    const px = ((i * 140 + t * 260 * flow) % (len + 140)) - 70 - len / 2;
    cells += `<ellipse cx="${cx + px}" cy="${cy + (hash(i) - .5) * h * .8}" rx="${26 * Math.min(1, wf + .3)}" ry="${16 * Math.min(1, wf + .3)}" fill="${mix(col, '#B3263C', .3)}" stroke="${OL}" stroke-width="4"/>`;
  }
  return `<rect x="${cx - len / 2}" y="${cy - h / 2 - 22}" width="${len}" height="${h + 44}" fill="${P.pinkL}" stroke="${OL}" stroke-width="6"/>
    <rect x="${cx - len / 2}" y="${cy - h / 2}" width="${len}" height="${h}" fill="${col}" opacity=".35"/>${cells}
    <path d="M ${cx - len / 2} ${cy - h / 2} H ${cx + len / 2} M ${cx - len / 2} ${cy + h / 2} H ${cx + len / 2}" stroke="${OL}" stroke-width="6"/>`;
}
export function arrow(x1, y1, x2, y2, col = OL, w = 14, p = 1) {
  if (p <= 0) return '';
  const ex = lerp(x1, x2, p), ey = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1), hs = w * 2.4;
  return `<path d="M ${x1} ${y1} L ${ex} ${ey}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${ex + hs * Math.cos(a)} ${ey + hs * Math.sin(a)} L ${ex + hs * Math.cos(a + 2.4)} ${ey + hs * Math.sin(a + 2.4)} L ${ex + hs * Math.cos(a - 2.4)} ${ey + hs * Math.sin(a - 2.4)} Z" fill="${col}"/>`;
}
export function stopwatch(x, y, s, ang, o = {}) {
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ticks += `<path d="M ${150 * Math.sin(a)} ${-150 * Math.cos(a)} L ${126 * Math.sin(a)} ${-126 * Math.cos(a)}" stroke="${OL}" stroke-width="${i % 3 ? 5 : 10}" stroke-linecap="round"/>`; }
  const sweep = o.sweep ? `<path d="M 0 0 L 0 -150 A 150 150 0 ${o.sweep > Math.PI ? 1 : 0} 1 ${150 * Math.sin(o.sweep)} ${-150 * Math.cos(o.sweep)} Z" fill="${P.teal}" opacity=".3"/>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-30" y="-232" width="60" height="50" rx="10" fill="${P.tealD}" stroke="${OL}" stroke-width="7"/>
    <rect x="-50" y="-250" width="100" height="30" rx="12" fill="${P.teal}" stroke="${OL}" stroke-width="7"/>
    <circle r="190" fill="${P.teal}" stroke="${OL}" stroke-width="8"/><circle r="164" fill="#fff" stroke="${OL}" stroke-width="6"/>
    ${sweep}${ticks}
    <path d="M 0 20 L ${136 * Math.sin(ang)} ${-136 * Math.cos(ang)}" stroke="${o.handCol || P.pain}" stroke-width="10" stroke-linecap="round"/>
    <circle r="16" fill="${OL}"/></g>`;
}
