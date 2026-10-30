// 48.32–52.1: the figure holds the soft egg and shakes its head — a throwing arc across the table gets crossed out ("nicht … herumwerfen")
import { K, OL, f1, stick, cross, prog, eio, lerp } from './lib.js';
import { kitchen, egg, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const shake = Math.sin(t * 11) * 4 * eio(prog(t, 49.6, 50.0)) * (1 - eio(prog(t, 51.2, 51.6)));
  const a = eio(prog(t, 48.9, 49.6));
  const arc = a > 0 ? `<path d="M 580 980 Q 740 ${f1(600)} 920 ${f1(lerp(860, 1100, 1))}" fill="none" stroke="${K.blue}" stroke-width="12" stroke-dasharray="26 18" stroke-dashoffset="${f1(-t * 60)}" opacity="${f1(a)}"/>` + egg(lerp(560, 920, .5), 700, .5, { id: 'e19g', shell: 0 }).replace('<g ', `<g opacity="${f1(a * .55)}" `) : '';
  const fig = stick(400, FY, FS, { hR: [560, 1030], hL: [300, 1180], bendR: 1, lean: shake * .4, look: .6 + shake * .05, brow: 'calm', mouth: 'flat', over: egg(568, 996, .62, { id: 'e19', shell: 0 }) });
  return `${kitchen()}${arc}${cross(740, 760, 150, prog(t, 49.9, 50.6))}${fig}`;
}
