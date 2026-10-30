// The light stops on a tree trunk: a small sign appears on "Schild", the camera pushes in until the number reads on "Nummer".
import { K, DEFS60, forest, trunk, sign, rings, FG, prog, eio, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const lit = eout(prog(t, 38.5, 38.7));
  const z = lerp(1, 1.9, eio(prog(t, 38.7, 39.5)));
  return DEFS60 + `<g transform="translate(540 760) scale(${z}) translate(-540 -760)">
    ${forest(t, { hz: 1100, px: 60, noNear: true })}
    <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".5"/>
    ${trunk(540, 200, K.bark, K.barkHi, -20, 1500)}
    <ellipse cx="540" cy="760" rx="${320 * (.3 + .7 * lit)}" ry="${300 * (.3 + .7 * lit)}" fill="url(#fAmb)" opacity="${.3 + .6 * lit}"/>
    ${sign(540, 760, .55, { lit: .25 + .75 * lit })}
  </g>
  ${rings(t, 39.36, 540, 760, K.amb, 2, 300, 8)}
  ${FG(1440)}`;
}
