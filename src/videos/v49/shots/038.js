import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// symptoms: hands to the temples (headache), then the eyelids grow heavy (tiredness)
export default function renderShot(t) {
  const h = eout(prog(t, 64.5, 64.85));
  const tired = eio(prog(t, 65.5, 66.2));
  const tilt = -8 * tired + 2 * Math.sin(t * 2);
  const S = 1.5, X = 540, Y = 980;
  const hL = [X - 120 * S * 1, Y - 150 * S + 30 * tired], hR = [X + 120 * S, Y - 150 * S + 30 * tired];
  let pain = '';
  if (h > 0 && tired < .8) for (let i = 0; i < 3; i++) pain += `<path d="M ${f1(540 - 200 - 40 * i)} ${560 + i * 40} l -40 -20 M ${f1(540 + 200 + 40 * i)} ${560 + i * 40} l 40 -20" stroke="${K.red}" stroke-width="12" stroke-linecap="round" opacity="${f1(h * (.6 + .4 * Math.sin(t * 12 + i)))}"/>`;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  <rect x="80" y="980" width="920" height="400" rx="60" fill="#4A5560" ${OL(6)}/>
  ${nbr(5, X, Y, S, { tilt, brow: 'pain', mouth: tired > .5 ? 'o' : 'grim', lid: .75 * tired, blink: 0 })}
  ${h > 0 ? armTo(X - 210, Y + 300, lerp(X - 230, hL[0], h), lerp(Y + 400, hL[1], h), 70, -1, '#6B737A') + armTo(X + 210, Y + 300, lerp(X + 230, hR[0], h), lerp(Y + 400, hR[1], h), 70, 1, '#6B737A') : ''}
  ${pain}
  ${coHaze(t, 540, 600, 400, 260, .6, 3)}
  ${ITint(.25)}${FG(1420)}`;
}
