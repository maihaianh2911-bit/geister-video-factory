// L14 48.5–52.08 everyone stands in their own spotlight and thinks it's the only one: four cones switch on one after another.
import { K, frame, shadow, person, spotlight, cam, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#15161c"/>`;
  const P = [[150, 'gl', 5], [400, 'du', 1], [660, 'boss', 6], [900, 'cap', 4]];
  const on = i => eio(prog(t, 48.6 + i * .3, 48.8 + i * .3));
  P.forEach(([x], i) => { s += spotlight(x, 1300, 230, on(i)); });
  P.forEach(([x, who, seed], i) => {
    const a = .25 + .75 * on(i);
    s += shadow(x, 1300, 70, a);
    s += person(who, x, 1300, .7, { t, seed, a, hear: who === 'du' ? .6 : 0, eyes: t > 49.8 ? 'wide' : 'n', mouth: 'flat', look: [0, -12] });
  });
  return frame(cam(s, 540, 1000, 1.04 - .04 * eio(prog(t, 48.5, 52.08))));
}
