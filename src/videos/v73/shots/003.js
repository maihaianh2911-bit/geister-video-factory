// 6.571–8.624: from behind people keep pushing ("Von hinten drücken"): the rear rows lean in, arrows press from the left, you are squeezed forward
import { K, DEFS, BG, person, crowdRow, grain, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 6.8, 7.8));
  const lean = i => 4 + 12 * p * Math.max(0, 1 - i / 6);
  const arrows = [0, 1, 2].map(k => `<path d="M ${f1(-40 + 120 * p)} ${1000 + k * 140} l 150 0 m -40 -34 l 40 34 l -40 34" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(p)}"/>`).join('');
  const sc = `${BG('url(#lSky)')}${grain(3)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    ${crowdRow(t, 1180, .75, 11, -40, 110, 5, { lean })}
    ${person(560 + 30 * p, 1400, 1.05, { you: true, face: 1, brow: 1, lean: 8 * p, aF: 25, aB: -10 })}
    ${crowdRow(t, 1400, 1.05, 3, 120, 170, 6, { lean: i => 6 + 14 * p })}${crowdRow(t, 1400, 1.05, 2, 760, 170, 7, { lean: () => -4 * p })}
    ${arrows}`;
  return `${DEFS}${sc}`;
}
