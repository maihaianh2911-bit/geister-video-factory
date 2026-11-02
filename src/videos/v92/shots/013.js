// L12 39.04–41.88 the red card "Du hilfst nie" flips into the blue card "Ich brauche dich." (on "Ich brauche")
import { K, frame, bg, person, flipCard, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('kitchen', { sc: 1.06 });
  s += `<rect width="1080" height="1920" fill="#1d1d1d" opacity=".3"/>`;
  const p = pop(t, 39.04, .4), fl = eio(prog(t, 40.2, 40.6));
  if (p > 0) s += `<g transform="translate(540 700) scale(${f1(p * 100) / 100})">${flipCard(0, 0, 760, 280, '„Du hilfst nie“', '„Ich brauche dich.“', fl, { size: 70 })}</g>`;
  s += person('du', 540, 1330, .9, { t, seed: 1, hear: .6, look: [0, -14], eyes: fl > .5 ? 'n' : 'n', brows: fl < .5 ? 'mean' : 'sad', mouth: fl > .5 ? 'smile' : 'flat' });
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 39.04, 41.88))));
}
