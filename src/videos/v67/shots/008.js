// 15.06–18.02: wide — on "schießt" a foam column shoots out of the neck; the camera tilts up with it ("nach oben")
import { K, cam, fountain, puddle, prog, eio, eout, lerp, stream } from './lib.js';
import { wide, FY } from './sets.js';
export const OPEN = [730, 902];
export function erupt(t, t0, H = 820) { return eout(prog(t, t0, t0 + 1.1)) * H * (1 + .03 * Math.sin(t * 13)); }
export default function renderShot(t) {
  const h = t < 15.82 ? 40 * eout(prog(t, 15.1, 15.8)) : erupt(t, 15.8);
  const lev = lerp(300, 210, prog(t, 15.8, 18.02));
  const f = fountain(OPEN[0], OPEN[1], h, 1, t, { w0: 22, w1: 64, drops: t > 16 ? 14 : 0 });
  const fizz = stream(0, -30, lev - 20, t, { n: 22, speed: 380, r: 5, spread: 50, seed: 4 });
  const sh = 1 - eout(prog(t, 15.1, 15.5));
  const world = wide({ caps: [[640, 90]], bottles: [{ x: 730, level: lev, inner: fizz }], extra: f + puddle(730, 1142, lerp(40, 130, prog(t, 16.2, 18))),
    fig: { x: 280, hL: [150, 940 - 60 * sh], hR: [400, 920 - 60 * sh], look: .8, lookY: lerp(.2, -.9, prog(t, 15.8, 17.2)), brow: 'up', mouth: 'open', lean: -6, fL: [230, FY], fR: [330, FY] } });
  const up = eio(prog(t, 16.0, 17.4));
  return cam(world, lerp(1.0, .92, up), 540, 900, 0, lerp(0, 260, up));
}
