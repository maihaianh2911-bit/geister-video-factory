// 7.6–9.26: she presses a palm to her forehead and squeezes her eyes shut (Augen zukneifen)
import { K, DEFS, parlour, counterFront, lea, cam, zap, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 7.6, 8.1));
  const sq = t >= 8.25;
  const hand = { kind: 'palm', x: lerp(300, 395, reach), y: lerp(1120, 615, reach), ang: lerp(-30, -95, reach) };
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'f', cone: { x: 800, y: 1010, rot: 8, bite: 1 }, handL: reach > .05 ? hand : { kind: 'rest' }, eyes: sq ? 'squeeze' : 'open', eyeS: .85, brow: 'pain', mouth: 'grit', puff: .1, pain: .9 + .1 * Math.sin(t * 16), tremble: sq ? 3 : 0, tilt: sq ? -4 * eout(prog(t, 8.25, 8.6)) : 0 }) + counterFront(1236);
  const z = lerp(1.45, 1.55, eio(prog(t, 7.6, 9.26)));
  return `${DEFS}${cam(scene, z, 520, 860)}${zap(560, 330, 1, .9)}`;
}
