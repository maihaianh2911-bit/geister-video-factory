// L6c 28.42–31.23: bubble: a phone showing a funny photo of du's sister (two braids, yellow top, tongue out) (28.6); "3. Foto" is written ("Foto" 29.88).
import { K, frame, cam, prog, eio, pop, head } from './lib.js';
import { diary } from './page.js';
import { picBubble, picPhoto } from './jar.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = diary(t, [-1, -1, 29.7], { id: 'c' });
  const face = (x, y, k) => head('sis', x, y, k, { t, seed: 8, eyes: 'happy', mouth: 'grin', brows: 'up', headTilt: 12 }) + `<ellipse cx="${x + 6}" cy="${y + 40}" rx="12" ry="14" fill="#e8546a"/>`;
  s += picBubble(540, 400, 420, 300, 600, 700, pop(t, 28.55, .4), picPhoto(t, 420, 300, face), 'k12');
  return frame(cam(s, 540, 900, 1.06 + .05 * eio(prog(t, 28.42, 31.23))));
}
