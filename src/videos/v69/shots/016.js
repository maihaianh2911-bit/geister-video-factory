// 51.64–54.18: don't jump while waiting — the man bends his knees to jump; a red NO-sign crosses it on "nicht"
import { K, DEFS, cabin, bust, light, crossOut, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const crouch = eio(prog(t, 51.7, 52.4)) * (1 - eio(prog(t, 53.4, 54.0)));
  const x = eout(prog(t, 52.8, 53.3));
  const y0 = 860 + 70 * crouch;
  const legs = `<path d="M 500 ${f1(y0 + 420)} L ${f1(470 - 30 * crouch)} ${f1(y0 + 560)} L 480 1500 M 580 ${f1(y0 + 420)} L ${f1(610 + 30 * crouch)} ${f1(y0 + 560)} L 600 1500" fill="none" stroke="${K.ink}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/><path d="M 500 ${f1(y0 + 420)} L ${f1(470 - 30 * crouch)} ${f1(y0 + 560)} L 480 1500 M 580 ${f1(y0 + 420)} L ${f1(610 + 30 * crouch)} ${f1(y0 + 560)} L 600 1500" fill="none" stroke="#3A4048" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>`;
  const sc = `${cabin(t, { lit: 0 })}${light(540, 1000, 560, 1)}${legs}${bust('man', 540, y0, 1.15, { look: .2, lookY: -.6, brow: .7, mouth: 'flat', aL: [[400, y0 + 200], [420, y0 + 340]], aR: [[680, y0 + 200], [660, y0 + 340]] })}`;
  return `${DEFS}${cam(sc, 1.0, 540, 1000)}${crossOut(540, 900, 380, x)}`;
}
