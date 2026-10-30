// 51.72–55.74: the organisation of the visitor streams ("Besucherströme"): on the schematic, people coming in and people leaving use the same ramp and meet head-on
import { K, DEFS, siteMap, routePt, cam, f1, prog, eio, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 52.0, 52.8));
  let dots = '';
  for (let i = 0; i < 20; i++) { // coming in: tunnel → ramp → up
    const u = ((t - 51.7) * .18 + i / 20) % 1 * .75 + .2; const [x, y] = routePt(i % 2, u);
    dots += `<circle cx="${f1(x - 26)}" cy="${f1(y)}" r="12" fill="${K.c4}" stroke="${K.ink}" stroke-width="3" opacity="${f1(a)}"/>`; }
  for (let i = 0; i < 20; i++) { // leaving: down the ramp → tunnels
    const u = 1 - (((t - 51.7) * .18 + i / 20) % 1 * .75 + .2); const [x, y] = routePt(i % 2, u);
    dots += `<circle cx="${f1(x + 26)}" cy="${f1(y)}" r="12" fill="${K.olive}" stroke="${K.ink}" stroke-width="3" opacity="${f1(a)}"/>`; }
  const arr = (x, y0, y1, c) => `<path d="M ${x} ${y0} L ${x} ${y1}" stroke="${c}" stroke-width="14" stroke-linecap="round"/><path d="M ${x - 26} ${y1 + (y1 < y0 ? 30 : -30)} L ${x} ${y1} L ${x + 26} ${y1 + (y1 < y0 ? 30 : -30)}" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrows = `<g opacity="${f1(eio(prog(t, 52.6, 53.2)))}">${arr(380, 1060, 800, K.ink)}${arr(700, 800, 1060, K.oliveD)}</g>`;
  return `${DEFS}${cam(`${siteMap(t, {})}${dots}${arrows}`, 1.2, 540, 950)}`;
}
