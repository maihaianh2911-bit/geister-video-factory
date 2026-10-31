// 6.85–8.67: close-up of the face — eyes widen, sweat, pulse; tag WACH on "Bewusstsein" (7.43).
import { K, DEFS, BG, head, tag, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const w = eout(prog(t, 7.25, 7.55)), sw = eio(prog(t, 6.95, 8.2));
  const beat = (t2) => { const p = ((t2 - 6.85) * 1.6) % 1; return Math.exp(-p * 6); };
  const pulse = beat(t);
  const pillow = `<path d="M -80 1240 Q 120 1160 540 1180 Q 960 1160 1160 1240 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const h = head('du', 540, 900, 4.2, { t, eyes: w > .5 ? 'wide' : 'open', look: .5 + .3 * Math.sin(t * 3), lookY: -.2, brow: .5 + .5 * w, mouth: w > .5 ? 'o' : 'down', sweat: sw, tilt: -6 });
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="700" rx="760" ry="760" fill="url(#nLamp)" opacity=".8"/>${pillow}<circle cx="540" cy="900" r="${f1(330 + 20 * pulse)}" fill="none" stroke="${K.red}" stroke-width="6" opacity="${f1(.35 * pulse)}"/>${h}${tag(540, 260, 'WACH', w, 92, K.lamp)}`;
}
