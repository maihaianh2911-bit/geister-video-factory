// L2 7.86–11.54 MONTAG, office: du walks in, trips over a cable on "stolperst" and falls flat in front of everyone.
import { K, frame, bg, shadow, person, dayCard, desk, monitor, cam, prog, eio, ein, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  // colleagues at desks in the back
  s += person('gl', 180, 1130, .62, { t, seed: 5, look: [8, 0], mouth: 'flat' }) + desk(180, 1020, 260) + monitor(180, 1020);
  s += person('cap', 900, 1130, .62, { t, seed: 4, look: [-8, 0], mouth: 'flat' }) + desk(900, 1020, 260) + monitor(900, 1020);
  // cable across the floor
  s += `<path d="M -20 1310 C 200 1290 380 1350 520 1318 S 800 1300 1100 1330" stroke="#1d1d1d" stroke-width="10" fill="none"/>`;
  const walk = prog(t, 7.9, 8.72);
  const fall = ein(prog(t, 8.72, 9.25));
  const x = lerp(-120, 300, walk) + 50 * fall;
  const ang = 84 * fall;
  s += shadow(x + 120 * fall, 1330, 110 + 60 * fall, 1);
  s += person('du', x, 1330, 1, { t, seed: 1, hear: .6, walk: fall < .02 && walk < 1 ? t * 2.4 : undefined, tilt: ang,
    eyes: t > 8.8 ? 'wide' : 'n', mouth: t > 8.8 ? 'o' : 'smile', armL: fall > .1 ? [-90, -300 - 60 * fall] : null, armR: fall > .1 ? [90, -300 - 60 * fall] : null, look: [10, 0] });
  // dust puff on landing
  const d = prog(t, 9.25, 9.9);
  if (d > 0 && d < 1) for (let i = 0; i < 5; i++) s += `<circle cx="${f1(x + 260 + (i - 2) * 70 * (.5 + d))}" cy="${f1(1320 - 30 * d - (i % 2) * 20)}" r="${f1(22 * (1 - d) + 6)}" fill="#e9e2d6" opacity="${f1((1 - d) * 80) / 100}"/>`;
  s += dayCard(t, 7.86, 'MONTAG');
  return frame(cam(s, 540, 1100, 1 + .04 * eio(prog(t, 9.2, 11.5))));
}
