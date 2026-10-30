// 50.16–51.6: REGEL 4 in the back room; the closed window glows as the next goal.
import { K, DEFS, FG, prog, back, eio, person, bear, regel } from './lib.js';
import { backRoom } from './sets.js';
export default function renderShot(t) {
  const card = back(prog(t, 50.3, 50.55));
  const g = .5 + .5 * Math.sin(t * 6);
  const z = 1.05 + .05 * eio(prog(t, 50.16, 51.6));
  const sc = `${backRoom(t)}<rect x="510" y="290" width="460" height="640" fill="none" stroke="${K.amb}" stroke-width="10" opacity="${.5 + .5 * g}"/>
    ${person('v', 300, 820, .85, { aL: [10, 6], aR: [40, 70], brow: 'worry', mouth: 'tight', look: 14 })}
    ${person('m', 460, 900, .72, { aL: [10, 10], aR: [-10, -60], brow: 'worry', mouth: 'worried', look: 14 })}
    ${person('k', 340, 1080, .66, { aR: [-10, -70], aL: [30, 40], brow: 'worry', mouth: 'o', look: 14, front: bear(70, 140, .6, -10) })}`;
  return `${DEFS}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${sc}</g>${regel(4, 540, 190, card)}${FG(1430)}`;
}
