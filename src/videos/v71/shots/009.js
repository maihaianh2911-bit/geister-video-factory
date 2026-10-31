// 21.6–23.64: new information cards fly into the head but slip out again ("behalten" 23.04)
import { K, BG, brainHead, label, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let cards = '';
  for (let i = 0; i < 3; i++) {
    const t0 = 21.7 + i * .25, a = eio(prog(t, t0, t0 + .5)), out = ein(prog(t, 22.75 + i * .15, 23.5 + i * .1));
    if (a <= 0) continue;
    const x = lerp(1100, 450 + i * 40, a) - 220 * out, y = lerp(560 + i * 120, 680 + i * 30, a) + 520 * out;
    cards += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(-8 + i * 8 + 30 * out)})" opacity="${f1(1 - out)}"><rect x="-60" y="-42" width="120" height="84" rx="10" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M -40 -16 h 80 M -40 4 h 60 M -40 24 h 70" stroke="${K.steelD}" stroke-width="8" stroke-linecap="round"/></g>`;
  }
  return `${BG()}${brainHead(420, 900, 1.5)}${cards}${label(540, 300, 'BEHALTEN?', prog(t, 23.04, 23.3), K.red, 62)}`;
}
