// shared kitchen layout for v92: du (left) and Er (right) at the counter with the sink between them
import { bg, shadow, sink } from './lib.js';
export const DU = 300, ER = 780, GY = 1330;
export function kitchen(t, o = {}) {
  let s = bg('kitchen', o.bg || {});
  if (o.sink !== false) s += sink(540, 1000, o.plates === undefined ? 6 : o.plates);
  s += shadow(o.du === undefined ? DU : o.du, GY) + shadow(o.er === undefined ? ER : o.er, GY);
  return s;
}
