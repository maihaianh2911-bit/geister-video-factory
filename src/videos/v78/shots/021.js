// 63.1–66.16: the built-up residue starts to come off ("Rückstände" 63.92, "lösen" 65.22) — grey flakes lift from the patch and rinse away downwards; the patch lightens
import { K, OL, f1, card, cam, prog, eio, ein, lerp, hash } from './lib.js';
import { forearm } from './020.js';
export default function renderShot(t) {
  const l = eio(prog(t, 64.4, 65.8));
  let fl = '';
  for (let i = 0; i < 16; i++) { const x0 = 420 + hash(i * 3) * 300, y0 = 790 + hash(i * 5) * 60, ph = Math.max(0, Math.min(1, l * 1.5 - hash(i) * .5));
    fl += `<path d="M ${f1(x0 + ph * 40)} ${f1(y0 + ein(ph) * 900)} l 24 -6 l 10 14 l -20 10 z" fill="#9A8C7A" stroke="${K.ink}" stroke-width="3" opacity="${f1(1 - ph * .6)}"/>`; }
  return `${cam(forearm(t, { rub: 1 - .7 * l, under: `<ellipse cx="560" cy="820" rx="200" ry="70" fill="#B98E6E" opacity="${f1(.55 * (1 - .7 * l))}"/>${fl}` }), 1, 540, 840)}${card(540, 330, 'RÜCKSTÄNDE', 64, eio(prog(t, 63.8, 64.1)))}`;
}
