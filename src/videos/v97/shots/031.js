// L15a 80.16–82.90: the mother in her evening kitchen, inside a phone frame: the note arrives as a warm sparkle (80.4); she is silent ("schweigt" 80.34),
// hand on her chest, a tear (81.5).
import { frame, cam, prog, eio, person, phone, sparkle, pool, f1, K } from './lib.js';
import { kitchen } from './sets.js';
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  s += `<rect width="1080" height="1920" fill="#2a1830" opacity=".3"/>` + pool(540, 900, 620, 700, '#ffb86b', .35) + ``;
  const hand = eio(prog(t, 80.6, 81.1));
  s += person('mama', 540, 1900, 1.2, { t, seed: 5, look: [0, 4], eyes: t > 81.0 ? 'n' : 'wide', brows: t > 80.6 ? 'sad' : 'up', mouth: 'small', tear: prog(t, 81.4, 82.4), armL: [-150, -720], elbowL: [-260, -500], holdL: phone(0, 0, .5, -15), armR: [120 - 80 * hand, -300 - 140 * hand], elbowR: [230, -330] });
  s += sparkle(560, 900, prog(t, 80.2, 80.9), 1.4);
  // phone frame around the picture
  s += `<path d="M -10 -10 H 1090 V 1930 H -10 Z M 70 120 Q 70 70 120 70 H 960 Q 1010 70 1010 120 V 1620 Q 1010 1670 960 1670 H 120 Q 70 1670 70 1620 Z" fill="#1d1d1d" fill-rule="evenodd"/><rect x="440" y="88" width="200" height="24" rx="12" fill="#333"/>`;
  return frame(cam(s, 540, 900, 1 + .03 * eio(prog(t, 80.16, 82.9))));
}
