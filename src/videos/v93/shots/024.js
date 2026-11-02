// L15b 63.98–66.66 Top-down close-up of du's face on the pillow in the orange lamp light: realisation (eyes wide → tired, sad brows).
// The day comes back as grey labels: GEREIZT (64.78), MÜDE (65.5), UNHÖFLICH (65.96).
import { K, frame, cam, chip, pool, pop } from './lib.js';
import { lyingHead } from './023.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="#2b2240"/>`;
  // pillow + sheet from above
  s += `<rect x="60" y="560" width="960" height="760" rx="140" fill="#efe6d8" stroke="${K.ink}" stroke-width="6"/><path d="M 120 700 q 200 -40 400 0 M 560 1180 q 200 40 400 0" stroke="#d9cdb8" stroke-width="8" fill="none"/>`;
  s += `<path d="M -80 1250 C 200 1180 800 1180 1160 1250 V 2000 H -80 Z" fill="#3f6f8f" stroke="${K.ink}" stroke-width="6"/><path d="M -80 1250 C 200 1200 800 1200 1160 1250" stroke="#5f8fb5" stroke-width="30" fill="none"/>`;
  s += pool(150, 700, 700, 700, 'v93orange', .9);
  const real = t > 64.0;
  s += lyingHead(540, 920, 270, t, { rot: 0, tired: t > 65.4, brow: real ? 'M -60 -40 L -18 -54 M 18 -54 L 60 -40' : 'M -58 -52 L -18 -52 M 18 -52 L 58 -52', rim: '#ffb46a' });
  s += chip(250, 420, 'GEREIZT', { p: pop(t, 64.78, .35), size: 54, bg: '#8c94a3', fill: '#fff', sq: true, rot: -6 });
  s += chip(840, 520, 'MÜDE', { p: pop(t, 65.5, .35), size: 54, bg: '#8c94a3', fill: '#fff', sq: true, rot: 5 });
  s += chip(540, 280, 'UNHÖFLICH', { p: pop(t, 65.96, .35), size: 54, bg: '#8c94a3', fill: '#fff', sq: true, rot: -2 });
  return frame(cam(s, 540, 900, push(t, 63.98, 66.66, 1.0, 1.08)), { tint: ['#1a1840', .12] });
}
