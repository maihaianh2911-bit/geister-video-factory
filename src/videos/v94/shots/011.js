// L5b 25.95–27.72: closer: the three stones drop together into the bag (land 26.36, "Drei Steine"), du sinks at the knees.
import { K, frame, person, cam, shadow, fallStone, packMouth, label, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { DX, GY, packOf } from './base.js';
export default function renderShot(t) {
  const L = 26.36, n = t >= L ? 5 : 2;
  const h = t >= L ? .6 * eio(prog(t, L, L + .35)) : .1;
  let s = room(t, { mood: 'grey', basket: [900, 1290], strong: true });
  s += shadow(DX, GY) + person('du', DX, GY, 1, { t, pack: packOf(n), hunch: h, drops: [L], look: [-10, 10], brows: 'strain', mouth: t >= L ? 'o' : 'wavy', sweat: t >= L ? 1 : 0 });
  const [mx, my] = packMouth(DX, GY, 1, 5);
  s += fallStone(t, L, 220, 470, mx - 60, my + 10, 'STEUER', .92, .42, -8);
  s += fallStone(t, L, 540, 400, mx, my - 40, 'OMA', .92, .42, 5);
  s += fallStone(t, L, 860, 470, mx + 60, my - 80, 'WÄSCHE', .92, .42, -4);
  s = cam(s, mx + 180, my + 200, 1.3 + .1 * eio(prog(t, L, L + .3)), 540 - (mx + 180), 880 - (my + 200));
  s += label('3 AUF EINMAL', 540, 260, 92, { p: pop(t, 26.14, .4) });
  return frame(s);
}
