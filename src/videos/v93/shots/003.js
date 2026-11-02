// L2a 8.92–11.2 Monday morning, full commuter train (cold blue light, city sliding past). MONTAG card.
// du holds a strap left of centre; the man in the grey beanie pushes in from the right, eyes on his phone.
import { K, frame, cam, setTrain, trainFG, person, shadow, dayCard, phone, prog, eio, lerp } from './lib.js';
import { push, handPt } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t);
  // passengers at the back
  s += shadow(130, 1470, 110) + person('p3', 130, 1470, 1.15, { t, seed: 4, look: [6, 0] });
  s += shadow(870, 1470, 110) + person('p1', 870, 1470, 1.15, { t, seed: 5, look: [-6, 0], crossed: true });
  // du
  s += shadow(360, 1600, 170) + person('du', 360, 1600, 1.55, { t, seed: 2, armR: [70, -560], look: [6, 2], brows: 'flat', mouth: 'flat' });
  // the man walks in from the right
  const m = eio(prog(t, 10.2, 11.2)), mx = lerp(1250, 820, m);
  s += shadow(mx, 1590, 160) + person('mann', mx, 1590, 1.5, { t, seed: 7, walk: t * 1.6, look: [0, 8], brows: 'worried', armR: [24, -250], front: phone(24, -262, 1.0, { rot: -8 }) });
  s += trainFG(1020, { hand: handPt(360, 1600, 1.55, [70, -560]) });
  s += dayCard(t, 8.92, 'MONTAG', { y: 250 });
  return frame(cam(s, 540, 1000, push(t, 8.92, 11.2, 1.0, 1.06)), { tint: ['#3a6ea8', .08] });
}
