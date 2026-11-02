// L8b 38.02–40.2: close-up of the researcher (glasses, lab coat) in the lecture hall, hand to the chin; thought bubble "Wie viele Sorgen treffen ein?" pops on "Sorgen" (38.42).
import { K, frame, cam, prog, eio, pop, person, thought } from './lib.js';
import { hall } from './sets.js';
export default function renderShot(t) {
  let s = hall(t, { strong: true });
  const up = eio(prog(t, 38.05, 38.4));
  s += person('res2', 400, 2230, 1.7, { t, seed: 5, look: [12, -10], brows: 'up', mouth: 'flat', armR: [40, -560 + 160 * (1 - up)], elbowR: [200, -420], rim: '#fff3c4' });
  s += thought(690, 420, ['Wie viele Sorgen', 'treffen ein?'], 560, 640, { p: pop(t, 38.42, .4), size: 54 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 38.02, 40.2))));
}
