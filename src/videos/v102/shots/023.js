// L14a 58.92–60.9: card DIENSTAG. Morning, du stands left at the big bedroom window; the trees outside are still pale,
// on "grün" (60.36) the colour floods back into the trees and the room (meter → 100 %); du's eyes go wide.
import { frame, cam, prog, eio, person, shadow, dayCard } from './lib.js';
import { windowWall } from './window.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = windowWall(t, {});
  s += grey(1 - colourAt(t));
  const w = t > 60.3;
  s += shadow(260, 1660);
  s += person('du', 260, 1660, 1, { t, seed: 1, eyes: w ? 'wide' : 'n', brows: w ? 'up' : 'calm', mouth: w ? 'o' : 'small', look: [16, -8], rim: '#fff3b0' });
  s = cam(s, 540, 1000, 1.0 + .07 * eio(prog(t, 58.92, 60.9)));
  s += dayCard(t, 59.0, 'DIENSTAG', { y: 330 });
  s += farbeBar(colourAt(t), { glow: eio(prog(t, 60.6, 61)) });
  return frame(s);
}
