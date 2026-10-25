// @ts-nocheck
// AUTO-GENERATED scene for v8. Change it by commenting on the issue.
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
function fridge(x, y, s, open, t) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${open > 0 ? `<polygon points="-140,-300 140,-300 ${140 + 400 * open},400 ${-140 - 200 * open},400" fill="#e8f6ff" opacity="${.18 * open}"/>` : ''}
    <rect x="-150" y="-320" width="300" height="640" rx="24" fill="#d9e2f2" stroke="${C.ol}" stroke-width="8"/>
    <rect x="-136" y="-300" width="272" height="600" rx="12" fill="${open > 0 ? '#f6fbff' : '#c9d2e6'}"/>
    ${open > 0 ? `<rect x="-120" y="-120" width="240" height="10" fill="#9aa4bb"/><rect x="-120" y="60" width="240" height="10" fill="#9aa4bb"/><rect x="-100" y="-200" width="70" height="80" rx="10" fill="${C.red}" stroke="${C.ol}" stroke-width="5"/><circle cx="40" cy="-150" r="36" fill="${Z.sun}" stroke="${C.ol}" stroke-width="5"/><rect x="-80" y="-10" width="140" height="70" rx="30" fill="#ffb3c8" stroke="${C.ol}" stroke-width="5"/>` : ''}
    <g transform="translate(-150 0) scale(${1 - open * 1.6} 1) translate(150 0)"><rect x="-150" y="-320" width="300" height="640" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="8"/><rect x="100" y="-120" width="18" height="140" rx="9" fill="#9aa4bb" stroke="${C.ol}" stroke-width="5"/></g></g>`;
}

// ===== v8: "Schlafmangel, den du nicht bemerkst" =====
function closeUp(t, o = {}) { // close-up face on pillow, phone-lit
  const lit = o.lit ?? 1;
  return `<rect width="1080" height="1920" fill="#0b1226"/>
    <path d="M -40 760 Q 120 560 420 600 Q 700 640 760 820 Q 800 1100 560 1260 L -40 1300 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <g transform="translate(380 930) rotate(-12) scale(2.6)">${head({ eyes: 'n', mouth: 'flat', lookY: -6, look: 8, ...o.h })}</g>
    <path d="M -40 1300 Q 300 1180 640 1220 Q 900 1200 1120 1120 L 1120 1960 L -40 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <rect width="1080" height="1920" fill="${Z.screen}" opacity="${.12 * lit}"/>`;
}
function mug(x, y, s, t) {
  let st = '';
  for (let i = 0; i < 3; i++) { const p = ((t * .8 + i / 3) % 1); st += `<path d="M ${-30 + i * 30} ${-90 - 120 * p} q 20 -20 0 -40 q -20 -20 0 -40" stroke="#e9f0ff" stroke-width="8" fill="none" opacity="${.7 * Math.sin(p * Math.PI)}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${st}<path d="M 70 -40 Q 130 -40 130 10 Q 130 60 70 60" stroke="${C.ol}" stroke-width="22" fill="none"/><path d="M 70 -40 Q 130 -40 130 10 Q 130 60 70 60" stroke="#e9eef8" stroke-width="10" fill="none"/>
    <rect x="-80" y="-80" width="160" height="180" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="8"/><ellipse cx="0" cy="-74" rx="70" ry="14" fill="#6b3a24"/><rect x="-80" y="10" width="160" height="30" fill="${C.red}"/></g>`;
}
function debtGhost(t, x, y, s, o = {}) { // the ghost as "sleep debt", holding a tally notepad
  const tally = o.tally || 0;
  let marks = '';
  for (let i = 0; i < tally; i++) marks += i % 5 === 4 ? `<line x1="${-46 + Math.floor(i / 5) * 46}" y1="-10" x2="${-6 + Math.floor(i / 5) * 46}" y2="-40" stroke="${C.red}" stroke-width="5"/>` : `<line x1="${-44 + (i % 5) * 8 + Math.floor(i / 5) * 46}" y1="-46" x2="${-44 + (i % 5) * 8 + Math.floor(i / 5) * 46}" y2="-6" stroke="${C.ol}" stroke-width="5"/>`;
  const pad = `<g transform="translate(70 40) rotate(8)"><rect x="-60" y="-70" width="120" height="90" rx="8" fill="#fff" stroke="${C.ol}" stroke-width="5"/>${marks}</g>`;
  return ghostX(x, y, s, { t, alpha: o.alpha ?? .85, mouth: o.mouth || 'grin', brows: 'mean', look: o.look || 0, aR: -70, hold: pad, armsFront: true });
}
function groupCol(t, x, hrs, p, o = {}) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} 0)"><g transform="translate(0 700) scale(${back(p)})"><circle r="110" fill="${['#2d4a40', '#4a3a24', '#5a2438'][o.i]}" stroke="${C.ol}" stroke-width="8"/>${T(0, 36, 90, hrs + ' h', ['#9fdc6a', '#ff9a3c', C.red][o.i], { sw: 0 })}</g>
    ${[0, 1, 2, 3].map(k => tiny(-60 + (k % 2) * 120, 1020 + Math.floor(k / 2) * 190, 1.3 * cl(p * 1.5), { col: ['#5d76c8', C.red, '#f2b544', C.pj][(k + o.i) % 4], long: (k + o.i) % 2 }).replace('scale(0.9', 'scale(0.9')).join('')}</g>`;
}
// ---- A 0–3.22 1 am, "just one more video"
function sA(t) {
  const bp = prog(t, 1.9, 2.2);
  const inner = `<rect x="-300" y="-220" width="600" height="440" fill="#20345e"/><rect x="-150" y="-100" width="300" height="200" rx="20" fill="#ff8fa8" stroke="${C.ol}" stroke-width="6"/><path d="M -30 -50 L 50 0 L -30 50 Z" fill="#fff" stroke="${C.ol}" stroke-width="6"/>`;
  return `${closeUp(t, { h: { eyes: 'n', mouth: 'smile', look: 10, lookY: -10 } })}
    ${phoneP(t, 790, 520, 1.3, { scroll: t * 2.5, id: 'a' })}
    ${digClock(240, 300, .9, '01:00')}
    ${bubble(780, 1050, 200, 150, bp, inner, 'aB', { tail: [[-160, -150, 14]] })}
    ${popT(940, 1180, 100, '1', back(prog(t, 2.3, 2.5)), C.warm)}`;
}
// ---- B 3.22–5.9 half an hour later still scrolling
function sB(t) {
  const fp = eio(prog(t, 3.6, 3.9));
  const dg = (a, b, x) => `<text x="${x}" y="${32 - 110 * fp}">${a}</text><text x="${x}" y="${142 - 110 * fp}">${b}</text>`;
  return `${closeUp(t, { h: { eyes: 'n', lid: .45 + .1 * Math.sin(t * 2), mouth: 'flat', look: 10, lookY: -10, bags: 1 } })}
    ${phoneP(t, 790, 520, 1.3, { scroll: t * 4, id: 'b' })}
    <g transform="translate(240 300) scale(.9)"><ellipse cx="0" cy="0" rx="230" ry="130" fill="url(#gRed)"/><rect x="-150" y="-62" width="300" height="124" rx="22" fill="#11141d" stroke="${C.ol}" stroke-width="7"/><rect x="-132" y="-46" width="264" height="92" rx="10" fill="#07080c"/>
      <clipPath id="bC"><rect x="-132" y="-46" width="264" height="92" rx="10"/></clipPath><g clip-path="url(#bC)" style="font-family:'Inter';font-weight:900;font-size:84px" fill="${C.red}" text-anchor="middle"><text x="-75" y="32">01</text><text x="0" y="28">:</text>${dg('0', '3', 45)}<text x="95" y="32">0</text></g></g>
    ${popT(240, 470, 80, '+30 min', back(prog(t, 4.0, 4.3)), C.warm)}`;
}
// ---- C 5.9–8.48 morning coffee, feels okay
function kitchen(t) {
  return `<rect width="1080" height="1920" fill="#2a3d6a"/><rect x="0" y="1150" width="1080" height="800" fill="${C.woodSh}"/><rect x="0" y="1130" width="1080" height="40" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    ${windowW(t, 640, 220, 300, 360, { id: 'kW', day: 1 })}<rect width="1080" height="1920" fill="#ffe7a8" opacity=".08"/>`;
}
function sC(t) {
  const sip = Math.sin(prog(t, 6.6, 7.2) * Math.PI);
  const ok = back(prog(t, 7.7, 8.0));
  return `${kitchen(t)}${personF(400, 1500, 1.15, { mouth: t > 7.2 ? 'smile' : 'flat', aR: -40 - 70 * sip, aL: ok > 0 ? 150 : 12, eyeS: .9, look: 10 })}
    ${mug(lerp(560, 480, sip), lerp(900, 760, sip), .8, t)}
    ${ok > 0 ? `<g transform="translate(200 560) scale(${ok})"><circle r="60" fill="${Z.green}" stroke="${C.ol}" stroke-width="7"/><path d="M -24 0 L -6 18 L 26 -18" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}`;
}
// ---- D 8.48–10.64 that's the worrying part — hidden sleep debt
function sD(t) {
  const g = eout(prog(t, 8.6, 9.3));
  return `${kitchen(t)}<rect width="1080" height="1920" fill="#000" opacity="${.35 * g}"/>
    ${g > 0 ? debtGhost(t, lerp(1250, 800, g), 620 - 10 * Math.sin(t * 3), 1.1, { alpha: .8, tally: Math.floor(g * 12) }) : ''}
    ${personF(400, 1500, 1.15, { mouth: 'smile', aR: -40, eyeS: .9, look: -6 })}${mug(560, 900, .8, t)}`;
}
// ---- E 10.64–18.4 experiment: 48 people, 2 weeks, 8 / 6 / 4 h
function sE(t) {
  if (t < 15.18) {
    let g = '';
    for (let i = 0; i < 48; i++) { const p = back(prog(t, 11.9 + i * .02, 12.15 + i * .02)); if (p > 0) g += tiny(100 + (i % 8) * 125, 520 + Math.floor(i / 8) * 105, .6 * p, { col: ['#5d76c8', C.red, '#f2b544', C.pj][i % 4], long: i % 3 === 0, hair: ['#3b2720', '#c98a3a', '#2a1b16'][i % 3] }); }
    let cal = '';
    for (let i = 0; i < 14; i++) { const p = back(prog(t, 13.5 + i * .06, 13.7 + i * .06)); if (p > 0) cal += `<g transform="translate(${130 + (i % 7) * 137} ${1270 + Math.floor(i / 7) * 0}) scale(${p * .9})"><rect x="-55" y="-50" width="110" height="${100}" rx="12" fill="${i < 7 ? '#2a3d7a' : '#3a2d6a'}" stroke="${C.ol}" stroke-width="6"/>${moonF(0, 0, 22)}</g>`; }
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 41)}
      ${popT(540, 300, 200, '48', back(prog(t, 12.18, 12.45)), C.warm)}${g}
      <g transform="translate(0 ${-140 * prog(t, 14.4, 14.5) * 0})">${cal}</g>
      ${popT(540, 1150, 80, '2 ×', back(prog(t, 14.0, 14.3)), '#cfe0ff')}`;
  }
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 43)}
    ${groupCol(t, 200, 8, prog(t, 15.4, 15.7), { i: 0 })}${groupCol(t, 540, 6, prog(t, 16.0, 16.3), { i: 1 })}${groupCol(t, 880, 4, prog(t, 16.7, 17.0), { i: 2 })}
    ${moonF(540, 330, 80, { face: {} })}`;
}
// ---- F 18.4–25.74 ≤6 h → concentration drops to the level of 1–2 sleepless nights
function sF(t) {
  const d = eio(prog(t, 20.1, 22.0));
  const ref = prog(t, 23.7, 24.3);
  const hit = back(prog(t, 25.1, 25.4));
  const base = 1300;
  const h8 = 700, h6 = lerp(700, 380, d), h4 = lerp(700, 300, d);
  const refY = base - 380;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>
    <rect x="100" y="${base}" width="880" height="12" fill="#33405e"/>
    ${[[200, h8, '#9fdc6a', '8 h'], [540, h6, '#ff9a3c', '6 h'], [880, h4, C.red, '4 h']].map(([x, h, c, l]) => `<rect x="${x - 110}" y="${base - h}" width="220" height="${h}" rx="16" fill="${c}" stroke="${C.ol}" stroke-width="8"/>${T(x, base - h + 80, 70, l, C.ol, { sw: 0 })}`).join('')}
    <g transform="translate(540 260)">${brainF(t, 0, 0, .55, { face: d > .5 ? { eyes: 'swirl', t, mouth: 'wavy' } : { eyes: 'n', mouth: 'smile' } })}</g>
    ${ref > 0 ? `<line x1="80" y1="${refY}" x2="${80 + 920 * ref}" y2="${refY}" stroke="#fff" stroke-width="10" stroke-dasharray="28 18"/>` : ''}
    ${ref >= 1 ? `<g transform="translate(680 ${refY - 300})"><rect x="-230" y="-80" width="460" height="160" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>${moonF(-140, 0, 40)}${T(40, 30, 80, '0 h × 1–2', '#fff', { sw: 0 })}</g>` : ''}
    ${hit > 0 ? `<circle cx="540" cy="${refY}" r="${60 + 80 * (1 - cl((t - 25.1) / .5))}" fill="none" stroke="${C.red}" stroke-width="10" opacity="${1 - cl((t - 25.1) / .6)}"/>` : ''}`;
}
// ---- G 25.74–31.76 participants felt only a bit sleepy, didn't notice the drop
function sG(t) {
  const dropP = eio(prog(t, 29.6, 31.2));
  let d = 'M 120 700';
  for (let i = 1; i <= 20; i++) { const x = 120 + i * 42, y = 700 + (i / 20) * 500 * dropP * (i / 20) + 20 * Math.sin(i); d += ` L ${x} ${y}`; }
  return `<rect width="1080" height="1920" fill="#1d2b4a"/>
    <rect x="80" y="420" width="920" height="880" rx="30" fill="#141a30" stroke="${C.ol}" stroke-width="8"/>
    <path d="${d}" stroke="${C.red}" stroke-width="14" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    ${dropP > .5 ? arrow(900, 900, 900, 1200, C.red, 34, 1) : ''}
    ${personF(330, 1520, .9, { mouth: 'smile', look: -14, eyeS: .8, headTilt: -4 + 2 * Math.sin(t * 2) })}
    <g transform="translate(330 600)">${bubble(0, 0, 150, 110, prog(t, 27.4, 27.8), `<rect x="-200" y="-150" width="400" height="300" fill="#e9f0ff"/>${battery(0, 0, .8, .8)}`, 'gB', { bg: '#e9f0ff' })}</g>
    ${popT(330, 1000, 100, '🙂', 0, C.warm)}`;
}
// ---- H 31.76–43.5 17–19 h awake ≈ reaction like 0.5 ‰ blood alcohol
function beer(x, y, s, t) {
  let bub = ''; for (let i = 0; i < 5; i++) { const p = ((t * .7 + i / 5) % 1); bub += `<circle cx="${-40 + i * 20}" cy="${120 - 200 * p}" r="6" fill="#fff6c9" opacity=".8"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 90 -60 Q 160 -60 160 10 Q 160 80 90 80" stroke="${C.ol}" stroke-width="26" fill="none"/><path d="M 90 -60 Q 160 -60 160 10 Q 160 80 90 80" stroke="#e9eef8" stroke-width="12" fill="none"/>
    <rect x="-100" y="-120" width="200" height="280" rx="20" fill="#f2b544" stroke="${C.ol}" stroke-width="8"/>${bub}<path d="${scallop(0, -130, 115, 50, 9)}" fill="#fff" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -60 -60 V 120" stroke="#ffd98a" stroke-width="14" stroke-linecap="round"/></g>`;
}
function sH(t) {
  if (t < 36.7) {
    const hrs = 19 * eio(prog(t, 32.0, 35.6));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 45)}
      <g transform="translate(540 760)">${clockArc(t, 0, 0, 320, 7 + hrs, { arc: [7, 7 + Math.min(hrs, 11.99), 1], arcCol: C.red })}</g>
      ${popT(540, 1260, 130, Math.round(hrs) + ' h', hrs > .2 ? 1 : 0, C.warm)}
      ${t > 35.3 ? popT(540, 300, 110, '17–19 h', back(prog(t, 35.4, 35.7)), C.red) : ''}`;
  }
  if (t < 39.72) {
    const fall = ein(prog(t, 37.2, 37.9));
    const grab = prog(t, 38.4, 38.6);
    const ry = lerp(300, 900, fall) + (t > 37.9 ? 300 * cl((t - 37.9) / .5) : 0);
    return `<rect width="1080" height="1920" fill="#1d2b4a"/>
      <g transform="translate(540 ${ry})"><rect x="-40" y="-260" width="80" height="520" rx="10" fill="${C.warm}" stroke="${C.ol}" stroke-width="7"/>${Array.from({ length: 12 }, (_, i) => `<line x1="-40" y1="${-240 + i * 42}" x2="${i % 2 ? -10 : 5}" y2="${-240 + i * 42}" stroke="${C.ol}" stroke-width="5"/>`).join('')}</g>
      <g transform="translate(540 1000)"><g transform="translate(${lerp(-120, -50, grab)} 0)"><rect x="-60" y="-50" width="120" height="100" rx="40" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/></g><g transform="translate(${lerp(120, 50, grab)} 0)"><rect x="-60" y="-50" width="120" height="100" rx="40" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/></g></g>
      ${cross(820, 600, .8, prog(t, 38.7, 39.0))}${popT(260, 600, 100, '?', back(prog(t, 38.75, 39.0)), C.warm)}`;
  }
  const eq = back(prog(t, 39.8, 40.1));
  const b = back(prog(t, 40.5, 40.9));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 47)}
    <g transform="translate(260 700)">${clockArc(t, 0, 0, 180, 2, { arc: [7, 14, 1], arcCol: C.red })}</g>${T(260, 990, 80, '19 h', C.red)}
    ${popT(540, 720, 160, '≈', eq, '#fff')}
    ${b > 0 ? beer(820, 720, .9 * b, t) : ''}
    ${popT(820, 1050, 110, '0,5 ‰', back(prog(t, 42.38, 42.65)), C.warm)}`;
}
// ---- I 43.5–59.48 hunger: satiety hormone −18 %, hunger hormone +28 %, night snacking
function tummy(t, x, y, s, o = {}) {
  const gr = o.growl ? 6 * Math.sin(t * 40) : 0;
  return `<g transform="translate(${x + gr} ${y}) scale(${s})"><path d="M -150 -60 Q -170 -170 -40 -160 Q 60 -150 90 -80 Q 200 -40 170 80 Q 140 190 0 170 Q -170 150 -170 40 Q -170 -20 -150 -60 Z" fill="#ff9fb3" stroke="${C.ol}" stroke-width="9"/>
    <g transform="translate(0 20) scale(1.1)">${face(o.face || { eyes: 'n', mouth: 'smile' })}</g></g>`;
}
function sI(t) {
  if (t < 45.8) {
    const gw = t > 44.5;
    return `<rect width="1080" height="1920" fill="#1d2b4a"/>${tummy(t, 540, 820, 1.6, { growl: gw, face: gw ? { eyes: 'tight', mouth: 'wavy', brows: 'sad' } : { eyes: 'n', mouth: 'smile' } })}
      ${gw ? `<path d="M 160 600 l 30 -20 l 20 30 l 30 -24 M 860 600 l 30 -20 l 20 30 l 30 -24" stroke="${C.warm}" stroke-width="10" fill="none" stroke-linecap="round"/>` : ''}`;
  }
  if (t < 55.4) {
    const n1 = back(prog(t, 45.8, 46.1)), n2 = back(prog(t, 46.3, 46.6));
    const sat = lerp(1, .82, eio(prog(t, 49.6, 50.6)));
    const hun = lerp(1, 1.28, eio(prog(t, 52.6, 53.8)));
    const H = 420, base = 1320;
    return `<rect width="1080" height="1920" fill="${Z.night}"/>
      ${[n1, n2].map((p, i) => p > 0 ? `<g transform="translate(${370 + i * 340} ${290 + 10 * Math.sin(t * 3 + i)}) scale(${p})"><rect x="-140" y="-90" width="280" height="180" rx="24" fill="#2a3d7a" stroke="${C.ol}" stroke-width="7"/>${moonF(-60, 0, 40)}${T(50, 30, 80, '4 h', C.red, { sw: 0 })}</g>` : '').join('')}
      ${t > 48.9 ? `<rect x="190" y="${base - H * sat}" width="260" height="${H * sat}" rx="18" fill="${Z.green}" stroke="${C.ol}" stroke-width="8"/>${tummy(t, 320, base - H * sat - 110, .5, { face: { eyes: 'happy', mouth: 'smile' } })}<line x1="160" y1="${base - H}" x2="480" y2="${base - H}" stroke="#fff" stroke-width="6" stroke-dasharray="16 12"/>` : ''}
      ${popT(320, base + 0 - 160, 90, '−18 %', back(prog(t, 50.48, 50.75)), '#fff')}
      ${t > 52.3 ? `<rect x="630" y="${base - H * hun}" width="260" height="${H * hun}" rx="18" fill="${C.red}" stroke="${C.ol}" stroke-width="8"/>${tummy(t, 760, base - H * hun - 110, .5, { growl: t > 53.5, face: { eyes: 'tight', mouth: 'o' } })}<line x1="600" y1="${base - H}" x2="920" y2="${base - H}" stroke="#fff" stroke-width="6" stroke-dasharray="16 12"/>` : ''}
      ${popT(760, base - 160, 90, '+28 %', back(prog(t, 53.54, 53.8)), '#fff')}
      <rect x="120" y="${base}" width="840" height="12" fill="#33405e"/>`;
  }
  const op = eout(prog(t, 55.5, 55.9));
  const grab = back(prog(t, 57.2, 57.5));
  return `<rect width="1080" height="1920" fill="#0b1226"/>${fridge(700, 900, 1, op, t)}
    ${personF(330, 1330, .8, { mouth: 'grin' === 'x' ? 'o' : 'o', look: 14, eyeS: 1.2, aR: -60 - 50 * grab })}
    ${grab > 0 ? `<g transform="translate(${lerp(640, 470, grab)} ${lerp(800, 700, grab)}) scale(${grab})"><circle r="60" fill="#c98a3a" stroke="${C.ol}" stroke-width="7"/><circle r="22" fill="#0b1226" stroke="${C.ol}" stroke-width="5"/><path d="M -46 -20 Q 0 -60 46 -20" stroke="#ff8fa8" stroke-width="16" fill="none" stroke-linecap="round"/></g>
      <g transform="translate(560 520) scale(${back(prog(t, 57.6, 57.9))})"><rect x="-26" y="-60" width="52" height="120" rx="12" fill="#ff8fa8" stroke="${C.ol}" stroke-width="6" transform="rotate(20)"/></g><g transform="translate(420 470) scale(${back(prog(t, 57.8, 58.1))})"><circle r="40" fill="#9b7cf0" stroke="${C.ol}" stroke-width="6"/></g>` : ''}
    <g transform="translate(160 400)">${wallClock(t, 0, 0, 80, 1.2)}</g>`;
}
// ---- J 59.48–76.82 heart: <4 h → next day pulse +5 bpm; high morning resting pulse = not recovered
function sJ(t) {
  if (t < 66.3) {
    const sci = eout(prog(t, 61.2, 61.7));
    const nt = back(prog(t, 63.3, 63.6));
    const bt = beatAt(t, 64);
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(30, 49)}
      ${heartF(540, 520, 1.6, bt, { face: { eyes: t > 63.3 ? 'n' : 'n', mouth: 'smile' } })}
      ${scientist(lerp(-200, 220, sci), 1380, .6, { board: 1, look: 10 })}
      ${nt > 0 ? `<g transform="translate(720 1050) scale(${nt})"><rect x="-200" y="-110" width="400" height="220" rx="30" fill="#2a3d7a" stroke="${C.ol}" stroke-width="8"/>${moonF(-100, 0, 50)}${T(60, 34, 90, '< 4 h', C.red, { sw: 0 })}</g>` : ''}`;
  }
  const bpm = t < 67.3 ? 62 : lerp(62, 67, eio(prog(t, 67.3, 68.0)));
  const plus = back(prog(t, 67.38, 67.65));
  if (t < 70.3) return `<rect width="1080" height="1920" fill="#1d3a6a"/>${sunF(t, 880, 230, 70)}
    ${heartF(540, 560, 1.6, beatAt(t, bpm * 1.6), { face: { eyes: t > 67.4 ? 'n' : 'n', eyeS: t > 67.4 ? 1.3 : 1, mouth: t > 67.4 ? 'o' : 'smile', brows: t > 67.4 ? 'up' : 'calm' } })}
    <rect x="80" y="980" width="920" height="260" rx="26" fill="#0b1226" stroke="${C.ol}" stroke-width="8"/>${ecg(t, 110, 1140, 860, 100, bpm * 1.6)}
    ${popT(540, 330, 120, '+5 /min', plus, C.red)}`;
  const content = `${heartF(-50, -40, .32, beatAt(t, 80))}${T(26, 68, 92, t > 71.5 ? '72' : String(60 + Math.floor(hash(Math.floor(t * 12)) * 15)), C.red, { sw: 0 })}`;
  const bat = back(prog(t, 74.6, 74.9));
  return `<rect width="1080" height="1920" fill="#1d3a6a"/>${sunF(t, 880, 230, 70)}
    ${watchF(t, 560, 760, 1.5, { rot: -8, content })}
    ${arrow(860, 620, 860, 380, C.red, 36, prog(t, 71.3, 71.7))}
    ${bat > 0 ? `<g transform="translate(540 1200) scale(${bat})">${battery(0, 0, 1.3, .25, { t, blink: 1 })}</g>` : ''}`;
}
// ---- K 76.82–91.52 immune defence: 164 people exposed to a cold virus; <6 h → 4× more often sick
function virus(x, y, s, t, k = 0) {
  let sp = ''; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t; sp += `<line x1="${Math.cos(a) * 40}" y1="${Math.sin(a) * 40}" x2="${Math.cos(a) * 62}" y2="${Math.sin(a) * 62}" stroke="${C.ol}" stroke-width="7"/><circle cx="${Math.cos(a) * 64}" cy="${Math.sin(a) * 64}" r="10" fill="#8fd86a" stroke="${C.ol}" stroke-width="4"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${(t * 40 + k * 50) % 360})">${sp}<circle r="44" fill="#8fd86a" stroke="${C.ol}" stroke-width="7"/><g transform="rotate(${-((t * 40 + k * 50) % 360)}) scale(.55)">${face({ eyes: 'n', mouth: 'grin', brows: 'mean' })}</g></g>`;
}
function shieldF(x, y, s, crack = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 -160 L 140 -110 Q 140 80 0 170 Q -140 80 -140 -110 Z" fill="#5d9bf0" stroke="${C.ol}" stroke-width="10"/><path d="M 0 -120 L 100 -84 Q 100 60 0 128 Z" fill="#8fbaf8"/>
    ${crack > 0 ? `<path d="M -10 -150 L 20 -60 L -20 0 L 30 80 L 0 160" stroke="${C.ol}" stroke-width="9" fill="none" stroke-dasharray="${400 * crack} 400"/>` : ''}</g>`;
}
function sK(t) {
  if (t < 78.84) {
    const cr = prog(t, 77.6, 78.2);
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${shieldF(540, 760, 2, cr)}${[0, 1, 2].map(k => virus(540 + 380 * Math.cos(k * 2.1 + t), 760 + 380 * Math.sin(k * 2.1 + t), .9, t, k)).join('')}`;
  }
  if (t < 84.3) {
    const cnt = Math.round(164 * eio(prog(t, 80.0, 81.0)));
    let g = '';
    for (let i = 0; i < 20; i++) { const p = back(prog(t, 79.0 + i * .05, 79.25 + i * .05)); if (p > 0) g += tiny(140 + (i % 5) * 200, 1000 + Math.floor(i / 5) * 120 - 300, .9 * p, { col: ['#5d76c8', C.red, '#f2b544', C.pj][i % 4], long: i % 2 }); }
    let vs = '';
    if (t > 81.9) for (let k = 0; k < 6; k++) { const p = prog(t, 81.9 + k * .12, 82.9 + k * .12); vs += virus(lerp(-100, 200 + k * 140, p), lerp(300, 700 + (k % 3) * 120, p), .5, t, k); }
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${popT(540, 300, 160, String(cnt), cnt > 0 ? 1 : 0, C.warm)}${g}${vs}`;
  }
  const L = prog(t, 84.4, 84.8), R = prog(t, 89.6, 90.0);
  const sick = t > 86.7;
  const four = back(prog(t, 87.26, 87.55));
  const grp = (x0, nSick, show) => Array.from({ length: 8 }, (_, i) => { const s_ = show && i < nSick; return `${tiny(x0 + (i % 2) * 150, 760 + Math.floor(i / 2) * 150 - 8 * Math.max(0, Math.sin(t * 4 + i)), .9, { col: s_ ? '#8fd86a' : '#5d76c8' })}${s_ ? `<g transform="translate(${x0 + (i % 2) * 150 + 26} ${760 + Math.floor(i / 2) * 150 - 140})"><path d="M 0 0 q 10 -14 0 -26" stroke="#9fd8ff" stroke-width="6" fill="none"/></g>` : ''}`; }).join('');
  return `<rect width="1080" height="1920" fill="${Z.night}"/><rect x="540" y="0" width="540" height="1920" fill="#14203a"/>
    <g opacity="${L}"><g transform="translate(270 300)"><rect x="-170" y="-80" width="340" height="160" rx="30" fill="#5a2438" stroke="${C.ol}" stroke-width="8"/>${T(0, 32, 80, '< 6 h', '#fff', { sw: 0 })}</g>${grp(195, 4, sick)}</g>
    <g opacity="${R}"><g transform="translate(810 300)"><rect x="-170" y="-80" width="340" height="160" rx="30" fill="#2d4a40" stroke="${C.ol}" stroke-width="8"/>${T(0, 32, 80, '> 7 h', '#fff', { sw: 0 })}</g>${grp(735, 1, sick)}</g>
    ${popT(540, 560, 150, '× 4', four, C.red)}`;
}
// ---- L 91.52–99.56 why stay awake? no time for yourself during the day → reclaim freedom at night
function sL(t) {
  if (t < 93.5) return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 51)}${bedSide(t, 540, 1000, .9, { eyes: 'n', eyeS: 1.2, mouth: 'flat', phone: 1, scroll: t * 2 })}${popT(540, 400, 260, '?', back(prog(t, 91.6, 91.9)), C.warm)}`;
  if (t < 96.3) {
    const sp = (t - 93.5) * 4;
    let papers = ''; for (let i = 0; i < 6; i++) papers += `<rect x="${620 + (i % 3) * 20}" y="${960 - i * 24}" width="200" height="22" fill="#e9eef8" stroke="${C.ol}" stroke-width="4"/>`;
    return `<rect width="1080" height="1920" fill="#2a3d6a"/><rect x="0" y="1250" width="1080" height="700" fill="url(#gFloor)"/>
      ${wallClock(t, 820, 330, 120, 8 + sp)}
      <rect x="140" y="1000" width="800" height="40" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/><rect x="180" y="1040" width="30" height="220" fill="${C.woodSh}"/><rect x="870" y="1040" width="30" height="220" fill="${C.woodSh}"/>
      ${papers}${personF(380, 1260, .8, { mouth: 'worried', brow: 1, aL: 60 + 20 * Math.sin(t * 14), aR: -60 - 20 * Math.sin(t * 14 + 1), lean: 4 })}
      <rect x="300" y="820" width="220" height="150" rx="10" fill="#1b2030" stroke="${C.ol}" stroke-width="7"/><rect x="314" y="834" width="192" height="122" fill="#7cc8ff"/>`;
  }
  const free = back(prog(t, 97.4, 97.8));
  const grab = back(prog(t, 98.1, 98.5));
  let spark = ''; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t; spark += `<path d="M ${540 + Math.cos(a) * 330} ${700 + Math.sin(a) * 330} l 8 -20 l 8 20 l 20 8 l -20 8 l -8 20 l -8 -20 l -20 -8 Z" fill="${C.warm}" opacity="${free}"/>`; }
  return `<rect width="1080" height="1920" fill="#0b1226"/>${stars(60, 53)}${moonF(860, 260, 60, { face: {} })}
    ${spark}
    ${personF(540, 1300, .95, { mouth: 'smile', aL: 12 + 140 * free, aR: -12 - 140 * free, eyeS: 1.1, lookY: -10 })}
    ${grab > 0 ? `<g transform="translate(540 ${lerp(400, 640, grab)}) scale(${grab})">${wallClock(t, 0, 0, 90, t * 3)}</g>` : ''}`;
}
// ---- M 99.56–101.68 three changes
function sM(t) {
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 55)}${badge(250, 760, 1.2, '1', prog(t, 99.6, 99.9))}${badge(540, 650, 1.2, '2', prog(t, 99.8, 100.1))}${badge(830, 760, 1.2, '3', prog(t, 100.0, 100.3))}
    ${bedSide(t, 540, 1150, .6, { eyes: 'closed', mouth: 'smile' })}`;
}
// ---- N 101.68–110.32 tip 1: fixed screens-off time, reminder 30 min before bed
function sN(t) {
  const off = [prog(t, 104.4, 104.7), prog(t, 104.6, 104.9), prog(t, 104.8, 105.1)];
  const rem = back(prog(t, 106.7, 107.0));
  const content = `<rect x="-66" y="-140" width="132" height="280" fill="#20345e"/><g transform="translate(0 -40) rotate(${rem > 0 ? 14 * Math.sin(t * 30) * Math.exp(-(t - 106.7) * 2) : 0})"><path d="M -40 30 Q -40 -40 0 -40 Q 40 -40 40 30 L 54 44 H -54 Z" fill="${C.warm}" stroke="${C.ol}" stroke-width="5"/><circle cy="54" r="12" fill="${C.warm}" stroke="${C.ol}" stroke-width="4"/></g>${T(0, 90, 38, '30 min', '#fff', { sw: 0 })}`;
  return `${roomBg(0)}${badge(150, 250, .9, '1', prog(t, 101.7, 102.05))}
    ${tvSet(t, 760, 560, .7, 1, { offP: off[0] })}
    <g transform="translate(300 700)"><rect x="-160" y="-110" width="320" height="200" rx="14" fill="#1b2030" stroke="${C.ol}" stroke-width="7"/><rect x="-144" y="-96" width="288" height="172" fill="${off[1] > .5 ? '#05070d' : '#7cc8ff'}"/><rect x="-200" y="90" width="400" height="24" rx="10" fill="#3a3f55" stroke="${C.ol}" stroke-width="6"/></g>
    ${wallClock(t, 540, 1050, 110, 22.3 + .03 * (t - 101.68))}
    ${rem > 0 ? phoneP(t, 830, 1050, 1.1 * rem, { content, id: 'n' }) : ''}
    ${popT(540, 320, 90, '22:30', back(prog(t, 103.3, 103.6)), C.warm)}`;
}
// ---- O 110.32–116.98 tip 2: same wake-up time, weekend too → tired earlier in the evening
function sO(t) {
  let al = '';
  for (let i = 0; i < 7; i++) { const p = back(prog(t, 111.3 + i * .1, 111.55 + i * .1)); if (p > 0) al += `<g transform="translate(${150 + (i % 4) * 260} ${520 + Math.floor(i / 4) * 330}) scale(${p})">${alarm(0, 0, .75, { t, h: 7, ring: t > 112.2 && t < 112.9, col: i > 4 ? '#ff9a3c' : C.red })}${T(0, 170, 50, ['M', 'D', 'M', 'D', 'F', 'S', 'S'][i], '#cfe0ff', { sw: 0 })}</g>`; }
  const wk = prog(t, 113.3, 113.7);
  const yawn = back(prog(t, 115.4, 115.7));
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${badge(150, 250, .9, '2', prog(t, 110.35, 110.7))}${al}
    ${wk > 0 ? `<rect x="280" y="${520 + 330 - 160}" width="520" height="380" rx="30" fill="none" stroke="${Z.green}" stroke-width="10" stroke-dasharray="26 16" opacity="${wk}" transform="translate(${260 * 0} 0)"/>` : ''}
    ${yawn > 0 ? `<g transform="translate(800 1230) scale(${yawn})"><circle r="90" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/><g transform="translate(0 10) scale(.9)">${face({ eyes: 'closed', mouth: 'yawn' })}</g>${moonF(-150, -40, 40)}</g>` : ''}`;
}
// ---- P 116.98–125.78 tip 3: last 15 minutes for you — printed book or music instead of a bright screen
function sP(t) {
  const sl = back(prog(t, 119.2, 119.5));
  const book = back(prog(t, 122.4, 122.7));
  const mus = t > 123.26;
  const xP = prog(t, 124.0, 124.3);
  return `${roomBg(.15)}${badge(150, 250, .9, '3', prog(t, 117.0, 117.35))}
    <g transform="translate(820 330)">${clockArc(t, 0, 0, 150, 22.75, { arc: [10.75, 11, sl], arcCol: Z.green })}</g>
    ${nightLight(t, 120, 1240, 1.2, .5, { col: '#ffb85c' })}
    <polygon points="160,620 260,620 520,1100 -40,1100" fill="#ffd98a" opacity=".12"/><path d="M 210 300 V 600" stroke="${C.ol}" stroke-width="10"/><path d="M 140 640 L 170 580 L 250 580 L 280 640 Z" fill="#ffd98a" stroke="${C.ol}" stroke-width="7"/>
    ${bedSide(t, 560, 1080, .95, { eyes: 'n', look: 10, lookY: 10, mouth: 'smile' })}
    ${book > 0 ? `<g transform="translate(470 880) scale(${book}) rotate(-10)"><path d="M 0 0 L -110 -30 L -110 90 L 0 120 Z" fill="#e9eef8" stroke="${C.ol}" stroke-width="6"/><path d="M 0 0 L 110 -30 L 110 90 L 0 120 Z" fill="#f4f6fb" stroke="${C.ol}" stroke-width="6"/><path d="M -90 0 l 70 18 M -90 30 l 70 18 M 20 18 l 70 -18 M 20 48 l 70 -18" stroke="#9aa4bb" stroke-width="5"/><rect x="-118" y="-36" width="236" height="166" fill="none"/></g>` : ''}
    ${mus ? [0, 1, 2].map(k => { const p = ((t * .6 + k / 3) % 1); return `<g transform="translate(${720 + 80 * k} ${780 - 200 * p})" opacity="${Math.sin(p * Math.PI)}"><ellipse cx="0" cy="20" rx="18" ry="13" fill="${['#ffd27a', '#7fe6d6', '#ff8fa8'][k]}" stroke="${C.ol}" stroke-width="4"/><path d="M 16 16 V -40" stroke="${C.ol}" stroke-width="6"/></g>`; }).join('') : ''}
    ${t > 123.6 ? `<g transform="translate(900 1050) scale(${back(prog(t, 123.6, 123.9))})">${phoneP(t, 0, 0, .6, { glow: 1, id: 'p' })}</g>${bigX(900, 1050, .5, xP)}` : ''}`;
}
// ---- Q 125.78–134.46 adults need ≥7 h; the body doesn't forget sleep debt — you just don't notice
function sQ(t) {
  if (t < 129.6) {
    const p = back(prog(t, 127.3, 127.6));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 57)}
      <g transform="translate(540 700)">${clockArc(t, 0, 0, 300, 6 + 1.5 * eio(prog(t, 126.4, 127.6)) + .05 * (t - 125.78), { arc: [23, 30, eio(prog(t, 126.4, 127.6))], arcCol: Z.green })}</g>
      ${popT(540, 1180, 150, '7 h +', p, Z.green)}`;
  }
  const g = eout(prog(t, 129.7, 130.3));
  const tally = Math.min(19, Math.floor(cl((t - 130.3) / 2.8) * 19));
  return `${kitchen(t)}<rect width="1080" height="1920" fill="#000" opacity="${.3 * g}"/>
    ${debtGhost(t, lerp(1250, 790, g), 600 - 10 * Math.sin(t * 3), 1.15, { tally, alpha: .85, look: -10 })}
    ${personF(380, 1500, 1.15, { mouth: 'smile', aR: -40, look: -12, eyeS: .9 })}${mug(540, 900, .8, t)}`;
}
// ---- R 134.46–139.38 when will you go to sleep tonight?
function sR(t) {
  let cm = '';
  for (let i = 0; i < 3; i++) { const p = back(prog(t, 136.6 + i * .25, 136.9 + i * .25)); if (p > 0) cm += `<g transform="translate(${[250, 820, 520][i]} ${[1180, 1120, 1330][i]}) scale(${p * .9})"><path d="M -150 -70 H 150 Q 180 -70 180 -40 V 40 Q 180 70 150 70 H -60 L -110 120 L -100 70 H -150 Q -180 70 -180 40 V -40 Q -180 -70 -150 -70 Z" fill="#e9f0ff" stroke="${C.ol}" stroke-width="7"/>${[-60, 0, 60].map(x => `<circle cx="${x}" cy="0" r="16" fill="${C.ol}" opacity="${(Math.floor(t * 4) + (x + 60) / 60) % 3 === 0 ? 1 : .4}"/>`).join('')}</g>`; }
  const off = t > 138.8;
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 59)}
    <g transform="translate(540 640)">${clockArc(t, 0, 0, 330, t < 136.2 ? 21 + (t - 134.46) * 2 : 23)}</g>
    ${popT(540, 640, 220, '?', back(prog(t, 136.17, 136.45)), C.red)}${cm}
    ${off ? `<rect width="1080" height="1920" fill="#000" opacity="${.55 * prog(t, 138.8, 139.38)}"/>` : ''}`;
}
const SCENES = [[0, 3.22, sA], [3.22, 5.9, sB], [5.9, 8.48, sC], [8.48, 10.64, sD], [10.64, 18.4, sE], [18.4, 25.74, sF], [25.74, 31.76, sG], [31.76, 43.5, sH], [43.5, 59.48, sI],
  [59.48, 76.82, sJ], [76.82, 91.52, sK], [91.52, 99.56, sL], [99.56, 101.68, sM], [101.68, 110.32, sN], [110.32, 116.98, sO], [116.98, 125.78, sP], [125.78, 134.46, sQ], [134.46, 999, sR]];
function scene(t) { let f = SCENES[SCENES.length - 1][2]; for (const [a, b, fn] of SCENES) if (t >= a && t < b) { f = fn; break; } return f(t); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
