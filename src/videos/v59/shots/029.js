// 47.04–48.6: inside the back room the father pushes the door shut; click; mother and child by the window.
import { K, DEFS, FG, prog, ein, back, shk, flatDoor, person, reach, rings, bear } from './lib.js';
import { backRoom } from './sets.js';
export default function renderShot(t) {
  const open = .7 * (1 - ein(prog(t, 47.1, 47.55)));
  const [sx, sy] = shk(t, 47.55, 8, 7);
  const ox = 140 + 360 * (1 - .78 * open);
  const aR = reach('v', 330, 760, .95, -1, ox - 20, 1040);
  return `${DEFS}<g transform="translate(${sx} ${sy})">${backRoom(t)}
    <rect x="80" y="440" width="460" height="840" fill="#2A3A40"/>
    ${flatDoor(120, 460, 360, 800, open, { gap: '#1A2228' })}
    ${person('v', 330, 760, .95, { back: 1, aL: aR, aR: [10, 6] })}
    ${person('m', 820, 900, .72, { aL: [10, 10], aR: [-10, -60], brow: 'worry', mouth: 'worried', look: -12 })}
    ${person('k', 700, 1040, .7, { aR: [-10, -70], aL: [30, 40], brow: 'worry', mouth: 'o', look: -12, front: bear(70, 140, .6, -10) })}
    ${rings(t, 47.55, 480, 870, K.safe, 2, 180, 8)}</g>
    ${FG(1430)}`;
}
