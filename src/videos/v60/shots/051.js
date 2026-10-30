// The phone with AKKU 4 % slides into the jacket's chest pocket and the zip closes — saved for the call with the control room.
import { K, DEFS60, P, phone, battery, lab, FG, TX, prog, eio, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const inn = eio(prog(t, 82.2, 82.8)), zip = eout(prog(t, 82.8, 83.3));
  const j = P.red;
  const scr = `${battery(0, -30, .6, .04, K.red)}${TX('4 %', 0, 30, 32, K.red)}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="${j.jSh}"/>
  <rect x="0" y="0" width="1080" height="1920" fill="${j.j}"/>
  <path d="M 540 0 V 1920" stroke="${j.jSh}" stroke-width="16"/>
  <path d="M 0 300 Q 300 260 540 330 Q 780 260 1080 300" stroke="${j.jHi}" stroke-width="30" fill="none" opacity=".6"/>
  <clipPath id="pk51"><rect x="0" y="0" width="1080" height="760"/></clipPath>
  <g clip-path="url(#pk51)">${phone(560, lerp(520, 980, inn), 2.0, 0, { on: 1 - inn * .6, screen: scr, glow: false })}</g>
  <path d="M 260 760 L 860 760 L 840 1240 Q 560 1290 280 1240 Z" fill="${j.j}" stroke="#0B0F12" stroke-width="10"/>
  <path d="M 260 760 L ${lerp(260, 860, zip)} 760" stroke="#C9CFD4" stroke-width="16"/>
  <rect x="${lerp(250, 846, zip)}" y="742" width="28" height="56" rx="6" fill="#C9CFD4" stroke="#0B0F12" stroke-width="5"/>
  ${lab('AKKU 4 %', 540, 320, 96, prog(t, 82.5, 82.75), '#FFFFFF', '#0B0F12', K.red)}
  ${FG(1440)}`;
}
