// L2a 9.84–12.2: card MONTAG. Dark blue bedroom at night (colour is back to 100 %), du sits on the bed edge,
// laptop on his knees glowing blue on his face; the digital clock on the side table shows 01:30; on "sechs Stunden" (11.14) a moon chip "6 h" pops.
import { frame, cam, prog, eio, person, shadow, dayCard } from './lib.js';
import { bedroom2 } from './sets.js';
import { bed, digiClock, sideTable, tint, laptopBack } from './base.js';
import { farbeBar, colourAt, grey, moonChip } from './common.js';
export default function renderShot(t) {
  let s = bedroom2(t, {}) + tint('#0a1226', .45);
  s += bed(1420, { w: 640 });
  s += shadow(380, 1640);
  s += person('du', 380, 1640, 1, { t, seed: 1, look: [6, 14], brows: 'up', mouth: 'small', hunch: .25, rim: '#7fc4ff',
    armL: [-60, -300], elbowL: [-190, -360], armR: [60, -300], elbowR: [190, -360] });
  s += laptopBack(380, 1360, .7, t);
  s += sideTable(860, 1360) + digiClock(860, 1352, '01:30');
  s += grey(1 - colourAt(t));
  s = cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 9.84, 12.2)));
  s += dayCard(t, 9.9, 'MONTAG', { y: 330 });
  s += moonChip(780, 560, '6 h', eio(prog(t, 11.14, 11.5)) * 1.0);
  s += farbeBar(colourAt(t));
  return frame(s);
}
