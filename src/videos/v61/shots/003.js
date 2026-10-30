// 2.46–4.0: the big bite — cone into the mouth on "Stück", pulled away on "ab" with a bite missing, cheeks full
import { K, DEFS, parlour, counterFront, lea, cam, shk, prog, eout, eio, ein, lerp } from './lib.js';
export default function renderShot(t) {
  const inP = eio(prog(t, 2.46, 3.2)), outP = eout(prog(t, 3.42, 3.9));
  const bitten = t >= 3.3;
  const cone = { x: lerp(lerp(690, 632, inP), 770, outP), y: lerp(lerp(1000, 1000, inP), 1000, outP), rot: lerp(lerp(-22, -26, inP), -6, outP), bite: bitten ? 1 : 0 };
  const [sx, sy] = shk(t, 3.3, 7, 9);
  const z = lerp(1.7, 1.55, eio(prog(t, 3.3, 4)));
  const mouth = t < 3.0 ? 'open' : 'chew';
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'c', cone, look: t < 3.3 ? 8 : 0, lookY: 6, eyeS: t < 3.3 ? 1.1 : 1, brow: t < 3.3 ? 'up' : 'calm', eyes: t > 3.3 && t < 3.55 ? 'closed' : 'open', mouth, puff: eout(prog(t, 3.3, 3.6)), chew: Math.sin(t * 14) * .5 + .5 }) + counterFront(1236);
  return `${DEFS}<g transform="translate(${sx} ${sy})">${cam(scene, z, 540, 860)}</g>`;
}
