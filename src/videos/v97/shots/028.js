// L13c 74.50–75.78: close-up du: the chest note peels off ("Noch einer fällt" 74.72) and drifts up out of frame, glowing; du smiles.
import { frame, cam, prog, eio, person, peelNote } from './lib.js';
import { room } from './sets.js';
import { duNotes, N2 } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'day', clock: false, strong: true });
  const X = 540, Y = 2080, S = 1.4;
  s += person('du', X, Y, S, { t, seed: 3, look: [8, 10], eyes: t > 75.1 ? 'happy' : 'n', brows: 'up', mouth: 'smile', notes: duNotes(t), armL: [-120, -430], elbowL: [-230, -330], holdL: '' });
  s += peelNote(t, 74.72, X + N2.x * S, Y + N2.y * S, 900, 250, S, .9, N2, 1.06, { arc: 60 });
  return frame(cam(s, 540, 1100, 1.02 + .05 * eio(prog(t, 74.5, 75.78))));
}
