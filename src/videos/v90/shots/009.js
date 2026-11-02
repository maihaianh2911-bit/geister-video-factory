// L8 28.98–30.66 "Niemand denkt an deinen Fleck": wide canteen, du with the stain in the middle; everyone looks elsewhere; a crossed-out eye.
import { K, frame, bg, shadow, person, stain, cafeTable, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('cafe');
  const P = [[150, 'cap', 4, [-12, -8]], [360, 'gl', 5, [-12, 6]], [720, 'boss', 6, [12, 10]]];
  for (const [x] of P) s += shadow(x, 1330, 80);
  s += shadow(540, 1330, 80);
  for (const [x, who, seed, look] of P) s += person(who, x, 1330, .7, { t, seed, look, mouth: 'flat' });
  s += person('du', 540, 1330, .8, { t, seed: 1, hear: .6, top: '#f7f7f7', shirt: true, overBody: stain(1, 22, -272), eyes: 'wide', mouth: 'flat', look: [0, 10] });
  // eye icon, crossed out on "Niemand"
  const p = pop(t, 29.0, .4), x = eio(prog(t, 29.3, 29.6));
  if (p > 0) s += `<g transform="translate(540 560) scale(${f1(p * 100) / 100})"><path d="M -110 0 Q 0 -90 110 0 Q 0 90 -110 0 Z" fill="#fff" stroke="${K.ink}" stroke-width="8"/><circle r="36" fill="${K.ink}"/><circle cx="-10" cy="-10" r="10" fill="#fff"/>${x > 0 ? `<path d="M -110 ${f1(-80 + 0)} L ${f1(-110 + 220 * x)} ${f1(-80 + 160 * x)}" stroke="${K.red}" stroke-width="20" stroke-linecap="round"/>` : ''}</g>`;
  return frame(cam(s, 540, 1000, 1.05 - .04 * eio(prog(t, 28.98, 30.66))));
}
