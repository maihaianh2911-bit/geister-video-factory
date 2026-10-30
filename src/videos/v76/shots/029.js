// 52.06–54.22: the public demonstration — wide theatre; the audience rises to look ("öffentliche" 53.0) while Warren gestures to the awake patient.
import { DEFS, cam, prog, eio, lerp } from './lib.js';
import { theatre } from './t46.js';
import { bandage } from './026.js';
export default function renderShot(t) {
  const st = eio(prog(t, 52.7, 53.3)), g = eio(prog(t, 52.3, 52.8));
  const sc = theatre(t, { lean: 1, stand: st, pt: { neck: bandage, face: { t, eyes: 'open', look: .2, lookY: -.6, mouth: 'smile' } },
    warren: { x: 830, look: .2, lookY: -.6, brow: 0, mouth: 'smile', aL: [[lerp(740, 700, g), lerp(910, 830, g)], [lerp(750, 640, g), lerp(1040, 760, g)]] },
    morton: { x: 230, look: .5, lookY: -.5, mouth: 'smile', aL: [[160, 950], [260, 1010]], aR: [[320, 920], [370, 990]] } });
  return `${DEFS}${cam(sc, lerp(1.0, 1.06, prog(t, 52.06, 54.22)), 540, 900)}`;
}
