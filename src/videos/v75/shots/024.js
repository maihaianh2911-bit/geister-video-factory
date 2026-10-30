// 66.9–69.54: when the connection returns ("Verbindung zurückkehrt" 67.16–67.48) — the globe's links light up again, wifi sign on
import { K, DEFS, BG, stars, wifi, cam, prog, eio, lerp } from './lib.js';
import { globe } from './sets.js';
export default function renderShot(t) {
  const lit = eio(prog(t, 67.1, 68.6));
  return `${DEFS}${BG()}${stars(50, 1)}${cam(globe(540, 1000, 330, lit, t), lerp(1.06, 1, prog(t, 66.9, 69.54)), 540, 1000)}${wifi(540, 520, .9, prog(t, 67.3, 67.5) > .5 ? 1 : 0, { noX: false })}`;
}
