// v63 "Himmelsscheibe von Nebra" — archive-documentary kit for this video only (style: jobs/v63/style.md).
// No real faces: silhouettes, hands, objects. Disc drawn from the owner's description only.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  paper: '#EADBC0', paperD: '#D9C6A3', paperL: '#F4EAD6', ink: '#3B2F2A', inkL: '#5A4A40', red: '#B23A2E', olive: '#6B7B4B', oliveD: '#4B5A35', brown: '#8A6E52', brownD: '#6A523C',
  pat: '#4E8C7A', patD: '#2F6656', patL: '#76B09C', gold: '#E2B34A', goldD: '#B8862B', goldL: '#F6D98A',
  night: '#1E2826', night2: '#2B3833', soil: '#5B4532', soilD: '#3E2E21', skin: '#D9A77F', skinD: '#B98863', suit: '#3A3F48', pull: '#7A5A44', towel: '#E9E4D6',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const HL = (s, x, y, sz, f = K.paperL, sw = 14, a = 'middle', st = K.ink) => TX(s, x, y, sz, f, a, `stroke="${st}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke"`);
export const BG = (c = K.paper) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(s * 1000) / 1000}) translate(${-cx} ${-cy})">${inner}</g>`;
export function shk(t, t0, a, d = 6) { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; }

export const DEFS = `<defs>
<radialGradient id="nGold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE7A0" stop-opacity=".9"/><stop offset=".5" stop-color="#E2B34A" stop-opacity=".35"/><stop offset="1" stop-color="#E2B34A" stop-opacity="0"/></radialGradient>
<radialGradient id="nLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C9" stop-opacity=".85"/><stop offset=".55" stop-color="#F3D58E" stop-opacity=".3"/><stop offset="1" stop-color="#F3D58E" stop-opacity="0"/></radialGradient>
<radialGradient id="nTorch" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF4D2" stop-opacity=".7"/><stop offset="1" stop-color="#FFF4D2" stop-opacity="0"/></radialGradient>
<radialGradient id="nVig" cx=".5" cy=".46" r=".72"><stop offset=".6" stop-color="#2A1F18" stop-opacity="0"/><stop offset="1" stop-color="#2A1F18" stop-opacity=".55"/></radialGradient>
<linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121A1A"/><stop offset="1" stop-color="#34433A"/></linearGradient>
<linearGradient id="nDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E3A44"/><stop offset=".7" stop-color="#C98B5B"/><stop offset="1" stop-color="#E9B87A"/></linearGradient>
<radialGradient id="nPat" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#6FA894"/><stop offset=".7" stop-color="#4E8C7A"/><stop offset="1" stop-color="#36705F"/></radialGradient>
</defs>`;
// paper grain (deterministic, frame-stable with slight flicker) + edge darkening
export function grain(t, a = 1) {
  let d = '';
  const k = Math.floor(t * 12);
  for (let i = 0; i < 70; i++) { const x = hash(i * 7.3 + k * .13) * 1080, y = hash(i * 3.1 + k * .71) * 1920; d += `M ${f1(x)} ${f1(y)} h 3`; }
  return `<path d="${d}" stroke="${K.ink}" stroke-width="3" opacity="${.18 * a}"/><rect x="-60" y="-60" width="1200" height="2040" fill="url(#nVig)" opacity="${a}"/>`;
}
// paper card with stamped text
export function card(x, y, txt, sz, a = 1, o = {}) {
  if (a <= .01) return '';
  const w = o.w || txt.length * sz * .66 + 80, h = sz * 1.55;
  const rot = o.rot ?? -2;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${f1(o.sc ?? 1)})" opacity="${cl(a)}">
    <rect x="${-w / 2 + 8}" y="${-h / 2 + 10}" width="${w}" height="${h}" fill="${K.ink}" opacity=".25"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${o.bg || K.paperL}" ${OL(5)}/>
    ${TX(txt, 0, sz * .36, sz, o.col || K.ink)}</g>`;
}
// red rubber stamp
export function stamp(x, y, txt, sz, p, rot = -8) {
  if (p <= 0) return '';
  const s = lerp(1.6, 1, eout(cl(p * 1.4))), a = cl(p * 3);
  const w = txt.length * sz * .66 + 60, h = sz * 1.5;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${f1(s)})" opacity="${f1(a * .92)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="none" stroke="${K.red}" stroke-width="9"/>
    <rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="6" fill="none" stroke="${K.red}" stroke-width="3"/>
    ${TX(txt, 0, sz * .36, sz, K.red)}</g>`;
}

