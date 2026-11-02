// L6a 23.84–26.06: diary close-up: "1. Kaffee" is written (24.0); a thought bubble with the steaming morning coffee pops above.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { diary } from './page.js';
import { picBubble, picCoffee } from './jar.js';
export default function renderShot(t) {
  let s = diary(t, [24.0, Infinity, Infinity], { id: 'a' });
  s += picBubble(540, 400, 420, 300, 600, 700, pop(t, 24.0, .4), picCoffee(t, 420, 300), 'k10');
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 23.84, 26.06))));
}
