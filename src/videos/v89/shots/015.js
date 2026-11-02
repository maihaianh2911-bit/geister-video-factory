// L14 45.02–49.0 flashback "letzte Woche": du celebrates with cake and balloons; the phone stays silent — no message from Lena.
import { K, frame, bg, shadow, person, cake, balloon, phone, chip, T, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += `<rect width="1080" height="1920" fill="#f2d39b" opacity=".22"/>`;
  s += balloon(170, 560, '#e86a6a', t, 1) + balloon(280, 500, K.yellow, t, 2) + balloon(900, 540, '#6aa7e8', t, 3);
  s += shadow(380, 1330);
  const fall = eio(prog(t, 48.2, 48.7));
  s += person('du', 380, 1330, 1, { t, seed: 1, hear: .6, armL: [-140, -440 + 160 * fall], armR: [110, -280], eyes: fall > .5 ? 'sad' : 'happy', mouth: fall > .5 ? 'flat' : 'grin', look: [12, 6] });
  // table with the cake
  s += `<rect x="560" y="1150" width="400" height="30" rx="10" fill="#b07a4c" stroke="${K.ink}" stroke-width="5"/><rect x="740" y="1180" width="40" height="150" fill="#6b4a2e" stroke="${K.ink}" stroke-width="5"/>`;
  s += cake(760, 1150, .9);
  // the phone grows out of du's hand: Lena's chat stays empty
  const g = eio(prog(t, 46.8, 47.4));
  const px = lerp(380 + 110, 720, g), py = lerp(1330 - 280, 640, g), ps = lerp(.45, 1.6, g);
  const scr = `<rect x="-60" y="-114" width="120" height="40" fill="#cfd8df"/>${T(0, -86, 'Lena', 22, { fill: K.ink })}${t > 47.42 ? T(0, 16, '0', 40, { fill: '#9aa3ad' }) : ''}`;
  s += phone(px, py, ps, { screen: scr });
  const z = pop(t, 47.42, .4);
  if (z > 0) s += `<g transform="translate(${f1(px + 95 * ps)} ${f1(py - 125 * ps)}) scale(${f1(z * 100) / 100})"><circle r="42" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/>${T(0, 16, '0', 46, { fill: '#fff' })}</g>`;
  s += chip(540, 300, 'LETZTE WOCHE', { p: pop(t, 45.3, .4), size: 52, bg: '#fff' });
  return frame(cam(s, 540, 1000, 1.02));
}
