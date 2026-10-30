// 62.58–66.56: shortness of breath ("Atemnot" 62.58) or a severe allergic reaction is an emergency ("Notfall" 65.72) — you clutch your chest, red pulses, label
import { K, DEFS, kitchen, bust, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const n = eio(prog(t, 65.6, 66.0));
  const ring = [0, 1, 2].map(i => { const q = ((t * .9 + i / 3) % 1); return `<circle cx="540" cy="1080" r="${f1(160 + 340 * q)}" fill="none" stroke="${K.red}" stroke-width="10" opacity="${f1((1 - q) * .7)}"/>`; }).join('');
  const du = bust('du', 540, 1000, 1.3, { look: 0, lookY: -.4, brow: 1, wide: true, mouth: 'gasp', t, tilt: Math.sin(t * 3) * 3, aL: [[420, 1220], [520, 1110]], aR: [[680, 1220], [600, 1120]] });
  return `${DEFS}${cam(`${kitchen(1500)}${ring}${du}`, 1 + .05 * eio(prog(t, 62.58, 66.56)), 540, 1000)}${label(540, 300, 'NOTFALL', n, K.white, 70, K.red)}`;
}
