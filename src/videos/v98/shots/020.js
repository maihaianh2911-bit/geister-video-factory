// L13b 53.72–57.48: pie chart: one third fills yellow on "Drittel" (54.9) with the label "≈ 1/3: ÜBER SICH SELBST"; small heads talking around.
import { K, frame, cam, prog, eio, pop, label, f1, T, head } from './lib.js';
import { cafe } from './sets.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = cafe(t, { strong: true });
  s += `<rect width="1080" height="1920" fill="#2a2018" opacity=".35"/>`;
  const cx = 540, cy = 860, r = 300, f = eio(prog(t, 54.7, 55.5)) / 3;
  s += `<circle cx="${cx}" cy="${cy + 14}" r="${r}" fill="#000" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4f1ea" stroke="${INK}" stroke-width="8"/>`;
  if (f > 0) { const a = -Math.PI / 2 + f * Math.PI * 2; s += `<path d="M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${f > .5 ? 1 : 0} 1 ${f1(cx + Math.cos(a) * r)} ${f1(cy + Math.sin(a) * r)} Z" fill="${K.yellow}" stroke="${INK}" stroke-width="8"/>`; }
  s += head('stu3', cx + 120, cy - 120, .45 * (f > .3 ? 1 : 0.001), { t, mouth: 'talk', brows: 'up' });
  s += label('≈ 1/3', 540, 1290, 120, { p: pop(t, 55.0, .45) });
  s += label('ÜBER SICH SELBST', 540, 1390, 72, { p: pop(t, 55.4, .45), fill: '#ffffff' });
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 53.72, 57.48))));
}
