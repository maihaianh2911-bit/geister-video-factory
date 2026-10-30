// 15.606–20.945: the way in — a schematic draws itself: two tunnels under the railway embankment ("Tunneln"), one ramp up ("Rampen"), the grounds on top ("Veranstaltungsgelände"); visitor dots start to flow
import { K, DEFS, siteMap, routePt, f1, prog, eio, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const tun = eio(prog(t, 17.3, 18.5)), ramp = eio(prog(t, 18.9, 19.8)), gr = eio(prog(t, 20.2, 20.8));
  let dots = '';
  for (let i = 0; i < 24; i++) { const st = 18.0 + hash(i) * 2.5; if (t < st) continue; const u = ((t - st) * .22) % 1; const lim = ramp < 1 ? .45 : gr < 1 ? .8 : 1; if (u > lim) continue;
    const [x, y] = routePt(i % 2, u); dots += `<circle cx="${f1(x + (hash(i * 3) - .5) * 60)}" cy="${f1(y + (hash(i * 5) - .5) * 60)}" r="12" fill="${K.c4}" stroke="${K.ink}" stroke-width="3"/>`; }
  return `${DEFS}${siteMap(t, { tun, ramp, ground: gr })}${dots}`;
}
