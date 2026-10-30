// 39.04–41.44: inside the theatre — the patient sits in the chair, nervous; Morton waits with the inhaler; a dashed ring marks the neck ("am Hals" 41.0).
import { K, DEFS, inhaler, cam, prog, eio, eout, f1 } from './lib.js';
import { theatre } from './t46.js';
export default function renderShot(t) {
  const look = Math.sin(prog(t, 39.3, 40.6) * Math.PI * 2), r = eout(prog(t, 40.95, 41.3));
  const C = 2 * Math.PI * 90;
  const ring = r > 0 ? `<ellipse cx="540" cy="862" rx="100" ry="50" fill="none" stroke="${K.orange}" stroke-width="9" stroke-dasharray="24 16" stroke-dashoffset="${f1(C * (1 - r))}"/>` : '';
  const sc = theatre(t, { lean: .3, pt: { face: { look: look * .8, lookY: -.2, brow: .7, eyes: 'open', mouth: 'down' } },
    morton: { x: 220, look: .9, aL: [[150, 950], [250, 1010]], aR: [[320, 920], [380, 980]], inh: inhaler(330, 1000, .55, 0, .3, t) }, over: ring });
  return `${DEFS}${cam(sc, 1.3, 540, 1050)}`;
}
