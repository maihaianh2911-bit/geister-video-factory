import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// low close-up at the door: cold draught streams through the gap; a hand pushes a rolled towel into it
export default function renderShot(t) {
  const push = eout(prog(t, 30.44, 30.95));
  const tx = lerp(-260, 540, push);
  const draft = 1 - eout(prog(t, 30.8, 31.3));
  let d = '';
  for (let i = 0; i < 12; i++) { const q = ((t * 1.3 + i / 12) % 1); const y = 1080 + (i % 4) * 14; d += `<path d="M ${f1(lerp(1000, 120, q))} ${y} q -40 -10 -80 0" stroke="#BFE3F5" stroke-width="8" stroke-linecap="round" fill="none" opacity="${f1(draft * .8 * Math.sin(q * Math.PI))}"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <rect x="0" y="1100" width="1080" height="820" fill="${K.floor}"/>
  <rect x="80" y="200" width="920" height="860" fill="${K.wood}" ${OL(8)}/>
  <rect x="140" y="260" width="800" height="720" rx="8" fill="none" stroke="${K.woodSh}" stroke-width="12"/>
  <rect x="60" y="1060" width="960" height="40" fill="#05080A"/>
  <rect x="60" y="1060" width="960" height="40" fill="#BFE3F5" opacity="${f1(.25 * draft)}"/>
  ${d}
  <g transform="translate(${f1(tx)} 1060)"><rect x="-460" y="-46" width="920" height="92" rx="46" fill="${K.towel}" ${OL(7)}/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${-380 + i * 150} -40 q 20 40 0 80" stroke="${K.towelSh}" stroke-width="8" fill="none"/>`).join('')}</g>
  ${armTo(-60, 520, tx + 300, 1010, 70, -1)}
  ${FG(1420)}`;
}
