// v64 shared fall path for shots 001–003: Tuffi leaves the side opening at 1.06 s and reaches the water at 5.3 s
// (slowed at first, then accelerating), in the world coordinates of bahnScene().
import { tuffi, splash, WY, cl, prog, eout, lerp } from './lib.js';
export const T_OUT = 1.06, T_HIT = 5.3;
export function fallState(t) {
  const p = prog(t, 1.4, T_HIT), f = .5 * p + .5 * p * p * p;
  const push = eout(prog(t, T_OUT, 1.4));
  return { x: 540 + 30 * push + 40 * p, y: 660 + (WY + 40 - 660) * f, s: lerp(.2, .27, p), rot: lerp(0, 28, eout(p)) - 8 * push * (1 - p), p };
}
export function fallingTuffi(t) {
  if (t < T_OUT) return '';
  const st = fallState(t);
  if (t >= T_HIT) return tuffi(605, WY + 58, .27, { sit: .7, ear: .6, eye: 'wide', tr: .3 }) + `<rect x="480" y="${WY + 30}" width="250" height="60" fill="#7D8C80" opacity=".8"/>`;
  return tuffi(st.x, st.y, st.s, { rot: st.rot, tr: .75, ear: 1, eye: 'wide', legs: [-18, -10, 22, 14], mouth: 1 });
}
export const fallSplash = t => splash(600, WY + 30, prog(t, T_HIT, T_HIT + .9), .55);
