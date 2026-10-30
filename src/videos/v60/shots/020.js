// Phone screen: a location pin pulses and the phone fires its position upwards on its own.
import { K, DEFS60, P, phone, pin, armTo, rings, FG, prog, eout, back, lerp } from './lib.js';

export default function renderShot(t) {
  const pp = back(prog(t, 28.6, 28.9));
  let pk = '';
  for (let k = 0; k < 3; k++) { const p = prog(t, 29.28 + k * .3, 30.0 + k * .3); if (p > 0 && p < 1) pk += `<g transform="translate(${540 + 40 * Math.sin(p * 5 + k)} ${lerp(560, 80, eout(p))}) scale(${1 - .5 * p})" opacity="${1 - p}">${pin(0, 0, .9, K.red)}</g>`; }
  const scr = `<rect x="-60" y="-112" width="120" height="224" rx="12" fill="#1E3A2C"/>
    <path d="M -60 40 C -20 20 0 -40 60 -60" stroke="#C9B98A" stroke-width="7" fill="none"/>
    <g transform="scale(${pp})">${pin(0, 20, .5, K.red)}</g>`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>
  ${armTo(-60, 1800, 400, 1200, 120, P.red.j, -1, P.red.skin)}
  ${phone(540, 980, 2.8, -4, { on: 1, screen: scr })}
  ${rings(t, 29.28, 540, 950, K.red, 3, 300, 10)}
  ${pk}
  ${FG(1440)}`;
}
