// 69.26–71.4: don't just step out now — the man lifts his foot toward the gap; your arm comes across and stops him ("hinaus")
import { K, DEFS, cabin, bust, light, crossOut, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const step = eio(prog(t, 69.3, 69.9)) * (1 - eio(prog(t, 70.5, 71.1)));
  const arm = eio(prog(t, 69.8, 70.4));
  const sc = `${cabin(t, { lit: 0, gap: .55, gapFill: '#E8E6D8' })}${light(540, 900, 520, 1)}
    ${bust('man', lerp(700, 640, step), 960, 1.15, { look: lerp(-.8, .6, arm), brow: .5, mouth: arm > .5 ? 'o' : 'flat' })}
    ${bust('you', 220, 1140, 1.25, { look: .9, brow: .7, mouth: 'talk', t, aR: [[lerp(300, 450, arm), lerp(1400, 1100, arm)], [lerp(320, 620, arm), lerp(1500, 1060, arm)]], noL: true })}`;
  return `${DEFS}${cam(sc, 1.05, 560, 1000)}${label2(t)}`;
}
const label2 = t => '';
