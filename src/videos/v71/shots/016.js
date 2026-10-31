// 39.9–41.78: you drink another coffee — the first mug stands empty, you lift the second and sip ("Kaffee" 40.84)
import { K, BG, bust, mug, table, sipMotion, elbow, shoulders, prog, lerp } from './lib.js';
export default function renderShot(t) {
  const [, shR] = shoulders(480, 1000, 1.3);
  const m = sipMotion(t, 480, 1000, 1.3, 760, 1330, [660, 1290], 39.95, 40.35, 40.84, 1e9, 1e9, .8, { t });
  const du = bust('du', 480, 1000, 1.3, { look: m.up > .6 ? .2 : .7, lookY: m.up > .6 ? .3 : .6, tired: 1, lid: m.sip ? .8 : .5, mouth: m.sip ? 'sip' : 'flat',
    aR: [elbow(shR, m.hand, -70), m.hand], heldR: m.up > 0 ? m.mug : '', aL: [[330, 1210], [380, 1300]] });
  return `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>${table(1300, '#DDE3E8', K.steelD)}${mug(170, 1350, .7, { steam: 0, full: 0 })}${m.up > 0 ? '' : m.mug}${du}`;
}
