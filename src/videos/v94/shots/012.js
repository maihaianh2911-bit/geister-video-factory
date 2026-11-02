// L6 27.72–31.40: DONNERSTAG, warm café: two friends laugh at the table; du (bag on his back) stares blankly; the bun friend waves at him on "nicht richtig da" (29.98).
import { K, frame, person, cam, shadow, mug, dayCard, prog, eio } from './lib.js';
import { cafe } from './sets.js';
import { packOf } from './base.js';
export default function renderShot(t) {
  let s = cafe(t);
  const laugh = Math.sin(t * 7) > -.2;
  const wave = t >= 29.98 ? eio(prog(t, 29.98, 30.3)) : 0;
  s += person('bun', 990, 1600, .88, { t, seed: 5, eyes: laugh ? 'happy' : 'n', mouth: 'grin', look: [-16, 0], headTilt: -Math.sin(t * 7) * 4 });
  s += person('du', 430, 1700, 1, { t, seed: 9, pack: packOf(5), hunch: .45, eyes: 'blank', brows: 'none', mouth: 'flat', look: [0, 0], blink: false });
  s += person('cap', 770, 1680, .96, { t, seed: 3, eyes: wave ? 'n' : (laugh ? 'happy' : 'n'), mouth: wave ? 'small' : 'grin', look: [-16, 0], brows: wave ? 'up' : 'none', headTilt: wave ? 0 : Math.sin(t * 7) * 4, armL: wave ? [-300 + Math.sin(t * 14) * 30, -760] : [-170, -380], elbowL: wave ? [-260, -560] : [-220, -300] });
  // café table (sharp foreground) — they sit behind it
  s += `<rect x="-60" y="1400" width="1200" height="700" rx="20" fill="#5a3a28" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1400" width="1200" height="30" fill="#7a5038"/>`;
  s += mug(560, 1410, 1, '#f2efe8', t, false) + mug(860, 1410, .9, '#7fa7cf', t) + mug(1010, 1410, 1, '#f2efe8', t);
  s += `<path d="M 660 1410 l 40 -60 l 40 60 z" fill="#e8b85c" stroke="${K.ink}" stroke-width="4"/><ellipse cx="700" cy="1412" rx="70" ry="10" fill="#f2efe8" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s, 540, 1250, 1.08 + .07 * eio(prog(t, 27.72, 31.4)), -40 * prog(t, 27.72, 31.4), 0);
  s += dayCard(t, 27.72, 'DONNERSTAG', { size: 96 });
  return frame(s);
}
