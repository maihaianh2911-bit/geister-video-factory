// L0a 0–3.30 hook: evening room, du with an empty backpack; title "AUFGESCHOBEN = EIN STEIN?"; "Später." thought on "aufschiebst".
import { K, frame, person, cam, thought, label, shadow, pop, prog, eio, fade } from './lib.js';
import { room, fgTable } from './sets.js';
import { DX, GY } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 5 });
  s += shadow(DX, GY);
  const look = t < 2.2 ? [10, 0] : [-14, -6];
  s += person('du', DX, GY, 1, { t, pack: { n: 0, labels: [] }, look, brows: t < 2.2 ? 'calm' : 'worried', mouth: t < 2.2 ? 'smile' : 'flat', armR: t >= 2.2 ? [230, -720 + Math.sin(t * 9) * 6] : null, elbowR: [250, -560] });
  s += thought(830, 660, ['Später.'], DX + 120, 860, { p: pop(t, 2.2, .4) });
  s += fgTable(t, { phone: 640, glass: 900, mugX: 170 });
  s = cam(s, 540, 1100, 1 + .08 * eio(prog(t, 0, 3.3)));
  s += label('AUFGESCHOBEN', 540, 230, 104, { p: pop(t, 0, .45) });
  s += label('= EIN STEIN?', 540, 360, 96, { fill: '#fff', p: pop(t, 1.38, .45) });
  return frame(s);
}
