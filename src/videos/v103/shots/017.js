// L11b 54.38–57.82: the camera pans from the closed left door to the right door, which stays ajar; warm light pours through the gap
// and widens on "wächst" (56.26); sepia memories (ticket, phone, heart) drift out of the light and grow. Label VERPASSTE CHANCE.
import { K, frame, cam, prog, eio, pop, label, pool, f1, op, lerp } from './lib.js';
import { voidRoom2, doorPanel, ticket } from './sets3.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = voidRoom2(t);
  s += doorPanel(170, 520, 320, 720, 0, 0);
  const g = eio(prog(t, 55.0, 57.6));
  s += doorPanel(640, 520, 320, 720, .22 + .28 * g, .4 + .6 * g);
  s += pool(800, 1300, 300 + 200 * g, 80, '#ffe08a', .35 + .4 * g);
  // memories drifting out of the gap
  const items = [[0, -120, 'ticket'], [1, 120, 'phone'], [2, 0, 'heart']];
  for (const [i, dy, k] of items) {
    const p = prog(t, 55.2 + i * .45, 57.82);
    if (p <= 0) continue;
    const x = lerp(720, 480 - i * 60, eio(p)), y = lerp(860, 720 + dy * 1.8, eio(p)), sc = (.3 + .7 * eio(p)) * (1 + .25 * g);
    let ic = '';
    if (k === 'ticket') ic = ticket(0, 0, .34, 0, { id: 'd17' });
    if (k === 'phone') ic = `<rect x="-40" y="-70" width="80" height="140" rx="14" fill="${INK}"/><rect x="-30" y="-56" width="60" height="108" rx="6" fill="#3c9a5f"/>`;
    if (k === 'heart') ic = `<path d="M 0 50 C -80 0 -60 -60 0 -30 C 60 -60 80 0 0 50 Z" fill="#d9493f" stroke="${INK}" stroke-width="5"/>`;
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 1000) / 1000})" opacity="${op(Math.min(1, p * 4))}"><circle r="110" fill="#f6ead2" stroke="${INK}" stroke-width="5"/>${ic}<circle r="110" fill="#c08a4a" opacity=".18"/></g>`;
  }
  const pan = eio(prog(t, 54.38, 55.4));
  s = cam(s, lerp(330, 720, pan), 880, 1.12 + .06 * g);
  s += label('VERPASSTE CHANCE', 540, 250, 88, { p: pop(t, 54.56, .45) });
  return frame(s);
}
