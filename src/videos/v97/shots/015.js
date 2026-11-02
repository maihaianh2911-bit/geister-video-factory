// L7b 38.60–41.26: close-up du: doubts pop up — "Peinlich?" (39.02) left, "Egal?" (40.30) right; du's eyes follow.
import { frame, cam, pop, prog, eio, person, thought } from './lib.js';
import { room } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 30, strong: true });
  const lk = t < 40.2 ? [-14, -10] : [14, -10];
  s += person('du', 540, 2260, 1.6, { t, seed: 3, look: t < 39.0 ? [0, 6] : lk, brows: 'worried', mouth: 'wavy', notes: duNotes(t) });
  s += thought(300, 420, ['Peinlich?'], 400, 720, { p: pop(t, 39.02, .4), size: 68 });
  s += thought(780, 560, ['Egal?'], 690, 800, { p: pop(t, 40.3, .4), size: 68 });
  return frame(cam(s, 540, 1050, 1 + .06 * eio(prog(t, 38.6, 41.26))));
}
