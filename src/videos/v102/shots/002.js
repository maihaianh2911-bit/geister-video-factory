// L1b 2.86–5.18: wider view of the same street; on "Farbe verlieren" (3.6–4.7) the colour drains out of the whole street (saturation overlay rises to .42), the FARBE meter drops to 58 %. du stays in colour and looks around puzzled.
import { frame, cam, prog, eio, person, shadow } from './lib.js';
import { street } from './sets2.js';
import { fgTable, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = street(t) + fgTable(t, 1720, { col: '#7d8a6a', hi: '#93a07c' });
  s += fadeWorld(t);
  const p = prog(t, 3.6, 4.7);
  s += shadow(420, 1640, 170);
  s += person('du', 420, 1640, .9, { t, seed: 1, look: p > .2 ? [-14 + 28 * eio(prog(t, 4.0, 4.6)), -10] : [8, -4], brows: p > .3 ? 'up' : 'calm', mouth: p > .3 ? 'o' : 'smile' });
  s = cam(s, 540, 1000, 1.08 - .06 * eio(prog(t, 2.86, 5.18)), 40 * eio(prog(t, 2.86, 5.18)));
  s += bar(t);
  return frame(s);
}
