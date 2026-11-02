// L4a 17.96–20.50: meeting room: colleagues at the long table; du raises her hand to say something on "sagen" (18.98).
import { K, frame, cam, person, dayCard, chip, prog, eio, pop } from './lib.js';
import { meeting, meetingTable } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = meeting(t);
  const up = eio(prog(t, 18.7, 19.2));
  s += person('stu2', 920, 1560, .82, { t, seed: 7, look: [-14, 0], mouth: 'flat' });
  s += person('coll', 140, 1580, .86, { t, seed: 2, look: [14, 0], mouth: 'flat' });
  s += duSp(530, 1640, 1.0, { t, look: [-6, -8], brows: 'up', mouth: up > .5 ? 'small' : 'flat', armR: [150 + 20 * up, -560 - 260 * up], elbowR: [230, -480 - 60 * up] }, { talk: 0 });
  s += meetingTable(1380);
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 17.96, 20.5)), 30 * prog(t, 17.96, 20.5), 0);
  s += `<g transform="translate(540 250) scale(${Math.max(.01, pop(t, 18.12, .4))})">${chip(0, 0, 'IM MEETING', { size: 56, bg: K.yellow })}</g>`;
  return frame(s);
}
