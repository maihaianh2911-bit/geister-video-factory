import { K, ground, bread, nestTop, routeAt, trail, antOnRoute, f1, cl, prog } from './lib.js';
// 26.6–29.4 Top-down: the followers keep to the trail and arrive at the bread on "Brot".
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 5; i++) { const u = cl((t - 26.6) * .36 - i * .13); const [x, y] = routeAt(u); ants += antOnRoute(Math.min(u, .9 - i * .02 * 0), t, false, { s: 1.6, k: i }); }
  const arrive = prog(t, 28.4, 28.7);
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, 1.1)}${bread(790, 470, 1)}${ants}
    ${arrive > 0 ? `<circle cx="790" cy="470" r="${f1(150 + 120 * arrive)}" fill="none" stroke="${K.trail}" stroke-width="${f1(12 * (1 - arrive))}"/>` : ''}`;
}
