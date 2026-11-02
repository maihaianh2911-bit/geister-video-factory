// L11a 46.38–48.62: office: du (left) glances at the colleague; worried thought "Wird sie sauer?" pops on "Nein" (47.12).
import { frame, cam, shadow, person, pop, prog, eio, thought, office2, desk } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s += person('kol', 880, 1640, .8, { t, seed: 5, flip: true, look: [-10, 8], brows: 'calm', mouth: 'flat', legs: false, a: .95 });
  s += person('du', 340, 1760, 1.15, { t, seed: 1, look: [16, 0], brows: 'worried', mouth: 'wavy', legs: false, armR: [60, -560], elbowR: [200, -380] });
  s += desk(t, { y: 1560, monitor: false, keyboard: false, mugX: 960 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 46.38, 48.62)));
  s += thought(560, 380, 'Wird sie sauer?', 380, 720, { p: pop(t, 47.12), size: 66 });
  return frame(s);
}
