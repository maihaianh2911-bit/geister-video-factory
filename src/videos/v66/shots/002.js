// 3.58–7.52: you come home from the supermarket — milk, minced meat and yoghurt pop out of the bag on their words
import { K, DEFS, kitchen, person, bag, milk, meat, yog, chip, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const wk = prog(t, 3.58, 5.4), x = lerp(-80, 330, eio(wk));
  const bx = x + 150, by = 1000;
  const it = (t0) => back(prog(t, t0, t0 + .3));
  const items = `${milk(bx - 50, by - 150 - 40 * it(4.6), lerp(.2, 1, it(4.6)))}${meat(bx + 40, by - 120 - 70 * it(5.0), lerp(.2, .9, it(5.0)))}${yog(bx + 60, by - 160 - 40 * it(5.7), lerp(.2, 1, it(5.7)))}`;
  const p = person(x, 1400, 1.05, { walk: wk < 1 ? t * 7 : 0, aR: [[x + 120, 1000], [bx - 30, by - 110]], head: { look: .4 } });
  const sc = `${kitchen(t, { fridge: 0, ghost: 0 })}${p.svg}${bag(bx, by, 1, items)}`;
  return `${DEFS}${cam(sc, 1.05, 500, 900)}${chip(200, 330, 'MILCH', prog(t, 4.6, 4.8), K.cyan)}${chip(520, 250, 'HACKFLEISCH', prog(t, 5.0, 5.2), K.sun)}${chip(830, 330, 'JOGHURT', prog(t, 5.7, 5.9), K.cyan)}`;
}
