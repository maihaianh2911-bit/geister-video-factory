// 63.48–66.38: and if you wait until the inside is full of water? — the car has gone under; inside, the water rises past your chin to the roof ("voll Wasser")
import { K, DEFS, BG, carSide, water, label, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const fill = eio(prog(t, 64.0, 65.7));
  const y = lerp(1500, 1560, eio(prog(t, 63.48, 66.38)));
  let bub = '';
  for (let i = 0; i < 10; i++) { const ph = (t * .6 + hash(i)) % 1; bub += `<circle cx="${f1(380 + hash(i * 3) * 340)}" cy="${f1(y - 420 - ph * 700)}" r="${f1(6 + 10 * hash(i * 5))}" fill="none" stroke="${K.foam}" stroke-width="3" opacity="${f1(.6 * (1 - ph))}"/>`; }
  const sc = `${BG('#0A1A20')}<rect x="-60" y="200" width="1200" height="1800" fill="url(#eWater)"/><path d="M -60 200 H 1140" stroke="${K.waterL}" stroke-width="5"/>
    ${carSide(t, 540, y, 1.05, { tilt: 4, lights: 0, inner: .35, id: 's24c', only: ['you'], waterIn: fill, faces: { you: { look: .2, lookY: -.8, brow: 1, mouth: fill > .6 ? 'puff' : 'o', wide: 1 } } })}
    ${bub}<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity=".25"/>`;
  return `${DEFS}${sc}${label(540, 330, 'WARTEN?', eout(prog(t, 63.6, 63.9)), K.mono, 76)}`;
}
