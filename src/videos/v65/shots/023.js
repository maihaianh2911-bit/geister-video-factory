// 71.58–74.28: right page ENTFERNEN — every species is crossed out on "sämtlicher Arten", next to the left page where only two are targeted
import { K, DEFS, BG, vig, kcard, f1, prog, eio, eout } from './lib.js';
import { grid, page } from './022.js';
export default function renderShot(t) {
  const on = eout(prog(t, 71.6, 71.9));
  const cross = eout(prog(t, 72.7, 73.2));
  const sc = `${BG('url(#mData)')}${page(40, 480, '', K.cyan, 1 - .5 * on)}${page(560, 480, '', K.sun, .35 + .65 * on)}
    <g opacity="${f1(1 - .5 * on)}">${grid(40, t, 1, 0, 1)}</g>${grid(560, t, 0, cross, prog(t, 71.6, 72.4))}`;
  return `${DEFS}${sc}${kcard(280, 210, 'BEKÄMPFEN', 1 - .5 * on, { sz: 52, sub: 'bestimmte Überträger' })}${kcard(800, 210, 'ENTFERNEN', .35 + .65 * on, { sz: 52, col: K.sun, sub: 'alle Arten' })}${vig()}`;
}
