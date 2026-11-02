// L6c 30.68–32.74: dark room, the third cloud with a huge yellow "?" appears and swells to giant size on "riesig" (31.82); du shrinks under it, the other two clouds pushed aside.
import { K, frame, cam, prog, eio, eout, person, shadow, back } from './lib.js';
import { room } from './sets.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 0, light: .3 });
  const g = eio(prog(t, 31.06, 32.3));
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity="${(.35 + .2 * g).toFixed(2)}"/>` + gloom(540, 900, 700, 700, .5 + .3 * g, 'i');
  s += shadow(540, 1640);
  s += person('du', 540, 1640, 1, { t, seed: 1, look: [0, -14], brows: 'worried', mouth: 'o', eyes: 'wide', hunch: .3 + .5 * g, sx: 1, headDy: 30 * g, sweat: g });
  s += cloud(220 - 40 * g, 520 + 260 * g, 380 - 60 * g, { t, seed: 11, dark: .9, lines: ['Ich verliere', 'meinen Job.'], size: 38 });
  s += cloud(860 + 30 * g, 460 + 280 * g, 380 - 60 * g, { t, seed: 21, dark: .9, lines: ['Ist sie sauer', 'auf mich?'], size: 38 });
  const p = eout(prog(t, 30.75, 31.1));
  s += cloud(540, 470 + 40 * g, 360 + 520 * g, { t, seed: 31, dark: .8 + .2 * g, p: p, q: true });
  return frame(cam(s, 540, 950, 1.0 + .07 * eio(prog(t, 30.68, 32.74))));
}
