// 161.84–172.96: book recommendation – sympathy and cooperation; the book „Menschen für sich gewinnen“, linked in the shopping cart
import { K, bg, fade, pop, prog, fig, poseAt, chip, headline, badge, book } from './lib.js';
export default function renderShot(t) {
  const bk = fade(t, 168.33, .3), f = 1 - fade(t, 168.06, .3);
  let s = '';
  if (f > 0) s += `<g opacity="${f}">${fig(330, 1340, 1.15, 'ich', poseAt(t, [[161.84, 'stand'], [163.94, 'show']]))}${fig(760, 1340, 1.15, 'x', poseAt(t, [[161.84, 'stand'], [166.1, 'show']]), { f: -1, smile: fade(t, 164.15) })}${badge(545, 900, 50, 'heart', { a: fade(t, 163.96), sc: pop(t, 163.96) })}</g>`;
  s += `<g opacity="${bk}" transform="translate(0 ${(1 - bk) * 50})">${book(300, 690, 480, { col: K.blue, lines: ['MENSCHEN', 'FÜR SICH', 'GEWINNEN'] })}</g>`;
  const cart = `<g opacity="${fade(t, 170.9)}" transform="translate(860 1240) scale(${pop(t, 170.9)})"><path d="M -70 -50 L -50 -50 L -30 30 L 50 30 L 64 -26 L -40 -26" stroke="${K.ink}" stroke-width="12" fill="${K.butter}" stroke-linejoin="round"/><circle cx="-20" cy="54" r="12" fill="${K.ink}"/><circle cx="40" cy="54" r="12" fill="${K.ink}"/></g>`;
  return bg(K.butter) + headline(t, 260, 'MEHR DAZU?', 92)
    + chip(540, 410, 'SYMPATHIE AUFBAUEN', { size: 46, bg: K.orange, a: fade(t, 163.96) })
    + chip(540, 530, 'ZUR ZUSAMMENARBEIT GEWINNEN', { size: 46, bg: K.green, a: fade(t, 166.18) }) + s + cart
    + chip(800, 1330, 'IM WARENKORB', { size: 36, bg: K.ink, a: fade(t, 170.94) });
}
