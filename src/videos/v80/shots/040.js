// 303.28–312.18: they choose the time – and you show you value them and consciously want exactly them
import { K, bg, fade, pop, prog, fig, chip, headline, calendar } from './lib.js';
export default function renderShot(t) {
  const p2 = fade(t, 306.9);
  let a = '', b = '';
  if (p2 < 1) a = `<g opacity="${1 - p2}">${chip(540, 440, 'DIE WAHL DES ZEITPUNKTS', { size: 50, bg: K.green, a: fade(t, 304.74) })}${calendar(300, 620, 480, { title: 'DEINE WAHL', head: K.green, check: [0, 0, 0, 0, 0, prog(t, 305.1, 305.5), 0, 0] })}</g>`;
  if (p2 > 0) {
    const xs = [170, 350, 540, 730, 880], on = fade(t, 309.18);
    b = `<g opacity="${p2}">${chip(540, 440, 'DU SCHÄTZT SIE WIRKLICH', { size: 50, bg: K.orange, a: fade(t, 307.78) })}
      <path d="M 470 560 L 610 560 L 680 1345 L 400 1345 Z" fill="${K.yellow}" opacity="${.55 * on}"/>`
      + xs.map((x, i) => fig(x, 1340, .75, i === 2 ? 'x' : 'x', 'stand', { col: i === 2 ? K.ink : K.grey, smile: i === 2 ? on : 0 })).join('')
      + chip(540, 1290, 'GANZ BEWUSST: SIE', { size: 44, bg: K.ink, a: on }) + '</g>';
  }
  return bg(K.mint) + headline(t, 280, 'SO GIBST DU …', 92) + a + b;
}
