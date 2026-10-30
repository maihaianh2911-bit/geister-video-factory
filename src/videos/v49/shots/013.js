import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// floor plan: Jonas (orange marker) walks into the smallest room; the other rooms go dark, the small one glows on "kleinste"
export default function renderShot(t) {
  const w = eio(prog(t, 21.4, 22.7));
  const mx = lerp(380, 590, w), my = lerp(540, 900, w) - 20 * Math.abs(Math.sin(t * 9)) * (w > 0 && w < 1 ? 1 : 0);
  const a = back(prog(t, 22.98, 23.3)), dim = eio(prog(t, 21.6, 22.3));
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  ${plan(t, { warm: a > 0 ? 3 : -1, a, dim, frost: dim })}
  <g transform="translate(${f1(mx)} ${f1(my)})"><circle cx="0" cy="10" r="46" fill="#000" opacity=".4"/><circle cx="0" cy="0" r="42" fill="${K.park}" ${OL(6)}/><path d="M -36 -6 Q -36 -46 0 -46 Q 36 -46 36 -6 Z" fill="${K.hat}" ${OL(5)}/></g>
  ${a > 0 ? rings(t, 22.98, 590, 915, K.amb, 3, 260) : ''}
  ${FG(1400)}`;
}
