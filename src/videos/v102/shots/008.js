// L4a 18.0–19.82: card MITTWOCH. Grey-blue dawn bedroom, du lies in bed; the alarm clock 06:30 rings (18.5),
// du opens tired eyes; on "sechs Stunden" (18.7) the moon chip "6 h" pops again and the meter falls to 50 %.
import { frame, cam, prog, eio, dayCard } from './lib.js';
import { bedroom2, bedDu } from './sets.js';
import { digiClock, sideTable } from './base.js';
import { farbeBar, colourAt, grey, moonChip } from './common.js';
export default function renderShot(t) {
  let s = bedroom2(t, { dawn: .4 });
  const ring = t > 18.45 && t < 19.4 ? 1 : 0;
  const awake = t > 18.75;
  s += bedDu(t, { hx: 330, hy: 1050, eyes: awake ? 'tired' : 'closed', brows: awake ? 'sad' : 'calm', mouth: awake ? 'frown' : 'small', look: [16, -4] });
  s += sideTable(780, 1180) + digiClock(780, 1172, '06:30', { ring, t });
  s += grey(1 - colourAt(t));
  s = cam(s, 540, 1050, 1.04 + .06 * eio(prog(t, 18.0, 19.82)));
  s += dayCard(t, 18.05, 'MITTWOCH', { y: 330 });
  s += moonChip(760, 600, '6 h', eio(prog(t, 18.7, 19.05)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
