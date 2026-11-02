// L4b 19.5–20.94: close-up of the empty jar on the nightstand in cold blue light; "Das Glas bleibt leer" (20.22).
import { K, frame, cam, prog, eio } from './lib.js';
import { bedroom, nightstand, jar } from './base.js';
export default function renderShot(t) {
  let s = bedroom(t, { light: 0, strong: true });
  s += nightstand(t, 540, 1360);
  s += jar(540, 1360, 1.7, { t, n: 0, glow: 0 });
  return frame(cam(s, 540, 1050, 1.0 + .08 * eio(prog(t, 19.5, 20.94))));
}
