import { K, card, ground, antTop, bread, breadGhost, routeAt, f1, cl, prog } from './lib.js';
// 43.4–45.0 Close top-down at the old spot: the ants arrive where the bread was and stop, antennae searching ("alten Platz").
export default function renderShot(t) {
  const R = { a: [540, 1380], c: [500, 1060], b: [560, 760] };
  let ants = '';
  for (let i = 0; i < 4; i++) { const u = cl((t - 43.0) * .9 - i * .3); const [x, y, a] = routeAt(u, R); const stop = u >= 1; ants += antTop(x + (stop ? (i - 1.5) * 90 : 0), y + (stop ? 40 * (i % 2) : 0), a + (stop ? 40 * Math.sin(t * 5 + i) : 0), 1.8, stop ? 0 : t * 20 + i, { ant: stop ? 18 * Math.sin(t * 12 + i) : undefined }); }
  let dots = ''; for (let i = 0; i < 30; i++) { const [x, y] = routeAt(i / 29, R); dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="13" fill="${K.trail}" opacity=".8"/>`; }
  return `${ground(7)}${dots}${breadGhost(560, 660, 2)}${ants}
    ${card(540, 330, 'ALTER PLATZ', 70, prog(t, 43.82, 44.05))}`;
}
