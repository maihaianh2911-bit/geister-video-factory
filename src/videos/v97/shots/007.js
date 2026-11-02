// L3b 17.50–20.50: the unspoken thought collapses into a note and sticks on du's shoulder ("klebt" 18.60); du looks at the shoulder ("Schulter" 19.44).
import { frame, cam, shadow, pop, prog, eio, eout, person, thought, label, note, sparkle, K } from './lib.js';
import { meeting, meetingTable } from './sets.js';
import { N1, bubbleToNote } from './base.js';
export default function renderShot(t) {
  let s = meeting(t);
  const X = 640, Y = 1700, S = 1.15;
  const landed = t >= 18.6;
  const lk = eout(prog(t, 19.3, 19.6));
  s += person('kol', 210, 1640, .9, { t, seed: 4, look: [-14, 4], mouth: 'soft', armL: [-90, -330], elbowL: [-200, -420] });
  s += shadow(X, Y) + person('du', X, Y, S, { t, seed: 9, look: [-12 + 28 * lk, -8 + 20 * lk], headTilt: 8 * lk, brows: landed ? 'worried' : 'calm', mouth: 'press', notes: landed ? [N1] : [] });
  s += sparkle(X + N1.x * S, Y + N1.y * S, prog(t, 18.6, 19.1), .8);
  s += meetingTable(1640);
  s += thought(560, 420, ['„Das war', 'richtig gut.“'], 600, 760, { p: 1 - eio(prog(t, 17.5, 17.9)), size: 60 });
  s += bubbleToNote(t, 17.8, 18.6, 560, 420, X + N1.x * S, Y + N1.y * S, S, N1);
  s = cam(s, 600, 1100, 1.02 + .06 * eio(prog(t, 17.5, 20.5)));
  s += label('1', 870, 640, 110, { p: pop(t, 18.7, .4) });
  return frame(s);
}
