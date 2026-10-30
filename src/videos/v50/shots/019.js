// "an der Stirn oder an den Schläfen": pain lights at the forehead, then at both temples.
import { P, prog, back, punch, shake, bgPlain, head, painBurst } from './lib.js';
const T0 = 30.90;
export default function renderShot(t) {
  const S = 2.15, cx = 540, cy = 820;
  const f = back(prog(t, 31.18, 31.38)), s = back(prog(t, 32.1, 32.3));
  const [sx, sy] = shake(t, 32.1, 8, 6);
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    <g transform="translate(${cx + sx} ${cy + sy}) scale(${S})">${head({ id: 's19', mouth: 'ouch', eyes: t > 31.18 ? 'squeeze' : 'open', brow: -1 })}</g>
    ${painBurst(cx, cy - 78 * S, 62 * f, f)}${painBurst(cx - 140 * S, cy - 50 * S, 50 * s, s)}${painBurst(cx + 140 * S, cy - 50 * S, 50 * s, s)}`);
}
