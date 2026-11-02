// L14b 78.20–80.16: closer: du tells the mother nobody cooks as well as she does ("niemand" 78.40); the last note peels off (79.10) and flies away glowing.
import { frame, cam, prog, eio, person, phone, peelNote } from './lib.js';
import { room } from './sets.js';
import { duNotes, N3 } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 30, strong: true });
  const X = 520, Y = 2050, S = 1.35;
  const talk = t < 79.7 && Math.sin(t * 11) > 0 ? 'talk' : 'smile';
  s += person('du', X, Y, S, { t, seed: 3, look: [10, -6], eyes: t > 79.7 ? 'happy' : 'n', brows: 'up', mouth: talk, armR: [160, -720], elbowR: [250, -480], holdR: phone(-20, 0, .55, 15), notes: duNotes(t) });
  s += peelNote(t, 79.1, X + N3.x * S, Y + N3.y * S, 1100, 300, S, .8, N3, 1.06, { arc: 50 });
  return frame(cam(s, 540, 1100, 1 + .06 * eio(prog(t, 78.2, 80.16))));
}
