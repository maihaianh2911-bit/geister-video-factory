// L9a 39.9–41.32: the way home in warm late-afternoon sun; du raises his face to the sunlight ("Sonne" 40.02) and a light sparks above him.
import { K, frame, cam, prog, eio, person, shadow } from './lib.js';
import { street } from './sets2.js';
import { orb } from './jar.js';
export default function renderShot(t) {
  let s = street(t, { eve: true });
  const up = eio(prog(t, 40.0, 40.4));
  s += shadow(420, 1640);
  s += person('du', 420, 1640, 1, { t, seed: 1, look: [12, -14 * up], brows: 'calm', mouth: 'smile', eyes: up > .6 ? 'happy' : 'n', headTilt: 8 * up, rim: '#ffcf7a' });
  s += orb(560, 600, 24, eio(prog(t, 40.3, 40.6)), t);
  return frame(cam(s, 500, 1000, 1.0 + .05 * eio(prog(t, 39.9, 41.32)), 30 * prog(t, 39.9, 41.32)));
}
