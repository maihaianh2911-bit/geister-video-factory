// L2 11.40–14.86: MONTAG. Meeting room: the colleague (glasses, bun, light blue) presents confidently, pointing at the chart;
// du watches from the right. "hält" 13.28 → she gestures; "Präsentation" 13.86 → chart line draws.
import { frame, cam, shadow, pop, prog, eio, person, dayCard, f1, K } from './lib.js';
import { meeting, meetingTable } from './sets.js';
export default function renderShot(t) {
  let s = meeting(t);
  // sharp presentation chart line drawing over the blurred screen
  const d = eio(prog(t, 13.6, 14.6));
  s += `<path d="M 360 520 L 450 440 L 540 470 L 640 360 L 760 300" stroke="#2fa59a" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="560" stroke-dashoffset="${f1(560 * (1 - d))}"/>`;
  const g = eio(prog(t, 13.2, 13.5));
  const talk = Math.sin(t * 11) > 0 ? 'talk' : 'smile';
  s += shadow(300, 1640) + person('kol', 300, 1640, 1, { t, seed: 4, look: [12, -12], brows: 'calm', mouth: talk, armR: [230 + 60 * g, -900 - 40 * g], elbowR: [250, -620], armL: [-150, -330], elbowL: [-210, -430] });
  s += shadow(790, 1660) + person('du', 790, 1660, .95, { t, seed: 9, look: [-14, -6], brows: 'up', mouth: 'soft' });
  s += meetingTable(1560);
  s = cam(s, 540, 1000, .97 + .08 * eio(prog(t, 11.4, 14.86)), 0, 0);
  s += dayCard(t, 11.4, 'MONTAG');
  return frame(s);
}
