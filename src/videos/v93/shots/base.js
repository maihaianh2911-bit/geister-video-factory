// v93 shared shot helpers (camera moves, close-up framing)
import { eio, prog, lerp } from './lib.js';
// slow push: scale a→b over [t0,t1]
export const push = (t, t0, t1, a = 1, b = 1.06) => lerp(a, b, eio(prog(t, t0, t1)));
// medium shot: feet y 1560, scale 1.55 (head r≈155); close-up: feet y 2030, scale 2.7 (head r=270, centre y≈896)
export const MED = { y: 1560, s: 1.55 }, CU = { y: 2030, s: 2.7 };
// screen point of a person-local hand target, incl. body tilt (deg) around the feet
export function handPt(x, y, s, h, tilt = 0) {
  const a = tilt * Math.PI / 180, hx = h[0] * s, hy = h[1] * s;
  return [x + hx * Math.cos(a) - hy * Math.sin(a), y + hx * Math.sin(a) + hy * Math.cos(a)];
}
