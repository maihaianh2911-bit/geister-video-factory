// 51.34–53.16: at the open neck the gas has a free path — CO2 rides out with the foam ("frei entweichen")
import { K, co2, arrow, fountain, prog, eio, eout, lerp, hash } from './lib.js';
import { NB, neckBottle, neckBG } from './005.js';
export default function renderShot(t) {
  const top = NB.y - 384 * NB.s;
  const jet = fountain(NB.x, top, 820, 1, t, { w0: 60, w1: 110, drops: 8 });
  let mol = '';
  for (let i = 0; i < 9; i++) { const ph = ((t - 51.4) * .9 + i / 9) % 1; if (t < 51.6 + i * .05) continue; mol += co2(NB.x + (hash(i) - .5) * 90 + Math.sin(ph * 6 + i) * 14, top - ph * 800, 22); }
  const a = eout(prog(t, 51.7, 52.2));
  return `${neckBG()}${neckBottle('c21', '', 330)}${jet}${mol}${arrow(840, 820, 840, lerp(820, 300, a), K.blue, 16, a > 0 ? 1 : 0)}`;
}
