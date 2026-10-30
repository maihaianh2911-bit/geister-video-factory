// 61.1–62.4: … and eat more slowly — she savours calmly, cone lowered, unhurried
import { K, DEFS, parlour, counterFront, lea, cam, card, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'E', cone: { x: 790, y: 1005, rot: 4, bite: 1, small: 1 }, eyes: 'happy', brow: 'calm', mouth: 'chew', chew: Math.sin(t * 4.5) * .5 + .5, tilt: 2 * Math.sin(t * 2) }) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.9, 1.85, eio(prog(t, 61.1, 62.4))), 500, 760)}
    ${card(540, 260, 'KLEINE BISSEN', 92, 1, { bg: K.teal, col: K.white })}`;
}
