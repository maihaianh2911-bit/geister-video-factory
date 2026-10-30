// 47.68–49.6: golden sun, golden moon — each lights up on its word
import { K, DEFS, BG, disc, grain, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sun = eout(prog(t, 48.0, 48.3)) * (1 - .6 * prog(t, 48.9, 49.2)), moon = eout(prog(t, 48.95, 49.25));
  return `${DEFS}${BG(K.brownD)}${cam(disc(540, 900, 420, { id: 'z', damage: true, sun, moon }), lerp(1.05, 1.12, eio(prog(t, 47.68, 49.6))), 540, 900)}${grain(t)}`;
}
