// Cross-section: the body's weight presses down; the yellow nerve and the red vessel get pinched on "Nerven" — label DRUCK AUF NERVEN.
import { K, xsec, lab, prog, eio } from './lib.js';

export default function renderShot(t) {
  const press = .25 + .75 * eio(prog(t, 13.3, 13.7));
  return xsec(t, { press, flow: 1 - .4 * press, signal: 0 }) + lab('DRUCK AUF NERVEN', 540, 260, 70, prog(t, 13.44, 13.7));
}
