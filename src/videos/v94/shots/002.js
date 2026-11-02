// L0b 3.30–5.64: close on the backpack; a stone "AUFGABE" drops in and lands on "landen" (4.6), du flinches under the weight.
import { K, frame, person, cam, shadow, fallStone, packMouth, prog, eio } from './lib.js';
import { room } from './sets.js';
import { DX, GY } from './base.js';
export default function renderShot(t) {
  const n = t >= 4.6 ? 1 : 0;
  const o = { t, pack: { n, labels: n ? ['AUFGABE'] : [] }, drops: [4.6], look: [-16, -10], brows: t >= 4.6 ? 'strain' : 'worried', mouth: t >= 4.6 ? 'o' : 'flat', hunch: t >= 4.6 ? .15 * eio(prog(t, 4.6, 4.9)) : 0 };
  let s = room(t, { mood: 'amber', strong: true });
  s += shadow(DX, GY) + person('du', DX, GY, 1, o);
  const [mx, my] = packMouth(DX, GY, 1, 1);
  s += fallStone(t, 4.6, mx - 20, my - 760, mx, my + 6, 'AUFGABE', .92, .55, -40);
  const z = 1.32 + .08 * eio(prog(t, 3.3, 5.64));
  return frame(cam(s, mx + 150, my + 120, z, 540 - (mx + 150), 900 - (my + 120)));
}
