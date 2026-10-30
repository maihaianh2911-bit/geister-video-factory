// 9.1–10.55: through the crack: black smoke pours in under the ceiling; father recoils.
import { K, DEFS, FG, prog, back, eout, shk, head, smokeFlow, smokeMass } from './lib.js';
export default function renderShot(t) {
  const rec = back(prog(t, 9.62, 9.9));
  const [sx, sy] = shk(t, 9.68, 8, 6);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A2228"/>
    <g transform="translate(${sx} ${sy})">
    <rect x="560" y="100" width="90" height="1300" fill="#0E0909"/>
    <rect x="560" y="100" width="90" height="1300" fill="url(#vFire)" opacity=".55"/>
    <g>${smokeMass(t, 560, 100, 90, 1300, { n: 6, r: 50, seed: 2, op: .9 })}</g>
    <rect x="280" y="80" width="280" height="1340" fill="url(#vDoor)" stroke="#0B0F12" stroke-width="8"/>
    <rect x="650" y="80" width="80" height="1340" fill="${K.doorSh}" stroke="#0B0F12" stroke-width="8"/>
    <rect x="730" y="-60" width="420" height="2040" fill="#202C33"/>
    <rect x="-60" y="-60" width="340" height="2040" fill="#202C33"/>
    ${smokeFlow(t, { t0: 9.15, x0: 600, y0: 160, vx: -140, vy: 30, n: 44, gap: .03, life: 2.4, r0: 40, grow: 150, spread: 60, seed: 4, op: .95, keep: 1 })}
    ${smokeFlow(t, { t0: 9.4, x0: 620, y0: 360, vx: 110, vy: 10, n: 18, gap: .06, life: 2.4, r0: 30, grow: 90, spread: 50, seed: 7, op: .9, keep: 1 })}
    </g>
    <path d="M ${-200 - 60 * rec} 1500 Q ${-160 - 60 * rec} 1100 ${120 - 60 * rec} 1080 Q ${380 - 60 * rec} 1100 ${420 - 60 * rec} 1500 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>
    ${head('v', 210 - 60 * rec, 860 + 20 * rec, 1.75, { tilt: 4 - 8 * rec, brow: rec > .2 ? 'up' : 'worry', eyeS: 1 + .3 * rec, mouth: rec > .3 ? 'o' : 'tight', look: 14, lookY: -6 })}
    ${FG(1430)}`;
}
