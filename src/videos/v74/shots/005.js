import { P, R, fig, speedLines, frame, prog, back, lerp } from './lib.js';
// 7.42–9.4 Three soldiers in close-up: they glance, then salute together on "gehorchen".
export default function renderShot(t) {
  const sal = back(prog(t, 7.86, 8.08));
  const glance = t < 7.85 ? Math.sin(prog(t, 7.42, 7.85) * Math.PI) : 0;
  const head = (x, i) => fig(x, 1980, 1.6, { kind: 'soldier', aR: lerp(-6, -150, sal), bendR: lerp(0, -95, sal), aL: 8,
    look: i === 0 ? 12 * glance : i === 2 ? -12 * glance : 0, brow: sal > .5 ? 'calm' : 'up', mouth: 'flat' });
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${speedLines(0, 540, 900, 18, P.paperSh)}${head(230, 0)}${head(850, 2)}${head(540, 1)}`);
}
