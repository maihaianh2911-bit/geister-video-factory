// 8.02–10.6: archive date card 4.7.1999, red stamp lands on the year
import { K, DEFS, BG, card, stamp, grain, prog, eout, back } from './lib.js';
export default function renderShot(t) {
  return `${DEFS}${BG(K.paper)}<rect x="140" y="420" width="800" height="940" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5" transform="rotate(2 540 890)"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M 220 ${560 + i * 60} H ${700 + (i % 3) * 60}" stroke="${K.paperD}" stroke-width="16" transform="rotate(2 540 890)"/>`).join('')}
    ${card(540, 1060, '4.7.1999', 150, prog(t, 8.05, 8.2), { sc: back(prog(t, 8.05, 8.35)), w: 820 })}
    ${grain(t)}`;
}
