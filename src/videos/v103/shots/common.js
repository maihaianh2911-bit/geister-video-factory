// v103 shared shot helpers: talking mouth, the old self with cane, seated pair behind a coffee table.
import { K, f1, op, cl, prog, eio, person, shadow } from './lib.js';
import { cane } from './sets3.js';
const INK = K.ink;
// mouth that opens/closes while speaking in [a,b)
export const talk = (t, a, b, rest = 'smile') => (t >= a && t < b && Math.sin((t - a) * 17) > -.2) ? 'talk' : rest;
// old du standing: feet (x,y), scale s; cane in the screen-right hand
export function old(t, x, y, s, o = {}) {
  const hunch = o.hunch === undefined ? .3 : o.hunch;
  const hand = o.armR || [175, -330];
  let g = shadow(x, y, 190 * s, o.a === undefined ? 1 : o.a);
  g += person('old', x, y, s, { t, seed: 7, hunch, ...o, armR: hand, elbowR: o.elbowR || [190, -440] });
  if (o.cane !== false) g += `<g opacity="${op(o.a === undefined ? 1 : o.a)}">${cane(x + s * hand[0], y + s * hand[1], y - 4, s * 10)}</g>`;
  return g;
}
// low coffee table (sharp foreground) spanning x0..x1 at top y, hides seated legs
export function coffeeTable(t, x0, x1, y, o = {}) {
  let s = `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${2000 - y}" rx="18" fill="#7a5038" stroke="${INK}" stroke-width="6"/><rect x="${x0}" y="${y}" width="${x1 - x0}" height="28" rx="10" fill="#9a6a4c" stroke="${INK}" stroke-width="5"/>`;
  if (o.cups !== false) {
    for (const [cx, c] of (o.cups || [[x0 + 120, '#f2efe8'], [x1 - 140, '#e0b04a']])) {
      s += `<g transform="translate(${cx} ${y + 4})"><path d="M -36 -80 L 36 -80 L 30 0 L -30 0 Z" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M 34 -62 C 64 -62 64 -18 32 -18" fill="none" stroke="${INK}" stroke-width="6"/>${[0, 1].map(i => { const p = (t * .5 + i * .5) % 1; return `<path d="M ${-10 + i * 22} ${f1(-90 - p * 40)} c -8 -14 8 -22 0 -40" stroke="#fff" stroke-width="5" fill="none" opacity="${op(.55 * Math.sin(p * Math.PI))}" stroke-linecap="round"/>`; }).join('')}</g>`;
    }
  }
  if (o.book) s += `<g transform="translate(${o.book} ${y + 2})"><rect x="-80" y="-30" width="160" height="30" rx="4" fill="#3e5476" stroke="${INK}" stroke-width="4"/><rect x="-74" y="-26" width="12" height="22" fill="#fbf7ea"/></g>`;
  return s;
}
