// 25.88–32.02 knowing the future: a company chart climbs to "MILLIARDEN"; a crypto coin counter runs to ×1000 on "Tausendfache"
import { K, kid, glow, coin, chip, T, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#1f2a4a"/>`;
  // panel 1: chart
  s += `<rect x="70" y="170" width="940" height="560" rx="36" fill="#26345c" stroke="${K.ol}" stroke-width="6"/>`;
  s += T(120, 250, 'FIRMEN', 48, { anchor: 'start', fill: '#cfe0ff' });
  for (let i = 0; i < 4; i++) s += `<path d="M 130 ${330 + i * 100} L 950 ${330 + i * 100}" stroke="#3a4a78" stroke-width="4"/>`;
  const p = eio(prog(t, 26.8, 28.1));
  const pts = []; const N = 24;
  for (let i = 0; i <= N * p; i++) { const u = i / N; pts.push([140 + u * 780, 660 - 360 * Math.pow(u, 2.6) - 14 * Math.sin(i * 1.9)]); }
  if (pts.length > 1) {
    s += `<path d="M ${pts.map(q => f1(q[0]) + ' ' + f1(q[1])).join(' L ')}" stroke="${K.gold}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    const e = pts[pts.length - 1]; s += `<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="16" fill="${K.goldL}" stroke="${K.ol}" stroke-width="4"/>`;
  }
  s += chip(760, 300, 'MILLIARDEN €', { a: fade(t, 27.52), sc: pop(t, 27.52), bg: K.green, size: 44 });
  // panel 2: crypto coin
  s += `<rect x="70" y="790" width="940" height="560" rx="36" fill="#26345c" stroke="${K.ol}" stroke-width="6" opacity="${f1(fade(t, 28.9) * 100) / 100}"/>`;
  s += T(120, 870, 'KRYPTO', 48, { anchor: 'start', fill: '#cfe0ff', op: fade(t, 29.0) });
  const c = fade(t, 29.24, .3);
  if (c > 0) {
    s += glow(340, 1080, 180, K.gold, .4 * c);
    s += `<g opacity="${f1(c * 100) / 100}">${coin(340, 1080, 150 * pop(t, 29.24), { sx: Math.cos(t * 3), label: '' })}</g>`;
    s += `<g opacity="${f1(c * 100) / 100}" transform="translate(340 1080)"><path d="M -40 -60 L -40 60 M -40 -60 L 20 -60 Q 60 -60 60 -30 Q 60 0 20 0 L -40 0 M 20 0 Q 66 0 66 30 Q 66 60 20 60 L -40 60" stroke="#a8731c" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(${f1(Math.abs(Math.cos(t * 3)) * 100) / 100} 1)"/></g>`;
  }
  const m = eout(prog(t, 30.3, 31.16));
  const val = Math.round(lerp(1, 1000, m * m));
  s += T(740, 1125, '×' + (t < 30.3 ? 1 : val), 120, { fill: t > 31.1 ? K.gold : '#fff', op: fade(t, 29.8) });
  return s;
}
