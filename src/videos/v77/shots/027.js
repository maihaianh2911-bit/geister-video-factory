import { K, OL, card, antSide, yardSide, f1, prog, eio, back, lerp } from './lib.js';
// 63.96–66.8 No map: a folded paper map beside the ant is crossed out on "Landkarte".
export default function renderShot(t) {
  const m = back(prog(t, 64.3, 64.6)), x = eio(prog(t, 65.7, 66.0));
  const map = `<g transform="translate(700 860) rotate(-6) scale(${f1(m)})"><path d="M -200 -150 L -70 -110 L 70 -150 L 200 -110 L 200 150 L 70 190 L -70 150 L -200 190 Z" fill="${K.white}" ${OL(7)}/><path d="M -70 -110 V 150 M 70 -150 V 190" stroke="${K.ink}" stroke-width="4"/><path d="M -170 100 Q -60 0 30 40 Q 120 70 170 -60" fill="none" stroke="${K.blue}" stroke-width="8" stroke-dasharray="16 12"/><circle cx="170" cy="-60" r="14" fill="${K.red}"/></g>`;
  return `${yardSide(1200)}${map}${x > 0 ? `<path d="M 500 660 L ${f1(lerp(500, 900, x))} ${f1(lerp(660, 1060, x))} M 900 660 L ${f1(lerp(900, 500, x))} ${f1(lerp(660, 1060, x))}" stroke="${K.red}" stroke-width="26" stroke-linecap="round"/>` : ''}
    ${antSide(280, 1200, 3, t > 64.0 ? 0 : t * 14, { ant: 10 * Math.sin(t * 4) })}
    ${card(700, 400, 'KEINE LANDKARTE', 64, prog(t, 65.7, 65.95))}`;
}
