// L6a 25.38–28.10: MITTAGS, canteen: du with a tray looks at her phone calendar; the deadline box "FRIST" gets a red cross on "Frist" (26.96).
import { K, frame, cam, person, phone, T, dayCard, prog, eio, pop, f1 } from './lib.js';
import { canteen } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = canteen(t);
  const x = eio(prog(t, 26.96, 27.3)), shock = t >= 27.0;
  let cal = `<rect x="-58" y="-112" width="116" height="222" rx="10" fill="#fff"/><rect x="-58" y="-112" width="116" height="30" fill="#3d6fb6"/>` + T(0, -90, 'NOV', 16, { fill: '#fff' });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) cal += `<rect x="${-50 + c * 26}" y="${-70 + r * 40}" width="22" height="34" rx="3" fill="${r === 1 && c === 2 ? '#ffe0dc' : '#eef1f4'}"/>`;
  cal += T(16, -6, 'FRIST', 9, { fill: K.red }) + `<path d="M 4 -26 L 26 4 M 26 -26 L 4 4" stroke="${K.red}" stroke-width="5" stroke-linecap="round" opacity="${f1(x)}"/>`;
  const ph = phone(0, 0, 1, 0, '#fff', cal);
  s += duSp(560, 1640, 1.0, { t, look: [-4, 18], brows: shock ? 'up' : 'calm', eyes: shock ? 'wide' : 'n', mouth: shock ? 'o' : 'flat', armR: [80, -300], elbowR: [230, -300], front: `<g transform="translate(60 -380) rotate(-8) scale(1.2)">${ph}</g>` }, { talk: 0 });
  s += `<path d="M -60 1420 H 1140 V 2000 H -60 Z" fill="#a8744a" stroke="${K.ink}" stroke-width="6"/><rect x="200" y="1380" width="460" height="50" rx="10" fill="#c4ccd3" stroke="${K.ink}" stroke-width="5"/><ellipse cx="340" cy="1380" rx="90" ry="24" fill="#f2efe8" stroke="${K.ink}" stroke-width="4"/><circle cx="320" cy="1372" r="20" fill="#e8b85c"/><circle cx="360" cy="1374" r="16" fill="#7aa27a"/>`;
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 25.38, 28.1)));
  s += dayCard(t, 25.38, 'MITTAGS');
  return frame(s);
}
