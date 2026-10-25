// @ts-nocheck
// AUTO-GENERATED scene for v7. Change it by commenting on the issue.
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

// ===== v7: "Spät schlafen, aber genug schlafen" =====
function clockArc(t, cx, cy, r, hours, o = {}) { // big analog clock; o.arc = [h0, h1, p] highlighted sleep span
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ticks += `<line x1="${cx + Math.cos(a) * r * .8}" y1="${cy + Math.sin(a) * r * .8}" x2="${cx + Math.cos(a) * r * .92}" y2="${cy + Math.sin(a) * r * .92}" stroke="${C.ol}" stroke-width="${i % 3 ? 6 : 12}" stroke-linecap="round"/>`; }
  let arc = '';
  if (o.arc && o.arc[2] > 0) {
    const [h0, h1, p] = o.arc, a0 = (h0 / 12) * 2 * Math.PI - Math.PI / 2, a1 = a0 + ((h1 - h0) / 12) * 2 * Math.PI * p;
    const big = (a1 - a0) > Math.PI ? 1 : 0, rr = r * .66;
    arc = `<path d="M ${cx} ${cy} L ${cx + Math.cos(a0) * rr} ${cy + Math.sin(a0) * rr} A ${rr} ${rr} 0 ${big} 1 ${cx + Math.cos(a1) * rr} ${cy + Math.sin(a1) * rr} Z" fill="${o.arcCol || '#6c5ad6'}" opacity=".75"/>`;
  }
  const ha = (hours % 12) / 12 * 2 * Math.PI, ma = (hours % 1) * 2 * Math.PI;
  return `<g filter="url(#drop)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f2efe6" stroke="${C.ol}" stroke-width="12"/></g>${arc}${ticks}
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ha) * r * .5}" y2="${cy - Math.cos(ha) * r * .5}" stroke="${C.ol}" stroke-width="22" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ma) * r * .76}" y2="${cy - Math.cos(ma) * r * .76}" stroke="${C.red}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="${r * .07}" fill="${C.ol}"/>`;
}
function battery(x, y, s, lv, o = {}) {
  const col = lv > .6 ? Z.green : lv > .3 ? '#f2b544' : C.red;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})"><rect x="-90" y="-50" width="180" height="100" rx="18" fill="#141a30" stroke="${C.ol}" stroke-width="8"/><rect x="90" y="-22" width="18" height="44" rx="6" fill="${C.ol}"/>
    <rect x="-78" y="-38" width="${156 * cl(lv)}" height="76" rx="10" fill="${col}"/>${lv < .3 && o.blink ? `<rect x="-78" y="-38" width="156" height="76" rx="10" fill="${C.red}" opacity="${.3 * (Math.sin((o.t || 0) * 10) > 0 ? 1 : 0)}"/>` : ''}</g>`;
}
function owl(x, y, s, o = {}) {
  const t = o.t || 0, flap = o.flap ? 20 * Math.sin(t * 20) : 0;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.tilt || 0})">
    <g transform="rotate(${-flap} -100 0)"><ellipse cx="-110" cy="20" rx="44" ry="90" fill="#5a4fa0" stroke="${C.ol}" stroke-width="7"/></g><g transform="rotate(${flap} 100 0)"><ellipse cx="110" cy="20" rx="44" ry="90" fill="#5a4fa0" stroke="${C.ol}" stroke-width="7"/></g>
    <ellipse cx="0" cy="10" rx="130" ry="150" fill="#7a6ad0" stroke="${C.ol}" stroke-width="8"/><ellipse cx="0" cy="60" rx="80" ry="90" fill="#c9bff2"/>
    <path d="M -100 -110 L -80 -170 L -40 -130 Z M 100 -110 L 80 -170 L 40 -130 Z" fill="#7a6ad0" stroke="${C.ol}" stroke-width="7" stroke-linejoin="round"/>
    ${[-50, 50].map(ex => `<circle cx="${ex}" cy="-40" r="46" fill="#fff" stroke="${C.ol}" stroke-width="7"/>${o.sleepy ? `<path d="M ${ex - 30} -40 Q ${ex} -20 ${ex + 30} -40" stroke="${C.ol}" stroke-width="8" fill="none"/>` : `<circle cx="${ex + (o.look || 0)}" cy="-36" r="${o.eyeS ? 22 * o.eyeS : 22}" fill="${C.ol}"/><circle cx="${ex + 8 + (o.look || 0)}" cy="-46" r="7" fill="#fff"/>`}`).join('')}
    <path d="M -16 -6 L 16 -6 L 0 22 Z" fill="${C.warm}" stroke="${C.ol}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M -40 156 v 20 M -20 156 v 20 M 20 156 v 20 M 40 156 v 20" stroke="${C.warm}" stroke-width="10" stroke-linecap="round"/>${o.extra || ''}</g>`;
}
function lark(x, y, s, o = {}) {
  const t = o.t || 0, flap = o.flap ? 30 * Math.sin(t * 22) : 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 100 20 L 190 -10 L 180 50 Z" fill="#c98a3a" stroke="${C.ol}" stroke-width="7" stroke-linejoin="round"/>
    <ellipse cx="0" cy="20" rx="130" ry="110" fill="${Z.sun}" stroke="${C.ol}" stroke-width="8"/>
    <g transform="rotate(${flap} 20 0)"><path d="M -10 0 Q 60 -40 120 20 Q 60 60 -10 30 Z" fill="${Z.sunSh}" stroke="${C.ol}" stroke-width="7"/></g>
    <path d="M -40 -80 Q -30 -140 10 -110" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="-60" cy="-10" r="30" fill="#fff" stroke="${C.ol}" stroke-width="6"/><circle cx="-66" cy="-6" r="13" fill="${C.ol}"/>
    <path d="M -130 10 L -190 24 L -128 36 Z" fill="#ff9a3c" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M -20 126 v 30 M 20 126 v 30" stroke="#ff9a3c" stroke-width="10" stroke-linecap="round"/>${o.extra || ''}</g>`;
}
function alarm(x, y, s, o = {}) {
  const t = o.t || 0, rg = o.ring ? 8 * Math.sin(t * 60) : 0;
  return `<g transform="translate(${x} ${y}) rotate(${rg}) scale(${s})">
    <circle cx="-70" cy="-80" r="38" fill="${o.col || C.red}" stroke="${C.ol}" stroke-width="7"/><circle cx="70" cy="-80" r="38" fill="${o.col || C.red}" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -70 100 L -90 130 M 70 100 L 90 130" stroke="${C.ol}" stroke-width="12" stroke-linecap="round"/>
    <circle r="110" fill="${o.col || C.red}" stroke="${C.ol}" stroke-width="8"/><circle r="86" fill="#f2efe6" stroke="${C.ol}" stroke-width="5"/>
    <line x1="0" y1="0" x2="${Math.sin((o.h || 7) / 12 * 2 * Math.PI) * 46}" y2="${-Math.cos((o.h || 7) / 12 * 2 * Math.PI) * 46}" stroke="${C.ol}" stroke-width="12" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="${Math.sin(((o.h || 7) % 1) * 2 * Math.PI) * 66}" y2="${-Math.cos(((o.h || 7) % 1) * 2 * Math.PI) * 66}" stroke="${C.ol}" stroke-width="7" stroke-linecap="round"/><circle r="9" fill="${C.ol}"/>
    ${o.ring ? `<path d="M -150 -120 l -30 -20 M 150 -120 l 30 -20 M -165 -70 l -36 0 M 165 -70 l 36 0" stroke="${C.warm}" stroke-width="10" stroke-linecap="round"/>` : ''}</g>`;
}
function calYear(x, y, s, yr, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * p}) rotate(${-6 + 6 * p})"><rect x="-230" y="-150" width="460" height="300" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="9"/><rect x="-230" y="-150" width="460" height="80" rx="24" fill="${C.red}" stroke="${C.ol}" stroke-width="9"/>
    <circle cx="-140" cy="-150" r="16" fill="${C.ol}"/><circle cx="140" cy="-150" r="16" fill="${C.ol}"/>${T(0, 100, 160, yr, C.ol, { sw: 0 })}</g>`;
}
function campfire(t, x, y, s) {
  let fl = '';
  for (let i = 0; i < 3; i++) { const h = 110 + 25 * Math.sin(t * 9 + i * 2); fl += `<path d="M ${-50 + i * 50} 0 Q ${-80 + i * 50} ${-h * .5} ${-50 + i * 50 + 10 * Math.sin(t * 7 + i)} ${-h} Q ${-20 + i * 50} ${-h * .5} ${-10 + i * 50} 0 Z" fill="${['#ff9a3c', '#ffd27a', '#ff5468'][i]}" stroke="${C.ol}" stroke-width="5"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-40" r="220" fill="#ff9a3c" opacity=".3" filter="url(#blur40)"/>
    <rect x="-110" y="-10" width="220" height="30" rx="14" fill="${C.wood}" stroke="${C.ol}" stroke-width="6" transform="rotate(12)"/><rect x="-110" y="-10" width="220" height="30" rx="14" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="6" transform="rotate(-12)"/>${fl}</g>`;
}
function fridge(x, y, s, open, t) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${open > 0 ? `<polygon points="-140,-300 140,-300 ${140 + 400 * open},400 ${-140 - 200 * open},400" fill="#e8f6ff" opacity="${.18 * open}"/>` : ''}
    <rect x="-150" y="-320" width="300" height="640" rx="24" fill="#d9e2f2" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-136" y="-300" width="272" height="600" rx="12" fill="${open > 0 ? '#f6fbff' : '#c9d2e6'}"/>
    ${open > 0 ? `<rect x="-120" y="-120" width="240" height="10" fill="#9aa4bb"/><rect x="-120" y="60" width="240" height="10" fill="#9aa4bb"/><rect x="-100" y="-200" width="70" height="80" rx="10" fill="${C.red}" stroke="${C.ol}" stroke-width="5"/><circle cx="40" cy="-150" r="36" fill="${Z.sun}" stroke="${C.ol}" stroke-width="5"/><rect x="-80" y="-10" width="140" height="70" rx="30" fill="#ffb3c8" stroke="${C.ol}" stroke-width="5"/>` : ''}
    <g transform="translate(-150 0) scale(${1 - open * 1.6} 1) translate(150 0)"><rect x="-150" y="-320" width="300" height="640" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="8"/><rect x="100" y="-120" width="18" height="140" rx="9" fill="#9aa4bb" stroke="${C.ol}" stroke-width="5"/></g></g>`;
}
function plate(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="10" rx="170" ry="60" fill="#000" opacity=".3"/><ellipse rx="170" ry="60" fill="#f4f6fb" stroke="${C.ol}" stroke-width="7"/><ellipse rx="120" ry="40" fill="#e0e6f2"/>
    ${o.eaten ? '' : `<ellipse cx="-40" cy="-16" rx="60" ry="30" fill="#c98a3a" stroke="${C.ol}" stroke-width="5"/><circle cx="40" cy="-20" r="28" fill="${Z.green}" stroke="${C.ol}" stroke-width="5"/><ellipse cx="10" cy="10" rx="50" ry="20" fill="#f2d24a" stroke="${C.ol}" stroke-width="5"/>`}</g>`;
}
function scaleBal(x, y, s, tilt, l, r) { // balance scale, tilt deg (+ = right side down)
  const a = tilt * Math.PI / 180, dx = Math.cos(a) * 300, dy = Math.sin(a) * 300;
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-20" y="0" width="40" height="420" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="7"/><rect x="-140" y="400" width="280" height="40" rx="14" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/>
    <line x1="${-dx}" y1="${-dy}" x2="${dx}" y2="${dy}" stroke="${C.ol}" stroke-width="22" stroke-linecap="round"/><line x1="${-dx}" y1="${-dy}" x2="${dx}" y2="${dy}" stroke="${C.warm}" stroke-width="10" stroke-linecap="round"/>
    ${[[-dx, -dy, l], [dx, dy, r]].map(([px, py, c]) => `<line x1="${px}" y1="${py}" x2="${px - 90}" y2="${py + 160}" stroke="${C.ol}" stroke-width="5"/><line x1="${px}" y1="${py}" x2="${px + 90}" y2="${py + 160}" stroke="${C.ol}" stroke-width="5"/><path d="M ${px - 130} ${py + 160} Q ${px} ${py + 230} ${px + 130} ${py + 160} Z" fill="#c9d2e6" stroke="${C.ol}" stroke-width="7"/><g transform="translate(${px} ${py + 100})">${c}</g>`).join('')}
    <circle r="22" fill="${C.warm}" stroke="${C.ol}" stroke-width="6"/></g>`;
}
function weekBars(t, x0, y0, o = {}) { // 7 columns Mo..So with sleep bars from start hour to end hour; axis 22→14 h
  const days = ['M', 'D', 'M', 'D', 'F', 'S', 'S'];
  const hy = h => y0 + ((h < 18 ? h + 24 : h) - 22) * 70; // 22:00 at y0
  let s = `<rect x="${x0 - 40}" y="${y0 - 80}" width="${7 * 120 + 40}" height="${17 * 70 + 100}" rx="24" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>`;
  for (let h = 22; h <= 38; h += 2) s += `<line x1="${x0 - 30}" y1="${y0 + (h - 22) * 70}" x2="${x0 + 7 * 120 - 10}" y2="${y0 + (h - 22) * 70}" stroke="#2a3456" stroke-width="3"/>`;
  days.forEach((d, i) => {
    const [a, b] = o.span(i), p = o.prog(i);
    if (p <= 0) return;
    const ya = hy(a), yb = hy(b);
    s += `<rect x="${x0 + i * 120}" y="${ya}" width="90" height="${(yb - ya) * p}" rx="18" fill="${i > 4 ? (o.wkCol || '#ff9a3c') : '#6c5ad6'}" stroke="${C.ol}" stroke-width="6"/>${moonF(x0 + i * 120 + 45, ya + 40, 18)}`;
    s += T(x0 + i * 120 + 45, y0 - 26, 44, d, '#cfe0ff', { sw: 0 });
  });
  return s;
}
// ---- A 0–3.68 2 am → 10 am
function sA(t) {
  const h = t < 2.2 ? 2 : lerp(2, 10, eio(prog(t, 2.2, 3.2)));
  const arcP = eio(prog(t, 2.2, 3.2));
  const d1 = back(prog(t, .8, 1.05)), d2 = back(prog(t, 2.5, 2.75));
  const sleepy = t < 2.3;
  return `<rect width="1080" height="1920" fill="${sleepy ? '#0b1226' : '#1d3a6a'}"/>${sleepy ? stars(50, 3) : ''}
    ${clockArc(t, 540, 760, 360, h, { arc: [2, 10, arcP] })}
    ${sleepy ? moonF(220, 330, 70, { face: {} }) : sunF(t, 860, 330, 80, { face: { eyes: 'happy', mouth: 'smile' } })}
    ${d1 > 0 && t < 2.4 ? popT(540, 1260, 120, '02:00', d1, '#9fb6ff') : ''}${d2 > 0 ? popT(540, 1260, 120, '10:00', d2, C.warm) : ''}
    ${zzz(t, 300, 300, .9, sleepy ? 1 : 0)}`;
}
// ---- B 3.68–5.68 still 8 hours of sleep
function sB(t) {
  const p = back(prog(t, 4.14, 4.4));
  return `<rect width="1080" height="1920" fill="#1d3a6a"/>
    ${clockArc(t, 540, 760, 360, 10, { arc: [2, 10, 1], arcCol: Z.green })}
    <g transform="translate(540 760) scale(${p})"><circle r="150" fill="#141a30" stroke="${C.ol}" stroke-width="9"/>${T(0, 40, 120, '8 h', Z.green, { sw: 0 })}</g>
    ${battery(540, 1250, 1.4, eio(prog(t, 4.4, 5.2)))}`;
}
// ---- C 5.68–9.56 as harmful as late bedtime with too little sleep?
function halfP(t, x, lv, o = {}) {
  return `${personF(x, 1300, .72, o.p)}${battery(x, 360, 1.05, lv, { t, blink: 1 })}`;
}
function sC(t) {
  const L = eout(prog(t, 5.7, 6.1)), R = eout(prog(t, 7.4, 7.8));
  const q = back(prog(t, 8.4, 8.7));
  return `<rect width="1080" height="1920" fill="${Z.night}"/><rect x="540" y="0" width="540" height="1920" fill="#1a1020"/>
    <g transform="translate(${lerp(-500, 0, L)} 0)">${halfP(t, 270, 1, { p: { mouth: 'smile', look: 10 } })}${T(270, 560, 80, '8 h', Z.green)}</g>
    <g transform="translate(${lerp(500, 0, R)} 0)">${halfP(t, 810, .15, { p: { mouth: 'worried', brow: 1, eyeS: .7, lean: 6, headTilt: 8 } })}${T(810, 560, 80, '4 h', C.red)}
      <path d="M 760 690 q 20 10 40 0 M 820 690 q 20 10 40 0" stroke="#7a4a6a" stroke-width="6" fill="none"/></g>
    ${q > 0 ? `<g transform="translate(540 800) scale(${q})"><circle r="90" fill="${C.warm}" stroke="${C.ol}" stroke-width="9"/>${T(0, 36, 110, '=?', C.ol, { sw: 0 })}</g>` : ''}`;
}
// ---- D 9.56–17.88 good news: no — enough sleep avoids sleep deprivation
function sD(t) {
  const no = back(prog(t, 10.6, 10.9));
  const x = prog(t, 16.3, 16.7);
  const stretch = Math.sin(prog(t, 11.2, 12.4) * Math.PI);
  return `<rect width="1080" height="1920" fill="#1d3a6a"/><rect x="540" y="0" width="540" height="1920" fill="#1a1020"/>
    ${sunF(t, 270, 240, 70)}
    ${personF(270, 1300, .72, { mouth: 'smile', aL: 12 + 150 * stretch, aR: -12 - 150 * stretch, eyeS: 1.1 })}${battery(270, 520, 1.05, 1)}
    ${personF(810, 1300, .72, { mouth: 'worried', brow: 1, eyeS: .7, lean: 6 + 4 * Math.sin(t * 2), headTilt: 8 })}${battery(810, 520, 1.05, .15, { t, blink: 1 })}
    ${no > 0 ? `<g transform="translate(540 800) scale(${no})"><circle r="90" fill="${Z.green}" stroke="${C.ol}" stroke-width="9"/>${T(0, 36, 110, '≠', '#fff', { sw: 0 })}</g>` : ''}
    ${check(270, 300 + 0, 0, 0)}
    ${bigX(810, 900, 1.6, x)}`;
}
// ---- E 17.88–20.88 but pay attention to your sleep times
function sE(t) {
  const w = back(prog(t, 18.4, 18.7));
  const mag = eout(prog(t, 19.3, 19.8));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 7)}
    ${clockArc(t, 540, 820, 330, 2 + .3 * Math.sin(t), { arc: [2, 10, 1] })}
    ${w > 0 ? `<g transform="translate(540 330) scale(${w})"><path d="M 0 -120 L 130 110 L -130 110 Z" fill="${C.warm}" stroke="${C.ol}" stroke-width="10" stroke-linejoin="round"/>${T(0, 90, 150, '!', C.ol, { sw: 0 })}</g>` : ''}
    ${mag > 0 ? `<g transform="translate(${lerp(1100, 700, mag)} ${lerp(1300, 640, mag)})"><circle r="130" fill="#9fd8ff" opacity=".2" stroke="#c9d2e6" stroke-width="18"/><circle r="130" fill="none" stroke="${C.ol}" stroke-width="6"/><line x1="90" y1="90" x2="200" y2="200" stroke="#2b2f3d" stroke-width="34" stroke-linecap="round"/></g>` : ''}`;
}
// ---- F 20.88–36.68 UK study 2018: >430,000 people; night owls +10 % mortality vs early birds, even accounting for sleep duration
function tower(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#drop)"><rect x="-70" y="-500" width="140" height="500" fill="#c9a86a" stroke="${C.ol}" stroke-width="7"/><rect x="-86" y="-560" width="172" height="80" fill="#b8955a" stroke="${C.ol}" stroke-width="7"/>
    <circle cx="0" cy="-400" r="56" fill="#f2efe6" stroke="${C.ol}" stroke-width="7"/><line x1="0" y1="-400" x2="0" y2="-436" stroke="${C.ol}" stroke-width="6"/><line x1="0" y1="-400" x2="26" y2="-400" stroke="${C.ol}" stroke-width="6"/>
    <polygon points="-86,-560 0,-700 86,-560" fill="#5a6a88" stroke="${C.ol}" stroke-width="7"/>${[0, 1, 2].map(i => `<rect x="-40" y="${-300 + i * 90}" width="80" height="50" rx="6" fill="#6a5a3a"/>`).join('')}</g>`;
}
function sF(t) {
  if (t < 28.4) {
    const cal = back(prog(t, 22.1, 22.4));
    const cnt = 430000 * eio(prog(t, 24.3, 26.0));
    let crowd = '';
    for (let i = 0; i < 40; i++) { const p = back(prog(t, 24.3 + i * .03, 24.55 + i * .03)); if (p > 0) crowd += tiny(110 + (i % 10) * 95, 980 + Math.floor(i / 10) * 110 - 8 * Math.max(0, Math.sin(t * 5 + i)), .55 * p, { col: ['#5d76c8', C.red, '#f2b544', C.pj][i % 4], long: i % 3 === 0, hair: ['#3b2720', '#c98a3a', '#2a1b16'][i % 3] }); }
    const tw = back(prog(t, 27.0, 27.4));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 9)}
      ${calYear(540, 300 + 10 * Math.sin(t * 3), .8, '2018', cal * (1 - prog(t, 24.1, 24.3)))}${tower(900, 900, .7 * back(prog(t, 22.6, 23.0)))}
      ${t > 24.2 ? popT(540, 330, 130, '430.000+', back(prog(t, 24.3, 24.5)), C.warm) : ''}
      ${crowd}`;
  }
  const o = back(prog(t, 28.4, 28.8)), l = back(prog(t, 32.6, 32.95));
  const bar = eio(prog(t, 29.8, 30.6));
  const pc = back(prog(t, 29.88, 30.2));
  const eq = back(prog(t, 34.4, 34.8));
  return `<rect width="1080" height="1920" fill="#0b1226"/><rect x="540" y="0" width="540" height="1920" fill="#1d3a6a"/>${stars(20, 11).replace(/cx="(\d+\.?\d*)"/g, (m, v) => `cx="${(+v) * .5}"`)}
    ${moonF(120, 220, 50)}${sunF(t, 960, 220, 50)}
    ${o > 0 ? owl(270, 620 + 8 * Math.sin(t * 2.5), .95 * o, { t, look: 6 * Math.sin(t * 1.7) }) : ''}
    ${l > 0 ? lark(810, 640, .9 * l, { t, flap: t > 32.7 && t < 33.5 }) : ''}
    ${bar > 0 ? `<rect x="190" y="${1340 - 300 * bar * 1.1}" width="160" height="${300 * bar * 1.1}" rx="12" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/><rect x="730" y="${1340 - 300 * bar}" width="160" height="${300 * bar}" rx="12" fill="${Z.green}" stroke="${C.ol}" stroke-width="7"/>` : ''}
    ${pc > 0 ? popT(270, 960, 100, '+10 %', pc, C.warm) : ''}
    ${eq > 0 ? `<g transform="translate(540 420) scale(${eq})"><rect x="-260" y="-80" width="520" height="160" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>${T(0, 36, 96, '8 h = 8 h', '#fff', { sw: 0 })}</g>` : ''}`;
}
// ---- G 36.68–45.44 mismatch between inner clock and daily life: body wants sleep, work forces you up
function sG(t) {
  if (t < 42.0) {
    const shift = eio(prog(t, 39.3, 40.0));
    const a = back(prog(t, 36.8, 37.2)), b = back(prog(t, 40.9, 41.3));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 13)}
      ${a > 0 ? `<g transform="translate(330 640) scale(${a})"><circle r="260" fill="#6c5ad6" opacity=".25" filter="url(#blur40)"/>${clockArc(t, 0, 0, 230, 7 - 2 * shift, {})}${gear(-150, 190, 50, 9, t * 2, '#9fc2ff')}</g>` : ''}
      ${b > 0 ? `<g transform="translate(780 1030) scale(${b * .9})">${alarm(0, 0, 1.2, { t, h: 7, ring: t > 41.3 })}</g>` : ''}
      ${shift > 0 ? `<path d="M 560 640 Q 760 700 760 860" stroke="${C.warm}" stroke-width="10" fill="none" stroke-dasharray="20 16" stroke-dashoffset="${-t * 60}"/>` : ''}
      ${popT(330, 1000, 100, '≠', back(prog(t, 41.28, 41.5)), C.red)}`;
  }
  const up = eout(prog(t, 43.9, 44.5));
  return `${roomBg(.3)}${windowW(t, 640, 260, 280, 340, { id: 'gW', day: 1 })}
    ${alarm(900, 1000, .55, { t, h: 7, ring: t > 43.3 && t < 45 })}
    ${bedSide(t, 470, 1080, .95, { eyes: up > 0 ? 'n' : 'closed', lid: .7, mouth: up > 0 ? 'wavy' : 'smile', bags: 1, headDy: -60 * up, toss: 30 * up, blanketUp: 1 - .5 * up })}
    ${up > .5 ? `<g transform="translate(${lerp(1200, 860, up)} 820)"><rect x="-80" y="-60" width="160" height="110" rx="14" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="7"/><path d="M -30 -60 v -20 h 60 v 20" stroke="${C.ol}" stroke-width="8" fill="none"/></g>` : ''}
    ${t < 43.4 ? zzz(t, 260, 900, .8, 1) : ''}`;
}
// ---- H 45.44–47.38 three traps
function trap(x, y, s, p, ic) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * back(p)})"><circle r="150" fill="#3a1424" stroke="${C.ol}" stroke-width="9"/><circle r="150" fill="none" stroke="${C.red}" stroke-width="8" stroke-dasharray="24 16"/>${ic}</g>`;
}
const IC = {
  cal: () => `<g transform="scale(.6)"><rect x="-120" y="-100" width="240" height="210" rx="20" fill="#e9eef8" stroke="${C.ol}" stroke-width="10"/><rect x="-120" y="-100" width="240" height="60" rx="20" fill="${C.red}" stroke="${C.ol}" stroke-width="10"/><path d="M -80 0 L -40 60 L 0 -10 L 40 50 L 80 -20" stroke="#6c5ad6" stroke-width="14" fill="none" stroke-linejoin="round"/></g>`,
  light: (t) => `<g transform="scale(.7)">${phoneP(t || 0, 0, 0, .6, { glow: 1, id: 'ic' })}</g>`,
  food: () => `<g transform="scale(.6)">${plate(0, 20, 1)}${moonF(80, -90, 40)}</g>`,
};
function sH(t) {
  const n = back(prog(t, 46.24, 46.5));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 15)}
    ${popT(540, 360, 260, '3', n, C.red)}
    ${trap(250, 900, .9, prog(t, 46.5, 46.8), IC.cal())}${trap(540, 1150, .9, prog(t, 46.65, 46.95), IC.light(t))}${trap(830, 900, .9, prog(t, 46.8, 47.1), IC.food())}`;
}
// ---- I 47.38–69.88 trap 1: irregular sleep times; 2024 study ~61,000 people; regularity predicts better than duration
function sI(t) {
  if (t < 50.08) return chapter(t, 47.38, 50.08, '1', `<g transform="scale(1.6)">${IC.cal()}</g>`, C.red);
  if (t < 56.02) {
    const span = i => i < 5 ? [25, 33] : [27, 36];
    const pr = i => i < 5 ? eout(prog(t, 50.3 + i * .15, 50.8 + i * .15)) : eout(prog(t, 52.9 + (i - 5) * .4, 54.9 + (i - 5) * .3));
    const sunP = back(prog(t, 55.0, 55.3));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>
      ${weekBars(t, 160, 250, { span, prog: pr })}
      ${T(90, 250 + 3 * 70 + 16, 40, '1:00', '#9fb6ff', { sw: 0 })}${T(90, 250 + 5 * 70 + 16, 40, '3:00', '#ff9a3c', { sw: 0 })}${T(90, 250 + 14 * 70 + 16, 40, '12:00', C.warm, { sw: 0 })}
      ${sunP > 0 ? `<g transform="translate(940 ${250 + 14 * 70}) scale(${sunP})">${sunF(t, 0, 0, 40)}</g>` : ''}`;
  }
  if (t < 65.02) {
    const cal = back(prog(t, 57.6, 57.9));
    const cnt = 61000 * eio(prog(t, 58.7, 59.8));
    const rows = back(prog(t, 61.0, 61.3));
    const good = back(prog(t, 63.3, 63.6));
    const regBars = (y, irregular) => Array.from({ length: 7 }, (_, i) => { const off = (irregular ? [0, 60, -40, 80, 20, 140, 120][i] : 0) + 6 * Math.sin(t * 3 + i); return `<rect x="${230 + i * 100}" y="${y - 40 + off * .6}" width="70" height="120" rx="14" fill="${irregular ? '#ff9a3c' : '#6c5ad6'}" stroke="${C.ol}" stroke-width="5"/>`; }).join('');
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 17)}
      ${calYear(540, 260, .7, '2024', cal)}
      ${popT(540, 520, 110, '≈ ' + fmt(cnt), back(prog(t, 58.6, 58.9)), C.warm)}
      ${rows > 0 ? `<g opacity="${cl(rows)}">${regBars(800, false)}${regBars(1130, true)}
        ${good > 0 ? `<g transform="translate(130 820) scale(${good})">${heartF(0, 10, .8, beatAt(t, 70))}</g><g transform="translate(130 1170) scale(${good})">${heartF(0, 10, .8, 0)}<path d="M -10 -50 L 10 -10 L -6 10 L 12 40" stroke="${C.ol}" stroke-width="7" fill="none"/></g>` : ''}</g>` : ''}`;
  }
  const tilt = lerp(0, -16, back(prog(t, 67.4, 68.0))) + 3 * Math.sin(t * 2.4) * (1 - prog(t, 67.4, 67.6));
  const regIc = `<g transform="scale(.7)">${[0, 1, 2, 3].map(i => `<rect x="${-110 + i * 56}" y="-60" width="44" height="90" rx="10" fill="#6c5ad6" stroke="${C.ol}" stroke-width="5"/>`).join('')}</g>`;
  const durIc = `<g transform="scale(.8)"><circle r="60" fill="#141a30" stroke="${C.ol}" stroke-width="6"/>${T(0, 22, 56, '8 h', '#fff', { sw: 0 })}</g>`;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 19)}
    ${scaleBal(540, 640, 1.2, tilt, regIc, durIc)}
    ${check(220, 420, .8, prog(t, 68.0, 68.3))}`;
}
// ---- J 69.88–87.4 trap 2: evening light; camping experiment; clock shifts ~2 h earlier; screens push sleep later
function tent(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="-220,0 0,-260 220,0" fill="${Z.orange}" stroke="${C.ol}" stroke-width="8" stroke-linejoin="round"/><polygon points="-60,0 0,-200 60,0" fill="#5a2d2a" stroke="${C.ol}" stroke-width="6"/></g>`;
}
function sJ(t) {
  if (t < 72.2) return chapter(t, 69.88, 72.2, '2', `<g transform="scale(1.6)">${IC.light(t)}</g>`, Z.screen);
  if (t < 78.56) {
    let ppl = '';
    for (let i = 0; i < 8; i++) { const p = back(prog(t, 73.7 + i * .06, 73.95 + i * .06)); if (p <= 0) continue; const a = Math.PI * (.12 + .76 * i / 7); ppl += tiny(540 + Math.cos(a) * 330, 1200 - Math.sin(a) * 120 + 60, .9 * p, { col: ['#5d76c8', C.red, '#f2b544', C.pj][i % 4], long: i % 2, hair: ['#3b2720', '#c98a3a', '#2a1b16'][i % 3] }); }
    const sunY = lerp(380, 1000, eio(prog(t, 75.8, 77.3)));
    const days = Math.floor(cl((t - 74.4) / .8) * 7);
    let dots = '';
    for (let i = 0; i < 7; i++) dots += `<circle cx="${300 + i * 80}" cy="190" r="22" fill="${i < days ? C.warm : '#2a3456'}" stroke="${C.ol}" stroke-width="5"/>`;
    const dusk = prog(t, 76.6, 77.4);
    return `<rect width="1080" height="1920" fill="#3a6aa8"/><rect width="1080" height="1920" fill="#0b1226" opacity="${.8 * dusk}"/>
      ${sunF(t, 820, sunY, 70)}
      <path d="M 0 900 L 200 640 L 380 860 L 600 600 L 820 880 L 1080 700 L 1080 1000 L 0 1000 Z" fill="#2d4a40" stroke="${C.ol}" stroke-width="7"/>
      <rect x="0" y="980" width="1080" height="980" fill="#3a6a4a"/>
      ${[[90, 900], [980, 930]].map(([x, y]) => `<polygon points="${x},${y - 220} ${x - 70},${y} ${x + 70},${y}" fill="#1e4a34" stroke="${C.ol}" stroke-width="6"/>`).join('')}
      ${tent(280, 1080, .7)}
      ${campfire(t, 540, 1240, dusk > 0 ? .8 + .2 * dusk : .6)}
      ${ppl}${dots}`;
  }
  if (t < 82.08) {
    const sh = eio(prog(t, 80.3, 81.2));
    return `<rect width="1080" height="1920" fill="#0b1226"/>${stars(40, 21)}${campfire(t, 540, 1300, .8)}
      <g transform="translate(540 700)"><circle r="300" fill="#6c5ad6" opacity=".2" filter="url(#blur40)"/>${clockArc(t, 0, 0, 280, 23 - 2 * sh, { arc: [21, 23, sh], arcCol: Z.green })}</g>
      ${popT(540, 300, 130, '− 2 h', back(prog(t, 80.62, 80.9)), Z.green)}`;
  }
  const scr = [back(prog(t, 82.6, 82.9)), back(prog(t, 83.4, 83.7)), back(prog(t, 83.7, 84.0))];
  const later = eio(prog(t, 85.8, 86.6));
  return `${roomBg(.7)}${lampCeil(t, 300, 260, 1)}
    ${scr[1] > 0 ? tvSet(t, 820, 740, .7 * scr[1], 1) : ''}
    ${bedSide(t, 470, 1080, .95, { eyes: 'n', eyeS: 1.2, mouth: 'flat', phone: scr[2], scroll: t * 2, look: -6 })}
    <g transform="translate(860 280) scale(.8)">${clockArc(t, 0, 0, 150, 23 + 2 * later)}</g>
    ${popT(860, 520, 90, '+ 2 h', back(prog(t, 86.3, 86.6)), C.red)}`;
}
// ---- K 87.4–100.22 trap 3: late eating → hungrier, lower energy use
function sK(t) {
  if (t < 90.04) {
    const op = eout(prog(t, 88.5, 88.9));
    return `<rect width="1080" height="1920" fill="#0b1226"/>${badge(150, 250, .9, '3', prog(t, 87.45, 87.8))}
      ${fridge(700, 900, 1, op, t)}
      ${personF(lerp(-100, 330, eout(prog(t, 87.6, 88.6))), 1330, .75, { mouth: op > 0 ? 'o' : 'smile', look: 14, eyeS: 1 + .3 * op, aR: -60 * op })}
      <g transform="translate(160 600)">${wallClock(t, 0, 0, 80, 23.7)}</g>`;
  }
  const cal = back(prog(t, 90.1, 90.4)) * (1 - prog(t, 93.0, 93.2));
  const pl = back(prog(t, 93.2, 93.5));
  const hungry = back(prog(t, 96.8, 97.1));
  const en = eio(prog(t, 97.7, 98.6));
  return `<rect width="1080" height="1920" fill="${Z.night}"/><rect x="540" y="0" width="540" height="1920" fill="#0b0f1e"/>${stars(30, 37)}
    ${calYear(540, lerp(700, 300, eout(prog(t, 91.5, 92.0))), .9, '2022', cal)}${t < 93.2 ? `<g transform="translate(540 1150)">${scientist(0, 200, .55 * back(prog(t, 90.3, 90.6)), { board: 1, lean: 3 * Math.sin(t * 2) })}</g>` : ''}
    ${pl > 0 ? `${wallClock(t, 270, 330, 90 * pl, 18)}${wallClock(t, 810, 330, 90 * pl, 23)}${sunF(t, 400, 230, 34)}${moonF(940, 230, 34)}
      ${plate(270, 700, 1 * pl, { eaten: t > 94.6 })}${plate(810, 700, 1 * pl, { eaten: t > 95.4 })}` : ''}
    ${t > 94.6 ? `${personF(270, 1330, .6, { mouth: 'smile' })}${personF(810, 1330, .6, { mouth: hungry > 0 ? 'o' : 'smile', sx: 1 + .03 * Math.sin(t * 30) * (hungry > 0 ? 1 : 0) })}` : ''}
    ${hungry > 0 ? `<g transform="translate(940 900) scale(${hungry})"><path d="${scallop(0, 0, 90, 60, 9)}" fill="#e9f0ff" stroke="${C.ol}" stroke-width="6"/><path d="M -40 0 q 10 -14 20 0 q 10 14 20 0 q 10 -14 20 0 q 10 14 20 0" stroke="${C.red}" stroke-width="8" fill="none"/></g>` : ''}
    ${en > 0 ? `${battery(270, 520, .8, 1)}<g opacity="${cl(en * 2)}">${battery(810, 520, .8, lerp(1, .55, en))}${arrow(950, 470, 950, 590, C.red, 26, en)}</g>` : ''}`;
}
// ---- L 100.22–103.74 what can you do?
function sL(t) {
  const q = back(prog(t, 102.9, 103.2));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 23)}${moonF(820, 300, 70, { face: {} })}
    ${owl(540, 900, 1.3, { t, look: 10 * Math.sin(t * 2), extra: '' })}
    ${popT(260, 420, 240, '?', q, C.warm)}`;
}
// ---- M 103.74–108.96 tip 1: fixed sleep & wake times, weekend too
function sM(t) {
  const span = () => [24, 32];
  const pr = i => eout(prog(t, 104.6 + i * .12, 105.2 + i * .12));
  const wk = prog(t, 107.6, 108.0);
  const ring_ = t > 106.1 && t < 107.5;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>
    ${weekBars(t, 160, 300, { span, prog: pr, wkCol: '#6c5ad6' })}
    ${wk > 0 ? `<rect x="${160 + 5 * 120 - 14}" y="${220}" width="${240}" height="${12 * 70 + 120}" rx="20" fill="none" stroke="${Z.green}" stroke-width="10" stroke-dasharray="26 16" opacity="${wk}"/>` : ''}
    ${alarm(540, 1250, .6, { t, h: 8, ring: ring_ })}
    ${badge(150, 160, .8, '1', prog(t, 103.8, 104.1))}`;
}
// ---- N 108.96–114.58 tip 2: morning daylight, less light & screens at night
function sN(t) {
  if (t < 111.3) {
    const out = eout(prog(t, 109.8, 110.6));
    return `<rect width="1080" height="1920" fill="#7cc0ff"/>${sunF(t, 800, lerp(700, 330, eout(prog(t, 109.9, 110.6))), 110, { face: { eyes: 'happy', mouth: 'grin' } })}
      <rect x="0" y="1150" width="1080" height="800" fill="#5fb06a"/>
      ${personF(lerp(-200, 420, out), 1330, .85, { mouth: 'smile', aL: 12 + 140 * prog(t, 110.5, 110.9), aR: -12 - 140 * prog(t, 110.5, 110.9), look: 10, lookY: -10 })}
      ${badge(150, 250, .9, '2', prog(t, 109.0, 109.35))}`;
  }
  const dim = eio(prog(t, 112.0, 112.6));
  const ph = prog(t, 113.6, 114.0);
  return `${roomBg(.7 * (1 - dim))}${lampCeil(t, 300, 260, 1 - .8 * dim)}${windowW(t, 640, 280, 260, 320, { id: 'nW' })}
    ${bedSide(t, 470, 1080, .95, { eyes: ph > .5 ? 'closed' : 'n', mouth: 'smile', phone: 1 - ph, phoneGlow: 1 - ph, scroll: t })}
    ${zzz(t, 260, 900, .8, ph)}${badge(150, 250, .9, '2', 1)}`;
}
// ---- O 114.58–119.3 tip 3: eat dinner earlier, avoid night meals
function sO(t) {
  const pl = back(prog(t, 115.6, 115.9));
  const lock = back(prog(t, 117.5, 117.8));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>
    <rect x="80" y="400" width="420" height="900" rx="30" fill="#2a3d6a" stroke="${C.ol}" stroke-width="8"/>${wallClock(t, 290, 560, 90, 18)}${pl > 0 ? plate(290, 1000, .9 * pl) : ''}${check(290, 1220, .7, prog(t, 116.2, 116.5))}
    <rect x="580" y="400" width="420" height="900" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>${wallClock(t, 790, 560, 90, 23.5)}
    <g transform="translate(790 1000) scale(.55)">${fridge(0, 0, 1, 0, t)}</g>
    ${lock > 0 ? `<g transform="translate(790 1000) scale(${lock})"><rect x="-70" y="-30" width="140" height="110" rx="16" fill="${C.warm}" stroke="${C.ol}" stroke-width="8"/><path d="M -40 -30 V -70 Q -40 -110 0 -110 Q 40 -110 40 -70 V -30" stroke="${C.ol}" stroke-width="14" fill="none"/></g>` : ''}
    ${cross(790, 1220, .7, prog(t, 117.6, 117.9))}
    ${badge(150, 250, .9, '3', prog(t, 114.62, 114.95))}`;
}
// ---- P 119.3–131.38 2019 study: owls fell asleep ~2 h earlier within weeks; enough sleep, less stress
function sP(t) {
  if (t < 124.0) {
    const cal = back(prog(t, 120.6, 120.9));
    const o = back(prog(t, 122.0, 122.3));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 25)}${calYear(540, 330, .8, '2019', cal)}
      ${o > 0 ? owl(540, 1000, 1.1 * o, { t, look: 8 }) : ''}`;
  }
  if (t < 127.6) {
    const wk = Math.min(4, Math.floor(cl((t - 124.2) / .9) * 5));
    const sh = eio(prog(t, 125.8, 126.8));
    let pages = '';
    for (let i = 0; i < 4; i++) pages += `<rect x="${250 + i * 150}" y="170" width="120" height="110" rx="14" fill="${i < wk ? '#e9eef8' : '#2a3456'}" stroke="${C.ol}" stroke-width="6"/>${i < wk ? check(310 + i * 150, 225, .35, 1) : ''}`;
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 27)}${pages}
      <g transform="translate(540 820)">${clockArc(t, 0, 0, 320, 2 - 2 * sh, { arc: [0, 2, sh], arcCol: Z.green })}</g>
      ${popT(540, 1280, 120, '− 2 h', back(prog(t, 126.2, 126.5)), Z.green)}`;
  }
  const stress = lerp(.95, .25, eio(prog(t, 129.6, 130.4)));
  return `<rect width="1080" height="1920" fill="#1d3a6a"/>${sunF(t, 860, 260, 70, { face: { eyes: 'happy', mouth: 'smile' } })}
    ${owl(330, 820, 1, { t, sleepy: false, look: 8 })}
    ${battery(330, 330, 1.2, eio(prog(t, 128.4, 129.0)))}
    <g transform="translate(800 880)">${gauge(0, 0, .8, stress)}</g>`;
}
function gauge(x, y, s, v) {
  const a = Math.PI * (1 + v); let arc = '';
  const cols = ['#5fd08a', '#9fdc6a', '#f2d24a', '#ff9a3c', '#ff5468'];
  for (let i = 0; i < 5; i++) { const a0 = Math.PI * (1 + i / 5), a1 = Math.PI * (1 + (i + 1) / 5); arc += `<path d="M ${Math.cos(a0) * 200} ${Math.sin(a0) * 200} A 200 200 0 0 1 ${Math.cos(a1) * 200} ${Math.sin(a1) * 200}" stroke="${cols[i]}" stroke-width="56" fill="none"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -260 30 A 260 260 0 0 1 260 30 Z" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>${arc}
    <line x1="0" y1="0" x2="${Math.cos(a) * 190}" y2="${Math.sin(a) * 190}" stroke="${C.ol}" stroke-width="20" stroke-linecap="round"/><line x1="0" y1="0" x2="${Math.cos(a) * 190}" y2="${Math.sin(a) * 190}" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle r="26" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/></g>`;
}
// ---- Q 131.38–143.62 summary: late but enough < short sleep; watch the three traps
function sQ(t) {
  if (t < 138.3) {
    const tilt = lerp(0, 16, back(prog(t, 134.4, 135.1)));
    const l = `<g transform="scale(.75)">${clockArc(t, 0, -10, 70, 10, { arc: [2, 10, 1], arcCol: Z.green })}</g>`;
    const r = `<g transform="scale(.9)">${battery(0, 0, .8, .15, { t, blink: 1 })}</g>`;
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 29)}${scaleBal(540, 700, 1.2, tilt, l, r)}
      ${popT(540, 300, 110, '<', back(prog(t, 134.6, 134.9)), Z.green)}`;
  }
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 31)}
    ${trap(270, 520, .95, prog(t, 139.4, 139.7), IC.cal())}${trap(810, 520, .95, prog(t, 141.2, 141.5), IC.light(t))}${trap(540, 1020, .95, prog(t, 142.28, 142.6), IC.food())}`;
}
// ---- R 143.62–148.67 when do you go to bed? comments
function sR(t) {
  const spin = t < 145.2 ? t * 3 : 23;
  let cm = '';
  for (let i = 0; i < 3; i++) { const p = back(prog(t, 145.9 + i * .25, 146.2 + i * .25)); if (p > 0) cm += `<g transform="translate(${[250, 820, 520][i]} ${[1180, 1120, 1330][i]}) scale(${p * .9})"><path d="M -150 -70 H 150 Q 180 -70 180 -40 V 40 Q 180 70 150 70 H -60 L -110 120 L -100 70 H -150 Q -180 70 -180 40 V -40 Q -180 -70 -150 -70 Z" fill="#e9f0ff" stroke="${C.ol}" stroke-width="7"/>${[-60, 0, 60].map(x => `<circle cx="${x}" cy="0" r="16" fill="${C.ol}" opacity="${(Math.floor(t * 4) + (x + 60) / 60) % 3 === 0 ? 1 : .4}"/>`).join('')}</g>`; }
  const off = t > 148.0;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 33)}
    <g transform="translate(540 640)">${clockArc(t, 0, 0, 330, spin)}</g>
    ${popT(540, 640, 220, '?', back(prog(t, 145.1, 145.4)), C.red)}${cm}
    ${off ? `<rect width="1080" height="1920" fill="#000" opacity="${.55 * prog(t, 148.0, 148.6)}"/>` : ''}`;
}
const SCENES = [[0, 3.68, sA], [3.68, 5.68, sB], [5.68, 9.56, sC], [9.56, 17.88, sD], [17.88, 20.88, sE], [20.88, 36.68, sF], [36.68, 45.44, sG], [45.44, 47.38, sH], [47.38, 69.88, sI],
  [69.88, 87.4, sJ], [87.4, 100.22, sK], [100.22, 103.74, sL], [103.74, 108.96, sM], [108.96, 114.58, sN], [114.58, 119.3, sO], [119.3, 131.38, sP], [131.38, 143.62, sQ], [143.62, 999, sR]];
function scene(t) { let f = SCENES[SCENES.length - 1][2]; for (const [a, b, fn] of SCENES) if (t >= a && t < b) { f = fn; break; } return f(t); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
