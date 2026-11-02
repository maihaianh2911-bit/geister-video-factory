// L3 15.40–17.10: "Plopp" — the stone VERMIETER falls into the bag and lands exactly on "Plopp" (15.68); counter chip "1".
import { K, frame, person, cam, shadow, fallStone, packMouth, chip, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { DX, GY } from './base.js';
export default function renderShot(t) {
  const n = t >= 15.68 ? 1 : 0;
  let s = room(t, { mood: 'amber', strong: true });
  s += shadow(DX, GY) + person('du', DX, GY, 1, { t, pack: { n, labels: n ? ['VERMIETER'] : [] }, drops: [15.68], look: [-16, -12], brows: n ? 'worried' : 'calm', mouth: n ? 'o' : 'flat' });
  const [mx, my] = packMouth(DX, GY, 1, 1);
  s += fallStone(t, 15.68, mx + 30, my - 700, mx, my + 6, 'VERMIETER', .92, .3, -35);
  s = cam(s, mx + 150, my + 120, 1.4 + .06 * eio(prog(t, 15.4, 17.1)), 540 - (mx + 150), 900 - (my + 120));
  s += `<g transform="translate(830 300) scale(${Math.max(.01, pop(t, 16.3, .4))})">${chip(0, 0, 'STEIN 1', { size: 64, bg: K.yellow })}</g>`;
  return frame(s);
}
