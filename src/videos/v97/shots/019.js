// L9a 49.34–53.10: graphic card — "WIE SEHR ES FREUT:" the grey estimate is low, the real joy rises far above it; "UNTERSCHÄTZT" + green arrow up ("unterschätzten" 50.42).
import { frame, cam, pop, prog, eio, f1, K, T, label, arrow, head } from './lib.js';
import { office } from './sets.js';
export function meter(x, y, h, est, real, col, t) {
  let s = `<rect x="${x - 60}" y="${y - h}" width="120" height="${h}" rx="20" fill="#eef1f4" stroke="${K.ink}" stroke-width="6"/>`;
  if (real > 0) s += `<rect x="${x - 50}" y="${f1(y - 10 - (h - 20) * real)}" width="100" height="${f1((h - 20) * real)}" rx="14" fill="${col}"/>`;
  if (est > 0) { const ey = y - 10 - (h - 20) * est; s += `<path d="M ${x - 90} ${f1(ey)} H ${x + 90}" stroke="#6b7480" stroke-width="10" stroke-dasharray="20 12"/><circle cx="${x - 100}" cy="${f1(ey)}" r="12" fill="#6b7480"/>`; }
  return s;
}
export default function renderShot(t) {
  let s = office(t);
  s = `<g opacity=".9">${s}</g><rect width="1080" height="1920" fill="#1d2433" opacity=".35"/>`;
  const card = pop(t, 49.4, .45);
  let c = `<rect x="90" y="330" width="900" height="760" rx="40" fill="#fff" stroke="${K.ink}" stroke-width="8"/>`;
  c += T(540, 450, 'WIE SEHR ES FREUT:', 66, { fill: K.txt });
  const est = eio(prog(t, 49.6, 50.0)) * .3, real = eio(prog(t, 51.0, 52.6)) * .92;
  c += meter(330, 1020, 480, est, real, K.yellow, t);
  c += T(690, 720, 'UNTER-', 70, { fill: '#2e7d4f', op: pop(t, 50.42, .4) }) + T(690, 800, 'SCHÄTZT', 70, { fill: '#2e7d4f', op: pop(t, 50.42, .4) });
  c += arrow(690, 940, .9, 1, K.green, pop(t, 50.6, .4));
  c += head('stu', 540, 1220, .5 * Math.max(.01, pop(t, 52.1, .4)), { t, eyes: 'happy', mouth: 'grin' });
  s += `<g transform="translate(540 710) scale(${f1(Math.max(.01, card) * 1000) / 1000}) translate(-540 -710)">${c}</g>`;
  return frame(cam(s, 540, 760, 1 + .04 * eio(prog(t, 49.34, 53.1))));
}
