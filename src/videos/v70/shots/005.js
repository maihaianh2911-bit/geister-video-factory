// 10.6–13.96: beside you on the passenger seat your wife panics ("Panik"): she stares at the water at her window, then grabs her face
import { K, DEFS, BG, bust, belt, water, rain, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 12.4, 13.1)), turn = eio(prog(t, 11.0, 11.8));
  const sx = 560, sy = 1040, s = 1.55;
  const breath = 6 * Math.sin(t * 11) * prog(t, 12.0, 12.6);
  const aL = [[lerp(430, 380, up), lerp(1400, 1150, up)], [lerp(470, 470, up), lerp(1500, 905, up)]];
  const aR = [[lerp(690, 740, up), lerp(1400, 1150, up)], [lerp(650, 650, up), lerp(1500, 905, up)]];
  const sc = `${BG('#0E1418')}
    <path d="M -60 260 L 470 300 L 440 900 L -60 960 Z" fill="#0F171C" stroke="${K.ink}" stroke-width="8"/>
    <clipPath id="s5w"><path d="M -60 260 L 470 300 L 440 900 L -60 960 Z"/></clipPath><g clip-path="url(#s5w)">${water(t, 640, { amp: 12 })}${rain(t, 1, 30)}</g>
    <path d="M 470 300 L 1140 240 L 1140 1980 L 440 1980 Z" fill="#161D22"/>
    <path d="M ${sx - 190} 1980 L ${sx - 180} 1000 Q ${sx - 170} 900 ${sx} 895 Q ${sx + 170} 900 ${sx + 180} 1000 L ${sx + 190} 1980 Z" fill="${K.seatL}" stroke="${K.ink}" stroke-width="6"/>
    <rect x="${sx - 110}" y="690" width="220" height="150" rx="44" fill="${K.seatL}" stroke="${K.ink}" stroke-width="6"/>
    ${bust('wom', sx, sy + breath, s, { look: lerp(0, -1, turn), lookY: -.3, brow: 1, mouth: up > .5 ? 'scream' : 'o', t, wide: 1, tilt: lerp(0, -6, turn), aL, aR, belt: belt(sx, sy + breath, s, -1, 1) })}
    ${light(560, 1000, 700, .45)}`;
  return `${DEFS}${sc}`;
}
