// L1b 7.60–10.24: close-up: the red speaker's waves curl back onto du's own head; label "SO HART" on "hart" (8.34), "… MIT DIR" on "dir" (9.58).
import { K, frame, cam, label, f1, pop, prog, eio } from './lib.js';
import { room } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', strong: true });
  const o = { t, eyes: 'tired', brows: 'sad', mouth: 'frown', look: [14, -4], headTilt: 4 };
  s += duSp(430, 2050, 1.5, o, { talk: 1 });
  const [sx, sy] = spPos(430, 2050, 1.5, o);
  // curved arrows from the speaker back to her head
  for (let i = 0; i < 3; i++) {
    const ph = ((t * .9 + i / 3) % 1);
    s += `<path d="M ${sx - 40} ${sy - 140} Q ${sx - 160} ${sy - 360 + i * 20} ${430 - 40} ${f1(sy - 260)}" stroke="#e04a3f" stroke-width="12" fill="none" stroke-dasharray="30 26" stroke-dashoffset="${f1(-ph * 112)}" stroke-linecap="round" opacity="${f1(.4 + .2 * i)}"/>`;
  }
  s = cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 7.6, 10.24)));
  s += label('SO HART', 540, 250, 120, { fill: '#ff6a5a', p: pop(t, 8.34, .4) });
  s += label('… WIE MIT DIR', 540, 380, 80, { fill: '#fff', p: pop(t, 9.58, .4) });
  return frame(s);
}
