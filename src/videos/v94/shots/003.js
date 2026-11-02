// L1a 5.64–7.84: street, one week later: the backpack is huge (5 stones), du walks bent and slow, stops on "gehen" (7.04).
import { K, frame, person, cam, shadow, label, pop, prog, eio, lerp } from './lib.js';
import { street } from './sets.js';
import { GY, packOf } from './base.js';
export default function renderShot(t) {
  const walking = t < 7.04;
  const x = lerp(600, 680, eio(prog(t, 5.64, 7.04)));
  let s = street(t, { dx: -40 * prog(t, 5.64, 7.84) });
  s += shadow(x, GY, 200) + person('du', x, GY, .98, { t, pack: packOf(5), hunch: walking ? .85 : 1, walk: walking ? (t - 5.64) * .55 : undefined, brows: 'strain', mouth: walking ? 'wavy' : 'o', look: [8, 10], sweat: 1, drops: [7.04] });
  s += `<rect x="-60" y="1720" width="1200" height="260" fill="#3e3d45" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1720" width="1200" height="24" fill="#5b5a62"/>`;
  s += `<g transform="translate(860 1720)"><rect x="-6" y="-210" width="12" height="210" fill="#2a2a30"/><rect x="-60" y="-260" width="120" height="70" rx="10" fill="#2e7d4f" stroke="${K.ink}" stroke-width="5"/><path d="M -30 -225 H 30 M 14 -240 L 30 -225 L 14 -210" stroke="#fff" stroke-width="7" fill="none"/></g>`;
  s = cam(s, 540, 1150, 1.02 + .06 * eio(prog(t, 5.64, 7.84)));
  s += label('NACH 1 WOCHE', 540, 250, 96, { p: pop(t, 5.64, .45) });
  return frame(s);
}
