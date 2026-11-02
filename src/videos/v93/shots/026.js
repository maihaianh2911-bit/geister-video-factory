// L17 70.14–73.32 Next morning, the same train in warm early sun. Passengers stand around du; faint bubbles hover over their heads.
// On "gibt es nicht" (71.16) the bubbles vanish; on "vorstellen" (72.48) they come back as dashed outlines (imagined).
import { K, frame, cam, setTrain, trainFG, person, shadow, thought, icon, prog, eio, f1 } from './lib.js';
import { push, handPt } from './base.js';
const P = [['p3', 150, 1470, 1.15, 'cross'], ['p2', 850, 1470, 1.15, 'clock'], ['mann', 640, 1520, 1.3, 'thermo']];
export default function renderShot(t) {
  let s = setTrain(t, { morning: true });
  P.forEach(([w, x, y, k], i) => { s += shadow(x, y, 120) + person(w, x, y, k, { t, seed: i * 5 + 3, look: [i === 0 ? 6 : -6, 4], brows: 'flat', mouth: 'flat' }); });
  s += shadow(360, 1620, 170) + person('du', 360, 1620, 1.6, { t, seed: 2, armR: [70, -560], look: [6, -4], brows: 'soft', mouth: 'soft' });
  const gone = eio(prog(t, 71.0, 71.4)), back = eio(prog(t, 72.3, 72.8));
  const a = t < 72.3 ? .55 * (1 - gone) : back;
  P.forEach(([w, x, y, k, ic]) => { const hy = y - 420 * k; s += thought(x, hy - 240, [''], x, hy - 120, { p: 1, a, w: 180, h: 140, dashed: t > 72.3, fill: 'rgba(255,255,255,.85)', inner: icon[ic](x, hy - 240, 1.3) }); });
  s += trainFG(1030, { hand: handPt(360, 1620, 1.6, [70, -560]) });
  return frame(cam(s, 540, 1000, push(t, 70.14, 73.32, 1.0, 1.06)), { tint: ['#f4b45c', .06] });
}
