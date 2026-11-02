// L1b 8.00–11.40: close-up. du (covered) holds one note up and reads it; on "wem" (9.12) a thought bubble shows
// whose notes they are: colleague (9.32), new colleague (9.50), mother (9.90).
import { frame, cam, pop, prog, eio, person, note, thought, head, K } from './lib.js';
import { room } from './sets.js';
import { COVER } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 22, mm: 0, strong: true });
  const X = 560, Y = 2230, S = 1.5;
  const up = eio(prog(t, 8.1, 8.6));
  const list = COVER.slice(1);
  s += person('du', X, Y, S, { t, look: t < 9.0 ? [-14, 6] : [-6, -12], eyes: t > 10.2 ? 'wide' : 'n', brows: t > 9.1 ? 'up' : 'calm', mouth: t > 10.2 ? 'o' : 'flat', notes: list, armL: [-120 - 110 * up, -330 - 300 * up], elbowL: [-270, -420] });
  const hx = X + (-120 - 110 * up) * S, hy = Y + (-330 - 300 * up) * S;
  s += note(hx + 40, hy - 70, 1.25 + .5 * up, -6, COVER[0].txt);
  s = cam(s, 540, 1000, 1 + .05 * eio(prog(t, 8, 11.4)));
  const inner = [['kol', 360, 9.32], ['neu', 560, 9.5], ['mama', 760, 9.9]].map(([w, x, t0]) => head(w, x, 395, .4 * Math.max(.01, pop(t, t0, .4)), { t, mouth: 'smile', eyes: 'n', seed: x })).join('');
  s += thought(560, 400, [''], 640, 700, { p: pop(t, 9.12, .4), w: 640, h: 250, inner });
  return frame(s);
}
