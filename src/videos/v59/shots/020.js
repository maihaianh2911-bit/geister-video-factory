// 31.9–32.9: outside the block at night: the family's floor lights up as a band; "ETAGE" chip.
import { K, DEFS, FG, prog, back, eio, facade, famWindowXY, icon } from './lib.js';
export default function renderShot(t) {
  const z = 1.12 - .08 * eio(prog(t, 31.9, 32.9));
  const band = eio(prog(t, 31.95, 32.2));
  const c = back(prog(t, 31.98, 32.2));
  const [, wy] = famWindowXY();
  return `${DEFS}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${facade(t)}
    <rect x="${140 - 30}" y="${wy - 70}" width="${868 * band + 60}" height="140" fill="${K.amb}" opacity=".28"/>
    <rect x="${140 - 30}" y="${wy - 70}" width="${868 * band + 60}" height="140" fill="none" stroke="${K.amb}" stroke-width="8"/></g>
    ${c > 0 ? `<g transform="translate(540 160) scale(${c})"><rect x="-250" y="-80" width="500" height="160" rx="24" fill="${K.ol}" stroke="${K.amb}" stroke-width="6"/>${icon.floors(-160, 4, .9, '#fff', 2)}<text x="50" y="26" text-anchor="middle" fill="#fff" style="font-family:'Inter';font-weight:900;font-size:70px" letter-spacing="3">ETAGE</text></g>` : ''}
    ${FG(1430)}`;
}
