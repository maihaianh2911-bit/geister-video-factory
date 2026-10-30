// 65.56–67.0: high angle on the child alone for a second: small, scared, reaching up for help.
import { K, DEFS, FG, prog, eio, person, bear } from './lib.js';
export default function renderShot(t) {
  const r = eio(prog(t, 65.7, 66.2));
  const z = 1 + .06 * eio(prog(t, 65.56, 67));
  return `${DEFS}<g transform="translate(540 900) scale(${z}) translate(-540 -900)"><rect x="-60" y="-60" width="1200" height="2040" fill="#1A2422"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${-100 + i * 200} -60 L ${-300 + i * 260} 2000" stroke="#121816" stroke-width="5"/>`).join('')}
    <ellipse cx="540" cy="1210" rx="200" ry="40" fill="#000" opacity=".35"/>
    ${person('k', 540, 860, 1.25, { aL: [20 + 120 * r, 30 + 120 * r], aR: [-10, -70], brow: 'worry', eyeS: 1.3, mouth: 'o', lookY: -14, front: bear(70, 140, .6, -10) })}</g>
    ${FG(1430)}`;
}
