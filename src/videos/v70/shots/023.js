// 59.48–63.48: your car from above — which panes are laminated (windscreen, here also the front side windows) and which toughened side windows you can break to get out ("einschlagen")
import { K, DEFS, BG, carTop, label, tick, crossOut, TX, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const v = eout(prog(t, 59.7, 60.1)), e = eout(prog(t, 61.9, 62.3));
  const VB = '#7C93A6', ES = K.amber;
  const win = { ws: v > .5 ? VB : undefined, fl: v > .5 ? VB : undefined, fr: v > .5 ? VB : undefined, rl: v > .5 ? ES : undefined, rr: v > .5 ? ES : undefined, rw: v > .5 ? ES : undefined };
  const s = 1.55, x = 540, y = 860;
  const legend = `<g opacity="${f1(v)}"><rect x="140" y="1300" width="44" height="44" fill="${VB}" stroke="${K.ink}" stroke-width="4"/>${TX('VERBUND', 200, 1336, 44, K.mono, 'start')}
    <rect x="620" y="1300" width="44" height="44" fill="${ES}" stroke="${K.ink}" stroke-width="4"/>${TX('ESG', 680, 1336, 44, K.mono, 'start')}</g>`;
  // rear side windows (car coords ±128, 110) -> screen
  const rl = [x - 128 * s, y + 110 * s], rr = [x + 128 * s, y + 110 * s];
  return `${DEFS}${BG('#141A1F')}${carTop(x, y, s, 0, { win })}${legend}
    ${tick(rl[0] - 90, rl[1], 1.2, e)}${tick(rr[0] + 90, rr[1], 1.2, e)}
    ${crossOut(x, y - 175 * s - 10, 80, e)}
    ${label(540, 230, 'DEIN AUTO', 1, K.mono, 64)}`;
}
