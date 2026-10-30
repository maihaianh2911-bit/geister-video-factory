// 14.64–17.6: that doesn't make the rest of the bread safe ("nicht sicher" 16.42) — the loaf on its board gets a red warning
import { K, DEFS, kitchen, slice, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const w = eio(prog(t, 16.3, 16.7)), pulse = w * (1 + .04 * Math.sin(t * 8));
  const loaf = `<path d="M 160 1240 Q 140 980 330 940 L 760 940 Q 920 960 920 1240 Z" fill="${K.crust}" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2, 3].map(i => `<path d="M ${330 + i * 110} 950 Q ${300 + i * 110} 1100 ${330 + i * 110} 1240" fill="none" stroke="${K.crustD}" stroke-width="6"/>`).join('')}`;
  const sc = `${kitchen(1250)}<rect x="100" y="1230" width="880" height="60" rx="20" fill="${K.woodD}" stroke="${K.ink}" stroke-width="4"/>${loaf}${slice(880, 1060, .9, { id: 's7', rot: 12 })}
    <rect x="${f1(120 - 20 * pulse)}" y="${f1(880 - 20 * pulse)}" width="${f1(900 + 40 * pulse)}" height="${f1(420 + 40 * pulse)}" rx="40" fill="none" stroke="${K.red}" stroke-width="12" opacity="${f1(w)}"/>`;
  return `${DEFS}${cam(sc, 1 + .06 * eio(prog(t, 14.64, 17.6)), 540, 1080)}${label(540, 560, 'NICHT SICHER', w, K.red)}`;
}
