// L19a 78.90–82.90: kitchen by the fridge: du, light and upright without the bag, holds up a long to-do list; a red X crosses it on "nicht noch mehr" (81.2).
import { K, frame, person, cam, shadow, paper, label, prog, eio, pop, f1 } from './lib.js';
import { kitchen } from './sets.js';
export default function renderShot(t) {
  let s = kitchen(t);
  const lift = eio(prog(t, 80.3, 80.8));
  s += shadow(470, 1640);
  s += person('du', 470, 1640, 1, { t, look: [14, -10], brows: 'calm', mouth: 'smile', armR: [230, -560 - 140 * lift], elbowR: [270, -420] });
  // long to-do list held up
  const lx = 750, ly = 900 - 100 * lift;
  let inner = '';
  for (let i = 0; i < 9; i++) inner += `<rect x="-90" y="${-250 + i * 58}" width="${150 - (i * 37) % 60}" height="14" rx="7" fill="#7b8aa0"/><rect x="-118" y="${-254 + i * 58}" width="20" height="20" rx="4" fill="none" stroke="#7b8aa0" stroke-width="4"/>`;
  s += paper(lx, ly, 280, 600, 4, inner, { lines: false });
  const x = eio(prog(t, 81.2, 81.5)), x2 = eio(prog(t, 81.4, 81.7));
  s += `<path d="M ${lx - 140} ${ly - 280} L ${f1(lx - 140 + 280 * x)} ${f1(ly - 280 + 560 * x)}" stroke="${K.red}" stroke-width="26" stroke-linecap="round" opacity="${x > 0 ? 1 : 0}"/><path d="M ${lx + 140} ${ly - 280} L ${f1(lx + 140 - 280 * x2)} ${f1(ly - 280 + 560 * x2)}" stroke="${K.red}" stroke-width="26" stroke-linecap="round" opacity="${x2 > 0 ? 1 : 0}"/>`;
  s += `<rect x="-60" y="1740" width="1200" height="260" fill="#c99a62" stroke="${K.ink}" stroke-width="5"/>`;
  s = cam(s, 540, 1100, 1.02 + .06 * eio(prog(t, 78.9, 82.9)), -20 * prog(t, 78.9, 82.9), 0);
  s += label('NICHT NOCH MEHR', 540, 250, 84, { p: pop(t, 81.2, .4) });
  s += label('AUFGABEN', 540, 360, 84, { fill: '#fff', p: pop(t, 81.84, .4) });
  return frame(s);
}
