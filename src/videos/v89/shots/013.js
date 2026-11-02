// L12 39.8–42.66 Lena comes at once: walks in, hands over chocolate ("Schokolade"), hugs du ("Umarmung").
import { K, frame, bg, shadow, person, sofa, phone, chocolate, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(540, 1340, 340);
  s += sofa(540, 1340, 660);
  const w = eout(prog(t, 39.8, 40.8));
  const lx = lerp(1080, 700, w);
  s += shadow(lx, 1340, 90);
  const give = eio(prog(t, 40.9, 41.3)), take = eio(prog(t, 41.45, 41.75)), hug = eio(prog(t, 41.9, 42.3));
  // chocolate: in Lena's hand → held out → in du's hands
  const duHand = [60, -230];
  const lenaHand = [-60 - 110 * give, -230 + 20 * give];
  let choc = '';
  // Lena-local hand → world: x = lx + hx, y = 1340 + hy ; du-local (sitting, +80) → world: x = 450 + hx, y = 1340 + hy + 80
  const lw = [lx + lenaHand[0], 1340 + lenaHand[1] - 30], dw = [450 + duHand[0], 1340 + duHand[1] + 80 - 20];
  const cw = [lerp(lw[0], dw[0], take), lerp(lw[1], dw[1], take)];
  choc = chocolate(cw[0], cw[1], .75, -10 + 10 * take);
  s += person('du', 450, 1340, 1, { t, seed: 1, sit: true, hear: .6, armR: take > .5 ? duHand : null, eyes: hug > .5 ? 'closed' : 'sad', mouth: take > .5 ? 'smile' : 'sad', look: [12, 0], headDy: 14 - 8 * take });
  s += person('lena', lx - 30 * hug, 1340, 1, { t, seed: 2, walk: w < 1 ? t * 1.9 : undefined, eyes: 'happy', mouth: 'smile', look: [-10, 2], tilt: -8 * hug,
    armL: hug > .02 ? [lerp(lenaHand[0], -300, hug), lerp(lenaHand[1], -245, hug)] : (give > .02 ? lenaHand : [-90, -230]) });
  s += choc;
  return frame(cam(s, 540, 1100, 1.08));
}
