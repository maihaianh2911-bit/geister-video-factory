// 6.0–7.6: close-up — a sharp sting in the middle of the forehead (sticht … Stirn)
import { K, DEFS, parlour, lea, cam, shk, zap, prog, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const hit = prog(t, 6.02, 6.2), grow = eout(prog(t, 6.6, 7.05));
  const [sx, sy] = shk(t, 6.04, 14, 7);
  const pain = .45 * hit + .55 * grow + .08 * Math.sin(t * 18) * grow;
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'e', cone: { x: 790, y: 1005, rot: 4, bite: 1 }, eyes: 'open', eyeS: lerp(1.3, .85, hit), lookY: -8, brow: hit > .2 ? 'pain' : 'up', mouth: hit > .2 ? 'grit' : 'flat', puff: .2, pain });
  const z = lerp(2.15, 2.25, eout(prog(t, 6, 7.6)));
  return `${DEFS}<g transform="translate(${sx} ${sy})">${cam(scene, z, 520, 760)}</g>
    ${zap(520, 400, back(prog(t, 6.02, 6.25)) * 1.3 + .15 * grow, hit)}`;
}
