// 62.36–67.14: WÄRME RAUS — fridge cutaway: heat arrows leave the cold interior through the pipes at the back and go out into the kitchen ("an die Küche ab")
import { K, DEFS, BG, kcard, arrow, milk, yog, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const a1 = prog(t, 63.2, 64.6), a2 = prog(t, 65.0, 66.6);
  let inA = '', outA = '';
  for (let i = 0; i < 3; i++) { const u = (a1 * 1.5 + i / 3) % 1; if (a1 > 0) inA += arrow(lerp(320, 620, u), 560 + i * 200, lerp(320, 620, u) + 90, 560 + i * 200, K.sun, 12, Math.sin(u * Math.PI) * .9); }
  for (let i = 0; i < 4; i++) { const u = (a2 * 1.5 + i / 4) % 1; if (a2 > 0) outA += arrow(760 + 120 * u, 480 + i * 170, 760 + 120 * u + 80, 480 + i * 170 - 30, K.sun, 12, Math.sin(u * Math.PI)); }
  let coil = 'M 690 430';
  for (let i = 0; i < 9; i++) coil += ` L ${i % 2 ? 690 : 740} ${430 + i * 90}`;
  const glowB = eout(prog(t, 64.6, 65.4));
  return `${DEFS}${BG('url(#kData)')}
    <rect x="140" y="380" width="600" height="900" rx="40" fill="#E9EEF6" stroke="${K.line}" stroke-width="6"/>
    <rect x="180" y="420" width="470" height="820" rx="24" fill="#CDEBF5" stroke="${K.ink}" stroke-width="4"/><rect x="180" y="420" width="470" height="820" rx="24" fill="url(#kGlowC)"/>
    ${[0, 1, 2].map(i => `<rect x="190" y="${640 + i * 200}" width="450" height="12" fill="${K.fridgeD}"/>`).join('')}
    ${milk(260, 570)}${yog(400, 600)}${milk(300, 780, .9)}
    <path d="${coil}" fill="none" stroke="${K.sun}" stroke-width="12" stroke-linejoin="round" opacity="${f1(.5 + .5 * glowB)}"/>
    ${inA}${outA}
    ${kcard(540, 220, 'WÄRME RAUS', prog(t, 62.5, 62.8), { sz: 80, col: K.sun })}
    ${TXlab(t)}`;
}
const TXlab = t => `<text x="410" y="1340" text-anchor="middle" fill="${K.cold}" style="font-family:'Inter';font-weight:900;font-size:44px">INNEN</text><text x="860" y="1340" text-anchor="middle" fill="${K.sun}" opacity="${f1(eout(prog(t, 65.6, 66.0)))}" style="font-family:'Inter';font-weight:900;font-size:44px">KÜCHE</text>`;
