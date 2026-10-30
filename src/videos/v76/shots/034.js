// 65.26–67.48: a magnifying lens slides over the knife in the surgeon's hand and reveals bacteria on it ("Bakterien" 66.36).
import { K, DEFS, BG, knife, arm, bact, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 65.4, 66.3)), b = eout(prog(t, 66.3, 66.7));
  const lx = lerp(1200, 560, m), ly = lerp(400, 860, m);
  const hand = arm([1200, 1300], [980, 1180], [780, 1030], 1.3, K.coatB, { held: knife(780, 1030, 2.2, -150) });
  let bs = '';
  for (let i = 0; i < 7; i++) bs += bact(lx - 140 + (i * 53) % 260 + 8 * Math.sin(t * 2 + i), ly - 120 + ((i * 97) % 240), .9 * b, i * 47 + 20 * Math.sin(t + i), t + i);
  const lens = `<defs><clipPath id="s34lens"><circle cx="${f1(lx)}" cy="${f1(ly)}" r="250"/></clipPath></defs>
    <g clip-path="url(#s34lens)"><rect x="${f1(lx - 260)}" y="${f1(ly - 260)}" width="520" height="520" fill="${K.steel}"/><path d="M ${f1(lx - 260)} ${f1(ly + 40)} L ${f1(lx + 260)} ${f1(ly - 60)}" stroke="#E6EEF2" stroke-width="40" opacity=".7"/>${bs}</g>
    <circle cx="${f1(lx)}" cy="${f1(ly)}" r="250" fill="none" stroke="#C8A04A" stroke-width="30"/><circle cx="${f1(lx)}" cy="${f1(ly)}" r="250" fill="none" stroke="${K.ink}" stroke-width="5"/>
    <path d="M ${f1(lx + 180)} ${f1(ly - 180)} L ${f1(lx + 330)} ${f1(ly - 330)}" stroke="${K.woodD}" stroke-width="56" stroke-linecap="round"/>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="560" cy="860" rx="600" ry="600" fill="url(#nLamp)" opacity=".6"/>${hand}${m > 0 ? lens : ''}`;
}
