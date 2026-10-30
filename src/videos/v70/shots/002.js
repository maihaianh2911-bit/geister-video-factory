// 2.28–4.88: top view — on the slippery road the car loses control ("außer Kontrolle"): the rear swings out, it slides sideways toward the water
import { K, DEFS, BG, carTop, rain, water, f1, prog, eio, ein, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const u = prog(t, 2.28, 4.88), slide = ein(prog(t, 3.3, 4.88));
  const yaw = lerp(0, 58, eio(prog(t, 3.5, 4.7))) + 4 * Math.sin(prog(t, 3.3, 3.7) * Math.PI);
  const x = lerp(470, 640, slide), y = lerp(1180, 820, u);
  // tyre marks follow the rear axle
  let marks = '';
  for (let i = 0; i < 14; i++) { const tt = lerp(3.3, t, i / 13); if (tt > t || t < 3.35) break;
    const sl = ein(prog(tt, 3.3, 4.88)), yw = (lerp(0, 58, eio(prog(tt, 3.5, 4.7)))) * Math.PI / 180, cx = lerp(470, 640, sl), cy = lerp(1180, 820, prog(tt, 2.28, 4.88));
    for (const sd of [-1, 1]) marks += `<circle cx="${f1(cx + Math.cos(yw) * 110 * sd * .78 - Math.sin(yw) * 210 * .78)}" cy="${f1(cy + Math.sin(yw) * 110 * sd * .78 + Math.cos(yw) * 210 * .78)}" r="14" fill="#0E1215" opacity=".8"/>`; }
  const sc = `${BG('#16211D')}<rect x="200" y="-60" width="560" height="2040" fill="${K.road}" stroke="${K.ink}" stroke-width="6"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="472" y="${f1(((i * 380 + t * 300) % 2280) - 300)}" width="16" height="170" fill="#6A7378"/>`).join('')}
    ${water(t, 0, { x0: 840, amp: 0 }).replace('M 840 0', 'M 840 -60')}<path d="M 760 -60 L 760 1980" stroke="#2E3A34" stroke-width="80"/><path d="M 800 -60 V 1980" stroke="${K.ink}" stroke-width="6"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${f1(880 + hash(i) * 180)} ${f1(i * 300 + 80)} q 40 -14 80 0" fill="none" stroke="${K.waterL}" stroke-width="5" opacity=".7"/>`).join('')}
    ${marks}${carTop(x, y, .78, yaw, { lights: 1 })}${rain(t, .9, 70, 0)}`;
  return `${DEFS}${sc}`;
}
