// L14b 60.9–63.16: close-up of du in front of the window, the trees behind him bright green in the sun;
// his amazed open mouth turns into a big smile ("eigentlich sind" 61.98).
import { frame, cam, prog, eio, person, pool } from './lib.js';
import { windowWall } from './window.js';
import { farbeBar, colourAt } from './common.js';
export default function renderShot(t) {
  let s = windowWall(t, { x: 200 });
  s += pool(540, 700, 600, 600, '#c8ffb0', .2);
  const sm = t > 61.9;
  s += person('du', 470, 2110, 1.75, { t, seed: 1, eyes: sm ? 'happy' : 'wide', brows: 'up', mouth: sm ? 'grin' : 'o', look: [-10, -10], rim: '#fff3b0', rimL: '#c8ffb0' });
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 60.9, 63.16)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
