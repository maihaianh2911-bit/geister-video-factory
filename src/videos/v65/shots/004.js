// 6.98–8.36: morning, your forearm on the sheet — the spot where a bite would be stays clean: dashed ring, crossed on "Mückenstich"
import { K, DEFS, BG, vig, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const r = back(prog(t, 7.2, 7.5)), x = eout(prog(t, 7.54, 7.85));
  const arm = `<path d="M -80 760 Q 300 700 640 760 Q 860 800 960 860 Q 1010 900 980 960 Q 940 1010 860 990 Q 640 940 300 980 Q 60 1010 -80 1020 Z" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 960 860 q 70 -30 120 -10 q 10 20 -20 26 q 40 4 40 24 q -6 18 -40 14 q 30 12 22 30 q -14 14 -60 0 Q 980 960 960 940 Z" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 120 830 Q 400 800 640 830" fill="none" stroke="#F7D2B2" stroke-width="10" stroke-linecap="round"/>`;
  const ring = r > 0 ? `<circle cx="520" cy="860" r="${f1(70 * r)}" fill="none" stroke="${K.red}" stroke-width="7" stroke-dasharray="14 10"/>` : '';
  const cross = x > 0 ? `<path d="M 450 790 L ${f1(450 + 140 * x)} ${f1(790 + 140 * x)} M 590 790 L ${f1(590 - 140 * x)} ${f1(790 + 140 * x)}" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>` : '';
  const sc = `${BG('url(#mMorn)')}<rect x="-60" y="600" width="1200" height="1400" fill="${K.sheet}"/>
    ${[0, 1, 2, 3].map(i => `<path d="M -60 ${700 + i * 180} Q 500 ${660 + i * 180} 1140 ${720 + i * 180}" fill="none" stroke="${K.sheetD}" stroke-width="6"/>`).join('')}
    <rect x="-60" y="-60" width="1200" height="400" fill="#FFF1D6" opacity=".6"/>${arm}${ring}${cross}`;
  return `${DEFS}${cam(sc, lerp(1, 1.08, eio(prog(t, 6.98, 8.36))), 520, 860)}${vig(.6)}`;
}
