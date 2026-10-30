import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// stairwell at night: Jonas with his lantern stops; grey charcoal smoke drifts down the stairs; he sniffs on "Holzkohle"
export default function renderShot(t) {
  const walk = eout(prog(t, 72.84, 73.3));
  const sniff = prog(t, 73.4, 73.6);
  const look = lerp(0, -12, eout(prog(t, 73.5, 73.8)));
  let smoke = '';
  for (let i = 0; i < 7; i++) { const q = ((t - 72.84) * .35 + i / 7) % 1; smoke += `<ellipse cx="${f1(lerp(260, 620, q) + 40 * Math.sin(t + i))}" cy="${f1(lerp(260, 760, q))}" rx="${f1(70 + 70 * q)}" ry="${f1(40 + 30 * q)}" fill="#6B737A" opacity="${f1(.35 * Math.sin(q * Math.PI))}"/>`; }
  let steps = '';
  for (let i = 0; i < 9; i++) steps += `<rect x="${60 + i * 60}" y="${1000 - i * 80}" width="${520 - i * 40}" height="80" fill="${i % 2 ? K.concHi : K.conc}" ${OL(4)}/>`;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <rect x="0" y="1080" width="1080" height="840" fill="${K.concSh}"/>
  ${steps}
  <path d="M 60 1000 L 600 280" stroke="${K.steelHi}" stroke-width="12"/>
  ${smoke}
  ${jonas(lerp(980, 780, walk), 760, .95, { aL: [10, 6], aR: [-10, -60], look, lookY: -6, brow: 'worry', mouth: sniff > 0 ? 'grim' : 'flat', blink: blinkAt(t),
     holdR: (x, y) => lantern(x, y + 80, .6, 1) })}
  ${FG(1400)}`;
}
