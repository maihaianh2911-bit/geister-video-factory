// L0 0–3.84: dawn; wide shot from the front door of du's house (left) over a chest-high meadow; title WAS WÄRE, WENN …;
// on "Pfad" (2.06) a faint dashed trail draws itself through the grass to the horizon; du on the doorstep looks at it.
import { K, frame, cam, prog, eio, pop, label, f1, op } from './lib.js';
import { field, house } from './common.js';
import { pathX } from './meadow.js';
export default function renderShot(t) {
  const d = eio(prog(t, 2.0, 3.3));
  let trail = '';
  if (d > 0) { let pts = ''; for (let y = 1900; y >= 1900 - 1140 * d; y -= 30) pts += `${f1(pathX(y) + 60)},${y} `; trail = `<polyline points="${pts}" fill="none" stroke="#fff3c4" stroke-width="12" stroke-dasharray="26 22" stroke-linecap="round" opacity="${op(.85)}"/>`; }
  let s = field(t, 235, 1240, .78, { mood: 'dawn', p: 0, tallBack: 1.2, tall: 1.5, frontClip: 390, house: { open: 1, w: 470, dx: 140 }, du: { look: [16, 2], brows: 'calm', mouth: 'small' } });
  s += trail;
  s = cam(s, 480, 1000, 1.0 + .07 * eio(prog(t, 0, 3.84)));
  s += label('WAS WÄRE, WENN …', 540, 250, 92, { p: pop(t, .1, .45) });
  return frame(s);
}
