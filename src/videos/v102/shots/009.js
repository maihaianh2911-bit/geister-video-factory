// L4b 19.82–22.26: pale office. The colleague (glasses, bun, light blue top) explains with a raised hand, her speech bubble
// only shows faded blurry lines (du does not take it in); on "zum zweiten Mal" (21.46) a "2×" badge pops on the bubble. du stands right, tired eyes.
import { K, frame, cam, prog, eio, person, shadow, pop, f1, op, T } from './lib.js';
import { office2 } from './sets.js';
import { farbeBar, colourAt, grey } from './common.js';
const INK = K.ink;
export function fogBubble(x, y, w, h, tx, ty, a = 1) {
  let s = `<path d="M ${x - 40} ${y + h / 2 - 4} L ${tx} ${ty} L ${x + 30} ${y + h / 2 - 4} Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  s += `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="50" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M ${x - 36} ${y + h / 2 - 3} H ${x + 26}" stroke="#fff" stroke-width="10"/>`;
  s += `<g stroke="#b8bcc4" stroke-width="18" stroke-linecap="round" opacity=".7">${[[-.36, .3], [-.36, .2], [-.36, .34]].map(([a0, a1], i) => `<path d="M ${f1(x + w * a0)} ${f1(y - h / 2 + 50 + i * 42)} H ${f1(x + w * a1)}"/>`).join('')}</g>`;
  return `<g opacity="${op(a)}">${s}</g>`;
}
export default function renderShot(t) {
  let s = office2(t, {});
  s += grey(1 - colourAt(t));
  const talk = Math.sin(t * 14) > 0;
  const hand = Math.sin(t * 3) * 20;
  s += shadow(310, 1650);
  s += person('kolg', 310, 1650, 1, { t, seed: 4, look: [14, -2], brows: 'calm', mouth: talk ? 'talk' : 'small', armR: [230, -620 + hand], elbowR: [250, -430] });
  s += shadow(770, 1650);
  s += person('du', 770, 1650, 1, { t, seed: 1, eyes: 'tired', look: [-6, 6], brows: 'calm', mouth: 'flat', hunch: .2 });
  s += fogBubble(330, 560, 440, 200, 330, 760, eio(prog(t, 19.9, 20.3)));
  const b = pop(t, 21.46, .4);
  if (b > 0) s += `<g transform="translate(540 470) scale(${f1(b * 1000) / 1000})"><circle r="66" fill="#d9493f" stroke="${INK}" stroke-width="7"/>${T(0, 20, '2×', 60, { fill: '#fff' })}</g>`;
  s = cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 19.82, 22.26)), -20 * eio(prog(t, 19.82, 22.26)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
