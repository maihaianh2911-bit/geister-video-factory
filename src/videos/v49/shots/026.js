import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// the six together = one small heater; its dial turns to LOW on "niedriger Stufe"
export default function renderShot(t) {
  const hp = back(prog(t, 44.4, 44.7));
  const dial = lerp(.8, .2, eio(prog(t, 45.38, 45.8)));
  const glow = lerp(.9, .5, eio(prog(t, 45.38, 45.8)));
  const eq = back(prog(t, 44.06, 44.3));
  let heads = '';
  const Q = [[300, 380], [540, 360], [780, 380], [300, 560], [540, 540], [780, 560]];
  Q.forEach((q, i) => { heads += `<g transform="translate(${q[0]} ${q[1]}) scale(.38)">${i === 0 ? jHead({ blink: blinkAt(t) }) : ''}</g>`; if (i) heads += nbr(i - 1, q[0], q[1] + 40, .38, { blink: blinkAt(t, i * .4) }).replace(/<path d="M -140 44[^>]*>/, ''); });
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <ellipse cx="540" cy="470" rx="480" ry="300" fill="url(#kHeat)" opacity=".8"/>
  <rect x="140" y="250" width="800" height="420" rx="40" fill="#000" opacity=".25"/>
  ${heads}
  ${eq > 0 ? `<g transform="translate(540 800) scale(${f1(eq)})">${TX('≈', 0, 60, 200, K.amb)}</g>` : ''}
  ${heater(540, 1300, 1.25 * hp, glow * hp, dial)}
  ${FG(1420)}`;
}
