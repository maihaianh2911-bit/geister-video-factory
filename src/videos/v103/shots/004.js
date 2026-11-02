// L2a 9.82–12.58: wide shot of the flat's entrance in the evening (coats, mirror, dresser, doormat, warm lamp), then a push-in;
// du walks in from the left; on "klingelt" (11.52) the doorbell vibrates and du stops and turns to the door.
import { K, frame, cam, prog, eio, person, shadow, T, clock } from './lib.js';
import { entry, bell } from './sets3.js';
export default function renderShot(t) {
  let s = entry(t, { open: 0 });
  s += clock(470, 560, 40, 20, 15);
  const ring = t > 11.52 ? Math.max(0, 1 - (t - 11.52) / .9) * (0.6 + .4 * Math.abs(Math.sin((t - 11.52) * 20))) : 0;
  s += bell(980, 760, ring);
  const wp = eio(prog(t, 9.9, 11.4));
  const x = 120 + 200 * wp;
  s += shadow(x, 1640);
  const turned = t > 11.6;
  s += person('du', x, 1640, 1, { t, seed: 1, walk: wp < 1 ? (t - 9.9) * 1.6 : undefined, look: turned ? [16, -6] : [10, 4], brows: turned ? 'up' : 'calm', mouth: turned ? 'o' : 'small', drops: [11.55] });
  return frame(cam(s, 600, 1000, 1.0 + .08 * eio(prog(t, 10.3, 12.58))));
}
