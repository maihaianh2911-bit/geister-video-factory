// L9b 53.10–56.04: second card — "WIE PEINLICH ES IST:" the grey estimate is high, the real awkwardness drops low; "ÜBERSCHÄTZT" + red arrow down ("überschätzten" 54.12).
import { frame, cam, pop, prog, eio, f1, K, T, arrow, head } from './lib.js';
import { office } from './sets.js';
import { meter } from './019.js';
export default function renderShot(t) {
  let s = office(t);
  s = `<g opacity=".9">${s}</g><rect width="1080" height="1920" fill="#1d2433" opacity=".35"/>`;
  // first result, small at the top
  let a = `<rect x="160" y="170" width="760" height="190" rx="30" fill="#fff" stroke="${K.ink}" stroke-width="6"/>${T(470, 250, 'WIE SEHR ES FREUT:', 46)}${T(470, 315, 'UNTERSCHÄTZT', 50, { fill: '#2e7d4f' })}`;
  a += arrow(830, 265, .55, 1, K.green, 1);
  s += a;
  const card = pop(t, 53.2, .45);
  let c = `<rect x="90" y="420" width="900" height="760" rx="40" fill="#fff" stroke="${K.ink}" stroke-width="8"/>`;
  c += T(540, 540, 'WIE PEINLICH ES IST:', 64, { fill: K.txt });
  const est = eio(prog(t, 53.4, 53.9)) * .85, real = .16 * eio(prog(t, 54.6, 55.4));
  c += meter(330, 1110, 480, est, real, '#e07a6a', t);
  c += T(690, 810, 'ÜBER-', 70, { fill: '#b8322b', op: pop(t, 54.12, .4) }) + T(690, 890, 'SCHÄTZT', 70, { fill: '#b8322b', op: pop(t, 54.12, .4) });
  c += arrow(690, 1030, .9, -1, K.red, pop(t, 54.3, .4));
  s += `<g transform="translate(540 800) scale(${f1(Math.max(.01, card) * 1000) / 1000}) translate(-540 -800)">${c}</g>`;
  return frame(cam(s, 540, 760, 1.03 - .03 * eio(prog(t, 53.1, 56.04))));
}
