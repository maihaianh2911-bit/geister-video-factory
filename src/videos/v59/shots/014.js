// 21.9–23.6: "wenige Atemzüge": profile silhouette; a few breaths of smoke enter, the lungs turn grey.
import { K, DEFS, FG, prog, eio, ein, back, cl, hash } from './lib.js';
export default function renderShot(t) {
  const br = [22.1, 22.55, 23.0];
  let fill = 0, puffs = '';
  br.forEach((b, i) => {
    const p = prog(t, b, b + .45);
    fill += eio(p) / 3;
    if (p > 0 && p < 1) for (let k = 0; k < 7; k++) {
      const q = cl(p * 1.4 - k * .06); if (q <= 0 || q >= 1) continue;
      const x = 80 + 520 * q + 20 * Math.sin(k + i), y = 610 + 30 * Math.sin(q * 6 + k) - 20 * q;
      puffs += `<circle cx="${x}" cy="${y}" r="${40 * (1 - q) + 12}" fill="${k % 2 ? K.smoke3 : K.smoke2}" opacity="${.9 * (1 - q * .6)}"/>`;
    }
  });
  const chest = 1 + .05 * Math.sin(prog(t, 22.1, 23.45) * Math.PI * 3);
  const lung = (sx) => `<path d="M ${sx * 20} -150 Q ${sx * 150} -170 ${sx * 160} 40 Q ${sx * 150} 170 ${sx * 40} 150 Q ${sx * 10} 0 ${sx * 20} -150 Z" fill="#E88A8F" stroke="#0B0F12" stroke-width="7"/>
    <clipPath id="v14l${sx > 0 ? 'r' : 'l'}"><path d="M ${sx * 20} -150 Q ${sx * 150} -170 ${sx * 160} 40 Q ${sx * 150} 170 ${sx * 40} 150 Q ${sx * 10} 0 ${sx * 20} -150 Z"/></clipPath>
    <rect x="-200" y="${160 - 320 * fill}" width="400" height="400" fill="#3A3A40" clip-path="url(#v14l${sx > 0 ? 'r' : 'l'})"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#141A1F"/>
    <ellipse cx="200" cy="620" rx="380" ry="380" fill="url(#vFire)" opacity=".35"/>
    <path d="M 1140 1500 L 1140 300 Q 900 160 760 260 Q 640 340 650 470 Q 600 540 610 600 L 660 610 Q 650 680 690 720 Q 660 760 700 800 Q 760 860 820 850 L 820 980 Q 600 1060 560 1500 Z" fill="#2E3B44" stroke="#0B0F12" stroke-width="10"/>
    <g transform="translate(850 1180) scale(${chest})"><path d="M -10 -260 V -150" stroke="#C5767B" stroke-width="30" stroke-linecap="round"/>${lung(-1)}${lung(1)}</g>
    <g filter="url(#vSoft2)">${puffs}</g>
    ${br.map((b, i) => { const p = back(prog(t, b, b + .2)); return p > 0 ? `<circle cx="${190 + i * 120}" cy="300" r="${40 * p}" fill="${K.smoke3}" stroke="${K.red}" stroke-width="8"/>` : ''; }).join('')}
    ${FG(1430)}`;
}
