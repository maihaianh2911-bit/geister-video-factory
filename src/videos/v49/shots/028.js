import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// close-up: Jonas pulls his orange beanie down over his ears with both hands
export default function renderShot(t) {
  const h = eio(prog(t, 47.6, 48.1));
  const hy = lerp(440, 540, h);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <ellipse cx="540" cy="700" rx="520" ry="560" fill="url(#kAmb)" opacity=".5"/>
  ${jonas(540, 1060, 1.9, { noArmL: true, noArmR: true, hatDown: h, mouth: 'grim', brow: 'calm', cold: 1, lid: .2 * h, blink: blinkAt(t) })}
  ${armTo(80, 1500, 300, hy, 110, 1)}${armTo(1000, 1500, 780, hy, 110, -1)}
  ${breath(t, 48.0, 560, 1000, 1)}
  ${FG(1420)}`;
}
