// 13.96–17.12: the question — the car floats in the dark water with all four of you inside; on "ganze Familie" each head is marked, then WIE RAUS?
import { K, DEFS, BG, carSide, water, rain, label, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const z = lerp(1, 1.12, eio(prog(t, 13.96, 17.12)));
  const x = 600, y = 1290 + 6 * Math.sin(t * 2.2), s = 1.1 * z, tilt = 6 + 1.5 * Math.sin(t * 1.7);
  const heads = [[-238, -282], [-170, -292], [-20, -288], [40, -300]];
  const ring = heads.map(([hx, hy], i) => { const p = eout(prog(t, 15.0 + i * .18, 15.3 + i * .18)); return p <= 0 ? '' : `<circle cx="${hx}" cy="${hy}" r="${f1(70 * p)}" fill="none" stroke="${K.amber}" stroke-width="9"/>`; }).join('');
  const sc = `${BG('url(#eSky)')}
    ${carSide(t, x, y, s, { tilt, lights: .35, inner: .8, id: 's6c', over: ring, faces: { you: { look: .3, brow: .9, mouth: 'flat' }, wom: { look: -.5, brow: 1, mouth: 'o' }, kidA: { look: .6, brow: 1, mouth: 'cry', tears: 1 }, kidB: { look: .4, brow: 1, mouth: 'cry', tears: 1 } } })}
    ${water(t, 1080, { amp: 10, alpha: .92 })}${rain(t, .9, 70)}`;
  return `${DEFS}${sc}${label(540, 360, 'WIE RAUS?', eout(prog(t, 16.0, 16.3)), K.amber, 80)}`;
}
