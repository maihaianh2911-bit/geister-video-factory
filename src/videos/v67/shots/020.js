// 49.24–51.34: wide — the fountain is still going; the cap lies on the table, circled on "Deckel"
import { K, OL, f1, fountain, puddle, prog, eout, lerp } from './lib.js';
import { wide, FY } from './sets.js';
import { OPEN } from './008.js';
export default function renderShot(t) {
  const f = fountain(OPEN[0], OPEN[1], lerp(700, 560, prog(t, 49.24, 51.34)), 1, t, { w0: 22, w1: 58 });
  const c = eout(prog(t, 49.35, 49.8));
  const ring = c > 0 ? `<ellipse cx="640" cy="1112" rx="${f1(70 * (2 - c))}" ry="${f1(52 * (2 - c))}" fill="none" stroke="${K.blue}" stroke-width="12" opacity="${c.toFixed(2)}"/>` : '';
  return wide({ caps: [[640, 90]], bottles: [{ x: 730, level: 220 }], extra: f + puddle(730, 1142, 130) + ring,
    fig: { x: 280, fL: [230, FY], fR: [330, FY], hL: [190, 1180], hR: [370, 1180], look: .9, lookY: .2, mouth: 'smile', brow: 'calm' } });
}
