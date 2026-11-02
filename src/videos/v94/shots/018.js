// L11 48.22–50.68: close on du's face in bed; warm light floods in from the window on "gute" (49.16), his eyes open and brighten.
import { K, frame, cam, bagSolo, pool, prog, eio, f1 } from './lib.js';
import { bedScene } from './017.js';
import { LB } from './base.js';
export default function renderShot(t) {
  const L = eio(prog(t, 49.0, 49.7));
  let s = bedScene(t, { dawn: L, eyes: L > .5 ? 'wide' : 'tired', brows: L > .5 ? 'up' : 'worried', mouth: L > .6 ? 'small' : 'flat', look: [12 * L, -14], rimL: null });
  s += bagSolo(560, 764, .8, 5, LB, -2);
  s = cam(s, 360, 900, 1.45 + .08 * eio(prog(t, 48.22, 50.68)), 540 - 360, 860 - 900);
  s += `<path d="M 1080 0 L 1080 600 L 760 1920 L 520 1920 Z" fill="#fff1b8" opacity="${f1(.28 * L)}"/>` + pool(900, 300, 600, 500, '#ffe08a', .55 * L);
  return frame(s);
}
