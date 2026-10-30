// 65.0–68.7: the ruling — on a court sheet a carriage and an elephant are drawn; a red cross and the stamp UNGEEIGNET land on "ungeeignet"
import { K, DEFS, BG, tuffi, stamp, TX, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 65.0, 65.8));
  const x = eout(prog(t, 66.2, 66.6));
  return `${DEFS}${BG('#7A5A40')}
    <g transform="rotate(-2 540 900)"><rect x="140" y="300" width="800" height="1080" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/>
    ${TX('§', 540, 430, 90, K.ink)}${[0, 1, 2].map(i => `<path d="M 220 ${490 + i * 40} H ${860 - i * 120}" stroke="#B9A986" stroke-width="10"/>`).join('')}
    <g opacity="${f1(d)}"><path d="M 220 690 H 860" stroke="${K.steel}" stroke-width="10"/><path d="M 540 690 V 740" stroke="${K.steel}" stroke-width="10"/>
      <rect x="330" y="740" width="420" height="140" rx="22" fill="${K.olive}" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2, 3].map(i => `<rect x="${360 + i * 96}" y="765" width="70" height="60" rx="5" fill="${K.glass}" stroke="${K.ink}" stroke-width="4"/>`).join('')}
      ${tuffi(560, 1220, .6, { ear: .3, tr: .2 })}</g>
    <path d="M 300 700 L 800 1240 M 800 700 L 300 1240" stroke="${K.red}" stroke-width="22" stroke-linecap="round" stroke-dasharray="${f1(x * 740)} 740" opacity=".85"/></g>
    ${stamp(540, 1160, 'UNGEEIGNET', 84, prog(t, 67.3, 67.6), -10)}${grain(t)}`;
}
