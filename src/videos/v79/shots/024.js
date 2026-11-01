// 108.92–112.96 his own yardstick rises next to him ("SEIN MASSSTAB"); on "selbst überdenkt" he looks at it, hand to chin
import { K, TEXT, CH, chip, twoShot, cam, yardstick, thought, prog, eio, eout, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const grow = eout(prog(t, 109.3, 109.9)), look = eio(prog(t, 111.0, 111.5));
  const M = { look: lerp(-.6, -1, look), lookY: lerp(0, -.4, look), turn: -.4 * look, brow: .4 * look, mouth: look > .5 ? 'tight' : 'neutral', hR: look > 0 ? [lerp(80, 40, look), lerp(-24, -330, look)] : [80, -24], blink: blink(t, 2) };
  const W = { look: 1, mouth: 'tight' };
  const base = cam(twoShot(t, W, M), 1.35, 720, 900);
  const stick = `<g opacity="${fade(t, 109.25, .2)}">${yardstick(230, 1320, lerp(60, 780, grow), 1, '')}</g>`;
  const lab = t > 109.8 ? `<g opacity="${fade(t, 109.8)}"><rect x="20" y="1330" width="420" height="76" rx="38" fill="${K.ink}" opacity=".88"/><text x="230" y="1383" ${TEXT(40, K.cream)}>SEIN MASSSTAB</text></g>` : '';
  const th = t > 111.6 ? `<g opacity="${fade(t, 111.6)}">${thought(560, 330, 120, 90, 640, 520, `<text x="560" y="365" ${TEXT(90)}>?</text>`)}</g>` : '';
  return base + stick + lab + th + chip(CH[6]);
}
