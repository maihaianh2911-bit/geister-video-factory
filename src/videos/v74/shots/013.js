import { KIND, P, R, ST, fig, hat, wallpaper, frame, prog, eio, eout, lerp, ring } from './lib.js';
// 23.0–25.1 He buttons the old uniform coat, lifts the spiked helmet from the table and sets it on his head ("Uniform an").
export default function renderShot(t) {
  const btn = t < 23.85 ? Math.abs(Math.sin((t - 23.0) * 7)) : 0;
  const lift = eio(prog(t, 23.9, 24.36));
  const on = t >= 24.36;
  const drop = eout(prog(t, 24.5, 24.85));
  const aR = on ? lerp(-150, -10, drop) : lerp(-40, -150, lift), bendR = on ? lerp(-40, 0, drop) : lerp(0, -40, lift);
  const aL = t < 23.85 ? 26 : lerp(26, 10, prog(t, 23.85, 24.1)), bendL = t < 23.85 ? -112 - 14 * btn : lerp(-112, 0, prog(t, 23.85, 24.1));
  const carry = on ? null : (hx, hy) => `<g transform="translate(${hx - 93} ${hy + 59})"><g transform="translate(0 610)">${hat('pickel', KIND.voigt)}</g></g>`;
  const settle = on ? ring(t, 24.36, 4, 9) * 2 : 0;
  return frame(t, `${wallpaper('#D8C9A6', '#C8B48C')}${R(0, 1460, 1080, 480, P.woodSh)}
    <g filter="url(#drop)"><rect x="700" y="330" width="260" height="380" rx="120" fill="${P.gold}" ${ST(6)}/><rect x="722" y="352" width="216" height="336" rx="104" fill="#CFE0D8"/><path d="M 760 420 L 800 380 M 770 470 L 850 390" stroke="${P.white}" stroke-width="10" opacity=".7"/></g>
    <rect x="420" y="1465" width="420" height="30" fill="${P.wood}" ${ST(5)}/><rect x="440" y="1495" width="24" height="300" fill="${P.woodSh}" ${ST(4)}/><rect x="796" y="1495" width="24" height="300" fill="${P.woodSh}" ${ST(4)}/>
    ${fig(300, 1700, 1.4, { kind: 'voigt', hat: on ? 'pickel' : 'none', aR, bendR, aL, bendL, propR: carry, headDy: settle, look: on ? 6 : 10, lookY: on ? -2 : 8 * (1 - lift), brow: on ? 'angry' : 'calm', mouth: 'flat' })}`);
}
