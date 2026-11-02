// L13 56.14–59.92: du at a whiteboard (daylight study). Heading KONKRETER PLAN ("Plan" 57.26), then three tiles on their words:
// WAS (envelope, 58.4), WANN (clock, 58.98), WO (pin, 59.24). du points at them.
import { K, frame, cam, study, person, shadow, T, light, clockFace, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
function tile(x, y, label, icon, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${f1(p * 1000) / 1000})"><rect x="-95" y="-120" width="190" height="240" rx="22" fill="${K.yellow}" stroke="${K.ink}" stroke-width="6"/>${icon}${T(0, 92, label, 48, { fill: K.ink })}</g>`;
}
export default function renderShot(t) {
  let s = study({ mood: 'day', dx: -20 * eio(prog(t, 56.14, 59.92)), clock: [9, 45] }) + light(700, 500, 400, 400, '#fff6d0', .4);
  s += `<rect x="370" y="330" width="680" height="760" rx="14" fill="#fbfcfd" stroke="${K.ink}" stroke-width="6"/><rect x="370" y="1090" width="680" height="24" fill="#b9c0c6" stroke="${K.ink}" stroke-width="4"/><rect x="420" y="1094" width="60" height="16" rx="6" fill="${K.red}"/><rect x="500" y="1094" width="60" height="16" rx="6" fill="${K.blue}"/>`;
  const h = pop(t, 57.26, .4);
  if (h > 0) s += `<g transform="translate(710 450) scale(${f1(h * 1000) / 1000})">${T(0, 20, 'KONKRETER PLAN', 60, { fill: K.ink })}<path d="M -230 46 Q 0 60 230 44" stroke="${K.red}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  const env = `<rect x="-60" y="-80" width="120" height="84" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M -60 -80 L 0 -30 L 60 -80" stroke="${K.ink}" stroke-width="5" fill="none"/>`;
  const clk = `<g transform="translate(0 -38)">${clockFace(0, 0, 48, 8, 0)}</g>`;
  const pin = `<path d="M 0 10 C -40 -40 -46 -60 -46 -76 C -46 -104 -24 -122 0 -122 C 24 -122 46 -104 46 -76 C 46 -60 40 -40 0 10 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/><circle cx="0" cy="-78" r="16" fill="#fff"/>`;
  s += tile(500, 700, 'WAS', env, pop(t, 58.4, .4)) + tile(710, 700, 'WANN', clk, pop(t, 58.98, .4)) + tile(920, 700, 'WO', pin, pop(t, 59.24, .4));
  const X = 220, Y = 1600, S = 1.45;
  s += shadow(X, Y + 4, 170);
  const tx = t < 58.9 ? 280 : (t < 59.2 ? 300 : 340);
  s += person('du', X, Y, S, { t, seed: 1, load: .85, nStones: 5, hunch: .2, eyes: 'n', brows: 'up', mouth: 'smile', look: [16, -12], armR: t > 57.0 ? [lerp(150, tx, eio(prog(t, 57.0, 57.4))), -420] : null, rim: '#fff2c0' });
  s += `<rect x="-60" y="1740" width="1200" height="260" fill="#a8774f" stroke="${K.ink}" stroke-width="5"/>`;
  s = cam(s, 600, 900, 1 + .06 * eio(prog(t, 56.14, 59.92)));
  return frame(s, { vig: .4 });
}
