// L14a 67.1–69.78: card SONNTAG; close-up of the jar on the nightstand, full of lights, shining brightly ("so hell" 69.24) with a big warm-orange glow.
import { K, frame, cam, prog, eio, pop, label } from './lib.js';
import { bedroom, nightstand } from './base.js';
import { jar } from './jar.js';
export default function renderShot(t) {
  const g = eio(prog(t, 67.6, 69.3));
  let s = bedroom(t, { light: .7 + .3 * g, strong: true });
  s += nightstand(t, 540, 1360);
  s += jar(540, 1360, 1.7, { t, n: 34, glow: .6 + .4 * g });
  s = cam(s, 540, 1050, 1.0 + .07 * eio(prog(t, 67.1, 69.78)));
  s += label('SONNTAG', 540, 250, 120, { p: pop(t, 67.15, .45) });
  return frame(s);
}
