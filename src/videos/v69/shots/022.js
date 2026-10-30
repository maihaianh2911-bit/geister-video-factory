// 71.4–76.644: let the rescuers secure the lift and help you out one by one — a firefighter at the gap fixes a lock on the door ("sichern"), then reaches down and lifts the child out first ("einzeln")
import { K, DEFS, cabin, bust, hiviz, light, label, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const lock = back(prog(t, 72.8, 73.2));
  const reach = eio(prog(t, 73.6, 74.4));
  const lift = eio(prog(t, 74.6, 75.8));
  const kx = lerp(560, 600, lift), ky = lerp(1240, 900, lift);
  const sc = `${cabin(t, { lit: 0, gap: 1, gapFill: '#E8E6D8' })}
    <rect x="300" y="300" width="480" height="${f1(420)}" fill="#E8E6D8"/>
    ${hiviz(560, 470, 1.0, { look: 0, lookY: .8, brow: 0, mouth: 'smile', aL: [[430, lerp(700, 820, reach)], [lerp(450, kx - 60, reach), lerp(760, ky - 40, reach)]], aR: [[690, lerp(700, 820, reach)], [lerp(670, kx + 60, reach), lerp(760, ky - 40, reach)]] })}
    <rect x="240" y="740" width="600" height="30" fill="#9A8C76" stroke="${K.ink}" stroke-width="6"/>
    ${lock > 0 ? `<g transform="translate(860 760) scale(${f1(lock)})"><rect x="-44" y="-20" width="88" height="70" rx="10" fill="${K.amber}" stroke="${K.ink}" stroke-width="6"/><path d="M -26 -20 v -24 q 26 -36 52 0 v 24" fill="none" stroke="${K.ink}" stroke-width="8"/></g>` : ''}
    ${light(540, 1000, 520, .9)}
    ${bust('kid', kx, ky, 1.1, { look: 0, lookY: -1, brow: .2, mouth: 'smile' })}
    ${bust('wom', 260, 1160, 1.1, { look: .6, lookY: -.6, brow: .2, mouth: 'smile' })}${bust('man', 860, 1180, 1.1, { look: -.6, lookY: -.6, brow: .2 })}`;
  return `${DEFS}${cam(sc, 1.0, 540, 900)}${label(540, 230, 'GESICHERT', eout(prog(t, 73.0, 73.3)), K.amber, 60)}${label(540, 1380, 'EINZELN', eout(prog(t, 74.1, 74.4)), K.amber, 52)}`;
}
