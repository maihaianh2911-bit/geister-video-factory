// 35.28–38.52: it depends on the kind of mould ("Pilzart" 35.54) and the amount of toxin ("Giftmenge" 36.22) — three different colonies, a gauge fills
import { K, DEFS, BG, label, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 35.4, 35.9)), g = eio(prog(t, 36.2, 37.4));
  const cols = [[K.mold, K.moldL], ['#6E8EA0', '#A9C2CF'], ['#3E3A36', '#7A7068']];
  const col = cols.map(([c1, c2], i) => { const x = 240 + i * 300, s = a > i / 3 ? 1 : 0; return `<g transform="translate(${x} 640) scale(${f1(s)})"><circle cx="0" cy="0" r="100" fill="${K.crumb}" stroke="${K.ink}" stroke-width="5"/><circle cx="-20" cy="-10" r="48" fill="${c1}" stroke="${K.ink}" stroke-width="4"/><circle cx="28" cy="18" r="30" fill="${c2}" stroke="${K.ink}" stroke-width="4"/></g>`; }).join('');
  const ga = eio(prog(t, 36.0, 36.3));
  const gauge = ga <= 0 ? '' : `<g opacity="${f1(ga)}"><rect x="190" y="1060" width="700" height="80" rx="40" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="200" y="1070" width="${f1(680 * g * .85)}" height="60" rx="30" fill="${K.toxin}"/>${[0, 1, 2, 3].map(i => `<circle cx="${230 + i * 30}" cy="1000" r="12" fill="${K.toxin}" stroke="${K.ink}" stroke-width="3" opacity="${f1(g)}"/>`).join('')}</g>`;
  return `${DEFS}${BG(K.room)}${col}${gauge}${label(540, 420, 'PILZART', a)}${label(540, 1260, 'GIFTMENGE', eio(prog(t, 36.2, 36.5)), K.toxin)}`;
}
