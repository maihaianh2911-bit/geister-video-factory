// L5a 19.5–22.2: office, du at the desk; the hand lays the phone face down next to the keyboard ("Handy" 20.34, "Display nach unten" 21.6); colleague at the back desk.
import { K, frame, cam, person, prog, eio, lerp, label, pop } from './lib.js';
import { office2, desk } from './sets.js';
import { duHG, phoneDown, gphone } from './base.js';
export default function renderShot(t) {
  let s = office2(t);
  s += person('coll', 110, 1230, .55, { t, seed: 3, look: [14, 6], mouth: 'flat', brows: 'calm', legs: false });
  const d = eio(prog(t, 20.2, 20.7));
  const hand = [lerp(200, 250, d), lerp(-520, -330, d)];
  s += duHG(480, 1640, 1, { t, seed: 1, look: [-8 + 16 * d, 14], brows: 'calm', mouth: 'flat', armR: d < 1 ? hand : [250, -350], legs: false }, {});
  let ex = '';
  if (d < 1) ex += gphone(480 + hand[0], 1640 + hand[1] - 20, .8, lerp(-10, 80, d), { lit: 1 - d, id: 'p9' });
  else ex += phoneDown(750, 1345, 1.0, -4);
  s += desk(t, { y: 1300, monX: 860, screenInner: '', kbX: 450, mugX: 110, extra: ex });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 19.5, 21.5)) + .07 * eio(prog(t, 21.6, 22.2)), -120 * eio(prog(t, 21.6, 22.2)), -40 * eio(prog(t, 21.6, 22.2)));
  s += label('IM BÜRO', 540, 250, 96, { p: pop(t, 19.6, .45) });
  return frame(s);
}
