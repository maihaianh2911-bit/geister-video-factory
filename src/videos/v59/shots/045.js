// 74.6–76.2: inside the dark cabin the doors slide open — straight into thick smoke that rolls in on "Rauch".
import { K, DEFS, FG, prog, eio, smokeFlow, stairwell } from './lib.js';
export default function renderShot(t) {
  const o = eio(prog(t, 75.0, 75.7));
  const gw = 300 * o;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#2A3238"/>
    <clipPath id="v45g"><rect x="${540 - gw}" y="300" width="${2 * gw}" height="1000"/></clipPath>
    <g clip-path="url(#v45g)">${stairwell(t)}</g>
    ${o > .2 ? smokeFlow(t, { t0: 75.2, x0: 540, y0: 600, vx: 0, vy: 80, n: 40, gap: .03, life: 2, r0: 50, grow: 220, spread: 260, seed: 17, op: .95, keep: 1 }) : ''}
    <rect x="${240 - gw}" y="300" width="300" height="1000" fill="#7D8D97" stroke="#0B0F12" stroke-width="8"/>
    <rect x="${540 + gw}" y="300" width="300" height="1000" fill="#7D8D97" stroke="#0B0F12" stroke-width="8"/>
    <rect x="-60" y="-60" width="300" height="2040" fill="#3A464E"/><rect x="840" y="-60" width="300" height="2040" fill="#3A464E"/>
    <rect x="-60" y="-60" width="1200" height="360" fill="#2A3238"/><rect x="-60" y="1300" width="1200" height="700" fill="#22282C"/>
    <rect x="240" y="300" width="600" height="1000" fill="none" stroke="#0B0F12" stroke-width="12"/>
    ${FG(1430)}`;
}
