// L3b 13.72–16.08: close-up of du in the cold blue light; thinking about the day, brows sink and the eyes drop on "schiefgelaufen" (14.86).
import { K, frame, cam, prog, eio, person } from './lib.js';
import { bedroom } from './base.js';
export default function renderShot(t) {
  let s = bedroom(t, { light: 0, strong: true });
  const b = eio(prog(t, 14.7, 15.1));
  s += person('du', 540, 2230, 1.75, { t, seed: 1, look: [b * -8, 4 + 10 * b], brows: b > .5 ? 'sad' : 'worried', mouth: b > .5 ? 'frown' : 'flat', rimL: '#8fb0e8', hunch: .2 * b });
  return frame(cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 13.72, 16.08))));
}
