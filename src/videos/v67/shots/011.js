// 22.88–25.68: same closed bottle — the cap twists off on "Öffnen"; the red pressure arrows shrink on "Druck … gesenkt"
import { K, OL, f1, capSvg, arrow, prog, eio, eout, lerp, cl } from './lib.js';
import { cutBG, bigBottle, molSvg, toW } from './sets.js';
import { MOL } from './010.js';
export default function renderShot(t) {
  const tw = prog(t, 23.0, 23.45), off = eout(prog(t, 23.45, 23.9));
  const pr = 1 - .78 * eio(prog(t, 23.95, 24.9));
  const [rx, ry] = toW(0, -384);
  const cap = t < 23.45 ? '' : capSvg(rx + 200 * off, ry - 30 - 160 * off + 120 * off * off, 2.5, tw * 160 + off * 40);
  const capOn = t < 23.45 ? 'on' : 'none';
  // arrows from centre pushing outward (in bottle units, drawn inside the bottle group)
  const L = 150 * pr, w = 16 * Math.max(.45, pr);
  const [cx0, cy0] = toW(0, -60), [, cyT] = toW(0, -300);
  let arr = [[-1, 0], [1, 0]].map(([dx]) => arrow(cx0 + dx * 40, cy0, cx0 + dx * (40 + L), cy0, K.red, w)).join('')
    + arrow(cx0, cyT, cx0, cyT - L * .9, K.red, w);
  const puff = t > 23.45 && t < 24.4 ? `<g opacity="${f1(1 - prog(t, 23.45, 24.4))}">${[-1, 0, 1].map(k => `<path d="M ${f1(rx + k * 40)} ${f1(ry - 20)} q ${k * 20} -60 ${k * 40} -${f1(80 + 120 * prog(t, 23.45, 24))}" fill="none" stroke="${K.grey}" stroke-width="12" stroke-linecap="round"/>`).join('')}</g>` : '';
  return `${cutBG()}${bigBottle({ id: 'c11', cap: capOn, inner: molSvg(MOL, 1, 6.5, t) })}${arr}${cap}${puff}`;
}
