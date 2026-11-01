// 141.46–151.38: asking is not making yourself small or begging – it is an exchange at eye level
import { K, bg, fade, pop, prog, eio, fig, poseAt, chip, headline, badge } from './lib.js';
export default function renderShot(t) {
  const ich = fig(320, 1340, 1.2, 'ich', poseAt(t, [[141.46, 'stand'], [143.4, 'deepbow'], [146.4, 'stand'], [148.6, 'show']]));
  const ot = fig(790, 1340, 1.2, 'x', 'stand', { f: -1 });
  const n = 1 - fade(t, 146.36);
  const lv = fade(t, 147.4), ly = 1340 - 342 * 1.2;
  const level = `<g opacity="${lv}"><line x1="190" y1="${ly}" x2="${190 + 730 * eio(prog(t, 147.4, 148))}" y2="${ly}" stroke="${K.blue}" stroke-width="10" stroke-dasharray="26 18" stroke-linecap="round"/></g>`;
  const top = n > 0 ? `<g opacity="${n}">${chip(540, 470, 'NICHT KLEINMACHEN', { size: 50, bg: K.red, a: fade(t, 143.44), sc: pop(t, 143.44) })}${chip(540, 600, 'NICHT BETTELN', { size: 50, bg: K.red, a: fade(t, 144.58), sc: pop(t, 144.58) })}</g>` : '';
  const top2 = `<g opacity="${lv}">${chip(540, 470, 'AUSTAUSCH AUF AUGENHÖHE', { size: 50, bg: K.blue })}${chip(540, 600, 'WERT ANERKENNEN', { size: 50, bg: K.green, a: fade(t, 149.28), sc: pop(t, 149.28) })}</g>`;
  return bg(K.sky) + headline(t, 280, 'UM HILFE BITTEN IST …', 74) + top + top2 + level + ich + ot;
}
