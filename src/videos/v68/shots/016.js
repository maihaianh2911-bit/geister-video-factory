// 37.74–41.9: cutaway — under the dissolved chalk shell there is a thin skin holding the inside together; card MEMBRAN on "Haut"
import { K, OL, f1, card, arrow, prog, eio, eout, lerp } from './lib.js';
import { C, eggD } from './sets.js';
export default function renderShot(t) {
  const ghost = 1 - eio(prog(t, 38.0, 38.9));
  const mem = eout(prog(t, 39.2, 39.8));
  const s = 5.2 + .25 * eio(prog(t, 40.0, 41.9));
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${C.wall}"/>
  <g transform="translate(540 900) scale(${s})">
    <path d="${eggD(54, 66)}" fill="none" stroke="#D9C2A3" stroke-width="${f1(10 / s * 1.6)}" stroke-dasharray="${f1(10 / s)} ${f1(8 / s)}" opacity="${f1(ghost)}"/>
    <path d="${eggD(48, 60)}" fill="${C.white}"/>
    <ellipse cx="0" cy="11" rx="24" ry="25" fill="${C.yolk}" ${OL(5 / s)}/>
    <path d="${eggD(48, 60)}" fill="none" stroke="${K.ink}" stroke-width="${f1(lerp(5, 14, mem) / s)}"/>
    <path d="${eggD(48, 60)}" fill="none" stroke="${K.teal}" stroke-width="${f1(7 * mem / s)}"/>
  </g>
  ${arrow(900, 520, 790, 610, K.teal, 12, mem)}${card(800, 420, 'MEMBRAN', 76, prog(t, 39.7, 40.0), { col: K.teal })}`;
}
