import { P, ST, bars, cellSet, fig, hat, shk, tally, frame, cl, prog, eout, lerp } from './lib.js';
// 15.22–17.2 Prison: the bars slam shut on "Gefängnis"; tally marks on the wall count the long time.
export default function renderShot(t) {
  const n = Math.floor(cl((t - 16.0) / 1.1) * 30);
  const bx = lerp(1200, 0, eout(prog(t, 15.5, 15.76))) + shk(t, 15.76, 14, 7);
  return frame(t, `${cellSet(t)}${tally(n, 520, 620)}
    <rect x="80" y="1200" width="420" height="70" fill="${P.woodSh}" ${ST(5)}/>
    ${fig(330, 1500, 1.25, { kind: 'voigtCiv', hat: 'none', aR: -8, aL: 12, look: t < 15.9 ? 14 : 10, lookY: t < 15.9 ? 0 : -6, mouth: 'frown', brow: 'worried', eyeS: t > 15.76 && t < 16.2 ? 1.5 : 1 })}
    <g opacity=".95">${bars(bx)}</g>`);
}
