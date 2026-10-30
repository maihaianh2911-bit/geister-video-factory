// 40.8–42.22: outside: a locator ring closes in on the family's window — the firefighters know where to search.
import { K, DEFS, FG, prog, eio, back, facade, famWindowXY, cl } from './lib.js';
export default function renderShot(t) {
  const z = 1.0 + .22 * eio(prog(t, 40.8, 42.2));
  const [wx, wy] = famWindowXY();
  const r = 520 - 400 * eio(prog(t, 40.85, 41.3));
  const lock = back(prog(t, 41.25, 41.45));
  const blink = Math.sin(t * 12) > 0 ? 1 : .6;
  return `${DEFS}<g transform="translate(${wx} ${wy}) scale(${z}) translate(${-wx} ${-wy})">${facade(t)}
    <circle cx="${wx}" cy="${wy}" r="${r}" fill="none" stroke="${K.red}" stroke-width="10" stroke-dasharray="40 24" opacity=".9"/>
    ${lock > 0 ? `<rect x="${wx - 90}" y="${wy - 70}" width="180" height="140" rx="10" fill="none" stroke="${K.red}" stroke-width="${12 * lock}" opacity="${blink}"/>` : ''}
    <path d="M ${wx - r - 40} ${wy} H ${wx - r + 40} M ${wx + r - 40} ${wy} H ${wx + r + 40} M ${wx} ${wy - r - 40} V ${wy - r + 40} M ${wx} ${wy + r - 40} V ${wy + r + 40}" stroke="${K.red}" stroke-width="10"/>
    </g>${FG(1430)}`;
}
