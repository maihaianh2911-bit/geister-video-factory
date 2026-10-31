import { P, R, ST, fig, sky, train, frame, prog, eout, lerp, hash } from './lib.js';
// 58.6–60.3 He travels around: a steam train crosses the countryside, Voigt in the front window ("reiste umher").
export default function renderShot(t) {
  const sc = (t - 58.6) * 900;
  let poles = '';
  for (let i = 0; i < 6; i++) { const x = ((i * 380 - sc) % 2280 + 2280) % 2280 - 300; poles += `<rect x="${x}" y="760" width="16" height="560" fill="${P.woodSh}" ${ST(4)}/><rect x="${x - 50}" y="780" width="116" height="14" fill="${P.woodSh}"/>`; }
  let trees = '';
  for (let i = 0; i < 12; i++) { const x = ((i * 130 - sc * .3) % 1560 + 1560) % 1560 - 200; trees += `<circle cx="${x}" cy="${1000 - 40 * hash(i)}" r="${70 + 20 * hash(i + 3)}" fill="${i % 2 ? P.olive : P.oliveHi}" ${ST(5)}/>`; }
  const pass = (c, j, wx) => c === 0 && j === 0 ? `<clipPath id="v74win"><rect x="${wx}" y="-250" width="70" height="80"/></clipPath><g clip-path="url(#v74win)"><g transform="translate(${wx + 35} ${-80 + 3 * Math.sin(t * 14)}) scale(.25)">${fig(0, 0, 1, { kind: 'voigtLate', look: 10, mouth: 'smile', shadow: false })}</g></g>` : '';
  return frame(t, `${sky()}${trees}${R(-20, 1080, 1120, 900, P.grass)}${R(-20, 1260, 1120, 50, P.stoneSh)}${Array.from({ length: 14 }, (_, i) => `<rect x="${((i * 90 - sc) % 1260 + 1260) % 1260 - 90}" y="1290" width="60" height="20" fill="${P.woodSh}"/>`).join('')}
    ${poles}<g transform="translate(0 ${2 * Math.sin(t * 22)})">${train(lerp(1000, 900, eout(prog(t, 58.6, 59.2))), 1300, 1.25, t, { pass })}</g>`);
}
