// shared helpers for v95: du (woman, teal hoodie, yellow clip) with her loudspeaker next to the head
import { person, speaker, headAt } from './lib.js';
export const RED = { col: '#d9493f', sh: '#a8322b' }, GREEN = { col: '#3c9a5f', sh: '#2c7a49' };
// du + speaker at the screen-right of her head. o.sp = speaker options (talk, crack, col...)
export function duSp(x, y, s, o = {}, sp = {}) {
  const [hx, hy] = headAt(x, y, s, o);
  const side = sp.side || 1;
  return person('duw', x, y, s, o) + (sp.hide ? '' : speaker(hx + side * 260 * s, hy - 60 * s, .78 * s, { t: o.t, ...RED, ...sp }));
}
export const spPos = (x, y, s, o = {}, side = 1) => { const [hx, hy] = headAt(x, y, s, o); return [hx + side * 260 * s, hy - 60 * s]; };
