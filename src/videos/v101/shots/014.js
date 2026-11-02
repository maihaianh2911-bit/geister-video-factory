// L8a 33.88–35.94: card DIENSTAG; sunny street; du walks from the left, stops on "Seltsames" (35.21) and looks around, surprised.
import { K, frame, cam, prog, eio, pop, label, person, shadow, lerp } from './lib.js';
import { street } from './sets2.js';
export default function renderShot(t) {
  let s = street(t);
  const w = eio(prog(t, 33.9, 35.2)), x = lerp(250, 540, w), stop = t >= 35.2;
  const lk = stop ? [Math.sin((t - 35.2) * 5) * 16, -4] : [12, 0];
  s += shadow(x, 1640);
  s += person('du', x, 1640, 1, { t, seed: 1, look: lk, brows: stop ? 'up' : 'calm', mouth: stop ? 'o' : 'small', walk: stop ? undefined : t * 1.6 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 33.88, 35.94)));
  s += label('DIENSTAG', 540, 250, 120, { p: pop(t, 33.95, .45) });
  return frame(s);
}
