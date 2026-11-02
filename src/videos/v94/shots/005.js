// L2a 10.28–13.60: MONTAG, evening home desk: laptop faces the viewer with an empty e-mail "An: Vermieter"; chip "5 MIN" on "fünf" (12.68).
import { K, frame, person, cam, shadow, laptop, emailUI, chip, mug, dayCard, pop, prog, eio, fade } from './lib.js';
import { room } from './sets.js';
import { DX, GY } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 10 });
  s += person('du', 600, 1480, 1.08, { t, pack: { n: 0, labels: [] }, look: [0, 14], brows: 'calm', mouth: 'flat', armL: [-90, -150], armR: [120, -150], elbowL: [-200, -300], elbowR: [240, -300] });
  // desk in front (sharp foreground)
  s += `<rect x="-60" y="1330" width="1200" height="700" fill="#8a5a3c" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1330" width="1200" height="30" fill="#a26c4a"/>`;
  s += laptop(560, 1335, 1.25, { inner: emailUI({ lines: 0, cursor: (t * 2 | 0) % 2 === 0, cursorX: 0 }) });
  s += `<g transform="translate(120 1330)"><path d="M -20 0 L 20 0 L 10 -200 L -10 -200 Z" fill="#3a3a40"/><path d="M -10 -200 L 60 -280" stroke="#3a3a40" stroke-width="16"/><path d="M 20 -330 L 120 -260 L 70 -210 Z" fill="#e8b85c" stroke="${K.ink}" stroke-width="4"/></g>`;
  s += mug(960, 1330, 1, '#e8b85c', t);
  s += `<path d="M 150 1330 L 150 1290 L 330 1290 L 330 1330" fill="#f2efe8" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s, 540, 1050, 1.0 + .07 * eio(prog(t, 10.28, 13.6)), 0, -20 * prog(t, 10.28, 13.6));
  s += dayCard(t, 10.28, 'MONTAG');
  s += `<g transform="translate(870 760) scale(${Math.max(.01, pop(t, 12.68, .4))})">${chip(0, 0, '5 MIN', { size: 54, bg: K.yellow })}</g>`;
  return frame(s);
}
