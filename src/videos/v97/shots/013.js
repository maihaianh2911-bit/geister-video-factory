// L6b 33.60–36.42: du eats while staring at the phone (blue glow); the mother's smile fades. Unspoken "Bestes Essen!" (34.20)
// collapses into the 3rd note on du's belly ("Zettel" 35.58).
import { frame, cam, shadow, pop, prog, eio, person, thought, label, sparkle, dish, phone, pool } from './lib.js';
import { dining, diningTable } from './sets.js';
import { duNotes, N3, bubbleToNote } from './base.js';
export default function renderShot(t) {
  let s = dining(t, { lampX: 640 });
  const fade = eio(prog(t, 34.6, 35.4));
  s += person('mama', 190, 1760, .85, { t, seed: 5, look: [14, 0], mouth: fade > .5 ? 'flat' : 'smile', brows: fade > .5 ? 'sad' : 'calm', armL: [-60, -330], elbowL: [-150, -420] });
  const X = 660, Y = 2060, S = 1.3;
  s += pool(X + 40, Y - 950, 300, 260, '#8fb8ff', .35);
  s += person('du', X, Y, S, { t, seed: 8, look: [-4, 14], mouth: 'flat', armR: [-30, -560], elbowR: [150, -420], holdR: phone(0, -40, .7, -12, '#8fb8ff'), notes: duNotes(t) });
  s += sparkle(X + N3.x * S, Y + N3.y * S, prog(t, 35.58, 36.1), .9);
  s += diningTable(t, { y: 1560, glass: false });
  s += dish(400, 1600, 1.05, t, .8);
  s += thought(560, 380, ['„Bestes Essen!“'], 640, 640, { p: pop(t, 34.2, .4) * (1 - eio(prog(t, 34.8, 35.05))), size: 62 });
  s += bubbleToNote(t, 34.95, 35.58, 560, 380, X + N3.x * S, Y + N3.y * S, S, N3);
  s = cam(s, 560, 1050, 1 + .05 * eio(prog(t, 33.6, 36.42)));
  s += label('3', 900, 1180, 110, { p: pop(t, 35.66, .4) });
  return frame(s);
}
