// 41.44–43.24: Morton holds the inhaler's mouthpiece to the patient's mouth; cyan vapour flows; the eyes close after "einatmen" (42.06).
import { K, DEFS, inhaler, vapour, cam, prog, eio, lerp, f1 } from './lib.js';
import { theatre } from './t46.js';
export default function renderShot(t) {
  const come = eio(prog(t, 41.44, 41.9)), breathe = prog(t, 41.9, 43.2), sleep = eio(prog(t, 42.1, 42.9));
  // patient's mouth ≈ (540, 852); mouthpiece end of the inhaler sits at globe + (215*s, 22*s)
  const s = .6, gx = lerp(300, 540 - 215 * s - 10, come), gy = lerp(1000, 852 - 22 * s, come);
  const inh = inhaler(gx, gy, s, 0, .4 + .6 * breathe, t);
  const v = vapour(gx + 40, gy, 530, 850, come * (1 - .5 * sleep), t);
  const sc = theatre(t, { lean: .5, noPt: false, pt: { face: { eyes: sleep > .6 ? 'closed' : sleep > .2 ? 'half' : 'open', look: -.5, lookY: .1, brow: lerp(.6, 0, sleep), mouth: 'o', tilt: lerp(0, -8, sleep) } },
    morton: { x: 300, look: .9, lookY: -.1, aL: [[lerp(230, 250, come), 930], [gx - 40, gy + 70]], aR: [[lerp(390, 380, come), 900], [gx + 40, gy + 40]], inh: '' }, over: inh + v });
  return `${DEFS}${cam(sc, 1.7, 470, 900, 70, 40)}`;
}
