// 31.12–33.22: close-up — the shell is gone ("aufgelöst"); a pale egg in its membrane lies in the vinegar
import { K, prog, eio, lerp } from './lib.js';
import { closeBG, glass, egg, rising, CGX, CGY, CS, EY } from './sets.js';
export default function renderShot(t) {
  const sh = lerp(.45, 0, eio(prog(t, 31.2, 32.1)));
  const inner = egg(0, EY, 1, { id: 'e13', shell: sh, w: 2.4 }) + rising(0, EY, 48, 60, -170, t, 31, { n: Math.round(8 * sh + 1), speed: 70, r: 3 });
  return `${closeBG()}${glass(CGX, CGY, CS, { id: 'g13', level: .78, inner })}`;
}
