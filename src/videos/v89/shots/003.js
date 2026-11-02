// L2 7.84–10.86 MONTAG, office: du tells Lena about the promotion and raises the letter on "Beförderung".
import { K, frame, bg, shadow, person, speech, dayCard, chip, arrowUp, star, cam, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  s += shadow(330, 1330) + shadow(750, 1330);
  const raise = eio(prog(t, 9.7, 10.15));
  const hand = [100 + 20 * raise, -220 - 200 * raise];
  // letter in du's raised hand (drawn in person-local coords via `front`)
  const paper = `<g transform="translate(${f1(hand[0] + 6)} ${f1(hand[1] - 70)}) rotate(${f1(8 - 8 * raise)})"><rect x="-55" y="-70" width="110" height="140" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M -32 -36 H 32 M -32 -12 H 32 M -32 12 H 14" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/>${star(26, 44, 18)}</g>`;
  s += person('du', 330, 1330, 1, { t, seed: 1, hear: .6, armR: hand, front: paper, eyes: t > 8.7 ? 'happy' : 'n', mouth: t > 8.7 ? 'grin' : 'smile', look: [8, 0] });
  s += person('lena', 750, 1330, 1, { t, seed: 2, look: [-10, -2], mouth: 'flat' });
  // du's news as a speech bubble (icons only: up arrow + star) on "erzählst"
  const pb = pop(t, 8.7, .4);
  if (pb > 0) {
    s += speech(300, 650, ['      '], 330, 820, { p: pb, size: 70 });
    s += `<g opacity="${f1(Math.min(1, pb) * 100) / 100}">${arrowUp(270, 652, .9)}${star(345, 640, 32)}</g>`;
  }
  s += chip(540, 470, 'BEFÖRDERUNG', { p: pop(t, 10.0, .4), size: 56, bg: '#fff' });
  s += dayCard(t, 7.84, 'MONTAG');
  return frame(cam(s, 540, 960, 1 + .03 * eio(prog(t, 7.84, 10.86))));
}
