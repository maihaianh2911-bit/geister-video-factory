// 245.24–248.64: method 3 – replace the apology with trust
import { K, bg, fade, pop, prog, methodCard, chip, T, textW } from './lib.js';
export default function renderShot(t) {
  const st = prog(t, 247.12, 247.6), w = textW('ENTSCHULDIGUNG', 70);
  return bg(K.sky) + methodCard(t, 245.24, 3, 'ICH VERTRAUE DEINEM URTEIL', 300, K.blue)
    + `<g opacity="${fade(t, 246.24)}">${T(540, 700, 'ENTSCHULDIGUNG', 70, { fill: K.red })}<line x1="${540 - w / 2}" y1="676" x2="${540 - w / 2 + w * st}" y2="676" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/></g>`
    + `<g opacity="${fade(t, 247.42)}">${T(540, 840, '↓', 90)}</g>`
    + chip(540, 1000, 'VERTRAUEN', { size: 80, bg: K.green, a: fade(t, 247.64), sc: pop(t, 247.64) });
}
