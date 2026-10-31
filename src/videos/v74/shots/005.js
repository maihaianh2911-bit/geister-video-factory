import { P, R, fig, speedLines, frame, prog, back, lerp } from './lib.js';
// 7.42–9.4 Three soldiers in close-up: they glance, then salute together on "gehorchen".
export default function renderShot(t) {
  const sal = back(prog(t, 7.86, 8.08));
  const glance = t < 7.85 ? Math.sin(prog(t, 7.42, 7.85) * Math.PI) : 0;
  // salute hand at the helmet brim, drawn over the head so it reads in front of the face
  const brim = sal > .7 ? (hx, hy) => `<path d="M ${hx + 46} ${hy + 30} L ${hx + 8} ${hy + 4}" stroke="#3B2F2A" stroke-width="44" stroke-linecap="round"/><path d="M ${hx + 46} ${hy + 30} L ${hx + 8} ${hy + 4}" stroke="#33507F" stroke-width="32" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="20" fill="#EBC29C" stroke="#3B2F2A" stroke-width="5"/>` : undefined;
  const head = (x, i) => fig(x, 1980, 1.45, { kind: 'soldier', aR: lerp(-6, -150, sal), bendR: lerp(0, -95, sal), aL: 8, propR: brim,
    look: i === 0 ? 12 * glance : i === 2 ? -12 * glance : 0, brow: sal > .5 ? 'calm' : 'up', mouth: 'flat' });
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${speedLines(0, 540, 900, 18, P.paperSh)}${head(200, 0)}${head(880, 2)}${head(540, 1)}`);
}
