// L8b 35.94–39.9: close-up of du on the street holding a small notebook; his eyes search left and right ("suchst … nach Dingen" 36.06–37.4), then he smiles as tiny sparkles appear around him.
import { K, frame, cam, prog, eio, person, f1, op } from './lib.js';
import { street } from './sets2.js';
import { orb } from './jar.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = street(t, { strong: true });
  const sc = t < 38.2 ? Math.sin((t - 35.94) * 2.6) * 16 : 6, sm = eio(prog(t, 38.2, 38.6));
  const pad = `<g transform="translate(150 -330) rotate(-8)"><rect x="-70" y="-90" width="140" height="180" rx="10" fill="#2f6f8f" stroke="${INK}" stroke-width="5"/><rect x="-58" y="-78" width="116" height="156" rx="4" fill="#fbf7ea"/><path d="M -44 -50 H 44 M -44 -20 H 30" stroke="#9fb7d6" stroke-width="5"/></g>`;
  s += person('du', 500, 2230, 1.75, { t, seed: 1, look: [sc, -2], brows: sm > .5 ? 'calm' : 'up', mouth: sm > .5 ? 'smile' : 'small', armR: [160, -330], elbowR: [210, -300], front: pad });
  [[200, 520, 38.4], [860, 420, 38.8], [760, 760, 39.2]].forEach(([x, y, t0]) => { s += orb(x, y, 14, eio(prog(t, t0, t0 + .3)), t); });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 35.94, 39.9))));
}
