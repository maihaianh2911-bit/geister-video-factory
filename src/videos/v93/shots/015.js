// L9b 36.3–39.5 Medium close on the old woman: she looks into her almost empty purse; her bubble rises on "Blase" (36.3),
// text „Hoffentlich reicht es noch bis Freitag.“ from "Hoffentlich" (37.36).
import { K, frame, cam, setMarket, checkout, person, thought, pop, prog } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setMarket(t);
  s += person('oma', 540, 1860, 2.1, { t, seed: 13, tote: true, look: [0, 10], brows: 'worried', mouth: 'sad', armR: [50, -180], armL: [-40, -180], headTilt: -3 });
  s += `<path d="M 470 1500 q 0 -80 80 -80 h 40 q 80 0 80 80 z" fill="#8a5a8a" stroke="${K.ink}" stroke-width="6"/>`;
  s += checkout(1500, { items: false, tx: 960 });
  s += thought(540, 380, ['Hoffentlich reicht es', 'noch bis Freitag.'], 560, 680, { p: pop(t, 36.3, .45), size: 58, w: 780, h: 230, text: prog(t, 37.36, 38.7) });
  return frame(cam(s, 540, 1000, push(t, 36.3, 39.5, 1.0, 1.08)), { tint: ['#8a7a99', .06] });
}
