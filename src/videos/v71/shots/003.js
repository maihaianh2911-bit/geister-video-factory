// 4.48–7.0: kitchen, the wall clock shows seven; you reach for the coffee mug, lift it and take a sip ("Kaffee" 6.5)
import { K, kitchen, bust, clock, sipMotion, elbow, shoulders, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const [shL, shR] = shoulders(480, 1000, 1.3);
  const m = sipMotion(t, 480, 1000, 1.3, 760, 1330, [660, 1290], 4.6, 5.2, 6.2, 1e9, 1e9, .8, { t });
  const el = elbow(shR, m.hand, -70);
  const du = bust('du', 480, 1000, 1.3, { look: m.up > .6 ? .2 : lerp(.3, .8, prog(t, 4.5, 5.0)), lookY: m.up > .6 ? .3 : .6, tired: .9, lid: m.sip ? .75 : .35, mouth: m.sip ? 'sip' : 'flat',
    aR: [el, m.hand], heldR: m.up > 0 ? m.mug : '', aL: [[330, 1210], [380, 1300]] });
  return `${kitchen(1300)}${clock(850, 430, 115, 7, lerp(0, 2, prog(t, 4.48, 7)))}${m.up > 0 ? '' : m.mug}${du}`;
}
