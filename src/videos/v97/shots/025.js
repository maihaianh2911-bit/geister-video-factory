// L12b 68.50–70.10: medium: the shoulder note peels off du ("Zettel fällt ab" 68.84), flies to the smiling colleague and turns into a warm sparkle at her face.
import { frame, cam, shadow, prog, eio, person, peelNote, sparkle, mug } from './lib.js';
import { openOffice } from './sets.js';
import { duNotes, N1 } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { mood: 'sun', hh: 9, mm: 20 });
  const X = 340, Y = 1660;
  s += shadow(X, Y) + person('du', X, Y, 1, { t, seed: 3, look: [14, -6], brows: 'up', mouth: 'smile', notes: duNotes(t) });
  s += shadow(780, 1660) + person('kol', 780, 1660, 1, { t, seed: 4, look: [-12, 0], eyes: 'happy', blush: .8, mouth: 'smile', armL: [-60, -420], elbowL: [-180, -360], holdL: mug(0, 40, .6, '#f2efe8', t) });
  s += peelNote(t, 68.84, X + N1.x, Y + N1.y, 760, 950, 1, .6, N1, .75, { arc: 140 });
  s += sparkle(770, 940, prog(t, 69.55, 70.1), 1.1);
  return frame(cam(s, 540, 1100, 1.06 + .04 * eio(prog(t, 68.5, 70.1))));
}
