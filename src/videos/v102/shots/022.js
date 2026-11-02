// L13 55.4–58.92: night, du sleeps deeply and smiles; moon in the window. On "acht Stunden" (55.98) a chip "8 h" pops,
// on "nächsten Nacht" (57.6) the moon has moved and a second "8 h" chip joins it; the meter climbs (16 → 42 → 62 %) and the room regains colour.
import { frame, cam, prog, eio, lerp, pool } from './lib.js';
import { bedroom2, bedDu } from './sets.js';
import { tint } from './base.js';
import { farbeBar, colourAt, grey, moonChip } from './common.js';
export default function renderShot(t) {
  let s = bedroom2(t, {}) + tint('#0a1226', .4);
  const mp = eio(prog(t, 56.6, 57.6));
  const mx = lerp(700, 920, mp), my = lerp(420, 340, mp);
  s += pool(mx, my, 160, 160, '#fff3c4', .5) + `<circle cx="${mx}" cy="${my}" r="44" fill="#f4eccd"/>`;
  s += bedDu(t, { hx: 330, hy: 1050, eyes: 'closed', brows: 'calm', mouth: 'smile', blink: false });
  s += grey(1 - colourAt(t));
  s = cam(s, 540, 1050, 1.04 + .06 * eio(prog(t, 55.4, 58.92)));
  s += moonChip(380, 600, '8 h', eio(prog(t, 55.98, 56.3)));
  s += moonChip(680, 600, '8 h', eio(prog(t, 57.6, 57.95)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
