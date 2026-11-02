// L6b 24.3–26.32: close-up roommate, worried: thought bubble "Prüfung…" with an exam sheet on "Angst vor der Prüfung" (24.78 / 25.44); his bubble glows warmer.
import { K, frame, cam, prog, eio, pop, person, thought, paper, T } from './lib.js';
import { kitchen } from './sets.js';
import { pool } from './lib.js';
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  s += pool(520, 900, 520, 520, '#ffc46b', .25 * prog(t, 24.3, 26));
  s += person('room', 520, 2180, 1.7, { t, seed: 3, eyes: 'n', brows: 'worried', mouth: t < 25.6 && Math.sin(t * 13) > 0 ? 'talk' : 'frown', look: [-6, -10], headTilt: -4 });
  s += thought(560, 330, ['Prüfung …'], 560, 560, { p: pop(t, 25.3, .45), size: 64 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 24.3, 26.32))));
}
