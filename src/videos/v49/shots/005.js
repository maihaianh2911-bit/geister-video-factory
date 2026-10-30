import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// five rule cards drop in one by one; on "Leben" card 5 (red) jumps forward
export default function renderShot(t) {
  const big = back(prog(t, 6.94, 7.25));
  const beat = 1 + .05 * Math.max(0, Math.sin((t - 6.94) * 9)) * (t > 6.94 ? 1 : 0);
  let s = '';
  for (let i = 0; i < 4; i++) {
    const p = back(prog(t, 5.62 + i * .14, 5.9 + i * .14));
    const x = 300 + (i % 2) * 480, y = 360 + Math.floor(i / 2) * 330;
    s += `<g opacity="${f1(1 - .55 * big)}">${card(i + 1, x, y, .62, p)}</g>`;
  }
  const p5 = back(prog(t, 6.18, 6.46));
  const x5 = lerp(540, 540, big), y5 = lerp(1040, 960, big), s5 = lerp(.62, 1.15, big) * beat;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <ellipse cx="540" cy="960" rx="${f1(300 + 300 * big)}" ry="${f1(260 + 260 * big)}" fill="url(#kRed)" opacity="${f1(.9 * big)}"/>
  ${s}${card(5, x5, y5, s5, p5, true)}
  ${FG(1400)}`;
}
