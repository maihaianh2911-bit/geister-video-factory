// L10 56.04–60.24: close-up du with the three notes in the warm room: "keine Last" (57.26) du looks down; "Freude" (57.98) the notes glow and du softly smiles.
import { frame, cam, prog, eio, person, pool } from './lib.js';
import { room } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false, strong: true });
  const g = eio(prog(t, 57.9, 58.8));
  s += pool(540, 1200, 560, 600, '#ffe27a', .6 * g);
  const notes = duNotes(t).map((n, i) => ({ ...n, glow: g * (.8 + .2 * Math.sin(t * 4 + i)) }));
  s += person('du', 540, 1980, 1.45, { t, seed: 3, look: t < 57.2 ? [0, 0] : [6, 14], eyes: t > 59.2 ? 'happy' : 'n', brows: g > .5 ? 'up' : 'calm', mouth: g > .5 ? 'smile' : 'flat', notes });
  return frame(cam(s, 540, 1050, 1 + .07 * eio(prog(t, 56.04, 60.24))));
}
