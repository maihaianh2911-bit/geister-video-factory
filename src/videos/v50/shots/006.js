// "du musst die Augen zukneifen": hand to forehead, eyes squeeze shut on "zukneifen".
import { P, prog, eio, back, lerp, punch, shake, parlour, bust, painBurst } from './lib.js';
const T0 = 7.70;
export default function renderShot(t) {
  const lift = eio(prog(t, 7.75, 8.1));
  const sq = t >= 8.44;
  const [sx, sy] = shake(t, 8.44, 8, 5);
  const S = 1.5, oy = 1140;
  const handL = [lerp(-190, -150, lift), lerp(420, -300, lift)];
  const fx = 540, fy = oy - (230 + 78) * S;
  return punch(t, T0, `${parlour(t, { blur: true, dx: 40 })}
    <g transform="translate(${540 + sx} ${oy + sy}) scale(${S})">${bust({ id: 's6', hand: [200, 330], handL: lift > 0 ? handL : null, handRotL: -20, tilt: sq ? -6 : -2,
      head: { eyes: sq ? 'squeeze' : 'wide', mouth: sq ? 'ouch' : 'o', brow: sq ? -1 : .5, blush: .8 }, coneO: { bite: 1, rot: lerp(0, 24, lift) } })}</g>
    ${painBurst(fx + sx, fy + sy, 52 * (1 + .2 * Math.sin(t * 14)), 1, P.red)}`);
}
