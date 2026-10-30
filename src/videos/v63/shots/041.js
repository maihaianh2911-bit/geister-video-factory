// 81.08–83.7: considered the oldest concrete depiction of the sky — the disc rises against a real night sky
import { K, DEFS, disc, grain, prog, eio, eout, lerp, hash, f1 } from './lib.js';
export default function renderShot(t) {
  const r = eio(prog(t, 81.1, 82.6));
  const sky = [...Array(80)].map((_, i) => `<circle cx="${f1(hash(i + 2) * 1080)}" cy="${f1(hash(i + 19) * 1500)}" r="${f1(2 + hash(i + 5) * 3)}" fill="#E9E2C8" opacity=".55"/>`).join('');
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/>${sky}<circle cx="800" cy="300" r="60" fill="#E9E2C8"/>
    ${disc(540, lerp(1250, 860, r), 330, { id: 'P', damage: true, glow: .5 })}
    <rect x="-60" y="1380" width="1200" height="700" fill="#1A221F"/>${grain(t)}`;
}
