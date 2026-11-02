// L3 9.98–12.58 Er answers loud: "Das stimmt doch gar nicht!" — arms out, angry.
import { K, frame, person, speech, cam, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const up = eio(prog(t, 10.6, 10.9));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, brows: 'mean', mouth: 'flat', look: [12, 0], eyes: t > 11 ? 'wide' : 'n' });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: 'mean', mouth: t > 10.8 ? 'grin' : 'flat', look: [-12, 0],
    armL: up > .02 ? [-80 - 70 * up, -212 - 160 * up] : null, armR: up > .02 ? [80 + 70 * up, -212 - 160 * up] : null });
  s += speech(640, 620, ['Das stimmt doch', 'gar nicht!'], ER - 10, 800, { p: pop(t, 10.88, .35), size: 52 });
  return frame(cam(s, 600, 1000, 1.04 + .04 * eio(prog(t, 9.98, 12.58))));
}
