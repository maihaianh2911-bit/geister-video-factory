// 25.6–27.16: banknotes counted into a hand — 31.000 DM for everything
import { K, DEFS, BG, notes, hand, card, grain, cam, prog, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const n = Math.round(lerp(1, 9, eout(prog(t, 25.6, 26.6))));
  return `${DEFS}${BG(K.paper)}${cam(`<rect x="-60" y="900" width="1200" height="1100" fill="${K.brown}"/>` + hand(820, 1060, 180, 1.4, '#2E3438') + notes(540, 1000, n, 1.2), 1, 540, 1000)}
    ${card(540, 470, '31.000 DM', 130, prog(t, 25.68, 25.8), { sc: back(prog(t, 25.68, 26)) })}${grain(t)}`;
}
