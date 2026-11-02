// L14a 75.78–78.20: ABENDS, warm living room. du (one note left) calls the mother, phone at the ear; ring waves ("rufst" 76.28).
import { frame, cam, shadow, pop, prog, eio, person, dayCard, phone, f1 } from './lib.js';
import { room, fgTable } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 30 });
  const up = eio(prog(t, 75.9, 76.3));
  const X = 520, Y = 1650;
  s += shadow(X, Y) + person('du', X, Y, 1, { t, seed: 3, look: [10, -4], brows: 'up', mouth: t > 77.0 && Math.sin(t * 11) > 0 ? 'talk' : 'soft', armR: [180 - 20 * up, -420 - 300 * up], elbowR: [250, -480], holdR: phone(-20, 0, .55, 15), notes: duNotes(t) });
  const r = (t - 76.3) % .8;
  if (t > 76.3 && t < 77.9) for (let i = 0; i < 2; i++) { const rr = 40 + (r + i * .4) % .8 * 120; s += `<path d="M ${f1(X + 230 + rr * .5)} ${f1(Y - 820 - rr * .7)} a ${f1(rr)} ${f1(rr)} 0 0 1 ${f1(rr * .4)} ${f1(rr * .8)}" stroke="#ffd23f" stroke-width="8" fill="none" opacity="${f1(1 - ((r + i * .4) % .8) / .8)}"/>`; }
  s += fgTable(t, { phone: false, glass: 900, mugX: 180 });
  s = cam(s, 540, 1100, 1 + .06 * eio(prog(t, 75.78, 78.2)));
  s += dayCard(t, 75.78, 'ABENDS');
  return frame(s);
}
