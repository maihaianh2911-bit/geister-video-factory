// L1b 2.86–5.36: close-up: du with the zipper on the mouth; on "Fragen" (4.14) a yellow question bubble pops out.
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { room } from './sets.js';
import { qBubble } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 8, mm: 0, strong: true });
  s += person('du', 540, 2160, 1.7, { t, seed: 1, look: [10, -6], brows: 'up', zip: 1 });
  s += qBubble(720, 380, [], 640, 640, { p: pop(t, 4.1, .4) });
  return frame(cam(s, 540, 800, 1.0 + .06 * eio(prog(t, 2.86, 5.36))));
}
