// L15b 61.72–64.22: meeting room again: with the speaker now small and green, du raises her hand with courage on "Mut" (62.4); the colleague nods; chip "NOCH EINMAL" (63.1).
import { K, frame, cam, person, chip, prog, eio, pop } from './lib.js';
import { meeting, meetingTable } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = meeting(t);
  const up = eio(prog(t, 62.2, 62.7));
  s += person('coll', 220, 1600, .9, { t, seed: 2, look: [16, 0], mouth: up > .5 ? 'smile' : 'flat', brows: 'calm', headTilt: up > .5 ? Math.sin(t * 6) * 4 : 0 });
  s += duSp(600, 1640, 1.0, { t, look: [-8, -10], brows: 'calm', mouth: up > .5 ? 'smile' : 'small', armR: [150 + 20 * up, -560 - 280 * up], elbowR: [230, -480 - 70 * up] }, { ...GREEN, talk: 0, p: .75 });
  s += meetingTable(1380);
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 61.72, 64.22)), -20 * prog(t, 61.72, 64.22), 0);
  s += `<g transform="translate(540 260) scale(${Math.max(.01, pop(t, 63.1, .4))})">${chip(0, 0, 'NOCH EINMAL', { size: 60, bg: '#7fe0a0' })}</g>`;
  return frame(s);
}
