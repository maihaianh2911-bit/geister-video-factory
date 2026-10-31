import { K, ground, antTop, bread, nestTop, f1, prog, lerp } from './lib.js';
// 4.9–7.0 Top-down: one forager ant leaves the nest and searches in zigzags ("auf Nahrungssuche").
export default function renderShot(t) {
  const u = prog(t, 4.9, 7.0);
  const x = lerp(300, 560, u) + 90 * Math.sin(u * 9), y = lerp(1150, 760, u);
  const ang = Math.atan2(-390, 260 + 810 * Math.cos(u * 9)) * 180 / Math.PI;
  let wake = '';
  for (let i = 1; i < 20; i++) { const v = u * i / 20; wake += `<circle cx="${f1(lerp(300, 560, v) + 90 * Math.sin(v * 9))}" cy="${f1(lerp(1150, 760, v))}" r="4" fill="${K.ink}" opacity=".25"/>`; }
  return `${ground(1)}${nestTop(250, 1250, 1)}${bread(790, 470, 1)}${wake}${antTop(x, y, ang, 2, t * 22)}`;
}
