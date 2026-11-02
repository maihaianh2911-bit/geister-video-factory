// L8 35.82–39.68: dim blue living room; the old du sits, head lowered; young du listens at the left. A sepia memory bubble shows a phone
// with the contact OPA: a thumb hovers over the green call button but never presses ("nicht öfter angerufen", 36.6–37.6); on "da war" (38.6)
// the phone screen goes dark and the bubble fades to grey.
import { K, frame, cam, prog, eio, pop, person, op } from './lib.js';
import { room } from './sets.js';
import { memBubble, callPhone, thumb } from './sets3.js';
import { coffeeTable, talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 20, mm: 45 });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0a1226" opacity=".25"/>`;
  s += person('du', 250, 1620, .98, { t, seed: 1, legs: false, look: [14, -6], brows: 'sad', mouth: 'small' });
  s += person('old', 760, 1620, 1, { t, seed: 7, legs: false, hunch: .55, look: [-6, 12], brows: 'sad', mouth: talk(t, 35.85, 38.9, 'frown') });
  s += coffeeTable(t, -40, 1120, 1450, { cups: [[180, '#f2efe8'], [940, '#e0b04a']] });
  const dim = eio(prog(t, 38.6, 39.3));
  const hov = Math.sin(Math.max(0, t - 36.3) * 3) * 14;
  const reach = eio(prog(t, 36.3, 36.9)) * (1 - .6 * eio(prog(t, 37.6, 38.3)));
  let inner = `<rect x="-230" y="-200" width="460" height="400" fill="#dfe6ee"/>` + callPhone(t, -30, 20, .55, { dim, id: 'p12' }) + thumb(30 + 60 * (1 - reach), 150 + 130 * (1 - reach) + hov * reach, K.du, .55);
  s += memBubble(560, 560, 460, 400, 700, 820, pop(t, 35.95, .5), inner, 'o12', { sepia: .28 + .3 * dim, a: 1 - .35 * dim });
  return frame(cam(s, 600, 1000, 1.02 + .05 * eio(prog(t, 35.82, 39.68))));
}
