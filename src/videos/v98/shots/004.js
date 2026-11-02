// L2b 8.6–10.88: medium: roommate and colleague smile at du; hearts pop over them on "mögen" (9.64).
import { K, frame, cam, shadow, person, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { heart } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 10 });
  s += shadow(230, 1640, 160) + shadow(540, 1650, 160) + shadow(860, 1640, 160);
  const h = t >= 9.6;
  s += person('room', 230, 1640, .86, { t, seed: 3, look: [14, 0], mouth: h ? 'grin' : 'smile', brows: 'calm', eyes: h ? 'happy' : 'n' });
  s += person('kol', 860, 1640, .86, { t, seed: 5, look: [-14, 0], mouth: 'smile', brows: 'calm', eyes: h ? 'happy' : 'n' });
  s += person('du', 545, 1660, .9, { t, seed: 1, look: [0, -2], mouth: 'smile', brows: 'calm' });
  s += heart(230, 720, 1.1, pop(t, 9.64, .4)) + heart(860, 720, 1.1, pop(t, 9.8, .4));
  s += fgTable(t, { mugX: 140, keys: 760 });
  return frame(cam(s, 540, 1000, 1.06 - .05 * eio(prog(t, 8.6, 10.88))));
}
