// L8 26.12–29.44 du crosses the arms ("verschränkst die Arme") and thinks "Halt mich einfach fest."
import { K, frame, person, thought, cam, prog, eio, eout, pop, lerp } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const c = eio(prog(t, 26.18, 26.6));
  // crossed arms: each hand to the opposite elbow in front of the chest
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, brows: t < 27.6 ? 'mean' : 'sad', eyes: t > 27.8 ? 'sad' : 'n', mouth: 'flat', look: [-10, 0],
    armL: c > .02 ? [lerp(-78, 46, c), lerp(-212, -240, c)] : null, armR: c > .02 ? [lerp(78, -46, c), lerp(-212, -262, c)] : null });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: 'sad', mouth: 'flat', look: [14, 0], a: .9 });
  s += thought(360, 560, 'Halt mich einfach fest.', DU + 10, 800, { p: pop(t, 27.82, .45) });
  return frame(cam(s, 420, 1000, 1.04 + .05 * eio(prog(t, 26.12, 29.44))));
}
