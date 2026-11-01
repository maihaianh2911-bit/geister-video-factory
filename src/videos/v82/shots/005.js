// 16.9–20.72 "trotzdem weißt du noch alles": a golden memory cloud fills with a whole adult life's memories
import { K, kid, glow, sparks, cloudPath, icon, chip, fade, pop, prog, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c = eout(prog(t, 17.3, 17.9));
  let s = `<rect width="1080" height="1920" fill="${K.dusk}"/><circle cx="540" cy="700" r="700" fill="#5a4d82"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#3b3259"/>`;
  s += glow(540, 600, 360 * c, K.gold, .5);
  if (c > 0) {
    s += `<path d="${cloudPath(540, 600, 400 * c, 260 * c, 11)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="7"/>`;
    s += `<circle cx="560" cy="${f1(lerp(700, 900, c))}" r="${f1(22 * c)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="5"/><circle cx="548" cy="${f1(lerp(720, 950, c))}" r="${f1(13 * c)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="4"/>`;
  }
  const ic = [['book', 330, 560, 18.06], ['cap', 480, 470, 18.5], ['car', 650, 480, 18.92], ['laptop', 780, 600, 19.3], ['key', 400, 700, 19.5], ['heart', 580, 640, 19.82], ['plane', 720, 740, 20.0]];
  ic.forEach(([n, x, y, t0]) => { s += icon(n, x, y, pop(t, t0), fade(t, t0, .2)); });
  s += sparks(t, 540, 600, 460, 12, 11, c);
  s += kid(540, 1330, .95, { aL: [12, 6], aR: [12, 6], mouth: t > 19 ? 'smile' : 'o', brows: 'up', look: [0, -12] });
  s += chip(540, 230, 'ALLES NOCH IM KOPF', { a: fade(t, 19.82), sc: pop(t, 19.82), bg: K.ol, size: 42 });
  return s;
}
