// L9 30.66–32.9 "Psychologen nennen das den Spotlight-Effekt": stage dark, spotlight on du, big title.
import { K, frame, bg, shadow, person, spotlight, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#15161c"/>`;
  s += spotlight(540, 1330, 440, eio(prog(t, 30.7, 31.0)));
  s += shadow(540, 1330);
  s += person('du', 540, 1330, 1, { t, seed: 1, hear: .6, eyes: 'wide', mouth: 'flat', look: [0, -10] });
  const p = pop(t, 31.72, .45);
  if (p > 0) s += `<g transform="translate(540 470) scale(${f1(p * 100) / 100})">${T(0, -40, 'SPOTLIGHT-', 120, { fill: K.yellow, stroke: K.ink, sw: 22 })}${T(0, 100, 'EFFEKT', 140, { fill: K.yellow, stroke: K.ink, sw: 22 })}</g>`;
  return frame(cam(s, 540, 1000, 1 + .04 * eio(prog(t, 30.66, 32.9))));
}
