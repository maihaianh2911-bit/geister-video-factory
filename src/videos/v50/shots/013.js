// 20.16–22.0 · "Aber das Eis ist in deinem Mund" — still wincing; a dashed ring draws around her mouth
import { P, parlour, girl, cam, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const z = lerp(1.0, 1.06, eio(prog(t, 20.16, 22.0)));
  const ring = eio(prog(t, 21.3, 21.75));
  const S = 1.6, X = 540, Y = 1330;
  const my = Y - 84 * S;
  return `<g transform="${cam(z, 540, 900, 540, 900)}">${parlour(t)}
    ${girl(X, Y, S, { t, id: 's13', hold: 'cone', handR: [190, 20], bite: 1, biteSide: -1, handL: [-20, -300], palmL: 8, eyes: 'half', brow: .9, mouth: 'flat', painFore: .55, cheek: .7 })}
    <ellipse cx="${X + 20}" cy="${my}" rx="150" ry="105" fill="none" stroke="${P.white}" stroke-width="22" pathLength="1" stroke-dasharray="${ring} 1"/>
    <ellipse cx="${X + 20}" cy="${my}" rx="150" ry="105" fill="none" stroke="${P.teal}" stroke-width="12" stroke-dasharray="${ring > .99 ? '30 18' : ring + ' 1'}" ${ring > .99 ? '' : 'pathLength="1"'}/></g>`;
}
