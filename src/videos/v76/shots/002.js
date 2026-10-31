// 1.50–2.95: close-up — the saw in the surgeon's hand comes down and stops above the sheet; a chalk ring marks the lower leg ("Bein amputiert" 1.36–2.19). Nothing cuts.
import { K, DEFS, BG, saw, arm, prog, eio, eout, lerp, f1, cl } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 1.5, 1.8)), ring = eout(prog(t, 1.75, 2.15));
  const hx = lerp(860, 760, d), hy = lerp(560, 760, d) + 4 * Math.sin(t * 6);
  const legs = `<path d="M -80 1080 Q 200 1010 480 1040 Q 700 1060 860 1020 Q 980 990 1010 1060 Q 1030 1160 980 1200 L -80 1200 Z" fill="${K.sheet}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 120 1080 Q 400 1060 700 1090" fill="none" stroke="${K.sheetD}" stroke-width="7"/>`;
  const tbl = `<rect x="-80" y="1190" width="1240" height="60" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/><path d="M -80 1208 H 1160" stroke="${K.woodL}" stroke-width="6"/>`;
  const C = 2 * Math.PI * 150;
  const chalk = ring > 0 ? `<ellipse cx="640" cy="1060" rx="170" ry="80" fill="none" stroke="${K.white}" stroke-width="9" stroke-dasharray="26 20" opacity=".9" stroke-dashoffset="${f1(C * (1 - ring))}"/>` : '';
  const a = arm([1180, 260], [1000, 420], [hx, hy], 1.2, K.coatB, { held: saw(hx, hy, 1.1, 168) });
  const cuff = `<circle cx="${f1(lerp(1000, hx, .82))}" cy="${f1(lerp(420, hy, .82))}" r="34" fill="${K.shirt}" stroke="${K.ink}" stroke-width="4"/>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="560" cy="800" rx="700" ry="600" fill="url(#nLamp)"/>${tbl}${legs}${chalk}${a}${cuff}<circle cx="${f1(hx)}" cy="${f1(hy)}" r="30" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/>`;
}
