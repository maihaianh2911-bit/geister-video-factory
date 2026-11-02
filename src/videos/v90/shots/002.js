// L1 5.16–7.86 "Die Antwort ist überraschender, als du glaubst." — a big question mark flips into an exclamation mark.
import { K, frame, bg, shadow, person, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { sc: 1.04 });
  s += shadow(540, 1330);
  const think = eio(prog(t, 5.2, 5.6));
  s += person('du', 540, 1330, 1, { t, seed: 1, hear: .6, armR: [70 + 10 * think, -212 - 150 * think], eyes: t > 6.0 ? 'wide' : 'n', mouth: t > 6.0 ? 'o' : 'flat', look: [0, -12] });
  const flip = prog(t, 5.86, 6.26), sx = Math.abs(Math.cos(flip * Math.PI));
  const ch = flip < .5 ? '?' : '!';
  const sc = pop(t, 5.2, .4);
  s += `<g transform="translate(540 620) scale(${f1(sx * sc * 100) / 100} ${f1(sc * 100) / 100})">${T(0, 90, ch, 260, { fill: flip < .5 ? '#fff' : K.yellow, stroke: K.ink, sw: 22 })}</g>`;
  return frame(cam(s, 540, 1000, 1 + .04 * eio(prog(t, 5.16, 7.86))));
}
