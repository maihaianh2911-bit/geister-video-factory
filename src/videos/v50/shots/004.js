// "noch bevor du es genießen kannst": happy chewing, first frost flicker at the end.
import { P, prog, eio, back, lerp, punch, parlour, bust, frostCrystal } from './lib.js';
const T0 = 4.06;
export default function renderShot(t) {
  const chew = Math.abs(Math.sin((t - T0) * 7));
  const enjoy = prog(t, 4.9, 5.2);
  const warn = prog(t, 5.7, 6.1);
  const fy = 1060 - (230 + 78) * 1.2;
  return punch(t, T0, `${parlour(t, { dx: -30 })}
    <g transform="translate(560 1060) scale(1.2)">${bust({ id: 's4', hand: [210, 230], tilt: 4 * Math.sin((t - T0) * 2.4), head: { eyes: enjoy > 0 ? 'happy' : 'open', mouth: 'chew', cheek: .6 + .4 * chew, blush: .5 + .4 * enjoy, look: 10 }, coneO: { bite: 1 } })}</g>
    ${frostCrystal(560, fy, 34 * back(warn), 20 * warn, P.cold)}`);
}
