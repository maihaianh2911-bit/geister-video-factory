// Cover: four friends lost in the dark Black Forest, one phone torch; headline.
import { K, DEFS60, forest, fog, fig, reach, phone, rings, FG, TX, prog, eout, back, lerp, blinkAt, shk } from './lib.js';

export default function renderShot(t) {
  const z = 1.16 - .16 * eout(prog(t, 0, .4)), [sx, sy] = shk(t, .05, 10, 7);
  const on = prog(t, .12, .2);
  const look = [lerp(-10, 12, eout(prog(t, .5, .8))), lerp(10, -12, eout(prog(t, .6, .9))), 0, lerp(8, -10, eout(prog(t, .7, 1.0)))];
  const ph = [200, 780];
  const [a1, a2] = reach(400, 1420, 1.12, -1, ph[0], ph[1] + 60, false, -1);
  const h = 1.12 - .12 * back(prog(t, 0, .3));
  return DEFS60 + `<g transform="translate(${540 + sx} ${1000 + sy}) scale(${z}) translate(-540 -1000)">
    ${forest(t, { px: -20 * t, hz: 1080 })}
    ${fog(t, 1180, .12)}
    <ellipse cx="300" cy="820" rx="${560 * on}" ry="${620 * on}" fill="url(#fAmb)" opacity=".75"/>
    ${fig('green', 125, 1440, 1.0, { look: look[0], brow: 'worry', mouth: 'flat', blink: blinkAt(t), lean: -3 })}
    ${fig('yellow', 880, 1440, 1.0, { look: look[1], brow: 'worry', mouth: 'tight', blink: blinkAt(t, 1), lean: 3 })}
    ${fig('blue', 650, 1460, 1.08, { look: look[3], brow: 'worry', mouth: 'flat', cold: true, hug: true, shiver: .6, t })}
    ${fig('red', 400, 1420, 1.12, { look: -6, lookY: -8, brow: 'up', mouth: 'flat', aL: [a1, a2], holdL: (x, y) => phone(x - 4, y - 50, .5, -14, { on: 1, glow: false, screen: `<circle cx="0" cy="0" r="34" fill="#FFF6D8"/>` }) })}
    ${rings(t, .14, ph[0], ph[1], K.amb, 3, 300)}
  </g>
  ${FG(1380)}
  <g transform="translate(540 300) scale(${h})">
    ${TX('VERIRRT IM', 0, -40, 108, '#FFFFFF', 'middle', `stroke="${K.ol}" stroke-width="14" paint-order="stroke"`)}
    ${TX('SCHWARZWALD', 0, 100, 116, K.amb, 'middle', `stroke="${K.ol}" stroke-width="14" paint-order="stroke"`)}
  </g>`;
}
