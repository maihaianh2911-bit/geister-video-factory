// L8a 41.4–45.48: board graph AUTOMATISCH (y) over TAGE (x): the curve rises steeply and then flattens; a dashed marker drops at 66 TAGE on
// "sechsundsechzig" (42.59) and the label 66 TAGE pops; on "automatisch" (44.28) the flat part glows.
import { K, frame, cam, prog, eio, pop, label, T, f1, op, pool } from './lib.js';
import { voidRoom2 } from './sets3.js';
const INK = K.ink;
export const GX0 = 160, GX1 = 940, GY0 = 1180, GYT = 560;
export const habitY = u => GY0 - 40 - 520 * (1 - Math.exp(-u * 4.2)) / (1 - Math.exp(-4.2));
export function board(t, rev, o = {}) {
  let s = `<rect x="70" y="420" width="940" height="920" rx="30" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/>`;
  s += `<path d="M ${GX0} ${GYT - 20} V ${GY0} H ${GX1 + 30}" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M ${GX1 + 30} ${GY0} l -22 -14 v 28 Z" fill="${INK}"/>`;
  s += T(GX0 + 14, GYT - 30, 'AUTOMATISCH', 34, { anchor: 'start', fill: K.txt }) + T(GX1 + 20, GY0 + 60, 'TAGE', 32, { anchor: 'end', fill: '#5a636c' });
  let d = ''; for (let i = 0; i <= 60; i++) { const u = i / 60; if (u > rev) break; d += (d ? ' L ' : 'M ') + f1(GX0 + u * (GX1 - GX0)) + ' ' + f1(habitY(u)); }
  if (d) s += `<path d="${d}" stroke="#3c9a5f" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return s;
}
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#2c3346', bot: '#3d4258' });
  s += board(t, eio(prog(t, 41.5, 43.4)));
  const u66 = .26, mx = GX0 + u66 * (GX1 - GX0), mp = eio(prog(t, 42.59, 42.95));
  if (mp > 0) s += `<path d="M ${f1(mx)} ${GY0} V ${f1(GY0 - (GY0 - habitY(u66)) * mp)}" stroke="#d9493f" stroke-width="7" stroke-dasharray="18 12"/>` + T(mx, GY0 + 60, '66', 40, { fill: '#d9493f', op: mp });
  const g = eio(prog(t, 44.28, 44.8));
  if (g > 0) s += pool(700, habitY(.7), 380, 90, '#9be3a8', .5 * g);
  s = cam(s, 540, 880, 1.04 + .05 * eio(prog(t, 41.4, 45.48)));
  s += label('66 TAGE', 540, 260, 120, { p: pop(t, 42.62, .45) });
  return frame(s);
}
