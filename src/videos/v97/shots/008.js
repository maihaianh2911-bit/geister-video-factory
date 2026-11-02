// L4a 20.50–23.30: MITTAGS. Open office: the new colleague (curly, mustard) patiently points at du's screen; du, hand on head, is lost.
import { frame, cam, shadow, pop, prog, eio, person, dayCard, f1, armW } from './lib.js';
import { openOffice, desk, programUI } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { hh: 12, mm: 30 });
  const pt = eio(prog(t, 21.9, 22.3));
  const talk = t > 21.0 && Math.sin(t * 10) > 0 ? 'talk' : 'smile';
  s += person('neu', 790, 1660, 1, { t, seed: 2, look: [-14, 12], brows: 'calm', mouth: talk, armL: [-150, -480], elbowL: [-170, -400] });
  s += person('du', 300, 1660, 1, { t, seed: 6, look: [14, 12], brows: 'worried', mouth: 'wavy', armL: [-125, -835], elbowL: [-300, -690], notes: duNotes(t) });
  const cx = f1(-40 + 60 * Math.sin(t * 1.3)), cy = f1(-200 + 30 * Math.cos(t * 1.7));
  s += desk(t, { y: 1400, mx: 540, inner: programUI({ cursor: [cx, cy] }), notes: true });
  s += armW(690, 1150, 700 - 40 * pt, 1240, 640 - 60 * pt, 1220 - 30 * pt, '#d9a62e');
  s = cam(s, 540, 1100, 1 + .07 * eio(prog(t, 20.5, 23.3)));
  s += dayCard(t, 20.5, 'MITTAGS');
  return frame(s);
}
