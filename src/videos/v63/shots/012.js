// 22.1–23.94: … axes and arm rings appear beside them (Beile und Armreifen)
import { K, DEFS, disc, grain, cam, prog, eout, back, lerp } from './lib.js';
import { soilBg } from './soil.js';
import { sword, axe, ring } from './finds.js';
export default function renderShot(t) {
  const a = back(prog(t, 22.2, 22.5)), r = back(prog(t, 22.8, 23.1));
  return `${DEFS}${cam(soilBg(5) + disc(290, 640, 170, { id: 'l', damage: true, dirt: .1 }) + sword(640, 1160, 18, 1) + sword(860, 1200, 8, .95)
    + `<g transform="translate(250 1050) scale(${a})">${axe(0, 0, -20)}${axe(170, 40, 15)}</g><g transform="translate(400 1300) scale(${r})">${ring(-60, 0, .9)}${ring(120, 30, .8)}</g>`, lerp(1.08, 1, eout(prog(t, 22.1, 23.94))), 540, 900)}${grain(t)}`;
}
