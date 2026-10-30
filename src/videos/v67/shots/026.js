// 65.84–67.9: two magnifiers side by side — FRISCH full of CO2, ABGESTANDEN sparse; more leaves it on "verloren"
import { K, OL, f1, TX, co2, lens, prog, eio, eout, lerp, hash } from './lib.js';
export function lensMol(cx, cy, n, seed, t, leave = 0) {
  let s = '';
  for (let i = 0; i < n; i++) { const x = cx + (hash(i * 3.1 + seed) - .5) * 300, y0 = cy + (hash(i * 7.3 + seed) - .5) * 300; const gone = i < leave * n ? eio(prog(t, 67.1 + i * .05, 67.8 + i * .05)) : 0; s += co2(x + Math.sin(t * 1.5 + i) * 4, y0 - gone * 400, 18, 1 - gone); }
  return s;
}
export default function renderShot(t) {
  const a = eout(prog(t, 65.84, 66.3));
  const L = lens(290, 800, 220, `<rect x="0" y="500" width="600" height="700" fill="${K.cola}"/>${lensMol(290, 800, 26, 1, t)}`, 'l26a', { handle: false });
  const R = lens(790, 800, 220, `<rect x="500" y="500" width="600" height="700" fill="${K.cola}"/>${lensMol(790, 800, 7, 2, t, .45)}`, 'l26b', { handle: false });
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.bg}"/><g opacity="${a.toFixed(3)}">${L}${R}
    ${TX('FRISCH', 290, 500, 76, K.teal)}${TX('ABGESTANDEN', 790, 500, 62, K.grey)}</g>`;
}
