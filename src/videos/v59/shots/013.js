// 20.4–21.9: cut-away: the closed door is the border — smoke piles up on the stairwell side, the flat stays clear (green edge on "schließen").
import { K, DEFS, FG, prog, eio, back, stairwell, smokeFlow, smokeMass, person, check } from './lib.js';
export default function renderShot(t) {
  const g = eio(prog(t, 20.6, 20.95));
  const left = smokeFlow(t, { t0: 20.0, x0: 380, y0: 900, vx: 120, vy: -30, n: 20, gap: .07, life: 1.6, r0: 40, grow: 60, spread: 80, seed: 21, op: .9 });
  const stair = `<clipPath id="v13L"><rect x="-60" y="-60" width="560" height="2040"/></clipPath><g clip-path="url(#v13L)">${stairwell(t)}${left}</g>`;
  const fade = 1 - eio(prog(t, 20.4, 21.4));
  return `${DEFS}<g transform="translate(540 900) scale(1.06) translate(-540 -900)">
    <rect x="520" y="-60" width="620" height="2040" fill="#1E2A30"/>
    <rect x="520" y="1300" width="620" height="700" fill="${K.floor}"/>
    ${stair}
    <rect x="500" y="-60" width="40" height="760" fill="#3A4B56" stroke="#0B0F12" stroke-width="6"/>
    <rect x="500" y="1300" width="40" height="700" fill="#3A4B56" stroke="#0B0F12" stroke-width="6"/>
    <rect x="500" y="700" width="40" height="600" fill="url(#vDoor)" stroke="#0B0F12" stroke-width="6"/>
    <rect x="${520 - 30 * g}" y="690" width="${60 * g + 1}" height="620" fill="${K.safe}" opacity="${.35 * g}" filter="url(#vSoft2)"/>
    <rect x="514" y="694" width="12" height="612" fill="${K.safe}" opacity="${g}"/>
    <g opacity="${.8 * fade}">${smokeMass(t, 560, 600, 340, 300, { n: 5, r: 70, seed: 8, op: .4 })}</g>
    ${person('v', 680, 930, .55, { aL: [30, 140], aR: [14, 10], brow: 'worry', mouth: 'tight', look: -14 })}
    ${person('m', 900, 960, .5, { aL: [10, 10], aR: [16, 8], brow: 'worry', mouth: 'worried', look: -14 })}
    ${person('k', 820, 1060, .46, { aR: [-10, -70], aL: [6, 4], brow: 'worry', mouth: 'o', look: -14 })}
    ${check(800, 420, .9, prog(t, 20.8, 21.1))}
    </g>${FG(1430)}`;
}
