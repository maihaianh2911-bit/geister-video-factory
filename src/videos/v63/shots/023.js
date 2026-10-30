// 41.1–43.34: meeting point — the Hilton in Basel, push in on the sign
import { K, DEFS, hotel, grain, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${cam(hotel(t, { sign: 1 }), lerp(1.15, 1.3, eio(prog(t, 41.1, 43.34))), 540, 700)}${grain(t)}`;
}
