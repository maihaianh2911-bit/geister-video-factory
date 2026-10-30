// 19.8–21.9: back at the counter — the ice is in her MOUTH (blue circle on the mouth)
import { K, DEFS, parlour, counterFront, lea, cam, flake, prog, eout, eio, back, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const ring = back(prog(t, 20.5, 20.85)), pulse = 1 + .08 * Math.sin(Math.max(0, t - 21.5) * 12) * (t > 21.5 ? 1 : 0);
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'm', cone: { x: 790, y: 1005, rot: 4, bite: 1 }, eyes: 'open', eyeS: .95, brow: 'pain', mouth: 'flat', look: 0, lookY: 8, pain: .5, blink: blinkAt(t) }) + counterFront(1236);
  const z = lerp(1.35, 1.42, eio(prog(t, 19.8, 21.9)));
  return `${DEFS}${cam(scene + `<g transform="translate(500 805) scale(${ring * pulse})"><circle r="92" fill="${K.cold}" opacity=".25"/><circle r="92" fill="none" stroke="${K.ink}" stroke-width="16"/><circle r="92" fill="none" stroke="${K.cold}" stroke-width="9"/></g>
    ${flake(640, 900, .6 * ring, ring)}`, z, 520, 860)}`;
}
