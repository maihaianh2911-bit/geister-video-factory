// 33.3–35.08: you help the children out through the open window ("durch das Fenster"): Lena climbs out over the door edge, your hands at her waist
import { K, DEFS, BG, bust, arm, water, rain, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const u = eio(prog(t, 33.4, 34.9));
  // window opening (car side, close): sill at y 1000 between x 160 and 900
  const kx = lerp(560, 600, u), ky = lerp(1120, 770, u); // Lena's shoulder line rises through the opening
  const kidArmsR = [[kx + 120, ky - 40], [lerp(kx + 160, 940, u), lerp(ky - 160, 560, u)]];
  const kidArmsL = [[kx - 110, ky - 30], [lerp(kx - 150, 260, u), lerp(ky - 160, 600, u)]];
  const yh = [kx - 40, ky + 230], yh2 = [kx + 60, ky + 236];
  const sc = `${BG('url(#eSky)')}
    <path d="M -60 1000 L 1140 1000 L 1140 1980 L -60 1980 Z" fill="${K.car}" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 160 1000 L 300 560 L 900 540 L 960 1000 Z" fill="#0E1418" stroke="${K.ink}" stroke-width="8"/>
    <path d="M 200 560 Q 560 470 940 540 L 1140 520 L 1140 470 L -60 500 L -60 560 Z" fill="${K.car}" stroke="${K.ink}" stroke-width="6"/>
    <clipPath id="s14o"><path d="M -60 -60 L 1140 -60 L 1140 1000 L -60 1000 Z"/></clipPath>
    <g clip-path="url(#s14o)">
      ${arm([kx - 120, ky + 380], [kx - 130, ky + 300], yh, 1.1, K.you)}${arm([kx + 160, ky + 380], [kx + 150, ky + 310], yh2, 1.1, K.you)}
      ${bust('kidA', kx, ky, 1.6, { look: .4, lookY: -.6, brow: .8, mouth: 'flat', aR: kidArmsR, aL: kidArmsL, tilt: 4 })}
    </g>
    <path d="M -60 1000 H 1140" stroke="${K.carL}" stroke-width="18"/>
    ${water(t, 1180, { amp: 12 })}${rain(t, 1, 60)}${light(560, 760, 520, .55)}`;
  return `${DEFS}${sc}`;
}
