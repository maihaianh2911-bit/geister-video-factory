// 56.46–60.94: no new chemistry — the gas in the bubbles on the candy is the same CO2 that was dissolved; a reaction flask gets crossed out on "Reaktion"
import { K, OL, f1, TX, mentos, bubble, co2, arrow, cross, prog, eio, eout, back, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const a = eout(prog(t, 56.5, 56.9));
  let left = `<circle cx="300" cy="760" r="230" fill="${K.cola}" ${OL(8)}/>` + mentos(300, 800, 110, -8, { lw: 8 });
  for (let i = 0; i < 6; i++) { const ang = -2.6 + i * .42, bx = 300 + Math.cos(ang) * 150, by = 790 + Math.sin(ang) * 105 - eout(prog(t, 56.6 + i * .1, 57.6 + i * .1)) * 40; left += bubble(bx, by, 34, { fill: 'rgba(255,255,255,.3)', stroke: '#FFFFFF', w: 6 }) + co2(bx, by, 15, eout(prog(t, 57.3, 57.7))); }
  // right: reaction flask (new substance) — appears on "neue chemische", crossed on "Reaktion"
  const fa = back(prog(t, 58.3, 58.8));
  const flask = fa > 0 ? `<g transform="translate(780 780) scale(${fa.toFixed(3)})"><path d="M -50 -170 V -60 L -150 120 Q -160 150 -125 150 H 125 Q 160 150 150 120 L 50 -60 V -170 Z" fill="${K.white}" ${OL(9)}/>
    <path d="M -95 30 L -143 120 Q -150 142 -125 142 H 125 Q 150 142 143 120 L 95 30 Z" fill="${K.teal}"/>
    <path d="M -70 -170 H 70" ${OL(12)}/>${[0, 1, 2].map(i => `<circle cx="${-40 + i * 40}" cy="${f1(70 - ((t * 60 + i * 30) % 60))}" r="10" fill="${K.white}" ${OL(4)}/>`).join('')}</g>` : '';
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.bg}"/><g opacity="${a.toFixed(3)}">${left}</g>${flask}${cross(780, 780, 190, prog(t, 59.1, 59.6))}`;
}
