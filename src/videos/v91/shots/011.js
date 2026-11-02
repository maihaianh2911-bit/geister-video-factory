// L10 36.68–40.88 du says the kind truth in two halves; the friend lights up; on "Beides ist wahr" a green check lands on each half.
import { K, frame, bg, shadow, person, speech, check, heart, glass, cam, prog, eio, eout, pop } from './lib.js';
export default function renderShot(t) {
  let s = bg('bar');
  s += shadow(230, 1360, 95) + shadow(620, 1360, 95) + shadow(880, 1360, 95);
  const glad = eio(prog(t, 38.6, 38.9));
  s += person('gf', 880, 1360, .9, { t, seed: 6, eyes: glad > .5 ? 'happy' : 'n', mouth: 'smile', look: [-10, 0] });
  s += person('cap', 620, 1360, .9, { t, seed: 5, eyes: glad > .5 ? 'happy' : 'n', mouth: glad > .5 ? 'laugh' : 'flat', look: [-12, 0], armR: [210, -330], headDy: -8 * glad });
  s += person('du', 230, 1360, .9, { t, seed: 1, look: [10, -2], mouth: t < 38.9 ? 'o' : 'smile', armR: [80, -250] });
  for (let i = 0; i < 3; i++) { const ph = t - 38.8 - i * .4; if (ph > 0) s += heart(620 + (i - 1) * 70, 840 - ph * 60, .9, K.red, Math.max(0, 1 - ph / 2)); }
  s += glass(330, 1080, .9) + glass(520, 1080, .9, '#c96a52');
  s += `<rect x="-20" y="1080" width="1120" height="40" rx="10" fill="#94664a" stroke="${K.ink}" stroke-width="5"/>`;
  s += speech(450, 380, 'Ich kenne sie noch kaum,', 260, 840, { p: pop(t, 36.68, .4), size: 48 });
  s += speech(560, 560, 'aber du wirkst glücklich.', 300, 840, { p: pop(t, 37.96, .4), size: 48 });
  s += check(900, 380, 1, prog(t, 39.62, 39.95)) + check(950, 560, 1, prog(t, 39.95, 40.28));
  return frame(cam(s, 560, 900, 1 + .04 * eio(prog(t, 36.68, 40.88))));
}
