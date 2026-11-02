// L14a 62.4–64.42: close-up: du looks up at the full hourglass, sad; on "nicht die Zeit" (63.56) its glow goes out and du lowers the eyes.
import { K, frame, cam, prog, eio } from './lib.js';
import { room } from './sets.js';
import { duHG } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 55, light: .3, strong: true });
  const off = eio(prog(t, 63.5, 64.1));
  s += duHG(540, 2240, 1.7, { t, seed: 1, look: [0, -14 + 26 * off], brows: 'sad', mouth: 'frown' }, { s: .62, dy: -150, glow: .6 * (1 - off), tint: off > .5 ? '#2a3a5a' : undefined });
  return frame(cam(s, 540, 700, 1.06 - .05 * eio(prog(t, 62.4, 64.42))));
}
