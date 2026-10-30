// 51.6–53.3: the father opens the window: clear cold air, no smoke outside; mother and child right behind him.
import { K, DEFS, FG, prog, eio, person, reach, bear } from './lib.js';
import { backRoom } from './sets.js';
export default function renderShot(t) {
  const op = eio(prog(t, 52.4, 52.85));
  const aL = reach('v', 640, 900, .9, -1, 790 - 200 * op, 640, -1);
  let air = '';
  for (let i = 0; i < 5; i++) { const q = ((t - 52.6) * .8 + i * .2) % 1; if (t > 52.6) air += `<path d="M ${880 - 300 * q} ${420 + i * 90} q -40 -16 -80 0" stroke="#CFE3F0" stroke-width="6" fill="none" opacity="${.6 * (1 - q)}"/>`; }
  return `${DEFS}<g transform="translate(540 900) scale(1.18) translate(-650 -800)">${backRoom(t, { open: op })}${air}
    ${person('v', 640, 900, .9, { back: 1, aL, aR: [10, 6] })}
    ${person('m', 330, 960, .78, { aL: [10, 10], aR: [-10, -60], brow: 'worry', mouth: 'worried', look: 14 })}
    ${person('k', 450, 1110, .72, { aR: [-10, -70], aL: [30, 40], brow: 'worry', mouth: 'o', look: 14, front: bear(70, 140, .6, -10) })}</g>
    ${FG(1430)}`;
}
