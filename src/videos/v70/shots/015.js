// 35.08–36.46: everyone out ("bringt alle hinaus"): beside the sinking car the four of you wade toward the bank, the adults holding the children
import { K, DEFS, BG, carSide, headOf, water, rain, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const u = eio(prog(t, 35.08, 36.46));
  const gx = lerp(700, 470, u);
  const bob = i => 6 * Math.sin(t * 4 + i);
  const group = `${headOf('you', gx + 60, 1120 + bob(0), .95, { look: -1, brow: .6, mouth: 'flat' })}${headOf('kidB', gx - 10, 1060 + bob(1), .7, { look: -1, brow: .7, mouth: 'flat' })}
    ${headOf('wom', gx - 120, 1130 + bob(2), .92, { look: -1, brow: .6, mouth: 'flat' })}${headOf('kidA', gx - 190, 1075 + bob(3), .72, { look: -1, brow: .6, mouth: 'flat' })}
    <path d="M ${f1(gx + 10)} 1110 q -10 -40 -20 -40 M ${f1(gx - 160)} 1120 q 0 -40 -16 -50" stroke="${K.ink}" stroke-width="30" stroke-linecap="round" fill="none"/>`;
  const sc = `${BG('url(#eSky)')}<path d="M -60 1000 L 220 1000 Q 300 1040 330 1180 L -60 1180 Z" fill="#1A2A24" stroke="${K.ink}" stroke-width="6"/>
    ${carSide(t, 860, 1290 + lerp(0, 30, u), .7, { tilt: 9, lights: .2, inner: .3, winF: 1, winR: 1, people: false, id: 's15c' })}
    ${group}${water(t, 1130, { amp: 10, alpha: .93 })}${rain(t, .9, 60)}${light(gx - 60, 1100, 360, .5)}`;
  return `${DEFS}${sc}`;
}
