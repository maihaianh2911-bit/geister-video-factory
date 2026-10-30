// 21.9–24.02: but the pain is up in the FOREHEAD — a dashed path jumps from the mouth to the forehead, question mark
import { K, DEFS, parlour, counterFront, lea, cam, HL, prog, eout, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const draw = eio(prog(t, 22.05, 22.95)), hot = back(prog(t, 22.9, 23.2)), q = back(prog(t, 23.25, 23.6));
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'n', cone: { x: 790, y: 1005, rot: 4, bite: 1 }, eyes: 'open', eyeS: 1.05, brow: 'pain', mouth: 'flat', lookY: -10, look: -4, pain: .4 + .6 * prog(t, 22.9, 23.2), tilt: -5 * eio(prog(t, 23.2, 23.8)) }) + counterFront(1236);
  const path = 'M 590 790 Q 760 700 690 600 Q 640 560 560 590';
  const over = `<circle cx="500" cy="805" r="80" fill="none" stroke="${K.cold}" stroke-width="9" opacity="${1 - .6 * draw}"/>
    <path d="${path}" fill="none" stroke="${K.ink}" stroke-width="18" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(draw)} 2"/>
    <path d="${path}" fill="none" stroke="${K.white}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(draw)} 2"/>
    <g transform="translate(500 625) scale(${hot})"><circle r="78" fill="none" stroke="${K.ink}" stroke-width="16"/><circle r="78" fill="none" stroke="${K.hot}" stroke-width="9"/></g>`;
  const z = lerp(1.55, 1.5, eio(prog(t, 21.9, 24)));
  return `${DEFS}${cam(scene + over, z, 520, 760)}
    <g transform="translate(860 330) scale(${q}) rotate(${8 * Math.sin(t * 3)})">${HL('?', 0, 70, 230, K.pink, 20)}</g>`;
}
