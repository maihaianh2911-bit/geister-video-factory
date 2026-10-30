// "Temperatur an deinem Gaumen schnell sinken": magnifier on the palate, thermometer drops.
import { P, prog, eio, back, mix, punch, bgPlain, lens, profileInside, frostCrystal, thermo } from './lib.js';
const T0 = 11.40;
export default function renderShot(t) {
  const cold = .35 + .65 * prog(t, 12.16, 12.9);
  const lvl = .78 - .6 * eio(prog(t, 12.16, 12.95));
  const ls = back(prog(t, T0, T0 + .3));
  let fr = '';
  for (let i = 0; i < 5; i++) fr += frostCrystal(60 + i * 45, 120 + (i % 2) * 18, 16 * prog(t, 12.2 + i * .1, 12.6 + i * .1), i * 13, '#fff');
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="#FBE3E8"/><g transform="scale(2.7) translate(-160 -165)">${profileInside({ palCol: mix(P.pink, P.ice, cold), brainA: 0 })}${fr}</g>`;
  return punch(t, T0, `${bgPlain('#E4F1FB')}
    <g transform="translate(560 720) scale(${ls}) translate(-560 -720)">${lens(560, 720, 360, inner, 's8l')}</g>
    ${thermo(170, 1330, lvl, mix(P.red, P.cold, prog(t, 12.16, 12.9)), .85)}`);
}
