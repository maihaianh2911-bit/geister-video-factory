// 57.24–59.54: with ether — a helper's hand brings the inhaler's mouthpiece to du's mouth; cyan vapour flows, du's eyes close ("bewusstlos" 58.54) and the face relaxes.
import { K, DEFS, BG, head, arm, inhaler, vapour, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const come = eio(prog(t, 57.24, 57.8)), sleep = eio(prog(t, 58.3, 58.9));
  // du's mouth ≈ (430, 1090); the mouthpiece end is at globe + (215, 22)·s
  const s = 1.1, gx = lerp(110, 430 - 215 * s - 10, come), gy = lerp(1250, 1090 - 22 * s, come);
  const pillow = `<path d="M -80 1250 Q 100 1170 400 1180 Q 700 1170 900 1260 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const shirt = `<path d="M 300 1420 Q 340 1250 560 1240 Q 900 1230 1160 1290 V 1420 Z" fill="${K.shirt}" stroke="${K.ink}" stroke-width="6"/>`;
  const h = head('du', 420, 960, 3.0, { t, eyes: sleep > .6 ? 'closed' : sleep > .2 ? 'half' : 'open', look: -.4, lookY: .3, brow: lerp(.6, 0, sleep), mouth: 'o', tilt: -6 });
  const a = arm([-160, 1500], [-20, 1250], [gx - 20, gy + 70], 1.3, K.shirt, { bare: true });
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="440" cy="900" rx="600" ry="600" fill="url(#nCyan)" opacity="${f1(.15 + .3 * sleep)}"/>${pillow}${shirt}${h}${vapour(gx + 60, gy, 440, 1080, come * (1 - .4 * sleep), t)}${inhaler(gx, gy, s, 0, .5 + .5 * come, t)}${a}`;
}
