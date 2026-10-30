import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// Germany at night: the invisible gas drifts over the country — it happens every year, everywhere
export default function renderShot(t) {
  const p = back(prog(t, 68.12, 68.45));
  let homes = '';
  for (let i = 0; i < 14; i++) { const x = 360 + 360 * hash(i * 2.3), y = 560 + 620 * hash(i * 4.1); const on = prog(t, 68.6 + i * .1, 68.9 + i * .1); homes += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.5 + .5 * on)})"><path d="M -20 10 V -12 L 0 -28 L 20 -12 V 10 Z" fill="${on > .5 ? '#3A4B56' : '#24363A'}" ${OL(3)}/><rect x="-6" y="-6" width="12" height="12" fill="${K.amb}" opacity="${f1(on * (.4 + .3 * Math.sin(t * 3 + i)))}"/></g>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <g transform="translate(540 880) scale(${f1(p)}) translate(-540 -880)">${germany(540, 880, 1.9)}${homes}</g>
  ${coHaze(t * 1.4, 540, 880, 420, 520, prog(t, 68.8, 69.6), 7)}
  ${ITint(.2)}${FG(1420)}`;
}
