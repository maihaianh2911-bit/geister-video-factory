// "Das Signal läuft über einen Gefühlsnerv": a spark travels the nerve from the palate upward; the nerve lights up.
import { P, prog, eio, back, punch, bgPlain, profileHead, nerve, spark, bez, NERVE_MAIN, NERVE_FORE, NERVE_TEMP, NM } from './lib.js';
const T0 = 23.94;
export default function renderShot(t) {
  const run = eio(prog(t, 24.12, 24.95));
  const glow = prog(t, 25.2, 25.6);
  const [x, y] = bez(NM, run);
  const pulse = t > 25.2 ? 1 + .3 * Math.abs(Math.sin((t - 25.2) * 6)) : 1;
  const extra = `${nerve(NERVE_MAIN, run, 200, 12 * pulse)}${nerve(NERVE_FORE, glow, 260, 12 * pulse)}${nerve(NERVE_TEMP, glow, 130, 12 * pulse)}${run < 1 ? spark(x, y, 20) : spark(40, -20, 18 * pulse)}`;
  return punch(t, T0, `${bgPlain('#FFF7E0')}
    <g transform="translate(450 760) scale(1.25)">${profileHead({ id: 's15', skinA: .3, extra })}</g>`);
}
