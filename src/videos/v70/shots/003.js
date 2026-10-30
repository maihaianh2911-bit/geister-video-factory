// 4.88–7.26: side view — the car slides over the bank and plunges nose-first into the water ("ins Wasser"), splash, then floats
import { K, DEFS, BG, carSide, water, rain, f1, prog, eio, ein, eout, lerp, ring } from './lib.js';
export default function renderShot(t) {
  const fall = prog(t, 5.2, 6.1), afterS = t - 6.1;
  let x, y, tilt;
  if (t < 5.2) { x = lerp(240, 380, prog(t, 4.88, 5.2)); y = 1100; tilt = 0; }
  else if (t < 6.1) { x = lerp(380, 560, fall); y = lerp(1100, 1400, ein(fall)); tilt = lerp(0, 24, eout(fall)); }
  else { x = 560 + 30 * eout(prog(t, 6.1, 7.2)); y = lerp(1400, 1380, eout(prog(t, 6.1, 6.8))) + 14 * ring(t, 6.1, 1.2, 1.6); tilt = lerp(24, 8, eout(prog(t, 6.1, 7.0))); }
  const sp = prog(t, 6.1, 6.9);
  const splash = t >= 6.1 ? [-1, -.5, 0, .5, 1].map(k => { const h = 260 * Math.sin(Math.PI * sp) * (1 - Math.abs(k) * .3); return `<path d="M ${f1(x + 200 + k * 110)} 1270 q ${f1(k * 30)} ${f1(-h)} ${f1(k * 90 + 30)} 0" fill="none" stroke="${K.foam}" stroke-width="16" stroke-linecap="round" opacity="${f1(1 - sp)}"/>`; }).join('') : '';
  const sc = `${BG('url(#eSky)')}<path d="M -60 1100 L 400 1100 L 520 1460 L -60 1460 Z" fill="${K.road}" stroke="${K.ink}" stroke-width="6"/><path d="M 400 1100 L 520 1460" stroke="#2E3A34" stroke-width="40"/>
    ${carSide(t, x, y, .74, { tilt, lights: t < 6.3 ? 1 : .4, inner: .7, id: 's3c', faces: { you: { look: .8, brow: 1, mouth: 'o', wide: 1 }, wom: { look: .5, brow: 1, mouth: 'o' }, kidA: { look: .3, brow: 1, mouth: 'scream', t }, kidB: { look: .3, brow: 1, mouth: 'scream', t } } })}
    ${water(t, 1270, { x0: 420, amp: 6 + 18 * Math.max(0, 1 - Math.abs(afterS) * 1.5) })}${splash}${rain(t, 1, 80)}`;
  return `${DEFS}${sc}`;
}
