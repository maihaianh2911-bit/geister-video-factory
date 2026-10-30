// 45.4–47.04: in the corridor the family walks together toward the camera, away from the front door and the smoke behind it.
import { K, DEFS, FG, prog, eio, lerp, person, reach } from './lib.js';
import { corridor } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 45.4, 47.0));
  const ph = t * 9;
  const s = lerp(.62, 1.0, p);
  const vx = lerp(470, 330, p), vy = lerp(760, 1000, p);
  const kx = lerp(560, 560, p), ky = vy + 230 * s;
  const mx = lerp(650, 800, p), my = vy + 20 * s;
  const aV = reach('v', vx, vy, s, 1, kx - 60 * s, ky + 80 * s);
  const aKl = reach('k', kx, ky, s * .95, -1, kx - 60 * s, ky + 80 * s);
  const aKr = reach('k', kx, ky, s * .95, 1, kx + 60 * s, ky + 80 * s);
  const aM = reach('m', mx, my, s, -1, kx + 60 * s, ky + 80 * s);
  return `${DEFS}${corridor(t, { strip: .2 })}
    <rect x="440" y="560" width="200" height="40" fill="${K.smoke3}" opacity=".5" filter="url(#vSoft2)"/>
    ${person('v', vx, vy, s, { walk: ph, stride: 16, aR: aV, aL: [10, 6], brow: 'worry', mouth: 'tight', look: 6 })}
    ${person('m', mx, my, s, { walk: ph + 3, stride: 16, aL: aM, aR: [10, 6], brow: 'worry', mouth: 'worried', look: -6 })}
    ${person('k', kx, ky, s * .95, { walk: ph + 1.5, stride: 18, aL: aKl, aR: aKr, brow: 'worry', mouth: 'o', look: 0, lookY: -8 })}
    ${FG(1430)}`;
}
