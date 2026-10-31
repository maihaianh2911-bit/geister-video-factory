import { P, ST, fig, office, frame, tag, prog, eout, back, lerp, hash } from './lib.js';
// 3.9–5.6 Mayor's office: two soldiers stride in and seize the mayor by both arms on "verhaften".
export default function renderShot(t) {
  const enter = eout(prog(t, 3.92, 4.55));
  const grab = back(prog(t, 4.62, 4.84));
  const lift = 60 * eout(prog(t, 4.84, 5.1));
  let papers = '';
  if (t > 4.84) for (let i = 0; i < 7; i++) { const p = prog(t, 4.84, 5.5); papers += `<rect x="${560 + (i - 3) * 60 * (1 + 3 * p)}" y="${1140 - 500 * p + 900 * p * p * (.5 + hash(i))}" width="90" height="110" fill="${P.white}" ${ST(4)} transform="rotate(${p * 360 * (hash(i) - .5)} ${560 + (i - 3) * 60} 1140)"/>`; }
  const startled = t > 4.1;
  const mayor = fig(560, 1640 - lift, 1.3, { kind: 'mayor', aL: lerp(10, 62, grab), aR: lerp(-10, -62, grab), eyeS: startled ? 1.7 : 1, look: startled && t < 4.8 ? -12 : 0, mouth: startled ? 'o' : 'flat', brow: startled ? 'worried' : 'calm', sweat: t > 4.6 });
  return frame(t, `${office(t)}
    ${fig(lerp(-220, 330, enter), 1660, 1.2, { kind: 'soldier', walk: enter < 1 ? t * 9 : undefined, aR: lerp(-10, -88, grab), look: 12, brow: 'angry' })}
    ${fig(lerp(1300, 790, enter), 1660, 1.2, { kind: 'soldier', walk: enter < 1 ? t * 9 + 1 : undefined, aL: lerp(10, 88, grab), look: -12, brow: 'angry' })}
    ${mayor}
    <rect x="200" y="1200" width="760" height="40" fill="${P.woodHi}" ${ST(6)}/><rect x="230" y="1240" width="700" height="400" fill="${P.wood}" ${ST(6)}/>
    ${t < 4.84 ? `<rect x="480" y="1170" width="160" height="40" fill="${P.white}" ${ST(4)}/>` : ''}${papers}
    ${tag(560, 330, 'BÜRGERMEISTER', back(prog(t, 3.96, 4.2)), { rot: -2 })}`);
}
