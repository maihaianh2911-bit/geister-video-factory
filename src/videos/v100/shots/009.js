// L4c 19.0–21.76: close-up from below: du looks up at the battery over their head ("Kopf" 19.86); it drops 100→80 % on "achtzig" (20.81).
import { frame, cam, head, prog, eio, office2, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const b = duBat(t), d = t >= 20.81;
  s += head('du', 540, 1330, 1.75, { t, seed: 1, look: [0, -14], brows: d ? 'sad' : 'worried', mouth: d ? 'frown' : 'flat', headTilt: -4 });
  s += `<path d="M 140 1960 C 160 1680 330 1610 540 1610 C 750 1610 920 1680 940 1960 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/><path d="M 500 1650 L 486 1760 M 580 1650 L 594 1760" stroke="${K.duStr}" stroke-width="10" stroke-linecap="round"/>`;
  s += battery(540, 640, 1.6, b.lvl, { t, drop: b.drop });
  s = cam(s, 540, 900, 1.0 + .08 * eio(prog(t, 19.0, 21.76)));
  return frame(s);
}
