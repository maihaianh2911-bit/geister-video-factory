// "damit er wieder warm wird": inside the lens the palate warms back to pink, thermometer rises.
import { P, prog, eio, back, mix, punch, bgPlain, lens, profileInside, thermo, label } from './lib.js';
const T0 = 54.70;
export default function renderShot(t) {
  const w = eio(prog(t, 55.1, 55.8));
  let waves = '';
  for (let k = 0; k < 3; k++) { const p = ((t - 55.2 - k * .25) % .9) / .9; if (t > 55.2 + k * .25) waves += `<path d="M ${110 + k * 40} ${150 - 40 * p} q 12 -14 0 -28 q -12 -14 0 -28" stroke="#FF8A3D" stroke-width="7" fill="none" stroke-linecap="round" opacity="${1 - p}"/>`; }
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="#FBE3E8"/><g transform="scale(2.6) translate(-160 -175)">${profileInside({ palCol: mix(P.ice, P.pink, w), brainA: 0, ice: 0, tongueUp: 1 })}${waves}</g>`;
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    ${lens(580, 760, 350, inner, 's30l')}
    ${thermo(160, 1330, .2 + .55 * w, mix(P.cold, P.red, w), .85)}
    ${label(540, 240, 'ZUNGE AN DEN GAUMEN', 62)}`);
}
