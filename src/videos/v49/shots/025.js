import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// six people (Jonas + 5 neighbours) under blankets; each one's warmth lights up in turn, the glows merge
export default function renderShot(t) {
  const P = [[260, 560, 'j'], [540, 560, 0], [820, 560, 1], [260, 1000, 2], [540, 1000, 3], [820, 1000, 4]];
  let glow = '', ppl = '';
  P.forEach((q, i) => {
    const g = eout(prog(t, 42.52 + i * .16, 42.8 + i * .16));
    glow += `<ellipse cx="${q[0]}" cy="${q[1] + 60}" rx="${f1(120 + 120 * g)}" ry="${f1(140 + 140 * g)}" fill="url(#kHeat)" opacity="${f1(g)}"/>`;
    const o = { look: 0, mouth: 'flat', blink: blinkAt(t, i * .5) };
    ppl += q[2] === 'j' ? jonas(q[0], q[1] + 40, .5, Object.assign({ aL: [6, -40], aR: [6, -40] }, o)) : nbr(q[2], q[0], q[1] + 40, .52, o);
    ppl += `<path d="M ${q[0] - 110} ${q[1] + 190} Q ${q[0]} ${q[1] + 150} ${q[0] + 110} ${q[1] + 190} L ${q[0] + 120} ${q[1] + 300} L ${q[0] - 120} ${q[1] + 300} Z" fill="${i % 2 ? K.blanket : '#5A4A7A'}" ${OL(5)}/>`;
  });
  const merge = eio(prog(t, 43.4, 44));
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <ellipse cx="540" cy="820" rx="560" ry="620" fill="url(#kAmb)" opacity="${f1(.7 * merge)}"/>
  ${glow}${ppl}
  ${FG(1420)}`;
}
