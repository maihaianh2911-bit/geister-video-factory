// L15 47.12–50.18 say the wish instead of the reproach: a blue heart bubble appears ("Wunsch"), the red reproach bubble is crossed out ("statt des Vorwurfs").
import { K, frame, person, speech, heart, cam, prog, eio, eout, pop, f1 } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  s += person('du', DU, GY, 1, { t, seed: 1, mouth: t > 47.9 ? 'smile' : 'flat', look: [12, 0], armR: t > 47.9 ? [120, -300] : null });
  s += person('er', ER, GY, 1, { t, seed: 2, mouth: 'flat', look: [-12, 0], eyes: t > 48.4 ? 'n' : 'sad' });
  // red reproach bubble (zigzag) on the right, crossed out on "statt"
  const r = pop(t, 47.2, .35), x = eio(prog(t, 48.76, 49.1));
  if (r > 0) {
    s += `<g opacity="${f1((1 - .5 * x) * 100) / 100}">${speech(770, 470, ['        '], DU + 40, 790, { p: r, size: 60 })}<path transform="translate(770 470)" d="M -80 0 l 26 -26 l 26 26 l 26 -26 l 26 26 l 26 -26 l 26 26" stroke="${K.red}" stroke-width="10" fill="none" stroke-linejoin="round"/></g>`;
    if (x > 0) s += `<path d="M 650 400 L ${f1(650 + 240 * x)} ${f1(400 + 140 * x)}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`;
  }
  const b = pop(t, 47.92, .4);
  if (b > 0) s += speech(330, 620, ['        '], DU + 20, 800, { p: b, size: 60 }) + `<g opacity="${f1(Math.min(1, b) * 100) / 100}">${heart(330, 632, 1.3, '#3f8fd8')}</g>`;
  return frame(cam(s, 540, 1000, 1.03));
}
