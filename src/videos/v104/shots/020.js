// L12 63.8–65.68: wide golden sunrise: a broad dirt path now runs through the whole meadow to the village; du walks far along it, small;
// on "Weg" (65.1) the path catches the light. The camera rises slowly.
import { K, frame, cam, prog, eio, pool } from './lib.js';
import { field } from './common.js';
import { pathX } from './meadow.js';
export default function renderShot(t) {
  const w = prog(t, 63.8, 65.68);
  const y = 1080 - 90 * w;
  const g = eio(prog(t, 65.0, 65.5));
  const s = field(t, pathX(y), y, .32 - .05 * w, { mood: 'gold', p: 1, tall: 1.1, sunX: 640, sunY: 640, du: { walk: t * 1.6, flip: false, look: [0, -6] }, before: pool(560, 1300, 360, 520, '#ffe6a8', .35 * g) });
  return frame(cam(s, 560, 1000, 1.0 + .04 * eio(prog(t, 63.8, 65.68)), 0, 40 * w));
}
