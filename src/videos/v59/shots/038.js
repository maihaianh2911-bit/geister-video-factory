// 61.88–63.6: at the open window the father keeps the phone at his ear and listens; mother holds the child.
import { K, DEFS, FG, prog, eio, person, reach, bear, phone } from './lib.js';
import { backRoom } from './sets.js';
export default function renderShot(t) {
  const up = eio(prog(t, 61.9, 62.3));
  const vx = 420, vy = 780, vs = .95;
  const ear = reach('v', vx, vy, vs, 1, vx + 70, vy - 100, -1);
  const aR = [lerp2(10, ear[0], up), lerp2(6, ear[1], up)];
  const nod = 4 * Math.sin(t * 5);
  return `${DEFS}<g transform="translate(540 900) scale(1.1) translate(-540 -900)">${backRoom(t, { open: 1 })}
    ${person('v', vx, vy, vs, { aR, aL: [10, 6], brow: 'worry', mouth: 'tight', look: 10, tilt: nod, holdR: (x, y) => up > .6 ? phone(x - 4, y - 30, .4, 10, '', .3) : '' })}
    ${person('m', 760, 860, .78, { aL: [-10, -60], aR: [10, 10], brow: 'worry', mouth: 'worried', look: -12 })}
    ${person('k', 640, 1040, .7, { aR: [40, 60], aL: [-10, -70], brow: 'worry', mouth: 'o', look: -12, front: bear(-60, 140, .6, -10) })}</g>
    ${FG(1430)}`;
}
function lerp2(a, b, p) { return a + (b - a) * p; }
