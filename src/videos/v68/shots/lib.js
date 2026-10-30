// v68 "Ei in Essig" — channel 5 stick-figure kit, copied unchanged from v67 (style: jobs/v68/style.md).
// Cream background, flat colour blocks, one 7 px black line weight for figure and props.
// The channel's narrator `stick()` is recorded in prompts/hosts.md; later channel-5 videos copy it unchanged.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#F4EFE6', ink: '#1B1B1F', white: '#FFFFFF', paper: '#FBF8F2',
  blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', orangeD: '#D9741A', teal: '#14A38B',
  grass: '#CFE3B4', grassD: '#A9CB8A', sky: '#F4EFE6', fence: '#E9DCC6', fenceD: '#D7C6AA',
  wood: '#C99A6B', woodD: '#A97B4F',
  cola: '#5B2C17', colaL: '#7A3D20', foam: '#F3E3C8', foamD: '#E2CBA4', glass: '#E7F1F3',
  mentos: '#FBFBF7', mentosD: '#DCDCD2', grey: '#8B8B93',
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

// ---------- the PET bottle (origin = bottom centre) ----------
// o.level: liquid top in bottle units (0 = bottom, 330 = shoulder, 378 = rim); o.cap 'on'|'off'|'none';
// o.tint for the liquid; o.inner extra SVG clipped to the inside (bubbles, mentos); id unique per frame.
export const BTL = { w: 72, shY: 262, nkY: 334, nkW: 23, rim: 384, h: 420 };
export function bottlePath() {
  const { w, shY, nkY, nkW, rim } = BTL;
  return `M ${-w + 10} 0 Q ${-w} 0 ${-w} -12 L ${-w} ${-shY} C ${-w} ${-shY - 40} ${-nkW} ${-nkY + 30} ${-nkW} ${-nkY} L ${-nkW} ${-rim} L ${nkW} ${-rim} L ${nkW} ${-nkY} C ${nkW} ${-nkY + 30} ${w} ${-shY - 40} ${w} ${-shY} L ${w} -12 Q ${w} 0 ${w - 10} 0 Z`;
}
export function bottle(x, y, s = 1, o = {}) {
  const id = o.id || 'b0', lev = o.level ?? 300, cap = o.cap || 'none';
  const wob = o.wobble ? Math.sin(o.wobble * 9) * 4 : 0;
  const liq = `<rect x="-90" y="${f1(-lev + wob)}" width="180" height="${f1(lev + 10)}" fill="${o.tint || K.cola}"/>
    <path d="M -90 ${f1(-lev + wob)} Q -45 ${f1(-lev + wob - 6)} 0 ${f1(-lev + wob)} T 90 ${f1(-lev + wob)}" fill="none" stroke="${K.colaL}" stroke-width="6"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(4)}) rotate(${o.rot || 0})">
    <defs><clipPath id="${id}c"><path d="${bottlePath()}"/></clipPath></defs>
    <path d="${bottlePath()}" fill="${K.glass}"/>
    <g clip-path="url(#${id}c)">${liq}${o.inner || ''}
      <rect x="-80" y="-200" width="160" height="92" fill="${o.label || K.red}" opacity=".95"/>
      <path d="M -80 -168 Q -30 -186 10 -160 T 80 -170" fill="none" stroke="${K.white}" stroke-width="9" opacity=".9"/>
      <rect x="${-BTL.w + 14}" y="-250" width="12" height="200" rx="6" fill="${K.white}" opacity=".45"/></g>
    <path d="M -80 -200 H 80 M -80 -108 H 80" stroke="${K.ink}" stroke-width="5" clip-path="url(#${id}c)"/>
    <path d="${bottlePath()}" fill="none" ${OL(LW / s * (o.lw || 1))}/>
    <rect x="${-BTL.nkW - 6}" y="${-BTL.rim + 10}" width="${2 * BTL.nkW + 12}" height="10" rx="4" fill="${K.white}" ${OL(5 / s)}/>
    ${cap === 'on' ? capSvg(0, -BTL.rim, 1) : ''}${o.over || ''}</g>`;
}
export function capSvg(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(3)}) rotate(${rot})"><rect x="-29" y="-36" width="58" height="38" rx="7" fill="${K.red}" ${OL(5)}/>
  <path d="M -18 -30 V -4 M -6 -30 V -4 M 6 -30 V -4 M 18 -30 V -4" stroke="${K.ink}" stroke-width="3" opacity=".5"/></g>`;
}
// ---------- Mentos candy (side view disc) ----------
export function mentos(x, y, r = 22, rot = 0, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><ellipse cx="0" cy="0" rx="${f1(r)}" ry="${f1(r * .62)}" fill="${K.mentos}" ${OL(o.lw || 5)}/>
  <path d="M ${f1(-r * .55)} ${f1(-r * .12)} Q 0 ${f1(-r * .42)} ${f1(r * .55)} ${f1(-r * .12)}" fill="none" stroke="${K.mentosD}" stroke-width="${f1(r * .16)}" stroke-linecap="round"/></g>`;
}
// paper roll of mint candies held in a hand (axis along rot)
export function roll(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${s})"><rect x="-58" y="-17" width="116" height="34" rx="16" fill="${K.blue}" ${OL(5)}/>
  <rect x="-30" y="-17" width="40" height="34" fill="${K.white}" opacity=".9"/><path d="M -30 -17 V 17 M 10 -17 V 17" stroke="${K.ink}" stroke-width="4"/></g>`;
}

// ---------- bubbles / CO2 / foam ----------
export function bubble(x, y, r, o = {}) {
  if (r < .6) return '';
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${o.fill || 'rgba(255,255,255,.28)'}" stroke="${o.stroke || '#F6E7D2'}" stroke-width="${f1(o.w || Math.max(1.5, r * .16))}"/>`;
}
export function co2(x, y, r = 14, a = 1) {
  if (a <= 0) return '';
  return `<g opacity="${cl(a).toFixed(3)}"><circle cx="${f1(x - r * .9)}" cy="${f1(y)}" r="${f1(r * .62)}" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/>
  <circle cx="${f1(x + r * .9)}" cy="${f1(y)}" r="${f1(r * .62)}" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/>
  <circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * .78)}" fill="${K.ink}"/></g>`;
}
// foam column out of an opening at (x, y): p 0..1 height growth, H max height, decay 0..1 shrink, t for churn
export function fountain(x, y, H, p, t, o = {}) {
  if (p <= 0 || H * p < 6) return '';
  const h = H * p, n = Math.max(3, Math.round(h / 26)), k0 = Math.min(1, h / 160), w0 = (o.w0 || 26) * Math.max(.7, k0), w1 = (o.w1 || 70) * k0;
  let s = '';
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1), yy = y - k * h, wv = lerp(w0, w1, Math.pow(k, 1.4));
    const jx = (hash(i * 7.1 + Math.floor(t * 12)) - .5) * wv * .4;
    const r = wv * (.62 + .25 * hash(i * 3.3 + Math.floor(t * 10)));
    s += `<circle cx="${f1(x + jx)}" cy="${f1(yy)}" r="${f1(r)}" fill="${K.foam}" stroke="${K.ink}" stroke-width="5"/>`;
  }
  let top = '';
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1), yy = y - k * h, wv = lerp(w0, w1, Math.pow(k, 1.4));
    const jx = (hash(i * 7.1 + Math.floor(t * 12)) - .5) * wv * .4;
    top += `<circle cx="${f1(x + jx)}" cy="${f1(yy)}" r="${f1(wv * .55)}" fill="${K.foam}"/>`;
  }
  // falling droplets around the crown
  let drops = '';
  const nd = h < 120 ? 0 : (o.drops ?? 14);
  for (let i = 0; i < nd; i++) {
    const ph = (t * (1.1 + hash(i) * .6) + hash(i * 9.7)) % 1, side = hash(i * 4.4) < .5 ? -1 : 1;
    const dx = side * (w1 * .6 + ph * (60 + 120 * hash(i * 2.2))), dy = -h + ph * ph * (h * .9);
    drops += `<circle cx="${f1(x + dx)}" cy="${f1(y + dy)}" r="${f1(6 + 6 * hash(i * 5.5))}" fill="${K.foam}" stroke="${K.ink}" stroke-width="3" opacity="${f1(1 - ph * .6)}"/>`;
  }
  return `<g>${drops}${s}${top}<path d="M ${f1(x - w0 * .4)} ${f1(y - h * .15)} L ${f1(x - w0 * .2)} ${f1(y - h * .85)}" stroke="${K.white}" stroke-width="7" stroke-linecap="round" opacity=".7"/></g>`;
}
// foam puddle on the table around a bottle base
export function puddle(x, y, w, a = 1) {
  if (a <= 0) return '';
  return `<g opacity="${cl(a).toFixed(3)}"><path d="M ${f1(x - w)} ${f1(y)} Q ${f1(x - w * .8)} ${f1(y - 16)} ${f1(x - w * .4)} ${f1(y - 10)} Q ${f1(x)} ${f1(y - 22)} ${f1(x + w * .45)} ${f1(y - 10)} Q ${f1(x + w * .85)} ${f1(y - 16)} ${f1(x + w)} ${f1(y)} Z" fill="${K.foamD}" ${OL(5)}/></g>`;
}

