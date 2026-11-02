// L12a 51.34–53.28: card WOCHENENDE. Warm lamp-lit bedroom; du walks to the bed; the clock on the side table switches 21:59 → 22:00 on "zehn" (52.68).
import { frame, cam, prog, eio, person, shadow, dayCard } from './lib.js';
import { bedroom2 } from './sets.js';
import { bed, digiClock, sideTable, tint } from './base.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = bedroom2(t, {});
  s += bed(1420, { w: 620 });
  s += grey(1 - colourAt(t)) + tint('#ff9a3c', .16);
  const p = eio(prog(t, 51.4, 53.0));
  const x = 640 - 220 * p;
  s += shadow(x, 1650);
  s += person('du', x, 1650, 1, { t, seed: 1, walk: p < 1 ? t * 1.7 : undefined, look: [-12, 4], eyes: t > 52.8 ? 'half' : 'n', mouth: 'small', flip: true });
  s += sideTable(860, 1360) + digiClock(860, 1352, t < 52.68 ? '21:59' : '22:00', { col: '#ffb347' });
  s = cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 51.34, 53.28)));
  s += dayCard(t, 51.4, 'WOCHENENDE', { y: 330 });
  s += farbeBar(colourAt(t));
  return frame(s);
}
