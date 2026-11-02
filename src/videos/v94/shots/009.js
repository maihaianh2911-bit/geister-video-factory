// L4b 19.25–22.30: medium, blue evening: du lowers the phone, thinks "Die Praxis hat jetzt bestimmt schon zu." (19.28); stone ZAHNARZT lands on "Stein" (21.48).
import { K, frame, person, cam, shadow, thought, phone, fallStone, packMouth, prog, eio, pop } from './lib.js';
import { room, fgTable as fgT } from './sets.js';
import { DX, GY, packOf } from './base.js';
export default function renderShot(t) {
  const n = t >= 21.48 ? 2 : 1;
  const low = eio(prog(t, 19.25, 19.8));
  let s = room(t, { mood: 'blue', hh: 17, mm: 59 });
  const hand = [210 - 30 * low, -520 + 160 * low];
  s += shadow(DX, GY) + person('du', DX, GY, 1, { t, pack: packOf(n), drops: [21.48], look: [10, 14 * low], brows: n === 2 ? 'strain' : 'sad', mouth: n === 2 ? 'o' : 'frown', armR: hand, elbowR: [250, -380], front: phone(hand[0], hand[1] - 40, .7, 10, '#1f2a3d') });
  s += thought(770, 500, ['„Die Praxis hat', 'jetzt bestimmt', 'schon zu.“'], DX + 120, 760, { p: pop(t, 19.28, .4), size: 50, a: t > 21.0 ? 1 - prog(t, 21.0, 21.3) : undefined });
  const [mx, my] = packMouth(DX, GY, 1, 2);
  s += fallStone(t, 21.48, mx + 20, my - 700, mx, my - 40, 'ZAHNARZT', .92, .35, 30);
  s += fgT(t, { mugX: 880, keys: 300, glass: 140 });
  return frame(cam(s, 540, 1100, 1.04 + .06 * eio(prog(t, 19.25, 22.3)), -30 * prog(t, 19.25, 22.3), 0));
}