// ---------------- the disc ----------------
// stars: 30 dots = cluster of 7 + 23 scattered (deterministic)
const CL7 = [[0, -50], [9, -55], [-8, -57], [4, -61], [14, -48], [-4, -45], [8, -42]];
const ST = (() => { const out = []; let i = 0; while (out.length < 23 && i < 400) { i++; const a = hash(i * 1.7) * Math.PI * 2, r = Math.sqrt(hash(i * 2.9 + .3)) * 72; const x = Math.cos(a) * r, y = Math.sin(a) * r;
  if (Math.hypot(x + 34, y + 2) < 34 || Math.hypot(x - 36, y + 26) < 33 || Math.hypot(x - 4, y + 51) < 20 || Math.hypot(x, y - 66) < 18 || x > 66) continue;
  if (out.some(([u, v]) => Math.hypot(u - x, v - y) < 14)) continue; out.push([x, y]); } return out; })();
export const DISC = { cluster: CL7, stars: ST, sun: [-34, -2, 23], moon: [36, -26] };
// disc centred at (x,y), radius r (local radius 100). o: glow 0..1, sun/moon/stars/arcs/cluster highlight 0..1, damage bool, rot, dirt 0..1 (soil cover), alpha
export function disc(x, y, r, o = {}) {
  const s = r / 100, id = o.id || 'd';
  const hi = (v, base) => v ? `<circle r="${base}" fill="url(#nGold)" opacity="${cl(v)}"/>` : '';
  const stars = ST.map(([sx, sy]) => `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="3.4" fill="${K.gold}"/>`).join('');
  const cl7 = CL7.map(([sx, sy]) => `<circle cx="${sx}" cy="${sy}" r="3.6" fill="${K.gold}"/>`).join('');
  const arcR = `M ${f1(92 * Math.cos(-.72))} ${f1(92 * Math.sin(-.72))} A 92 92 0 0 1 ${f1(92 * Math.cos(.72))} ${f1(92 * Math.sin(.72))}`;
  const arcL = `M ${f1(-92 * Math.cos(-.72))} ${f1(92 * Math.sin(-.72))} A 92 92 0 0 0 ${f1(-92 * Math.cos(.72))} ${f1(92 * Math.sin(.72))}`;
  const boat = 'M -30 66 Q 0 84 30 66';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})" opacity="${f1(o.alpha ?? 1)}">
    ${o.glow ? `<circle r="150" fill="url(#nGold)" opacity="${f1(cl(o.glow) * .8)}"/>` : ''}
    <clipPath id="${id}c"><path d="M 0 -100 A 100 100 0 1 1 -1 -100 Z ${o.damage ? 'M -62 -78 L -48 -66 L -60 -58 L -72 -66 Z' : ''}" clip-rule="evenodd"/></clipPath>
    <g clip-path="url(#${id}c)">
      <circle r="100" fill="url(#nPat)"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${f1((hash(i + 40) - .5) * 150)}" cy="${f1((hash(i + 60) - .5) * 150)}" r="${f1(8 + hash(i + 80) * 14)}" fill="${K.patD}" opacity=".35"/>`).join('')}
      <path d="${arcL}" fill="none" stroke="${K.patD}" stroke-width="9" opacity=".55"/>
      <g>${hi(o.arcs, 0)}<path d="${arcR}" fill="none" stroke="${K.gold}" stroke-width="9" stroke-linecap="butt"/>
        <path d="${boat}" fill="none" stroke="${K.gold}" stroke-width="7" stroke-linecap="round"/></g>
      <circle cx="-34" cy="-2" r="23" fill="${K.gold}"/>
      <path d="M 50 -50 A 30 30 0 1 0 54 2 A 23 23 0 1 1 50 -50 Z" fill="${K.gold}"/>
      ${stars}${cl7}
      ${o.dirt ? `<rect x="-110" y="-110" width="220" height="220" fill="${K.soil}" opacity="${f1(cl(o.dirt) * .85)}"/>` : ''}
    </g>
    ${o.sun ? `<circle cx="-34" cy="-2" r="${f1(30 + 14 * o.sun)}" fill="url(#nGold)" opacity="${f1(o.sun)}"/><circle cx="-34" cy="-2" r="31" fill="none" stroke="${K.goldL}" stroke-width="4" opacity="${f1(o.sun)}"/>` : ''}
    ${o.moon ? `<circle cx="38" cy="-24" r="${f1(34 + 12 * o.moon)}" fill="url(#nGold)" opacity="${f1(o.moon)}"/><circle cx="38" cy="-24" r="36" fill="none" stroke="${K.goldL}" stroke-width="4" opacity="${f1(o.moon)}"/>` : ''}
    ${o.stars ? ST.map(([sx, sy]) => `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(3.4 + 2 * o.stars)}" fill="${K.goldL}" opacity="${f1(.8 * o.stars)}"/>`).join('') : ''}
    ${o.cluster ? `<circle cx="3" cy="-51" r="${f1(22 + 4 * o.cluster)}" fill="none" stroke="${K.red}" stroke-width="4" opacity="${f1(o.cluster)}"/>${CL7.map(([sx, sy]) => `<circle cx="${sx}" cy="${sy}" r="5.5" fill="${K.goldL}" opacity="${f1(o.cluster)}"/>`).join('')}` : ''}
    ${o.arcs ? `<path d="${arcR}" fill="none" stroke="${K.goldL}" stroke-width="13" opacity="${f1(o.arcs)}"/><path d="${arcL}" fill="none" stroke="${K.goldL}" stroke-width="5" stroke-dasharray="6 8" opacity="${f1(.8 * o.arcs)}"/>` : ''}
    <circle r="100" fill="none" stroke="${K.ink}" stroke-width="${f1(3 / s + 1)}"/>
    ${o.damage ? `<path d="M -62 -78 L -48 -66 L -60 -58 L -72 -66" fill="none" stroke="${K.ink}" stroke-width="${f1(2 / s + 1)}"/>` : ''}
  </g>`;
}

// ---------------- silhouettes (no faces) ----------------
// figure with origin at the feet, height ≈ 700*s. o: aL/aR [shoulder, elbow] angles deg (0 = hanging down, + = forward/up toward screen-right for aR, screen-left for aL),
//   col, hat, coat (long), walk phase, lean deg, hold:{svg at right hand}, rim light colour
export function fig(x, y, s, o = {}) {
  const c = o.col || K.ink, L1 = 120, L2 = 115, sh = [-62, -520], shR = [62, -520];
  const w = o.walk || 0, st = Math.sin(w) * (o.stride ?? 22);
  const arm = (sx, sy, a, side) => { const [a1, a2] = a; const r1 = a1 * Math.PI / 180, r2 = (a1 + a2) * Math.PI / 180;
    const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1, hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
    return { hx, hy, svg: `<path d="M ${sx} ${sy} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${c}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>` }; };
  const L = arm(sh[0], sh[1], o.aL || [6, 4], -1), R = arm(shR[0], shR[1], o.aR || [6, 4], 1);
  const legs = `<path d="M -26 -300 L ${f1(-30 - st)} -150 L ${f1(-34 - st * 1.2)} 0" fill="none" stroke="${c}" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 26 -300 L ${f1(30 + st)} -150 L ${f1(34 + st * 1.2)} 0" fill="none" stroke="${c}" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>`;
  const torso = o.coat ? `<path d="M -80 -540 Q -96 -300 -92 -180 L 92 -180 Q 96 -300 80 -540 Q 0 -566 -80 -540 Z" fill="${c}"/>` : `<path d="M -78 -540 Q -86 -400 -64 -290 L 64 -290 Q 86 -400 78 -540 Q 0 -566 -78 -540 Z" fill="${c}"/>`;
  const head = `<ellipse cx="0" cy="-612" rx="54" ry="62" fill="${c}"/><rect x="-22" y="-560" width="44" height="30" fill="${c}"/>` + (o.hat ? `<path d="M -84 -640 L 84 -640 L 60 -656 L 52 -700 Q 0 -716 -52 -700 L -60 -656 Z" fill="${c}"/>` : '') + (o.cap ? `<path d="M -58 -640 Q -56 -690 0 -690 Q 56 -690 58 -640 L 96 -636 L 58 -628 Z" fill="${c}"/>` : '');
  const rim = o.rim ? `<path d="M 54 -612 A 54 62 0 0 0 30 -664" fill="none" stroke="${o.rim}" stroke-width="6"/><path d="M 80 -530 Q 88 -420 70 -300" fill="none" stroke="${o.rim}" stroke-width="6"/>` : '';
  return { hR: [x + R.hx * s, y + R.hy * s], hL: [x + L.hx * s, y + L.hy * s], svg: `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.lean || 0)}) scale(${f1(s * 1000) / 1000})">${legs}${L.svg}${torso}${head}${R.svg}${rim}</g>` };
}
// night forest set (hill), trees as layered silhouettes
export function forest(t, o = {}) {
  let tr = '';
  for (let i = 0; i < 14; i++) { const x = -40 + i * 85 + (hash(i) - .5) * 40, h = 520 + hash(i + 9) * 380, base = 1250 + hash(i + 3) * 60;
    tr += `<path d="M ${f1(x)} ${f1(base - h)} L ${f1(x - 70)} ${f1(base - h * .45)} L ${f1(x - 40)} ${f1(base - h * .45)} L ${f1(x - 95)} ${f1(base)} L ${f1(x + 95)} ${f1(base)} L ${f1(x + 40)} ${f1(base - h * .45)} L ${f1(x + 70)} ${f1(base - h * .45)} Z" fill="${i % 2 ? '#26332D' : '#2C3A33'}"/>`; }
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/>
    <circle cx="${o.moonX || 820}" cy="300" r="70" fill="#E9E2C8" opacity=".85"/><circle cx="${o.moonX || 820}" cy="300" r="160" fill="url(#nLamp)" opacity=".25"/>
    ${tr}<rect x="-60" y="1240" width="1200" height="800" fill="${K.soilD}"/><path d="M -60 1250 Q 300 1220 600 1255 Q 900 1280 1140 1240" fill="none" stroke="#24301F" stroke-width="30"/>`;
}
// bank notes stack
export function notes(x, y, n, s = 1) {
  let d = '';
  for (let i = 0; i < n; i++) d += `<g transform="translate(${f1((hash(i) - .5) * 14)} ${-i * 12}) rotate(${f1((hash(i + 5) - .5) * 6)})"><rect x="-130" y="-58" width="260" height="116" rx="6" fill="#B9C49A" ${OL(4)}/><rect x="-112" y="-42" width="224" height="84" rx="4" fill="none" stroke="${K.oliveD}" stroke-width="3"/><circle cx="-60" cy="0" r="26" fill="none" stroke="${K.oliveD}" stroke-width="4"/></g>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${d}</g>`;
}
// a hand (back of hand, fingers to +x) at (x,y) rotated, sleeve colour
export function hand(x, y, rot, s = 1, sleeve = K.suit, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})">
    <rect x="-260" y="-46" width="200" height="92" fill="${sleeve}" ${OL(5)}/>
    ${o.cuff ? `<rect x="-76" y="-50" width="22" height="100" fill="#F2EEE6" ${OL(4)}/>` : ''}
    <path d="M -60 -40 L 40 -44 Q 90 -44 100 -24 Q 104 -8 60 -6 L 70 6 Q 104 10 100 26 Q 94 40 60 38 L -60 40 Z" fill="${K.skin}" ${OL(5)}/>
    <path d="M 10 -44 Q 40 -70 64 -60 Q 74 -50 50 -36" fill="${K.skin}" ${OL(5)}/></g>`;
}
// phone (screen content svg in local coords 0..200 x 0..380)
export function phone(x, y, s, rot, screen) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-110" y="-200" width="220" height="400" rx="26" fill="#1E1E22" ${OL(5)}/>
    <g transform="translate(-100 -190)"><rect width="200" height="380" rx="14" fill="#DDE6E2"/>${screen}</g></g>`;
}
export function bars(x, y, n, s = 1, col = K.ink) { return `<g transform="translate(${x} ${y}) scale(${s})">${[0, 1, 2, 3].map(i => `<rect x="${i * 18}" y="${-12 - i * 10}" width="12" height="${12 + i * 10}" fill="${i < n ? col : 'none'}" stroke="${col}" stroke-width="3"/>`).join('')}</g>`; }
// hotel facade with sign
export function hotel(t, o = {}) {
  let win = '';
  for (let r = 0; r < 9; r++) for (let c = 0; c < 6; c++) { const lit = hash(r * 7 + c) > .45; win += `<rect x="${170 + c * 130}" y="${560 + r * 95}" width="80" height="60" fill="${lit ? '#F2D38C' : '#2E3438'}" opacity="${lit ? .85 : 1}"/>`; }
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/>
    <rect x="120" y="440" width="840" height="1000" fill="#4A4F55" ${OL(6)}/>${win}
    <rect x="200" y="${o.signY || 330}" width="680" height="120" fill="#202629" ${OL(6)}/>${TX('HILTON BASEL', 540, (o.signY || 330) + 84, 76, '#F4EAD6', 'middle', `opacity="${f1(o.sign ?? 1)}"`)}
    <rect x="-60" y="1440" width="1200" height="600" fill="#2A2A28"/><rect x="430" y="1260" width="220" height="180" fill="#F2D38C" opacity=".8" ${OL(6)}/>`;
}
// toilet door with men sign
export function wcDoor(x, y, s, open = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-190" y="-430" width="380" height="860" fill="#2A2A28"/>
    <g transform="translate(-180 0) scale(${f1(1 - .8 * open)} 1) translate(180 0)"><rect x="-180" y="-420" width="360" height="840" fill="#9AA3A6" ${OL(6)}/>
    <circle cx="0" cy="-230" r="64" fill="${K.paperL}" ${OL(5)}/><circle cx="0" cy="-262" r="13" fill="${K.ink}"/><path d="M -16 -244 L 16 -244 L 16 -210 L 8 -210 L 8 -186 L -8 -186 L -8 -210 L -16 -210 Z" fill="${K.ink}"/>
    <rect x="120" y="-10" width="40" height="18" rx="6" fill="#D8C8A0" ${OL(4)}/></g></g>`;
}
// handcuff ring between two points
export function cuffs(x1, y1, x2, y2, p = 1) {
  if (p <= 0) return '';
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + 30;
  return `<g opacity="${f1(cl(p * 2))}"><path d="M ${f1(x1)} ${f1(y1)} Q ${f1(mx)} ${f1(my)} ${f1(x2)} ${f1(y2)}" fill="none" stroke="#9AA3A6" stroke-width="10" stroke-dasharray="14 6"/>
    <circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(lerp(70, 50, eout(p)))}" fill="none" stroke="#C3CACC" stroke-width="16"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(lerp(70, 50, eout(p)))}" fill="none" stroke="${K.ink}" stroke-width="4"/>
    <circle cx="${f1(x2)}" cy="${f1(y2)}" r="${f1(lerp(70, 50, eout(p)))}" fill="none" stroke="#C3CACC" stroke-width="16"/><circle cx="${f1(x2)}" cy="${f1(y2)}" r="${f1(lerp(70, 50, eout(p)))}" fill="none" stroke="${K.ink}" stroke-width="4"/></g>`;
}
