// 4.54–6.05: all three spring up in bed under the flashing alarm.
import { K, DEFS, FG, cam, prog, back, eout, shk, person, bear, reach } from './lib.js';
import { bedroom, bedFrame, blanket, clock } from './sets.js';
export default function renderShot(t) {
  const led = Math.sin(t * 26) > -.2 ? 1 : 0;
  const up = k => back(prog(t, 4.66 + k * .08, 4.98 + k * .08));
  const [sx, sy] = shk(t, 4.8, 12, 6);
  const uv = up(0), um = up(1), uk = up(2);
  const kx = 545, ky = 1040 - 150 * uk;
  // mother's right... screen-left hand grabs the child's shoulder after she is up
  const g = prog(t, 5.15, 5.45);
  const mx = 760, my = 1000 - 200 * um;
  const aM = g > 0 ? reach('m', mx, my, .62, -1, kx + 40, ky + 30) : [30, 60];
  const sc = `${bedroom(t, { flash: led })}${bedFrame(t)}
    ${person('v', 320 - 20 * uv, 1000 - 210 * uv, .64, { noLegs: 1, aL: [20 + 14 * uv, 30], aR: [14, 10 + 30 * uv], brow: 'up', eyeS: 1.2, mouth: 'o', look: 12, lookY: -10, lean: -4 * uv })}
    ${person('m', mx, my, .62, { noLegs: 1, aL: [aM[0] * Math.min(1, g * 1.5) + 20 * (1 - Math.min(1, g * 1.5)), aM[1]], aR: [20, 30], brow: 'worry', eyeS: 1.2, mouth: 'o', look: -12, lean: 5 * um })}
    ${person('k', kx, ky, .7, { noLegs: 1, aL: [30, 80], aR: [40, 90], brow: 'worry', eyeS: 1.15, mouth: 'o', look: 8, lookY: -6, front: bear(0, 120, .6, -8) })}
    ${blanket(1050 + 40 * uv, t)}
    ${clock(230, 1270, .8, '03:00')}`;
  return `${DEFS}<g transform="translate(${sx} ${sy})">${cam(sc, 1.22, 540, 820)}</g>${FG(1430)}`;
}
