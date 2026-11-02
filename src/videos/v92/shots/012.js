// L11 35.4–39.04 "Hinter einem Vorwurf steckt oft ein Wunsch": the red VORWURF card slides aside and reveals a blue WUNSCH card.
import { K, frame, bg, person, flipCard, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('kitchen', { sc: 1.06 });
  s += `<rect width="1080" height="1920" fill="#1d1d1d" opacity=".3"/>`;
  const p = pop(t, 35.6, .4), slide = eio(prog(t, 36.9, 37.4));
  if (p > 0) {
    s += `<g transform="translate(540 760) scale(${f1(p * 100) / 100})">`;
    s += `<g transform="translate(${f1(30 * (1 - slide))} ${f1(-20 * (1 - slide))})">${flipCard(0, 0, 640, 300, 'WUNSCH', 'WUNSCH', 1, { size: 96 })}</g>`;
    s += `<g transform="translate(${f1(lerp(0, -520, slide))} ${f1(lerp(0, 120, slide))}) rotate(${f1(-14 * slide)})">${flipCard(0, 0, 640, 300, 'VORWURF', 'VORWURF', 0, { size: 96 })}</g></g>`;
  }
  s += person('du', 330, 1330, .7, { t, seed: 1, hear: .6, look: [8, -12], mouth: 'flat' }) + person('er', 750, 1330, .7, { t, seed: 2, look: [-8, -12], mouth: 'flat' });
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 35.4, 39.04))));
}
