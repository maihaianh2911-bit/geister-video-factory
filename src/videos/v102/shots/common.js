// v102 shared motif: the world loses colour with every missing hour of sleep.
// colourAt(t) 0..1 = how much colour the world has; grey(g) desaturates everything drawn BEFORE it
// (CSS mix-blend-mode:saturation with a neutral grey, no feColorMatrix); farbeBar draws the small "FARBE" meter.
import { K, f1, op, T, prog, eio, lerp, cl, pool } from './lib.js';
const INK = K.ink;
// piecewise colour level on the voice timeline
const KEYS = [
  [0, 1], [3.6, 1], [4.6, .72], [5.4, .72], [6.46, .03], [9.84, .03], [10.3, 1],
  [11.14, 1], [11.8, .86], [15.42, .86], [16.1, .7], [18.7, .7], [19.3, .5], [24.14, .5], [24.8, .26],
  [27.08, .26], [27.6, .16], [56.18, .16], [56.8, .42], [58.1, .42], [58.7, .62], [60.36, .62], [61.1, 1], [99, 1],
];
export function colourAt(t) {
  for (let i = 1; i < KEYS.length; i++) {
    const [t0, v0] = KEYS[i - 1], [t1, v1] = KEYS[i];
    if (t <= t1) return lerp(v0, v1, eio(prog(t, t0, t1)));
  }
  return 1;
}
// desaturate what was drawn before (g 0..1) + a slight flat grey wash
export function grey(g) {
  g = cl(g);
  if (g <= 0.005) return '';
  return `<rect x="-300" y="-300" width="1680" height="2520" fill="#808080" style="mix-blend-mode:saturation" opacity="${op(g)}"/><rect x="-300" y="-300" width="1680" height="2520" fill="#9a9a9a" opacity="${op(.18 * g)}"/>`;
}
// FARBE meter, top left (y 150–205). v 0..1; glow 0..1 sparkles when full
export function farbeBar(v, o = {}) {
  v = cl(v);
  const x = 60, y = 158, w = 300, h = 34;
  const col = v > .6 ? '#3c9a5f' : v > .3 ? '#e0b04a' : '#d9493f';
  let s = `<g opacity="${op(o.a === undefined ? 1 : o.a)}"><rect x="${x - 14}" y="${y - 54}" width="${w + 28}" height="${h + 72}" rx="22" fill="#1d1d1d" opacity=".55"/>`;
  s += T(x, y - 14, 'FARBE', 34, { anchor: 'start', fill: '#fff', ls: 3 });
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#3a3a3a" stroke="#fff" stroke-width="4"/>`;
  if (v > .01) {
    s += `<defs><linearGradient id="v102rb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9493f"/><stop offset=".25" stop-color="#f2c14e"/><stop offset=".5" stop-color="#3c9a5f"/><stop offset=".75" stop-color="#4f8fd9"/><stop offset="1" stop-color="#8a5bb5"/></linearGradient></defs>`;
    s += `<rect x="${x + 4}" y="${y + 4}" width="${f1((w - 8) * v)}" height="${h - 8}" rx="${(h - 8) / 2}" fill="url(#v102rb)"/>`;
    s += `<rect x="${x + 4}" y="${y + 4}" width="${f1((w - 8) * v)}" height="${h - 8}" rx="${(h - 8) / 2}" fill="#808080" style="mix-blend-mode:saturation" opacity="${op(1 - v)}"/>`;
  }
  if (o.glow) s += pool(x + w, y + h / 2, 120, 120, '#fff3b0', .6 * o.glow);
  s += T(x + w + 26, y + 30, `${Math.round(v * 100)} %`, 32, { anchor: 'start', fill: '#fff', stroke: '#1d1d1d', sw: 8 });
  return s + '</g>';
}
// moon chip "6 h" / "8 h"
export function moonChip(x, y, txt, p = 1, o = {}) {
  if (p <= 0) return '';
  const w = 230, h = 100;
  const g = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="50" fill="${o.bg || '#22305a'}" stroke="${INK}" stroke-width="6"/><path d="M -62 -26 A 30 30 0 1 0 -40 28 A 24 24 0 1 1 -62 -26 Z" fill="#f4eccd"/>${T(30, 18, txt, 54, { fill: '#fff' })}`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(Math.max(.01, p) * 1000) / 1000})" opacity="${op(cl(p * 2))}">${g}</g>`;
}
// tree (for windows/streets): x, ground y, scale; col leaves
export function tree(x, y, s = 1, col = '#4fae52', hi = '#6cc96a') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><rect x="-16" y="-190" width="32" height="190" fill="#7a5a3a"/><circle cx="0" cy="-260" r="120" fill="${col}"/><circle cx="-70" cy="-210" r="80" fill="${col}"/><circle cx="70" cy="-220" r="86" fill="${col}"/><circle cx="-30" cy="-300" r="70" fill="${hi}"/><circle cx="50" cy="-280" r="50" fill="${hi}"/></g>`;
}
export const nod = (t, t0, t1, f = 9) => (t >= t0 && t < t1) ? Math.max(0, Math.sin((t - t0) * f)) * 16 : 0;
