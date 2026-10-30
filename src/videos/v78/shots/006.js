// 11.02–14.02: a few days later ("Nach einigen Tagen" 11.02–11.58) — calendar flips to day 4; you have just put on a clean shirt and walk out
import { K, stick, walkFeet, calendar, cam, prog, eio, lerp } from './lib.js';
import { bedroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const day = t < 11.4 ? 1 : t < 11.6 ? 2 : t < 11.8 ? 3 : 4;
  const w = prog(t, 12.0, 14.0), x = lerp(420, 640, eio(w));
  const [fL, fR] = walkFeet(x, FY, w * 3, 70, FS);
  const fig = stick(x, FY, FS, { shirt: K.teal, look: .6, mouth: 'smile', fL, fR, hL: [x - 80 + Math.sin(w * 18) * 30, 1100], hR: [x + 80 - Math.sin(w * 18) * 30, 1110], bob: Math.abs(Math.sin(w * 9.4)) * 6 });
  return `${cam(`${bedroom()}${fig}`, 1, 540, 960)}${calendar(930, 150, day)}`;
}
