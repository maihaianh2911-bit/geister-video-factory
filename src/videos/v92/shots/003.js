// L2 6.9–9.98 SAMSTAGABEND: du points at the pile of dishes and says "Du hilfst ja nie im Haushalt."
import { K, frame, person, speech, dayCard, cam, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const point = eio(prog(t, 7.6, 7.95));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, brows: 'mean', mouth: t > 8.2 ? 'o' : 'flat', look: [12, 4], armR: point > .02 ? [80 + 90 * point, -240 - 60 * point] : null });
  s += person('er', ER, GY, 1, { t, seed: 2, mouth: 'flat', look: [-12, 0], eyes: t > 9.3 ? 'wide' : 'n' });
  s += speech(400, 640, ['Du hilfst ja nie', 'im Haushalt.'], DU + 20, 800, { p: pop(t, 8.24, .4) });
  s += dayCard(t, 6.9, 'SAMSTAGABEND', { size: 100 });
  return frame(cam(s, 540, 1000, 1 + .04 * eio(prog(t, 6.9, 9.98))));
}
