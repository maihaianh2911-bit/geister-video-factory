// 30.8–32.31: the price climbs — stacks of notes grow higher (der Preis steigt)
import { K, DEFS, BG, notes, grain, prog, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const g = eout(prog(t, 30.9, 31.9));
  const st = [3, 7, 12, 18].map((n, i) => notes(220 + i * 210, 1300, Math.max(1, Math.round(n * cl1(g * 1.4 - i * .2))), .62)).join('');
  return `${DEFS}${BG(K.paper)}<rect x="-60" y="1300" width="1200" height="700" fill="${K.paperD}"/>${st}
    <path opacity="${f1(cl1(g * 40))}" d="M 160 1150 L ${f1(lerp(160, 900, g))} ${f1(lerp(1150, 520, g))}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>
    <path d="M ${f1(lerp(160, 900, g) - 60)} ${f1(lerp(1150, 520, g) + 4)} L ${f1(lerp(160, 900, g))} ${f1(lerp(1150, 520, g))} L ${f1(lerp(160, 900, g) - 10)} ${f1(lerp(1150, 520, g) + 62)}" fill="none" stroke="${K.red}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(cl1(g * 8))}"/>${grain(t)}`;
}
function cl1(x) { return Math.max(0, Math.min(1, x)); }
