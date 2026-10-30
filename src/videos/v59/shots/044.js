// 72.48–74.6: lift shaft cut-away: the cabin rides down through the burning building, jolts and its light dies on "ausfallen".
import { K, DEFS, FG, prog, eio, ein, shk, smokeMass } from './lib.js';
export default function renderShot(t) {
  const stop = 74.18;
  const y = 260 + 520 * eio(prog(t, 72.48, stop)) + (t > stop ? 18 * Math.exp(-(t - stop) * 6) * Math.sin((t - stop) * 40) : 0);
  const light = t < stop ? 1 : (t < stop + .25 && Math.sin(t * 90) > 0 ? .6 : 0);
  const [sx, sy] = shk(t, stop, 14, 6);
  let floors = '';
  for (let i = 0; i < 7; i++) floors += `<rect x="200" y="${150 + i * 220}" width="680" height="16" fill="#3A4B56" stroke="#0B0F12" stroke-width="4"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A1F23"/>
    <g transform="translate(${sx} ${sy})">
    <rect x="300" y="-60" width="480" height="2040" fill="#101418" stroke="#0B0F12" stroke-width="10"/>${floors}
    <path d="M 440 -60 V ${y} M 640 -60 V ${y}" stroke="#7D8D97" stroke-width="6"/>
    <ellipse cx="540" cy="1260" rx="400" ry="220" fill="url(#vFire)" opacity=".7"/>
    ${smokeMass(t, 300, 900, 480, 500, { n: 10, r: 90, seed: 13 })}
    <rect x="360" y="${y}" width="360" height="400" rx="12" fill="#5A6A74" stroke="#0B0F12" stroke-width="8"/>
    <rect x="390" y="${y + 30}" width="300" height="340" fill="${light > .5 ? '#FFE7A8' : '#202830'}"/>
    ${light > .5 ? `<ellipse cx="540" cy="${y + 200}" rx="260" ry="240" fill="url(#vAmb)"/>` : ''}
    </g>
    ${FG(1430)}`;
}
