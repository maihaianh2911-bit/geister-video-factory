// 24.1–26.14: … and beyond the discoloured area ("über die verfärbte Stelle hinaus" 24.1–25.22) — threads reach past the dashed ring, arrows point to them
import { K, DEFS, BG, slice, hyphae, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const g = eio(prog(t, 24.1, 25.4)), a = eio(prog(t, 25.0, 25.4));
  const inner = `<rect x="-200" y="-260" width="400" height="460" fill="${K.white}" opacity=".45"/>${hyphae(-60, 40, 1, 120, 240, 2)}${hyphae(-60, 40, g, 260, 200, 5)}
    <circle cx="-60" cy="40" r="60" fill="none" stroke="${K.tealD}" stroke-width="4" stroke-dasharray="10 8"/>`;
  const arrows = [[200, 700], [880, 1180]].map(([x, y], i) => `<path d="M ${x} ${y} L ${f1(x + (i ? -120 : 120) * a)} ${f1(y + 100 * a)}" stroke="${K.red}" stroke-width="14" stroke-linecap="round" opacity="${f1(a)}"/>`).join('');
  return `${DEFS}${BG(K.room)}${cam(`${slice(540, 900, 3, { id: 's10', spot: 1, at: [-60, 40], inner })}${arrows}`, 1.04, 540, 900)}${label(540, 260, 'UNSICHTBAR', a, K.red)}`;
}
