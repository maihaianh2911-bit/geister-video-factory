// 16.3–18.78: the father's face, red alarm light; eyes jump between door and family; "?" on "Sicherheit".
import { K, DEFS, FG, prog, back, eio, head, smokeFlow, TX, cl } from './lib.js';
export default function renderShot(t) {
  const led = Math.sin(t * 26) > -.2 ? 1 : 0;
  const look = t < 16.9 ? -14 : t < 17.4 ? 14 : -6;
  const q = back(prog(t, 17.6, 17.85));
  const z = 1.0 + .06 * eio(prog(t, 16.3, 18.78));
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A2228"/>
    <rect x="-60" y="-60" width="260" height="2040" fill="url(#vFire)" opacity=".5"/>
    ${smokeFlow(t, { t0: 15.6, x0: -40, y0: 260, vx: 120, vy: 10, n: 30, gap: .08, life: 3.5, r0: 40, grow: 60, spread: 90, seed: 5, op: .9, keep: 1 })}
    <g transform="translate(560 860) scale(${z})">
      <path d="M -330 640 Q -320 300 -150 260 L 150 260 Q 320 300 330 640 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>
      ${head('v', 0, 0, 2.3, { brow: 'worry', eyeS: 1.15, mouth: 'tight', look, lookY: 0, blink: t > 17.42 && t < 17.52 ? 1 : 0 })}
    </g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.red}" opacity="${.14 * led}"/>
    ${q > 0 ? `<g transform="translate(870 400) scale(${q}) rotate(${8 * (1 - cl(q))})">${TX('?', 0, 90, 300, K.amb, 'middle', 'stroke="#0B0F12" stroke-width="18" paint-order="stroke"')}</g>` : ''}
    ${FG(1430)}`;
}
