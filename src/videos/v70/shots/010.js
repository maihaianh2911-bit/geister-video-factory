// 24.36–26.58: don't wait — outside, the car settles lower in the water ("sinkt"); the open driver window is still above the surface
import { K, DEFS, BG, carSide, water, rain, label, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sink = eio(prog(t, 24.4, 26.5));
  const y = lerp(1250, 1300, sink) + 5 * Math.sin(t * 2.2);
  const sc = `${BG('url(#eSky)')}
    ${carSide(t, 560, y, .9, { tilt: lerp(6, 9, sink), lights: .25, inner: .8, winF: 1, id: 's10c', faces: { you: { look: -.4, brow: .8, mouth: 'flat' }, wom: { look: -.5, brow: 1, mouth: 'o' }, kidA: { look: .5, brow: 1, mouth: 'cry', tears: 1 }, kidB: { look: .4, brow: 1, mouth: 'cry', tears: 1 } } })}
    ${water(t, 1080, { amp: 10, alpha: .92 })}${rain(t, .9, 70)}`;
  return `${DEFS}${sc}${label(540, 360, 'NICHT WARTEN', eout(prog(t, 24.5, 24.8)), K.red, 74)}`;
}
