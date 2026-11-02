// L8 32.46–36.52: ABENDS, warm living room: the phone rings (32.82), du answers a video call: best friend (bun, purple) looks sad; chip "Frist verpasst" (35.34).
import { K, frame, cam, person, head, shadow, dayCard, chip, phone, pool, prog, eio, pop, f1 } from './lib.js';
import { room, fgTable } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 15 });
  const lift = eio(prog(t, 33.0, 33.6)), ring = t > 32.82 && t < 33.4 ? Math.sin(t * 60) * 6 : 0;
  const callIn = `<rect x="-58" y="-112" width="116" height="222" rx="10" fill="#e9dff2"/>` + head('bff', 0, -10, .26, { t, eyes: 'tired', brows: 'sad', mouth: 'frown', look: [0, 6] }) + `<rect x="-58" y="80" width="116" height="30" fill="#8a5bb5"/>`;
  s += shadow(340, 1640) + duSp(340, 1640, 1.0, { t, look: [14, -6], brows: 'calm', mouth: 'small', armR: [lerpN(330, 330, lift), lerpN(-200, -560, lift)], elbowR: [320, -360] }, { hide: true });
  s += `<g transform="translate(${f1(lerpN(780, 760, lift) + ring)} ${f1(lerpN(1600, 820, lift))}) rotate(${f1(-6 + ring)})">${phone(0, 0, lerpN(.8, 2.1, lift), 0, '#e9dff2', lift > .5 ? callIn : '')}</g>`;
  s += pool(700, 820, 220, 260, '#d9b8ff', .25 * lift);
  s += fgTable(t, { mugX: 170, glass: 900 });
  s = cam(s, 540, 1100, 1.0 + .07 * eio(prog(t, 32.46, 36.52)));
  s += dayCard(t, 32.46, 'ABENDS');
  s += `<g transform="translate(760 450) scale(${Math.max(.01, pop(t, 35.34, .4))})">${chip(0, 0, 'Frist verpasst', { size: 44 })}</g>`;
  return frame(s);
}
const lerpN = (a, b, p) => a + (b - a) * p;
