// At night by the lamp: the red friend's hand slides the phone (AKKU 4 %) into the chest pocket, then pulls the zip shut on "Handyakku".
import { K, DEFS60, P, forest, phone, battery, armTo, lab, FG, TX, prog, eio, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const inn = eio(prog(t, 81.95, 82.5)), zip = eout(prog(t, 82.6, 83.2));
  const j = P.red;
  const scr = `${battery(0, -30, .6, .04, K.red)}${TX('4 %', 0, 30, 32, K.red)}`;
  const py = lerp(600, 1080, inn), PX = 560, PT = 900; // pocket opening y
  // hand: holds the phone's right edge while it goes in, then moves to the zip tab
  const zx = lerp(330, 790, zip);
  const toZip = eio(prog(t, 82.45, 82.6));
  const hx = lerp(PX + 140, zx + 10, toZip), hy = lerp(Math.min(py, PT - 20), PT + 10, toZip);
  return DEFS60 + `${forest(t, { hz: 1000, px: 80, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".3"/>
  <ellipse cx="540" cy="1000" rx="620" ry="640" fill="url(#fAmb)" opacity=".4"/>
  <path d="M 120 1920 L 150 640 Q 170 470 360 430 L 720 430 Q 910 470 930 640 L 960 1920 Z" fill="${j.j}" stroke="#0B0F12" stroke-width="10" stroke-linejoin="round"/>
  <path d="M 760 440 Q 910 470 930 640 L 960 1920 L 800 1920 Z" fill="${j.jSh}"/>
  <path d="M 360 430 Q 540 540 720 430" fill="${j.jHi}" stroke="#0B0F12" stroke-width="8"/>
  <path d="M 540 520 V 1920" stroke="${j.jSh}" stroke-width="12"/>
  <clipPath id="pk51"><rect x="0" y="0" width="1080" height="1230"/></clipPath>
  <g clip-path="url(#pk51)">${phone(PX, py, 1.6, 0, { on: 1 - inn * .5, screen: scr })}</g>
  <path d="M 300 ${PT} L 800 ${PT} L 790 1240 Q 550 1270 310 1240 Z" fill="${j.j}" stroke="#0B0F12" stroke-width="10" stroke-linejoin="round"/>
  <path d="M 700 ${PT + 6} L 790 ${PT + 6} L 784 1236 L 720 1244 Z" fill="${j.jSh}"/>
  <path d="M 310 ${PT} L ${zx} ${PT}" stroke="#C9CFD4" stroke-width="14"/>
  <rect x="${zx - 14}" y="${PT - 26}" width="28" height="56" rx="6" fill="#C9CFD4" stroke="#0B0F12" stroke-width="5"/>
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".18"/>
  ${armTo(1180, 1760, hx, hy, 110, j.jSh, -1, j.skin)}
  ${lab('AKKU 4 %', 540, 300, 96, prog(t, 82.54, 82.8), '#FFFFFF', '#0B0F12', K.red)}
  ${FG(1440)}`;
}
