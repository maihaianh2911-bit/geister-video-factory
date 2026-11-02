// L10 41.4–42.94: close-up du: nods with closed smile ("fast nichts gesagt" 41.74–42.18), tiny zipper glint on the mouth.
import { K, frame, cam, prog, eio, person } from './lib.js';
import { canteen } from './sets.js';
import { nod } from './common.js';
export default function renderShot(t) {
  let s = canteen(t, { crowd: true });
  s += person('du', 540, 2160 + nod(t, 41.5, 42.6), 1.7, { t, seed: 1, look: [-10, 4], brows: 'calm', mouth: 'small', eyes: 'happy', zip: t > 41.9 ? .6 : 0 });
  return frame(cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 41.4, 42.94))));
}
