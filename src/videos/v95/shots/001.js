// L0a 0–3.10: hook: evening living room, du thinking (thought bubble "…"); title "DEINE GEDANKEN – LAUT?".
import { K, frame, cam, thought, label, shadow, pop, prog, eio } from './lib.js';
import { room, fgTable } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false });
  s += shadow(560, 1640) + duSp(560, 1640, 1, { t, look: [-10, -12], brows: 'worried', mouth: 'flat', armR: [70, -610], elbowR: [230, -470] }, { hide: true });
  s += thought(800, 660, ['…'], 640, 860, { p: pop(t, 1.65, .4) });
  s += fgTable(t, { phone: 640, glass: 900, mugX: 170 });
  s = cam(s, 540, 1100, 1 + .08 * eio(prog(t, 0, 3.1)));
  s += label('DEINE GEDANKEN', 540, 230, 96, { p: pop(t, 0, .45) });
  s += label('ÜBER DICH – LAUT?', 540, 350, 84, { fill: '#fff', p: pop(t, 2.14, .45) });
  return frame(s);
}
