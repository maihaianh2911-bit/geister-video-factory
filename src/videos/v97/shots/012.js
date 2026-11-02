// L6a 31.08–33.60: ABENDS. Warm dining room: the mother (short hair, red apron) brings the steaming favourite dish and sets it down ("Lieblingsessen" 32.22).
import { frame, cam, shadow, pop, prog, eio, person, dayCard, dish, phone } from './lib.js';
import { dining, diningTable } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = dining(t);
  const w = eio(prog(t, 31.1, 32.0)), down = eio(prog(t, 32.0, 32.5));
  const MX = 140 + 200 * w;
  s += shadow(MX, 1640) + person('mama', MX, 1640, 1, { t, seed: 5, look: [14, 10], mouth: 'smile', brows: 'calm', walk: w < 1 ? t * 1.6 : undefined, armL: [60 + 60 * down, -470 + 60 * down], elbowL: [-60, -380], armR: [180 + 60 * down, -470 + 60 * down], elbowR: [210, -400] });
  // du seated at the right, looking down at the phone
  s += person('du', 790, 1700, .95, { t, seed: 8, look: [-6, 14], mouth: 'flat', armR: [-40, -470], elbowR: [120, -380], holdR: phone(0, -30, .55, -8, '#8fb8ff'), notes: duNotes(t) });
  s += diningTable(t, { y: 1250, glassX: 960 });
  s += dish(MX + 120 + 60 * down, 1640 - 470 + 60 * down + 30, 1, t);
  s = cam(s, 540, 1050, .98 + .07 * eio(prog(t, 31.08, 33.6)));
  s += dayCard(t, 31.08, 'ABENDS');
  return frame(s);
}
