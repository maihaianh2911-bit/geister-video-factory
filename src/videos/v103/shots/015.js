// L10b 47.98–52.24: same graph; the camera pans right to "IM RÜCKBLICK": the red GETAN line keeps falling (48.0–49.6) while the blue
// NICHT GETAN line starts low and climbs above it (49.4–51.5); chip NICHT GETAN pops on "nicht getan" (51.04).
import { K, frame, cam, prog, eio, pop, label, chip, lerp } from './lib.js';
import { voidRoom2, graph, G, yNicht } from './sets3.js';
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#2c3346', bot: '#3d4258' });
  const a = .38 + .62 * eio(prog(t, 48.0, 49.6));
  const b = eio(prog(t, 48.6, 51.4));
  s += graph(t, a, b, { lab1: .5, lab2: .35 + .65 * eio(prog(t, 48.2, 48.7)) });
  const cp = pop(t, 51.04, .4);
  if (cp > 0) s += `<g opacity="${Math.min(1, cp)}">${chip(720, yNicht(1) - 70, 'NICHT GETAN', { size: 40, bg: '#dcecf7', fill: '#1f5f8f' })}</g>`;
  const pan = eio(prog(t, 48.0, 50.0));
  s = cam(s, lerp(420, 640, pan), 880, 1.16 - .1 * pan);
  s += label('IM RÜCKBLICK', 540, 250, 92, { p: pop(t, 48.32, .45) });
  return frame(s);
}
