// 55.72–60.6: later, in court — Althoff stands before the judge's bench; the Schwebebahn's trip leader in uniform cap steps up beside him
import { K, DEFS, BG, althoff, leiter, TX, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const w = prog(t, 58.3, 59.4), lx = lerp(1250, 720, eio(w));
  // "zahlen": Althoff draws his wallet from the coat and holds it out toward the bench
  const g = eio(prog(t, 56.1, 56.8));
  const a = althoff(360, 1390, 1.1, { look: .6, aL: [10, 20], aR: [lerp(10, 70, g), lerp(20, 60, g)], mouth: 'flat' });
  const wallet = g > .05 ? `<g transform="translate(${f1(a.hR[0] + 6)} ${f1(a.hR[1] - 18)}) rotate(-12)"><rect x="-34" y="-24" width="68" height="46" rx="6" fill="#3A2A20" stroke="${K.ink}" stroke-width="5"/><path d="M -34 -6 H 34" stroke="#5A4434" stroke-width="4"/></g>` : '';
  const bench = `<rect x="-60" y="300" width="1200" height="520" fill="#7A5A40"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 200 - 40}" y="360" width="160" height="400" fill="none" stroke="${K.brownD}" stroke-width="8"/>`).join('')}
    <rect x="-60" y="290" width="1200" height="30" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${DEFS}${BG('#CDBB98')}<rect x="-60" y="-60" width="1200" height="360" fill="#BFA982"/>${bench}
    <rect x="-60" y="820" width="1200" height="1200" fill="#9A7E5E"/>
    ${a.svg}${wallet}
    ${t > 58.3 ? leiter(lx, 1390, 1.1, { walk: w < 1 ? t * 7 : 0, dir: -1, look: -.6, mouth: 'flat' }).svg : ''}${grain(t)}`;
}
