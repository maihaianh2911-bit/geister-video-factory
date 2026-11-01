// 16.46–21.36 close-up on him: the silence presses in; on "senkt den Blick" his eyes drop, on "weicht aus" he looks away
import { K, TEXT, CH, chip, twoShot, cam, prog, eio, eout, blink, fade, lerp } from './lib.js';
export default function renderShot(t) {
  const down = eio(prog(t, 19.1, 19.6)), away = eio(prog(t, 20.25, 20.7)), press = eio(prog(t, 16.6, 18.4));
  const M = { look: lerp(-1, lerp(-.3, 1, away), down), lookY: lerp(0, 1, down) * (1 - away * .6), lid: .45 * down * (1 - away * .5), dy: 16 * down, tilt: -5 * down + 4 * away, turn: .5 * away, brow: .2 + .8 * press, mouth: 'tight', sweat: eout(prog(t, 18.2, 18.7)), blink: down > 0 ? 0 : blink(t, 2) };
  const W = { look: 1, mouth: 'tight' };
  const z = lerp(2.0, 2.15, eio(prog(t, 16.46, 21.3)));
  const ring = `<rect width="1080" height="1920" fill="none" stroke="#1a0f0a" stroke-width="${lerp(0, 260, press)}" opacity=".55"/>`;
  const lab = down > 0 ? `<g opacity="${fade(t, 19.2) * (1 - fade(t, 20.2))}"><rect x="240" y="1240" width="600" height="90" rx="45" fill="${K.ink}" opacity=".85"/><text x="540" y="1302" ${TEXT(46, K.cream)}>BLICK GESENKT</text></g>` : '';
  const lab2 = away > 0 ? `<g opacity="${fade(t, 20.3)}"><rect x="240" y="1240" width="600" height="90" rx="45" fill="${K.ink}" opacity=".85"/><text x="540" y="1302" ${TEXT(46, K.cream)}>WEICHT AUS</text></g>` : '';
  return cam(twoShot(t, W, M), z, 780, 800) + ring + lab + lab2 + chip(CH[1]);
}
