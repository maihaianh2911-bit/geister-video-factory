// 49.6–51.68: golden stars on green bronze — the stars sparkle, camera eases back
import { K, DEFS, BG, disc, grain, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const st = eout(prog(t, 49.9, 50.3)) * (1 - .7 * prog(t, 50.8, 51.4));
  return `${DEFS}${BG(K.brownD)}${cam(disc(540, 900, 420, { id: 'A', damage: true, stars: st, glow: .4 * prog(t, 50.6, 51.2) }), lerp(1.12, .95, eio(prog(t, 49.6, 51.68))), 540, 900)}${grain(t)}`;
}
