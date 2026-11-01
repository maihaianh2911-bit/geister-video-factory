// 52.98–55.14 turn: warm sunrise floods back, the kid stands tall — "DIESMAL BESSER" with an up arrow on "besser"
import { K, kid, chip, glow, arrow, headline, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const w = eio(prog(t, 52.98, 53.8));
  let s = `<rect width="1080" height="1920" fill="#2c3560"/><rect width="1080" height="1920" fill="#f8d9bf" opacity="${f1(w * 100) / 100}"/>`;
  s += glow(540, 1330, lerp(100, 700, w), K.gold, .7);
  s += `<circle cx="540" cy="1330" r="${f1(lerp(60, 260, w))}" fill="${K.goldL}"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#e7bf95"/>`;
  s += headline(t, 300, ['DIESMAL', 'BESSER'], 110, { t0: 53.18, mark: { word: 'BESSER', t: 54.16 } });
  s += arrow(830, 1150, 830, 700, eout(prog(t, 54.16, 54.6)), K.green, 24);
  const up = eout(prog(t, 53.4, 53.9));
  s += kid(540, 1330, lerp(.85, 1.0, up), { aL: [30, 60], aR: [30, 60], mouth: 'smile', brows: 'angry' });
  return s;
}
