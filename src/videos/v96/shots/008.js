// L4b 16.6–19.5: medium bed shot: clock jumps 06:32 → 06:52 on "Zwanzig Minuten" (16.74–17.4); du still lying with the phone; sand keeps running.
import { K, frame, cam, prog, eio, chip, pop, cl } from './lib.js';
import { bedroom2, bedDu, nightstand } from './sets.js';
import { hourglass, gphone, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = bedroom2(t, { dawn: .7 });
  const roll = cl(prog(t, 16.74, 17.4)), mm = Math.round(32 + 20 * eio(roll));
  s += bedDu(t, { hx: 360, hy: 1040, eyes: 'tired', look: [14, -10], brows: 'calm', mouth: 'flat', arm: [620, 840], phone: (x, y) => gphone(x, y - 40, .9, -12, { id: 'p8', scroll: t * 40 }) });
  s += screenGlow(440, 1000, 240, .35);
  s += nightstand(t, 760, 1380, { txt: `06:${String(mm).padStart(2, '0')}` });
  s += hourglass(360, 640, .72, { t, id: 'h8' });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 16.6, 19.5)), 25 * prog(t, 16.6, 19.5));
  s += chip(560, 1180, '+20 MIN', { size: 48, bg: '#ffd23f', a: pop(t, 17.3, .4) > 0 ? 1 : 0 });
  return frame(s);
}
