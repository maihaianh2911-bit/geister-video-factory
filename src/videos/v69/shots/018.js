// 57.32–62.38: the lift could start moving again while you're stuck between cabin and shaft — cutaway: a dashed (hypothetical) figure half out of the roof hatch; the cabin arrow and a red danger gap on "anfahren"/"feststeckst"
import { K, DEFS, shaft, label, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const fig = eout(prog(t, 57.5, 58.0));
  const mv = eout(prog(t, 58.3, 58.8));
  const dz = eout(prog(t, 60.6, 61.1));
  const cy = 820 - 30 * Math.sin(prog(t, 58.4, 62) * Math.PI) * mv;
  const ghost = `<g opacity="${f1(fig)}" fill="none" stroke="${K.mono}" stroke-width="8" stroke-dasharray="14 10" stroke-linecap="round"><circle cx="560" cy="${f1(cy - 170)}" r="44"/><path d="M 560 ${f1(cy - 126)} L 560 ${f1(cy + 20)} M 560 ${f1(cy - 90)} L 640 ${f1(cy - 30)} M 560 ${f1(cy - 90)} L 480 ${f1(cy - 30)}"/></g>`;
  const arrow = mv > 0 ? `<g opacity="${f1(mv)}"><path d="M 900 1300 L 900 900" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/><path d="M 862 950 L 900 880 L 938 950 Z" fill="${K.red}"/></g>` : '';
  const zone = dz > 0 ? `<rect x="260" y="${f1(cy - 230)}" width="560" height="230" fill="url(#eRed)" opacity="${f1(dz)}"/><rect x="260" y="${f1(cy - 230)}" width="560" height="230" fill="none" stroke="${K.red}" stroke-width="6" stroke-dasharray="16 10" opacity="${f1(dz)}"/>` : '';
  return `${DEFS}${shaft(t, { cy })}${zone}${ghost}${arrow}${label(540, 300, 'GEFAHR', dz, K.red, 72)}`;
}
