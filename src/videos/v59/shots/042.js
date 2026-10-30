// 68.8–70.6: on the landing a neighbour in a grey bathrobe heads for the lift; the call button glows in the haze.
import { K, DEFS, FG, prog, eio, lerp, smokeMass, TX } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 68.8, 70.4));
  const nx = lerp(160, 470, p), ph = t * 10;
  const b = Math.sin(t * 8) > 0 ? 1 : .5;
  const L = (a) => `<path d="M 0 300 L ${60 * Math.sin(a)} 600" stroke="#0B0F12" stroke-width="64" stroke-linecap="round"/><path d="M 0 300 L ${60 * Math.sin(a)} 600" stroke="#5A6168" stroke-width="48" stroke-linecap="round"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#2B2F33"/>
    <rect x="-60" y="1300" width="1200" height="700" fill="#24272A"/>
    <rect x="560" y="360" width="440" height="940" fill="#3A464E" stroke="#0B0F12" stroke-width="10"/>
    <rect x="590" y="400" width="185" height="900" fill="${'#7D8D97'}" stroke="#0B0F12" stroke-width="6"/><rect x="785" y="400" width="185" height="900" fill="#7D8D97" stroke="#0B0F12" stroke-width="6"/>
    <rect x="690" y="270" width="180" height="70" rx="10" fill="#101418" stroke="#0B0F12" stroke-width="5"/>${TX('▲▼', 780, 322, 44, K.amb)}
    <rect x="1010" y="760" width="50" height="110" rx="10" fill="#22282C" stroke="#0B0F12" stroke-width="5"/>
    <circle cx="1035" cy="815" r="16" fill="${K.amb}" opacity="${b}"/><circle cx="1035" cy="815" r="40" fill="url(#vAmb)" opacity="${b}"/>
    <g transform="translate(${nx} 640) scale(.95)">${L(ph)}${L(ph + Math.PI)}
      <path d="M -120 40 Q -120 -10 -70 -20 L 70 -20 Q 120 -10 120 40 L 130 420 L -130 420 Z" fill="#8A9096" stroke="#0B0F12" stroke-width="6"/>
      <path d="M 120 40 L 200 260" stroke="#0B0F12" stroke-width="60" stroke-linecap="round"/><path d="M 120 40 L 200 260" stroke="#8A9096" stroke-width="44" stroke-linecap="round"/>
      <ellipse cx="0" cy="-110" rx="72" ry="86" fill="#D6A07C" stroke="#0B0F12" stroke-width="6"/>
      <path d="M -74 -120 Q -70 -210 0 -210 Q 70 -210 74 -120 Q 40 -170 -74 -120 Z" fill="#B9B9B9" stroke="#0B0F12" stroke-width="6"/></g>
    ${smokeMass(t, -60, -60, 1200, 520, { n: 14, r: 110, seed: 6, op: .7 })}
    ${FG(1430)}`;
}
