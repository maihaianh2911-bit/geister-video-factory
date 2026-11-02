// L7c 33.22–36.3: month calendar on the wall: every day full, only one weekend free – it lights up green on "freies" (34.1). du's speech "Na klar." (35.8) and a red X crosses the free weekend (35.9–36.2).
import { frame, cam, pop, prog, eio, stairwell, monthCal, speech } from './all.js';
export default function renderShot(t) {
  let s = stairwell(t, { strong: true });
  s += monthCal(540, 780, 1.4, { hl: prog(t, 34.1, 34.5), strike: prog(t, 35.9, 36.2), rot: -1.5 });
  s = cam(s, 540, 800, 1.0 + .07 * eio(prog(t, 33.22, 36.3)));
  s += speech(330, 1250, 'Na klar.', 140, 1390, { p: pop(t, 35.8), size: 70 });
  return frame(s);
}
