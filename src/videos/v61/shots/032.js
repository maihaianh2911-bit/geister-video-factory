// 62.4–64.0: so the mouth does not cool down suddenly — small bite in the cutaway, palate stays warm, thermometer steady
import { K, DEFS, BG, headProfile, cam, thermo, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const ice = eout(prog(t, 62.45, 62.8));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'F', ice: ice * .55, cold: .15 })}</g>`;
  return `${DEFS}${BG(K.bg)}${cam(head, lerp(1.45, 1.5, eio(prog(t, 62.4, 64))), 760, 940, -200, -40)}
    ${thermo(860, 520, 1, .78 + .02 * Math.sin(t * 3), K.hot)}`;
}
