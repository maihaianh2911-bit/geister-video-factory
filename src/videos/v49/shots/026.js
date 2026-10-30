import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// the six together = one small heater; its dial turns to LOW on "niedriger Stufe"
export default function renderShot(t) {
  const hp = back(prog(t, 44.4, 44.7));
  const dial = lerp(.8, .2, eio(prog(t, 45.38, 45.8)));
  const glow = lerp(.9, .5, eio(prog(t, 45.38, 45.8)));
  const eq = back(prog(t, 44.06, 44.3));
  const P = [[300, 330, 'j'], [540, 330, 0], [780, 330, 1], [300, 560, 2], [540, 560, 3], [780, 560, 4]];
  let heads = '';
  P.forEach((q, i) => {
    const o = { blink: blinkAt(t, i * .4), mouth: 'flat' };
    heads += q[2] === 'j' ? jonas(q[0], q[1], .34, Object.assign({ aL: [6, -40], aR: [6, -40] }, o)) : nbr(q[2], q[0], q[1], .36, o);
    heads += `<rect x="${q[0] - 70}" y="${q[1] + 80}" width="140" height="60" rx="16" fill="${i % 2 ? K.blanket : '#5A4A7A'}" ${OL(4)}/>`;
  });
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <ellipse cx="540" cy="470" rx="480" ry="300" fill="url(#kHeat)" opacity=".8"/>
  <rect x="140" y="160" width="800" height="560" rx="40" fill="#000" opacity=".25"/>
  ${heads}
  ${eq > 0 ? `<g transform="translate(540 850) scale(${f1(eq)})">${TX('≈', 0, 60, 200, K.amb)}</g>` : ''}
  ${heater(540, 1300, 1.25 * hp, glow * hp, dial)}
  ${FG(1420)}`;
}
