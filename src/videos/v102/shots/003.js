// L1a 5.18–6.88: same street, closer: card NACH ZWEI WOCHEN; the colour drains completely until "grau" (6.46); du keeps walking.
import { frame, cam, prog, eio, person, shadow, label, pop } from './lib.js';
import { street } from './sets2.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = street(t, {});
  s += grey(1 - colourAt(t));
  const x = 400 + 120 * eio(prog(t, 5.18, 6.88));
  s += shadow(x, 1660, 190);
  s += person('du', x, 1660, 1.0, { t, seed: 1, walk: t * 1.6, look: [12, -6], mouth: 'small' });
  s = cam(s, 540, 1100, 1.1 + .05 * eio(prog(t, 5.18, 6.88)));
  s += label('NACH ZWEI WOCHEN', 540, 330, 88, { p: pop(t, 5.3, .45) });
  s += farbeBar(colourAt(t));
  return frame(s);
}
