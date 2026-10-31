// 61.01–65.48: twenty-one people died, more than five hundred were injured — the numbers appear quietly on a dark archive page
import { K, DEFS, BG, TX, grain, cam, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const a = eout(prog(t, 61.02, 61.45)), b = eout(prog(t, 63.2, 63.8));
  return `${DEFS}${BG('#2E2621')}${cam(`${grain(14)}<rect x="120" y="360" width="840" height="1000" fill="none" stroke="${K.paperD}" stroke-width="3" opacity=".6"/>
    <g opacity="${f1(a)}">${TX('21', 540, 800, 300, K.paperL)}${TX('TOTE', 540, 900, 60, K.paperD)}</g>
    <g opacity="${f1(b)}"><path d="M 340 1010 H 740" stroke="${K.paperD}" stroke-width="3"/>${TX('MEHR ALS 500', 540, 1130, 76, K.paperL)}${TX('VERLETZTE', 540, 1220, 56, K.paperD)}</g>`, lerp(1, 1.08, prog(t, 61.01, 65.48)), 540, 900)}`;
}
