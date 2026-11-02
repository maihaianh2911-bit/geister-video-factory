// v102 study graphics: dark lab background, 14-night calendar, two gauges.
import { K, f1, op, T, pool, cl, eio, prog, pop, head } from './lib.js';
import { moonChip } from './common.js';
const INK = K.ink;
export function labBg(t) {
  let s = `<defs><linearGradient id="v102lab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2340"/><stop offset="1" stop-color="#2c3558"/></linearGradient></defs><rect x="-300" y="-300" width="1680" height="2520" fill="url(#v102lab)"/>`;
  s += `<g stroke="#ffffff" stroke-width="2" opacity=".06">${Array.from({ length: 16 }, (_, i) => `<path d="M ${-200 + i * 100} -300 V 2200"/><path d="M -300 ${-200 + i * 140} H 1400"/>`).join('')}</g>`;
  s += pool(540, 820, 700, 700, '#5f7fd0', .35);
  return s;
}
// 7×2 calendar of nights; times[i] = pop time; txt per cell
export function nights(t, x, y, n, t0, dt, txt, o = {}) {
  let s = '';
  const cw = 140, ch = 210, cols = 7;
  for (let i = 0; i < n; i++) {
    const c = i % cols, r = Math.floor(i / cols), cx = x + (c - (cols - 1) / 2) * cw, cy = y + r * (ch + 30);
    const p = pop(t, t0 + i * dt, .3);
    s += `<rect x="${f1(cx - cw / 2 + 6)}" y="${f1(cy - ch / 2)}" width="${cw - 12}" height="${ch}" rx="16" fill="#fbf8ef" stroke="${INK}" stroke-width="5"/>`;
    s += `<rect x="${f1(cx - cw / 2 + 6)}" y="${f1(cy - ch / 2)}" width="${cw - 12}" height="40" rx="12" fill="${o.hdr || '#d9493f'}"/>`;
    s += T(cx, cy - ch / 2 + 30, String(i + 1), 28, { fill: '#fff' });
    if (p > 0) s += `<g transform="translate(${f1(cx)} ${f1(cy + 6)}) scale(${f1(p * 1000) / 1000})"><path d="M -18 -52 A 40 40 0 1 0 16 22 A 32 32 0 1 1 -18 -52 Z" fill="#33407a"/>${T(0, 78, txt, 42, { fill: o.col || '#d9493f' })}</g>`;
  }
  return s;
}
// vertical gauge: centre x, top y, level v 0..1, colour
export function gauge(x, y, h, v, col, a = 1) {
  const w = 190;
  return `<g opacity="${op(a)}"><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="30" fill="#141a30" stroke="#fff" stroke-width="7"/><rect x="${f1(x - w / 2 + 14)}" y="${f1(y + 14 + (h - 28) * (1 - cl(v)))}" width="${w - 28}" height="${f1((h - 28) * cl(v))}" rx="18" fill="${col}"/>${[.25, .5, .75].map(k => `<path d="M ${x - w / 2} ${f1(y + h * k)} h 26" stroke="#fff" stroke-width="5"/>`).join('')}</g>`;
}
export function stopwatch(x, y, s, t) {
  const a = t * 4;
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-92" width="28" height="22" rx="4" fill="#fff" stroke="${INK}" stroke-width="5"/><circle r="70" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/><path d="M 0 0 L ${f1(Math.sin(a) * 50)} ${f1(-Math.cos(a) * 50)}" stroke="#d9493f" stroke-width="8" stroke-linecap="round"/><circle r="8" fill="${INK}"/></g>`;
}
export function target(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="70" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/><circle r="46" fill="#d9493f" stroke="${INK}" stroke-width="5"/><circle r="24" fill="#fbf8ef" stroke="${INK}" stroke-width="5"/><circle r="8" fill="${INK}"/></g>`;
}
export function lines(x, y, arr, size, col, p = 1) {
  if (p <= 0) return '';
  return `<g opacity="${op(cl(p * 2))}">${arr.map((l, i) => T(x, y + i * size * 1.18, l, size, { fill: col, stroke: INK, sw: 9 })).join('')}</g>`;
}
