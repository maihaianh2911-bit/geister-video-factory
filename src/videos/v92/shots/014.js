// L13 41.88–45.4 the red card "Lass mich in Ruhe" flips into the blue card "Ich fühle mich angegriffen." (on "Ich fühle")
import { K, frame, bg, person, flipCard, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('kitchen', { sc: 1.06 });
  s += `<rect width="1080" height="1920" fill="#1d1d1d" opacity=".3"/>`;
  const p = pop(t, 41.88, .4), fl = eio(prog(t, 43.25, 43.65));
  if (p > 0) s += `<g transform="translate(540 700) scale(${f1(p * 100) / 100})">${flipCard(0, 0, 820, 300, '„Lass mich in Ruhe“', ['„Ich fühle mich', 'angegriffen.“'], fl, { size: 66 })}</g>`;
  s += person('er', 540, 1330, .9, { t, seed: 2, look: [0, -14], brows: fl < .5 ? 'mean' : 'sad', eyes: fl > .5 ? 'sad' : 'n', mouth: 'flat' });
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 41.88, 45.4))));
}
