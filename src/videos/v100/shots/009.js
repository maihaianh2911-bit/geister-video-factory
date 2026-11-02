// L4c 19.0–21.76: close-up from below: du looks up at the battery over their head ("Kopf" 19.86); it drops 100→80 % on "achtzig" (20.81).
import { frame, cam, head, bust, prog, eio, office2, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const b = duBat(t), d = t >= 20.81;
  s += bust('du', 540, 1110, 1.75, { t, seed: 1, look: [0, -14], brows: d ? 'sad' : 'worried', mouth: d ? 'frown' : 'flat', headTilt: -4 });
  s += battery(540, 520, 1.6, b.lvl, { t, drop: b.drop });
  s = cam(s, 540, 900, 1.0 + .08 * eio(prog(t, 19.0, 21.76)));
  return frame(s);
}
