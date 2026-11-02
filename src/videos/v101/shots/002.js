// L1b 2.74–5.52: close-up of the jar on the nightstand; the light floats in on an arc ("Licht" 3.52) and drops into the jar ("Glas" 4.2), the jar glows warm.
import { K, frame, cam, prog, eio } from './lib.js';
import { bedroom, nightstand, jar } from './base.js';
import { flyer } from './jar.js';
export default function renderShot(t) {
  const land = eio(prog(t, 4.25, 4.7));
  let s = bedroom(t, { light: .2 + .3 * land, strong: true });
  s += nightstand(t, 540, 1360, { book: true });
  s += jar(540, 1360, 1.7, { t, n: t >= 4.25 ? 1 : 0, glow: .15 + .35 * land, pops: [4.25] });
  s += flyer(t, 3.0, 1.25, 120, 600, 540, 1100, 26, 260);
  return frame(cam(s, 540, 1000, 1.0 + .07 * eio(prog(t, 2.74, 5.52))));
}
