import { G, P, ST, TX, deskTop, fig, hat, polaroid, frame, cl, prog, eio, eout, lerp, hash } from './lib.js';
// 13.28–15.22 The file slides in, the photo develops: the man's name WILHELM VOIGT is typed on "Wilhelm Voigt".
export default function renderShot(t) {
  const sl = eout(prog(t, 13.28, 13.62));
  const fx = lerp(1300, 560, sl);
  const dev = eio(prog(t, 13.45, 14.2));
  const name = 'WILHELM VOIGT';
  const n = Math.floor(cl((t - 13.84) / .9) * name.length + (t >= 13.84 ? 1 : 0));
  const mug = G('translate(0 1250) scale(2.2)', fig(0, 0, 1, { kind: 'voigtCiv', hat: 'none', mouth: 'flat', look: 0 }));
  return frame(t, `${deskTop()}
    <g transform="translate(${fx} 860) rotate(${lerp(8, -3, sl)})" filter="url(#drop)">
      <path d="M -420 -520 L -160 -520 L -130 -470 L 420 -470 L 420 520 L -420 520 Z" fill="#D9B878" ${ST(6)}/>
      <rect x="-380" y="-430" width="760" height="910" fill="#F2E7CF" ${ST(4)}/>
      ${Array.from({ length: 7 }, (_, i) => `<path d="M 40 ${-200 + i * 56} h ${300 - 60 * hash(i)}" stroke="#9A8A72" stroke-width="9"/>`).join('')}
      ${polaroid(-170, -130, -5, .9, dev, mug)}
      <path d="M -230 -360 q 0 -50 30 -50 q 30 0 30 50 v 120" fill="none" stroke="${P.silver}" stroke-width="10"/>
      <rect x="-340" y="250" width="680" height="120" rx="8" fill="${P.white}" ${ST(4)}/>
      ${TX(-310, 335, 72, name.slice(0, Math.min(n, name.length)), P.ink, { anchor: 'start', ls: 2 })}
    </g>`);
}
