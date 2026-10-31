import { P, R, ST, fig, wallpaper, frame, tag, prog, eout, ein, back, lerp } from './lib.js';
// 36.2–38.2 The city treasurer at his ledger: a soldier's hand lands on his shoulder on "verhaften"; the quill drops, he raises his hands.
export default function renderShot(t) {
  const enter = eout(prog(t, 36.3, 36.95));
  const hand = eout(prog(t, 36.95, 37.2));
  const up = back(prog(t, 37.3, 37.6));
  const write = t < 37.2 ? 4 * Math.sin(t * 30) : 0;
  const q = prog(t, 37.22, 37.7);
  const quill = t < 37.22 ? (hx, hy) => `<path transform="translate(${hx} ${hy})" d="M 0 0 Q 30 -60 10 -120 Q -10 -60 0 0 Z" fill="${P.white}" ${ST(4)}/>` : null;
  const quillFall = t >= 37.22 ? `<path transform="translate(${600 + 40 * q} ${1150 + 70 * ein(q)}) rotate(${80 * q})" d="M 0 0 Q 30 -60 10 -120 Q -10 -60 0 0 Z" fill="${P.white}" ${ST(4)}/>` : '';
  return frame(t, `${wallpaper('#D9C8A2', '#C9B68E')}${R(0, 1250, 1080, 700, P.woodSh)}
    <g filter="url(#drop)"><rect x="90" y="300" width="300" height="420" fill="${P.woodSh}" ${ST(6)}/>${[0, 1, 2, 3].map(i => `<rect x="${110 + i * 68}" y="330" width="56" height="170" fill="${['#8E4E46', '#4E6B4A', '#24324F', '#8A6E52'][i]}" ${ST(4)}/>`).join('')}${[0, 1, 2, 3].map(i => `<rect x="${110 + i * 68}" y="520" width="56" height="170" fill="${['#4E6B4A', '#8A6E52', '#8E4E46', '#24324F'][i]}" ${ST(4)}/>`).join('')}</g>
    ${fig(500, 1560, 1.25, { kind: 'secretary', aL: up > 0 ? lerp(25, 150, up) : 25, bendL: up > 0 ? lerp(-60, -20, up) : -60, aR: up > 0 ? lerp(-50, -150, up) : -50 + write, bendR: up > 0 ? lerp(-50, 20, up) : -50, propR: quill, look: t > 37.2 ? 12 : 0, lookY: t > 37.2 ? -4 : 12, eyeS: t > 37.2 ? 1.6 : 1, mouth: t > 37.2 ? 'o' : 'flat', brow: t > 37.2 ? 'worried' : 'calm' })}
    ${fig(lerp(1300, 860, enter), 1640, 1.25, { kind: 'soldier', walk: enter < 1 ? t * 8 : undefined, aL: lerp(10, 92, hand), bendL: lerp(0, 20, hand), look: -12, brow: 'angry' })}
    <rect x="160" y="1180" width="760" height="40" fill="${P.woodHi}" ${ST(6)}/><rect x="190" y="1220" width="700" height="420" fill="${P.wood}" ${ST(6)}/>
    <g transform="translate(470 1160) rotate(-4)"><rect x="-130" y="-30" width="260" height="40" fill="${P.white}" ${ST(4)}/><path d="M 0 -30 V 10" ${ST(3)}/></g>${quillFall}
    ${tag(540, 300, 'STADTKÄMMERER', back(prog(t, 36.44, 36.68)), { rot: 2 })}`);
}
