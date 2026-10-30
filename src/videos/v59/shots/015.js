// 23.6–25.22: what the smoke would do: point of view at the open door — eyelids sink, the picture fades to black on "bewusstlos".
import { K, DEFS, FG, prog, eio, ein, back, stairwell, cl } from './lib.js';
export default function renderShot(t) {
  const lid = ein(prog(t, 23.8, 24.7));
  const sway = 6 * Math.sin(t * 2.3) * prog(t, 23.6, 25.2);
  const blur = 2 + 10 * lid;
  const top = 960 * lid * (1 - .12 * Math.sin(prog(t, 24.0, 24.3) * Math.PI));
  return `${DEFS}<filter id="v15b"><feGaussianBlur stdDeviation="${blur.toFixed(1)}"/></filter>
    <g transform="rotate(${sway} 540 900)" filter="url(#v15b)">${stairwell(t)}</g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.red}" opacity="${.15 + .2 * lid}"/>
    <path d="M -60 -60 H 1140 V ${top - 60} Q 540 ${top + 120} -60 ${top - 60} Z" fill="#050607"/>
    <path d="M -60 1980 H 1140 V ${1980 - top * .9} Q 540 ${1980 - top * .9 - 140} -60 ${1980 - top * .9} Z" fill="#050607"/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#000" opacity="${.5 * prog(t, 24.6, 25.2)}"/>
    ${FG(1430)}`;
}
