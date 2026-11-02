// v102 writing desk under the warm desk lamp (sharp foreground) with the open notebook. lampOn 0..1
import { K, f1, op, pool, T } from './lib.js';
const INK = K.ink;
export function lamp(x, y, on) {
  return `<ellipse cx="${x}" cy="${y}" rx="80" ry="22" fill="#2a2420"/><path d="M ${x} ${y} L ${x + 70} ${y - 300} L ${x + 180} ${y - 430}" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M ${x + 130} ${y - 490} L ${x + 270} ${y - 490} L ${x + 230} ${y - 370} L ${x + 150} ${y - 350} Z" fill="#d9a35e" stroke="${INK}" stroke-width="6"/>` + (on > 0 ? pool(x + 200, y - 300, 380, 420, '#ffc46b', .5 * on) : '');
}
// open notebook seen from the front-top, centre x, top y; lines: array of [txt, p]
export function openBook(x, y, lines = [], o = {}) {
  let s = `<g transform="translate(${x} ${y})"><path d="M -300 0 L 0 18 L 300 0 L 320 230 L 0 246 L -320 230 Z" fill="#fbf7ea" stroke="${INK}" stroke-width="6"/><path d="M 0 18 V 246" stroke="#c9b99a" stroke-width="7"/><g stroke="#bcd0e6" stroke-width="3">${[0, 1, 2, 3].map(i => `<path d="M -280 ${60 + i * 46} L -24 ${70 + i * 46} M 24 ${70 + i * 46} L 290 ${60 + i * 46}"/>`).join('')}</g>`;
  if (o.left) s += o.left;
  s += `</g>`;
  return s;
}
