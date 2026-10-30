// 2.875–6.571: your feet among the others — you lift your foot for the next step ("Schritt"), the legs around you shove it sideways; it lands where the crowd puts it
import { K, DEFS, BG, person, grain, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 3.7, 4.3)), shove = eio(prog(t, 4.9, 5.6)), land = eio(prog(t, 5.6, 6.1));
  const fx = lerp(0, 40, lift) + lerp(0, -90, shove), fy = -60 * lift * (1 - land);
  const push = 40 * shove;
  const legs = (x, col, o = {}) => person(x, 1450, 4, { col, ...o });
  const sc = `${BG(K.concrete)}${grain(2)}<rect x="-60" y="1450" width="1200" height="900" fill="${K.concreteD}"/>
    <g transform="translate(0 0)">${legs(120 + push, K.c2, { lean: 4 })}${legs(980 - push * .5, K.c4, { dir: -1 })}
    ${person(540, 1450, 4, { you: true, stepR: [fx, fy], stepL: [-10 * shove, 0], lean: -3 * shove })}
    ${legs(300 + push * 1.6, K.c5, { lean: 6, stepR: [20 * shove, 0] })}</g>
    <path d="M ${f1(330 + push)} 1330 l 90 0 m -26 -22 l 26 22 l -26 22" stroke="${K.red}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(shove)}"/>`;
  return `${DEFS}<g transform="translate(0 -260)">${sc}</g>`;
}
