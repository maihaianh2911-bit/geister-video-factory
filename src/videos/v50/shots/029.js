// "die Zunge an den Gaumen drücken": diagram, tongue presses up against the cold palate.
import { P, prog, eio, back, punch, bgPlain, profileHead, label } from './lib.js';
const T0 = 53.10;
export default function renderShot(t) {
  const up = eio(prog(t, 53.9, 54.32));
  const ar = back(prog(t, 53.55, 53.8)) * (1 - prog(t, 54.4, 54.6));
  const extra = `<g opacity="${ar}"><path d="M 150 300 V 215" stroke="${P.teal}" stroke-width="22" stroke-linecap="round"/><path d="M 118 238 L 150 200 L 182 238" stroke="${P.teal}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return punch(t, T0, `${bgPlain('#E4F1FB')}
    <g transform="translate(420 820) scale(1.3)">${profileHead({ id: 's29', skinA: .3, ice: 0, palCol: P.ice, tongueUp: up, extra, brainA: .5 })}</g>
    ${t >= 53.5 ? label(540, 240, 'ZUNGE AN DEN GAUMEN', 62, { s: back(prog(t, 53.5, 53.7)) }) : ''}`);
}
