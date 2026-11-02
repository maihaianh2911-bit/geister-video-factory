// L18a 73.80–76.60: Monday 8:00, daylight: du (no backpack) types the e-mail to the landlord; a stopwatch at the top runs.
import { K, frame, person, cam, laptop, emailUI, chip, mug, T, prog, eio, f1 } from './lib.js';
import { room } from './sets.js';
export const watch = (t) => { const sec = 240 * Math.min(1, (t - 73.8) / (77.88 - 73.8)); return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`; };
export default function renderShot(t) {
  let s = room(t, { mood: 'day', hh: 8, mm: 0 });
  const ty = Math.sin(t * 18) * 8;
  s += person('du', 600, 1480, 1.08, { t, look: [0, 14], brows: 'calm', mouth: 'small', armL: [-90, -150 + ty], armR: [120, -150 - ty], elbowL: [-200, -300], elbowR: [240, -300] });
  s += `<rect x="-60" y="1330" width="1200" height="700" fill="#8a5a3c" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1330" width="1200" height="30" fill="#a26c4a"/>`;
  s += laptop(560, 1335, 1.25, { inner: emailUI({ lines: 3 * prog(t, 73.9, 76.4) }) });
  s += mug(960, 1330, 1, '#e8b85c', t);
  s = cam(s, 540, 1050, 1.04 + .06 * eio(prog(t, 73.8, 76.6)));
  s += `<g transform="translate(540 300)"><circle cx="0" cy="0" r="120" fill="#fff" stroke="${K.ink}" stroke-width="8"/><rect x="-22" y="-160" width="44" height="40" rx="8" fill="${K.ink}"/><path d="M 0 0 L ${f1(90 * Math.sin((t - 73.8) * 3))} ${f1(-90 * Math.cos((t - 73.8) * 3))}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>${T(0, 70, watch(t), 44, { fill: K.txt })}</g>`;
  s += `<g transform="translate(860 300)">${chip(0, 0, 'MONTAG 8:00', { size: 36, bg: K.yellow })}</g>`;
  return frame(s);
}
