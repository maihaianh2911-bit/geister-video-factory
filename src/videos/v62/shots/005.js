// Split view: her face looks down, puzzled — below, the foot on the floor loses its colour and outline on "fremd": it feels like someone else's.
import { K, BG, footCU, head, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const numb = lerp(.35, 1, eio(prog(t, 9.0, 9.5)));
  const lk = eio(prog(t, 8.7, 9.1));
  return BG + `<rect x="60" y="150" width="960" height="460" rx="40" fill="${K.wall2}" stroke="${K.ol}" stroke-width="5"/>
  <clipPath id="v62s5a"><rect x="60" y="150" width="960" height="460" rx="40"/></clipPath>
  <g clip-path="url(#v62s5a)"><rect x="300" y="520" width="480" height="200" rx="90" fill="${K.hood}" stroke="${K.ol}" stroke-width="5"/>
  <g transform="translate(540 390) scale(2.2)">${head({ look: 8, lookY: lerp(0, 14, lk), brow: t > 9.1 ? 'worry' : 'calm', mouth: t > 9.2 ? 'o' : 'flat', blink: blinkAt(t, .7), tilt: 8 * lk })}</g></g>
  <rect x="60" y="660" width="960" height="720" rx="40" fill="${K.floor}" stroke="${K.ol}" stroke-width="5"/>
  <clipPath id="v62s5b"><rect x="60" y="660" width="960" height="720" rx="40"/></clipPath>
  <g clip-path="url(#v62s5b)"><rect x="60" y="1240" width="960" height="200" fill="${K.floorSh}"/>${footCU(400, 1240, 1.25, { numb })}</g>`;
}
