// v78 "Einen Monat nicht duschen" — channel 5 stick-figure kit; stick()/joint()/FIG/headPos()/walkFeet() copied unchanged from v67/v68 (prompts/hosts.md).
// Cream background, flat colour blocks, one 7 px black line weight for figure and props. Shower scenes stay discreet (curtain, head and arm only).
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#F4EFE6', ink: '#1B1B1F', white: '#FFFFFF', paper: '#FBF8F2',
  blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', orangeD: '#D9741A', teal: '#14A38B',
  grass: '#CFE3B4', grassD: '#A9CB8A', sky: '#F4EFE6', fence: '#E9DCC6', fenceD: '#D7C6AA',
  wood: '#C99A6B', woodD: '#A97B4F',
  cola: '#5B2C17', colaL: '#7A3D20', foam: '#F3E3C8', foamD: '#E2CBA4', glass: '#E7F1F3',
  mentos: '#FBFBF7', mentosD: '#DCDCD2', grey: '#8B8B93',
  skin: '#F2D2B6', skinD: '#D9AE8C', tile: '#E3EEF0', tileD: '#C9DADE', odor: '#8DBF5A', odorD: '#5E8F33', perf: '#E58FC4', bact: '#7A6BD6', dirt: '#8A7A66', sheet: '#DDE7F5', pillow: '#FFFFFF', water: '#8FC9E8',
  shirt2: '#2F4BDB',
};
export const LW = 7;
export const f1 = v => (+v).toFixed(1);
export const OL = (w = LW, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f = K.ink, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const BG = (c = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const pt = (a, b) => `${f1(a)} ${f1(b)}`;

// ---------- keyword card (max one per shot) ----------
export function card(x, y, txt, sz, a = 1, o = {}) {
  if (a <= 0) return '';
  const w = txt.length * sz * .66 + sz * 1.1, h = sz * 1.5, s = lerp(.85, 1, eout(cl(a)));
  return `<g opacity="${cl(a).toFixed(3)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0}) scale(${s.toFixed(3)})">
  <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(sz * .28)}" fill="${o.fill || K.white}" ${OL(6)}/>
  ${TX(txt, 0, sz * .36, sz, o.col || K.ink)}</g>`;
}
// headline on the cover
export function headline(lines, y, a = 1) {
  return `<g opacity="${cl(a).toFixed(3)}">${lines.map(([s, sz, c], i) => TX(s, 540, y + i * sz * 1.08, sz, c, 'middle', `stroke="${K.bg}" stroke-width="16" stroke-linejoin="round" paint-order="stroke"`)).join('')}</g>`;
}

// ---------- two-bone limb (IK): returns elbow/knee point ----------
export function joint(ax, ay, bx, by, l1, l2, bend = 1) {
  let dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1e-3;
  const L = Math.min(d, l1 + l2 - .5);
  if (d > L) { bx = ax + dx / d * L; by = ay + dy / d * L; dx = bx - ax; dy = by - ay; d = L; }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const mx = ax + dx / d * a, my = ay + dy / d * a;
  return [mx - dy / d * h * bend, my + dx / d * h * bend, bx, by];
}

// ---------- the channel's stick figure ----------
// (x, y) = point between the feet on the ground. o.hL / o.hR: hand targets in WORLD coords (screen-left/right);
// o.fL / o.fR: foot targets (default under hips); o.lean (deg), o.look (-1..1 eye dir), o.lookY, o.mouth
// 'smile'|'o'|'flat'|'open'|'worried', o.brow 'up'|'calm'|'knit', o.bob (body drop px), o.hold* SVG drawn in hand.
export const FIG = { headR: 58, neck: 352, sh: 318, hip: 168, arm: 92, leg: 90 };
export function stick(x, y, s = 1, o = {}) {
  const lean = (o.lean || 0) * Math.PI / 180, bob = o.bob || 0;
  const W = (lx, ly) => [x + lx * s, y + ly * s];
  const hipL = [0, -FIG.hip + bob];
  const tilt = v => [hipL[0] + Math.sin(lean) * v, hipL[1] - Math.cos(lean) * v];
  const shC = tilt(FIG.sh - FIG.hip), neck = tilt(FIG.neck - FIG.hip), head = tilt(FIG.neck - FIG.hip + FIG.headR + 4);
  const shL = [shC[0] - 30, shC[1] + 4], shR = [shC[0] + 30, shC[1] + 4];
  const hL = o.hL ? [(o.hL[0] - x) / s, (o.hL[1] - y) / s] : [shL[0] - 26, shL[1] + 150];
  const hR = o.hR ? [(o.hR[0] - x) / s, (o.hR[1] - y) / s] : [shR[0] + 26, shR[1] + 150];
  const fL = o.fL ? [(o.fL[0] - x) / s, (o.fL[1] - y) / s] : [-34, 0];
  const fR = o.fR ? [(o.fR[0] - x) / s, (o.fR[1] - y) / s] : [34, 0];
  const aL = joint(shL[0], shL[1], hL[0], hL[1], FIG.arm, FIG.arm, o.bendL ?? 1);
  const aR = joint(shR[0], shR[1], hR[0], hR[1], FIG.arm, FIG.arm, o.bendR ?? -1);
  const lL = joint(hipL[0] - 14, hipL[1], fL[0], fL[1], FIG.leg, FIG.leg, o.kneeL ?? 1);
  const lR = joint(hipL[0] + 14, hipL[1], fR[0], fR[1], FIG.leg, FIG.leg, o.kneeR ?? -1);
  const P = (p) => pt(...W(...p));
  const limb = (a, j) => `<path d="M ${P(a)} L ${P([j[0], j[1]])} L ${P([j[2], j[3]])}" fill="none" ${OL(LW * s)}/>`;
  const foot = (j, dir) => `<path d="M ${P([j[2], j[3]])} l ${f1(dir * 26 * s)} 0" fill="none" ${OL(LW * s)}/>`;
  // shirt: rounded trapezoid from shoulders to hips, short sleeves follow the upper arms
  const sl = (sh, j) => { const dx = j[0] - sh[0], dy = j[1] - sh[1], d = Math.hypot(dx, dy) || 1, k = 44 / d; return [sh[0] + dx * k, sh[1] + dy * k]; };
  const sL = sl(shL, aL), sR = sl(shR, aR);
  const hp = tilt(0), hw = 40, tw = 36;
  const shirt = `<path d="M ${P([shL[0] - 4, shL[1] - 6])} L ${P(sL)} M ${P([shR[0] + 4, shR[1] - 6])} L ${P(sR)}" fill="none" stroke="${K.ink}" stroke-width="${f1(30 * s)}" stroke-linecap="round"/>
    <path d="M ${P([shL[0] - 4, shL[1] - 6])} L ${P(sL)} M ${P([shR[0] + 4, shR[1] - 6])} L ${P(sR)}" fill="none" stroke="${o.shirt || K.orange}" stroke-width="${f1(17 * s)}" stroke-linecap="round"/>
    <path d="M ${P([shC[0] - tw, shC[1] - 4])} Q ${P([shC[0], shC[1] - 14])} ${P([shC[0] + tw, shC[1] - 4])} L ${P([hp[0] + hw, hp[1] + 6])} Q ${P([hp[0], hp[1] + 14])} ${P([hp[0] - hw, hp[1] + 6])} Z" fill="${o.shirt || K.orange}" ${OL(LW * s)}/>`;
  const [hx, hy] = W(...head), r = FIG.headR * s, lk = (o.look || 0) * 12 * s, ly = (o.lookY || 0) * 10 * s;
  const ex = 20 * s, eyR = (o.eye || 1) * 7.5 * s;
  const mouth = { smile: `M ${pt(hx - 18 * s + lk, hy + 22 * s)} Q ${pt(hx + lk, hy + 36 * s)} ${pt(hx + 18 * s + lk, hy + 22 * s)}`,
    flat: `M ${pt(hx - 14 * s + lk, hy + 27 * s)} L ${pt(hx + 14 * s + lk, hy + 27 * s)}`,
    worried: `M ${pt(hx - 16 * s + lk, hy + 31 * s)} Q ${pt(hx + lk, hy + 20 * s)} ${pt(hx + 16 * s + lk, hy + 31 * s)}` }[o.mouth || 'smile'];
  const mO = o.mouth === 'o' || o.mouth === 'open';
  const browY = hy - 20 * s + ly, bU = { up: -9, calm: 0, knit: 4 }[o.brow || 'calm'] * s, bK = o.brow === 'knit' ? 5 * s : (o.brow === 'up' ? -3 * s : 0);
  const face = `<circle cx="${f1(hx - ex + lk)}" cy="${f1(hy - 2 * s + ly)}" r="${f1(eyR)}" fill="${K.ink}"/><circle cx="${f1(hx + ex + lk)}" cy="${f1(hy - 2 * s + ly)}" r="${f1(eyR)}" fill="${K.ink}"/>
    ${o.brow === 'none' ? '' : `<path d="M ${pt(hx - ex - 12 * s + lk, browY + bU - bK)} L ${pt(hx - ex + 10 * s + lk, browY + bU + bK)} M ${pt(hx + ex - 10 * s + lk, browY + bU + bK)} L ${pt(hx + ex + 12 * s + lk, browY + bU - bK)}" fill="none" ${OL(5 * s)}/>`}
    ${mO ? `<ellipse cx="${f1(hx + lk)}" cy="${f1(hy + 27 * s)}" rx="${f1((o.mouth === 'open' ? 13 : 9) * s)}" ry="${f1((o.mouth === 'open' ? 15 : 11) * s)}" fill="${K.ink}"/>` : `<path d="${mouth}" fill="none" ${OL(5 * s)}/>`}`;
  const neckL = `<path d="M ${P(neck)} L ${P([shC[0], shC[1] - 6])}" fill="none" ${OL(LW * s)}/>`;
  const handDot = j => `<circle cx="${f1(W(j[2], j[3])[0])}" cy="${f1(W(j[2], j[3])[1])}" r="${f1(10 * s)}" fill="${K.ink}"/>`;
  const back = (o.backArm === 'L' ? limb(shL, aL) + handDot(aL) : '') + (o.backArm === 'R' ? limb(shR, aR) + handDot(aR) : '');
  const front = (o.backArm === 'L' ? '' : limb(shL, aL) + handDot(aL)) + (o.backArm === 'R' ? '' : limb(shR, aR) + handDot(aR));
  return `<g>${o.under || ''}${back}${limb([hipL[0] - 14, hipL[1]], lL)}${limb([hipL[0] + 14, hipL[1]], lR)}${foot(lL, -1)}${foot(lR, 1)}${neckL}${shirt}
    <circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(r)}" fill="${K.white}" ${OL(LW * s)}/>${face}${o.mid || ''}${front}${o.over || ''}</g>`;
}
// world position of the figure's head centre (for thought marks etc.)
export const headPos = (x, y, s = 1, bob = 0) => [x, y + (-FIG.hip + bob - (FIG.neck - FIG.hip + FIG.headR + 4)) * s];
// walking feet: phase p (0..1 per stride), stride length L px, returns [fL, fR] targets relative to world
export function walkFeet(x, y, p, L = 70, s = 1) {
  const a = Math.sin(p * Math.PI * 2), lift = (v) => Math.max(0, v) * 22 * s;
  return [[x - 18 * s + a * L / 2 * s, y - lift(Math.cos(p * Math.PI * 2))], [x + 18 * s - a * L / 2 * s, y - lift(-Math.cos(p * Math.PI * 2))]];
}

// round magnifier inset: content drawn in a 1080x1920 frame scaled into the circle
export function lens(cx, cy, r, inner, id, o = {}) {
  return `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
  <g clip-path="url(#${id})"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || K.paper}"/>${inner}</g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" ${OL(12)}/>${o.handle === false ? '' : `<path d="M ${f1(cx + r * .72)} ${f1(cy + r * .72)} l ${f1(r * .38)} ${f1(r * .38)}" ${OL(26)}/>`}`;
}
// red cross drawn progressively
export function cross(x, y, w, p) {
  if (p <= 0) return '';
  const a = cl(p * 2), b = cl(p * 2 - 1);
  return `<path d="M ${f1(x - w)} ${f1(y - w)} L ${f1(lerp(x - w, x + w, a))} ${f1(lerp(y - w, y + w, a))}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>
  ${b > 0 ? `<path d="M ${f1(x + w)} ${f1(y - w)} L ${f1(lerp(x + w, x - w, b))} ${f1(lerp(y - w, y + w, b))}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>` : ''}`;
}
export function arrow(x0, y0, x1, y1, col = K.blue, w = 12, p = 1) {
  if (p <= 0) return '';
  const xe = lerp(x0, x1, p), ye = lerp(y0, y1, p), a = Math.atan2(ye - y0, xe - x0), L = 34;
  return `<path d="M ${f1(x0)} ${f1(y0)} L ${f1(xe)} ${f1(ye)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
  <path d="M ${f1(xe - L * Math.cos(a - .5))} ${f1(ye - L * Math.sin(a - .5))} L ${f1(xe)} ${f1(ye)} L ${f1(xe - L * Math.cos(a + .5))} ${f1(ye - L * Math.sin(a + .5))}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// wavy smell lines rising from (x, y); a visibility, col, n lines
export function smell(x, y, t, a = 1, col = K.odor, n = 3, s = 1) {
  if (a <= 0) return '';
  let d = '';
  for (let i = 0; i < n; i++) { const ox = (i - (n - 1) / 2) * 34 * s, ph = (t * 1.2 + i * .33) % 1, yy = y - ph * 40 * s;
    d += `<path d="M ${f1(x + ox)} ${f1(yy)} q ${f1(14 * s)} ${f1(-22 * s)} 0 ${f1(-44 * s)} q ${f1(-14 * s)} ${f1(-22 * s)} 0 ${f1(-44 * s)}" fill="none" stroke="${col}" stroke-width="${f1(8 * s)}" stroke-linecap="round" opacity="${f1(cl(a) * (1 - ph * .5))}"/>`; }
  return d;
}
// calendar page in the corner: day number
export function calendar(x, y, day, a = 1) {
  if (a <= 0) return '';
  return `<g opacity="${cl(a).toFixed(3)}" transform="translate(${f1(x)} ${f1(y)})"><rect x="-90" y="-80" width="180" height="170" rx="14" fill="${K.white}" ${OL(6)}/><rect x="-90" y="-80" width="180" height="48" rx="14" fill="${K.red}" ${OL(6)}/>
    ${TX('TAG', 0, -44, 30, K.white)}${TX(String(day), 0, 60, 76)}</g>`;
}
