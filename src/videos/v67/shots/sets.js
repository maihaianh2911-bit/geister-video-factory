// Shared compositions for v67: the backyard table wide shot and the big see-through bottle cutaway.
import { K, OL, f1, BG, yard, table, bottle, stick, capSvg, mentos, bubble, co2, hash, lerp, cl, BTL } from './lib.js';

export const TY = 1140, BX = 730, BS = .62, FY = 1390, FS = 1.5;
// wide backyard: o.fig (stick options + x), o.bottles [{x, level, cap, id, over, inner}], o.caps [[x, rot]], o.extra
export function wide(o = {}) {
  const bottles = (o.bottles || [{ x: BX }]).map((b, i) => bottle(b.x, TY, b.s || BS, { id: `w${i}${o.id || ''}`, level: b.level ?? 300, cap: b.cap || 'none', over: b.over || '', inner: b.inner || '', label: b.label })).join('');
  const caps = (o.caps || []).map(([x, r]) => capSvg(x, TY, 1, r ?? 90)).join('');
  const fig = o.fig ? stick(o.fig.x, o.fig.y ?? FY, o.fig.s ?? FS, o.fig) : '';
  return `${yard({ cloud: o.cloud ?? true, sunX: o.sunX ?? 900, sunY: o.sunY ?? 330 })}${o.behind || ''}${table(o.tx0 ?? 560, o.tx1 ?? 1080, TY, 400)}${caps}${o.figBack ? fig : ''}${bottles}${o.figBack ? '' : fig}${o.extra || ''}`;
}

// big cutaway bottle: bottom centre (540, 1390) at scale CS; inner/over in bottle units
export const CX = 540, CY = 1390, CS = 2.5;
export const toW = (bx, by, s = CS, x = CX, y = CY) => [x + bx * s, y + by * s];
export function cutBG(o = {}) {
  return `${BG(o.bg || K.bg)}<rect x="-60" y="${CY + 2}" width="1200" height="600" fill="${K.wood}"/><path d="M -60 ${CY + 2} H 1140" ${OL(8)}/>
  <path d="M -60 ${CY + 40} H 1140" stroke="${K.woodD}" stroke-width="6"/>`;
}
export function bigBottle(o = {}) {
  return bottle(o.x ?? CX, o.y ?? CY, o.s ?? CS, { id: o.id || 'bb', level: o.level ?? 300, cap: o.cap || 'none', inner: o.inner || '', over: o.over || '', label: o.label, lw: .8 });
}
// deterministic dissolved-CO2 positions inside the liquid (bottle units)
export function molecules(n, lev, seed = 1) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const y = -16 - hash(i * 2.31 + seed) * (lev - 34);
    const halfW = y < -BTL.shY ? BTL.nkW + (BTL.w - BTL.nkW) * cl((-BTL.nkY - y) / (BTL.nkY - BTL.shY)) - 10 : BTL.w - 14;
    out.push([(hash(i * 7.77 + seed) * 2 - 1) * Math.max(6, halfW - 8), y]);
  }
  return out;
}
export const molSvg = (pts, a = 1, r = 6.5, t = 0) => pts.map(([x, y], i) => co2(x + Math.sin(t * 1.3 + i) * 1.5, y + Math.cos(t * 1.1 + i * 2) * 1.5, r, a)).join('');
// bubbles clinging to / growing on a candy at (x, y) in bottle units
export function candyBubbles(x, y, g, t, seed = 1, n = 9) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = hash(i * 3.1 + seed) * Math.PI * 2, d = 11 + 3 * hash(i + seed);
    const r = g * (2 + 3.5 * hash(i * 1.7 + seed)) * (1 + .15 * Math.sin(t * 8 + i));
    s += bubble(x + Math.cos(a) * d, y + Math.sin(a) * d * .7, r, { w: 1.2 });
  }
  return s;
}
// three candies in a stack/cluster; p 0..1 sinking from yTop to yBot (bottle units)
export function candies(x, y, n = 3, rot = 0, r = 9) {
  let s = '';
  for (let i = 0; i < n; i++) s += mentos(x + (i - (n - 1) / 2) * r * 1.3 + hash(i * 4.2) * 3, y + hash(i * 6.1) * 6 - i * 4, r, rot + (i - 1) * 25, { lw: 2.4 });
  return s;
}
// a big hand from off-frame (for close-ups): wrist at (x0,y0) → fingertip pinch at (x, y); returns svg
export function bigArm(x0, y0, x, y, w = 34) {
  return `<path d="M ${f1(x0)} ${f1(y0)} L ${f1(x)} ${f1(y)}" fill="none" ${OL(w)}/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(w * 1.15)}" fill="${K.ink}"/>`;
}
export { K, OL, f1, mentos, bubble, co2, lerp, hash, cl, capSvg, stick };
