// 55.72–60.6: later, in court — Althoff stands before the judge's bench; the Schwebebahn's trip leader in uniform cap steps up beside him
import { K, DEFS, BG, althoff, leiter, TX, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const w = prog(t, 58.3, 59.4), lx = lerp(1250, 720, eio(w));
  const bench = `<rect x="-60" y="300" width="1200" height="520" fill="#7A5A40"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 200 - 40}" y="360" width="160" height="400" fill="none" stroke="${K.brownD}" stroke-width="8"/>`).join('')}
    <rect x="-60" y="290" width="1200" height="30" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${DEFS}${BG('#CDBB98')}<rect x="-60" y="-60" width="1200" height="360" fill="#BFA982"/>${bench}
    <rect x="-60" y="820" width="1200" height="1200" fill="#9A7E5E"/>
    ${althoff(360, 1390, 1.1, { look: .6, aL: [10, 20], aR: [10, 20], mouth: 'flat' }).svg}
    ${t > 58.3 ? leiter(lx, 1390, 1.1, { walk: w < 1 ? t * 7 : 0, dir: -1, look: -.6, mouth: 'flat' }).svg : ''}${grain(t)}`;
}
