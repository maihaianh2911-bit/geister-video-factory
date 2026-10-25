// @ts-nocheck
// AUTO-GENERATED scene for v5. Change it by commenting on the issue.
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
  const sleeper = o.empty ? '' : `<g transform="translate(${hx} ${hy}) rotate(${-82 + toss}) scale(${kid})">${head({ eyes: o.eyes || 'closed', mouth: o.mouth || 'smile', lid: o.lid, look: o.look, lookY: o.lookY, brows: o.brows, mask: o.mask, cap: o.cap, phones: o.phones, buds: o.buds, bags: o.bags, hair: o.hair })}</g>`;
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

// ===== v5: "Schlafen bei eingeschaltetem Licht" =====
function wallSwitch(x, y, on, press = 0) {
  return `<g transform="translate(${x} ${y})" filter="url(#drop)"><rect x="-44" y="-64" width="88" height="128" rx="14" fill="#e9eef8" stroke="${C.ol}" stroke-width="6"/>
    <rect x="-20" y="${on ? -40 : -4}" width="40" height="44" rx="8" fill="${on ? C.warm : '#b9c3d8'}" stroke="${C.ol}" stroke-width="5"/></g>`;
}
function handPoke(x, y, s, rot = 0) { // pointing hand coming from the right
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="40" y="-34" width="420" height="80" rx="30" fill="${C.pj}" stroke="${C.ol}" stroke-width="6"/>
    <ellipse cx="30" cy="6" rx="58" ry="48" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/><rect x="-70" y="-12" width="96" height="30" rx="15" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/></g>`;
}
// ---- A 0–3.58 title: dark room, switch flips, ceiling light floods the sleeper
function sA(t) {
  const on = t < 1.95 ? 0 : t < 2.25 ? (hash(Math.floor(t * 30)) > .45 ? 1 : .2) : 1;
  const press = prog(t, 1.6, 1.9), back_ = prog(t, 2.2, 2.6);
  const hx = lerp(1180, 1010, eout(press)) + lerp(0, 200, eio(back_));
  const sq = t > 2.3 ? 'tight' : 'closed';
  const [sx, sy] = shake(t, 2.72, 8);
  let rings = '';
  for (let k = 0; k < 3; k++) { const p = prog(t, 2.72 + k * .1, 3.4 + k * .1); if (p > 0 && p < 1) rings += `<circle cx="600" cy="306" r="${60 + p * 380}" fill="none" stroke="${C.warm}" stroke-width="${9 * (1 - p)}" opacity="${.7 * (1 - p)}"/>`; }
  return `<g transform="translate(${sx} ${sy})">${roomBg(on)}${windowW(t, 90, 330, 250, 340, { id: 'aW' })}
    ${lampCeil(t, 600, 300, on)}${rings}
    ${wallSwitch(980, 760, on > .5)}
    ${nightstand(940, 1030, .8)}
    ${bedSide(t, 470, 1060, .95, { eyes: sq, mouth: t > 2.3 ? 'wavy' : 'smile', brows: t > 2.3 ? 'sad' : undefined, toss: t > 2.3 ? 6 * ring(t, 2.3, 3, 4) : 0 })}
    ${zzz(t, 260, 900, .8, 1 - prog(t, 1.9, 2.1))}
    ${press > 0 && back_ < 1 ? handPoke(hx, 790, .9, -6) : ''}</g>`;
}
// ---- B 3.58–14.6 eleven o'clock, under the blanket, light stays on, ghost scared away, phone falls
function clockFlip(t, t0) {
  const fp = eio(prog(t, t0, t0 + .3));
  const dg = (a, b, x, ch) => ch ? `<text x="${x}" y="${905 - 120 * fp}" class="d">${a}</text><text x="${x}" y="${1025 - 120 * fp}" class="d">${b}</text>` : `<text x="${x}" y="905">${a}</text>`;
  return `<g transform="translate(540 860) scale(1.9) translate(-185 -885)"><ellipse cx="185" cy="885" rx="260" ry="150" fill="url(#gRed)" opacity="${.6 + .4 * fp}"/>
    <g filter="url(#drop)"><rect x="40" y="820" width="290" height="130" rx="22" fill="#11141d" stroke="${C.ol}" stroke-width="6"/></g>
    <rect x="56" y="836" width="258" height="98" rx="10" fill="#07080c"/>
    <clipPath id="bclk"><rect x="56" y="836" width="258" height="98" rx="10"/></clipPath>
    <g clip-path="url(#bclk)" style="font-family:'Inter';font-weight:900;font-size:78px" fill="${C.red}" text-anchor="middle">
      ${dg('2', '2', 92, false)}${dg('2', '3', 140, true)}<text x="185" y="900" opacity="${Math.floor(t * 2) % 2 ? .3 : 1}">:</text>${dg('5', '0', 232, true)}${dg('9', '0', 280, true)}
    </g></g>`;
}
function sB(t) {
  if (t < 5.24) { // clock close-up
    const lift = 10 * Math.sin(t * 2);
    return `${roomBg(1)}<rect x="0" y="1100" width="1080" height="820" fill="${C.woodSh}"/><rect x="0" y="1080" width="1080" height="40" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
      ${lampCeil(t, 820, 160, 1, { swing: .5 })}
      <g transform="translate(0 ${lift * 0})">${clockFlip(t, 3.96)}</g>
      <g transform="translate(220 1080)"><rect x="-60" y="-150" width="120" height="150" rx="16" fill="#9fc2ff" opacity=".35" stroke="${C.ol}" stroke-width="6"/><rect x="-60" y="-70" width="120" height="70" rx="10" fill="#7cc8ff" opacity=".6"/></g>`;
  }
  if (t < 11.16) {
    const up = eio(prog(t, 5.3, 6.2)), drop = back(prog(t, 5.6, 6.0));
    const look = t > 7.1 && t < 8.6 ? -1 : 0;
    const flare = t > 7.28 ? Math.exp(-(t - 7.28) * 4) : 0;
    const reach = Math.sin(prog(t, 8.1, 9.0) * Math.PI);
    // ghost peeks from under the bed, gets dazzled, ducks back
    const gUp = back(prog(t, 9.2, 9.6)) * (1 - ein(prog(t, 10.35, 10.7)));
    const dazzle = t > 9.75;
    const hug = t > 9.2;
    return `${roomBg(1 + .5 * flare)}${windowW(t, 90, 330, 250, 340, { id: 'bW' })}
      ${lampCeil(t, 600, 300, 1 + flare, { swing: 1.2 })}
      ${flare > .02 ? `<circle cx="600" cy="306" r="${120 + 200 * (1 - flare)}" fill="none" stroke="${C.warm}" stroke-width="${10 * flare}"/>` : ''}
      ${wallSwitch(980, 760, 1)}
      ${nightstand(940, 1030, .8)}
      ${bedSide(t, 470, 1060, .95, { eyes: t > 9.6 ? 'happy' : 'n', lookY: look ? -12 : 0, mouth: 'smile', blanketUp: up, headDy: -40 * (1 - drop) })}
      ${gUp > 0 ? `<clipPath id="bGc"><rect x="0" y="0" width="1080" height="1250"/></clipPath><g clip-path="url(#bGc)">${ghostX(960, 1380 - 330 * gUp, .62, { t, eyes: dazzle ? 'x' : 'n', mouth: dazzle ? 'wavy' : 'grin', brows: dazzle ? 'sad' : 'mean', aL: dazzle ? 120 : 60, aR: dazzle ? -150 : -60, tilt: dazzle ? -10 : 0 })}</g>` : ''}
      ${dazzle && gUp > .3 ? raysFrom(t, 600, 340, 940, 1020, 3, 120, C.warm, .7) : ''}
      ${reach > 0 ? `<g transform="translate(${lerp(280, 520, reach)} ${lerp(980, 820, reach)})"><ellipse rx="34" ry="30" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/></g>` : ''}
      ${hug ? hand(240, 1010, .7, -60) : ''}`;
  }
  // close-up: scrolling phone, eyelids droop, phone drops
  const lid = eio(prog(t, 12.0, 13.1));
  const fall = prog(t, 13.16, 13.5);
  const px = lerp(700, 640, fall), py = lerp(620, 1160, ein(fall)), pr = lerp(-8, 70, ein(fall));
  const scroll = t < 13.1 ? (t - 11.16) * 2.4 + Math.floor((t - 11.16) * 1.3) * .6 : 4.9;
  const bonk = t > 13.5 ? Math.exp(-(t - 13.5) * 6) : 0;
  return `${roomBg(1)}
    <rect x="0" y="0" width="1080" height="1920" fill="#ffe7a8" opacity=".08"/>
    <g transform="translate(0 ${bonk * 6 * Math.sin(t * 60)})">
    <path d="M -40 760 Q 120 560 420 600 Q 700 640 760 820 Q 800 1100 560 1260 L -40 1300 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 60 760 Q 260 680 520 720" stroke="${C.pillowSh}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <g transform="translate(380 930) rotate(-12) scale(2.6)">${head({ eyes: t > 13.1 ? 'closed' : 'n', lid, lookY: -6, look: 6, mouth: t > 13.1 ? 'small' : 'flat', brows: 'calm' })}</g>
    <path d="M -40 1300 Q 300 1180 640 1220 Q 900 1200 1120 1120 L 1120 1960 L -40 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 100 1400 Q 400 1330 700 1380" stroke="${C.blankSh}" stroke-width="14" fill="none" stroke-linecap="round"/>
    </g>
    <g transform="translate(${px} ${py}) rotate(${pr})">${phoneP(t, 0, 0, 1.25, { scroll, glow: 1 })}
      ${fall < .2 ? `<ellipse cx="${-30}" cy="190" rx="64" ry="54" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/><rect x="-62" y="${140 - 40 * ((Math.floor((t - 11.16) * 1.3) % 1) + Math.max(0, Math.sin(t * 8)))}" width="34" height="70" rx="17" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/>` : ''}</g>
    ${zzz(t, 560, 760, 1, prog(t, 13.6, 14))}`;
}
// ---- C 14.6–17.58 "it's enough to close your eyes" — imagines darkness, eyes close
function closeFace(t, o = {}) {
  return `${roomBg(1)}
    <path d="M -40 760 Q 120 560 420 600 Q 700 640 760 820 Q 800 1100 560 1260 L -40 1300 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 60 760 Q 260 680 520 720" stroke="${C.pillowSh}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <g transform="translate(380 930) rotate(-12) scale(2.6)">${head(o)}</g>
    <path d="M -40 1300 Q 300 1180 640 1220 Q 900 1200 1120 1120 L 1120 1960 L -40 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 100 1400 Q 400 1330 700 1380" stroke="${C.blankSh}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
}
function sC(t) {
  const lid = eio(prog(t, 16.3, 16.75));
  const closed = t > 16.75;
  const bp = prog(t, 15.0, 15.35) * (1 - prog(t, 17.2, 17.5));
  const inner = `<rect x="-400" y="-300" width="800" height="600" fill="#0a1024"/>${stars(30, 9)}${moonF(60, -10, 70, { face: {} })}`;
  return `${closeFace(t, { eyes: closed ? 'closed' : 'n', lid, look: 6, mouth: closed ? 'smile' : 'flat', brows: 'calm' })}
    ${lampCeil(t, 820, 160, 1)}
    ${bubble(700, 440, 280, 200, bp, inner, 'cB', { tail: [[-210, 230, 18], [-260, 300, 12]] })}
    ${check(900, 640, .7, prog(t, 16.8, 17.0) * (1 - prog(t, 17.25, 17.5)))}`;
}
// ---- D 17.58–24.02 thin eyelids: light passes through, reaches the eye all night
function sD(t) {
  const close = eio(prog(t, 17.6, 18.0));
  const ray = prog(t, 19.9, 20.4);
  const through = eio(prog(t, 20.6, 21.3));
  const reach = back(prog(t, 21.86, 22.2));
  const pinch = back(prog(t, 18.9, 19.25)) * (1 - prog(t, 19.75, 19.95));
  const thinBeat = t > 19.2 ? Math.exp(-(t - 19.2) * 6) * Math.sin((t - 19.2) * 40) : 0;
  const ex = 540, ey = 960;
  const almond = `M ${ex - 330} ${ey} Q ${ex} ${ey - 270} ${ex + 330} ${ey} Q ${ex} ${ey + 230} ${ex - 330} ${ey} Z`;
  const lidY = lerp(ey - 230, ey + 115, close);
  const pupil = lerp(70, 34, reach);
  const lidOp = 1 - .55 * through;
  let lashes = '';
  for (let i = 0; i < 9; i++) { const f = i / 8, x = lerp(ex - 290, ex + 290, f), y = ey + 115 * Math.sin(f * Math.PI) * close + (1 - close) * (lidY - ey) * Math.sin(f * Math.PI); lashes += `<path d="M ${x} ${y} q ${(f - .5) * 30} 34 ${(f - .5) * 60} 50" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round"/>`; }
  const hours = 23 + 7 * eio(prog(t, 22.9, 23.95));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${C.skin}"/>
    <ellipse cx="540" cy="1500" rx="700" ry="260" fill="${C.skinSh}" opacity=".5"/>
    <path d="M 180 560 Q 540 430 900 560" stroke="${C.hair}" stroke-width="46" fill="none" stroke-linecap="round"/>
    <path d="${almond}" fill="#fff" stroke="${C.ol}" stroke-width="10"/>
    <clipPath id="dE"><path d="${almond}"/></clipPath>
    <g clip-path="url(#dE)">
      <circle cx="${ex}" cy="${ey}" r="150" fill="#4f8fd8" stroke="${C.ol}" stroke-width="8"/><circle cx="${ex}" cy="${ey}" r="105" fill="#3a6fb8"/>
      <circle cx="${ex}" cy="${ey}" r="${pupil}" fill="${C.ol}"/><circle cx="${ex + 40}" cy="${ey - 50}" r="22" fill="#fff"/>
      ${reach > 0 ? `<circle cx="${ex}" cy="${ey}" r="${190 * reach}" fill="${C.warm}" opacity="${.45 * reach}" filter="url(#blur20)"/>` : ''}
      <g opacity="${lidOp}"><rect x="${ex - 360}" y="${ey - 320}" width="720" height="${lidY - ey + 320}" fill="${through > 0 ? '#ffb48a' : C.skin}"/>
        <path d="M ${ex - 330} ${lidY - 70} Q ${ex} ${lidY - 120} ${ex + 330} ${lidY - 70}" stroke="${C.skinSh}" stroke-width="12" fill="none"/></g>
      ${through > 0 ? `<rect x="${ex - 360}" y="${ey - 320}" width="720" height="${lidY - ey + 320}" fill="#ff7a4a" opacity="${.25 * through}"/>` : ''}
      <path d="M ${ex - 360} ${lidY} Q ${ex} ${lidY + 0} ${ex + 360} ${lidY}" stroke="${C.ol}" stroke-width="10" fill="none"/>
    </g>
    <path d="${almond}" fill="none" stroke="${C.ol}" stroke-width="10"/>
    ${close > .9 ? lashes : ''}
    ${lampCeil(t, 540, 150, 1)}
    ${ray > 0 ? raysFrom(t, 540, 200, 540, lerp(220, 860, ray), 5, 360, C.warm, .9) : ''}
    ${through > 0 ? raysFrom(t, 540, 900, 540, lerp(900, 1000, through), 3, 160, '#ff9a5a', .9 * through) : ''}
    ${pinch > 0 ? `<g transform="translate(860 ${ey + 60}) scale(1.4)" opacity="${pinch}">${arrow(0, -160, 0, -26 - 10 * thinBeat, C.warm, 26, 1)}${arrow(0, 160, 0, 26 + 10 * thinBeat, C.warm, 26, 1)}<rect x="-70" y="-6" width="140" height="12" rx="6" fill="#ffb48a" stroke="${C.ol}" stroke-width="5"/></g>` : ''}
    ${t > 22.8 ? `<g transform="translate(870 300) scale(${back(prog(t, 22.8, 23.1))})">${wallClock(t, 0, 0, 100, hours)}${moonF(-120, -70, 40)}</g>` : ''}`;
}
// ---- E 24.02–28.88 every night… three things change unnoticed
function miniNight(x, y, s, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * back(p)})"><rect x="-70" y="-90" width="140" height="180" rx="18" fill="#1d2a52" stroke="${C.ol}" stroke-width="6"/>
    ${moonF(-30, -50, 18)}<path d="M -40 -90 V -60" stroke="${C.ol}" stroke-width="4"/><path d="M 10 -60 Q 30 -80 50 -60 Z" fill="#40507e" stroke="${C.ol}" stroke-width="4"/><circle cx="30" cy="-56" r="7" fill="#fff6d6"/>
    <polygon points="20,-56 40,-56 66,40 -6,40" fill="${Z.lampLit}" opacity=".25"/>
    <rect x="-56" y="30" width="112" height="26" rx="8" fill="${C.blank}" stroke="${C.ol}" stroke-width="4"/><circle cx="-40" cy="26" r="14" fill="${C.skin}" stroke="${C.ol}" stroke-width="4"/></g>`;
}
const ICONS = {
  sleep: (t) => `${moonF(0, 0, 120, { face: {} })}${zzz(t, 60, -60, 1.1, 1)}`,
  heart: (t) => heartF(0, 20, 1.8, beatAt(t, 72), { face: { eyes: 'n', mouth: 'smile' } }),
  scale: (t) => `${scaleF(0, 60, 1, .5 + .2 * Math.sin(t * 3))}`,
};
function sE(t) {
  let nights = '';
  const days = 7;
  for (let i = 0; i < days; i++) nights += miniNight(i < 6 ? 200 + (i % 3) * 340 : 540, 380 + Math.floor(i / 3) * 420, 2.0, prog(t, 24.3 + i * .14, 24.5 + i * .14) * (1 - prog(t, 25.7, 25.9)));
  const sleepY = lerp(1100, 1000, eout(prog(t, 25.7, 26.1)));
  const sneak = prog(t, 26.4, 26.9);
  const pos = [[200, 660], [540, 560], [880, 660]];
  const names = ['sleep', 'heart', 'scale'];
  let ic = '';
  const lit = [26.98, 27.24, 27.74];
  for (let i = 0; i < 3; i++) {
    if (sneak <= 0) continue;
    const L = back(prog(t, lit[i], lit[i] + .25));
    const [x, y] = pos[i];
    ic += `<g transform="translate(${x} ${y + 40 * (1 - sneak)}) scale(${.68 + .1 * L})" opacity="${cl(sneak * 1.4)}">
      ${L > 0 ? `<circle r="170" fill="${['#2a3d7a', '#5a2440', '#2d4a40'][i]}" stroke="${C.ol}" stroke-width="10"/>${ICONS[names[i]](t)}` : `<circle r="170" fill="#141a30" stroke="#2a3456" stroke-width="10" stroke-dasharray="30 20"/>${T(0, 50, 150, '?', '#3a4670', { sw: 0 })}`}</g>`;
  }
  const n3 = back(prog(t, 26.98, 27.25));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${Z.night}"/>${stars(50, 4)}
    ${nights}
    ${t > 25.7 ? `<g transform="translate(0 ${sleepY - 1000})">${lampCeil(t, 540, 760, 1)}${bedSide(t, 540, 1150, .7, { eyes: 'closed', mouth: 'smile' })}${zzz(t, 330, 1040, .7, 1)}</g>` : ''}
    ${ic}
    ${n3 > 0 ? popT(540, 300, 230, '3', n3, C.warm) : ''}`;
}
// ---- F 28.88–30.58 chapter 1: sleep
function sF(t) { return chapter(t, 28.88, 30.58, '1', ICONS.sleep(t), '#9fb6ff'); }
// ---- G 30.58–38.38 darkness → brain releases melatonin → bedtime signal
function flask(x, y, s, lv, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><clipPath id="fl${o.id || ''}"><path d="M -40 -160 L -40 -60 L -140 120 Q -150 160 -110 160 L 110 160 Q 150 160 140 120 L 40 -60 L 40 -160 Z"/></clipPath>
    <path d="M -40 -160 L -40 -60 L -140 120 Q -150 160 -110 160 L 110 160 Q 150 160 140 120 L 40 -60 L 40 -160 Z" fill="#1b2340" opacity=".9"/>
    <g clip-path="url(#fl${o.id || ''})"><rect x="-160" y="${160 - 330 * lv}" width="320" height="400" fill="${Z.mel}"/><path d="M -160 ${160 - 330 * lv} q 40 -14 80 0 t 80 0 t 80 0 t 80 0" fill="${Z.melHi}" opacity=".7" transform="translate(${-40 * ((o.t || 0) % 1)} 0)"/></g>
    <path d="M -40 -160 L -40 -60 L -140 120 Q -150 160 -110 160 L 110 160 Q 150 160 140 120 L 40 -60 L 40 -160 Z" fill="none" stroke="${C.ol}" stroke-width="8"/>
    <path d="M -60 -170 H 60" stroke="${C.ol}" stroke-width="14" stroke-linecap="round"/><path d="M -100 110 L -30 -20" stroke="#fff" stroke-width="10" opacity=".35" stroke-linecap="round"/></g>`;
}
function melStream(t, t0, t1, x0, y0, y1, n = 6) {
  let s = '';
  for (let k = 0; k < 40; k++) {
    const te = t0 + k * .22; if (te > t || te > t1) break;
    const p = (t - te) / .9; if (p >= 1) continue;
    s += melDrop(x0 + 30 * Math.sin(k * 2.1) * p, lerp(y0, y1, p * p), .9);
  }
  return s;
}
function sG(t) {
  const dark = t > 31.98 ? 1 : 0;
  const dim = eio(prog(t, 31.98, 32.3));
  const yawn = Math.sin(prog(t, 32.3, 33.0) * Math.PI);
  const cap = back(prog(t, 36.52, 36.85));
  const lv = cl((t - 33.2) / 4.5) * .75;
  const moon = back(prog(t, 36.9, 37.2));
  const fc = t > 36.6 ? { eyes: 'closed', mouth: 'smile', brows: 'calm' } : yawn > .3 ? { eyes: 'closed', mouth: 'yawn' } : t > 33.1 ? { eyes: 'n', lid: .45, mouth: 'smile', brows: 'calm' } : { eyes: 'n', mouth: 'flat', look: 10, lookY: -10 };
  return `<rect x="0" y="0" width="1080" height="1920" fill="${dark ? '#070b18' : '#1d2b4a'}"/>
    ${dark ? stars(60, 11) : `<rect width="1080" height="1920" fill="#ffe7a8" opacity=".12"/>`}
    ${lampCeil(t, 860, 140, 1 - dim)}
    ${t > 32 ? wallSwitch(140, 300, false) : wallSwitch(140, 300, true)}
    ${melStream(t, 33.14, 37.6, 540, 820, 1080)}
    ${brainF(t, 540, 560, 1.6 * (1 + .04 * yawn), { face: fc, cap: cap > 0, sy: 1 + .05 * yawn })}
    ${flask(540, 1190, 1.3, lv, { id: 'g', t })}
    ${moon > 0 ? `<g transform="translate(860 980) scale(${moon})">${moonF(0, 0, 90, { face: {} })}</g>` : ''}
    ${zzz(t, 700, 420, 1, prog(t, 36.9, 37.2))}`;
}
// ---- H 38.38–45.14 bright light → brain thinks it is day → shallow sleep, wakes easily
function sH(t) {
  if (t < 41.88) {
    const on = t > 38.55 ? 1 : 0;
    const shock = back(prog(t, 38.6, 38.85));
    const capFly = prog(t, 38.6, 39.3);
    const bp = prog(t, 39.92, 40.25);
    const sunP = back(prog(t, 41.0, 41.3));
    const lv = .75 - .5 * prog(t, 39.0, 41.8);
    const inner = `<rect x="-400" y="-300" width="800" height="600" fill="#7cc0ff"/><ellipse cx="0" cy="240" rx="420" ry="120" fill="#5fd08a"/>${sunP > 0 ? `<g transform="scale(${sunP})">${sunF(t, 0, -20, 90, { face: { eyes: 'happy', mouth: 'grin' } })}</g>` : ''}`;
    return `<rect x="0" y="0" width="1080" height="1920" fill="#1d2b4a"/><rect width="1080" height="1920" fill="#ffe7a8" opacity="${.18 * on}"/>
      ${lampCeil(t, 860, 140, on)}${wallSwitch(140, 300, !!on)}
      ${capFly > 0 && capFly < 1 ? `<g transform="translate(${540 + 500 * capFly} ${400 - 600 * capFly + 900 * capFly * capFly}) rotate(${capFly * 400})"><path d="M -100 20 Q -40 -90 60 -70 Q 120 -50 150 20 Z" fill="#6c5ad6" stroke="${C.ol}" stroke-width="7"/></g>` : ''}
      ${brainF(t, 540, 720, 1.25 * (1 + .08 * shock * Math.exp(-(t - 38.6) * 3)), { face: on ? { eyes: 'n', eyeS: 1.35, mouth: t > 41.1 ? 'grin' : 'o', brows: 'up', lookY: -8, look: 8 } : { eyes: 'closed', mouth: 'smile' }, cap: !on })}
      ${bubble(560, 290, 300, 210, bp, inner, 'hB', { tail: [[0, 320, 22], [-20, 370, 14]] })}
      ${flask(860, 1220, .7, lv, { id: 'h', t })}
      ${on ? raysFrom(t, 860, 200, 600, 560, 3, 160, C.warm, .6) : ''}`;
  }
  // depth layers: sleeper sinks a little, then pops up awake
  const sink = eio(prog(t, 42.0, 42.9));
  const up = back(prog(t, 43.66, 44.35));
  const y = lerp(lerp(470, 760, sink), 400, up);
  const awake = t > 44.4;
  const bands = ['#2a4a8a', '#1e3870', '#152a58', '#0c1a3c'];
  let b = '';
  bands.forEach((c, i) => { b += `<rect x="0" y="${400 + i * 240}" width="1080" height="240" fill="${c}"/><path d="M 0 ${400 + i * 240} q 135 -20 270 0 t 270 0 t 270 0 t 270 0" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="6"/>`; });
  return `<rect width="1080" height="1920" fill="#0a0f20"/>${b}
    <rect x="0" y="0" width="1080" height="400" fill="#203060"/>
    ${lampCeil(t, 540, 120, 1)}
    <polygon points="440,160 640,160 900,1000 180,1000" fill="${Z.lampLit}" opacity=".16"/>
    <g opacity=".3">${bedSide(t, 540, 1210, .42, { eyes: 'closed', mouth: 'smile', extra: '' })}</g>
    <path d="M 540 ${y + 80} V 1150" stroke="#cfe0ff" stroke-width="8" stroke-dasharray="20 22" opacity=".5"/>
    ${arrow(900, 560, 900, 1260, '#3d5aa8', 40, 1)}
    ${bedSide(t, 540, y, .42, { eyes: awake ? 'n' : 'closed', eyeS: 1.3, mouth: awake ? 'o' : 'smile', toss: awake ? 8 * Math.sin(t * 20) * Math.exp(-(t - 44.4) * 3) : 0 })}
    ${popT(760, y - 170, 150, '!', back(prog(t, 44.46, 44.7)), C.red)}`;
}
// ---- I 45.14–46.88 chapter 2: heart
function sI(t) { return chapter(t, 45.14, 46.88, '2', ICONS.heart(t), Z.heart); }
// ---- J 46.88–57.02 study 2022, researchers, volunteers, moderate room light
function sJ(t) {
  if (t < 52.7) {
    const cal = back(prog(t, 47.2, 47.5));
    const bld = back(prog(t, 49.9, 50.3));
    const sciL = eout(prog(t, 48.3, 48.9)), sciR = eout(prog(t, 49.4, 50.0));
    return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(50, 14)}
      ${cal > 0 ? `<g transform="translate(540 380) scale(${cal}) rotate(${-6 + 6 * cal})"><rect x="-230" y="-150" width="460" height="300" rx="24" fill="#e9eef8" stroke="${C.ol}" stroke-width="9"/><rect x="-230" y="-150" width="460" height="80" rx="24" fill="${C.red}" stroke="${C.ol}" stroke-width="9"/>
        <circle cx="-140" cy="-150" r="16" fill="${C.ol}"/><circle cx="140" cy="-150" r="16" fill="${C.ol}"/>${T(0, 100, 160, '2022', C.ol, { sw: 0 })}</g>` : ''}
      ${bld > 0 ? `<g transform="translate(540 1010) scale(${bld})">${building(0, 0, 1, { lit: 1 })}</g>` : ''}
      ${scientist(lerp(-200, 190, sciL), 1380, .62, { aR: -40 - 30 * Math.max(0, Math.sin(t * 3)) * prog(t, 50.5, 50.8), look: 8, lean: 3 * Math.sin(t * 2.2) })}
      ${scientist(lerp(1300, 890, sciR), 1380, .62, { board: 1, look: -8, aL: 40, lean: -3 * Math.sin(t * 2.5), headDy: 6 * Math.sin(t * 3) })}`;
  }
  const beds = [430, 780, 1130];
  const dimP = eio(prog(t, 54.5, 55.4));
  let s = `<rect width="1080" height="1920" fill="#1d2b4a"/><rect width="1080" height="1920" fill="#ffe7a8" opacity="${.08 * dimP}"/>`;
  beds.forEach((y, i) => {
    const inP = back(prog(t, 53.1 + i * .15, 53.4 + i * .15));
    s += `<rect x="40" y="${y - 260}" width="700" height="330" rx="20" fill="#18233f" stroke="#2a3a66" stroke-width="5"/>`;
    s += lampCeil(t, 400, y - 210, .55 * dimP);
    s += bedSide(t, 400, y + 10, .62, { empty: inP <= 0, eyes: 'closed', mouth: 'smile', hair: [C.hair, '#c98a3a', '#2a1b16'][i], headDy: -30 * (1 - inP) });
  });
  const knob = lerp(-90, 0, dimP);
  return s + `<g transform="translate(900 480)" filter="url(#drop)"><rect x="-60" y="-140" width="120" height="280" rx="18" fill="#e9eef8" stroke="${C.ol}" stroke-width="7"/><rect x="-10" y="-110" width="20" height="220" rx="10" fill="#9aa4bb"/>
    <rect x="-44" y="${-knob - 20}" width="88" height="40" rx="12" fill="${C.warm}" stroke="${C.ol}" stroke-width="6"/></g>
    ${scientist(900, 1360, .55, { board: 1, look: -10 + 8 * Math.sin(t * 1.5), aL: 30, lean: 3 * Math.sin(t * 2) })}`;
}
// ---- K 57.02–60.54 heart beats faster although asleep
function sK(t) {
  const bpm = lerp(56, 84, eio(prog(t, 58.4, 59.2)));
  const bt = beatAt(t, bpm);
  const up = back(prog(t, 58.72, 59.0));
  return `<rect width="1080" height="1920" fill="#1d2b4a"/><rect width="1080" height="1920" fill="#ffe7a8" opacity=".07"/>
    ${lampCeil(t, 540, 120, .55)}
    ${bedSide(t, 540, 880, .9, { eyes: 'closed', mouth: 'smile' })}
    ${zzz(t, 340, 740, .9, prog(t, 59.2, 59.6))}
    ${heartF(620, 560, 1.15, bt, { face: { eyes: t > 58.7 ? 'n' : 'closed', eyeS: 1.2, mouth: t > 58.7 ? 'o' : 'smile', brows: t > 58.7 ? 'up' : 'calm' } })}
    ${up > 0 ? arrow(800, 640, 800, 420, C.red, 44, up) : ''}
    <g transform="translate(0 0)"><rect x="80" y="1110" width="920" height="260" rx="26" fill="#0b1226" stroke="${C.ol}" stroke-width="8"/>
      <path d="M 100 1240 H 980" stroke="#1d3a2e" stroke-width="3"/>${ecg(t, 110, 1270, 860, 110, bpm)}</g>`;
}
// ---- L 60.54–66.18 next morning: sugar handled worse → insulin resistance
function cellF(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="240" fill="#6fd0a0" opacity=".25" filter="url(#blur20)"/>
    <circle r="220" fill="#7fdcae" stroke="${C.ol}" stroke-width="9"/><circle cx="-60" cy="-80" r="40" fill="#5bbf8f"/><circle cx="90" cy="60" r="26" fill="#5bbf8f"/>
    <g transform="translate(-30 30) scale(1.2)">${face(o.face || {})}</g>
    <g transform="translate(-220 0)"><rect x="-40" y="-70" width="80" height="140" rx="16" fill="#c99a62" stroke="${C.ol}" stroke-width="7"/><circle cx="0" cy="-8" r="14" fill="${C.ol}"/><rect x="-5" y="0" width="10" height="26" fill="${C.ol}"/></g></g>`;
}
function sL(t) {
  if (t < 61.42) {
    const wake = t > 60.95;
    return `${roomBg(.3)}${windowW(t, 380, 260, 320, 400, { id: 'lW', day: 1 })}
      ${bedSide(t, 540, 1080, 1, { eyes: wake ? 'n' : 'closed', lid: .5, mouth: wake ? 'yawn' : 'smile', bags: 1 })}`;
  }
  const n = Math.min(7, Math.max(0, Math.floor((t - 62.3) / .25) + 1));
  let cubes = '';
  for (let i = 0; i < n; i++) { const p = eout(prog(t, 62.3 + i * .25, 62.7 + i * .25)); cubes += sugarCube(lerp(-80, 120 + (i % 3) * 80, p), 1210 - Math.floor(i / 3) * 66 - 40 * Math.sin(p * Math.PI), 1.1, (i * 23) % 40 - 20); }
  const kIn = eout(prog(t, 62.7, 63.1));
  const jig = t > 63.1 && t < 64.0 ? 10 * Math.sin(t * 40) : 0;
  const bounce = prog(t, 64.0, 64.4);
  const kx = lerp(-200, 260, kIn) - 160 * Math.sin(bounce * Math.PI) * (bounce < 1 ? 1 : 0) - (t > 64.4 ? 90 : 0);
  const kr = jig + (t > 64.0 ? -30 * bounce : 0);
  const xP = prog(t, 64.64, 64.95);
  return `<rect width="1080" height="1920" fill="#3a1424"/><path d="M 0 1110 Q 540 1060 1080 1110 L 1080 1300 Q 540 1340 0 1300 Z" fill="#7a2638" stroke="${C.ol}" stroke-width="7"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${((i * 210 + t * 120) % 1260) - 90}" cy="${1200 + 30 * Math.sin(i)}" r="22" fill="#d84a5c" stroke="${C.ol}" stroke-width="5"/>`).join('')}
    ${cellF(640, 620, 1.15, { face: t > 64.0 ? { eyes: 'tight', mouth: 'wavy', brows: 'sad' } : { eyes: 'n', mouth: 'smile', look: -12 } })}
    ${keyF(kx, 640, 1.4, kr)}
    ${cubes}
    ${bigX(388, 640, .5, xP)}`;
}
// ---- M 66.18–68.56 chapter 3: weight
function sM(t) { return chapter(t, 66.18, 68.56, '3', `<g transform="scale(1.5)">${scaleF(0, 0, 1, .5 + .25 * Math.sin(t * 4))}</g>`, '#7fdcae'); }
// ---- N 68.56–74.1 43.000 women, ~6 years
function sN(t) {
  let g = '';
  const cols = 9, rows = 6;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, t0 = 69.2 + i * .035;
    const p = back(prog(t, t0, t0 + .25)); if (p <= 0) continue;
    g += tiny(80 + c * 115, 560 + r * 150, .62 * p, { dress: 1, long: 1, col: [C.red, '#f2b544', '#9b7cf0', C.pj, '#ff8f5a'][(i * 7) % 5], hair: ['#3b2720', '#c98a3a', '#2a1b16', '#8a4a2a'][(i * 3) % 4] });
  }
  const cnt = 43000 * eio(prog(t, 69.6, 71.2));
  const cp = back(prog(t, 69.6, 69.9));
  let yrs = '';
  for (let i = 0; i < 6; i++) { const p = back(prog(t, 72.7 + i * .12, 72.95 + i * .12)); if (p > 0) yrs += `<g transform="translate(${140 + i * 160} 1330) scale(${p})"><rect x="-62" y="-56" width="124" height="112" rx="14" fill="#e9eef8" stroke="${C.ol}" stroke-width="6"/><rect x="-62" y="-56" width="124" height="32" rx="14" fill="${C.red}" stroke="${C.ol}" stroke-width="6"/>${T(0, 42, 60, String(i + 1), C.ol, { sw: 0 })}</g>`; }
  return `<rect width="1080" height="1920" fill="${Z.night}"/>${stars(40, 17)}
    ${cp > 0 ? popT(540, 330, 190, fmt(cnt), cp, C.warm) : ''}${g}${yrs}`;
}
// ---- O 74.1–87.36 light/TV on vs dark: +17 % risk of gaining ≥5 kg
function halfRoom(t, x0, lit, tv, id, o = {}) {
  return `<clipPath id="${id}"><rect x="${x0}" y="180" width="540" height="760"/></clipPath><g clip-path="url(#${id})">
    <rect x="${x0}" y="180" width="540" height="760" fill="${lit ? '#3a4a72' : '#0d1428'}"/>
    ${lit ? `<rect x="${x0}" y="180" width="540" height="760" fill="#ffe7a8" opacity=".12"/>` : stars(14, id.length + 3).replace(/cy="(\d+\.?\d*)"/g, (m, v) => `cy="${180 + (+v) * .35}"`).replace(/cx="(\d+\.?\d*)"/g, (m, v) => `cx="${x0 + (+v) * .5}"`)}
    ${lit ? lampCeil(t, x0 + 200, 260, 1) : `<g>${moonF(x0 + 420, 300, 46, { face: {} })}</g>`}
    ${tv ? tvSet(t, x0 + 420, 560, .45, 1) : ''}
    ${bedSide(t, x0 + 260, 800, .5, { eyes: lit ? 'tight' : 'closed', mouth: lit ? 'wavy' : 'smile', hair: '#8a4a2a', toss: lit ? 4 * Math.sin(t * 3) : 0 })}
    ${!lit ? zzz(t, x0 + 140, 700, .7, 1) : ''}
    ${o.extra || ''}</g>
    <rect x="${x0 + 6}" y="186" width="528" height="748" fill="none" stroke="${C.ol}" stroke-width="12"/>`;
}
function sO(t) {
  if (t >= 82.46 && t < 85.0) {
    const step = eout(prog(t, 82.5, 82.9));
    const val = lerp(.2, .8, back(prog(t, 83.0, 83.5)));
    const kg = back(prog(t, 83.3, 83.6));
    const wide = 1 + .14 * back(prog(t, 83.98, 84.4));
    return `${roomBg(.4)}
      ${scaleF(540, 1300, 1.3, val)}
      ${personF(540, lerp(1000, 1270, step), .95, { sx: wide, mouth: kg > 0 ? 'o' : 'flat', brow: kg, lookY: 10, aL: 30 * kg, aR: -30 * kg })}
      ${kg > 0 ? popT(540, 260, 170, '+5 kg', kg, C.red, -4) : ''}`;
  }
  const on = t > 76.28 ? 1 : 0, tv = t > 77.42 ? 1 : 0;
  const bars = prog(t, 79.36, 79.8);
  const hL = lerp(0, 330, eio(prog(t, 79.6, 80.3))), hR = lerp(0, 280, eio(prog(t, 79.6, 80.1)));
  const pc = back(prog(t, 80.15, 80.45));
  const ok = prog(t, 86.36, 86.6);
  return `<rect width="1080" height="1920" fill="${Z.night}"/>
    ${halfRoom(t, 0, on, tv, 'oL')}${halfRoom(t, 540, 0, 0, 'oR')}
    ${bars > 0 ? `<g opacity="${bars}"><rect x="40" y="1380" width="1000" height="10" fill="#33405e"/>
      <rect x="150" y="${1380 - hL}" width="240" height="${hL}" rx="12" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/>
      <rect x="690" y="${1380 - hR}" width="240" height="${hR}" rx="12" fill="#5d76c8" stroke="${C.ol}" stroke-width="7"/></g>` : ''}
    ${pc > 0 ? popT(270, 1000, 120, '+17 %', pc, C.warm) : ''}
    ${check(810, 620, .9, ok)}`;
}
// ---- P 87.36–99.6 kids: deep sleep = growth hormones; bright light → restless
function sP(t) {
  const on = t > 94.75 ? 1 : 0;
  const restless = prog(t, 95.4, 95.6);
  const toss = restless > 0 ? 14 * Math.sin(t * 5) : 0;
  const growLv = lerp(0, 1, eio(prog(t, 91.6, 93.2))) - .6 * eio(prog(t, 97.6, 98.4));
  let spark = '';
  if (t > 91.3) for (let k = 0; k < 14; k++) { const te = 91.3 + k * .2; if (te > t || (on && te > 95.0)) continue; const p = (t - te) / 1.4; if (p >= 1) continue; spark += `<g transform="translate(${lerp(300, 930, p)} ${lerp(960, 800 - 300 * growLv, p) - 120 * Math.sin(p * Math.PI)}) rotate(${p * 300}) scale(${1 - p * .4})"><path d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z" fill="${C.warm}" stroke="${C.ol}" stroke-width="3"/></g>`; }
  let ticks = '';
  for (let i = 0; i <= 10; i++) ticks += `<line x1="905" y1="${1000 - i * 60}" x2="${i % 5 ? 935 : 955}" y2="${1000 - i * 60}" stroke="${C.ol}" stroke-width="5"/>`;
  const my = 800 - 300 * growLv;
  const bad = back(prog(t, 98.2, 98.5));
  return `${roomBg(on)}${windowW(t, 380, 230, 260, 330, { id: 'pW' })}
    ${lampCeil(t, 200, 220, on)}
    <rect x="890" y="380" width="90" height="640" rx="10" fill="#f2efe6" stroke="${C.ol}" stroke-width="7"/>${ticks}
    <g transform="translate(880 ${my}) scale(2)"><path d="M 0 0 L -40 -24 L -40 24 Z" fill="${bad > 0 ? C.red : Z.green}" stroke="${C.ol}" stroke-width="5"/></g>
    ${bedSide(t, 450, 1080, .9, { kid: 1, eyes: on ? 'tight' : 'closed', mouth: on ? 'wavy' : 'smile', brows: on ? 'sad' : undefined, toss, blanketUp: restless > 0 ? .75 + .25 * Math.sin(t * 4) : 1, hair: '#c98a3a' })}
    ${!on ? zzz(t, 260, 900, 1, 1) : ''}
    ${spark}
    ${bad > 0 ? arrow(800, 520, 800, 760, C.red, 36, bad) : ''}`;
}
// ---- Q 99.6–104.92 what if you or your child need some light?
function sQ(t) {
  const peek = eout(prog(t, 99.7, 100.2));
  const eyesGlow = prog(t, 100.8, 101.1);
  const q = back(prog(t, 103.86, 104.15));
  const lookAt = t > 101 ? 14 : 0;
  return `${roomBg(0)}
    <rect x="720" y="420" width="300" height="820" fill="#141c32" stroke="${C.ol}" stroke-width="7"/><rect x="720" y="420" width="${lerp(300, 220, eout(prog(t, 100.6, 101.0)))}" height="820" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="7"/>
    ${eyesGlow > 0 ? `<g opacity="${eyesGlow * (.7 + .3 * Math.sin(t * 6))}"><ellipse cx="975" cy="700" rx="14" ry="20" fill="${C.glow}"/><ellipse cx="1005" cy="700" rx="14" ry="20" fill="${C.glow}"/></g>` : ''}
    ${bedSide(t, 380, 1080, .85, { kid: 1, eyes: 'n', eyeS: 1.3, look: lookAt, mouth: 'small', brows: 'up', blanketUp: 1, headDy: 30 * (1 - peek), hair: '#c98a3a', toss: 2 * Math.sin(t * 30) * (t > 101 ? 1 : 0) })}
    ${hand(180, 1000, .6, -60)}
    ${q > 0 ? popT(540, 400, 260, '?', q, C.warm) : ''}`;
}
// ---- R 104.92–115.66 tip 1: dim orange night light, low on the floor, not at the face
function sR(t) {
  const ceilOn = t < 106.7 ? 1 : 0;
  const xP = prog(t, 106.24, 106.6) * (1 - prog(t, 106.9, 107.1));
  const nlIn = back(prog(t, 107.4, 107.75));
  const col = t < 108.66 ? '#fff3d0' : t < 109.32 ? '#ffd23a' : Z.orange;
  const drop = ein(prog(t, 112.4, 112.9));
  const nx = lerp(320, 110, drop), ny = lerp(720, 1240, drop);
  const rot = t < 113.6 ? lerp(0, 38, eout(prog(t, 113.0, 113.6))) : lerp(38, -40, eio(prog(t, 114.3, 114.9)));
  const bad = prog(t, 114.0, 114.25) * (1 - prog(t, 114.6, 114.8));
  const good = prog(t, 115.0, 115.3);
  const squint = rot > 20;
  return `${roomBg(ceilOn * .8)}${windowW(t, 640, 300, 240, 320, { id: 'rW' })}
    ${lampCeil(t, 540, 260, ceilOn)}
    ${bigX(540, 260, .7, xP)}
    ${bedSide(t, 620, 1060, .9, { eyes: squint ? 'tight' : 'closed', mouth: squint ? 'wavy' : 'smile' })}
    ${nlIn > 0 ? `<g transform="translate(${nx} ${ny}) scale(${nlIn})">${nightLight(t, 0, 0, 1.7, t > 107.6 ? .55 : 0, { col, rot })}</g>` : ''}
    ${drop > 0 && drop < 1 ? arrow(160, 700, 160, 1000, C.warm, 30, 1) : ''}
    ${cross(500, 700, .9, bad)}${check(500, 700, .9, good)}
    ${badge(150, 250, .9, '1', prog(t, 104.95, 105.3))}`;
}
// ---- S 115.66–122.34 tip 2: TV with sleep timer
function sS(t) {
  const sleepy = eio(prog(t, 117.6, 118.3));
  const tm = back(prog(t, 119.5, 119.8));
  const sweep = prog(t, 119.8, 120.9);
  const off = prog(t, 120.92, 121.3);
  const lit = 1 - off;
  return `${roomBg(0)}<rect width="1080" height="1920" fill="${Z.screen}" opacity="${.07 * lit}"/>
    <rect x="560" y="700" width="460" height="300" rx="10" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/><rect x="560" y="700" width="460" height="24" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    ${tvSet(t, 790, 560, .95, 1, { offP: off })}
    ${raysFrom(t, 700, 600, 300, 900, 2, 80, Z.screen, .35 * lit)}
    ${bedSide(t, 330, 1110, .75, { eyes: sleepy > .9 ? 'closed' : 'n', lid: sleepy, mouth: 'smile', look: 12 })}
    ${tm > 0 ? `<g transform="translate(870 300) scale(${tm})"><circle r="110" fill="#e9eef8" stroke="${C.ol}" stroke-width="9"/><rect x="-20" y="-140" width="40" height="34" rx="6" fill="#9aa4bb" stroke="${C.ol}" stroke-width="6"/>
      <path d="M 0 0 L 0 -90 A 90 90 0 ${sweep < .5 ? 1 : 0} 1 ${90 * Math.sin((1 - sweep) * 2 * Math.PI) * -1} ${-90 * Math.cos((1 - sweep) * 2 * Math.PI)} Z" fill="${sweep < 1 ? C.red : 'none'}" opacity=".85" transform="scale(-1 1)"/>
      <circle r="10" fill="${C.ol}"/></g>` : ''}
    ${zzz(t, 160, 950, .9, off)}
    ${badge(150, 250, .9, '2', prog(t, 115.7, 116.05))}`;
}
// ---- T 122.34–128.58 tip 3: close curtains or wear a sleep mask
function sT(t) {
  if (t < 124.6) {
    const close = eio(prog(t, 123.5, 124.1));
    return `${roomBg(0)}${windowW(t, 330, 260, 420, 520, { id: 'tW', street: 1, close })}
      <polygon points="380,780 700,780 900,1200 160,1200" fill="#ffe28a" opacity="${.18 * (1 - close)}"/>
      ${bedSide(t, 540, 1100, .9, { eyes: close > .8 ? 'closed' : 'tight', mouth: close > .8 ? 'smile' : 'wavy' })}
      ${badge(150, 250, .9, '3', prog(t, 122.4, 122.75))}`;
  }
  const mask = eio(prog(t, 125.0, 125.5));
  const sweep = prog(t, 126.3, 127.8);
  const bx = lerp(-300, 1300, sweep);
  return `${closeFace(t, { eyes: mask > .5 ? 'closed' : 'n', mask, mouth: 'smile', brows: 'calm' })}
    ${sweep > 0 && sweep < 1 ? `<polygon points="${bx - 120},0 ${bx + 120},0 ${bx + 260},1300 ${bx - 20},1300" fill="#ffe28a" opacity=".22"/>` : ''}
    ${zzz(t, 560, 720, 1, prog(t, 126.6, 127))}`;
}
// ---- U 128.58–143.9 compare your sleeping pulse on the watch
function sleepGraph(t, p) {
  let d = '';
  const v = [0, 1, 2, 3, 2, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0];
  for (let i = 0; i < v.length; i++) { const x = -90 + i * 13; if (i / (v.length - 1) > p) break; d += `<rect x="${x}" y="${-60 + v[i] * 26}" width="12" height="${30}" rx="4" fill="${['#9fc2ff', '#6f8fe8', '#5a4fd0', '#3b2fa0'][v[i]]}"/>`; }
  return d;
}
function sU(t) {
  if (t < 133.4 || t >= 140.14) {
    const late = t >= 140.14;
    const scr = back(prog(t, 129.0, 129.3));
    const gp = prog(t, 130.3, 131.3);
    const tap = prog(t, 131.6, 132.2);
    const roll = prog(t, 140.3, 141.8);
    const dig = late ? (roll < 1 ? String(50 + Math.floor(hash(Math.floor(t * 14)) * 40)) : '58') : '';
    const ok = back(prog(t, 142.46, 142.75));
    const content = late ? `${heartF(-50, -40, .32, beatAt(t, 58))}${T(26, 68, 92, dig, '#fff', { sw: 0 })}`
      : scr > 0 ? `<g transform="scale(${scr})">${heartF(-60, -60, .26, beatAt(t, 60))}${sleepGraph(t, gp)}</g>` : '';
    return `<rect width="1080" height="1920" fill="#0d1428"/>${stars(30, 21)}
      ${watchF(t, 560, 780, 1.6, { rot: -8, content })}
      ${tap > 0 && tap < 1 ? `<circle cx="560" cy="780" r="${60 + 200 * tap}" fill="none" stroke="#fff" stroke-width="${10 * (1 - tap)}"/>` : ''}
      ${tap > 0 && tap < .6 ? `<g transform="translate(${lerp(760, 620, eout(tap * 2))} ${lerp(1100, 840, eout(tap * 2))}) rotate(-35)"><rect x="-26" y="-10" width="52" height="170" rx="26" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/></g>` : ''}
      ${check(860, 470, .8, ok)}`;
  }
  const lit = t > 136.36 ? 1 : 0;
  const dk = back(prog(t, 139.36, 139.6));
  const panel = (y, isLit, bpm, show, id, arr) => `<g><rect x="50" y="${y}" width="980" height="480" rx="30" fill="${isLit ? '#3a4a72' : '#0b1226'}" stroke="${C.ol}" stroke-width="9"/>
    ${isLit ? `<rect x="50" y="${y}" width="980" height="480" rx="30" fill="#ffe7a8" opacity=".12"/>${lampCeil(t, 300, y + 90, 1)}` : moonF(200, y + 110, 50, { face: {} })}
    <clipPath id="${id}"><rect x="50" y="${y}" width="980" height="480" rx="30"/></clipPath><g clip-path="url(#${id})">${bedSide(t, 300, y + 340, .48, { eyes: 'closed', mouth: 'smile' })}</g>
    ${show ? `<g transform="translate(790 ${y + 230})"><circle r="150" fill="#05070d" stroke="#2b2f3d" stroke-width="22"/>${heartF(0, -20, .75, beatAt(t, bpm))}${ecg(t, -120, 90, 240, 30, bpm, { sw: 6, speed: 160 })}</g>${arr}` : ''}</g>`;
  const a1 = back(prog(t, 137.0, 137.3)), a2 = back(prog(t, 139.6, 139.9));
  return `<rect width="1080" height="1920" fill="#0d1428"/>
    ${panel(200, lit, 78, t > 134.0, 'uA', a1 > 0 ? arrow(970, 560, 970, 340, C.red, 34, a1) : '')}
    ${panel(760, 0, 56, dk > 0, 'uB', a2 > 0 ? arrow(970, 880, 970, 1100, Z.green, 34, a2) : '')}`;
}
// ---- V 143.9–149.34 someone at home who can only sleep with the light on?
function sV(t) {
  if (t < 146.5) {
    const one = t > 145.04 ? 1 : 0;
    let w = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
      const lit = r === 2 && c === 1 && one;
      w += `<rect x="${250 + c * 210}" y="${470 + r * 220}" width="160" height="160" rx="10" fill="${lit ? C.warm : '#141c32'}" stroke="${C.ol}" stroke-width="7"/>${lit ? `<rect x="${200 + c * 210}" y="${420 + r * 220}" width="260" height="260" fill="${C.warm}" opacity=".2" filter="url(#blur20)"/>` : ''}<path d="M ${330 + c * 210} ${470 + r * 220} V ${630 + r * 220}" stroke="${C.ol}" stroke-width="5"/>`;
    }
    return `<rect width="1080" height="1920" fill="#0a1024"/>${stars(60, 23)}${moonF(880, 230, 60)}
      <rect x="190" y="400" width="700" height="980" fill="#2a3557" stroke="${C.ol}" stroke-width="9"/><polygon points="160,410 540,230 920,410" fill="#3a2a40" stroke="${C.ol}" stroke-width="9"/>${w}
      <rect x="0" y="1370" width="1080" height="600" fill="#141a2e"/>`;
  }
  return `${roomBg(1)}${lampCeil(t, 540, 300, 1)}
    ${bedSide(t, 540, 1080, 1, { eyes: 'closed', mouth: 'smile', hair: '#2a1b16' })}${zzz(t, 320, 920, 1, 1)}
    <rect x="-20" y="-20" width="1120" height="1960" fill="none" stroke="#2a3557" stroke-width="140"/><rect x="50" y="50" width="980" height="1300" fill="none" stroke="${C.ol}" stroke-width="10"/>`;
}
// ---- W 149.34–152.48 send this video to that person; light goes out
function sW(t) {
  if (t < 151.2) {
    const tap = prog(t, 149.5, 149.8);
    const fly = prog(t, 150.0, 151.1);
    const content = `<rect x="-66" y="-140" width="132" height="280" fill="#20345e"/><circle cx="0" cy="-40" r="44" fill="#ffd27a"/><circle cx="0" cy="-40" r="20" fill="${C.ol}" opacity=".3"/><rect x="-46" y="70" width="92" height="40" rx="20" fill="${tap > 0 ? Z.green : '#5d76c8'}" stroke="${C.ol}" stroke-width="4"/>`;
    return `<rect width="1080" height="1920" fill="#0d1428"/>${stars(30, 25)}
      ${phoneP(t, 540, 860, 2.4, { content, glow: 1, id: 'w' })}
      ${tap < 1 ? `<g transform="translate(${lerp(760, 560, eout(tap))} ${lerp(1360, 1180, eout(tap))}) rotate(-25)"><rect x="-30" y="-10" width="60" height="200" rx="30" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/></g>` : ''}
      ${tap >= 1 ? `<circle cx="540" cy="1080" r="${40 + 160 * cl((t - 149.8) / .4)}" fill="none" stroke="#fff" stroke-width="${8 * (1 - cl((t - 149.8) / .4))}"/>` : ''}
      ${fly > 0 ? sendPlane(lerp(540, 980, eio(fly)), lerp(1060, 180, eio(fly)) - 160 * Math.sin(fly * Math.PI), 1.6, -20) : ''}`;
  }
  const off = t > 151.7;
  return `${roomBg(off ? 0 : 1)}${windowW(t, 90, 330, 250, 340, { id: 'wW' })}${lampCeil(t, 600, 300, off ? 0 : 1)}
    ${bedSide(t, 470, 1060, .95, { eyes: 'closed', mouth: 'smile' })}
    ${sendPlane(lerp(1100, 960, eout(prog(t, 151.2, 151.6))), 760, 1, -10)}
    ${off ? zzz(t, 260, 900, .8, 1) : ''}`;
}
const SCENES = [[0, 3.58, sA], [3.58, 14.6, sB], [14.6, 17.58, sC], [17.58, 24.02, sD], [24.02, 28.88, sE], [28.88, 30.58, sF], [30.58, 38.38, sG], [38.38, 45.14, sH], [45.14, 46.88, sI],
  [46.88, 57.02, sJ], [57.02, 60.54, sK], [60.54, 66.18, sL], [66.18, 68.56, sM], [68.56, 74.1, sN], [74.1, 87.36, sO], [87.36, 99.6, sP], [99.6, 104.92, sQ], [104.92, 115.66, sR],
  [115.66, 122.34, sS], [122.34, 128.58, sT], [128.58, 143.9, sU], [143.9, 149.34, sV], [149.34, 999, sW]];
function scene(t) { let f = SCENES[SCENES.length - 1][2]; for (const [a, b, fn] of SCENES) if (t >= a && t < b) { f = fn; break; } return f(t); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
