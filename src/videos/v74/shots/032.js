import { P, R, ST, fig, rifle, frame, tag, prog, eout, back, hash } from './lib.js';
// 66.7–68.9 In the cinema: the projector beam lights the screen; the captain marches with his soldiers in black and white ("Leinwand").
export default function renderShot(t) {
  const on = eout(prog(t, 66.8, 67.22));
  const flick = .85 + .15 * hash(Math.floor(t * 18));
  const mv = (t - 66.8) * 120;
  let film = `${R(140, 260, 800, 600, '#D8D4CC')}${R(140, 760, 800, 100, '#9C978E')}`;
  for (let i = 3; i >= 1; i--) film += fig(260 + mv - i * 90, 840, .38, { kind: 'soldier', walk: t * 8 + i, backR: rifle, aR: -6, look: 10, shadow: false });
  film += fig(330 + mv, 845, .42, { kind: 'voigt', walk: t * 8, aR: -8, look: 10, brow: 'angry', shadow: false });
  let heads = '';
  for (let i = 0; i < 9; i++) heads += `<circle cx="${i * 130 + 20}" cy="${1520 + 20 * hash(i)}" r="${72 + 10 * hash(i + 2)}" fill="#1A1412"/><rect x="${i * 130 - 60}" y="${1560 + 20 * hash(i)}" width="160" height="400" rx="60" fill="#1A1412"/>`;
  return frame(t, `${R(0, 0, 1080, 1920, '#241A16')}
    <filter id="v74bw"><feColorMatrix type="saturate" values="0"/></filter>
    <rect x="120" y="240" width="840" height="640" fill="#141010" ${ST(6)}/>
    <clipPath id="v74scr"><rect x="140" y="260" width="800" height="600"/></clipPath>
    <g clip-path="url(#v74scr)" filter="url(#v74bw)" opacity="${(on * flick).toFixed(2)}">${film}</g>
    <polygon points="1000,1300 140,260 940,860" fill="#FFF4D6" opacity="${(.22 * on).toFixed(2)}"/>
    <g transform="translate(1000 1300)"><rect x="-70" y="-50" width="160" height="110" rx="12" fill="${P.black}" ${ST(5)}/><circle cx="-30" cy="-80" r="50" fill="${P.steel}" ${ST(5)} transform="rotate(${t * 300} -30 -80)"/><circle cx="60" cy="-80" r="50" fill="${P.steel}" ${ST(5)}/><circle cx="-70" cy="0" r="16" fill="#FFF4D6" opacity="${on}"/></g>
    ${heads}
    ${tag(540, 1000, 'LEINWAND', back(prog(t, 67.22, 67.45)), { sz: 56, rot: 2 })}`);
}
