// L6 27.5–31.6: close-up of the old du in a cooler, quieter light; on "Lena" (28.9) a large sepia memory bubble opens above:
// Lena (shoulder-length hair, red sweater) laughing in a café; the bubble keeps growing slowly while he looks up at it, wistful.
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { room } from './sets.js';
import { memBubble, picLena } from './sets3.js';
import { talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', strong: true, hh: 20, mm: 40 });
  s += person('old', 640, 2200, 1.66, { t, seed: 7, hunch: .3, look: t > 29 ? [-6, -14] : [-10, 0], brows: 'sad', mouth: talk(t, 27.55, 31.0, 'small'), rimL: '#a9c8ff' });
  const g = 1 + .14 * eio(prog(t, 29.3, 31.6));
  s += memBubble(430, 470, 520 * g, 380 * g, 500, 760, pop(t, 28.9, .5), picLena(t, 520 * g, 380 * g), 'l10');
  return frame(cam(s, 560, 950, 1.0 + .05 * eio(prog(t, 27.5, 31.6))));
}
