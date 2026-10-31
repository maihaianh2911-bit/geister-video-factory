// 30.86–32.46: deep operations were extremely hard — the body diagram slides left and a difficulty gauge beside it
// climbs high into the red zone (not a ban); headline ÄUSSERST SCHWER ("schwer" 31.03).
import { K, DEFS, BG, TX, gauge, prog, eio, eout, f1 } from './lib.js';
import { bodyDiagram } from './lib2.js';
export default function renderShot(t) {
  const sl = eio(prog(t, 30.86, 31.15));
  const rise = eout(prog(t, 30.95, 31.4)), wob = .03 * Math.sin((t - 31.4) * 10) * Math.exp(-Math.max(0, t - 31.4) * 3) * (t > 31.4 ? 1 : 0);
  const v = .88 * rise + wob, ga = eout(prog(t, 30.9, 31.1)), hd = eout(prog(t, 30.98, 31.2));
  const s = 1 - .12 * sl, dx = -170 * sl;
  const glow = `<ellipse cx="540" cy="680" rx="230" ry="320" fill="url(#nRed)" opacity="${f1(.55 * rise * (.8 + .2 * Math.sin(t * 6)))}"/>`;
  const body = `<g transform="translate(${f1(540 + dx)} 900) scale(${s.toFixed(3)}) translate(-540 -900)">${glow}${bodyDiagram(t, { glowOrg: 1, ring: 1 })}</g>`;
  const head = `<g opacity="${f1(1 - hd)}">${TX('TIEF IM KÖRPER', 540, 150, 80, K.orange)}</g><g opacity="${f1(hd)}">${TX('ÄUSSERST SCHWER', 540, 150, 80, K.red)}</g>`;
  return `${DEFS}${BG()}${body}${gauge(880, 1120, 560, v, ga, 'SCHWIERIG')}${head}`;
}
