// "und langsamer essen, damit dein Mund nicht so plötzlich auskühlt": calm small bites, mouth stays warm.
import { P, prog, eio, lerp, punch, parlour, bust, thermo } from './lib.js';
import { spoon } from './035.js';
const T0 = 67.90;
export default function renderShot(t) {
  const u = prog(t, 68.0, 69.4);
  const toMouth = Math.sin(u * Math.PI);
  const H = [lerp(-230, -60, toMouth), lerp(200, -90, toMouth)];
  return punch(t, T0, `${parlour(t, { dx: -40 })}
    <g transform="translate(600 1080) scale(1.3)">${bust({ id: 's37', hand: [210, 260], handL: H, holdL: spoon, head: { eyes: toMouth > .7 ? 'happy' : 'open', mouth: toMouth > .7 ? 'chew' : 'smile', look: -8 }, coneO: { bite: .35 } })}</g>
    <g>${thermo(130, 1320, .62 + .02 * Math.sin(t * 3), P.teal, .75)}</g>`);
}
