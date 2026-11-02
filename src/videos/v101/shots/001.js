// L1a 0–2.74: evening bedroom, du (teal hoodie) sits on the bed edge, the empty jar on the nightstand right; hook title; on "gute Moment" (1.34–1.7) a small golden light appears above du's open hand and he smiles at it.
import { K, frame, cam, label, pop, prog, eio, person, shadow } from './lib.js';
import { bedroom, bed, nightstand, jar } from './base.js';
import { orb } from './jar.js';
export default function renderShot(t) {
  const l = eio(prog(t, 1.34, 1.8));
  let s = bedroom(t, { light: .25 * l });
  s += bed(1420, { w: 600 });
  s += shadow(360, 1640);
  s += person('du', 360, 1640, 1, { t, seed: 1, look: l > .3 ? [12, -4] : [0, 4], brows: l > .5 ? 'up' : 'calm', mouth: l > .5 ? 'smile' : 'small', armR: [170, -360], elbowR: [210, -300] });
  s += orb(540, 1210 - 30 * l, 22, l, t);
  s += nightstand(t, 840, 1330) + jar(800, 1330, .95, { t, n: 0, glow: 0 });
  s = cam(s, 540, 1050, 1.0 + .06 * eio(prog(t, 0, 2.74)));
  s += label('WAS WÄRE, WENN …', 540, 250, 92, { p: pop(t, .05, .45) });
  return frame(s);
}
