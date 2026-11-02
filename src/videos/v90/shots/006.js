// L5 18.52–20.86 the boss checks his watch, thinking only of "Meeting 10:00".
import { K, frame, bg, shadow, person, thought, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { dx: -100 });
  s += shadow(480, 1330);
  const lift = eio(prog(t, 18.6, 19.0));
  const watch = `<g transform="translate(${f1(60 + 10 * lift)} ${f1(-212 - 130 * lift)})"><circle r="20" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M 0 0 V -12 M 0 0 L 9 4" stroke="${K.ink}" stroke-width="3"/></g>`;
  s += person('boss', 480, 1330, 1, { t, seed: 6, look: [10, 8], mouth: 'flat', armR: [50 + 10 * lift, -212 - 130 * lift], front: watch, brows: 'mean' });
  s += thought(560, 640, 'Meeting 10:00', 500, 820, { p: pop(t, 19.92, .45), size: 52 });
  return frame(cam(s, 540, 1000, 1.03 + .04 * eio(prog(t, 18.52, 20.86))));
}
