// @ts-nocheck
// AUTO-GENERATED scene for v6. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// ===== shared sleep-series helpers (drawn inline, same flat style as the exemplar) =====
const Z = { sun: '#ffcf4a', sunSh: '#f0a030', lampLit: '#fff1c4', mel: '#a98bff', melHi: '#d9cbff', heart: '#ff5468', heartSh: '#c93448', brain: '#ff9fbf', brainSh: '#e0709a', sugar: '#f4f7ff', key: '#ffd27a', night: '#0b1226', screen: '#8fd8ff', green: '#5fd08a', lab: '#e9eef8', orange: '#ff9a3c', tv: '#2a3150', sheet: '#c9d6f2' };

function T(x, y, size, str, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" style="font-family:'Inter';font-weight:900;font-size:${size}px" fill="${fill || C.warm}" stroke="${o.stroke || C.ol}" stroke-width="${o.sw ?? 8}" paint-order="stroke"${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${str}</text>`;
}
function popT(x, y, size, str, p, fill, rot = 0) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${p})">${T(0, size * .35, size, str, fill)}</g>`;
}
function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function shake(t, t0, amp = 12, d = 7) { if (t < t0 || t > t0 + 1) return [0, 0]; const k = amp * Math.exp(-(t - t0) * d); return [k * Math.sin(t * 93), k * Math.cos(t * 71)]; }
function arrow(x1, y1, x2, y2, col, w = 30, p = 1) {
  if (p <= 0) return '';
  const L = Math.hypot(x2 - x1, y2 - y1) * p, a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, h = Math.min(L, w * 1.7);
  return `<g transform="translate(${x1} ${y1}) rotate(${a})"><path d="M 0 ${-w / 2} H ${L - h} V ${-w} L ${L} 0 L ${L - h} ${w} V ${w / 2} H 0 Z" fill="${col}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/></g>`;
}
function check(x, y, s, p, col = Z.green) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * back(p)})"><circle r="70" fill="${col}" stroke="${C.ol}" stroke-width="8"/><path d="M -32 2 L -8 26 L 36 -24" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
function cross(x, y, s, p, col = C.red) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * back(p)})"><circle r="70" fill="${col}" stroke="${C.ol}" stroke-width="8"/><path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke="#fff" stroke-width="16" stroke-linecap="round"/></g>`;
}
function bigX(x, y, s, p) { // red strike-through over an object
  if (p <= 0) return '';
  const a = cl(p * 2), b = cl(p * 2 - 1);
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -120 -120 L ${-120 + 240 * a} ${-120 + 240 * a}" stroke="${C.ol}" stroke-width="44" stroke-linecap="round"/><path d="M -120 -120 L ${-120 + 240 * a} ${-120 + 240 * a}" stroke="${C.red}" stroke-width="28" stroke-linecap="round"/>
    ${b > 0 ? `<path d="M 120 -120 L ${120 - 240 * b} ${-120 + 240 * b}" stroke="${C.ol}" stroke-width="44" stroke-linecap="round"/><path d="M 120 -120 L ${120 - 240 * b} ${-120 + 240 * b}" stroke="${C.red}" stroke-width="28" stroke-linecap="round"/>` : ''}</g>`;
}
function sunF(t, cx, cy, r, o = {}) {
  let rays = '';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * .4; rays += `<path d="M ${cx + Math.cos(a - .1) * r * 1.08} ${cy + Math.sin(a - .1) * r * 1.08} L ${cx + Math.cos(a) * r * 1.42} ${cy + Math.sin(a) * r * 1.42} L ${cx + Math.cos(a + .1) * r * 1.08} ${cy + Math.sin(a + .1) * r * 1.08} Z" fill="${Z.sun}" stroke="${C.ol}" stroke-width="5"/>`; }
  return `<circle cx="${cx}" cy="${cy}" r="${r * 1.9}" fill="${Z.sun}" opacity=".22" filter="url(#blur40)"/>${rays}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${Z.sun}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M ${cx + r * .55} ${cy - r * .6} A ${r * .85} ${r * .85} 0 0 1 ${cx + r * .6} ${cy + r * .55}" stroke="${Z.sunSh}" stroke-width="${r * .14}" fill="none" stroke-linecap="round"/>
    ${o.face ? `<g transform="translate(${cx} ${cy + r * .08}) scale(${r / 120})">${face({ blush: '#ff8a5a', lidCol: Z.sun, ...o.face })}</g>` : ''}`;
}
function moonF(cx, cy, r, o = {}) {
  return `<circle cx="${cx}" cy="${cy}" r="${r * 1.8}" fill="url(#gMoon)"/>
    <path d="M ${cx + r * .3} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r * .3} ${cy + r} A ${r * .78} ${r * .78} 0 1 1 ${cx + r * .3} ${cy - r} Z" fill="${C.moon}" stroke="${C.ol}" stroke-width="${cl(r / 12, 4, 8)}"/>
    ${o.face ? `<g transform="translate(${cx - r * .32} ${cy + r * .1}) scale(${r / 200})">${face({ eyes: 'closed', mouth: 'smile', ...o.face })}</g>` : ''}`;
}
function zzz(t, x, y, s = 1, on = 1) {
  if (on <= 0) return '';
  let g = '';
  for (let i = 0; i < 3; i++) {
    const p = ((t * .7 + i / 3) % 1);
    g += `<g transform="translate(${x + 60 * p + i * 8} ${y - 150 * p}) scale(${s * (.5 + .7 * p)})" opacity="${on * Math.sin(p * Math.PI)}">${T(0, 0, 70, 'Z', '#cfe0ff', { sw: 7 })}</g>`;
  }
  return g;
}
function face(o = {}) {
  const lx = o.look || 0, ly = o.lookY || 0, es = o.eyeS || 1, ol = C.ol, em = o.eyes || 'n';
  let e = '';
  if (em === 'x') e = `<path d="M -42 -20 L -18 4 M -18 -20 L -42 4 M 18 -20 L 42 4 M 42 -20 L 18 4" stroke="${ol}" stroke-width="7" stroke-linecap="round"/>`;
  else if (em === 'closed') e = `<path d="M -44 -6 Q -30 6 -16 -6 M 16 -6 Q 30 6 44 -6" stroke="${ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (em === 'tight') e = `<path d="M -44 -12 L -18 -4 L -44 4 M 44 -12 L 18 -4 L 44 4" stroke="${ol}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  else if (em === 'happy') e = `<path d="M -44 0 Q -30 -16 -16 0 M 16 0 Q 30 -16 44 0" stroke="${ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (em === 'swirl') e = [-30, 30].map(cx => `<g transform="rotate(${(o.t || 0) * 420} ${cx} -6)"><path d="M ${cx} -6 m -3 0 a 3 3 0 1 1 6 0 a 7 7 0 1 1 -14 0 a 11 11 0 1 1 22 0 a 15 15 0 1 1 -30 0" stroke="${ol}" stroke-width="5" fill="none"/></g>`).join('');
  else {
    const lid = o.lid || 0, lc = o.lidCol || C.skin;
    e = [-30, 30].map(cx => `<ellipse cx="${cx}" cy="-6" rx="${15 * es}" ry="${20 * es}" fill="#fff" stroke="${ol}" stroke-width="5"/><circle cx="${cx + lx}" cy="${-4 + ly}" r="${8 * es}" fill="${ol}"/><circle cx="${cx + lx + 3}" cy="${-8 + ly}" r="${2.6 * es}" fill="#fff"/>` +
      (lid > 0 ? `<rect x="${cx - 18 * es}" y="${-28 * es - 6}" width="${36 * es}" height="${44 * es * lid}" rx="10" fill="${lc}"/><path d="M ${cx - 16 * es} ${-28 * es - 6 + 44 * es * lid} H ${cx + 16 * es}" stroke="${ol}" stroke-width="5" stroke-linecap="round"/>` : '')).join('');
  }
  const B = {
    up: `<path d="M -46 -40 Q -30 -56 -14 -46 M 46 -40 Q 30 -56 14 -46" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    mean: `<path d="M -48 -42 L -14 -30 M 48 -42 L 14 -30" stroke="${ol}" stroke-width="7" stroke-linecap="round"/>`,
    sad: `<path d="M -46 -32 L -14 -44 M 46 -32 L 14 -44" stroke="${ol}" stroke-width="6" stroke-linecap="round"/>`,
    calm: `<path d="M -44 -38 Q -30 -46 -16 -40 M 44 -38 Q 30 -46 16 -40" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.brows] || '';
  const M = {
    smile: `<path d="M -20 26 Q 0 42 20 26" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M -26 22 Q 0 56 26 22 Z" fill="${ol}"/><path d="M -12 38 Q 0 46 12 38" fill="#ff8fa8"/>`,
    o: `<ellipse cx="0" cy="34" rx="14" ry="18" fill="${ol}"/><ellipse cx="0" cy="42" rx="8" ry="6" fill="#ff8fa8"/>`,
    yawn: `<ellipse cx="0" cy="36" rx="18" ry="26" fill="${ol}"/><ellipse cx="0" cy="48" rx="11" ry="8" fill="#ff8fa8"/>`,
    flat: `<path d="M -16 32 L 16 32" stroke="${ol}" stroke-width="6" stroke-linecap="round"/>`,
    wavy: `<path d="M -24 32 q 8 -9 16 0 q 8 9 16 0 q 8 -9 16 0" stroke="${ol}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    small: `<ellipse cx="0" cy="32" rx="7" ry="9" fill="${ol}"/>`,
    sad: `<path d="M -20 36 Q 0 22 20 36" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.mouth || 'smile'];
  const ba = o.blushA ?? .5;
  const bl = ba > 0 ? `<ellipse cx="-48" cy="14" rx="12" ry="7" fill="${o.blush || '#ff8fa8'}" opacity="${ba}"/><ellipse cx="48" cy="14" rx="12" ry="7" fill="${o.blush || '#ff8fa8'}" opacity="${ba}"/>` : '';
  return e + B + bl + M;
}
// human head (r≈90 at s=1), local origin = head centre. o: face options + hair colour, cap (nightcap), mask (sleep mask 0..1), bags
function head(o = {}) {
  const hc = o.hair || C.hair;
  return `<ellipse cx="-88" cy="8" rx="15" ry="22" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="5"/><ellipse cx="88" cy="8" rx="15" ry="22" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="5"/>
    <circle cx="0" cy="0" r="90" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/>
    <path d="M -90 -6 Q -96 -96 0 -96 Q 96 -96 90 -6 Q 80 -54 36 -54 Q 14 -34 -14 -48 Q -50 -30 -72 -54 Q -86 -34 -90 -6 Z" fill="${hc}" stroke="${C.ol}" stroke-width="5"/>
    <path d="M -50 -80 Q -10 -96 30 -86" stroke="${C.hairHi}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>
    <g transform="translate(0 14) scale(.9)">${face(o)}</g>
    ${o.bags ? `<path d="M -50 18 q 20 10 40 0 M 10 18 q 20 10 40 0" stroke="#b87a8a" stroke-width="5" fill="none" opacity="${o.bags}"/>` : ''}
    ${o.mask ? `<g opacity="${cl(o.mask * 3)}" transform="translate(0 ${-60 * (1 - o.mask)})"><path d="M -96 -6 Q 0 -24 96 -6" stroke="#2d2a4a" stroke-width="10" fill="none"/><path d="M -78 -16 Q -40 -36 -4 -14 Q 0 -10 4 -14 Q 40 -36 78 -16 Q 86 26 40 30 Q 8 30 0 18 Q -8 30 -40 30 Q -86 26 -78 -16 Z" fill="#5a4fa0" stroke="${C.ol}" stroke-width="6"/><path d="M -54 6 q 14 8 28 0 M 26 6 q 14 8 28 0" stroke="#cfc6ff" stroke-width="5" fill="none" stroke-linecap="round"/></g>` : ''}
    ${o.cap ? `<path d="M -92 -40 Q -60 -150 60 -130 Q 120 -120 150 -40 L 140 -30 Q 100 -90 50 -96 Q -40 -110 -92 -40 Z" fill="#6c5ad6" stroke="${C.ol}" stroke-width="6"/><circle cx="150" cy="-34" r="18" fill="#fff" stroke="${C.ol}" stroke-width="5"/>` : ''}
    ${o.phones ? `<path d="M -92 -10 Q -100 -130 0 -130 Q 100 -130 92 -10" stroke="#2b2f3d" stroke-width="20" fill="none"/><rect x="-118" y="-30" width="40" height="70" rx="16" fill="${o.phoneCol || '#e8465c'}" stroke="${C.ol}" stroke-width="6"/><rect x="78" y="-30" width="40" height="70" rx="16" fill="${o.phoneCol || '#e8465c'}" stroke="${C.ol}" stroke-width="6"/>` : ''}
    ${o.buds ? `<circle cx="-92" cy="10" r="15" fill="#fff" stroke="${C.ol}" stroke-width="5"/><circle cx="92" cy="10" r="15" fill="#fff" stroke="${C.ol}" stroke-width="5"/>` : ''}`;
}
// ---------------- bedroom (side view). light 0..1 = ceiling lamp brightness
function lampCeil(t, x, y, on, o = {}) {
  const sw = (o.swing || 0) * Math.sin(t * 2.2);
  return `<g transform="rotate(${sw} ${x} 0)">
    <line x1="${x}" y1="-10" x2="${x}" y2="${y - 50}" stroke="${C.ol}" stroke-width="6"/>
    ${on > 0 ? `<polygon points="${x - 70},${y} ${x + 70},${y} ${x + 520},${y + 1100} ${x - 520},${y + 1100}" fill="${Z.lampLit}" opacity="${.13 * on}"/><circle cx="${x}" cy="${y + 10}" r="${200}" fill="${Z.lampLit}" opacity="${.35 * on}" filter="url(#blur40)"/>` : ''}
    <path d="M ${x - 110} ${y} Q ${x} ${y - 120} ${x + 110} ${y} Z" fill="#40507e" stroke="${C.ol}" stroke-width="6"/>
    <ellipse cx="${x}" cy="${y + 6}" rx="40" ry="26" fill="${on > .05 ? '#fff6d6' : '#5d6888'}" stroke="${C.ol}" stroke-width="5"/>
    ${on > 0 ? `<g opacity="${on}">${[0, 1, 2, 3, 4].map(i => { const a = (20 + i * 35) * Math.PI / 180, r0 = 70, r1 = 110 + 10 * Math.sin(t * 6 + i); return `<line x1="${x + Math.cos(a) * r0}" y1="${y + Math.sin(a) * r0}" x2="${x + Math.cos(a) * r1}" y2="${y + Math.sin(a) * r1}" stroke="${C.warm}" stroke-width="9" stroke-linecap="round"/>`; }).join('')}</g>` : ''}
  </g>`;
}
function windowW(t, x, y, w, h, o = {}) {
  const close = o.close || 0, id = o.id || 'wn';
  const street = o.street || 0;
  const cw = lerp(w * .16, w * .52, close);
  const sky = o.day ? '#7cc0ff' : '#0d1630';
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${sky}" stroke="${C.ol}" stroke-width="8"/>
    <clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
    <g clip-path="url(#${id})">
      ${o.day ? sunF(t, x + w * .6, y + h * .4, 50) : `${moonF(x + w * .65, y + h * .28, 34)}<circle cx="${x + 40}" cy="${y + 60}" r="3" fill="#fff"/><circle cx="${x + w - 50}" cy="${y + h - 120}" r="2.5" fill="#fff"/>`}
      ${street > 0 ? `<rect x="${x + w * .2}" y="${y + h * .35}" width="12" height="${h}" fill="#2a3150"/><path d="M ${x + w * .2 + 6} ${y + h * .35} q 40 -30 70 0" stroke="#2a3150" stroke-width="10" fill="none"/><ellipse cx="${x + w * .2 + 76}" cy="${y + h * .35 + 8}" rx="22" ry="12" fill="#fff3b0"/><circle cx="${x + w * .2 + 76}" cy="${y + h * .35 + 20}" r="${80}" fill="#ffe28a" opacity="${.45 * street}" filter="url(#blur20)"/>` : ''}
    </g>
    <path d="M ${x + w / 2} ${y} V ${y + h} M ${x} ${y + h * .55} H ${x + w}" stroke="#2a3557" stroke-width="10"/>
    <path d="M ${x - 30} ${y - 20} Q ${x + cw * .6} ${y + h * .5} ${x - 26 + cw * .2} ${y + h + 30} L ${x - 30 + cw} ${y + h + 30} Q ${x + cw * 1.05} ${y + h * .5} ${x - 30 + cw} ${y - 20} Z" fill="#33437a" stroke="${C.ol}" stroke-width="6"/>
    <path d="M ${x + w + 30} ${y - 20} Q ${x + w - cw * .6} ${y + h * .5} ${x + w + 26 - cw * .2} ${y + h + 30} L ${x + w + 30 - cw} ${y + h + 30} Q ${x + w - cw * 1.05} ${y + h * .5} ${x + w + 30 - cw} ${y - 20} Z" fill="#33437a" stroke="${C.ol}" stroke-width="6"/>
    <rect x="${x - 50}" y="${y - 36}" width="${w + 100}" height="20" rx="10" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="5"/></g>`;
}
function roomBg(light, o = {}) {
  const fl = o.floorY || 1250;
  let planks = '';
  for (let i = -6; i <= 14; i++) planks += `<line x1="${540 + i * 40}" y1="${fl}" x2="${540 + i * 170}" y2="1920" stroke="#1a162a" stroke-width="4"/>`;
  return `<rect x="-40" y="-40" width="1160" height="${fl + 40}" fill="url(#gWall)"/>
    <rect x="-40" y="${fl}" width="1160" height="${1960 - fl}" fill="url(#gFloor)"/>${planks}
    <rect x="-40" y="${fl - 14}" width="1160" height="18" fill="#2b2140"/>
    ${light > 0 ? `<rect x="-40" y="-40" width="1160" height="2000" fill="#ffe7a8" opacity="${.18 * light}"/>` : ''}`;
}
// bed in side view. origin = mattress top centre. o.s scale, sleeper options: eyes, mouth, lid, toss (deg), phone (0..1 holding), blanketUp 0..1, kid, armUp
function bedSide(t, x, y, s, o = {}) {
  const up = o.blanketUp ?? 1, br = 4 * Math.sin(t * 2.6) * (o.breath ?? 1);
  const toss = o.toss || 0, hx = -270, hy = -78 + (o.headDy || 0);
  const kid = o.kid ? .78 : 1;
  const blTop = lerp(-30, -120, up) + br;
  const sleeper = o.empty ? '' : `<g transform="translate(${hx} ${hy}) rotate(${-82 + toss}) scale(${kid})">${head({ eyes: o.eyes || 'closed', mouth: o.mouth || 'smile', lid: o.lid, look: o.look, lookY: o.lookY, brows: o.brows, mask: o.mask, cap: o.cap, phones: o.phones, phoneCol: o.phoneCol, buds: o.buds, bags: o.bags, hair: o.hair })}</g>`;
  const body = o.empty ? '' : `<path d="M -190 ${-10} Q -170 ${blTop - 40} -60 ${blTop - 30} Q 120 ${blTop - 50} 230 ${blTop - 10} Q 330 ${blTop - 60} 380 ${blTop + 10} L 400 10 L -200 10 Z" fill="${C.pj}" opacity="${1 - up}"/>`;
  const blanket = `<path d="M ${lerp(-130, -190, up)} 30 L ${lerp(-130, -190, up)} ${blTop + 30} Q ${lerp(-120, -170, up)} ${blTop - 30} -60 ${blTop - 20 * up} Q 120 ${blTop - 40} 230 ${blTop} Q 330 ${blTop - 50} 390 ${blTop + 20} L 420 60 Q 420 110 380 120 L -130 120 Q -170 100 ${lerp(-130, -190, up)} 30 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -40 ${blTop + 40} Q 80 ${blTop + 20} 180 ${blTop + 50} M 220 ${blTop + 70} Q 300 ${blTop + 40} 370 ${blTop + 70}" stroke="${C.blankSh}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M ${lerp(-120, -175, up)} ${blTop + 10} Q -100 ${blTop - 24} -30 ${blTop - 14}" stroke="${C.blankHi}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  const ph = o.phone || 0;
  const phone = ph > 0 ? `<g transform="translate(${lerp(-130, -150, ph) + (o.phoneDx || 0)} ${-150 + (o.phoneDy || 0)}) rotate(${o.phoneRot ?? -20})">${phoneP(t, 0, 0, .7, { glow: o.phoneGlow ?? 1, scroll: o.scroll, back: true })}</g>
    <g transform="translate(-150 -60)"><ellipse cx="${10 + (o.phoneDx || 0) * .4}" cy="${-30 + (o.phoneDy || 0) * .6}" rx="30" ry="34" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/></g>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="250" rx="520" ry="40" fill="#000" opacity=".35"/>
    <rect x="-470" y="-280" width="60" height="520" rx="14" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-470" y="-280" width="60" height="40" rx="14" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="420" y="-90" width="50" height="330" rx="12" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-430" y="60" width="880" height="90" rx="12" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-420" y="-10" width="850" height="90" rx="30" fill="#dfe7f7" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-400" y="150" width="34" height="90" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="6"/><rect x="370" y="150" width="34" height="90" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="6"/>
    <path d="M -400 -20 Q -410 -110 -300 -110 L -170 -100 Q -110 -90 -120 -20 Q -260 0 -400 -20 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -370 -40 Q -270 -60 -170 -50" stroke="${C.pillowSh}" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${body}${sleeper}${blanket}${phone}${o.extra || ''}
  </g>`;
}
function phoneP(t, x, y, s, o = {}) {
  const g = o.glow ?? 1, sc = o.scroll || 0;
  let feed = '';
  for (let i = -1; i < 5; i++) { const yy = -150 + ((i * 80 + sc * 80) % 400 + 400) % 400 - 40; feed += `<rect x="-58" y="${yy}" width="116" height="62" rx="10" fill="${['#ff8fa8', '#7fe6d6', '#ffd27a', '#9b7cf0'][(i + 8) % 4]}" opacity=".9"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${g > 0 && !o.back ? `<circle r="260" fill="${Z.screen}" opacity="${.25 * g}" filter="url(#blur40)"/>` : ''}
    <rect x="-80" y="-160" width="160" height="320" rx="28" fill="#1b2030" stroke="${C.ol}" stroke-width="8"/>
    <clipPath id="ph${o.id || ''}"><rect x="-66" y="-140" width="132" height="280" rx="16"/></clipPath>
    <rect x="-66" y="-140" width="132" height="280" rx="16" fill="${g > 0 ? '#20345e' : '#0b0e16'}"/>
    ${g > 0 ? `<g clip-path="url(#ph${o.id || ''})" opacity="${g}">${feed}</g>` : ''}
    ${o.content || ''}
  </g>`;
}
function tvSet(t, x, y, s, on, o = {}) {
  const shrink = o.offP || 0; // 0 on, 1 off (CRT collapse)
  const sy = shrink < .7 ? 1 - shrink / .7 * .98 : .02, sx = shrink < .7 ? 1 : 1 - (shrink - .7) / .3;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${on > 0 && shrink < 1 ? `<circle r="330" fill="${Z.screen}" opacity="${.25 * on * (1 - shrink)}" filter="url(#blur40)"/>` : ''}
    <rect x="-210" y="-140" width="420" height="270" rx="22" fill="${Z.tv}" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-186" y="-118" width="372" height="226" rx="12" fill="#070a12"/>
    ${on > 0 && shrink < 1 ? `<g transform="scale(${sx} ${sy})"><rect x="-186" y="-118" width="372" height="226" rx="12" fill="#3b6fd8"/>
      <circle cx="${-60 + 30 * Math.sin(t * 2)}" cy="-10" r="44" fill="#ffd27a"/><rect x="20" y="${-40 + 16 * Math.sin(t * 3)}" width="120" height="80" rx="14" fill="#ff8fa8"/><rect x="-186" y="50" width="372" height="58" fill="#5fd08a"/>
      <rect x="-186" y="-118" width="372" height="226" fill="#fff" opacity="${shrink > 0 ? .6 : .05 + .05 * Math.sin(t * 30)}"/></g>` : ''}
    <rect x="-40" y="130" width="80" height="40" fill="#1d2338" stroke="${C.ol}" stroke-width="6"/><rect x="-120" y="166" width="240" height="20" rx="10" fill="#1d2338" stroke="${C.ol}" stroke-width="6"/>
    ${o.extra || ''}</g>`;
}
function nightLight(t, x, y, s, on, o = {}) {
  const rot = o.rot || 0, col = o.col || Z.orange;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${on > 0 ? `<g transform="rotate(${rot})"><polygon points="-30,-30 30,-30 130,-380 -130,-380" fill="${col}" opacity="${.32 * on}"/></g><circle cx="0" cy="-20" r="150" fill="${col}" opacity="${.35 * on}" filter="url(#blur20)"/>` : ''}
    <rect x="-40" y="-20" width="80" height="60" rx="14" fill="#e8e4d8" stroke="${C.ol}" stroke-width="6"/>
    <path d="M -36 -20 Q 0 -90 36 -20 Z" fill="${on > 0 ? '#ffd9a0' : '#8a8f9e'}" stroke="${C.ol}" stroke-width="6"/>
    ${on > 0 ? `<path d="M -36 -20 Q 0 -90 36 -20 Z" fill="${col}" opacity="${.6 * on}"/>` : ''}
  </g>`;
}
function nightstand(x, y, s = 1, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)"><rect x="-110" y="0" width="220" height="230" rx="10" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="-110" y="0" width="220" height="24" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="-86" y="60" width="172" height="70" rx="8" fill="none" stroke="${C.woodSh}" stroke-width="7"/><circle cx="0" cy="95" r="9" fill="#d8b25a"/>${o.extra || ''}</g>`;
}
function digClock(x, y, s, txt, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="230" ry="130" fill="url(#gRed)"/>
    <rect x="-150" y="-62" width="300" height="124" rx="22" fill="#11141d" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-132" y="-46" width="264" height="92" rx="10" fill="#07080c"/>
    <text x="0" y="32" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:84px" fill="${o.col || C.red}">${txt}</text></g>`;
}
function wallClock(t, x, y, r, hours) { // analog clock; hours = time in hours (float)
  const ha = (hours % 12) / 12 * 360, ma = (hours % 1) * 360;
  let ticks = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ticks += `<line x1="${x + Math.cos(a) * r * .78}" y1="${y + Math.sin(a) * r * .78}" x2="${x + Math.cos(a) * r * .9}" y2="${y + Math.sin(a) * r * .9}" stroke="${C.ol}" stroke-width="${i % 3 ? 4 : 8}"/>`; }
  return `<g filter="url(#drop)"><circle cx="${x}" cy="${y}" r="${r}" fill="#f2efe6" stroke="${C.ol}" stroke-width="8"/>${ticks}
    <line x1="${x}" y1="${y}" x2="${x + Math.sin(ha * Math.PI / 180) * r * .5}" y2="${y - Math.cos(ha * Math.PI / 180) * r * .5}" stroke="${C.ol}" stroke-width="12" stroke-linecap="round"/>
    <line x1="${x}" y1="${y}" x2="${x + Math.sin(ma * Math.PI / 180) * r * .75}" y2="${y - Math.cos(ma * Math.PI / 180) * r * .75}" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${x}" cy="${y}" r="10" fill="${C.ol}"/></g>`;
}
// ---------------- body icons
function heartShape(s) { return `M 0 ${40 * s} C ${-10 * s} ${20 * s} ${-80 * s} ${-10 * s} ${-80 * s} ${-50 * s} C ${-80 * s} ${-90 * s} ${-20 * s} ${-100 * s} 0 ${-62 * s} C ${20 * s} ${-100 * s} ${80 * s} ${-90 * s} ${80 * s} ${-50 * s} C ${80 * s} ${-10 * s} ${10 * s} ${20 * s} 0 ${40 * s} Z`; }
function heartF(x, y, s, beat = 0, o = {}) {
  const k = 1 + .14 * beat;
  return `<g transform="translate(${x} ${y}) scale(${s * k})">
    <path d="${heartShape(1.15)}" fill="${Z.heart}" opacity=".35" filter="url(#blur20)"/>
    <path d="${heartShape(1)}" fill="${Z.heart}" stroke="${C.ol}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -56 -58 Q -50 -80 -26 -78" stroke="#ffb3c0" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M 60 -30 Q 50 0 20 20" stroke="${Z.heartSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${o.face ? `<g transform="translate(0 -30) scale(.62)">${face(o.face)}</g>` : ''}</g>`;
}
function ecg(t, x0, y0, w, h, bpm, o = {}) { // scrolling ECG trace
  const per = 60 / Math.max(20, bpm), speed = o.speed || 300;
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const xx = i / 120 * w, tt = (t - (w - xx) / speed), ph = ((tt % per) + per) % per / per;
    let v = 0;
    if (ph > .30 && ph < .34) v = -(ph - .30) / .04 * .2; else if (ph >= .34 && ph < .38) v = -.2 + (ph - .34) / .04 * 1.4; else if (ph >= .38 && ph < .42) v = 1.2 - (ph - .38) / .04 * 1.6; else if (ph >= .42 && ph < .46) v = -.4 + (ph - .42) / .04 * .4; else if (ph > .6 && ph < .72) v = -.18 * Math.sin((ph - .6) / .12 * Math.PI);
    d += `${i ? 'L' : 'M'} ${(x0 + xx).toFixed(1)} ${(y0 - v * h).toFixed(1)} `;
  }
  return `<path d="${d}" stroke="${o.col || Z.green}" stroke-width="${o.sw || 8}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
}
function beatAt(t, bpm, t0 = 0) { const per = 60 / bpm, ph = (((t - t0) % per) + per) % per; return Math.exp(-ph * 9) ; }
function brainF(t, x, y, s, o = {}) {
  const lobes = [[-60, -40, 70], [10, -70, 72], [70, -30, 66], [-80, 30, 60], [0, 10, 76], [80, 40, 56], [-20, 60, 60]];
  let L = '', S = '';
  for (const [lx, ly, r] of lobes) L += `<circle cx="${lx}" cy="${ly}" r="${r}" fill="${Z.brain}" stroke="${C.ol}" stroke-width="7"/>`;
  for (const [lx, ly, r] of lobes) S += `<circle cx="${lx}" cy="${ly}" r="${r - 7}" fill="${Z.brain}"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${o.tilt || 0}) scale(${s * (o.sx || 1)} ${s * (o.sy || 1)})">
    <circle cx="0" cy="0" r="190" fill="${Z.brain}" opacity=".18" filter="url(#blur40)"/>
    <path d="M -30 110 Q -20 170 10 190 L 50 190 Q 40 150 40 110 Z" fill="${Z.brainSh}" stroke="${C.ol}" stroke-width="7"/>
    ${L}${S}
    <path d="M -100 -10 q 30 -30 60 0 q 30 30 60 0 M -40 -90 q 20 20 40 0 M 40 -80 q 10 30 40 30 M -110 50 q 30 -10 50 10 M 60 60 q 20 -20 50 0" stroke="${Z.brainSh}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M -90 -70 Q -70 -100 -30 -100" stroke="#ffd1e0" stroke-width="10" fill="none" stroke-linecap="round"/>
    <g transform="translate(0 20) scale(1.1)">${face({ blush: '#ff6f9a', ...(o.face || {}) })}</g>
    ${o.cap ? `<g transform="translate(-10 -110) rotate(-12)"><path d="M -130 20 Q -60 -110 70 -80 Q 140 -60 190 20 L 170 30 Q 120 -30 60 -40 Q -40 -50 -110 40 Z" fill="#6c5ad6" stroke="${C.ol}" stroke-width="7"/><circle cx="188" cy="26" r="22" fill="#fff" stroke="${C.ol}" stroke-width="6"/></g>` : ''}
  </g>`;
}
function melDrop(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o.op ?? 1}"><path d="M 0 -46 C 18 -20 34 0 34 18 C 34 38 18 50 0 50 C -18 50 -34 38 -34 18 C -34 0 -18 -20 0 -46 Z" fill="${Z.mel}" stroke="${C.ol}" stroke-width="6"/>
    <path d="M 6 6 A 16 16 0 1 0 6 34 A 12 12 0 1 1 6 6 Z" fill="${Z.melHi}"/><path d="M -18 4 Q -16 -10 -6 -20" stroke="#efe8ff" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
}
function scaleF(x, y, s, val, o = {}) { // bathroom scale; val 0..1 needle
  const a = -70 + 140 * val;
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)">
    <rect x="-200" y="-60" width="400" height="120" rx="40" fill="#e9eef8" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-200" y="30" width="400" height="30" rx="15" fill="#b9c3d8"/>
    <rect x="-90" y="-40" width="180" height="70" rx="14" fill="#1b2030" stroke="${C.ol}" stroke-width="6"/>
    <path d="M -70 20 A 70 70 0 0 1 70 20" stroke="#38425e" stroke-width="5" fill="none"/>
    <line x1="0" y1="24" x2="${Math.sin(a * Math.PI / 180) * 56}" y2="${24 - Math.cos(a * Math.PI / 180) * 56}" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>
    ${o.extra || ''}</g>`;
}
function watchF(t, x, y, s, o = {}) { // wrist + smartwatch, o.content inside screen (local coords, screen 200x200 centred)
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})">
    <path d="M -700 -120 Q -200 -150 300 -110 L 300 130 Q -200 160 -700 140 Z" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M -600 80 Q -200 100 260 80" stroke="${C.skinSh}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M 290 -112 Q 420 -110 440 0 Q 420 120 290 130" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-90" y="-170" width="180" height="340" rx="40" fill="#2b2f3d" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-130" y="-130" width="260" height="260" rx="60" fill="#1b2030" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-110" y="-110" width="220" height="220" rx="46" fill="#05070d"/>
    <rect x="128" y="-40" width="20" height="50" rx="8" fill="#5d6888" stroke="${C.ol}" stroke-width="5"/>
    ${o.content || ''}</g>`;
}
function building(x, y, s, o = {}) { // generic university building with columns
  let cols = '';
  for (let i = 0; i < 6; i++) cols += `<rect x="${-250 + i * 92}" y="-200" width="44" height="260" fill="#e7e2d4" stroke="${C.ol}" stroke-width="6"/>`;
  let win = '';
  for (let i = 0; i < 5; i++) win += `<rect x="${-232 + i * 92}" y="-150" width="40" height="70" rx="6" fill="${o.lit ? C.warm : '#2d3f6e'}" opacity=".9"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)">
    <rect x="-330" y="60" width="660" height="50" fill="#cfc8b6" stroke="${C.ol}" stroke-width="7"/>
    <rect x="-300" y="-220" width="600" height="280" fill="#b9b19c" stroke="${C.ol}" stroke-width="7"/>${win}${cols}
    <polygon points="-330,-220 0,-380 330,-220" fill="#d9d2c0" stroke="${C.ol}" stroke-width="7"/>
    <circle cx="0" cy="-275" r="38" fill="#7a6f5a" stroke="${C.ol}" stroke-width="6"/></g>`;
}
function scientist(x, y, s, o = {}) { // personF in lab coat + glasses (origin at feet)
  return `${personF(x, y, s, o)}<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -104 -470 L -120 -150 L -30 -150 L 0 -440 L 30 -150 L 120 -150 L 104 -470 Q 60 -495 0 -488 Q -60 -495 -104 -470 Z" fill="${Z.lab}" stroke="${C.ol}" stroke-width="6" opacity=".96"/>
    <g transform="translate(0 ${o.headDy || 0})"><circle cx="-46" cy="-612" r="38" fill="none" stroke="${C.ol}" stroke-width="7"/><circle cx="46" cy="-612" r="38" fill="none" stroke="${C.ol}" stroke-width="7"/><path d="M -8 -612 H 8" stroke="${C.ol}" stroke-width="7"/></g>
    ${o.board ? `<g transform="translate(150 -330) rotate(10)"><rect x="-60" y="-80" width="120" height="160" rx="10" fill="#c99a62" stroke="${C.ol}" stroke-width="6"/><rect x="-46" y="-60" width="92" height="124" fill="#fff"/><path d="M -34 -36 H 34 M -34 -12 H 34 M -34 12 H 20" stroke="#8aa0c8" stroke-width="6"/></g>` : ''}</g>`;
}
function tiny(x, y, s, o = {}) { // tiny person icon (origin feet)
  const col = o.col || C.pj, hair = o.hair || C.hair;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-18" y="-38" width="15" height="38" rx="7" fill="#33405e" stroke="${C.ol}" stroke-width="4"/><rect x="3" y="-38" width="15" height="38" rx="7" fill="#33405e" stroke="${C.ol}" stroke-width="4"/>
    ${o.dress ? `<path d="M -26 -32 L -18 -92 L 18 -92 L 26 -32 Z" fill="${col}" stroke="${C.ol}" stroke-width="4"/>` : `<rect x="-23" y="-90" width="46" height="58" rx="18" fill="${col}" stroke="${C.ol}" stroke-width="4"/>`}
    <circle cx="0" cy="-112" r="23" fill="${C.skin}" stroke="${C.ol}" stroke-width="4"/>
    ${o.long ? `<path d="M -26 -100 Q -30 -140 0 -140 Q 30 -140 26 -100 L 26 -86 Q 18 -120 0 -122 Q -18 -120 -26 -86 Z" fill="${hair}" stroke="${C.ol}" stroke-width="3"/>` : `<path d="M -23 -114 Q -23 -138 0 -138 Q 23 -138 23 -114 Q 10 -124 0 -120 Q -12 -126 -23 -114 Z" fill="${hair}"/>`}
    <circle cx="-8" cy="-110" r="3.4" fill="${C.ol}"/><circle cx="8" cy="-110" r="3.4" fill="${C.ol}"/>
    <path d="M -6 -100 Q 0 -95 6 -100" stroke="${C.ol}" stroke-width="3" fill="none"/></g>`;
}
function badge(x, y, s, n, p, col = C.warm) { // numbered tip badge
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * back(p)}) rotate(${-12 * (1 - p)})"><circle r="92" fill="${col}" stroke="${C.ol}" stroke-width="9"/><circle r="74" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>${T(0, 40, 120, n, C.ol, { sw: 0 })}</g>`;
}
function bubble(cx, cy, rx, ry, p, inner, id, o = {}) { // thought bubble with clipped inner content (inner in bubble-local coords)
  if (p <= 0) return '';
  const path = scallop(0, 0, rx, ry, o.n || 13);
  let dots = '';
  if (o.tail) for (const [dx, dy, r] of o.tail) dots += `<circle cx="${dx}" cy="${dy}" r="${r * cl(p * 1.4)}" fill="#e9f0ff" stroke="${C.ol}" stroke-width="5"/>`;
  return `${dots}<g transform="translate(${cx} ${cy}) scale(${back(p)})">
    <path d="${path}" fill="#000" opacity=".35" transform="translate(0 16)" filter="url(#blur8)"/>
    <clipPath id="${id}"><path d="${path}"/></clipPath>
    <path d="${path}" fill="${o.bg || '#1d2a52'}"/><g clip-path="url(#${id})">${inner}</g>
    <path d="${path}" fill="none" stroke="#e9f0ff" stroke-width="13"/><path d="${path}" fill="none" stroke="${C.ol}" stroke-width="5"/></g>`;
}
function raysFrom(t, x0, y0, x1, y1, n, w, col = C.warm, op = 1) { // animated dashed light rays
  let s = '';
  for (let i = 0; i < n; i++) {
    const f = n > 1 ? i / (n - 1) - .5 : 0, ox = -(y1 - y0), oy = (x1 - x0), L = Math.hypot(ox, oy) || 1;
    const dx = ox / L * f * w, dy = oy / L * f * w;
    s += `<line x1="${x0 + dx * .3}" y1="${y0 + dy * .3}" x2="${x1 + dx}" y2="${y1 + dy}" stroke="${col}" stroke-width="12" stroke-linecap="round" stroke-dasharray="40 30" stroke-dashoffset="${-t * 300 + i * 17}" opacity="${op}"/>`;
  }
  return s;
}
function chapter(t, t0, t1, n, icon, col) { // chapter card: number stamps in, icon bounces
  const p = back(prog(t, t0, t0 + .3)), q = back(prog(t, t0 + .45, t0 + .8));
  const sq = 1 + .15 * Math.exp(-Math.max(0, t - t0 - .3) * 8) * Math.sin((t - t0) * 30);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Z.night}"/><circle cx="540" cy="800" r="520" fill="${col}" opacity=".12" filter="url(#blur40)"/>
    ${stars(40, n * 7)}
    <g transform="translate(540 520) scale(${p * sq})">${T(0, 120, 360, n, col, { sw: 14 })}</g>
    <g transform="translate(540 1050) scale(${q}) translate(0 ${-10 * Math.sin(t * 3)})">${icon}</g>`;
}
function sugarCube(x, y, s, rot = 0) { return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-30" y="-30" width="60" height="60" rx="8" fill="${Z.sugar}" stroke="${C.ol}" stroke-width="6"/><path d="M -18 -18 h 10 M 6 4 h 8 M -10 14 h 6" stroke="#c8d2ea" stroke-width="5" stroke-linecap="round"/></g>`; }
function keyF(x, y, s, rot = 0) { return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle cx="-40" cy="0" r="28" fill="${Z.key}" stroke="${C.ol}" stroke-width="6"/><circle cx="-40" cy="0" r="10" fill="${C.ol}"/><rect x="-14" y="-10" width="80" height="20" rx="4" fill="${Z.key}" stroke="${C.ol}" stroke-width="6"/><rect x="40" y="6" width="12" height="22" fill="${Z.key}" stroke="${C.ol}" stroke-width="5"/><rect x="56" y="6" width="10" height="16" fill="${Z.key}" stroke="${C.ol}" stroke-width="5"/></g>`; }
function sendPlane(x, y, s, rot = 0) { return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M -60 -10 L 70 -50 L 20 60 L 0 10 Z" fill="#e9f0ff" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/><path d="M 0 10 L 70 -50" stroke="${C.ol}" stroke-width="5"/><path d="M 0 10 L 4 40 L 20 22" fill="#b9c8e8" stroke="${C.ol}" stroke-width="5" stroke-linejoin="round"/></g>`; }
function curtainCut(t, t0, dir = 1) { // wipe transition helper: returns overlay blanket swoosh during [t0-.25, t0+.25]
  const p = prog(t, t0 - .25, t0 + .25); if (p <= 0 || p >= 1) return '';
  const x = lerp(-1300, 1300, eio(p)) * dir;
  return `<g transform="translate(${x} 0)"><path d="M -60 -40 L 1140 -40 L 1140 1960 L -60 1960 Q 40 960 -60 -40 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="10"/></g>`;
}

