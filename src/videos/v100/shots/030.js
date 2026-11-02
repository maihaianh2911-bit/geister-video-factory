// L16b 73.86–75.14: close-up du from below, the battery above glows green and pulses on "grün" (74.58); du smiles.
import { frame, cam, head, bust, prog, eio, office2, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const p = t >= 74.58 ? 1 + .12 * Math.exp(-(t - 74.58) * 4) * Math.abs(Math.sin((t - 74.58) * 9)) : 1;
  s += bust('du', 540, 1110, 1.75, { t, seed: 1, look: [0, -14], brows: 'up', mouth: 'smile' });
  s += battery(540, 520, 1.6, duBat(t).lvl, { t, pulse: p, glow: t >= 74.58 ? .75 : .45 });
  return frame(cam(s, 540, 900, 1.08 - .06 * eio(prog(t, 73.86, 75.14))));
}
