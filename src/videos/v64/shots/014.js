// 28.58–29.72: the carriage is full — cutaway of the cabin: passengers on both benches, Tuffi standing in the middle
import { K, DEFS, interior, tuffi, grain, cam, prog, eio, lerp } from './lib.js';
import { crowd } from './cabin.js';
export default function renderShot(t) {
  const sc = `${interior(t)}${crowd(t, 1260, 0)}${tuffi(520, 1262, 1.05, { ear: .3, tr: .15 + .08 * Math.sin(t * 3) })}`;
  return `${DEFS}${cam(sc, lerp(1.08, 1.0, eio(prog(t, 28.58, 29.72))), 540, 950)}${grain(t)}`;
}
