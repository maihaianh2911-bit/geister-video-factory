// 59.54–61.80: du sleeps calmly; the pain gauge drops almost to zero and turns green ("kontrollieren" 60.54).
import { K, DEFS, BG, head, gauge, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 59.8, 60.6)), v = lerp(.62, .06, d);
  const pillow = `<path d="M -80 1250 Q 100 1170 400 1180 Q 700 1170 900 1260 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const br = 1 + .015 * Math.sin(t * 2.4);
  const h = head('du', 360, 960, 3.0 * br, { t, eyes: 'closed', brow: 0, mouth: 'flat', tilt: -10 });
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="400" cy="900" rx="560" ry="560" fill="url(#nCyan)" opacity=".35"/>${pillow}${h}${gauge(820, 1250, 820, v, 1)}`;
}
