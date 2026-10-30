// "Dein Gehirn spürt den Schmerz": the signal reaches the brain; the brain flashes red on "Schmerz".
import { P, prog, eio, punch, mix, bgPlain, profileHead, nerve, spark, bez, NERVE_MAIN, NERVE_BRAIN, NB } from './lib.js';
const T0 = 29.12;
export default function renderShot(t) {
  const run = eio(prog(t, 29.12, 29.5));
  const lit = prog(t, 29.5, 29.8), pain = t > 30.24 ? Math.exp(-(t - 30.24) * 2.5) : 0;
  const [x, y] = bez(NB, run);
  const glow = `<path d="M -230 -150 C -240 -320 -40 -360 100 -330 C 230 -300 260 -180 220 -110 C 190 -60 120 -70 60 -60 C -20 -50 -60 -40 -120 -30 C -200 -20 -225 -80 -230 -150 Z" fill="${P.red}" opacity="${.55 * pain}"/>`;
  let rings = '';
  if (t > 30.24) for (let k = 0; k < 2; k++) { const p = prog(t, 30.24 + k * .2, 30.84 + k * .2); if (p > 0 && p < 1) rings += `<circle cx="0" cy="-190" r="${200 + 160 * p}" fill="none" stroke="${P.red}" stroke-width="${12 * (1 - p)}"/>`; }
  const extra = `${glow}${nerve(NERVE_MAIN, 1, 200, 10)}${nerve(NERVE_BRAIN, run, 140, 10)}${run < 1 ? spark(x, y, 18) : ''}`;
  return punch(t, T0, `${bgPlain('#FDECEF')}
    <g transform="translate(560 1020) scale(2.0)">${profileHead({ id: 's18', skinA: .25, brainCol: mix(P.brain, '#FFD0DC', lit * (1 - pain)), extra })}${rings}</g>`);
}
