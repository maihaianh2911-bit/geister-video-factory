// L15a 61.44–63.98 Night, bedroom lit only by an orange bedside lamp. du lies in bed on the back, staring at the ceiling. Camera pushes in.
import { K, frame, cam, setBedroom, bed, blanket, nightstand, T, prog } from './lib.js';
import { push } from './base.js';
// du's head lying on the pillow, face up toward the viewer (eyes look up at the ceiling)
export function lyingHead(x, y, r, t, o = {}) {
  const k = r / 100, blink = (t % 3.7) < .13 && !o.closed;
  let s = `<g transform="translate(${x} ${y}) scale(${k}) rotate(${o.rot ?? -12})"><circle r="100" fill="${K.ink}"/><ellipse cx="-36" cy="-52" rx="30" ry="15" fill="#fff" opacity=".16"/>`;
  if (o.closed || blink) s += `<path d="M -51 -6 Q -33 8 -15 -6 M 15 -6 Q 33 8 51 -6" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else s += `<ellipse cx="-33" cy="-6" rx="19" ry="21" fill="#fff"/><ellipse cx="33" cy="-6" rx="19" ry="21" fill="#fff"/><circle cx="-33" cy="-14" r="10" fill="${K.ink}"/><circle cx="33" cy="-14" r="10" fill="${K.ink}"/>${o.tired ? `<path d="M -57 -32 H -9 V -12 Q -33 -8 -57 -12 Z M 9 -32 H 57 V -12 Q 33 -8 9 -12 Z" fill="${K.ink}"/>` : ''}`;
  s += `<path d="${o.brow || 'M -60 -40 L -18 -54 M 18 -54 L 60 -40'}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M -20 56 Q 0 44 20 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (o.rim) s += `<path d="M 66 -76 C 100 -40 104 30 76 68" fill="none" stroke="${o.rim}" stroke-width="7" stroke-linecap="round" opacity=".75"/>`;
  return s + `</g>`;
}
export default function renderShot(t) {
  let s = setBedroom(t);
  s += bed(500, 1300);
  s += lyingHead(250, 1120, 130, t, { rim: '#ffb46a' });
  s += blanket(500, 1300);
  s += nightstand(80, 1260, 1, t);
  return frame(cam(s, 330, 1150, push(t, 61.44, 63.98, 1.25, 1.45)) + T(540, 300, 'AM ABEND', 88, { fill: K.yellow, stroke: K.ink, sw: 18, op: 1 - prog(t, 63.2, 63.7) }), { tint: ['#1a1840', .12] });
}
