// 71.50–76.02: a paper list — the quill ticks NARKOSE (72.16), then a second line INFEKTIONEN appears in red with an empty box ("Infektionen" 74.38).
import { K, DEFS, BG, TX, check, arm, bact, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const ck = eio(prog(t, 71.9, 72.4)), l2 = eout(prog(t, 74.3, 74.6)), mv = eio(prog(t, 74.5, 75.2));
  // quill tip follows the tick while drawing, then moves to the second box
  const tickPts = [[250, 640], [290, 680], [356, 600]];
  const seg = ck < .4 ? 0 : 1, sp = seg === 0 ? ck / .4 : (ck - .4) / .6;
  const tipT = ck <= 0 ? [380, 560] : [lerp(tickPts[seg][0], tickPts[seg + 1][0], sp), lerp(tickPts[seg][1], tickPts[seg + 1][1], sp)];
  const tip = [lerp(tipT[0], 300, mv), lerp(tipT[1], 860, mv) - (mv > 0 && mv < 1 ? 40 * Math.sin(mv * Math.PI) : 0)];
  const hand = [tip[0] + 80, tip[1] - 92];
  const quill = `<path d="M ${f1(tip[0])} ${f1(tip[1])} L ${f1(tip[0] + 260)} ${f1(tip[1] - 300)}" stroke="${K.ink}" stroke-width="6"/><path d="M ${f1(tip[0] + 120)} ${f1(tip[1] - 140)} Q ${f1(tip[0] + 260)} ${f1(tip[1] - 360)} ${f1(tip[0] + 330)} ${f1(tip[1] - 360)} Q ${f1(tip[0] + 280)} ${f1(tip[1] - 200)} ${f1(tip[0] + 120)} ${f1(tip[1] - 140)} Z" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/>`;
  const paper = `<g transform="rotate(-3 540 760)"><rect x="140" y="420" width="800" height="660" rx="12" fill="${K.paper}" stroke="${K.ink}" stroke-width="6"/>
    <rect x="220" y="580" width="110" height="110" rx="10" fill="none" stroke="${K.ink}" stroke-width="7"/>${TX('NARKOSE', 370, 668, 78, K.ink, 'start')}${check(300, 640, 1.3, ck)}
    <g opacity="${f1(l2)}"><rect x="220" y="800" width="110" height="110" rx="10" fill="none" stroke="${K.red}" stroke-width="7"/>${TX('INFEKTIONEN', 370, 888, 74, K.red, 'start')}${bact(780, 980, .8 * l2, -10, t)}</g></g>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="760" rx="650" ry="600" fill="url(#nLamp)" opacity=".7"/>${paper}${arm([1200, 1500], [1000, 1250], hand, 1.3, K.coatB, { held: quill })}`;
}
