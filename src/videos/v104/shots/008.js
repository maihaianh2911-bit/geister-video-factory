// L5a 24.92–27.26: "Viele geben genau hier auf": du turns away from the meadow, back into the house; the door begins to close behind him (26.3–27.2).
import { K, frame, cam, prog, eio } from './lib.js';
import { field } from './common.js';
import { dayCounter } from './meadow.js';
export default function renderShot(t) {
  const turn = eio(prog(t, 25.3, 25.9));
  const go = eio(prog(t, 25.9, 26.8));
  const door = 1 - .75 * eio(prog(t, 26.3, 27.2));
  const s = field(t, 235 - 40 * go, 1240, .78, { frontClip: 390, mood: 'morning', p: .35, tall: 1.4, tallBack: 1.15, house: { open: door, w: 470, dx: 140 }, du: { eyes: 'half', brows: 'sad', mouth: 'frown', hunch: .5, look: turn > .5 ? [-14, 6] : [8, 8], flip: turn > .5, walk: go > 0 && go < 1 ? t * 1.6 : undefined, a: go < .7 ? 1 : 0 } });
  return frame(cam(s, 380, 1000, 1.2 + .05 * eio(prog(t, 24.92, 27.26))) + dayCounter('TAG 21', 820, 400, 1));
}
