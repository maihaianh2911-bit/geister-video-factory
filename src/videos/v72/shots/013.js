// 32.36–35.28: some moulds also make toxins ("Giftstoffe" 34.4) — close on a mould colony, purple toxin dots seep out
import { K, DEFS, BG, toxins, hyphae, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const g = eio(prog(t, 33.6, 34.8));
  let col = '';
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, r = 120 + (i % 3) * 30; col += `<circle cx="${f1(540 + Math.cos(a) * r * .8)}" cy="${f1(820 + Math.sin(a) * r * .6)}" r="${f1(60 + (i % 2) * 20)}" fill="${i % 2 ? K.mold : K.moldL}" stroke="${K.ink}" stroke-width="4"/>`; }
  const sc = `${BG(K.crumb)}<circle cx="540" cy="900" r="460" fill="${K.crumbD}" opacity=".35"/>${hyphae(540, 900, 1, 300, 380, 9)}${col}<circle cx="540" cy="820" r="90" fill="${K.mold}" stroke="${K.ink}" stroke-width="4"/>${toxins(220, 980, 640, 340, 22, g, 3, t)}`;
  return `${DEFS}${cam(sc, 1 + .05 * eio(prog(t, 32.36, 35.28)), 540, 900)}${label(540, 260, 'GIFTSTOFFE', eio(prog(t, 34.3, 34.6)), K.toxin)}`;
}
