// v101 du's bedroom: blurred far layer (bedroom2), a sharp bed at the left, sharp nightstand at the right with the jar.
// light 0..1: 0 = cold dark blue evening, 1 = warm amber glow from the jar
import { K, f1, op, pool, lerp } from './lib.js';
import { bedroom2 } from './sets.js';
import { jar } from './jar.js';
const INK = K.ink;
export function bedroom(t, o = {}) {
  const L = o.light || 0;
  let s = bedroom2(t, { strong: o.strong });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0a1226" opacity="${op(.55 * (1 - L))}"/>`;
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#ff9a3c" opacity="${op(.16 * L)}"/>`;
  return s;
}
// sharp bed (side view) at left; y = mattress top
export function bed(y = 1380, o = {}) {
  return `<rect x="-80" y="${y - 260}" width="70" height="420" rx="16" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="${o.w || 640}" height="120" rx="20" fill="#e9ecf2" stroke="${INK}" stroke-width="6"/><path d="M ${(o.w || 640) - 300} ${y + 4} C ${(o.w || 640) - 200} ${y - 20} ${(o.w || 640) - 100} ${y - 20} ${(o.w || 640) - 60} ${y + 8} L ${(o.w || 640) - 60} ${y + 120} L ${(o.w || 640) - 300} ${y + 120} Z" fill="#4f7fb5" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y + 120}" width="${o.w || 640}" height="60" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/><rect x="-40" y="${y - 70}" width="230" height="80" rx="30" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/>`;
}
// sharp nightstand (top at y) with a small book; the jar stands at (jx, y)
export function nightstand(t, x, y, o = {}) {
  let s = `<rect x="${x - 190}" y="${y}" width="380" height="${1960 - y}" rx="10" fill="#7a5a48" stroke="${INK}" stroke-width="6"/><rect x="${x - 205}" y="${y - 10}" width="410" height="34" rx="8" fill="#8f6b56" stroke="${INK}" stroke-width="6"/><rect x="${x - 160}" y="${y + 90}" width="320" height="140" rx="10" fill="#6b4c3c" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="${y + 160}" r="11" fill="#c9a86a"/>`;
  if (o.book !== false) s += `<g transform="translate(${x + 120} ${y - 10})"><rect x="-60" y="-34" width="120" height="34" rx="4" fill="#2f6f8f" stroke="${INK}" stroke-width="4"/><rect x="-54" y="-30" width="10" height="26" fill="#fbf7ea"/></g>`;
  return s;
}
export { jar };
