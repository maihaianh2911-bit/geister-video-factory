// 60.94–63.24: the same test imagined again — the figure carries in a bottle that has been open a long time (no cap) and sets it on the table on "Versuch"
import { stick, walkFeet, prog, eio, lerp } from './lib.js';
import { wide, TY, BS, FY, FS } from './sets.js';
import { carry } from './003.js';
export default function renderShot(t) {
  const w = prog(t, 61.0, 62.0), x = lerp(120, 450, eio(w));
  const [fL, fR] = w > 0 && w < 1 ? walkFeet(x, FY, (t - 61) * 1.8, 80, FS) : [[x - 50, FY], [x + 50, FY]];
  const dn = eio(prog(t, 62.0, 62.46));
  const hx = lerp(x + 105, 700, dn), hy = lerp(1080, TY - 128 * BS, dn);
  const placed = t >= 62.46;
  const fig = stick(x, FY, FS, { fL, fR, hR: placed ? [lerp(700, x + 100, eio(prog(t, 62.5, 62.9))), lerp(TY - 79, 1180, eio(prog(t, 62.5, 62.9)))] : [hx, hy], hL: [x - 80, 1190], look: .7, lookY: .3, mouth: 'smile',
    mid: placed ? '' : carry(hx, hy, 'none', 'c24', 300) });
  return wide({ bottles: placed ? [{ x: 700 }] : [], extra: fig, sunX: 900, sunY: 330 });
}
