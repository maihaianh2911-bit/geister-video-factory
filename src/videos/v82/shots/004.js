// 10.9–16.9 old school books land on the desk ("Schulbücher"), then the wall calendar 2007 lights up ("Kalender")
import { K, book, calendar, chip, glow, room, windowFrame, T, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = room({ fy: 1330 });
  s += `<path d="M 0 0 L 1080 0 L 1080 120 L 0 120 Z" fill="#ead3ae"/>`;
  s += windowFrame(80, 300, 260, 320, { sun: true, curtain: '#9fc4a6' });
  // calendar on the wall
  const hi = eout(prog(t, 14.3, 14.8));
  if (hi > 0) s += glow(760, 470, 260 * hi, K.gold, .5);
  s += `<g transform="rotate(${f1(-3 + 3 * hi)} 760 470)">${calendar(760, 470, lerp(1, 1.18, hi), '2007', { month: 'SEPTEMBER', mark: 1 })}</g>`;
  s += chip(540, 180, 'FAST 20 JAHRE ZURÜCK', { a: fade(t, 15.46), sc: pop(t, 15.46), bg: K.red, size: 40 });
  // desk
  s += `<rect x="60" y="1000" width="960" height="40" rx="8" fill="${K.wood}" stroke="${K.ol}" stroke-width="7"/>
    <rect x="100" y="1040" width="40" height="290" fill="${K.woodSh}" stroke="${K.ol}" stroke-width="6"/><rect x="940" y="1040" width="40" height="290" fill="${K.woodSh}" stroke="${K.ol}" stroke-width="6"/>
    <rect x="640" y="1040" width="300" height="160" fill="${K.wood}" stroke="${K.ol}" stroke-width="6"/><circle cx="790" cy="1120" r="12" fill="${K.gold}" stroke="${K.ol}" stroke-width="4"/>`;
  // pencil cup
  s += `<rect x="860" y="900" width="80" height="100" rx="10" fill="${K.teal}" stroke="${K.ol}" stroke-width="6"/><path d="M 880 900 L 870 830 M 905 900 L 910 820 M 925 900 L 945 840" stroke="${K.ol}" stroke-width="12" stroke-linecap="round"/><path d="M 880 900 L 870 830 M 905 900 L 910 820 M 925 900 L 945 840" stroke="${K.red}" stroke-width="6" stroke-linecap="round"/>`;
  // books drop in one after another on "Schulbücher"
  const B = [[300, 'LESEN 1', '#3f73c4', 12.3, -4], [520, 'MATHE 1', '#3c9a5f', 12.5, 3], [710, '', '#d9493f', 12.7, -2]];
  B.forEach(([x, title, col, t0, r]) => {
    const p = eout(prog(t, t0, t0 + .35)), a = fade(t, t0, .15);
    if (a <= 0) return;
    s += `<g opacity="${f1(a * 100) / 100}">${book(x, lerp(700, 870, p), x === 710 ? 120 : 190, 250, col, title, { rot: r, size: 34, icon: title === 'LESEN 1' ? `<circle cx="10" cy="40" r="34" fill="${K.gold}" stroke="${K.ol}" stroke-width="5"/>` : title ? T(10, 60, '1+1', 48, { fill: '#fff' }) : '' })}</g>`;
  });
  return s;
}
