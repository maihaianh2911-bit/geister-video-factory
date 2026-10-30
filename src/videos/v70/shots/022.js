// 56.24–59.48: know beforehand — parked at home under the garage lamp, you look at the small marking in the corner of a side window ("welche Scheiben")
import { K, DEFS, BG, carSide, bust, label, light, TX, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const pt = eio(prog(t, 56.6, 57.6)), mag = eout(prog(t, 58.3, 58.7));
  const s = 1.3, cx = 560, cy = 1500;
  // marking at the front window's lower-rear corner: car coords (-60, -244)
  const mx = cx + -60 * s, my = cy + -244 * s;
  const yx = 900, yy = 1040;
  const sc = `${BG('#1A1F22')}<rect x="-60" y="1500" width="1200" height="500" fill="#2A2D2E"/><path d="M -60 1500 H 1140" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 440 120 L 640 120 L 600 200 L 480 200 Z" fill="#3A4248" stroke="${K.ink}" stroke-width="5"/>${light(540, 260, 900, .9)}
    ${carSide(t, cx, cy, s, { people: false, lights: 0, inner: 0, id: 's22c', over: `<rect x="-76" y="-254" width="34" height="20" rx="3" fill="${K.white}" opacity=".85"/>` })}
    ${bust('you', yx, yy, 1.25, { look: -1, lookY: .3, brow: .2, mouth: 'flat', aL: [[lerp(780, 760, pt), lerp(1250, 1120, pt)], [lerp(800, mx + 60, pt), lerp(1400, my + 10, pt)]] })}
    ${mag > 0 ? `<g opacity="${f1(mag)}"><path d="M ${f1(mx)} ${f1(my)} L 380 820" stroke="${K.amber}" stroke-width="5"/><circle cx="330" cy="700" r="${f1(170 * mag)}" fill="#0E1418" stroke="${K.amber}" stroke-width="8"/>
      ${TX('ESG', 330, 732, 96, K.white)}</g>` : ''}`;
  return `${DEFS}${sc}${label(540, 330, 'VORHER WISSEN', eout(prog(t, 56.3, 56.6)), K.amber, 70)}`;
}
