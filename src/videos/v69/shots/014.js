// 43.42–47.6: if nobody answers, call the maintenance number with your phone — the speaker stays silent ("?"), then your phone dials WARTUNG ("Wartungsnummer")
import { K, DEFS, BG, panel, light, label, TX, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const q = back(prog(t, 43.6, 43.95)) * (1 - eout(prog(t, 44.5, 44.8)));
  const ph = eio(prog(t, 44.5, 45.3));
  const call = eout(prog(t, 46.2, 46.6));
  const py = lerp(2100, 920, ph);
  const phoneBig = `<g transform="translate(540 ${f1(py)})"><rect x="-230" y="-430" width="460" height="860" rx="60" fill="#15191C" stroke="${K.ink}" stroke-width="8"/><rect x="-200" y="-390" width="400" height="780" rx="30" fill="#1F2A30"/>
    ${TX('WARTUNG', 0, -180, 60, K.mono)}${TX('···· ····', 0, -90, 54, '#9AA2A8')}
    <circle cx="0" cy="200" r="${f1(70 + 10 * call * Math.sin(t * 10))}" fill="${call > 0 ? '#3FBF6A' : '#2E5A3A'}" stroke="${K.ink}" stroke-width="6"/><path d="M -26 186 q 6 -24 20 -18 l 8 16 q -8 8 0 18 q 10 10 18 0 l 16 8 q 6 14 -18 20 q -40 -4 -44 -44 Z" fill="#fff"/>
    ${call > 0 ? TX('Anruf …', 0, 40, 46, '#3FBF6A') : ''}</g>`;
  const grillQ = q > 0 ? `<g transform="translate(540 620) scale(${f1(q)})"><circle r="90" fill="#05080A" stroke="${K.mono}" stroke-width="6"/><text y="40" text-anchor="middle" fill="${K.mono}" style="font-family:'Inter';font-weight:900;font-size:120px">?</text></g>` : '';
  return `${DEFS}${panel(t, { bellLit: false })}<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity=".55"/>${light(540, 1300, 380, .8)}${grillQ}${phoneBig}${phoneBig ? '' : ''}`;
}
