// 161.94–172.68: book recommendation – sympathy and cooperation; the book "Thu Phục Lòng Người", linked in the shopping cart
import { K, bg, fade, pop, prog, fig, poseAt, chip, headline, badge, book } from './lib.js';
export default function renderShot(t) {
  const bk = fade(t, 168.2, .3), f = 1 - fade(t, 167.9, .3);
  let s = '';
  if (f > 0) s += `<g opacity="${f}">${fig(330, 1340, 1.15, 'ich', poseAt(t, [[161.94, 'stand'], [164.0, 'show']]))}${fig(760, 1340, 1.15, 'x', poseAt(t, [[161.94, 'stand'], [165.9, 'show']]), { f: -1, smile: fade(t, 164.2) })}${badge(545, 900, 50, 'heart', { a: fade(t, 164.02), sc: pop(t, 164.02) })}</g>`;
  s += `<g opacity="${bk}" transform="translate(0 ${(1 - bk) * 50})">${book(330, 720, 420, { col: K.blue, lines: ['THU PHỤC', 'LÒNG NGƯỜI'] })}</g>`;
  const cart = `<g opacity="${fade(t, 171.0)}" transform="translate(860 1240) scale(${pop(t, 171.0)})"><path d="M -70 -50 L -50 -50 L -30 30 L 50 30 L 64 -26 L -40 -26" stroke="${K.ink}" stroke-width="12" fill="${K.butter}" stroke-linejoin="round"/><circle cx="-20" cy="54" r="12" fill="${K.ink}"/><circle cx="40" cy="54" r="12" fill="${K.ink}"/></g>`;
  return bg(K.butter) + headline(t, 260, 'MEHR DAZU?', 92)
    + chip(540, 410, 'SYMPATHIE AUFBAUEN', { size: 46, bg: K.orange, a: fade(t, 164.02) })
    + chip(540, 530, 'ZUR ZUSAMMENARBEIT GEWINNEN', { size: 46, bg: K.green, a: fade(t, 165.96) }) + s + cart
    + chip(800, 1330, 'IM WARENKORB', { size: 36, bg: K.ink, a: fade(t, 171.04) });
}
