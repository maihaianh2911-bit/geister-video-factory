// L2b 11.2–13.4 The bump: the man walks left through the aisle, his shoulder hits du on "rempelt" (11.5),
// du sways; the man keeps staring at his phone and leaves frame left without a word ("kein Wort").
import { K, frame, cam, setTrain, trainFG, person, shadow, phone, impact, streaks, prog, eio, lerp, cl } from './lib.js';
import { push, handPt } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t);
  s += shadow(150, 1470, 110) + person('p3', 150, 1470, 1.15, { t, seed: 4, look: [6, 0] });
  const hit = 11.5;
  // du sways after the hit (damped)
  const k = t < hit ? 0 : Math.exp(-(t - hit) * 3) * Math.sin((t - hit) * 14);
  const lean = t < hit ? 0 : -3.5 * k - 2.5 * cl(1 - (t - hit) * 1.2);
  const du = 470;
  // man path: 820 → -260, passing du at the hit
  const mx = t < hit ? lerp(900, 650, eio(prog(t, 11.2, hit))) : lerp(650, -320, ein2(prog(t, hit + .08, 13.0)));
  s += shadow(du, 1600, 170) + person('du', du, 1600, 1.55, { t, seed: 2, tilt: lean, armR: [70, -560], eyes: t > hit ? 'wide' : 'n', brows: t > hit ? 'up' : 'flat', mouth: t > hit + .1 ? 'o' : 'flat', look: t > hit ? [-9, 0] : [6, 2] });
  s += shadow(mx, 1700, 175) + person('mann', mx, 1700, 1.62, { t, seed: 7, walk: t * 1.8, look: [0, 9], brows: 'worried', armR: [24, -250], front: phone(24, -262, 1.0, { rot: -8 }), headTilt: 6 });
  s += impact(du + 120, 1120, prog(t, hit, hit + .45));
  s += streaks(mx + 160, 1150, t > hit ? 1 - prog(t, hit + .2, 12.6) : 0, -1);
  s += trainFG(1020, { hand: handPt(du, 1600, 1.55, [70, -560], lean) });
  const shake = t > hit && t < hit + .3 ? Math.sin(t * 90) * 8 : 0;
  return frame(cam(s, 540, 1000, push(t, 11.2, 13.4, 1.04, 1.1), shake), { tint: ['#3a6ea8', .08] });
}

function ein2(x) { return x * x * (3 - 2 * x); }
