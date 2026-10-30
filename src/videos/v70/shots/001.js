// 0–2.28: cover — rainy night, your saloon drives along a road beside dark water ("regnerische Nacht"); headline AUTO IM WASSER
import { K, DEFS, BG, carSide, water, rain, label, light, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const x = lerp(400, 500, prog(t, 0, 2.28)), bob = 3 * Math.sin(t * 9);
  const road = `<path d="M -60 1120 L 760 1120 L 860 1300 L -60 1300 Z" fill="${K.road}" stroke="${K.ink}" stroke-width="6"/><path d="M -60 1300 L 860 1300 L 820 1360 L -60 1360 Z" fill="#1A2A24"/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${f1(((i * 260 - t * 420) % 1040 + 1040) % 1040 - 160)} 1210 h 120" stroke="#6A7378" stroke-width="10" stroke-linecap="round"/>`).join('')}
    `;
  const sc = `${BG('url(#eSky)')}<path d="M -60 980 Q 300 940 700 990 L 1140 960 L 1140 1130 L -60 1130 Z" fill="#141C20"/>
    ${[90, 230, 640].map((tx, i) => `<path d="M ${tx} 1010 l -40 -140 l 40 -60 l 40 60 Z" fill="#101619" stroke="${K.ink}" stroke-width="5"/>`).join('')}
    ${water(t, 1330, { amp: 8 })}${road}
    ${carSide(t, x, 1196 + bob, .86, { lights: 1, inner: .7, id: 's1c', faces: { you: { look: .8, brow: .2 }, wom: { look: .5 }, kidA: { look: .3 }, kidB: { look: .3, brow: .2 } } })}
    ${light(x + 300, 1150, 260, .5)}${rain(t, 1.1, 90)}`;
  return `${DEFS}${sc}${label(540, 330, 'AUTO IM WASSER', 1, K.amber, 84)}`;
}
