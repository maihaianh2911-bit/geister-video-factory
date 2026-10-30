// 73.38–77.1: that's no reason to keep spoiled bread ("Brot" 74.94) — Camembert gets a tick, the mouldy slice a red cross and drops into the bin
import { K, DEFS, BG, slice, tick, crossOut, cam, prog, eio, ein, lerp, f1 } from './lib.js';
import { camembert } from './024.js';
export default function renderShot(t) {
  const a = eio(prog(t, 73.5, 73.9)), b = eio(prog(t, 74.8, 75.2)), f = ein(prog(t, 75.6, 76.3)), lid = eio(prog(t, 76.3, 76.7));
  const bin = `<rect x="590" y="1000" width="320" height="300" rx="30" fill="${K.tealD}" stroke="${K.ink}" stroke-width="5"/><g transform="rotate(${f1(lerp(-70, 0, lid))} 590 1000)"><rect x="580" y="970" width="340" height="40" rx="14" fill="${K.teal}" stroke="${K.ink}" stroke-width="5"/></g>`;
  const br = f >= 1 ? '' : slice(750, lerp(640, 1080, f), .9, { id: 's26', spot: 1, at: [-60, 40] });
  const sc = `${BG(K.room)}${camembert(300, 760, .7)}${tick(300, 520, 1.6, a)}${br}${crossOut(750, 640, 210, b * (1 - f))}${bin}`;
  return `${DEFS}${cam(sc, 1.0, 540, 900)}`;
}
