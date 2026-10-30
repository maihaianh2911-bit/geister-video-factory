// 17.34–18.98: pain gauge next to du's face drops only part of the way ("teilweise" 17.56) and stops in orange; the face still shows pain.
import { K, DEFS, BG, head, gauge, pain, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 17.5, 18.2)), v = lerp(1, .62, d) + .02 * Math.sin(t * 8);
  const pillow = `<path d="M -80 1250 Q 100 1170 400 1180 Q 700 1170 900 1260 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const h = head('du', 360, 960, 3.0, { t, eyes: 'open', look: .2, lookY: -.5, brow: lerp(1, .7, d), mouth: d > .6 ? 'down' : 'grit', sweat: .8, tilt: -10 });
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="400" cy="760" rx="700" ry="700" fill="url(#nLamp)" opacity=".6"/>${pillow}${pain(360, 960, 230, lerp(1, .55, d), t)}${h}${gauge(820, 1250, 820, v, 1)}`;
}
