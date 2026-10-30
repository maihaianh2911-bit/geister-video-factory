// Ending: the four sit close by the sign, the torch blinks its signal, the pocketed phone is ready for 112 — blue lights come closer through the trees.
import { K, DEFS60, forest, trunk, sign, fig, torch, reach, FG, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const come = eio(prog(t, 83.4, 85.88));
  const ph = ((t - 83.4) / 1.6) % 1;
  const on = ph < .5 && (ph * 12) % 1 < .55 ? 1 : 0;
  const bl = Math.floor(t * 4) % 2;
  const z = lerp(1.0, 1.08, eio(prog(t, 83.4, 85.88)));
  const [a1, a2] = reach(760, 1500, .95, 1, 860, 1000, true);
  return DEFS60 + `<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">
    ${forest(t, { hz: 1000, px: 140, noNear: true })}
    <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".3"/>
    <ellipse cx="${lerp(260, 380, come)}" cy="980" rx="${lerp(120, 300, come)}" ry="${lerp(100, 240, come)}" fill="url(#fBlue)" opacity="${bl ? .8 : .45}"/>
    ${on ? `<g transform="translate(870 1010) rotate(-70)"><polygon points="0,0 1100,-260 1100,260" fill="url(#fBeam)" opacity=".75"/></g>` : ''}
    ${trunk(120, 150, K.bark, K.barkHi, -20, 1400)}${sign(120, 820, .42)}
    <ellipse cx="560" cy="1220" rx="460" ry="300" fill="url(#fAmb)" opacity=".55"/>
    ${fig('green', 300, 1500, .95, { sit: true, look: -10, lookY: -6, brow: 'calm', blink: blinkAt(t) })}
    ${fig('blue', 520, 1510, 1.0, { sit: true, hug: true, cold: true, look: -8, brow: 'calm', mouth: 'smile' })}
    ${fig('yellow', 740, 1500, .95, { sit: true, look: -10, brow: 'calm', mouth: 'smile', blink: blinkAt(t, 1) })}
    ${fig('red', 920, 1500, .95, { sit: true, look: -6, lookY: -8, brow: 'calm', aL: [a1, a2], holdLFront: undefined, holdL: (x, y) => torch(x - 10, y - 10, .6, -70 + 180, 0) })}
  </g>
  ${FG(1460)}`;
}
