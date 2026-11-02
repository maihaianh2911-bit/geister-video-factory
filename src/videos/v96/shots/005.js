// L3a 9.54–11.12: wide bedroom at dawn, blue-grey; du asleep; card "MONTAG, 6:30" (9.54 / 10.2); alarm clock sharp in the foreground.
import { K, frame, cam, label, pop, prog, eio } from './lib.js';
import { bedroom2, bedDu, nightstand } from './sets.js';
import { hourglass } from './base.js';
export default function renderShot(t) {
  let s = bedroom2(t, { dawn: 0 });
  s += bedDu(t, { hx: 360, hy: 1040, eyes: 'closed', mouth: 'small', blink: false });
  s += hourglass(360, 640, .72, { t, id: 'h5' });
  s += nightstand(t, 760, 1380, { txt: '06:30' });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 9.54, 11.12)), -20 * prog(t, 9.54, 11.12));
  s += label('MONTAG, 6:30', 540, 260, 110, { p: pop(t, 9.6, .45) });
  return frame(s);
}
