// 70.88–75.636: that's why chilled food only keeps for a limited time — fridge shelf: the germs keep slowly multiplying while an hourglass runs down ("begrenzt haltbar")
import { K, DEFS, BG, colony, milk, yog, meat, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const u = prog(t, 70.9, 75.6);
  const n = Math.round(lerp(8, 26, u));
  const sand = u;
  const hg = `<g transform="translate(840 760)"><path d="M -80 -170 H 80 M -80 170 H 80" stroke="${K.wood}" stroke-width="16" stroke-linecap="round"/>
    <path d="M -64 -160 Q -64 -40 0 0 Q 64 -40 64 -160 Z" fill="#E9EEF6" fill-opacity=".5" stroke="${K.line}" stroke-width="5"/><path d="M -64 160 Q -64 40 0 0 Q 64 40 64 160 Z" fill="#E9EEF6" fill-opacity=".5" stroke="${K.line}" stroke-width="5"/>
    <path d="M ${f1(-54 * (1 - sand) - 4)} ${f1(-150 + 140 * sand)} Q 0 ${f1(-20 + 10 * sand)} ${f1(54 * (1 - sand) + 4)} ${f1(-150 + 140 * sand)} Z" fill="${K.warm}" opacity="${f1(1 - sand * .95)}"/>
    <path d="M -54 152 Q 0 ${f1(150 - 130 * sand)} 54 152 Z" fill="${K.warm}"/><path d="M 0 0 V 150" stroke="${K.warm}" stroke-width="4" opacity="${sand < .98 ? 1 : 0}"/></g>`;
  return `${DEFS}${BG('url(#kData)')}
    <rect x="60" y="380" width="620" height="900" rx="40" fill="#CDEBF5" stroke="${K.line}" stroke-width="6"/><rect x="60" y="380" width="620" height="900" rx="40" fill="url(#kGlowC)"/>
    ${[0, 1].map(i => `<rect x="70" y="${780 + i * 300}" width="600" height="12" fill="${K.fridgeD}"/>`).join('')}
    ${milk(170, 700, 1.1)}${yog(330, 720, 1.1)}${meat(500, 1030, 1.2)}
    ${colony(370, 900, n, 13, 70.9 + (t - 70.9) * .2, { spread: 250, speed: .2 })}${hg}`;
}
