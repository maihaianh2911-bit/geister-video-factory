// L16 50.18–53.76 du says "Ich fühle mich gerade allein mit allem." then "Kannst du mir heute helfen?" — Er softens and steps closer.
import { K, frame, person, speech, cam, prog, eio, eout, pop, lerp } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  const step = eio(prog(t, 53.0, 53.6));
  const ex = lerp(ER, 690, step);
  let s = kitchen(t, { plates: 7, er: ex });
  s += person('du', DU, GY, 1, { t, seed: 1, eyes: 'n', brows: 'sad', mouth: 'smile', look: [12, 0] });
  s += person('er', ex, GY, 1, { t, seed: 2, walk: step > 0 && step < 1 ? t * 1.9 : undefined, eyes: t > 52.4 ? 'happy' : 'n', mouth: t > 52.4 ? 'smile' : 'flat', look: [-12, 0] });
  s += speech(380, 470, ['Ich fühle mich gerade', 'allein mit allem.'], DU + 10, 800, { p: pop(t, 50.18, .4), a: t > 52.3 ? .55 : undefined, size: 44 });
  s += speech(560, 680, ['Kannst du mir', 'heute helfen?'], DU + 40, 820, { p: pop(t, 52.3, .4), size: 46 });
  return frame(cam(s, 540, 1000, 1.03 + .03 * eio(prog(t, 50.18, 53.76))));
}
