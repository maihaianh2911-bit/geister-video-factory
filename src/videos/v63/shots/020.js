// 35.94–37.72: February 2002 — date card 23.2.2002
import { K, DEFS, BG, card, grain, prog, back, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const pages = [...Array(4)].map((_, i) => `<rect x="${260 + i * 8}" y="${480 - i * 8}" width="560" height="700" fill="${i === 3 ? K.paperL : K.paperD}" stroke="${K.ink}" stroke-width="5"/>`).join('');
  return `${DEFS}${BG(K.paper)}${pages}<rect x="284" y="456" width="560" height="120" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/>
    ${card(540, 900, '23.2.2002', 140, prog(t, 35.95, 36.1), { sc: back(prog(t, 35.95, 36.3)), w: 800 })}${grain(t)}`;
}
