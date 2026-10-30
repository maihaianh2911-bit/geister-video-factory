// 68.7–71.4: the famous picture of the jump — a sepia postcard slides onto the table
import { K, DEFS, BG, postcard, grain, f1, prog, eout, lerp } from './lib.js';
import { postcardInner } from './jump.js';
export default function renderShot(t) {
  const p = eout(prog(t, 68.75, 69.4));
  return `${DEFS}${BG('#7A5A40')}${postcard(lerp(1400, 540, p), lerp(1100, 860, p), lerp(1.05, 1.15, prog(t, 69.4, 71.4)), lerp(18, -4, p), postcardInner(), 760, 540, 'w32')}${grain(t)}`;
}
