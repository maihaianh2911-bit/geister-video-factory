// shared café layout for shots 6–8 (Mittwoch): four friends behind a table
import { K, bg, shadow, person, cafeTable, cup, f1 } from './lib.js';
export const P = { gl: 160, lena: 385, du: 620, cap: 850 }, GY = 1300, S = .82;
export function cafeScene(t, o = {}) {
  let s = bg('cafe');
  for (const k of Object.keys(P)) s += shadow(P[k], GY, 90);
  const ent = o.enter || {};
  const at = (k) => ent[k] === undefined ? 1 : ent[k];
  const people = [['gl', 5], ['lena', 2], ['du', 1], ['cap', 4]];
  for (const [k, seed] of people) {
    const a = at(k);
    if (a <= 0) continue;
    const dx = (1 - a) * (P[k] < 540 ? -260 : 260);
    s += person(k, P[k] + dx, GY, (o.scale && o.scale[k]) || S, Object.assign({ t, seed, a, walk: a < 1 ? t * 1.8 : undefined }, (o.pose && o.pose[k]) || {}));
  }
  s += cafeTable(540, 1130, 900);
  if (o.cups !== false) s += [[P.gl + 40, 1130], [P.lena + 40, 1130], [P.du - 40, 1130], [P.cap - 40, 1130]].map(([x, y], i) => cup(x, y, .9, ['#ffffff', '#f4d6dc', '#d8efe9', '#ffe9c2'][i])).join('');
  return s;
}
