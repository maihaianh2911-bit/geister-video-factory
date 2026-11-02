// L9c 43.02–45.4: supermarket checkout: a child on the other side of the conveyor laughs out loud ("Lachen" 43.18), du laughs along; a light sparks.
import { K, frame, cam, prog, eio, person, shadow } from './lib.js';
import { market, checkout } from './sets2.js';
import { orb } from './jar.js';
export default function renderShot(t) {
  let s = market(t);
  const l = t >= 43.15, b = l ? Math.abs(Math.sin((t - 43.15) * 9)) * 10 : 0, d = eio(prog(t, 43.6, 43.9));
  s += person('du', 280, 1560, 1, { t, seed: 1, look: [14, 6], brows: d > .5 ? 'up' : 'calm', mouth: d > .5 ? 'grin' : 'small', eyes: d > .5 ? 'happy' : 'n', legs: false });
  s += person('kid', 620, 1520 - b, .62, { t, seed: 7, look: [-12, 0], brows: 'up', mouth: l ? 'grin' : 'smile', eyes: l ? 'happy' : 'n', legs: false, still: true });
  s += checkout(t, 1240);
  s += orb(540, 640, 24, eio(prog(t, 43.5, 43.8)), t);
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 43.02, 45.4))));
}
