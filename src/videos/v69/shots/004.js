// 9.42–11.44: children start to cry — close on the child in the yellow raincoat crying; the woman pulls her close
import { K, DEFS, cabin, bust, light, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const cry = eout(prog(t, 10.2, 10.6));
  const hug = eio(prog(t, 10.6, 11.3));
  const sob = Math.sin(t * 16) * 4 * cry;
  const sc = `${cabin(t, { lit: 0 })}${light(520, 900, 520, 1)}
    ${bust('wom', 360, 860, 1.35, { look: .7, lookY: .5, brow: .9, mouth: 'flat', aR: [[lerp(470, 520, hug), 1150], [lerp(480, 600, hug), lerp(1250, 1180, hug)]] })}
    ${bust('kid', 640, 1060 + sob, 1.5, { look: -.3, brow: 1, mouth: cry > .5 ? 'cry' : 'down', tears: cry, closed: cry > .5 })}`;
  return `${DEFS}${cam(sc, 1.05, 540, 1000)}`;
}
