// 90.66–94.62 option 2: risk everything for a brand-new future — the right path lights up with a big "?", the kid steps between both; final question hold
import { K, kid, headline, glow, sparks, T, fade, pop, prog, eio, lerp, f1 } from './lib.js';
import { crossroads, sign } from './024.js';
export default function renderShot(t) {
  const w = eio(prog(t, 90.66, 91.3));
  let s = crossroads(t, { warm: lerp(1, .5, w), cool: lerp(.15, 1, w) });
  s += glow(800, 520, 360 * w, '#bfe9ff', .7);
  s += sign(260, 760, 'ALTES LEBEN', '#d9774f', -1, 1);
  s += sign(820, 760, 'NEUE ZUKUNFT', K.blue, 1, 1);
  // the unknown: big question mark on the new side
  const q = pop(t, 91.36);
  s += `<g opacity="${f1(fade(t, 91.36) * 100) / 100}" transform="translate(800 470) scale(${f1(q * 100) / 100})">${T(0, 90, '?', 260, { fill: '#fff', stroke: K.blue, sw: 14 })}</g>`;
  s += sparks(t, 800, 470, 220, 9, 41, w);
  s += headline(t, 230, ['WAS WÄHLST DU?'], 84, { t0: 92.54, mark: { word: 'WÄHLST', t: 92.9 } });
  // kid takes a small step towards the new path, then looks back — undecided
  const step = eio(prog(t, 90.84, 91.8));
  const back = t > 93.2 ? -14 : 14;
  s += kid(lerp(540, 650, step), 1330, .8, { aL: [12, 6], aR: [12, 6], mouth: 'o', brows: 'up', look: [back, -4] });
  return s;
}
