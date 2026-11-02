// L4a 15.2–18.6 Medium: the man stands by the door, staring at his phone, worried. du (left, back half turned)
// looks over. A thought bubble rises over HIS head on "Blase" (16.56): „Die Kita hat angerufen.“ (17.28).
import { K, frame, cam, setTrain, trainFG, person, shadow, thought, phone, pop, prog } from './lib.js';
import { push, handPt } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t);
  s += shadow(260, 1620, 170) + person('du', 260, 1620, 1.6, { t, seed: 2, armL: [-70, -560], look: [9, -2], brows: t > 16.6 ? 'up' : 'angry', eyes: t > 16.6 ? 'wide' : 'mean', mouth: t > 16.6 ? 'o' : 'grim' });
  s += shadow(740, 1580, 160) + person('mann', 740, 1580, 1.55, { t, seed: 7, look: [-2, 9], brows: 'worried', mouth: 'wavy', armR: [16, -240], armL: [-26, -236], front: phone(-4, -262, 1.1, { rot: 4 }) });
  const p = pop(t, 16.56, .45);
  s += thought(640, 520, ['Die Kita hat', 'angerufen.'], 720, 780, { p, size: 60, w: 560, h: 220, text: prog(t, 17.28, 17.9) });
  s += trainFG(1030, { hand: handPt(260, 1620, 1.6, [-70, -560]) });
  return frame(cam(s, 640, 1000, push(t, 15.2, 18.6, 1.0, 1.08)), { tint: ['#3a6ea8', .08] });
}
