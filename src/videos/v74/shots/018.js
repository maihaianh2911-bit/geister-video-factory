import { P, ST, corridor, fig, office, talk, frame, tag, prog, eout, back, lerp } from './lib.js';
// 34.18–36.2 Corridor: Voigt points; two soldiers lead the mayor out of his office by the arms ("Bürgermeister").
export default function renderShot(t) {
  const point = back(prog(t, 34.6, 34.86));
  const door = eout(prog(t, 34.9, 35.15));
  const come = eout(prog(t, 35.1, 36.2));
  const walking = t > 35.1 && t < 36.1;
  const gx = lerp(820, 680, come);
  const doorG = `<g transform="translate(940 560) scale(${1 - .8 * door} 1)"><rect x="-240" y="0" width="240" height="560" fill="${P.wood}" ${ST(6)}/><circle cx="-200" cy="300" r="12" fill="${P.gold}" ${ST(3)}/></g>`;
  return frame(t, `${corridor()}
    <rect x="700" y="560" width="240" height="560" fill="#2A221E" ${ST(6)}/>
    ${doorG}${t > 35.05 ? `${fig(gx + 150, 1600, 1.0, { kind: 'soldier', walk: walking ? t * 8 + 1 : undefined, aL: 70, look: -10, brow: 'angry' })}
    ${fig(gx, 1590, 1.05, { kind: 'mayor', walk: walking ? t * 8 : undefined, aL: 30, aR: -30, look: -10, eyeS: 1.5, mouth: 'o', brow: 'worried', sweat: 1 })}
    ${fig(gx - 150, 1620, 1.0, { kind: 'soldier', walk: walking ? t * 8 + 2 : undefined, aR: -70, look: 10, brow: 'angry' })}` : ''}
    ${fig(190, 1700, 1.25, { kind: 'voigt', aR: lerp(-8, -62, point), aL: 10, look: 14, brow: 'angry', mouth: talk(t, 34.5, 35.4) })}
    ${tag(560, 300, 'BÜRGERMEISTER', back(prog(t, 35.16, 35.4)), { rot: -2 })}`);
}
