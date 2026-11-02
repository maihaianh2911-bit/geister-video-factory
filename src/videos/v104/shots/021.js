// L13 65.68–70.66: du's room in the morning; two wall calendars: 3 WOCHEN (21 days) and 2 MONATE (66 days); on "nicht mit drei Wochen" (68.5)
// the small one is crossed out, on "zwei Monaten" (69.96) the big one gets a green frame; du points at it.
import { K, frame, cam, prog, eio, pop, person, shadow, f1 } from './lib.js';
import { room } from './sets.js';
import { calendar } from './common.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'day', hh: 8, mm: 0, sofa: true });
  const sh = Math.min(21, Math.floor(prog(t, 65.9, 67.4) * 21)), sh2 = Math.min(66, Math.floor(prog(t, 66.2, 68.0) * 66));
  s += `<g transform="translate(70 380)">${calendar(0, 0, 400, '3 WOCHEN', 21, { shown: sh })}</g>`;
  s += `<g transform="translate(520 300)">${calendar(0, 0, 500, '2 MONATE', 66, { cols: 11, shown: sh2, head: '#3c9a5f' })}</g>`;
  const x = eio(prog(t, 68.5, 68.9));
  if (x > 0) s += `<path d="M 80 400 L ${f1(80 + 380 * Math.min(1, x * 2))} ${f1(400 + 420 * Math.min(1, x * 2))}" stroke="#d9493f" stroke-width="22" stroke-linecap="round"/>` + (x > .5 ? `<path d="M 460 400 L ${f1(460 - 380 * (x - .5) * 2)} ${f1(400 + 420 * (x - .5) * 2)}" stroke="#d9493f" stroke-width="22" stroke-linecap="round"/>` : '');
  const gr = eio(prog(t, 69.96, 70.3));
  if (gr > 0) s += `<rect x="500" y="280" width="540" height="${f1(560)}" rx="24" fill="none" stroke="${K.green}" stroke-width="14" opacity="${gr.toFixed(2)}"/>`;
  const pt = eio(prog(t, 69.7, 70.1));
  s += shadow(330, 1650) + person('du', 330, 1650, 1.0, { t, seed: 1, look: [14, -12], brows: 'calm', mouth: pt > .5 ? 'smile' : 'small', armR: [170 + 160 * pt, -420 - 330 * pt], elbowR: [230, -420 - 150 * pt] });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 65.68, 70.66))));
}
