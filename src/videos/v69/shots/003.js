// 7.04–9.42: a few strangers are in the cabin with you — the torch sweeps across the woman, the child and the man ("Fremde")
import { K, DEFS, cabin, bust, light, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const u = eio(prog(t, 7.1, 9.2));
  const lx = lerp(240, 820, u), ly = lerp(860, 840, u);
  const near = x => Math.max(0, 1 - Math.abs(x - lx) / 260);
  const sc = `${cabin(t, { lit: 0 })}${light(lx, ly, 420, 1)}
    ${bust('wom', 280, 980, 1.15, { look: .5, brow: .7, mouth: near(280) > .5 ? 'down' : 'flat' })}${bust('kid', 520, 1140, 1.15, { look: .2, brow: .9, mouth: 'down' })}${bust('man', 800, 960, 1.2, { look: -.5, brow: .8, mouth: 'flat' })}
    <rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity=".25"/>`;
  return `${DEFS}${sc}`;
}
