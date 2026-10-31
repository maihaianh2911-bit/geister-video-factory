import { P, ST, fig, hat, mugP, shk, wallpaper, frame, tag, prog, eout, ein, back, lerp } from './lib.js';
// 47.59–50.1 Later, in civilian clothes at a table: the door bursts open, a policeman seizes him on "festgenommen"; the cup slips from his hand.
export default function renderShot(t) {
  const burst = back(prog(t, 48.3, 48.45));
  const enter = eout(prog(t, 48.4, 48.7));
  const grab = back(prog(t, 48.7, 48.9));
  const shock = t > 48.45;
  const sip = eout(prog(t, 47.7, 47.95)) * (1 - eout(prog(t, 48.15, 48.35)));
  const fall = prog(t, 48.5, 48.85);
  const cupX = 760, cupY = lerp(1100, 1166, ein(fall));
  return frame(t, `${wallpaper('#E6D2A6', '#D4BB8C')}
    <rect x="640" y="300" width="300" height="380" fill="#F6EBC6" ${ST(7)}/><path d="M 790 300 V 680 M 640 490 H 940" ${ST(7)}/>
    <rect x="40" y="560" width="250" height="740" fill="#2A221E" ${ST(6)}/>
    ${shock ? fig(lerp(150, 360, enter), 1440, .98, { kind: 'police', aR: lerp(-20, -88, grab), bendR: -10 * grab, look: 14, mouth: 'flat', brow: 'angry' }) : ''}
    <g transform="translate(40 560) scale(${1 - .85 * burst} 1)"><rect x="0" y="0" width="250" height="740" fill="${P.wood}" ${ST(6)}/><circle cx="210" cy="380" r="14" fill="${P.gold}" ${ST(3)}/></g>
    ${fig(620 + shk(t, 48.75, 10), 1640, 1.25, { kind: 'voigtLate', hat: 'none', aR: shock ? lerp(-60, -40, fall) : -20, bendR: shock ? 0 : lerp(-60, 168, sip), propR: shock ? null : mugP(.7, lerp(0, -60, sip), 1), aL: 15, eyeS: shock ? 1.7 : 1, look: shock ? -14 : 0, mouth: shock ? 'o' : 'flat', blink: sip > .6, brow: shock ? 'worried' : 'calm' })}
    <rect x="200" y="1180" width="760" height="40" fill="${P.white}" ${ST(6)}/><rect x="230" y="1220" width="700" height="500" fill="${P.wood}" ${ST(6)}/>
    ${shock ? `<g transform="translate(${cupX} ${cupY}) rotate(${lerp(0, 90, eout(fall))})">${mugP(.7, 0, 0)(0, -70)}</g>${fall >= 1 ? `<ellipse cx="${cupX - 70}" cy="1186" rx="${60 * eout(prog(t, 48.85, 49.2))}" ry="10" fill="#C99A3A" opacity=".8"/>` : ''}` : ''}
    ${tag(540, 300, 'FESTGENOMMEN', back(prog(t, 48.74, 48.98)), { rot: -2 })}`);
}
