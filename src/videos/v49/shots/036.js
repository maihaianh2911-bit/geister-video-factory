import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// profile close-up: a person breathes in the gas without smelling anything (smell waves crossed out on "nicht")
export default function renderShot(t) {
  const sniff = Math.max(0, Math.sin((t - 61.7) * 9)) * (t < 62.4 ? 1 : 0);
  const x = prog(t, 62.3, 62.55);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  ${coHaze(t, 760, 760, 300, 360, 1, 5)}
  ${nbr(5, 420, 1260, 2.6, { look: 14, mouth: 'flat', brow: 'calm', blink: blinkAt(t) })}
  ${[0, 1, 2].map(i => `<path d="M ${700 + i * 70} 700 q 20 -30 0 -60 q -20 -30 0 -60" stroke="#C9D3DA" stroke-width="12" fill="none" stroke-linecap="round" opacity="${f1(.5 + .4 * sniff)}"/>`).join('')}
  ${cross(770, 640, 120, x)}
  ${ITint(.25)}${FG(1420)}`;
}
