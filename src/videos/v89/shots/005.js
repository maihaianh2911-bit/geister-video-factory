// L4 15.4–18.48 Two seconds later Lena already talks about her own weekend; du's smile fades.
import { K, frame, bg, shadow, person, speech, chip, sunIcon, palmIcon, cam, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  s += shadow(330, 1330) + shadow(750, 1330);
  const fadeSmile = t > 16.3;
  const paper = `<g transform="translate(130 -200) rotate(12)"><rect x="-55" y="-70" width="110" height="140" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M -32 -36 H 32 M -32 -12 H 32 M -32 12 H 14" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/></g>`;
  s += person('du', 330, 1330, 1, { t, seed: 1, hear: .6, armR: [120, -270], behindBody: '', front: paper, eyes: fadeSmile ? 'sad' : 'n', mouth: fadeSmile ? 'sad' : 'flat', look: [10, 0], headDy: 6 * eio(prog(t, 16.3, 16.8)) });
  // Lena turns away (towards the screen right) and gestures while talking about herself
  const wave = Math.sin(t * 7) * 18;
  s += person('lena', 750, 1330, 1, { t, seed: 2, look: [14, -6], eyes: 'happy', mouth: 'grin', armR: [140, -330 + wave], armL: [-110, -260 - wave * .5] });
  const pb = pop(t, 16.2, .4);
  if (pb > 0) {
    s += speech(770, 630, ['            '], 760, 830, { p: pb, size: 80 });
    s += `<g opacity="${f1(Math.min(1, pb) * 100) / 100}">${sunIcon(690, 632, 1.15)}${palmIcon(850, 636, 1.05)}</g>`;
  }
  s += chip(540, 330, 'ZWEI SEKUNDEN SPÄTER', { p: pop(t, 15.4, .4), size: 50, bg: '#fff' });
  return frame(cam(s, 540, 960, 1.07 - .05 * eio(prog(t, 15.4, 16.2))));
}
