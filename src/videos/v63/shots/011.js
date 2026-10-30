// 20.4–22.1: next to it two bronze swords (Schwerter)
import { K, DEFS, disc, grain, cam, prog, eout, back, lerp } from './lib.js';
import { soilBg } from './soil.js';
import { sword } from './finds.js';
export default function renderShot(t) {
  const s1 = back(prog(t, 20.9, 21.2)), s2 = back(prog(t, 21.2, 21.5));
  return `${DEFS}${cam(soilBg(5) + disc(290, 640, 170, { id: 'k', damage: true, dirt: .1 }) + `<g opacity="${s1}">${sword(640, 1160, 18, 1)}</g><g opacity="${s2}">${sword(860, 1200, 8, .95)}</g>`, 1, 540, 900)}${grain(t)}`;
}
