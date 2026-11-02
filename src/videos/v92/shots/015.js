// L14 45.4–47.12 "Gedanken lesen kann niemand": du's glow switches off on "niemand".
import { K, frame, person, cam, prog, eio, eout } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const off = 1 - eio(prog(t, 46.2, 46.5));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: off > .01 ? .9 * off : 0, eyes: t > 46.5 && t < 46.75 ? 'closed' : 'n', mouth: 'flat', look: [0, -10] });
  s += person('er', ER, GY, 1, { t, seed: 2, mouth: 'flat', look: [-12, 0], a: .9 });
  return frame(cam(s, DU, 950, 1.12 - .06 * eio(prog(t, 45.4, 47.12))));
}
