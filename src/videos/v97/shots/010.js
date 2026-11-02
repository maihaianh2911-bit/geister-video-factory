// L5a 24.92–28.00: close-up du, relieved: thought bubble "Danke, du hast meinen Tag gerettet." (25.68); happy eyes on "gerettet" (27.08).
import { frame, cam, pop, prog, eio, person, thought } from './lib.js';
import { openOffice } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { hh: 12, mm: 30, strong: true });
  const X = 520, Y = 2260, S = 1.6;
  const happy = t >= 27.0;
  s += person('du', X, Y, S, { t, seed: 6, look: [12, -6], eyes: happy ? 'happy' : 'n', brows: 'up', mouth: happy ? 'smile' : 'soft', notes: duNotes(t) });
  s += thought(540, 400, ['„Danke, du hast', 'meinen Tag gerettet.“'], 600, 760, { p: pop(t, 25.68, .4), size: 56 });
  return frame(cam(s, 540, 1050, 1 + .06 * eio(prog(t, 24.92, 28))));
}
