// The phone light sweeps the spot right where they stand: trunks, a fork in the track — searching for a sign.
import { K, DEFS60, forest, trunk, fig, phone, FG, prog, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const a = lerp(-40, 30, eio(prog(t, 36.6, 38.3)));
  return DEFS60 + `${forest(t, { hz: 1050, px: -a * 2, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".45"/>
  <path d="M 540 1060 L 100 1300 M 540 1060 L 1000 1320 M 540 1060 L 520 1000" stroke="#3A3A32" stroke-width="70" stroke-linecap="round"/>
  ${trunk(150, 110, K.bark, K.barkHi, -20, 1400)}${trunk(930, 130, K.bark, K.barkHi, -20, 1420)}${trunk(700, 70, K.bark, K.barkHi, 300, 1140)}
  ${fig('red', 380, 1700, 1.15, { back: true, aR: [130, 150], holdRFront: (x, y) => `<g transform="translate(${x} ${y - 20}) rotate(${a - 90})"><polygon points="0,0 1000,-300 1000,300" fill="url(#fBeam)" opacity=".8"/></g>` + phone(x, y - 20, .38, a, { on: 1, glow: false, screen: '<circle r="30" fill="#FFF6D8"/>' }) })}
  ${FG(1440)}`;
}
