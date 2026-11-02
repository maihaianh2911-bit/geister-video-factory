// L9b 42.52–46.06: close-up of the left student: confident thought bubble "Ans Handy? Nie." (glaubten 42.78); on "Handy gedacht" (44.86) a small phone flickers at the back of the head.
import { K, frame, cam, prog, eio, pop, thought, fade } from './lib.js';
import { examPanel } from './sets.js';
import { gphone, screenGlow } from './base.js';
import { person } from './lib.js';
export default function renderShot(t) {
  let s = examPanel(t, 0, 'tisch') + examPanel(t, 540, 'tisch');
  s += person('stu1', 520, 2150, 1.7, { t, seed: 2, look: [-12, -4], mouth: 'smile', brows: 'calm' });
  s += thought(560, 380, ['„An mein Handy?', 'Gar nicht.“'], 520, 660, { p: pop(t, 42.8, .45), size: 52 });
  const f = t >= 44.86 ? .5 + .5 * Math.sin(t * 18) : 0;
  if (f > 0) s += screenGlow(830, 720, 150, .5 * f) + gphone(830, 720, .8, 14 + 6 * Math.sin(t * 50), { lit: f, id: 'p16' }) + `<g stroke="#7fd4ff" stroke-width="7" fill="none" stroke-linecap="round" opacity="${f.toFixed(2)}"><path d="M 760 640 q -20 30 0 60"/><path d="M 900 640 q 20 30 0 60"/></g>`;
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 42.52, 46.06))));
}
