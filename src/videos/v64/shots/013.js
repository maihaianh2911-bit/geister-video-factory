// 25.48–28.58: she had ridden a tram before — a tram rolls along a street with Tuffi calm on its open rear platform; ✓ on "ohne Probleme"
import { K, DEFS, tuffi, town, grain, f1, TX, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const x = lerp(-120, 300, eio(prog(t, 25.48, 27.4)));
  const tram = `<g transform="translate(${f1(x)} 0)">
    <path d="M 120 760 L 500 520" stroke="${K.ink}" stroke-width="6"/><path d="M -60 520 H 1300" stroke="${K.ink}" stroke-width="4"/>
    <rect x="0" y="760" width="760" height="420" rx="30" fill="${K.cream}" stroke="${K.ink}" stroke-width="6"/>
    <rect x="0" y="1060" width="760" height="120" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/>
    ${[0, 1, 2].map(i => `<rect x="${330 + i * 140}" y="820" width="110" height="140" rx="8" fill="${K.glass}" stroke="${K.ink}" stroke-width="5"/>`).join('')}
    <rect x="30" y="800" width="270" height="270" fill="#4C443B" stroke="${K.ink}" stroke-width="5"/>
    ${tuffi(170, 1066, .56, { ear: .3, tr: .2 + .1 * Math.sin(t * 2) })}
    <path d="M 30 980 H 300" stroke="${K.steel}" stroke-width="10"/>
    <circle cx="150" cy="1190" r="44" fill="${K.steel}" stroke="${K.ink}" stroke-width="6"/><circle cx="610" cy="1190" r="44" fill="${K.steel}" stroke="${K.ink}" stroke-width="6"/></g>`;
  const ck = eout(prog(t, 27.62, 27.95));
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${town(1000, { spire: false })}
    <rect x="-60" y="990" width="1200" height="1000" fill="#A89C84"/><rect x="-60" y="1225" width="1200" height="16" fill="${K.steel}"/>${tram}
    ${ck > 0 ? `<g transform="translate(860 520)"><circle r="110" fill="${K.paperL}" stroke="${K.olive}" stroke-width="12"/><path d="M -50 0 L -12 40 L 56 -46" fill="none" stroke="${K.olive}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(ck * 200)} 200"/></g>` : ''}${grain(t)}`;
}
