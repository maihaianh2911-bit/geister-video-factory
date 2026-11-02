// L1a 0–2.98: amber living room, medium shot. du says "Ja!" (1.33) with a forced smile while the thought "Nein …" pops (2.38).
import { frame, cam, shadow, person, speech, thought, pop, prog, eio, label } from './all.js';
import { room } from './all.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 30 });
  s += shadow(400, 1640);
  const nein = t >= 2.38;
  s += person('du', 400, 1640, 1, { t, seed: 1, look: nein ? [-10, -10] : [12, 0], brows: nein ? 'worried' : 'calm', mouth: t > 1.2 ? 'grin' : 'smile', armR: t > 1.3 ? [170, -330] : null });
  s += fgTable(t, { mugX: 860, keys: 640 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 0, 2.98)), -20 * prog(t, 0, 2.98));
  s += speech(780, 640, 'Ja!', 520, 880, { p: pop(t, 1.33), size: 84 });
  s += thought(250, 330, 'Nein …', 330, 690, { p: pop(t, 2.38), size: 64 });
  return frame(s);
}
