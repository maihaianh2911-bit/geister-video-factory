// 9.98–11.0: wide — the figure steps back from the table, hands raised; the bottle starts to fizz at the neck
import { stick, stream, prog, eio, lerp, walkFeet } from './lib.js';
import { wide, FY, FS } from './sets.js';
export default function renderShot(t) {
  const w = eio(prog(t, 10.0, 10.75)), x = lerp(470, 280, w);
  const [fL, fR] = w < 1 && w > 0 ? walkFeet(x, FY, (t - 10) * 2.2, 70, FS) : [[x - 50, FY], [x + 50, FY]];
  const fizz = stream(0, -60, 320, t, { n: 12, speed: 160, r: 4, spread: 40, seed: 3, t0: 9.9 });
  return wide({ caps: [[640, 90]], bottles: [{ x: 730, inner: fizz }],
    fig: { x, fL, fR, hL: [x - 110, lerp(1150, 980, w)], hR: [x + 110, lerp(1150, 980, w)], look: .8, lookY: -.1, brow: 'up', mouth: 'o', lean: lerp(0, -6, w) } });
}
