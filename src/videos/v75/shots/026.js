// 72.32–75.8: messages ("Nachrichten" 72.32), payments ("Zahlungen" 73.4) and waiting orders ("Bestellungen" 74.48) — three columns of them queue at the overloaded server
import { K, DEFS, BG, label, cam, prog, eio, lerp, f1 } from './lib.js';
import { server, item } from './025.js';
export default function renderShot(t) {
  const a = [eio(prog(t, 72.3, 72.6)), eio(prog(t, 73.35, 73.65)), eio(prog(t, 74.4, 74.7))];
  const cols = [[180, 'NACHRICHTEN'], [540, 'ZAHLUNGEN'], [900, 'BESTELLUNGEN']].map(([x, l], k) => a[k] <= 0 ? '' : `<g opacity="${f1(a[k])}">${[0, 1, 2, 3].map(i => item(k, x, 1340 - i * 110 - 30 * Math.sin(t * 3 + i), .9)).join('')}</g>${label(x, 1450 - 40, l, a[k], [K.data, K.green, K.sun][k], 30)}`).join('');
  return `${DEFS}${BG()}${cam(`<g transform="translate(270 -120) scale(.5)">${server(.95, t)}</g>`, 1, 540, 900)}${cols}`;
}
