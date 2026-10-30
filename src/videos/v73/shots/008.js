// 20.945–25.052: more and more people arrive — the dots pile up where tunnels meet the ramp; the access area becomes the bottleneck ("Engpass")
import { K, DEFS, siteMap, routePt, card, cam, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const n = Math.floor(lerp(30, 140, prog(t, 21.0, 24.0)));
  let dots = '';
  for (let i = 0; i < n; i++) {
    const side = i % 2, st = hash(i * 1.7);
    // each dot heads for the junction and queues there: the queue grows outward over time
    const q = Math.floor(i / 2);
    const jx = 540 + (side ? 1 : -1) * (40 + (q % 9) * 30) + (hash(i * 3) - .5) * 20, jy = 1200 + Math.floor(q / 9) * 26 * (hash(i) > .5 ? 1 : -1) + (hash(i * 5) - .5) * 30;
    const arrive = cl01((t - 21.0 - st * 2.5) / 1.2);
    const x = lerp(side ? 1180 : -100, jx, arrive), y = lerp(1240, jy, arrive);
    dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="11" fill="${K.c4}" stroke="${K.ink}" stroke-width="3"/>`;
  }
  for (let i = 0; i < 10; i++) { const u = ((t * .08 + i / 10) % 1) * .35 + .45; const [x, y] = routePt(0, u); dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="11" fill="${K.c4}" stroke="${K.ink}" stroke-width="3"/>`; }
  const rg = eout(prog(t, 24.1, 24.5));
  const inner = `${siteMap(t, {})}${dots}${rg > 0 ? `<ellipse cx="540" cy="1200" rx="${f1(170 * rg)}" ry="${f1(120 * rg)}" fill="none" stroke="${K.red}" stroke-width="10"/>` : ''}`;
  return `${DEFS}${cam(inner, lerp(1, 1.45, eio(prog(t, 20.95, 23.0))), 540, 1100, 0, -100)}${card(540, 330, 'ENGPASS', rg, 70, K.red)}`;
}
const cl01 = x => Math.min(1, Math.max(0, x));
