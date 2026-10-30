// 53.1–56.5: press the tongue against the palate so it warms up again — cutaway diagram, palate turns warm
import { K, DEFS, BG, headProfile, cam, card, thermo, prog, eout, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const press = eio(prog(t, 53.3, 53.85)), warm = eio(prog(t, 54.6, 55.5));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'B', tongue: press, cold: 1 - warm, warm })}</g>`;
  const up = prog(t, 53.3, 53.5) * (1 - prog(t, 54.2, 54.4));
  const arrow = `<g opacity="${f1(up)}" transform="translate(${f1(480 + 140 * 1.85)} ${f1(800 + 170 * 1.85)})"><path d="M 0 90 V 0" stroke="${K.ink}" stroke-width="30" stroke-linecap="round"/><path d="M 0 90 V 0" stroke="${K.white}" stroke-width="16" stroke-linecap="round"/><path d="M -30 34 L 0 0 L 30 34" fill="none" stroke="${K.ink}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return `${DEFS}${BG(K.bg)}${cam(head + arrow, 1.4, 720, 960, -170, 60)}
    ${thermo(930, 700, .8, lerp(.2, .8, warm), warm > .5 ? K.hot : K.cold)}
    ${card(540, 290, 'ZUNGE AN DEN GAUMEN', 66, prog(t, 53.3, 53.45), { sc: back(prog(t, 53.3, 53.6)), w: 960 })}`;
}
