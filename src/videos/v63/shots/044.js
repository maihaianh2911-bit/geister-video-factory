// 90.64–92.4: without the trap in Basel — the hotel sign one more time, dimming
import { K, DEFS, hotel, grain, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${cam(hotel(t, { sign: lerp(1, .35, eio(prog(t, 91.4, 92.3))) }), lerp(1.3, 1.2, eio(prog(t, 90.64, 92.4))), 540, 700)}${grain(t)}`;
}
