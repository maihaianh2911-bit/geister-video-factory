// 6.05–7.62: dark corridor: the family runs toward the front door (Wohnungstür), seen from behind.
import { K, DEFS, FG, prog, eio, lerp, person, reach, cl } from './lib.js';
import { corridor } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 6.05, 7.5));
  const led = Math.sin(t * 26) > -.2 ? 1 : 0;
  const ph = t * 11;
  const vs = lerp(1.0, .62, p), vy = lerp(1080, 760, p), vx = lerp(560, 600, p);
  const ms = lerp(1.05, .74, p), my = lerp(1260, 900, p), mx = lerp(300, 420, p);
  const ks = ms * .95, kx = mx + 210 * ms, ky = my + 250 * ms;
  const aM = reach('m', mx, my, ms, 1, kx - 40 * ks, ky + 40 * ks);
  const aK = reach('k', kx, ky, ks, -1, kx - 40 * ks, ky + 40 * ks);
  return `${DEFS}${corridor(t, { flash: led, strip: .35 })}
    ${person('v', vx, vy, vs, { back: 1, walk: ph, stride: 26, aL: [-10 + 25 * Math.sin(ph), 20], aR: [-10 - 25 * Math.sin(ph), 20] })}
    ${person('k', kx, ky, ks, { back: 1, walk: ph + 1, stride: 24, aL: aK, aR: [20, 30] })}
    ${person('m', mx, my, ms, { back: 1, walk: ph + 2, stride: 24, aR: aM, aL: [14 + 20 * Math.sin(ph), 20] })}
    ${FG(1430)}`;
}
