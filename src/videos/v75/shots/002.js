// 3.94–7.42: the power still works ("Strom" 4.94, "funktioniert" 5.98) — a street of houses: windows stay lit, the wifi signs above them switch off
import { K, DEFS, BG, stars, wifi, label, glow, cam, prog, eio, lerp, f1, hash } from './lib.js';
export default function renderShot(t) {
  const off = prog(t, 4.0, 4.6) > .5 ? 0 : 1, s = eio(prog(t, 5.0, 5.4));
  const houses = [0, 1, 2].map(i => { const x = 200 + i * 340, h = 420 + (i % 2) * 120, y = 1300 - h;
    const win = [0, 1].map(r => [0, 1].map(c => `<rect x="${x - 80 + c * 100}" y="${y + 80 + r * 140}" width="70" height="90" fill="${K.sunL}" ${'stroke="#0B1026" stroke-width="3"'}/>`).join('')).join('');
    return `${glow(x, y + 180, 260, .5, 'iWarm')}<path d="M ${x - 140} ${y} L ${x} ${y - 120} L ${x + 140} ${y} V 1300 H ${x - 140} Z" fill="${K.wall2}" stroke="${K.ink}" stroke-width="4"/>${win}${wifi(x, y - 190, .55, off)}`; }).join('');
  return `${DEFS}${BG()}${stars(30, 3)}${cam(`${houses}<rect x="-60" y="1300" width="1200" height="700" fill="${K.floor}"/>`, lerp(1, 1.05, prog(t, 3.94, 7.42)), 540, 1000)}${label(540, 1460 - 120, 'STROM: AN', s, K.green)}`;
}
