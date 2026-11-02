// L12a 57.82–60.18: warm living room; the old du, bent over his cane, straightens up on "steht auf" (58.44) and walks to the right towards
// the door ("geht zur Tür", 59.04); young du stays seated behind the small table, following him with his eyes.
import { K, frame, cam, prog, eio, person, shadow } from './lib.js';
import { room } from './sets.js';
import { old, coffeeTable } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 0 });
  const up = eio(prog(t, 58.3, 58.9));
  const wk = eio(prog(t, 59.04, 60.18));
  const x = 600 + 300 * wk;
  s += old(t, x, 1640, .98, { hunch: .75 - .45 * up, headDy: 60 * (1 - up), look: wk > 0 ? [14, 0] : [-8, 4], brows: 'calm', mouth: 'smile', walk: wk > 0 && wk < 1 ? (t - 59.04) * 1.3 : undefined });
  s += person('du', 250, 1620, .98, { t, seed: 1, legs: false, look: [10 + 6 * wk, -6], brows: 'up', mouth: 'small' });
  s += coffeeTable(t, -40, 520, 1450, { cups: [[120, '#f2efe8'], [400, '#e0b04a']] });
  return frame(cam(s, 540 + 80 * wk, 1050, 1.02 + .04 * eio(prog(t, 57.82, 60.18))));
}
