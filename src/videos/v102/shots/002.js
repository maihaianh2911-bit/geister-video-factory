// L0b 2.86–5.18: wide sunny street (houses, bakery, trees, bike). du walks in from the left.
// On "Farbe verlieren" (3.6–4.6) the whole street visibly loses some colour; the FARBE meter drops to 72 %.
import { frame, cam, prog, eio, person, shadow } from './lib.js';
import { street } from './sets2.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = street(t, {});
  s += grey(1 - colourAt(t));
  const x = 120 + 260 * eio(prog(t, 2.86, 5.18));
  s += shadow(x, 1560, 160);
  s += person('du', x, 1560, .85, { t, seed: 1, walk: t * 1.6, look: [10, -4], mouth: 'small' });
  s = cam(s, 540, 1000, 1.0 + .07 * eio(prog(t, 2.86, 5.18)), -30 * eio(prog(t, 2.86, 5.18)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
