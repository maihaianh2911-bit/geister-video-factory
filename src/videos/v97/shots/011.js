// L5b 28.00–31.08: medium. du only says "Okay." (28.92); the colleague turns away; the unspoken thanks becomes the 2nd note on du's chest ("Zettel" 30.22).
import { frame, cam, shadow, pop, prog, eio, person, speech, thought, label, sparkle } from './lib.js';
import { openOffice, desk } from './sets.js';
import { duNotes, N2, bubbleToNote } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { hh: 12, mm: 45 });
  const X = 360, Y = 1660;
  const leave = eio(prog(t, 29.5, 31.0));
  s += person('neu', 780 + 220 * leave, 1660, 1, { t, seed: 2, look: [12, 0], mouth: 'smile', flip: leave > .05, walk: leave > 0 ? t * 1.6 : undefined });
  s += shadow(X, Y) + person('du', X, Y, 1, { t, seed: 6, look: [14, -4], brows: 'calm', mouth: t > 28.9 && t < 29.3 ? 'talk' : 'flat', notes: duNotes(t) });
  s += sparkle(X + N2.x, Y + N2.y, prog(t, 30.22, 30.7), .8);
  s += desk(t, { y: 1560, monitor: false, keyboard: false, mugX: 900 });
  s += speech(560, 640, ['„Okay.“'], 440, 830, { p: pop(t, 28.92, .35), size: 64 });
  s += thought(560, 360, ['„Danke, du hast', 'meinen Tag gerettet.“'], 420, 760, { p: 1 - eio(prog(t, 29.2, 29.6)), size: 40, a: .9 * (1 - prog(t, 29.2, 29.6)) });
  s += bubbleToNote(t, 29.5, 30.22, 560, 360, X + N2.x, Y + N2.y, 1, N2);
  s = cam(s, 500, 1100, 1.04 + .05 * eio(prog(t, 28, 31.08)));
  s += label('2', 870, 720, 110, { p: pop(t, 30.3, .4) });
  return frame(s);
}
