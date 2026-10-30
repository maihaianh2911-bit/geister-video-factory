// 35.08–36.46: everyone out ("bringt alle hinaus"): beside the half-sunk car the four of you move through the water toward the bank, the adults holding the children
import { K, DEFS, BG, carSide, headOf, arm, water, rain, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const u = eio(prog(t, 35.08, 36.46));
  const gx = lerp(620, 470, u);
  const bob = i => 6 * Math.sin(t * 4 + i);
  // adults carry a child each: the child's head sits on the adult's shoulder, the adult's arm wraps the child
  const group = `${headOf('kidB', gx + 130, 1020 + bob(1), .95, { look: -1, brow: .7, mouth: 'flat' })}${headOf('you', gx + 230, 1080 + bob(0), 1.25, { look: -1, brow: .6, mouth: 'flat' })}
    ${arm([gx + 270, 1170], [gx + 160, 1150], [gx + 110, 1090], 1.1, K.you)}
    ${headOf('kidA', gx - 200, 1030 + bob(3), 1.0, { look: -1, brow: .6, mouth: 'flat' })}${headOf('wom', gx - 90, 1090 + bob(2), 1.2, { look: -1, brow: .6, mouth: 'flat' })}
    ${arm([gx - 60, 1180], [gx - 170, 1160], [gx - 230, 1100], 1.1, K.wom)}`;
  const sc = `${BG('url(#eSky)')}<path d="M -60 1020 L 120 1020 Q 200 1060 220 1200 L -60 1200 Z" fill="#1A2A24" stroke="${K.ink}" stroke-width="6"/>
    ${carSide(t, 900, 1180 + lerp(0, 25, u), .55, { tilt: 9, lights: .2, inner: .3, winF: 1, winR: 1, people: false, id: 's15c' })}
    ${water(t, 1050, { x0: 150, amp: 6, alpha: .9 })}
    ${group}${water(t, 1160, { amp: 10, alpha: .93 })}${rain(t, .9, 60)}${light(gx, 1080, 420, .5)}`;
  return `${DEFS}${sc}`;
}
