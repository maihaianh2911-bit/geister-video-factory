// L18a 72.1–74.94: medium on the sofa: du with the roommate; du's yellow question bubble with "+1" appears on "eine Frage mehr" (73.76–74.18).
import { K, frame, cam, shadow, person, prog, eio, pop, label } from './lib.js';
import { room } from './sets.js';
import { qBubble } from './base.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 30 });
  s += shadow(300, 1640) + person('room', 300, 1640, .95, { t, seed: 3, look: [14, 0], brows: 'calm', mouth: t < 73.4 && Math.sin(t * 13) > 0 ? 'talk' : 'smile' });
  s += shadow(780, 1650) + person('du', 780, 1650, .95, { t, seed: 1, look: [-14, 0], brows: 'up', mouth: 'smile' });
  s += qBubble(760, 520, [], 780, 760, { p: pop(t, 73.76, .4) });
  s += label('+1', 905, 600, 90, { p: pop(t, 74.18, .4), fill: '#ffffff' });
  s += fgTable(t, { mugX: 540 });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 72.1, 74.94))));
}
