// L5b 24.78–26.56: close-up du in the corridor: a big yawn on "müde" (25.08), then a picture thought of home – sofa + lamp – on "nach Hause" (26.0).
import { frame, cam, head, bust, pop, prog, eio, corridor, battery, duBat, picThought, K } from './all.js';
export default function renderShot(t) {
  let s = corridor(t, { strong: true });
  const yawn = t >= 25.0 && t < 25.9;
  s += bust('du', 420, 1080, 1.6, { t, seed: 1, eyes: yawn ? 'closed' : 'tired', brows: 'sad', mouth: yawn ? 'o' : 'flat', blink: false, headTilt: yawn ? -8 : -3 });
  if (yawn) s += `<ellipse cx="420" cy="${1080 + 106 * 1.6}" rx="${30 * 1.6}" ry="${f(t) * 1.6}" fill="#fff"/>`;
  const home = `<rect x="-150" y="-20" width="300" height="80" rx="22" fill="#3f5f86" stroke="${K.ink}" stroke-width="5"/><rect x="-170" y="-60" width="70" height="120" rx="20" fill="#3f5f86" stroke="${K.ink}" stroke-width="5"/><rect x="100" y="-60" width="70" height="120" rx="20" fill="#3f5f86" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="-50" width="80" height="50" rx="12" fill="#e6b55c"/><path d="M 150 -150 L 190 -150 L 180 -180 L 160 -180 Z M 170 -150 V -60" stroke="${K.ink}" stroke-width="5" fill="#ffe7a6"/><ellipse cx="170" cy="-110" rx="80" ry="60" fill="#ffd98a" opacity=".35"/>`;
  s += picThought(780, 480, 420, 300, 600, 880, home, pop(t, 26.0));
  s += battery(330, 600, .9, duBat(t).lvl, { t });
  return frame(cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 24.78, 26.56))));
}
function f(t) { return 14 + 26 * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - 25.0) / .9))); }
