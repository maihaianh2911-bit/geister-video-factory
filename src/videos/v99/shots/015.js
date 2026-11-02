// L8a 35.6–38.02: label PENNSYLVANIA; red-brick university campus by day; two psychologists (bun + green blouse, glasses + lab coat) in front of the building turn to each other and nod.
import { K, frame, cam, prog, eio, pop, label, person, shadow } from './lib.js';
import { campus } from './sets.js';
import { nod } from './common.js';
export default function renderShot(t) {
  let s = campus(t, { brick: true });
  const turn = eio(prog(t, 36.8, 37.2));
  s += shadow(330, 1640) + shadow(760, 1640);
  s += person('res1', 330, 1640, 1, { t, seed: 3, look: [lerpN(0, 16, turn), 0], brows: 'calm', mouth: 'small', headDy: nod(t, 37.3, 37.9) });
  s += person('res2', 760, 1640, 1, { t, seed: 5, look: [lerpN(0, -16, turn), 0], brows: 'up', mouth: 'flat', armL: [-160, -330], elbowL: [-220, -440], front: `<g transform="translate(-190 -380) rotate(-10)"><rect x="-60" y="-80" width="120" height="160" rx="8" fill="#a8744a" stroke="${K.ink}" stroke-width="5"/><rect x="-46" y="-64" width="92" height="132" fill="#fbf8ef"/><path d="M -34 -36 H 34 M -34 -6 H 34 M -34 24 H 20" stroke="#b9cde6" stroke-width="5"/></g>` });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 35.6, 38.02)));
  s += label('PENNSYLVANIA', 540, 260, 100, { p: pop(t, 36.2, .45) });
  return frame(s);
}
const lerpN = (a, b, p) => a + (b - a) * p;
