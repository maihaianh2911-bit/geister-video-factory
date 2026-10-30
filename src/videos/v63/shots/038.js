// 74.0–75.68: the Pleiades — the same seven-star group in the night sky above the disc
import { K, DEFS, disc, DISC, grain, prog, eout, lerp, hash, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eout(prog(t, 74.0, 74.5)), lnk = eout(prog(t, 74.5, 75.2));
  const sky = [...Array(60)].map((_, i) => `<circle cx="${f1(hash(i) * 1080)}" cy="${f1(hash(i + 9) * 900)}" r="${f1(2 + hash(i + 3) * 3)}" fill="#E9E2C8" opacity=".6"/>`).join('');
  const pl = DISC.cluster.map(([x, y]) => `<circle cx="${f1(540 + x * 9)}" cy="${f1(480 + (y + 51) * 9)}" r="12" fill="#FFF6D8"/><circle cx="${f1(540 + x * 9)}" cy="${f1(480 + (y + 51) * 9)}" r="40" fill="url(#nGold)" opacity=".7"/>`).join('');
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/>${sky}<g opacity="${f1(a)}">${pl}</g>
    ${disc(540, 1250, 200, { id: 'N', damage: true, cluster: 1 })}
    <path d="M 546 1148 L 546 ${f1(lerp(1148, 640, lnk))}" stroke="${K.goldL}" stroke-width="6" stroke-dasharray="14 12"/>${grain(t)}`;
}
