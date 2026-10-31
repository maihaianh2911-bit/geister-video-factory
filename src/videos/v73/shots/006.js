// 13.553–15.606: at the Loveparade in Duisburg — the yellow town sign DUISBURG swings into frame, a festival flyer LOVEPARADE is pinned beside it
import { K, DEFS, BG, card, grain, TX, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const fl = back(prog(t, 13.85, 14.2)), sg = back(prog(t, 14.5, 14.85));
  const flyer = fl <= 0 ? '' : `<g transform="translate(330 620) rotate(${f1(-6 * fl)}) scale(${f1(fl)})"><rect x="-210" y="-260" width="420" height="520" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>
    ${[...Array(5)].map((_, i) => `<path d="M -170 ${-150 + i * 46} q 170 ${-40 + i * 10} 340 0" fill="none" stroke="${[K.red, '#C98B3A', K.olive, '#6E7FA0', K.redL][i]}" stroke-width="14"/>`).join('')}
    ${TX('LOVEPARADE', 0, 140, 58, K.ink)}<circle cx="0" cy="-240" r="14" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/></g>`;
  const sign = sg <= 0 ? '' : `<g transform="translate(620 1080) scale(${f1(sg)})"><rect x="-8" y="0" width="16" height="400" fill="#7A7A72" stroke="${K.ink}" stroke-width="4"/>
    <rect x="-300" y="-200" width="600" height="230" rx="18" fill="#D9B64A" stroke="${K.ink}" stroke-width="7"/><rect x="-280" y="-182" width="560" height="194" rx="10" fill="none" stroke="${K.ink}" stroke-width="5"/>${TX('Duisburg', 0, -50, 100, K.ink)}</g>`;
  return `${DEFS}${BG('url(#lSky)')}${grain(6)}<rect x="-60" y="1440" width="1200" height="600" fill="${K.concreteD}"/>${flyer}${sign}`;
}
