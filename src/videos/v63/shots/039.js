// 75.68–78.0: the golden arcs at the rim light up (one is missing)
import { K, DEFS, BG, disc, grain, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${BG(K.brownD)}${cam(disc(540, 950, 400, { id: 'O', damage: true, arcs: eout(prog(t, 76.2, 76.6)) }), lerp(1, 1.06, eio(prog(t, 75.68, 78))), 540, 950)}${grain(t)}`;
}
