// 26.72–28.64: a long operation is not possible — the watch's red time segment sweeps far round, then is crossed out.
import { K, DEFS, BG, watch, crossOut, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const sw = eio(prog(t, 26.72, 27.8)), x = eout(prog(t, 27.9, 28.4));
  return `${DEFS}${BG()}<ellipse cx="540" cy="860" rx="520" ry="520" fill="url(#nLamp)" opacity=".5"/>${watch(540, 860, 330, sw * 330, (t - 26.72) * 360, { arc: Math.max(1, sw * 330), arcCol: K.red })}${crossOut(540, 860, 400, x)}`;
}
