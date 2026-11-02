// L8a 41.26–44.00: wide Chicago skyline by the lake, slow pan; "CHICAGO" (42.02), study card with a check on "überprüft" (42.92).
import { frame, cam, label, pop, prog, eio, check, T, K, f1 } from './lib.js';
import { chicago } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 41.26, 44.0));
  let s = chicago(t, { dx: -60 + 120 * p });
  s = cam(s, 540, 900, 1.04 + .04 * p);
  s += label('CHICAGO', 540, 300, 140, { p: pop(t, 42.02, .45) });
  const c = pop(t, 42.92, .4);
  if (c > 0) s += `<g transform="translate(540 1000) scale(${f1(c * 1000) / 1000})"><rect x="-230" y="-110" width="460" height="220" rx="24" fill="#fff" stroke="${K.ink}" stroke-width="7"/>${T(-40, 30, 'STUDIE', 64, { fill: K.txt })}<circle cx="150" cy="8" r="52" fill="#e3f3e8" stroke="${K.ink}" stroke-width="5"/>${check(150, 10, 1.3, K.green, prog(t, 43.1, 43.5))}</g>`;
  return frame(s);
}
