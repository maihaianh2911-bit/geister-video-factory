// 41.78–44.4: coffee can reduce the feeling of tiredness — the MÜDIGKEIT bar drops ("verringern" 43.34) and your eyes open a bit
import { K, BG, bar, mug, headOf, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 42.6, 43.34));
  const arrow = `<path d="M 230 ${f1(560)} L 230 ${f1(560 + 120 * d)}" stroke="${K.tealD}" stroke-width="16" stroke-linecap="round" opacity="${f1(d)}"/>`;
  return `${BG()}${bar(300, 380, 680, 96, lerp(.95, .45, d), d > .5 ? K.amber : K.red, 'MÜDIGKEIT', { sz: 56 })}${mug(210, 560, .7, { t })}${arrow}
    ${headOf('du', 540, 1150, 1.6, { look: 0, lookY: -.4, tired: .9, lid: lerp(.6, .25, d), brow: lerp(0, .3, d), mouth: d > .5 ? 'smile' : 'flat' })}`;
}
