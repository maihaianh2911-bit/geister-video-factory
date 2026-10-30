import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// a person asleep in bed; the gas creeps in under the door, the sleeper does not wake ("im Schlaf")
export default function renderShot(t) {
  const g = eout(prog(t, 70.6, 71.6));
  const br = 6 * Math.sin(t * 2.2);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="#121A22"/>
  <rect x="0" y="1180" width="1080" height="740" fill="${K.floor}"/>
  ${door(720, 1180, .9, {})}
  <rect x="120" y="1000" width="740" height="200" rx="20" fill="${K.woodSh}" ${OL(6)}/>
  <rect x="140" y="930" width="220" height="110" rx="40" fill="#C9D3DA" ${OL(5)}/>
  <g transform="translate(250 960) rotate(-90)">${nbr(5, 0, 0, .6, { lid: 1, mouth: 'flat' }).replace(/<path d="M -140 44[^>]*>/, '')}</g>
  <path d="M 300 ${f1(960 - br)} Q 560 ${f1(900 - br)} 860 ${f1(960 - br)} L 860 1100 L 300 1100 Z" fill="#5A4A7A" ${OL(6)}/>
  ${coHaze(t, lerp(900, 560, g), lerp(1150, 900, g), lerp(80, 320, g), lerp(40, 180, g), g, 6)}
  ${ITint(.25)}${FG(1420)}`;
}
