// 4.42–6.0: recovered via a hotel in Basel — night facade, the sign lights up
import { K, DEFS, hotel, grain, cam, prog, eout, lerp } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${cam(hotel(t, { sign: eout(prog(t, 4.45, 4.8)) }), lerp(1, 1.08, eout(prog(t, 4.42, 6))), 540, 900)}${grain(t)}`;
}
