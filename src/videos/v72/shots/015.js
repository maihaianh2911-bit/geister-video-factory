// 38.52–40.52: some people notice nothing ("nichts" 39.82) — you, relaxed, teal tick
import { K, DEFS, kitchen, bust, stomach, bodyWindow, tick, cam, prog, eio } from './lib.js';
export default function renderShot(t) {
  const win = bodyWindow(540, 1290, 2.2, stomach(540, 1300, .95, { mood: 'happy' }));
  const du = bust('du', 540, 1000, 1.3, { look: -.2, brow: 0, mouth: 'smile', front: win });
  return `${DEFS}${cam(`${kitchen(1500)}${du}`, 1 + .04 * eio(prog(t, 38.52, 40.52)), 540, 1000)}${tick(860, 600, 2, eio(prog(t, 39.7, 40.1)))}`;
}
