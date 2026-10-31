import { R, newspaper, frame, prog, eout, lerp } from './lib.js';
// 51.72–53.3 The story spreads: newspapers slide in one after another ("verbreitete sich").
export default function renderShot(t) {
  const papers = [[51.78, -900, 0, 330, 660, -10, 0], [52.1, 1000, 200, 760, 780, 8, 1], [52.48, 0, -900, 530, 1080, -3, 2]];
  let s = '';
  for (const [t0, fx, fy, x, y, r, k] of papers) { const p = eout(prog(t, t0, t0 + .3)); if (p <= 0) continue; s += newspaper(lerp(x + fx, x, p), lerp(y + fy, y, p), r + (1 - p) * 40, 1.15, k); }
  return frame(t, `${R(0, 0, 1080, 1920, '#B59670')}${s}`);
}
