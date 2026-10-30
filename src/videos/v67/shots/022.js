// 53.16–56.46: wide → push in — the fountain dies down ("beruhigt"); the bottle is clearly emptier than the dashed start level ("leerer")
import { K, OL, f1, cam, fountain, puddle, arrow, prog, eio, eout, lerp, walkFeet } from './lib.js';
import { wide, TY, BS, FY } from './sets.js';
import { OPEN } from './008.js';
export default function renderShot(t) {
  const h = 520 * (1 - eio(prog(t, 53.2, 54.3)));
  const f = h > 4 ? fountain(OPEN[0], OPEN[1], h, 1, t, { w0: 22, w1: 50, drops: h > 200 ? 8 : 0 }) : '';
  const w = eio(prog(t, 53.6, 54.7)), x = lerp(280, 420, w);
  const [fL, fR] = w > 0 && w < 1 ? walkFeet(x, FY, (t - 53.6) * 1.8, 70, 1.5) : [[x - 50, FY], [x + 50, FY]];
  const lev = 130, y0 = TY - 300 * BS, y1 = TY - lev * BS;
  const dash = `<path d="M 670 ${f1(y0)} H 790" stroke="${K.ink}" stroke-width="5" stroke-dasharray="12 9"/>`;
  const ar = arrow(820, y0, 820, y1, K.red, 9, eout(prog(t, 55.0, 55.5)));
  const world = wide({ caps: [[640, 90]], bottles: [{ x: 730, level: lev }], extra: f + puddle(730, 1142, 140) + (t > 54.3 ? dash + ar : ''),
    fig: { x, fL, fR, hL: [x - 90, 1180], hR: [x + 90, 1180], look: .9, lookY: .4, mouth: t > 55.3 ? 'o' : 'smile', brow: t > 55.3 ? 'up' : 'calm' } });
  const z = eio(prog(t, 54.4, 55.2));
  return cam(world, lerp(1, 2.1, z), 730, 1000, lerp(0, -190, z), lerp(0, -40, z));
}
