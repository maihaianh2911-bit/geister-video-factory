// L7 32.74–35.6: bedroom at night, cold blue: du lies awake in bed, eyes wide open, staring at the ceiling full of dark clouds; alarm clock 03:12.
import { K, frame, cam, prog, eio, pool } from './lib.js';
import { bedroom2, bedDu, nightstand } from './sets.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = bedroom2(t, { strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0a1020" opacity=".5"/>` + pool(820, 500, 300, 320, '#a9c8ff', .2);
  const CL = [[200, 330, 380, 11], [560, 260, 420, 21], [900, 360, 380, 31], [380, 560, 340, 41], [760, 600, 320, 51]];
  CL.forEach(([x, y, w, sd], i) => { s += cloud(x + Math.sin(t * .5 + i) * 20, y, w, { t, seed: sd, dark: .92, q: sd === 31 }); });
  s += gloom(540, 1100, 700, 400, .4, 'j');
  s += bedDu(t, { hx: 360, hy: 1060, eyes: 'wide', look: [6, -14], brows: 'worried', mouth: 'flat', blink: true, tilt: -6 });
  s += nightstand(t, 880, 1180, { txt: '03:12' });
  return frame(cam(s, 540, 950, 1.0 + .05 * eio(prog(t, 32.74, 35.6)), -20 * prog(t, 32.74, 35.6)));
}
