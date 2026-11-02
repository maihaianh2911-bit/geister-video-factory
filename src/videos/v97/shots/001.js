// L0a 0–3.30: hook, evening living room. du looks at the viewer; yellow notes fly in and stick (1.5 / 2.5 / 3.05).
// Labels "JEDES KOMPLIMENT" (1.22) and "– NICHT GESAGT?" (2.38).
import { frame, cam, label, shadow, pop, prog, eio, person } from './lib.js';
import { room, fgTable } from './sets.js';
import { coverAt } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false });
  const X = 560, Y = 1640;
  const c = coverAt(t, X, Y, 1, 1.5, 3.05, 0, 3);
  const hit = c.on.length;
  s += shadow(X, Y) + person('du', X, Y, 1, { t, look: hit ? [10, 10] : [0, 0], eyes: hit ? 'wide' : 'n', brows: hit ? 'up' : 'calm', mouth: hit > 1 ? 'o' : 'flat', notes: c.on });
  s += c.fly;
  s += fgTable(t, { phone: 640, glass: 900, mugX: 170 });
  s = cam(s, 540, 1100, 1 + .08 * eio(prog(t, 0, 3.3)));
  s += label('JEDES KOMPLIMENT', 540, 240, 84, { p: pop(t, 1.22, .45) });
  s += label('– NICHT GESAGT?', 540, 350, 76, { fill: '#fff', p: pop(t, 2.38, .45) });
  return frame(s);
}
