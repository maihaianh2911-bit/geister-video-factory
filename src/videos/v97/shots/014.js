// L7a 36.42–38.60: medium, cool blue living room: du with the three notes holds a hand over the mouth ("schweigen" 36.56).
import { frame, cam, shadow, prog, eio, person } from './lib.js';
import { room, fgTable } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 30 });
  const h = eio(prog(t, 36.45, 36.85));
  s += shadow(470, 1650) + person('du', 470, 1650, 1, { t, seed: 3, look: [10, 4], brows: 'worried', mouth: 'press', armL: [-120 + 110 * h, -480 - 160 * h], elbowL: [-230, -470], notes: duNotes(t) });
  s += fgTable(t, { phone: 700, mugX: 230 });
  return frame(cam(s, 540, 1100, 1.03, -40 + 70 * eio(prog(t, 36.42, 38.6)), 0));
}
