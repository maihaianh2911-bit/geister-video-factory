// L7b 31.82–33.22: closer on the neighbour with his box; he asks with hopeful brows; more stacked boxes behind him slide into view on "Umzug" (32.0).
import { frame, cam, shadow, person, pop, prog, eio, eout, stairwell, box } from './all.js';
export default function renderShot(t) {
  let s = stairwell(t, { strong: true });
  const p = eout(prog(t, 31.9, 32.4));
  s += box(900 + 300 * (1 - p), 1560, 260, 200, 'KÜCHE', -2) + box(890 + 300 * (1 - p), 1360, 230, 180, 'BÜCHER', 3) + box(140 - 300 * (1 - p), 1560, 240, 190, 'BAD', 2);
  s += shadow(560, 1700, 170);
  s += person('nach', 560, 1700, 1.2, { t, seed: 9, look: [-10, 0], brows: 'up', mouth: Math.sin(t * 14) > 0 ? 'talk' : 'smile',
    armR: [150, -330], armL: [-150, -330], front: box(0, -230, 320, 230, 'UMZUG') });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 31.82, 33.22)), -20 * prog(t, 31.82, 33.22));
  return frame(s);
}
