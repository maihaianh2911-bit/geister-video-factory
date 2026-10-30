// 0–1.30 · cover: "EIS ZU SCHNELL?" + the girl about to bite into a three-scoop cone at the Eiscafé
import { P, parlour, girl, headline, cam, prog, back, eout, lerp } from '../lib.js';

export default function renderShot(t) {
  const z = lerp(1.22, 1, eout(prog(t, 0, .35)));
  const up = back(prog(t, .05, .4));
  const hand = [lerp(210, 150, up), lerp(260, -20, up) + 8 * Math.sin(t * 9) * prog(t, .5, 1.3)];
  const lean = prog(t, .7, 1.25);
  const hs = .86 + .14 * back(prog(t, 0, .3));
  const pop = back(prog(t, .95, 1.15));
  return `<g transform="${cam(z, 540, 900, 540, 900)}">${parlour(t)}
    ${girl(530, 1330, 1.42, { t, id: 's1', hold: 'cone', handR: hand, coneRot: -8 * lean, eyes: 'wide', look: 12, lookY: -8, mouth: lean > .4 ? 'open' : 'o', tilt: 6 * lean, blush: .55 })}</g>
    ${headline('EIS ZU', 540, 230, 150, { scale: hs })}
    ${headline('SCHNELL?', 540, 390, 170, { scale: hs * (1 + .08 * pop * (1 - prog(t, 1.15, 1.3))), color: P.pain })}`;
}
