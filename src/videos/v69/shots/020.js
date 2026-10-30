// 64.36–69.26: the door opens a gap, but the cabin floor is still below the hallway — the doors part ("Spalt"); through the gap the corridor floor sits higher; red step marker on "Flur"
import { K, DEFS, cabin, light, label, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const g = eio(prog(t, 64.6, 65.5)) * .55;
  const st = eout(prog(t, 67.6, 68.2));
  const zoom = eio(prog(t, 66.0, 67.4));
  const hall = `<rect x="0" y="0" width="1080" height="1920" fill="#C9CCB8"/><rect x="0" y="0" width="1080" height="1060" fill="#E8E6D8"/><rect x="0" y="1060" width="1080" height="900" fill="#9A8C76" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 0 1060 H 1080" stroke="${K.red}" stroke-width="${f1(10 * st)}"/>`;
  const sc = `${cabin(t, { lit: 0, gap: g, gapFill: '#E8E6D8' })}
    <clipPath id="c20"><rect x="${f1(540 - 120 * g)}" y="300" width="${f1(240 * g)}" height="1200"/></clipPath><g clip-path="url(#c20)">${hall}</g>
    ${light(540, 900, 520, .8)}
    ${st > 0 ? `<g opacity="${f1(st)}"><path d="M 300 1500 H 780" stroke="${K.red}" stroke-width="8" stroke-dasharray="14 10"/><path d="M 840 1500 V 1080" stroke="${K.red}" stroke-width="10"/><path d="M 816 1120 L 840 1070 L 864 1120 Z M 816 1460 L 840 1510 L 864 1460 Z" fill="${K.red}"/></g>` : ''}`;
  return `${DEFS}${cam(sc, lerp(1, 1.18, zoom), 540, 1250)}${label(540, 300, 'BODEN TIEFER', st, K.red, 60)}`;
}
