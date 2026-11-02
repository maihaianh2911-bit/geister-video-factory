// L16b 88.00–91.62: wide→medium: du walks out into the evening street-facing room, stops, turns to the viewer and points: "SAG ES." (89.71).
import { frame, cam, shadow, pop, prog, eio, person, label, note } from './lib.js';
import { openOffice } from './sets.js';
export default function renderShot(t) {
  let s = openOffice(t, { mood: 'sun', hh: 17, mm: 0 });
  const w = eio(prog(t, 88.0, 89.3));
  const X = 220 + 320 * w;
  const pt = eio(prog(t, 89.6, 90.0));
  s += shadow(X, 1650) + person('du', X, 1650, 1, { t, seed: 3, look: pt > 0 ? [0, 0] : [14, 0], eyes: t > 90.6 ? 'happy' : 'n', brows: 'up', mouth: pt > 0 ? 'grin' : 'smile', walk: w > 0 && w < 1 ? t * 1.7 : undefined, armR: [150 + 80 * pt, -330 - 260 * pt], elbowR: [250, -420 - 60 * pt] });
  // colleagues in the background, both smiling
  s += person('kol', 900, 1620, .8, { t, seed: 4, look: [-12, 0], eyes: 'happy', mouth: 'smile', a: .95 });
  s = cam(s, 540, 1050, .96 + .1 * eio(prog(t, 88, 91.62)));
  s += label('SAG ES.', 540, 330, 150, { p: pop(t, 89.71, .45) });
  return frame(s);
}
