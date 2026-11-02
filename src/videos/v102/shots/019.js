// L12a 46.8–49.22: back home in the grey evening living room: du stretches on the spot, smiling happily as if all is fine ("Dein Gefühl gewöhnt sich an die Müdigkeit"); a green "GEFÜHL: OK" chip pops at "Müdigkeit" (48.22). World ~86 % grey.
import { K, frame, cam, prog, eio, person, shadow, chip, pop, f1 } from './lib.js';
import { room } from './sets.js';
import { fgTable, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 30 }) + fgTable(t, 1730);
  s += fadeWorld(t);
  const st = Math.sin(Math.PI * prog(t, 47.0, 48.6));
  s += shadow(420, 1640, 170);
  s += person('du', 420, 1640, 1, { t, seed: 1, eyes: st > .4 ? 'happy' : 'n', look: [6, -4], brows: 'calm', mouth: 'grin', armL: [-150 - 40 * st, -560 - 260 * st], elbowL: [-250, -520 - 120 * st], armR: [150 + 40 * st, -560 - 260 * st], elbowR: [250, -520 - 120 * st] });
  const c = pop(t, 48.22, .4);
  if (c > 0) s += `<g transform="translate(780 560) scale(${f1(Math.max(.01, c) * 1000) / 1000}) translate(-780 -560)">${chip(780, 560, 'GEFÜHL: OK', { size: 46, bg: K.green, fill: '#fff' })}</g>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 46.8, 49.22)));
  s += bar(t);
  return frame(s);
}
