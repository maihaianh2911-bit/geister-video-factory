// L3a 10.88–13.4: morning kitchen (sun window): card "MORGENS"; the roommate (curly hair, grey knit) yawns at the coffee machine ("Mitbewohner" 12.48); du enters right.
import { K, frame, cam, shadow, person, prog, eio, pop, label, lerp } from './lib.js';
import { kitchen } from './sets.js';
import { coffeeMachine, counterFg } from './kit.js';
export default function renderShot(t) {
  let s = kitchen(t, { fridge: true });
  s += coffeeMachine(560, 1010, .9, t);
  const yawn = t >= 12.4 && t < 13.3;
  s += shadow(330, 1640) + person('room', 330, 1640, 1, { t, seed: 3, eyes: 'tired', brows: 'sad', mouth: yawn ? 'o' : 'flat', look: [10, 6], hunch: .3 });
  const w = eio(prog(t, 10.9, 11.8));
  s += shadow(lerp(1100, 800, w), 1650, 150) + person('du', lerp(1100, 800, w), 1650, .9, { t, seed: 1, walk: w < 1 ? (t * 1.6) % 1 : undefined, look: [-14, 0], brows: 'calm', mouth: 'smile' });
  s += counterFg(t, {});
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 10.88, 13.4)));
  s += label('MORGENS', 540, 240, 110, { p: pop(t, 10.95, .45) });
  return frame(s);
}
