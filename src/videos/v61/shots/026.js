// 49.18–50.82: it is not dangerous — she relaxes and smiles, a green check appears (nicht)
import { K, DEFS, parlour, counterFront, lea, cam, check, prog, eout, eio, back, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const c = back(prog(t, 50.3, 50.6));
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'z', cone: { x: 800, y: 1010, rot: 8, bite: 1 }, eyes: t > 50.3 ? 'happy' : 'open', brow: 'calm', mouth: t > 50.0 ? 'smile' : 'soft', blink: blinkAt(t, 1), tilt: 3 * eio(prog(t, 50.2, 50.8)) }) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.2, 1.25, eio(prog(t, 49.18, 50.82))), 520, 880)}${check(820, 420, 1.3 * c, prog(t, 50.3, 50.4))}`;
}
