// 1.72–3.28: close-up of the cover set — one Mentos pinched above the open neck, fine bubbles in the cola
import { K, yard, table, bottle, stick, mentos, roll, capSvg, cam, stream, prog, eio, lerp } from './lib.js';
import { FX, FY, FS, BX, TY, BS } from './001.js';
export default function renderShot(t) {
  const d = eio(prog(t, 1.75, 2.4));
  const hx = 728 + Math.sin(t * 3) * 2, hy = lerp(846, 868, d);
  const fig = stick(FX, FY, FS, { hR: [hx, hy], hL: [395, 1150], look: .9, lookY: .3, brow: 'up', mouth: 'o', over: mentos(hx + 2, hy + 18, 17, 6) });
  const fizz = stream(0, -40, 230, t, { n: 7, speed: 60, r: 3, spread: 30, seed: 2 });
  const world = `${yard({ cloud: false, sunX: 930, sunY: 600 })}${table(560, 1080, TY, 400)}${capSvg(930, TY, 1, 90)}${bottle(BX, TY, BS, { id: 'c2', level: 300, inner: fizz })}${fig}`;
  return cam(world, lerp(2.3, 2.45, prog(t, 1.72, 3.28)), 730, 930, -190, -40);
}
