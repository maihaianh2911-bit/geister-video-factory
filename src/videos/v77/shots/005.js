import { K, OL, BG, card, antSide, bread, prog } from './lib.js';
// 9.02–10.2 Macro: the ant stands on the bread and taps the jam with its antennae ("prüft das Futter").
export default function renderShot(t) {
  const tap = Math.sin((t - 9.1) * 22);
  return `${BG()}<rect x="-60" y="1060" width="1200" height="900" fill="${K.crust}"/><rect x="-60" y="1090" width="1200" height="900" fill="${K.crumb}"/>
    <path d="M -60 1070 Q 300 1020 600 1050 Q 900 1030 1140 1060 L 1140 1100 L -60 1100 Z" fill="${K.jam}" ${OL(7)}/><path d="M 200 1052 Q 330 1036 450 1046" stroke="${K.jamL}" stroke-width="14" fill="none" stroke-linecap="round"/>
    ${antSide(470, 1056, 4.2, 0, { ant: t > 9.1 ? 16 + 10 * tap : 0 })}
    ${t > 9.16 ? card(540, 420, 'PRÜFT', 80, prog(t, 9.16, 9.35)) : ''}`;
}
