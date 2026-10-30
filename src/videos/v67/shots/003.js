// 3.28–5.22: wide backyard — the figure walks in carrying a closed cola bottle toward the table
import { K, stick, bottle, walkFeet, prog, eio, eout, lerp } from './lib.js';
import { wide, TY, BS, FY, FS } from './sets.js';
export const carry = (hx, hy, cap = 'on', id = 'cb', level = 300, inner = '') => bottle(hx, hy + 128 * BS, BS, { id, level, cap, inner });
export default function renderShot(t) {
  const w = prog(t, 3.28, 4.95), x = lerp(150, 470, eio(w)), step = w < 1 ? (t - 3.28) * 1.7 : 1.7 * 1.67;
  const [fL, fR] = w < 1 ? walkFeet(x, FY, step, 80, FS) : [[x - 50, FY], [x + 50, FY]];
  const bob = w < 1 ? -Math.abs(Math.sin(step * Math.PI * 2)) * 8 : 0;
  const hx = x + 105, hy = 1080 + bob * 1.5;
  return wide({ fig: { x, hR: [hx, hy], hL: [x - 75, 1200 + bob], fL, fR, bob, look: .6, mouth: 'smile', mid: carry(hx, hy, 'on', 'c3') } });
}
