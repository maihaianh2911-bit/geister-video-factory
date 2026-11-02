// L13a 51.34–53.5: WOCHENENDE. Warm amber evening living room, wall clock at 22:00 (clock pops a highlight on "zehn" 52.68); du yawns contentedly with his phone in his hand, ready for bed. Grey starts to lift (meter rising).
import { K, frame, cam, prog, eio, person, shadow, dayCard, phone, pop, f1 } from './lib.js';
import { room } from './sets.js';
import { fgTable, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 22, mm: 0 }) + fgTable(t, 1730, { steam: false });
  s += fadeWorld(t);
  const c = eio(prog(t, 52.6, 53.0));
  if (c > 0) s += `<circle cx="495" cy="715" r="${f1(70 + 10 * Math.sin(t * 6))}" fill="none" stroke="#ffd23f" stroke-width="10" opacity="${c.toFixed(2)}"/>`;
  const y = Math.sin(Math.PI * prog(t, 51.6, 52.5));
  s += shadow(330, 1640, 170);
  s += person('du', 330, 1640, 1, { t, seed: 1, eyes: y > .3 ? 'closed' : 'half', look: [12, -6], brows: 'calm', mouth: y > .3 ? 'o' : 'smile', armR: [150, -430], elbowR: [220, -330], front: phone(150, -470, .6, 8, '#3a5a8a') });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 51.34, 53.5)), 20);
  s += dayCard(t, 51.36, 'WOCHENENDE', { y: 330, size: 96 });
  s += bar(t);
  return frame(s);
}
