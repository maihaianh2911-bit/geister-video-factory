// L16b 73.86–75.14: close-up du from below, the battery above glows green and pulses on "grün" (74.58); du smiles.
import { frame, cam, head, prog, eio, office2, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const p = t >= 74.58 ? 1 + .12 * Math.exp(-(t - 74.58) * 4) * Math.abs(Math.sin((t - 74.58) * 9)) : 1;
  s += head('du', 540, 1330, 1.75, { t, seed: 1, look: [0, -14], brows: 'up', mouth: 'smile' });
  s += `<path d="M 140 1960 C 160 1680 330 1610 540 1610 C 750 1610 920 1680 940 1960 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/><path d="M 500 1650 L 486 1760 M 580 1650 L 594 1760" stroke="${K.duStr}" stroke-width="10" stroke-linecap="round"/>`;
  s += battery(540, 640, 1.6, duBat(t).lvl, { t, pulse: p, glow: t >= 74.58 ? .75 : .45 });
  return frame(cam(s, 540, 900, 1.08 - .06 * eio(prog(t, 73.86, 75.14))));
}
