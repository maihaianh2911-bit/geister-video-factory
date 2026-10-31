// 7.0–9.28: closer — you lower the mug, smile and feel awake enough: the WACH bar fills ("ausreichend wach" 7.98–8.58)
import { K, kitchen, bust, heldMug, elbow, shoulders, bar, tick, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 7.0, 7.6));
  const s = .8, bx = 540, by = 1100, bs = 1.5;
  const mouth = [bx + 20 * bs, by - 92 * bs + 30 * bs], rr = -25 * Math.PI / 180, tlx = -75 * s, tly = -140 * s;
  const drink = [mouth[0] - (tlx * Math.cos(rr) - tly * Math.sin(rr)), mouth[1] - (tlx * Math.sin(rr) + tly * Math.cos(rr))];
  const { mug, hand } = heldMug(lerp(drink[0], 700, d), lerp(drink[1], 1290, d), lerp(-25, 0, d), s, { t });
  const [, shR] = shoulders(bx, by, bs);
  const f = eio(prog(t, 7.6, 8.58));
  const du = bust('du', bx, by, bs, { look: lerp(.2, -.2, d), lookY: lerp(.3, -.4, d), tired: .8, lid: lerp(.7, .25, d), mouth: t > 7.3 ? 'smile' : 'sip', brow: lerp(0, .5, f),
    aR: [elbow(shR, hand, -60), hand], heldR: mug, aL: [[350, 1330], [400, 1420]] });
  return `${cam(`${kitchen(1330)}${du}`, 1.0, 540, 1000)}${bar(140, 330, 800, 96, .9 * f, K.teal, 'WACH', { sz: 60 })}${tick(880, 378, .7, prog(t, 8.58, 8.9), K.tealD)}`;
}
