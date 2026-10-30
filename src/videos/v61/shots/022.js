// 40.52–42.7: doctors call it Kältekopfschmerz — term card under the head with the cold palate and hot forehead
import { K, DEFS, BG, headProfile, card, prog, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const c = back(prog(t, 41.6, 41.9));
  const head = `<g transform="translate(470 720) scale(1.45)">${headProfile(t, { id: 'w', ice: 1, cold: 1, nerve: 1, branches: 1, fore: .9 + .1 * Math.sin(t * 12), temple: .7 })}</g>`;
  return `${DEFS}${BG(K.bg)}<circle cx="540" cy="700" r="${lerp(380, 420, eout(prog(t, 40.52, 42.7)))}" fill="${K.white}"/>${head}
    ${card(540, 1270, 'KÄLTEKOPFSCHMERZ', 84, prog(t, 41.6, 41.75), { sc: c, w: 1000 })}`;
}
