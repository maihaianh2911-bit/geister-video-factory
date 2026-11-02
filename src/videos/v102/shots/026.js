// L16b 66.98–69.924: pull-back: du stands at the bright, colourful window and stretches both arms up happily; on "zurückkommt" (67.94) the FARBE meter glows at 100 % and small colour sparkles rise from the trees.
import { K, frame, cam, prog, eio, person, shadow, pool, f1, hash } from './lib.js';
import { windowView, sill } from './kit.js';
import { bar } from './base.js';
export default function renderShot(t) {
  let s = windowView(t, { sun: 1 }) + sill(t);
  const sp = prog(t, 67.9, 69.9);
  if (sp > 0) for (let i = 0; i < 14; i++) { const p = (sp * 1.4 + hash(i)) % 1, x = 160 + hash(i + 20) * 760, y = 1050 - 600 * p; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(10 + 8 * hash(i + 5))}" fill="${['#ffd23f', '#3fb36b', '#3b8fe0', '#e8504a', '#f2a23a'][i % 5]}" opacity="${(Math.sin(p * Math.PI) * .9).toFixed(2)}"/>`; }
  const st = eio(prog(t, 67.0, 67.8));
  s += shadow(330, 1660, 170);
  s += person('du', 330, 1660, 1, { t, seed: 1, eyes: 'happy', brows: 'calm', mouth: 'grin', armL: [-150 - 30 * st, -560 - 320 * st], elbowL: [-260, -540 - 140 * st], armR: [150 + 30 * st, -560 - 320 * st], elbowR: [260, -540 - 140 * st] });
  s = cam(s, 540, 950, 1.12 - .1 * eio(prog(t, 66.98, 68.6)));
  const gl = eio(prog(t, 67.9, 68.4));
  if (gl > 0) s += pool(200, 185, 260, 90, '#ffe680', .5 * gl * (.7 + .3 * Math.sin(t * 6)));
  s += bar(t);
  return frame(s);
}
