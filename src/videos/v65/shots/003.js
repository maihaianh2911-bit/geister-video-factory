// 4.82–6.98: you sleep next to the open window; the buzz line by the ear flattens to silence on "nichts"
import { K, DEFS, BG, vig, stars, head, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const q = eio(prog(t, 5.25, 5.85));
  const br = Math.sin(t * 2.4) * 6;
  let wave = 'M 560 520';
  for (let i = 1; i <= 40; i++) { const x = 560 + i * 9; wave += ` L ${x} ${f1(520 + (1 - q) * Math.sin(i * 1.3 + t * 30) * (18 + 12 * Math.sin(i * .4)))}`; }
  const winX = 120;
  const curt = `<path d="M ${winX + 330} 220 Q ${f1(winX + 380 + 30 * Math.sin(t * 1.5))} 520 ${f1(winX + 360 + 20 * Math.sin(t * 1.5 + .6))} 760 L ${winX + 420} 760 Q ${winX + 420} 480 ${winX + 400} 220 Z" fill="#3B2F5A" stroke="${K.ink}" stroke-width="4"/>`;
  const room = `${BG(K.wall)}
    <rect x="${winX}" y="220" width="330" height="520" fill="url(#mNight)" stroke="${K.ink}" stroke-width="10"/>
    <g clip-path="url(#w3c)">${stars(20, 11, 600).replace(/cx="([\d.]+)"/g, (m, v) => `cx="${f1(winX + (+v) * .3)}"`).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${f1(220 + (+v) * .8)}"`)}</g>
    <clipPath id="w3c"><rect x="${winX}" y="220" width="330" height="520"/></clipPath>
    <path d="M ${winX} 220 L ${winX - 70} 240 L ${winX - 70} 720 L ${winX} 740 Z" fill="#9FB3E0" fill-opacity=".35" stroke="${K.ink}" stroke-width="4"/>
    ${curt}
    <polygon points="${winX},740 ${winX + 330},740 ${winX + 560},1180 ${winX - 60},1180" fill="#9FB3E0" opacity=".07"/>
    <rect x="40" y="900" width="1000" height="70" rx="20" fill="${K.woodD}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 60 980 Q 300 940 520 960 L 520 1160 L 60 1160 Z" fill="${K.sheet}" stroke="${K.ink}" stroke-width="4"/>
    <ellipse cx="300" cy="880" rx="210" ry="70" fill="#E9EEF9" stroke="${K.ink}" stroke-width="4"/>
    ${head(330, 830 + br * .2, 1.1, { sleep: true, rot: -78 })}
    <path d="M 160 ${f1(960 + br)} Q 420 ${f1(890 + br)} 700 ${f1(900 + br)} Q 900 ${f1(910 + br)} 1040 960 L 1040 1300 L 140 1300 Z" fill="#4C64B8" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 300 ${f1(1010 + br)} Q 600 960 900 1000" fill="none" stroke="#3A4F9A" stroke-width="8"/>
    <path d="${wave}" fill="none" stroke="${K.cyan}" stroke-width="5" stroke-linecap="round" opacity="${f1(.95 - .35 * q)}"/>`;
  return `${DEFS}${cam(room, lerp(1.05, 1.12, eio(prog(t, 4.82, 6.98))), 520, 780)}${vig()}`;
}
