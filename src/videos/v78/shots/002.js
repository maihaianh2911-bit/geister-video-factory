// 3.12–4.82: you still wash your hands ("Hände" 4.26) — at the sink, hands rub under the running tap
import { K, stick, calendar, cam, prog, eio, lerp } from './lib.js';
import { bathroom, water, FY, FS } from './sets.js';
export default function renderShot(t) {
  const r = eio(prog(t, 3.2, 3.8)), rub = Math.sin(t * 16) * 14 * eio(prog(t, 3.8, 4.0));
  const fig = stick(560, FY, FS, { look: 1, lookY: .8, mouth: 'smile', hL: [lerp(470, 770, r) + rub, lerp(1100, 1010, r)], hR: [lerp(650, 800, r) - rub, lerp(1110, 1000, r)], lean: 8 * r });
  return cam(`${bathroom({ sx: 780 })}${water(800, 960, 1060, r)}${fig}${calendar(930, 150, 1)}`, 1.15, 680, 960);
}
