// L7a 33.92–37.68: almost a hundred small round-headed people (8 × 12 grid) pop in row by row on "Fast hundert Menschen" (34.2–35.2);
// label 12 WOCHEN on "zwölf Wochen" (35.45); each has a small coloured top.
import { K, frame, cam, prog, eio, pop, label, f1, hash } from './lib.js';
import { voidRoom2 } from './sets3.js';
const INK = K.ink;
const COLS = ['#2fa59a', '#c25b4e', '#5f8fb5', '#e0b04a', '#8a5bb5', '#7aa27a', '#e8742f'];
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#e9e2d4', bot: '#d8cdb8' });
  for (let r = 0; r < 12; r++) for (let c = 0; c < 8; c++) {
    const i = r * 8 + c, p = pop(t, 34.2 + r * .08 + c * .01, .35);
    if (p <= 0) continue;
    const x = 120 + c * 120, y = 460 + r * 78, k = Math.max(.01, p);
    s += `<g transform="translate(${x} ${y}) scale(${f1(k * 1000) / 1000})"><path d="M -34 40 C -34 0 34 0 34 40 Z" fill="${COLS[Math.floor(hash(i) * 7)]}" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="-6" r="26" fill="${INK}"/><circle cx="-8" cy="-8" r="5" fill="#fff"/><circle cx="8" cy="-8" r="5" fill="#fff"/></g>`;
  }
  s = cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 33.92, 37.68)));
  s += label('12 WOCHEN', 540, 300, 104, { p: pop(t, 35.45, .45) });
  return frame(s);
}
