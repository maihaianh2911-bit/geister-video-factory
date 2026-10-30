// 72.08–74.0: the seven dots — a red ring circles the cluster of seven (sieben Punkte)
import { K, DEFS, BG, disc, grain, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const c = eout(prog(t, 72.2, 72.6));
  return `${DEFS}${BG(K.brownD)}${cam(disc(540, 1000, 420, { id: 'M', damage: true, cluster: c }), lerp(1.2, 1.9, eio(prog(t, 72.08, 73.6))), 553, 786)}${grain(t)}`;
}
