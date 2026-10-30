// The friends sit by the sign and wait; far off between the trunks blue lights come closer on "Hilfe".
import { K, DEFS60, forest, trunk, sign, fig, FG, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const come = eio(prog(t, 47.4, 49.0));
  const bl = Math.floor(t * 4) % 2;
  const bx = lerp(980, 860, come), bs = lerp(.5, 1, come);
  const look = eio(prog(t, 47.8, 48.2)) * 14;
  return DEFS60 + `${forest(t, { hz: 1060, px: 100, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".35"/>
  <ellipse cx="${bx}" cy="1000" rx="${240 * bs}" ry="${200 * bs}" fill="url(#fBlue)" opacity="${(.3 + .5 * come) * (bl ? 1 : .5)}"/>
  <circle cx="${bx - 20}" cy="1010" r="${10 * bs}" fill="#BFE0FF" opacity="${bl}"/><circle cx="${bx + 20}" cy="1010" r="${10 * bs}" fill="#BFE0FF" opacity="${1 - bl}"/>
  ${trunk(160, 160, K.bark, K.barkHi, -20, 1420)}
  ${sign(160, 780, .45)}
  <ellipse cx="420" cy="1200" rx="420" ry="260" fill="url(#fAmb)" opacity=".55"/>
  ${fig('green', 290, 1420, .78, { sit: true, look: look, brow: 'worry', blink: blinkAt(t) })}
  ${fig('blue', 480, 1440, .8, { sit: true, hug: true, cold: true, look: look, brow: 'worry' })}
  ${fig('yellow', 660, 1420, .78, { sit: true, look: look, brow: look > 7 ? 'up' : 'worry', mouth: look > 7 ? 'o' : 'flat' })}
  ${fig('red', 830, 1440, .78, { sit: true, look: look, brow: 'calm', aR: [20, 40], blink: blinkAt(t, 1) })}
  ${FG(1440)}`;
}
