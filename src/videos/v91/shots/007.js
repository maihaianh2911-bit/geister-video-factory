// L6 21.5–27.1 MITTWOCH: du walks late into the boss's office (clock 9:40); boss (moustache, grey suit) asks why; "Verschlafen." comes out; the ready excuse "Stau auf der A3!" is struck out on "Keine Ausrede".
import { K, frame, bg, shadow, person, lie, speech, wallClock, dayCard, cam, prog, eio, eout, pop, lockAt, lockAlpha, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('boss');
  s += wallClock(540, 470, 70, 9, 40 + 2 * prog(t, 21.5, 27.1));
  const w = eout(prog(t, 21.6, 22.9));
  const dx = lerp(-120, 330, w);
  s += shadow(dx, 1360, 95) + shadow(780, 1360, 100);
  const point = eio(prog(t, 23.3, 23.6)) * (1 - eio(prog(t, 24.6, 24.9)));
  s += person('chef', 780, 1360, 1, { t, seed: 4, eyes: 'n', brows: 'mean', mouth: 'flat', look: point > .3 ? [-6, -10] : [-12, 0],
    armL: point > .02 ? [-100 - 80 * point, -330 - 150 * point] : [-40, -240], armR: [40, -240] });
  const lk = lockAt(t, 24.0, 24.3);
  s += person('du', dx, 1360, 1, { t, seed: 1, walk: w < 1 ? t * 1.8 : undefined, look: [12, -2], eyes: t > 23.4 ? 'wide' : 'n', brows: t > 23.4 ? 'sad' : null,
    mouth: lk > 0 ? 'none' : (t > 24.3 ? 'o' : 'flat'), lock: lk, lockA: lockAlpha(t, 24.3) });
  s += speech(810, 600, 'Warum so spät?', 780, 840, { p: pop(t, 22.6, .35), size: 46, a: t > 24.3 ? .5 : undefined });
  const fallY = 260 * eio(prog(t, 26.2, 26.9));
  s += lie(265, 560 + fallY, 'Stau auf der A3!', 320, 830 + fallY, { p: pop(t, 23.75, .35), strike: eio(prog(t, 25.35, 25.75)), size: 44, a: 1 - eio(prog(t, 26.4, 26.9)) });
  s += speech(320, 760, 'Verschlafen.', 330, 900, { p: pop(t, 24.32, .38), size: 56 });
  s = cam(s, 540, 1000, 1 + .05 * eio(prog(t, 21.5, 27.1)));
  s += dayCard(t, 21.5, 'MITTWOCH');
  return frame(s);
}
