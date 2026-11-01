// 244.48–247.9: method 3 – replace the apology with trust
import { K, bg, fade, pop, prog, methodCard, chip, T, textW } from './lib.js';
export default function renderShot(t) {
  const st = prog(t, 246.3, 246.8), w = textW('ENTSCHULDIGUNG', 70);
  return bg(K.sky) + methodCard(t, 244.48, 3, 'ICH VERTRAUE DEINEM URTEIL', 300, K.blue)
    + `<g opacity="${fade(t, 245.44)}">${T(540, 700, 'ENTSCHULDIGUNG', 70, { fill: K.red })}<line x1="${540 - w / 2}" y1="676" x2="${540 - w / 2 + w * st}" y2="676" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/></g>`
    + `<g opacity="${fade(t, 246.6)}">${T(540, 840, '↓', 90)}</g>`
    + chip(540, 1000, 'VERTRAUEN', { size: 80, bg: K.green, a: fade(t, 246.84), sc: pop(t, 246.84) });
}
