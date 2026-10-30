// 20.5–21.86: the driver window slides down ("Seitenfenster"): the glass drops into the door, rain blows in; you watch it open
import { K, DEFS, BG, headOf, water, rain, light, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 20.6, 21.6));
  const top = lerp(330, 1060, d);
  const sc = `${BG('#141B20')}
    <path d="M 120 300 L 1000 280 L 1000 1060 L 120 1060 Z" fill="#0E1418"/>
    <clipPath id="s8w"><path d="M 120 300 L 1000 280 L 1000 1060 L 120 1060 Z"/></clipPath>
    <g clip-path="url(#s8w)">${water(t, 820, { amp: 14 })}${rain(t, 1.2, 50)}
      <rect x="100" y="${f1(top)}" width="920" height="800" fill="${K.glassL}" opacity=".25"/><path d="M 100 ${f1(top)} H 1020" stroke="${K.glassL}" stroke-width="8" opacity=".8"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${200 + i * 140}" cy="${f1(top + 120 + (i % 3) * 140)}" r="9" fill="${K.glassL}" opacity=".5"/>`).join('')}</g>
    <path d="M 120 300 L 1000 280 L 1000 1060 L 120 1060 Z" fill="none" stroke="${K.ink}" stroke-width="14"/>
    <path d="M -60 1060 L 1140 1060 L 1140 1980 L -60 1980 Z" fill="#232B31" stroke="${K.ink}" stroke-width="6"/><path d="M -60 1100 H 1140" stroke="${K.carD}" stroke-width="16"/>
    ${d > .3 ? rain(t + 3, .8 * d, 14).replace(/stroke="#8FB3C2"/g, `stroke="${K.foam}"`) : ''}
    <g opacity=".95">${headOf('you', 80, 1230, 2.4, { look: 1, lookY: -.6, brow: .7, mouth: 'flat' })}</g>
    ${light(540, 1100, 600, .3)}`;
  return `${DEFS}${sc}`;
}
