// L15 55.36–58.9 the other side: du in the office with colleague, boss and friend around him; on "glauben" all three nod and a green check pops above each.
import { K, frame, bg, shadow, person, check, cam, prog, eio, eout, pop } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  const X = { kol: 170, du: 430, chef: 690, cap: 920 };
  for (const k in X) s += shadow(X[k], 1380, 85);
  const warm = eio(prog(t, 56.06, 56.5));
  const nod = (t0) => t > t0 ? Math.abs(Math.sin((t - t0) * 12)) * 14 * Math.max(0, 1 - (t - t0) / .9) : 0;
  s += person('kol', X.kol, 1380, .82, { t, seed: 2, eyes: t > 57.96 ? 'happy' : 'n', mouth: 'smile', look: [12, 0], headDy: nod(57.96) });
  s += person('chef', X.chef, 1380, .82, { t, seed: 4, eyes: t > 58.1 ? 'happy' : 'n', mouth: 'smile', look: [-12, 0], headDy: nod(58.1), armL: [-40, -240], armR: [40, -240] });
  s += person('cap', X.cap, 1380, .82, { t, seed: 5, eyes: t > 58.24 ? 'happy' : 'n', mouth: 'smile', look: [-14, 0], headDy: nod(58.24) });
  s += `<circle cx="${X.du}" cy="1110" r="${90 + 10 * Math.sin(t * 4)}" fill="${K.yellow}" opacity="${(.35 * warm).toFixed(2)}" filter="url(#blur20)"/>`;
  s += person('du', X.du, 1380, .82, { t, seed: 1, eyes: warm > .5 ? 'happy' : 'n', mouth: 'smile', look: [0, -6], armR: warm > .02 ? [20, -230 - 20 * warm] : null });
  s += check(X.kol, 820, 1, prog(t, 57.96, 58.3)) + check(X.chef, 820, 1, prog(t, 58.1, 58.44)) + check(X.cap, 820, 1, prog(t, 58.24, 58.58));
  return frame(cam(s, 540, 1000, 1.02 + .04 * eio(prog(t, 55.36, 58.9))));
}
