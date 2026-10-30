// 10.55–12.24: cut-away: the stairwell beyond is full of smoke, fire glow below; smoke streams through the gap into the flat.
import { K, DEFS, FG, prog, eio, stairwell, smokeFlow, person, lab } from './lib.js';
export default function renderShot(t) {
  const z = 1 + .04 * prog(t, 10.55, 12.24);
  const stair = `<clipPath id="v8L"><rect x="-60" y="-60" width="580" height="2040"/></clipPath><g clip-path="url(#v8L)">${stairwell(t)}</g>`;
  return `${DEFS}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    <rect x="520" y="-60" width="620" height="2040" fill="#1E2A30"/>
    <rect x="520" y="1300" width="620" height="700" fill="${K.floor}"/>
    ${stair}
    <rect x="500" y="-60" width="40" height="760" fill="#3A4B56" stroke="#0B0F12" stroke-width="6"/>
    <rect x="500" y="1300" width="40" height="700" fill="#3A4B56" stroke="#0B0F12" stroke-width="6"/>
    <polygon points="540,700 640,690 640,1310 540,1300" fill="url(#vDoor)" stroke="#0B0F12" stroke-width="6"/>
    ${smokeFlow(t, { t0: 10.3, x0: 560, y0: 760, vx: 230, vy: -40, n: 34, gap: .05, life: 2.6, r0: 30, grow: 80, spread: 60, seed: 11, op: .95, keep: 1 })}
    ${person('v', 790, 900, .55, { aL: [40, 70], aR: [10, 6], brow: 'up', eyeS: 1.2, mouth: 'o', look: -14 })}
    ${person('m', 960, 960, .5, { aL: [10, 10], aR: [16, 8], brow: 'worry', eyeS: 1.2, mouth: 'o', look: -14 })}
    ${person('k', 900, 1060, .46, { aR: [20, 30], aL: [6, 4], brow: 'worry', mouth: 'o', look: -14 })}
    </g>${FG(1430)}`;
}
