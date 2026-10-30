// 34.0–35.94: the offer — 1.000.000 DM, stamped
import { K, DEFS, BG, card, stamp, disc, grain, prog, back } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${BG(K.paper)}<rect x="160" y="300" width="760" height="1060" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5" transform="rotate(-2 540 830)"/>
    ${disc(540, 640, 180, { id: 's', damage: true })}
    ${[0, 1, 2].map(i => `<path d="M 240 ${1240 + i * 40} H ${800 - i * 90}" stroke="${K.paperD}" stroke-width="14"/>`).join('')}
    ${card(540, 1020, '1.000.000 DM', 112, prog(t, 34.3, 34.45), { sc: back(prog(t, 34.3, 34.6)), w: 880 })}${grain(t)}`;
}
