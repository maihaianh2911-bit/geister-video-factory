import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// feet: a thick wool sock is pulled up over the bare foot
export default function renderShot(t) {
  const p = eout(prog(t, 48.45, 48.95));
  const sy = lerp(1300, 900, p);
  const hand = armTo(-40, 700, 380, sy - 10, 90, -1) + armTo(1120, 700, 700, sy - 10, 90, 1);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.floor}"/>
  <rect x="0" y="1300" width="1080" height="620" fill="#2B2420"/>
  <path d="M 420 0 L 660 0 L 660 900 L 420 900 Z" fill="#2E3A55" ${OL(7)}/>
  <path d="M 420 900 L 420 1240 Q 420 1320 500 1320 L 820 1320 Q 880 1320 870 1250 Q 860 1180 760 1170 L 660 1150 L 660 900 Z" fill="${K.skin}" ${OL(7)}/>
  <clipPath id="v49sock"><rect x="0" y="${f1(sy)}" width="1080" height="1000"/></clipPath>
  <g clip-path="url(#v49sock)"><path d="M 410 880 L 410 1240 Q 410 1332 500 1332 L 820 1332 Q 892 1332 880 1250 Q 868 1170 760 1160 L 670 1140 L 670 880 Z" fill="${K.sock}" ${OL(7)}/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M 430 ${920 + i * 50} H 650" stroke="#9A8862" stroke-width="10"/>`).join('')}
  <path d="M 730 1200 Q 800 1260 860 1240" stroke="#9A8862" stroke-width="10" fill="none"/></g>
  <rect x="400" y="${f1(sy - 30)}" width="280" height="50" rx="20" fill="#C9B88E" ${OL(6)}/>
  ${hand}
  ${FG(1420)}`;
}
