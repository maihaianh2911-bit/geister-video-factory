// 43.24–45.42: the surgeon John Collins Warren steps up beside the sleeping patient; name tag on "Warren" (43.86–44.63).
import { K, DEFS, tag, cam, prog, eio, lerp } from './lib.js';
import { theatre } from './t46.js';
import { inhaler as inh46 } from './lib.js';
const mortonIdle = t => ({ x: 200, look: .8, lookY: .1, aL: [[130, 950], [230, 1010]], aR: [[300, 920], [350, 990]], inh: inh46(330, 1010, .5, 0, .3, t) });
export default function renderShot(t) {
  const w = prog(t, 43.24, 44.3), x = lerp(1180, 820, eio(w)), step = w < 1 ? w * 14 : 0;
  const a = prog(t, 43.86, 44.2), c = prog(t, 43.42, 43.7);
  const sc = theatre(t, { morton: mortonIdle(t), lean: .5, pt: { face: { eyes: 'closed', tilt: -8, mouth: 'flat' } }, warren: { x, step, look: -.8, lookY: .2, brow: .3 } });
  return `${DEFS}${cam(sc, 1.3, 540, 1050)}${tag(540, 250, 'JOHN COLLINS WARREN', a, 62, K.lamp, c > 0 ? 'CHIRURG' : '')}`;
}
