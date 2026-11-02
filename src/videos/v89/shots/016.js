// L15 49.0–52.72 the glow switches off on "niemand"; then the four moments appear as small cards: you recognise them anyway.
import { K, frame, bg, shadow, person, miniCard, cam, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('street', { sc: 1.04 });
  s += shadow(540, 1330);
  const off = 1 - eio(prog(t, 49.86, 50.2));
  const think = eio(prog(t, 50.6, 51.0));
  s += person('du', 540, 1330, 1, { t, seed: 1, hear: off > .01 ? .9 * off : 0, armR: think > .02 ? [60 + 10 * think, -212 - 140 * think] : null, eyes: t > 50.2 && t < 50.6 ? 'closed' : 'n', mouth: 'flat', look: [0, -12 * think] });
  const days = ['MO', 'MI', 'FR', 'SO'];
  days.forEach((d, i) => { s += miniCard(195 + i * 230, 470, d, pop(t, 51.08 + i * .18, .4)); });
  return frame(cam(s, 540, 1000, 1.04 - .04 * eio(prog(t, 49.0, 52.72))));
}
