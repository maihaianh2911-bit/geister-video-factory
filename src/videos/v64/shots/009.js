// 16.2–18.54: Franz Althoff watches a Schwebebahn carriage pass above the street; on "Idee" he raises his finger
import { K, DEFS, althoff, car, track, town, card, grain, f1, cam, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const idea = back(prog(t, 17.82, 18.1));
  const look = lerp(.4, -.2, eio(prog(t, 16.4, 17.4)));
  const carX = lerp(-300, 1300, prog(t, 16.2, 18.54));
  const a = althoff(560, 1720, 1.75, { look, aR: [lerp(10, 150, idea), lerp(10, 20, idea)], aL: [8, 10], brow: 0, mouth: idea > .5 ? 'o' : 'n' });
  const finger = idea > .3 ? `<path d="M ${f1(a.hR[0])} ${f1(a.hR[1] - 10)} l 0 -42" stroke="${K.skin}" stroke-width="16" stroke-linecap="round"/><path d="M ${f1(a.hR[0])} ${f1(a.hR[1] - 10)} l 0 -42" stroke="${K.ink}" stroke-width="22" stroke-linecap="round" opacity=".0"/>` : '';
  const scene = `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${town(1100, { spire: false })}
    <rect x="-60" y="1090" width="1200" height="900" fill="#B5A88E"/>${track(200, 1300, t * 60, { span: 1400 })}${car(carX, 200, .9, { faces: true })}
    ${a.svg}${finger}`;
  return `${DEFS}${scene}${card(250, 1230, 'FRANZ ALTHOFF', 44, prog(t, 16.8, 17.1), { rot: -3 })}${grain(t)}`;
}
