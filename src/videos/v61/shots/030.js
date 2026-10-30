// 59.16–61.1: next time — small bites: a little nibble from the scoop, card KLEINE BISSEN
import { K, DEFS, parlour, counterFront, lea, cam, card, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const go = eio(prog(t, 59.4, 60.3)), ret = eout(prog(t, 60.5, 61.0));
  const k = go * (1 - ret);
  const cone = { x: lerp(790, 650, k), y: lerp(1005, 1010, k), rot: lerp(4, -20, k), bite: 1, small: t > 60.38 ? 1 : 0 };
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'D', cone, eyes: 'open', look: 8 * k, lookY: 6, brow: 'calm', mouth: k > .6 && t < 60.45 ? 'o' : t > 60.45 ? 'chew' : 'soft', chew: Math.sin(t * 9) * .5 + .5 }) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.5, 1.55, eio(prog(t, 59.16, 61.1))), 520, 900)}
    ${card(540, 260, 'KLEINE BISSEN', 92, prog(t, 60.35, 60.5), { sc: back(prog(t, 60.35, 60.65)), bg: K.teal, col: K.white })}`;
}
