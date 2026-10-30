import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// inside the small room: Jonas (from behind) pulls the door shut on "zu" — slam, the lantern light stays in
export default function renderShot(t) {
  const d = .85 * (1 - ein2(prog(t, 23.8, 24.42)));
  const [sx, sy] = shk(t, 24.42, 12, 8);
  const ex = 720 + 292 * (1 - .85 * d);
  const aR = jReach(800, 900, .9, 1, Math.min(ex, 1000), 840, 1);
  return KDEFS + `<g transform="translate(${f1(sx)} ${f1(sy)})">${room(t, { door: d })}
  ${d > .02 ? `<rect x="${f1(ex)}" y="428" width="${f1(1012 - ex)}" height="752" fill="#05080A"/>` : ''}
  ${lantern(240, 1300, 1, 1)}
  ${jonas(800, 900, .9, { back: true, u: .2, aR, aL: [12, 8] })}</g>
  ${rings(t, 24.42, 860, 800, '#FFFFFF', 2, 220)}
  ${FG(1400)}`;
}
function ein2(x) { return x * x; }
