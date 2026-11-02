// v98 helpers: floating yellow question marks, hearts, nodding
import { K, f1, op, T, pop, cl } from './lib.js';
const INK = K.ink;
export function qmark(x, y, s, t, seed = 0, a = 1) {
  const bob = Math.sin(t * 2 + seed) * 10, r = Math.sin(t * 1.3 + seed * 2) * 10;
  return `<g transform="translate(${f1(x)} ${f1(y + bob)}) rotate(${f1(r)}) scale(${f1(s * 1000) / 1000})" opacity="${op(a)}">${T(0, 40, '?', 130, { fill: K.yellow, stroke: INK, sw: 14 })}</g>`;
}
export function heart(x, y, s, p = 1) {
  if (p <= 0) return '';
  const k = s * Math.max(.01, p);
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k * 1000) / 1000})" opacity="${op(cl(p * 2))}"><path d="M 0 30 C -60 -10 -50 -60 -18 -60 C -4 -60 0 -48 0 -40 C 0 -48 4 -60 18 -60 C 50 -60 60 -10 0 30 Z" fill="#e8546a" stroke="${INK}" stroke-width="6"/><path d="M -30 -40 q 8 -10 18 -6" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
}
export const nod = (t, t0, t1) => (t >= t0 && t < t1) ? Math.max(0, Math.sin((t - t0) * 12)) * 18 : 0;
