// 74.48–79.164: you get up again ("stehst wieder auf" 74.62–75.1), pull off the covers ("Bezüge ab" 75.94–76.32) and take them to the wash ("Wäsche" 77.44) — standing, you strip the pillowcase, carry the bundle and drop it into the washing machine
import { K, OL, f1, stick, walkFeet, cam, prog, eio, ein, lerp } from './lib.js';
import { bedroom, pillow, washer, FY, FS } from './sets.js';
export default function renderShot(t) {
  const up = eio(prog(t, 74.6, 75.2)), strip = eio(prog(t, 75.6, 76.4)), w = prog(t, 76.6, 77.6), drop = ein(prog(t, 77.6, 78.0)), door = eio(prog(t, 78.0, 78.4));
  const walking = t > 76.6;
  const x = walking ? lerp(420, 700, eio(w)) : 420;
  const [fL, fR] = walking && w < 1 ? walkFeet(x, FY, w * 3, 70, FS) : [[x - 34 * FS, FY], [x + 34 * FS, FY]];
  const bx = walking ? x + 110 : lerp(260, 470, strip), by = walking ? (drop > 0 ? lerp(1000, 1080, drop) : 1000) : lerp(980, 1000, strip);
  const bundle = t > 75.6 && drop < 1 ? `<g transform="translate(${f1(bx)} ${f1(by)})"><path d="M -90 -50 Q 0 -90 90 -50 Q 120 0 90 50 Q 0 80 -90 50 Q -120 0 -90 -50 Z" fill="${K.sheet}" ${OL(6)}/><path d="M -50 -20 q 50 30 100 0" stroke="${K.white}" stroke-width="8" fill="none"/></g>` : '';
  const fig = stick(x, FY, FS, { shirt: K.white, look: walking ? 1 : -1, lookY: .5, mouth: 'flat', brow: 'calm', fL, fR, hL: t > 75.6 ? [bx - 60, by] : [lerp(260, x - 80, up), lerp(980, 1100, up)], hR: t > 75.6 ? [bx + 60, by] : [x + 80, 1110] });
  return cam(`${bedroom({ stripped: strip > .5 })}${pillow(250, 980, 1.1, strip < .5)}${washer(900, FY, { full: drop >= 1 })}${fig}${bundle}`, 1, 560, 1000);
}
