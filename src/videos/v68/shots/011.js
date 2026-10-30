// 25.0–27.2: side by side — the hard shell layer gets thinner over time ("dünner")
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { shell } from './micro.js';
export default function renderShot(t) {
  const th = lerp(.92, .25, eio(prog(t, 25.3, 26.7)));
  const L = 340 * th;
  const bar = `<path d="M 980 1000 V ${f1(1000 + L)}" ${OL(8)} stroke="${K.blue}"/><path d="M 960 1000 H 1000 M 960 ${f1(1000 + L)} H 1000" stroke="${K.blue}" stroke-width="8"/>`;
  return `${shell(th, { eat: .6 })}${bar}`;
}
