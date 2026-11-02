// L4a 17.10–19.25: DIENSTAG, close-up: du's hand holds the phone (contact "Zahnarzt"), the wall clock behind ticks to 17:59.
import { K, frame, cam, clock, phone, pool, T, dayCard, prog, eio } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', strong: true });
  const mm = 57 + 2 * eio(prog(t, 17.6, 19.0));
  s += pool(780, 640, 260, 260, '#a9c8ff', .25) + clock(780, 640, 150, 17, mm, { hand: K.red });
  const pulse = t > 18.4 ? .5 + .5 * Math.sin((t - 18.4) * 9) : 0;
  const inner = `<rect x="-58" y="-112" width="116" height="222" rx="10" fill="#f4f6fa"/><circle cx="0" cy="-58" r="28" fill="#9fb6d6"/><circle cx="0" cy="-66" r="11" fill="#fff"/><path d="M -18 -38 C -14 -52 14 -52 18 -38" fill="#fff"/>` +
    T(0, -6, 'Zahnarzt', 19, { fill: K.txt }) + T(0, 14, 'Dr. Weber', 13, { fill: '#66707e', w: 700 }) +
    `<circle cx="0" cy="66" r="${24 + pulse * 4}" fill="${K.green}"/><path d="M -10 58 q 4 -6 8 -2 l 6 6 q 4 4 -2 8 q 8 10 14 6" stroke="#fff" stroke-width="5" fill="none"/>`;
  // arm from the bottom edge holding the phone
  const by = 1180 + Math.sin(t * 1.5) * 8;
  s += `<path d="M 260 1950 Q 300 1500 420 ${by + 120}" stroke="${K.ink}" stroke-width="150" fill="none" stroke-linecap="round"/><path d="M 260 1950 Q 300 1500 420 ${by + 120}" stroke="${K.du}" stroke-width="130" fill="none" stroke-linecap="round"/>`;
  s += phone(440, by - 80, 2.6, -6, '#f4f6fa', inner);
  s += `<circle cx="${560 - pulse * 4}" cy="${by + 150}" r="54" fill="${K.ink}"/><circle cx="350" cy="${by + 130}" r="60" fill="${K.ink}"/>`;
  s = cam(s, 540, 900, 1 + .06 * eio(prog(t, 17.1, 19.25)), 20 * prog(t, 17.1, 19.25), 0);
  s += dayCard(t, 17.1, 'DIENSTAG');
  return frame(s);
}
