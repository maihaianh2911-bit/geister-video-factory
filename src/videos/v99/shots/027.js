// L16a 72.36–74.6: evening, du at the desk under the warm lamp writes his worries into the notebook ("Schreib … auf" 72.36); the small worry cloud above him shrinks.
import { K, frame, cam, prog, eio, person, pool, f1 } from './lib.js';
import { room } from './sets.js';
import { cloud } from './clouds.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 10, light: .7 });
  s += pool(250, 1100, 520, 420, '#ffc46b', .45);
  const wr = Math.sin(t * 8) * 16, shrink = eio(prog(t, 72.6, 74.4));
  s += person('du', 560, 1640, 1, { t, seed: 1, look: [-6, 16], brows: 'calm', mouth: 'small', hunch: .25, armR: [-20 + wr, -300], elbowR: [180, -330], armL: [-180, -320], elbowL: [-230, -400] });
  s += cloud(560, 560, 420 - 220 * shrink, { t, seed: 11, dark: .7 - .3 * shrink });
  // sharp desk + lamp + open notebook + pen in his hand
  s += `<path d="M -60 1300 H 1140 V 2000 H -60 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1300" width="1200" height="26" fill="#a26c4a"/>`;
  s += `<path d="M 120 1300 L 190 1000 L 300 880" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M 250 820 L 380 820 L 340 930 L 270 950 Z" fill="#d9a35e" stroke="${INK}" stroke-width="6"/>`;
  s += `<g transform="translate(560 1360)"><path d="M -230 -40 L 0 -26 L 230 -40 L 250 50 L 0 62 L -250 50 Z" fill="#fbf7ea" stroke="${INK}" stroke-width="5"/><path d="M 0 -26 V 62" stroke="#c9b99a" stroke-width="6"/><g stroke="#22324d" stroke-width="5">${[0, 1, 2].map(i => `<path d="M -200 ${-10 + i * 22} H ${-60 - i * 20}"/><path d="M 30 ${-10 + i * 22} H ${f1(i === 2 ? 60 + 90 * prog(t, 72.4, 74.4) : 180)}"/>`).join('')}</g></g>`;
  s += `<g transform="translate(${f1(560 - 20 + wr)} 1340) rotate(25)"><rect x="-10" y="-150" width="20" height="130" rx="6" fill="#2f5fb5" stroke="${INK}" stroke-width="4"/><path d="M -10 -20 L 0 6 L 10 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/></g>`;
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 72.36, 74.6))));
}
