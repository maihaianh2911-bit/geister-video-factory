// 83.7–86.96: about 3,600 years old — a counter runs back along a timeline to ≈ 3.600 JAHRE
import { K, DEFS, BG, disc, card, grain, prog, eio, eout, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 83.8, 84.9));
  const n = Math.round(lerp(0, 3600, p) / 100) * 100;
  const txt = n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, '0')}` : `${n}`;
  return `${DEFS}${BG(K.paper)}<path d="M 120 1100 H 960" stroke="${K.ink}" stroke-width="10"/>
    ${[...Array(8)].map((_, i) => `<path d="M ${120 + i * 120} 1080 V 1120" stroke="${K.ink}" stroke-width="6"/>`).join('')}
    <circle cx="${f1(lerp(960, 160, p))}" cy="1100" r="22" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/>
    ${disc(lerp(960, 200, p), 900, 110, { id: 'Q', damage: true })}
    ${card(540, 560, `≈ ${txt} JAHRE`, 104, 1, { w: 860, sc: 1 + .06 * back(prog(t, 84.84, 85.1)) * (1 - prog(t, 85.1, 85.4)) })}${grain(t)}`;
}
