import { P, ST, bars, cellSet, fig, hat, shk, tally, frame, prog, eout, lerp } from './lib.js';
// 50.1–51.72 Back in prison: the bars slam shut again on "Gefängnis".
export default function renderShot(t) {
  const bx = lerp(1200, 0, eout(prog(t, 50.42, 50.68))) + shk(t, 50.68, 14, 7);
  const sink = eout(prog(t, 50.8, 51.4));
  return frame(t, `${cellSet(t, .7)}${tally(30, 520, 620)}
    <rect x="80" y="1200" width="420" height="70" fill="${P.woodSh}" ${ST(5)}/>
    ${fig(330, 1500, 1.25, { kind: 'voigtLate', hat: 'none', aR: -8, aL: 12, headDy: 14 * sink, look: t < 50.6 ? 14 : 4, lookY: lerp(-4, 14, sink), mouth: 'frown', brow: 'worried' })}
    <g opacity=".95">${bars(bx)}</g>`);
}
