// L8a 30.78–33.36: close-up du: his own holiday bubble (beach + suitcase, "Mein Urlaub …") pops on "Urlaub" (31.88); on "Stattdessen" (33.36) it is crossed out and the zipper closes.
import { K, frame, cam, prog, eio, pop, person, T } from './lib.js';
import { canteen } from './sets.js';
import { selfBubble } from './base.js';
export default function renderShot(t) {
  let s = canteen(t, { crowd: true });
  const z = eio(prog(t, 32.9, 33.3));
  s += person('du', 560, 2160, 1.7, { t, seed: 1, look: [12, -8], brows: z > .5 ? 'up' : 'calm', mouth: 'grin', zip: z, eyes: z > .5 ? 'wide' : 'n' });
  s += selfBubble(560, 380, ['„Mein Urlaub', 'am Meer war …“'], 560, 600, { p: pop(t, 31.88, .4), strike: prog(t, 32.9, 33.3), size: 54 });
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 30.78, 33.36))));
}
