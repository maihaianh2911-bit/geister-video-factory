// 7.52–11.1: in your kitchen there's no cold place — you look at the empty dashed corner; a crossed snowflake pops on "kalten"
import { K, DEFS, kitchen, person, bag, milk, meat, yog, cross, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const look = eio(prog(t, 7.6, 8.3));
  const put = eio(prog(t, 8.6, 9.3));
  const bx = lerp(480, 520, put), by = lerp(1000, 1060, put);
  const p = person(330, 1400, 1.05, { aR: [[430, 1020], [bx - 30, by - 110]], head: { look: lerp(.4, 1, look), mouth: look > .5 ? 'flat' : 's' } });
  const sf = back(prog(t, 10.0, 10.3)), x = eout(prog(t, 10.3, 10.6));
  const flake = sf > 0 ? `<g transform="translate(850 560) scale(${f1(sf)})"><circle r="90" fill="${K.n0}" stroke="${K.cyan}" stroke-width="5"/>${[0, 1, 2].map(i => `<path d="M 0 -60 V 60 M -16 -46 L 0 -30 L 16 -46 M -16 46 L 0 30 L 16 46" stroke="${K.cold}" stroke-width="7" stroke-linecap="round" transform="rotate(${i * 60})"/>`).join('')}${cross(0, 0, 70, x)}</g>` : '';
  const sc = `${kitchen(t, { fridge: 0, ghost: .9 })}${p.svg}${bag(bx, by, 1, `${milk(-50, -150)}${meat(40, -120, .9)}${yog(60, -160)}`)}${flake}`;
  return `${DEFS}${cam(sc, lerp(1.05, 1.15, eio(prog(t, 7.52, 11.1))), 600, 850)}`;
}
