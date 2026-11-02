// L5 16.3–20.04 and in du's own head: "Ich will mich einfach nicht allein fühlen." — du looks down.
import { K, frame, person, thought, cam, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const down = eio(prog(t, 17.4, 17.9));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, eyes: down > .5 ? 'sad' : 'n', mouth: down > .5 ? 'sad' : 'flat', look: [6, 10 * down], headDy: 10 * down });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: 'sad', mouth: 'flat', look: [-12, 6], a: .85 });
  s += thought(380, 560, ['Ich will mich einfach', 'nicht allein fühlen.'], DU + 20, 800, { p: pop(t, 17.38, .45) });
  return frame(cam(s, 420, 1000, 1.03 + .07 * eio(prog(t, 16.3, 17.2))));
}