// ===== v6: "Mit Kopfhörern einschlafen" =====
const PH = '#e8465c';
function wallSwitch(x, y, on, press = 0) {
  return `<g transform="translate(${x} ${y})" filter="url(#drop)"><rect x="-44" y="-64" width="88" height="128" rx="14" fill="#e9eef8" stroke="${C.ol}" stroke-width="6"/>
    <rect x="-20" y="${on ? -40 : -4}" width="40" height="44" rx="8" fill="${on ? C.warm : '#b9c3d8'}" stroke="${C.ol}" stroke-width="5"/></g>`;
}

function noteF(x, y, s, rot = 0, col = C.warm, k = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${k % 2 ? `<ellipse cx="-20" cy="20" rx="20" ry="15" fill="${col}" stroke="${C.ol}" stroke-width="5" transform="rotate(-20 -20 20)"/><ellipse cx="40" cy="10" rx="20" ry="15" fill="${col}" stroke="${C.ol}" stroke-width="5" transform="rotate(-20 40 10)"/><path d="M -2 18 V -50 L 58 -60 V 8" stroke="${C.ol}" stroke-width="7" fill="none"/>`
    : `<ellipse cx="0" cy="20" rx="20" ry="15" fill="${col}" stroke="${C.ol}" stroke-width="5" transform="rotate(-20 0 20)"/><path d="M 18 14 V -50 Q 40 -36 42 -14" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`}</g>`;
}
function notesFlow(t, t0, t1, x, y, dir = 1, n = 12, col) { // notes streaming out from a point
  if (t < t0) return '';
  let s = '';
  for (let k = 0; k < 60; k++) {
    const te = t0 + k * .28; if (te > t || te > t1) break;
    const p = (t - te) / 1.8; if (p >= 1) continue;
    const ang = (hash(k) - .5) * 1.4 - Math.PI / 2;
    s += `<g opacity="${Math.sin(p * Math.PI)}">${noteF(x + Math.cos(ang) * 260 * p * dir, y + Math.sin(ang) * 260 * p, .7 + .4 * p, 20 * Math.sin(t * 3 + k), col || ['#ffd27a', '#7fe6d6', '#ff8fa8', '#9b7cf0'][k % 4], k)}</g>`;
  }
  return s;
}
function earF(x, y, s, o = {}) { // big ear (side view), local ~ 300x440
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${o.glow ? `<ellipse cx="0" cy="0" rx="260" ry="320" fill="${o.glowCol || C.warm}" opacity="${.3 * o.glow}" filter="url(#blur40)"/>` : ''}
    <path d="M -60 200 Q -140 160 -150 40 Q -170 -170 10 -210 Q 170 -230 180 -60 Q 186 40 110 90 Q 60 130 60 190 Q 60 250 0 250 Q -40 250 -60 200 Z" fill="${C.skin}" stroke="${C.ol}" stroke-width="10"/>
    <path d="M -100 30 Q -110 -140 20 -160 Q 130 -170 130 -60 Q 130 10 70 40" stroke="${C.skinSh}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M -40 -40 Q 0 -90 50 -50 Q 70 -20 40 10" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <ellipse cx="-10" cy="40" rx="42" ry="52" fill="#b8705a" stroke="${C.ol}" stroke-width="8"/><ellipse cx="0" cy="48" rx="20" ry="28" fill="#5a2d2a"/>
    <path d="M -50 140 Q -20 190 20 170" stroke="${C.skinSh}" stroke-width="14" fill="none" stroke-linecap="round"/></g>`;
}
function hairCell(x, y, s, o = {}) { // o.bend deg, o.broken 0..1, o.face
  const b = o.bend || 0, br = o.broken || 0;
  const col = br > .5 ? '#9aa4bb' : '#ff9fbf';
  let hairs = '';
  for (let i = 0; i < 5; i++) {
    const hx = -32 + i * 16, h = 60 + 12 * Math.sin(i * 1.3) - (i === 2 ? -10 : 0);
    const ang = b + br * (i % 2 ? 70 : -60);
    hairs += `<g transform="translate(${hx} -60) rotate(${ang})"><line x1="0" y1="0" x2="0" y2="${-h * (1 - .3 * br)}" stroke="${C.ol}" stroke-width="13" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="${-h * (1 - .3 * br)}" stroke="${br > .5 ? '#c9d2e6' : '#ffe0ea'}" stroke-width="6" stroke-linecap="round"/></g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${hairs}
    <rect x="-52" y="-66" width="104" height="140" rx="44" fill="${col}" stroke="${C.ol}" stroke-width="7"/>
    <g transform="translate(0 4) scale(.62)">${face(o.face || (br > .5 ? { eyes: 'x', mouth: 'wavy' } : { eyes: 'n', mouth: 'smile' }))}</g>
    ${o.wire !== undefined && o.wire > 0 ? `<path d="M 0 74 Q ${10} 120 0 ${74 + 110 * o.wire}" stroke="${C.warm}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="0" cy="${74 + 110 * o.wire}" r="10" fill="${C.warm}" stroke="${C.ol}" stroke-width="4"/>` : ''}</g>`;
}
function cochlea(x, y, s, p = 1, t = 0) {
  let d = '';
  for (let i = 0; i <= 120 * p; i++) { const a = i / 120 * Math.PI * 5.2, r = 180 * Math.exp(-a * .24); d += `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)} `; }
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${t * 10})"><path d="${d}" stroke="${C.ol}" stroke-width="64" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#ff9fbf" stroke-width="48" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#ffd1e0" stroke-width="12" fill="none" stroke-linecap="round"/></g>`;
}
function mouseF(x, y, s, o = {}) {
  const t = o.t || 0, fur = o.fur || 0;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.flip ? -1 : 1)} ${s})">
    <path d="M 120 40 Q 220 60 230 -20 Q 236 -60 270 -60" stroke="#ff9fbf" stroke-width="12" fill="none" stroke-linecap="round" transform="rotate(${8 * Math.sin(t * 3)} 120 40)"/>
    <ellipse cx="40" cy="20" rx="${120 + 6 * fur}" ry="80" fill="#c9d2e6" stroke="${C.ol}" stroke-width="7"/>
    <circle cx="-60" cy="-70" r="50" fill="#c9d2e6" stroke="${C.ol}" stroke-width="7"/><circle cx="-60" cy="-70" r="30" fill="#ffb3c8"/>
    <circle cx="20" cy="-80" r="50" fill="#c9d2e6" stroke="${C.ol}" stroke-width="7"/><circle cx="20" cy="-80" r="30" fill="#ffb3c8"/>
    <path d="M -110 -20 Q -60 -60 0 -30 Q 30 20 -20 50 Q -80 70 -130 30 Z" fill="#dde3f0" stroke="${C.ol}" stroke-width="7"/>
    <circle cx="-136" cy="24" r="12" fill="#ff8fa8" stroke="${C.ol}" stroke-width="4"/>
    <g transform="translate(-55 6) scale(.55)">${face({ blushA: .3, ...(o.face || {}) })}</g>
    <path d="M -130 30 L -180 20 M -130 36 L -178 44" stroke="${C.ol}" stroke-width="3"/>
    ${o.phones ? `<path d="M -110 -60 Q -30 -170 60 -70" stroke="#2b2f3d" stroke-width="12" fill="none"/><rect x="-125" y="-70" width="30" height="50" rx="12" fill="${PH}" stroke="${C.ol}" stroke-width="5"/>` : ''}</g>`;
}
function hourglass(x, y, s, sand, o = {}) { // sand 0..1 amount in top
  const t = o.t || 0;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <rect x="-90" y="-150" width="180" height="22" rx="8" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/><rect x="-90" y="128" width="180" height="22" rx="8" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
    <clipPath id="hg${o.id}"><path d="M -70 -128 L 70 -128 Q 70 -40 8 0 Q 70 40 70 128 L -70 128 Q -70 40 -8 0 Q -70 -40 -70 -128 Z"/></clipPath>
    <path d="M -70 -128 L 70 -128 Q 70 -40 8 0 Q 70 40 70 128 L -70 128 Q -70 40 -8 0 Q -70 -40 -70 -128 Z" fill="#1b2340" opacity=".8"/>
    <g clip-path="url(#hg${o.id})"><rect x="-80" y="${-120 * sand}" width="160" height="${120 * sand}" fill="${o.col || C.warm}"/>
      <path d="M -80 128 L -80 ${128 - 70 * (1 - sand)} Q 0 ${100 - 110 * (1 - sand)} 80 ${128 - 70 * (1 - sand)} L 80 128 Z" fill="${o.col || C.warm}"/>
      ${sand > .01 ? `<line x1="0" y1="0" x2="0" y2="128" stroke="${o.col || C.warm}" stroke-width="6" stroke-dasharray="10 8" stroke-dashoffset="${-t * 60}"/>` : ''}</g>
    <path d="M -70 -128 L 70 -128 Q 70 -40 8 0 Q 70 40 70 128 L -70 128 Q -70 40 -8 0 Q -70 -40 -70 -128 Z" fill="none" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -50 -110 Q -50 -60 -20 -30" stroke="#fff" stroke-width="7" opacity=".4" fill="none" stroke-linecap="round"/></g>`;
}
function gauge(x, y, s, v, o = {}) { // v 0..1 needle
  const a = Math.PI * (1 + v);
  let arc = '';
  const cols = ['#5fd08a', '#9fdc6a', '#f2d24a', '#ff9a3c', '#ff5468'];
  for (let i = 0; i < 5; i++) { const a0 = Math.PI * (1 + i / 5), a1 = Math.PI * (1 + (i + 1) / 5); arc += `<path d="M ${Math.cos(a0) * 200} ${Math.sin(a0) * 200} A 200 200 0 0 1 ${Math.cos(a1) * 200} ${Math.sin(a1) * 200}" stroke="${cols[i]}" stroke-width="56" fill="none"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -260 30 A 260 260 0 0 1 260 30 Z" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>${arc}
    <path d="M -228 0 A 228 228 0 0 1 228 0" stroke="${C.ol}" stroke-width="5" fill="none"/>
    <line x1="0" y1="0" x2="${Math.cos(a) * 190}" y2="${Math.sin(a) * 190}" stroke="${C.ol}" stroke-width="20" stroke-linecap="round"/><line x1="0" y1="0" x2="${Math.cos(a) * 190}" y2="${Math.sin(a) * 190}" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
    <circle r="26" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/></g>`;
}
function phones(x, y, s, o = {}) { // headphones (front view)
  const shk = o.shake || 0;
  return `<g transform="translate(${x + shk * Math.sin((o.t || 0) * 70)} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <path d="M -150 40 Q -170 -190 0 -190 Q 170 -190 150 40" stroke="${C.ol}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M -150 40 Q -170 -190 0 -190 Q 170 -190 150 40" stroke="#3a3f55" stroke-width="28" fill="none" stroke-linecap="round"/>
    <rect x="-200" y="0" width="90" height="150" rx="40" fill="${PH}" stroke="${C.ol}" stroke-width="8"/><rect x="110" y="0" width="90" height="150" rx="40" fill="${PH}" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-186" y="20" width="24" height="110" rx="12" fill="#ff8a9a"/><rect x="124" y="20" width="24" height="110" rx="12" fill="#ff8a9a"/></g>`;
}
function soundWaves(t, x, y, s, n = 3, col = C.warm, dir = 1) {
  let w = '';
  for (let k = 0; k < n; k++) { const p = ((t * 1.5 + k / n) % 1); w += `<path d="M ${x + dir * (30 + 120 * p)} ${y - 60 - 50 * p} Q ${x + dir * (70 + 150 * p)} ${y} ${x + dir * (30 + 120 * p)} ${y + 60 + 50 * p}" stroke="${col}" stroke-width="${12 * s}" fill="none" stroke-linecap="round" opacity="${1 - p}"/>`; }
  return w;
}
function sleepFace(t, o = {}) { // close-up sleeper on pillow with headphones
  return `${roomBg(0)}
    <path d="M -40 760 Q 120 560 420 600 Q 700 640 760 820 Q 800 1100 560 1260 L -40 1300 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <g transform="translate(380 930) rotate(-12) scale(2.6)">${head({ eyes: 'closed', mouth: 'smile', phones: o.phones ?? 1, phoneCol: PH, ...o })}</g>
    <path d="M -40 1300 Q 300 1180 640 1220 Q 900 1200 1120 1120 L 1120 1960 L -40 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 100 1400 Q 400 1330 700 1380" stroke="${C.blankSh}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
}
// ---- A 0–4.18 headphones on, music on, falls asleep
function sA(t) {
  const on = back(prog(t, 1.4, 1.75));
  const music = t > 2.88;
  const asleep = t > 3.75;
  const drop = on > 0 ? 0 : 1;
  return `${roomBg(0)}${windowW(t, 90, 330, 250, 340, { id: 'aW' })}${lampCeil(t, 620, 300, 0)}
    ${nightstand(930, 1030, .8, { extra: '' })}
    ${phoneP(t, 930, 990, .32, { glow: music ? 1 : 0 })}
    ${bedSide(t, 470, 1060, .95, { eyes: asleep ? 'closed' : 'n', mouth: 'smile', phones: on > 0 ? 1 : 0, phoneCol: PH, headDy: on > 0 ? -10 * (1 - on) : 0 })}
    ${on > 0 && on < 1 ? '' : ''}
    ${t < 1.45 ? phones(214, lerp(-250, 930, ein(prog(t, .5, 1.45))), .4, { rot: -60 * prog(t, .7, 1.45) }) : ''}
    ${music ? notesFlow(t, 2.9, 999, 214, 950, 1) : ''}
    ${zzz(t, 300, 880, .8, prog(t, 3.8, 4.1))}`;
}
// ---- B 4.18–8.72 seven hours later the music is still playing
function sB(t) {
  const hrs = 23 + 7 * eio(prog(t, 5.0, 6.1));
  const day = t > 6.0;
  const flash = t > 6.0 ? Math.exp(-(t - 6.0) * 5) : 0;
  return `${roomBg(day ? .5 : 0)}${windowW(t, 90, 330, 250, 340, { id: 'bW', day })}
    ${wallClock(t, 760, 420, 150, hrs)}
    ${popT(760, 670, 110, '+7 h', back(prog(t, 5.5, 5.8)), C.warm)}
    ${bedSide(t, 470, 1060, .95, { eyes: 'closed', mouth: 'smile', phones: 1, phoneCol: PH })}
    ${notesFlow(t, 4.0, 999, 214, 950, 1)}
    ${soundWaves(t, 214, 960, 1, 3, C.warm, 1)}
    ${flash > .02 ? `<rect width="1080" height="1920" fill="#fff" opacity="${.3 * flash}"/>` : ''}`;
}
// ---- C 8.72–13.24 ears have no off switch; they keep working
function sC(t) {
  if (t < 10.96) {
    const sw = back(prog(t, 9.6, 9.9));
    const x = prog(t, 9.94, 10.3);
    const ring_ = soundWaves(t, 380, 900, 1.2, 3, C.warm, -1);
    return `<rect width="1080" height="1920" fill="#1d2b4a"/><ellipse cx="540" cy="900" rx="560" ry="700" fill="${C.skin}" opacity=".1"/>
      ${ring_}${earF(500, 880, 1.6, { glow: 1 })}
      ${sw > 0 ? `<g transform="translate(850 560) scale(${sw * 1.4})">${wallSwitch(0, 0, true)}</g>` : ''}
      ${bigX(850, 560, .7, x)}`;
  }
  let gears = '';
  const g = back(prog(t, 12.0, 12.3));
  if (g > 0) gears = `<g transform="translate(720 520) scale(${g})"><circle r="150" fill="#1d2a52" stroke="${C.ol}" stroke-width="8"/>${gear(-40, -20, 60, 9, t * 3, '#9fc2ff')}${gear(50, 50, 44, 7, -t * 4, C.warm)}</g><path d="M 520 760 L 610 640" stroke="#e9f0ff" stroke-width="10" stroke-dasharray="14 12"/>`;
  return `${sleepFace(t)}${notesFlow(t, 10.9, 999, 250, 850, 1)}${gears}${zzz(t, 560, 700, 1, 1)}`;
}
// ---- D 13.24–28.3 inner ear: ~16,000 hair cells; sound → signals → brain; loud/long damages; don't regrow
function cellsRow(t, o = {}) {
  let s = '';
  const n = 5;
  for (let i = 0; i < n; i++) {
    const p = o.pop ? back(prog(t, o.pop + i * .08, o.pop + .25 + i * .08)) : 1;
    if (p <= 0) continue;
    const br = o.broken ? cl((o.broken(i))) : 0;
    s += hairCell(150 + i * 195, o.y || 1150, 1.05 * p, { bend: (o.bend || 0) * Math.sin(t * 9 - i * .8), broken: br, wire: o.wire ? o.wire(i) : undefined, face: o.face });
  }
  return s;
}
function sD(t) {
  if (t < 17.0) {
    const zoom = eio(prog(t, 13.24, 13.9));
    const co = prog(t, 13.4, 14.2);
    const many = prog(t, 14.9, 15.9);
    let mini = '';
    if (many > 0) for (let i = 0; i < 60; i++) { const p = back(prog(t, 14.9 + i * .015, 15.15 + i * .015)); if (p <= 0) continue; mini += hairCell(70 + (i % 12) * 85, 920 + Math.floor(i / 12) * 100, .36 * p, { bend: 10 * Math.sin(t * 6 + i) }); }
    const cnt = 16000 * eio(prog(t, 14.98, 15.9));
    return `<rect width="1080" height="1920" fill="#2a1424"/><circle cx="540" cy="620" r="460" fill="#ff9fbf" opacity=".12" filter="url(#blur40)"/>
      ${zoom < 1 ? `<g opacity="${1 - zoom}">${earF(540, 800, 1.6 + 2 * zoom)}</g>` : ''}
      ${co > 0 ? `<g opacity="${cl(zoom * 2)}">${cochlea(540, many > 0 ? lerp(560, 420, eio(many)) : 560, lerp(1.3, .9, eio(many)), co, t)}</g>` : ''}
      ${mini}
      ${many > 0 ? popT(540, 760, 130, fmt(cnt), back(prog(t, 14.98, 15.2)), C.warm) : ''}`;
  }
  // signal path
  const wave = prog(t, 17.4, 18.4);
  const sig = t > 18.1;
  const brainLit = back(prog(t, 19.4, 19.7));
  const loud = t > 21.44;
  const longC = prog(t, 22.4, 23.4);
  const dmg = (i) => prog(t, 24.5 + i * .1, 24.8 + i * .1);
  const water = prog(t, 25.6, 27.0);
  const xP = prog(t, 27.14, 27.4);
  let zaps = '';
  if (sig && t < 21.44) for (let i = 0; i < 5; i++) for (let k = 0; k < 3; k++) { const p = ((t - 18.1) * 1.2 + k / 3 + i * .13) % 1; const x0 = 150 + i * 195; zaps += `<circle cx="${lerp(x0, 540, p)}" cy="${lerp(1240, 520, p)}" r="12" fill="${C.warm}" stroke="${C.ol}" stroke-width="4" opacity="${Math.sin(p * Math.PI)}"/>`; }
  let wv = '';
  if (wave > 0) { const wx = loud ? lerp(-100, 1180, ((t - 21.44) * .7) % 1) : lerp(-100, 1180, wave); const amp = loud ? 120 : 50; wv = `<path d="${Array.from({ length: 40 }, (_, i) => `${i ? 'L' : 'M'} ${wx - 400 + i * 20} ${980 + amp * Math.sin(i * .9 - t * 12)}`).join(' ')}" stroke="${loud ? C.red : '#7fe6d6'}" stroke-width="${loud ? 18 : 10}" fill="none" stroke-linecap="round" opacity=".85"/>`; }
  return `<rect width="1080" height="1920" fill="#2a1424"/>
    <rect x="0" y="1230" width="1080" height="200" fill="#5a2438" stroke="${C.ol}" stroke-width="6"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M ${150 + i * 195} 1230 Q ${(150 + i * 195 + 540) / 2} 900 540 ${560}" stroke="#7a3a58" stroke-width="10" fill="none" opacity=".7"/>`).join('')}
    ${zaps}
    ${brainF(t, 540, 400, .75, { face: brainLit > 0 && !loud ? { eyes: 'happy', mouth: 'grin' } : loud ? { eyes: 'tight', mouth: 'wavy' } : { eyes: 'n', mouth: 'smile' } })}
    ${wv}
    ${cellsRow(t, { y: 1140, bend: loud ? 40 * (1 - cl(dmg(2))) : wave > 0 ? 18 : 6, broken: dmg })}
    ${loud && longC > 0 && t < 25.36 ? `<g transform="translate(900 760) scale(.8)">${wallClock(t, 0, 0, 100, 1 + 10 * longC)}</g>` : ''}
    ${water > 0 ? `<g transform="translate(${lerp(1200, 820, eout(prog(t, 25.4, 25.8)))} 760) rotate(${-25 * Math.sin(prog(t, 25.8, 27) * Math.PI)})"><path d="M -100 -60 L 80 -60 L 60 60 L -80 60 Z" fill="#7fb3e8" stroke="${C.ol}" stroke-width="7"/><path d="M -100 -40 L -200 -100" stroke="${C.ol}" stroke-width="22" stroke-linecap="round"/><path d="M -100 -40 L -200 -100" stroke="#7fb3e8" stroke-width="10" stroke-linecap="round"/><path d="M 70 -50 Q 130 -40 110 30" stroke="${C.ol}" stroke-width="10" fill="none"/></g>
      ${[0, 1, 2, 3, 4, 5].map(k => { const p = ((t - 25.8) * 1.5 + k / 6) % 1; return t > 25.8 && t < 27.2 ? `<circle cx="${620 - 40 * p + k * 6}" cy="${700 + 360 * p}" r="9" fill="#9fd8ff"/>` : ''; }).join('')}` : ''}
    ${cross(540, 760, 1.1, xP)}`;
}
// ---- E 28.3–30.32 how much is too much?
function sE(t) {
  const lv = eio(prog(t, 28.4, 29.4));
  const q = back(prog(t, 29.5, 29.8));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 31)}
    ${phones(540, 640, 1.4, { t, shake: 4 * lv })}${soundWaves(t, 300, 760, 1.2, 3, C.warm, -1)}${soundWaves(t, 780, 760, 1.2, 3, C.warm, 1)}
    <rect x="190" y="1080" width="700" height="60" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="7"/><rect x="198" y="1088" width="${684 * lv + 1}" height="44" rx="22" fill="${lv > .7 ? C.red : C.warm}"/>
    <circle cx="${198 + 684 * lv}" cy="1110" r="44" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/>
    ${popT(540, 300, 220, '?', q, C.warm)}`;
}
// ---- F 30.32–38.5 WHO guideline: 80 dB, max 40 h per week
function sF(t) {
  const sh = back(prog(t, 30.4, 30.8));
  const g = back(prog(t, 34.6, 34.9));
  const v = lerp(0, .5, eout(prog(t, 34.8, 35.3)));
  const db = back(prog(t, 35.36, 35.6));
  const wk = back(prog(t, 36.6, 36.9));
  let days = '';
  for (let i = 0; i < 7; i++) { const p = back(prog(t, 37.2 + i * .08, 37.45 + i * .08)); if (p > 0) days += `<g transform="translate(${170 + i * 123} 1250) scale(${p})"><rect x="-50" y="-50" width="100" height="100" rx="14" fill="#2a3d7a" stroke="${C.ol}" stroke-width="6"/>${moonF(0, 0, 26)}</g>`; }
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 33)}
    ${sh > 0 ? `<g transform="translate(540 330) scale(${sh})">${earth(t, 0, 0, 130)}<g transform="translate(130 90)"><path d="M 0 -80 L 70 -55 Q 70 40 0 80 Q -70 40 -70 -55 Z" fill="${Z.green}" stroke="${C.ol}" stroke-width="8"/><path d="M -30 0 L -6 24 L 34 -22" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` : ''}
    ${g > 0 ? `<g transform="translate(540 860) scale(${g})">${gauge(0, 0, 1, v)}</g>` : ''}
    ${popT(540, 960, 110, '80 dB', db, C.warm)}
    ${popT(540, 1120, 110, '40 h', wk, C.warm)}
    ${days}`;
}
// ---- G 38.5–47.88 7 h × 7 nights = 49 h > 40 h — exceeded while asleep
function sG(t) {
  const base = 1300, unit = 16; // px per hour
  let blocks = '';
  let filled = 0;
  for (let i = 0; i < 7; i++) {
    const t0 = 38.6 + i * .25;
    const p = eout(prog(t, t0, t0 + .35)); if (p <= 0) continue;
    filled = i + 1;
    const y = base - (i + 1) * 7 * unit;
    blocks += `<g transform="translate(${lerp(1200, 0, p)} ${lerp(-300, 0, p)})"><rect x="560" y="${y}" width="300" height="${7 * unit}" rx="8" fill="${i * 7 + 7 > 40 && t > 44.5 ? C.red : '#5d76c8'}" stroke="${C.ol}" stroke-width="6"/>${moonF(610, y + 56, 22)}</g>`;
  }
  const sum = Math.round(cl((t - 38.6) / 1.9) * 49);
  const over = t > 44.6;
  const [sx, sy] = shake(t, 44.62, 12);
  const lineY = base - 40 * unit;
  const sleepIn = eout(prog(t, 46.4, 46.9));
  return `<g transform="translate(${sx} ${sy})"><rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 35)}
    <rect x="540" y="${base}" width="340" height="12" fill="#33405e"/>
    ${blocks}
    <line x1="500" y1="${lineY}" x2="920" y2="${lineY}" stroke="${Z.green}" stroke-width="10" stroke-dasharray="26 16"/>${T(440, lineY + 30, 70, '40 h', Z.green)}
    ${popT(710, 330, 140, sum + ' h', t > 38.6 ? 1 + .15 * Math.exp(-Math.max(0, t - 40.5) * 4) : 0, over ? C.red : C.warm)}
    ${over ? `<rect x="560" y="${base - 49 * unit}" width="300" height="${9 * unit}" fill="none" stroke="${C.red}" stroke-width="10" opacity="${.6 + .4 * Math.sin(t * 12)}"/>` : ''}
    ${sleepIn > 0 ? `<g transform="translate(${lerp(-300, 0, sleepIn)} 0)">${bedSide(t, 250, 1130, .48, { eyes: 'closed', mouth: 'smile', phones: 1, phoneCol: PH })}${zzz(t, 160, 1050, .7, 1)}</g>` : ''}
    ${!sleepIn && t < 43 ? `<g>${phones(260, 820, .8, { t })}${notesFlow(t, 38.5, 999, 260, 860)}</g>` : ''}
    ${!sleepIn && t >= 43 ? `<g>${phones(260, 820, .8, { t, shake: 6 })}${soundWaves(t, 100, 900, 1, 3, C.red, -1)}${soundWaves(t, 420, 900, 1, 3, C.red, 1)}</g>` : ''}</g>`;
}
// ---- H 47.88–59.27 louder → shorter safe time; US standard: halves every +3 dB
function hardHat(x, y, s) {
  return `${personF(x, y, s, { mouth: 'smile', look: -10, aR: -60 })}<g transform="translate(${x} ${y}) scale(${s})"><path d="M -140 -640 Q -140 -790 0 -790 Q 140 -790 140 -640 Z" fill="#f2c230" stroke="${C.ol}" stroke-width="8"/><rect x="-160" y="-660" width="320" height="30" rx="14" fill="#f2c230" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -130 -600 Q -130 -760 0 -770 Q 130 -760 130 -600" stroke="#2b2f3d" stroke-width="16" fill="none"/><rect x="-158" y="-650" width="56" height="96" rx="24" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/><rect x="102" y="-650" width="56" height="96" rx="24" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/></g>`;
}
function sH(t) {
  if (t < 51.42) {
    const v = eio(prog(t, 48.0, 48.9));
    const sand = lerp(1, .3, eio(prog(t, 49.5, 50.6)));
    const hs = lerp(1.3, .75, eio(prog(t, 49.7, 50.7)));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 37)}
      ${gauge(540, 560, 1, v)}${arrow(860, 620, 860, 380, C.red, 36, prog(t, 48.1, 48.4))}
      ${hourglass(540, 1090, hs, sand, { id: 'h1', t })}${arrow(860, 960, 860, 1200, '#5d76c8', 36, prog(t, 49.7, 50.0))}`;
  }
  const hat = eout(prog(t, 52.3, 52.9));
  const cut = prog(t, 53.88, 54.3);
  const plus = back(prog(t, 57.6, 57.9));
  const cut2 = prog(t, 58.1, 58.5);
  const gl = (dx, sc, sand, id) => hourglass(700 + dx, 900, sc, sand, { id, t });
  return `<rect width="1080" height="1920" fill="#1d2b4a"/><rect x="0" y="1260" width="1080" height="700" fill="url(#gFloor)"/>
    ${hardHat(lerp(-300, 230, hat), 1330, .78)}
    ${t < 53.88 ? gl(0, 1.2, 1, 'a') : `${gl(-150 * eout(cut), 1.2 * lerp(1, .72, eout(cut)) * lerp(1, .8, eout(cut2)), 1, 'a')}<g opacity="${1 - cut}">${gl(150 * eout(cut), .86, 1, 'b')}</g>`}
    ${cut > 0 && cut < 1 ? `<line x1="${700}" y1="${720}" x2="${700}" y2="${1080}" stroke="#fff" stroke-width="${14 * (1 - cut)}"/>` : ''}
    ${popT(700, 460, 110, '÷ 2', back(prog(t, 54.36, 54.6)) * (1 - prog(t, 57.3, 57.5)), C.warm)}
    ${popT(700, 460, 110, '+3 dB', plus, C.red)}`;
}
// ---- I 59.27–66.12 85 dB: 8 h · 91 dB: 2 h · 100 dB: 15 min
function sI(t) {
  const rows = [[59.27, 60.86, '85 dB', '8 h', 1], [62.22, 62.94, '91 dB', '2 h', .25], [64.17, 65.12, '100 dB', '15 min', .03]];
  let s = '';
  rows.forEach(([a, b, l, r, sand], i) => {
    const y = 380 + i * 360;
    const p = back(prog(t, a, a + .3)), q = back(prog(t, b, b + .3));
    if (p <= 0) return;
    s += `<g transform="translate(0 ${y})"><rect x="40" y="-150" width="1000" height="300" rx="30" fill="${['#2d4a40', '#4a3a24', '#5a2438'][i]}" stroke="${C.ol}" stroke-width="8" opacity="${cl(p)}"/>
      ${popT(250, 0, 100, l, p, ['#9fdc6a', '#ff9a3c', C.red][i])}
      ${q > 0 ? `<g transform="translate(560 0) scale(${q * .85})">${hourglass(0, 0, 1, sand * (1 - .1 * prog(t, b, b + 3)), { id: 'i' + i, t, col: ['#9fdc6a', '#ff9a3c', C.red][i] })}</g>${popT(840, 0, 96, r, q, '#fff')}` : ''}</g>`;
  });
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${s}`;
}
// ---- J 66.12–70.5 headphones at full volume: >100 dB
function sJ(t) {
  const v = eio(prog(t, 67.1, 67.6));
  const n = prog(t, 68.9, 69.4);
  const over = t > 69.3;
  const [sx, sy] = shake(t, 69.3, 14, 4);
  return `<g transform="translate(${sx} ${sy})"><rect width="1080" height="1920" fill="${over ? '#2a0e18' : Z.night}"/>
    ${phones(540, 420, 1.1, { t, shake: over ? 10 : 2 * v })}${soundWaves(t, 330, 520, 1.3, 4, over ? C.red : C.warm, -1)}${soundWaves(t, 750, 520, 1.3, 4, over ? C.red : C.warm, 1)}
    <rect x="190" y="780" width="700" height="60" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="7"/><rect x="198" y="788" width="${684 * v + 1}" height="44" rx="22" fill="${v > .7 ? C.red : C.warm}"/><circle cx="${198 + 684 * v}" cy="810" r="44" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/>
    ${gauge(540, 1200, .9, lerp(.3, .98 + .02 * Math.sin(t * 40), n))}
    ${popT(540, 1300, 110, '100+ dB', back(prog(t, 69.13, 69.4)), C.red)}</g>`;
}
// ---- K 70.5–73.72 damage can happen unnoticed
function sK(t) {
  const bp = prog(t, 71.2, 71.5);
  const inner = `<rect x="-400" y="-300" width="800" height="600" fill="#2a1424"/>${[0, 1, 2].map(i => hairCell(-180 + i * 180, 60, .9, { bend: 20 * Math.sin(t * 9 - i), broken: prog(t, 72.14 + i * .2, 72.5 + i * .2) })).join('')}`;
  return `${sleepFace(t, { mouth: 'smile' })}${notesFlow(t, 70.3, 999, 250, 850, 1)}${zzz(t, 560, 700, 1, 1)}
    ${bubble(700, 420, 300, 220, bp, inner, 'kB', { tail: [[-220, 260, 20], [-280, 330, 12]] })}`;
}
// ---- L 73.72–88.84 mouse experiment 2009: tests normal again, but nerve endings gone
function audiogram(x, y, s, ok, t) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)"><rect x="-150" y="-190" width="300" height="380" rx="20" fill="#c99a62" stroke="${C.ol}" stroke-width="7"/><rect x="-120" y="-150" width="240" height="310" fill="#fff"/>
    <path d="M -100 -40 L -60 -50 L -20 -36 L 20 -46 L 60 -30 L 100 -40" stroke="#5d76c8" stroke-width="8" fill="none"/>
    <path d="M -100 50 H 100" stroke="#e0e6f2" stroke-width="5"/>${ok > 0 ? `<g transform="translate(60 90) scale(${back(ok) * .7})"><circle r="60" fill="${Z.green}" stroke="${C.ol}" stroke-width="7"/><path d="M -26 2 L -6 22 L 30 -20" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}</g>`;
}
function sL(t) {
  if (t < 82.8) {
    const mIn = back(prog(t, 74.9, 75.3));
    const cal = back(prog(t, 76.7, 77.0));
    const test = back(prog(t, 77.8, 78.1));
    const loud = t > 79.8 && t < 81.0;
    const ok2 = prog(t, 81.2, 81.5);
    const fur = loud ? 1 : 0;
    return `<rect width="1080" height="1920" fill="#1d2b4a"/><rect x="0" y="1180" width="1080" height="800" fill="url(#gFloor)"/>
      ${cal > 0 ? `<g transform="translate(830 330) scale(${cal * .75})"><rect x="-230" y="-150" width="460" height="300" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="9"/><rect x="-230" y="-150" width="460" height="80" rx="24" fill="${C.red}" stroke="${C.ol}" stroke-width="9"/>${T(0, 100, 160, '2009', C.ol, { sw: 0 })}</g>` : ''}
      ${t > 79.0 ? `<g transform="translate(140 760)"><rect x="-80" y="-130" width="160" height="260" rx="20" fill="#2b2f3d" stroke="${C.ol}" stroke-width="8"/><circle cy="-50" r="50" fill="#141a30" stroke="${C.ol}" stroke-width="6"/><circle cy="60" r="34" fill="#141a30" stroke="${C.ol}" stroke-width="6"/></g>${loud ? soundWaves(t, 220, 760, 1.6, 4, C.red, 1) : ''}` : ''}
      <g transform="translate(560 1050)"><rect x="-300" y="-250" width="600" height="380" rx="16" fill="none" stroke="#9aa4bb" stroke-width="8"/>${Array.from({ length: 11 }, (_, i) => `<line x1="${-300 + i * 60}" y1="-250" x2="${-300 + i * 60}" y2="130" stroke="#9aa4bb" stroke-width="5"/>`).join('')}
        ${mIn > 0 ? mouseF(0, 40, .9 * mIn, { t, fur, face: loud ? { eyes: 'tight', mouth: 'o' } : { eyes: 'n', mouth: 'smile' }, phones: test > 0 && !loud }) : ''}</g>
      ${test > 0 ? audiogram(850, 760, .8 * test, t > 78.3 && t < 79.8 ? 1 : ok2, t) : ''}`;
  }
  // magnifier on hair cells: nerve endings vanish
  const lens = back(prog(t, 82.9, 83.3));
  const wire = (i) => t < 86.7 ? cl((t - 83.2 - i * .1) / .4) : (i % 2 === 0 || i === 3 ? 1 - prog(t, 86.9 + i * .12, 87.2 + i * .12) : 1);
  let poofs = '';
  if (t > 86.9) [0, 2, 3, 4].forEach((i, k) => { const p = prog(t, 87.2 + i * .12, 87.6 + i * .12); if (p > 0 && p < 1) poofs += `<circle cx="${150 + i * 195}" cy="${1250}" r="${20 + 50 * p}" fill="none" stroke="#fff" stroke-width="${8 * (1 - p)}"/>`; });
  return `<rect width="1080" height="1920" fill="#2a1424"/>
    <rect x="0" y="1360" width="1080" height="70" fill="#f2c230" opacity=".35"/>
    ${cellsRow(t, { y: 1100, bend: 8, wire })}${poofs}
    ${lens > 0 ? `<g transform="translate(540 1150) scale(${lens}) translate(-540 -1150)"><circle cx="540" cy="1150" r="470" fill="none" stroke="#c9d2e6" stroke-width="24"/><circle cx="540" cy="1150" r="470" fill="none" stroke="${C.ol}" stroke-width="7"/><line x1="540" y1="680" x2="540" y2="420" stroke="#2b2f3d" stroke-width="44" stroke-linecap="round"/></g>` : ''}
    ${mouseF(830, 330, .55, { t, face: t > 86.7 ? { eyes: 'n', mouth: 'o', brows: 'up' } : { eyes: 'n', mouth: 'smile' } })}`;
}
// ---- M 88.84–96.17 seen in mice — damage may come before a hearing test detects it
function sM(t) {
  if (t < 91.06) {
    const m = back(prog(t, 89.4, 89.7));
    return `<rect width="1080" height="1920" fill="#1d2b4a"/>${scientist(300, 1350, .75, { look: 14, lean: 4 })}
      <g transform="translate(720 980)">${mouseF(0, 0, 1 * Math.max(m, .01), { t, face: { eyes: 'n', mouth: 'smile', look: -10 } })}</g>
      <g transform="translate(560 800) rotate(-20)"><circle r="120" fill="#9fd8ff" opacity=".25" stroke="#c9d2e6" stroke-width="18"/><circle r="120" fill="none" stroke="${C.ol}" stroke-width="6"/><line x1="0" y1="120" x2="0" y2="280" stroke="#2b2f3d" stroke-width="30" stroke-linecap="round"/></g>`;
  }
  const slide = eout(prog(t, 92.6, 93.3));
  const ok = prog(t, 94.98, 95.3);
  const crack = (i) => cl(prog(t, 92.9, 93.6));
  return `<rect width="1080" height="1920" fill="#2a1424"/>
    ${cellsRow(t, { y: 1000, bend: 6, broken: (i) => i % 2 ? crack(i) : 0, wire: (i) => i % 2 ? 0 : 1 })}
    <g transform="translate(${lerp(540, 820, slide)} ${lerp(900, 520, slide)})">${audiogram(0, 0, 1.3, ok, t)}</g>
    ${earF(220, 420, .7)}`;
}
// ---- N 96.17–107.76 33 studies, 19,000+ young people: almost a quarter listen unsafely
function sN(t) {
  if (t < 99.8) {
    const n = Math.round(33 * eio(prog(t, 96.3, 98.9)));
    let papers = '';
    for (let i = 0; i < Math.min(n, 12); i++) papers += `<g transform="translate(${540 + 20 * Math.sin(i * 2.3)} ${1150 - i * 26}) rotate(${(hash(i) - .5) * 14})"><rect x="-200" y="-30" width="400" height="56" rx="6" fill="#e9eef8" stroke="${C.ol}" stroke-width="5"/><path d="M -160 -6 H 120" stroke="#9aa4bb" stroke-width="7"/></g>`;
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 41)}${papers}${popT(540, 420, 200, String(n), n > 0 ? 1 : 0, C.warm)}`;
  }
  let g = '';
  const cols = 5, rows = 4;
  const hl = t > 103.1;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, p = back(prog(t, 100.2 + i * .05, 100.45 + i * .05)); if (p <= 0) continue;
    const bad = hl && c === 4 && r < 4 && (i < 20);
    const x = 140 + c * 200, y = 640 + r * 190;
    g += tiny(x, y, 1.1 * p, { col: bad ? C.red : '#5d76c8', long: i % 2, hair: ['#3b2720', '#c98a3a', '#2a1b16'][i % 3] });
    if (bad) g += `<g transform="translate(${x} ${y - 126})"><path d="M -30 0 Q -30 -40 0 -40 Q 30 -40 30 0" stroke="#2b2f3d" stroke-width="8" fill="none"/><rect x="-36" y="-8" width="16" height="26" rx="6" fill="${PH}"/><rect x="20" y="-8" width="16" height="26" rx="6" fill="${PH}"/></g>${soundWaves(t, x + 20, y - 120, .5, 2, C.red, 1)}`;
  }
  const cnt = 19000 * eio(prog(t, 100.3, 101.6));
  const pie = back(prog(t, 103.5, 103.9));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 43)}
    ${popT(540, 300, 150, fmt(cnt), back(prog(t, 100.3, 100.6)) * (1 - prog(t, 103.0, 103.3)), C.warm)}
    ${pie > 0 ? `<g transform="translate(540 300) scale(${pie})"><circle r="150" fill="#5d76c8" stroke="${C.ol}" stroke-width="9"/><path d="M 0 0 L 0 -150 A 150 150 0 0 1 150 0 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="9"/></g>${popT(820, 300, 110, '¼', pie, C.red)}` : ''}
    ${hl ? `<rect x="${140 + 4 * 200 - 90}" y="470" width="180" height="790" rx="30" fill="none" stroke="${C.red}" stroke-width="10" stroke-dasharray="30 20"/>` : ''}
    ${g}`;
}
// ---- O 107.76–117.58 sealed ear canal all night: inflammation, wax pushed deeper
function sO(t) {
  const push = eio(prog(t, 108.5, 109.2));
  const night = prog(t, 111.0, 112.0);
  const germs = prog(t, 113.9, 115.0);
  const wax = eio(prog(t, 115.5, 116.4));
  const budX = lerp(-150, 230, push) + 30 * wax;
  let gm = '';
  for (let i = 0; i < 9; i++) { const p = back(prog(t, 113.9 + i * .1, 114.2 + i * .1)); if (p <= 0) continue; gm += `<g transform="translate(${430 + (i % 3) * 130 + 10 * Math.sin(t * 4 + i)} ${830 + Math.floor(i / 3) * 60 + 8 * Math.cos(t * 5 + i)}) scale(${p * .45})"><circle r="40" fill="#8fd86a" stroke="${C.ol}" stroke-width="7"/>${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${Math.cos(k) * 40}" y1="${Math.sin(k) * 40}" x2="${Math.cos(k) * 58}" y2="${Math.sin(k) * 58}" stroke="${C.ol}" stroke-width="6"/>`).join('')}<g transform="scale(.5)">${face({ eyes: 'n', mouth: 'grin', brows: 'mean' })}</g></g>`; }
  return `<rect width="1080" height="1920" fill="${C.skinSh}"/>
    <path d="M -20 620 Q 400 600 700 760 Q 860 820 880 900 Q 860 980 700 1040 Q 400 1200 -20 1180 Z" fill="#7a2f3e" stroke="${C.ol}" stroke-width="10"/>
    <path d="M -20 660 Q 400 650 690 790" stroke="#a84a5a" stroke-width="18" fill="none"/>
    ${germs > 0 ? `<path d="M 300 700 Q 600 760 800 900 Q 600 1060 300 1110 Z" fill="${C.red}" opacity="${.35 * germs * (.8 + .2 * Math.sin(t * 6))}" filter="url(#blur20)"/>` : ''}
    <ellipse cx="880" cy="900" rx="40" ry="140" fill="#e9c9b0" stroke="${C.ol}" stroke-width="8"/>
    <g transform="translate(${lerp(700, 800, wax)} 960)"><ellipse rx="56" ry="40" fill="#e3a83a" stroke="${C.ol}" stroke-width="7"/><path d="M -30 -10 q 20 -16 40 -4" stroke="#f6d27a" stroke-width="8" fill="none"/></g>
    ${gm}
    <g transform="translate(${budX} 900)"><rect x="-500" y="-60" width="460" height="120" rx="40" fill="#e9eef8" stroke="${C.ol}" stroke-width="8"/><path d="M -40 -90 Q 120 -100 160 0 Q 120 100 -40 90 Z" fill="#c9d2e6" stroke="${C.ol}" stroke-width="8"/>${push > .9 ? notesFlow(t, 109.2, 113.2, 120, 0, 1, 8) : ''}</g>
    ${night > 0 ? `<g transform="translate(860 330) scale(${back(night) * .9})">${wallClock(t, 0, 0, 110, 23 + 8 * prog(t, 111.0, 112.6))}${moonF(-140, -80, 44)}</g>` : ''}`;
}
// ---- P 117.58–122.42 three less harmful options
function sP(t) {
  return `${sleepFace(t, { mouth: 'smile' })}${notesFlow(t, 117.4, 999, 250, 850, 1)}
    ${badge(250, 330, 1, '1', prog(t, 120.2, 120.5))}${badge(540, 260, 1, '2', prog(t, 120.4, 120.7))}${badge(830, 330, 1, '3', prog(t, 120.6, 120.9))}`;
}
// ---- Q 122.42–128.0 tip 1: timer switches music off after 30 min
function sQ(t) {
  const tm = back(prog(t, 123.7, 124.0));
  const sweep = prog(t, 124.6, 126.3);
  const stop = t > 126.36;
  const content = tm > 0 ? `<g transform="scale(${tm})"><circle r="56" fill="#141a30" stroke="#e9eef8" stroke-width="8"/><path d="M 0 0 L 0 -48 A 48 48 0 ${sweep < .5 ? 1 : 0} 0 ${-48 * Math.sin((1 - sweep) * 2 * Math.PI)} ${-48 * Math.cos((1 - sweep) * 2 * Math.PI)} Z" fill="${sweep < 1 ? C.warm : 'none'}"/></g>${T(0, 110, 40, stop ? '0:00' : '30 min', '#fff', { sw: 0 })}` : '';
  return `${sleepFace(t, { mouth: 'smile' })}${stop ? '' : notesFlow(t, 122.0, 126.36, 250, 850, 1)}
    ${phoneP(t, 820, 620, 1.3, { glow: stop ? .3 : 1, content: `<rect x="-66" y="-140" width="132" height="280" fill="#20345e"/><g transform="translate(0 -30)">${content}</g>`, id: 'q' })}
    ${popT(820, 330, 90, '30 min', back(prog(t, 125.77, 126.0)) * (1 - prog(t, 127.4, 127.6)), C.warm)}
    ${zzz(t, 560, 700, 1, stop ? 1 : 0)}${badge(130, 260, .9, '1', prog(t, 122.45, 122.8))}`;
}
// ---- R 128.0–131.36 tip 2: volume under 60 %
function sR(t) {
  const v = lerp(.95, .55, eio(prog(t, 129.2, 130.2)));
  const ok = v < .6;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 45)}
    ${phones(540, 560, 1.2, { t })}${soundWaves(t, 300, 680, v * 1.4, 3, ok ? Z.green : C.red, -1)}${soundWaves(t, 780, 680, v * 1.4, 3, ok ? Z.green : C.red, 1)}
    <rect x="150" y="1060" width="780" height="70" rx="35" fill="#141a30" stroke="${C.ol}" stroke-width="7"/>
    <rect x="${150 + 780 * .6}" y="1060" width="${780 * .4}" height="70" rx="35" fill="${C.red}" opacity=".3"/>
    <rect x="160" y="1070" width="${760 * v}" height="50" rx="25" fill="${ok ? Z.green : C.red}"/><circle cx="${160 + 760 * v}" cy="1095" r="52" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/>
    <line x1="${150 + 780 * .6}" y1="1020" x2="${150 + 780 * .6}" y2="1170" stroke="#fff" stroke-width="8" stroke-dasharray="14 10"/>
    ${popT(540, 1290, 120, '60 %', back(prog(t, 130.34, 130.6)), Z.green)}
    ${badge(130, 260, .9, '2', prog(t, 128.05, 128.4))}`;
}
// ---- S 131.36–138.64 tip 3: small speaker at a distance instead of headphones
function speaker(x, y, s, t) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)"><rect x="-80" y="-120" width="160" height="240" rx="30" fill="#3a3f55" stroke="${C.ol}" stroke-width="8"/><circle cy="-40" r="44" fill="#141a30" stroke="${C.ol}" stroke-width="6"/><circle cy="-40" r="${18 + 4 * Math.sin(t * 20)}" fill="#5d6888"/><circle cy="70" r="28" fill="#141a30" stroke="${C.ol}" stroke-width="6"/></g>`;
}
function sS(t) {
  const off = prog(t, 133.8, 134.4);
  const spk = back(prog(t, 135.2, 135.5));
  const dist = prog(t, 136.4, 137.0);
  return `${roomBg(0)}${windowW(t, 380, 300, 240, 300, { id: 'sW' })}
    <rect x="780" y="900" width="260" height="30" rx="8" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    ${spk > 0 ? `${speaker(910, 780, .8 * spk, t)}${notesFlow(t, 135.6, 999, 880, 720, -1, 8)}` : ''}
    ${bedSide(t, 400, 1080, .82, { eyes: 'closed', mouth: 'smile', phones: off > 0 ? 0 : 1, phoneCol: PH })}
    ${off > 0 && off < 1 ? phones(lerp(178, 500, off), lerp(1000, 300, eout(off)) + 600 * off * off, .4, { rot: off * 300 }) : ''}
    ${dist > 0 ? `<g opacity="${dist}">${arrow(420, 840, 760, 840, C.warm, 26, dist)}${arrow(420, 840, 200, 840, C.warm, 26, dist)}</g>` : ''}
    ${zzz(t, 220, 900, .8, spk)}
    ${badge(130, 260, .9, '3', prog(t, 131.4, 131.75))}`;
}
// ---- T 138.64–147.66 ringing ears or muffled hearing → rest, get checked
function sT(t) {
  if (t < 144.5) {
    const ringOn = t > 139.3 && t < 142.9;
    const cotton = prog(t, 143.2, 143.7);
    const bp = t > 141.4 ? 1 : 0;
    let zig = '';
    if (ringOn) for (let k = 0; k < 3; k++) { const p = ((t * 2 + k / 3) % 1); zig += `<path d="M ${300 - 160 * p} ${700 - 100 * p} l 20 -20 l 20 20 l 20 -20 l 20 20 l 20 -20" stroke="${C.warm}" stroke-width="10" fill="none" opacity="${1 - p}" stroke-linejoin="round"/>`; }
    let cot = '';
    if (cotton > 0) for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, p = back(prog(t, 143.2 + i * .05, 143.5 + i * .05)); cot += `<g transform="translate(${540 + Math.cos(a) * 320} ${900 + Math.sin(a) * 380}) scale(${p})"><path d="${scallop(0, 0, 80, 60, 9)}" fill="#f4f6fb" stroke="${C.ol}" stroke-width="6"/></g>`; }
    const off = prog(t, 141.5, 142.2);
    return `<rect width="1080" height="1920" fill="#1d2b4a"/>
      ${earF(540, 900, 1.5, { glow: ringOn ? 1 : 0, glowCol: C.red })}${zig}${cot}
      ${bp && off < 1 ? phones(lerp(540, 900, off), lerp(820, 300, off), .9, { rot: off * 60 }) : ''}`;
  }
  const doc = eout(prog(t, 146.3, 146.8));
  return `<rect width="1080" height="1920" fill="#1d2b4a"/><rect x="0" y="1260" width="1080" height="700" fill="url(#gFloor)"/>
    <g transform="translate(980 330)"><path d="M 0 0 V 70" stroke="#9aa4bb" stroke-width="10"/>${phones(0, 200, .55, { rot: 0 })}</g>
    ${personF(430, 1330, .9, { mouth: 'smile', look: 12, aL: 12 })}
    ${zzz(t, 560, 560, .8, 1 - doc)}
    ${doc > 0 ? `${scientist(lerp(1300, 820, doc), 1330, .8, { look: -14, aL: 60, aR: -10 })}<g transform="translate(${lerp(1300, 820, doc) - 100} 950) rotate(-30)"><rect x="-14" y="0" width="28" height="140" rx="10" fill="#3a3f55" stroke="${C.ol}" stroke-width="6"/><path d="M -20 0 L 0 -50 L 20 0 Z" fill="#c9d2e6" stroke="${C.ol}" stroke-width="6"/><circle cy="-56" r="12" fill="${C.warm}"/></g>` : ''}`;
}
// ---- U 147.66–152.82 eyes can close, ears can't
function sU(t) {
  const lid = eio(prog(t, 149.7, 150.1));
  const x = prog(t, 151.8, 152.1);
  const ex = 540, ey = 520;
  const almond = `M ${ex - 280} ${ey} Q ${ex} ${ey - 220} ${ex + 280} ${ey} Q ${ex} ${ey + 190} ${ex - 280} ${ey} Z`;
  return `<rect width="1080" height="1920" fill="#1d2b4a"/>
    <rect x="40" y="200" width="1000" height="600" rx="30" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
    <clipPath id="uE"><path d="${almond}"/></clipPath><path d="${almond}" fill="#fff"/>
    <g clip-path="url(#uE)"><circle cx="${ex}" cy="${ey}" r="120" fill="#4f8fd8" stroke="${C.ol}" stroke-width="8"/><circle cx="${ex}" cy="${ey}" r="50" fill="${C.ol}"/><circle cx="${ex + 40}" cy="${ey - 40}" r="18" fill="#fff"/>
      <rect x="${ex - 300}" y="${ey - 260}" width="600" height="${60 + 360 * lid}" fill="${C.skin}"/><path d="M ${ex - 300} ${ey - 200 + 360 * lid} H ${ex + 300}" stroke="${C.ol}" stroke-width="10"/></g>
    <path d="${almond}" fill="none" stroke="${C.ol}" stroke-width="10"/>
    ${check(900, 300, .7, prog(t, 150.1, 150.4))}
    <rect x="40" y="840" width="1000" height="560" rx="30" fill="#2a1424" stroke="${C.ol}" stroke-width="8"/>
    ${earF(540, 1120, 1, { glow: .6 })}${soundWaves(t, 300, 1120, 1, 3, C.warm, -1)}
    ${cross(900, 940, .7, x)}`;
}
// ---- V 152.82–155.56 only you can switch the sound off for them
function sV(t) {
  const tap = prog(t, 153.9, 154.2);
  const off = t > 154.22;
  const content = `<rect x="-66" y="-140" width="132" height="280" fill="#20345e"/><circle cx="0" cy="-30" r="50" fill="${off ? '#5d76c8' : C.warm}" stroke="${C.ol}" stroke-width="5"/>${off ? `<path d="M -18 -50 L 22 -30 L -18 -10 Z" fill="#fff"/>` : `<rect x="-20" y="-52" width="14" height="44" fill="${C.ol}"/><rect x="6" y="-52" width="14" height="44" fill="${C.ol}"/>`}`;
  return `${sleepFace(t, { mouth: 'smile', phones: 1 })}${off ? '' : notesFlow(t, 152.5, 154.22, 250, 850, 1)}
    ${phoneP(t, 800, 560, 1.6, { content, id: 'v' })}
    ${tap < 1 ? `<g transform="translate(${lerp(1000, 820, eout(tap))} ${lerp(860, 540, eout(tap))}) rotate(-30)"><rect x="-30" y="0" width="60" height="220" rx="30" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/></g>` : `<circle cx="800" cy="512" r="${60 + 160 * cl((t - 154.2) / .4)}" fill="none" stroke="#fff" stroke-width="${8 * (1 - cl((t - 154.2) / .4))}"/>`}
    ${zzz(t, 560, 700, 1, off ? 1 : 0)}`;
}
// ---- W 155.56–160.14 do you sleep with headphones? comments
function sW(t) {
  const q = back(prog(t, 156.4, 156.7));
  let cm = '';
  for (let i = 0; i < 3; i++) { const p = back(prog(t, 157.5 + i * .25, 157.8 + i * .25)); if (p > 0) cm += `<g transform="translate(${[250, 760, 420][i]} ${[1040, 980, 1250][i]}) scale(${p})"><path d="M -150 -70 H 150 Q 180 -70 180 -40 V 40 Q 180 70 150 70 H -60 L -110 120 L -100 70 H -150 Q -180 70 -180 40 V -40 Q -180 -70 -150 -70 Z" fill="#e9f0ff" stroke="${C.ol}" stroke-width="7"/>${[-60, 0, 60].map(x => `<circle cx="${x}" cy="0" r="16" fill="${C.ol}" opacity="${.4 + .6 * ((Math.floor(t * 4) + (x + 60) / 60) % 3 === 0 ? 1 : 0)}"/>`).join('')}</g>`; }
  const end = t > 159.4;
  return `${roomBg(0)}${windowW(t, 90, 300, 250, 320, { id: 'wW' })}
    ${bedSide(t, 470, 760, .8, { eyes: end ? 'closed' : 'n', look: 10, mouth: 'smile', phones: 1, phoneCol: PH })}
    ${popT(800, 330, 230, '?', q, C.warm)}${cm}
    ${end ? `<rect width="1080" height="1920" fill="#000" opacity="${.5 * prog(t, 159.4, 160)}"/>` : ''}`;
}
const SCENES = [[0, 4.18, sA], [4.18, 8.72, sB], [8.72, 13.24, sC], [13.24, 28.3, sD], [28.3, 30.32, sE], [30.32, 38.5, sF], [38.5, 47.88, sG], [47.88, 59.27, sH], [59.27, 66.12, sI],
  [66.12, 70.5, sJ], [70.5, 73.72, sK], [73.72, 88.84, sL], [88.84, 96.17, sM], [96.17, 107.76, sN], [107.76, 117.58, sO], [117.58, 122.42, sP], [122.42, 128.0, sQ], [128.0, 131.36, sR],
  [131.36, 138.64, sS], [138.64, 147.66, sT], [147.66, 152.82, sU], [152.82, 155.56, sV], [155.56, 999, sW]];
function scene(t) { let f = SCENES[SCENES.length - 1][2]; for (const [a, b, fn] of SCENES) if (t >= a && t < b) { f = fn; break; } return f(t); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
