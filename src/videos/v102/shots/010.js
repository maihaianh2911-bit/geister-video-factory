// L4c 22.26–24.14: close-up of du: half-closed tired eyes, he nods twice on "nickst" (22.52) while the colleague's faded bubble
// floats in the background; on "ohne zuzuhören" his gaze drifts away.
import { frame, cam, prog, eio, person } from './lib.js';
import { office2 } from './sets.js';
import { fogBubble } from './009.js';
import { farbeBar, colourAt, grey, nod } from './common.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s += grey(1 - colourAt(t));
  s += fogBubble(250, 430, 360, 170, 120, 600, .8);
  const n = nod(t, 22.5, 23.2, 9) + nod(t, 23.3, 23.7, 9) * .6;
  const drift = eio(prog(t, 23.0, 23.6));
  s += person('du', 600, 2110, 1.75, { t, seed: 1, eyes: 'tired', look: [-12 + 22 * drift, 4 + 6 * drift], brows: 'calm', mouth: 'flat', headDy: n });
  s = cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 22.26, 24.14)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
