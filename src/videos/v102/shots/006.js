// L2b 12.2–13.96: close-up of du's face in the dark, lit cold blue by the laptop; eyes wide, pupils follow the series
// (flicker of the screen light) — "weil die Serie so spannend war".
import { frame, cam, prog, eio, person } from './lib.js';
import { bedroom2 } from './sets.js';
import { tint, laptopBack } from './base.js';
import { farbeBar, colourAt } from './common.js';
export default function renderShot(t) {
  let s = bedroom2(t, { strong: true }) + tint('#060b1c', .6);
  const lx = Math.sin(t * 3.1) * 10;
  s += person('du', 520, 2100, 1.75, { t, seed: 1, eyes: 'wide', look: [lx, 12], brows: t > 12.9 ? 'up' : 'calm', mouth: t > 12.95 ? 'o' : 'small', rim: '#7fc4ff', rimL: '#7fc4ff' });
  s += laptopBack(540, 1900, 1.3, t, 1.3);
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 12.2, 13.96)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
