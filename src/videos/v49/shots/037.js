import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// the gas drifts right past the person's eyes; they look around and see nothing — eye crossed out on "nicht"
export default function renderShot(t) {
  const look = 14 * Math.sin((t - 63) * 3.4);
  const x = prog(t, 63.46, 63.7);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  ${nbr(5, 540, 1500, 3.4, { look, lookY: -4, mouth: 'flat', brow: 'calm', blink: blinkAt(t, .3) })}
  ${coHaze(t * 1.6, 540, 820, 520, 320, 1, 9)}
  <g transform="translate(860 330)"><path d="M -110 0 Q 0 -80 110 0 Q 0 80 -110 0 Z" fill="#F6F1E8" ${OL(8)}/><circle r="34" fill="${K.ol}"/></g>
  ${cross(860, 330, 110, x)}
  ${ITint(.25)}${FG(1420)}`;
}
