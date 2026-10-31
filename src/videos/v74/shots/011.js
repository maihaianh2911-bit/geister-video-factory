import { P, R, ST, fig, helmetAt, jacketShape, pop, shk, stamp, wallpaper, frame, tag, prog, eout, back } from './lib.js';
// 18.9–21.72 The rank was never his: the captain's uniform on a stand, label HAUPTMANN; on "nicht" a red stamp KEIN RANG.
export default function renderShot(t) {
  const lbl = back(prog(t, 19.38, 19.6));
  const st = pop(t, 20.82, .2);
  const sh = shk(t, 20.82, 10);
  const cross = eout(prog(t, 20.9, 21.2));
  return frame(t, `<g transform="translate(${sh} 0)">${wallpaper()}${R(0, 1300, 1080, 640, P.woodSh)}
    <circle cx="660" cy="820" r="430" fill="url(#kspot)" opacity=".8"/>
    <rect x="652" y="1060" width="16" height="420" fill="${P.woodSh}" ${ST(4)}/><path d="M 560 1490 L 760 1490 L 660 1440 Z" fill="${P.woodSh}" ${ST(5)}/>
    ${jacketShape(660, 690, 1.15, { epaul: 1 })}${helmetAt(660, 590, .85, 0)}
    ${fig(230, 1760, 1.35, { kind: 'voigtCiv', aR: -30, bendR: -20, look: 14, lookY: -8, mouth: 'flat', brow: t > 20.82 ? 'worried' : 'calm' })}
    ${lbl > 0 ? `<g transform="translate(780 470) rotate(6) scale(${Math.min(1.1, lbl)})"><path d="M -90 -50 L -40 -100" stroke="${P.ink}" stroke-width="4"/>${tag(30, 0, 'HAUPTMANN', 1, { sz: 50 })}<path d="M -130 0 L ${-130 + 320 * cross} 0" stroke="${P.red}" stroke-width="12" stroke-linecap="round"/></g>` : ''}
    ${stamp(560, 300, -6, 'KEIN RANG', st, { sz: 96, bg: P.paper })}</g>`);
}
