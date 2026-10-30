// 70.6–72.48: close: the father's hand grabs the neighbour's sleeve and pulls him back from the lift on "Haltet … zurück".
import { K, DEFS, FG, prog, eio, back, shk, armTo, grip } from './lib.js';
export default function renderShot(t) {
  const g = back(prog(t, 70.85, 71.05));
  const pull = eio(prog(t, 71.3, 71.75));
  const [sx, sy] = shk(t, 71.0, 10, 7);
  const ax = 780 - 260 * pull;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#2B2F33"/>
    <rect x="700" y="200" width="420" height="1100" fill="#7D8D97" stroke="#0B0F12" stroke-width="8"/><path d="M 910 200 V 1300" stroke="#0B0F12" stroke-width="6"/>
    <g transform="translate(${sx} ${sy})">
    <path d="M ${ax - 520} 600 L ${ax + 180} 700 L ${ax + 170} 900 L ${ax - 520} 860 Z" fill="#8A9096" stroke="#0B0F12" stroke-width="8"/>
    <ellipse cx="${ax + 230}" cy="790" rx="80" ry="70" fill="#D6A07C" stroke="#0B0F12" stroke-width="7"/>
    ${armTo(-80, 1500, ax - 60 + 160 * (1 - g), 790 + 220 * (1 - g), 120, K.vTop, 1)}
    ${g > .2 ? grip(ax - 60, 780, 1.4, -80) : ''}
    </g>
    ${FG(1430)}`;
}