// ---------- sets ----------
export function yard(o = {}) {
  const gy = o.gy ?? 1260;
  let fence = '';
  for (let i = -1; i < 13; i++) { const fx = i * 92 + 10; fence += `<path d="M ${fx} ${gy - 40} V ${gy - 300} l 30 -30 l 30 30 V ${gy - 40}" fill="${K.fence}" ${OL(5)}/>`; }
  return `${BG(K.sky)}<circle cx="${o.sunX ?? 860}" cy="${o.sunY ?? 230}" r="70" fill="#FFD66B" ${OL(6)}/>
  ${o.cloud === false ? '' : `<path d="M 140 300 q 40 -40 90 -10 q 40 -30 80 10 z" fill="${K.white}" ${OL(5)}/>`}
  <rect x="-60" y="${gy - 250}" width="1200" height="22" fill="${K.fenceD}" ${OL(5)}/>${fence}
  <rect x="-60" y="${gy - 60}" width="1200" height="${2000 - gy}" fill="${K.grass}"/>
  <path d="M -60 ${gy - 60} H 1140" ${OL(6)}/>
  ${[120, 330, 610, 900].map((gx, i) => `<path d="M ${gx} ${gy + 60 + i * 30} l 10 -24 l 10 24 m 6 0 l 10 -20 l 8 20" fill="none" stroke="${K.grassD}" stroke-width="5" stroke-linecap="round"/>`).join('')}`;
}
// table: top surface at y (between x0 and x1)
export function table(x0, x1, y, legH = 300) {
  return `<rect x="${x0 + 30}" y="${y + 20}" width="16" height="${legH}" fill="${K.woodD}" ${OL(5)}/><rect x="${x1 - 46}" y="${y + 20}" width="16" height="${legH}" fill="${K.woodD}" ${OL(5)}/>
  <rect x="${x0}" y="${y}" width="${x1 - x0}" height="30" rx="6" fill="${K.wood}" ${OL(LW)}/>`;
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
// rising bubble stream from a source: n bubbles, speed px/s, column height H, seed
export function stream(x, y, H, t, o = {}) {
  const n = o.n || 10, sp = o.speed || 260, seed = o.seed || 1, rr = o.r || 9, spread = o.spread || 18;
  let s = '';
  for (let i = 0; i < n; i++) {
    const ph = ((t - (o.t0 || 0)) * sp / H + hash(i * 3.7 + seed)) % 1;
    if (t < (o.t0 || 0) || ph < 0) continue;
    const yy = y - ph * H, xx = x + (hash(i * 1.9 + seed) - .5) * spread * 2 + Math.sin(ph * 9 + i) * 5;
    s += bubble(xx, yy, rr * (.55 + .7 * hash(i * 5.1 + seed)) * (.7 + ph * .5));
  }
  return s;
}
