// Medium: blue jacket (grey beanie) hugs himself and starts to shake; red and yellow turn their heads to him.
import { K, DEFS60, forest, fig, breath, FG, prog, eout, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const turn = eout(prog(t, 7.1, 7.45)), turn2 = eout(prog(t, 7.3, 7.65));
  const sh = lerp(.3, 1.2, prog(t, 7.4, 8.0));
  const z = lerp(1.0, 1.05, prog(t, 6.6, 8.0));
  return DEFS60 + `<g transform="translate(540 1000) scale(${z}) translate(-540 -1000)">
    ${forest(t, { hz: 1000, px: -60 })}
    <ellipse cx="300" cy="820" rx="520" ry="560" fill="url(#fAmb)" opacity=".45"/>
    ${fig('red', 220, 1560, 1.25, { look: lerp(-8, 14, turn), brow: turn > .5 ? 'worry' : 'calm', mouth: 'flat', aR: [40, 50], blink: blinkAt(t), hdx: 8 * turn })}
    ${fig('blue', 560, 1600, 1.3, { hug: true, shiver: sh, t, brow: 'worry', mouth: 'tight', cold: true, look: -4, lookY: 6, blink: blinkAt(t, .7) })}
    ${fig('yellow', 900, 1580, 1.25, { look: lerp(10, -14, turn2), brow: turn2 > .5 ? 'worry' : 'calm', mouth: turn2 > .5 ? 'o' : 'flat', blink: blinkAt(t, 1.3), hdx: -8 * turn2 })}
    ${breath(t, 6.8, 600, 660, 1)}${breath(t, 7.8, 600, 660, 1)}
  </g>
  ${FG(1400)}`;
}
