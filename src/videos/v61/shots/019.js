// 32.7–35.0: front view — pain glows on forehead and temples although the cause (cold) sits in the mouth
import { K, DEFS, parlour, counterFront, lea, cam, flake, prog, eout, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const cause = back(prog(t, 33.25, 33.6));
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 's', cone: { x: 790, y: 1005, rot: 4, bite: 1 }, eyes: 'squeeze', brow: 'pain', mouth: 'grit', pain: .95, temple: .9 }) + counterFront(1236);
  const over = `<g transform="translate(500 808) scale(${cause})"><ellipse rx="70" ry="44" fill="url(#eCold)"/><ellipse rx="70" ry="44" fill="none" stroke="${K.ink}" stroke-width="14"/><ellipse rx="70" ry="44" fill="none" stroke="${K.cold}" stroke-width="7"/></g>
    ${flake(500, 880, .5 * cause, cause)}
    `;
  return `${DEFS}${cam(scene + over, 1.75, 500, 760)}`;
}
