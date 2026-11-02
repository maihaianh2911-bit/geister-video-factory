// L4 15.3–19.78: two-shot: du starts "„Ich auch, ich war bis zwei Uhr wach.“" (bubble 16.26); on "Heute geht das nicht" (18.48) the bubble is crossed out red and a zipper closes du's mouth.
import { K, frame, cam, shadow, person, prog, eio, pop } from './lib.js';
import { kitchen } from './sets.js';
import { selfBubble } from './base.js';
import { coffeeMachine, counterFg } from './kit.js';
export default function renderShot(t) {
  let s = kitchen(t, { fridge: true });
  s += coffeeMachine(560, 1010, .9, t);
  const z = eio(prog(t, 18.5, 18.95));
  const talk = t >= 16.2 && t < 18.2 && Math.sin(t * 15) > 0;
  s += shadow(300, 1640) + person('room', 300, 1640, 1, { t, seed: 3, eyes: 'tired', brows: 'sad', mouth: 'flat', look: [12, 4], hunch: .3 });
  s += shadow(780, 1650) + person('du', 780, 1650, 1, { t, seed: 1, look: [-14, 0], brows: z > .5 ? 'up' : 'calm', mouth: talk ? 'talk' : 'smile', zip: z, eyes: z > .5 ? 'wide' : 'n' });
  s += selfBubble(720, 460, ['„Ich auch, ich war', 'bis zwei Uhr wach.“'], 760, 720, { p: pop(t, 16.26, .4), strike: prog(t, 18.48, 18.9), a: 1 - .5 * prog(t, 19.0, 19.7) });
  s += counterFg(t, {});
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 15.3, 19.78)), 20 * prog(t, 15.3, 19.78)));
}
