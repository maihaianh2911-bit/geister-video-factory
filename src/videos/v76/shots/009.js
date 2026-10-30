// 14.10–15.90: medicine shelf — a helper's hand takes the OPIUM bottle; the other unlabelled remedies glow on "andere damalige Mittel" (14.98).
import { K, DEFS, BG, TX, arm, prog, eio, eout, lerp, f1 } from './lib.js';
const bottle = (x, y, w, h, col, lbl, glow = 0) => `${glow > 0 ? `<ellipse cx="${x}" cy="${y - h / 2}" rx="${w}" ry="${h * .7}" fill="url(#nLamp)" opacity="${f1(glow)}"/>` : ''}<path d="M ${x - w * .22} ${y - h} V ${y - h * .82} Q ${x - w / 2} ${y - h * .72} ${x - w / 2} ${y - h * .55} V ${y - 12} Q ${x - w / 2} ${y} ${x - w / 2 + 12} ${y} H ${x + w / 2 - 12} Q ${x + w / 2} ${y} ${x + w / 2} ${y - 12} V ${y - h * .55} Q ${x + w / 2} ${y - h * .72} ${x + w * .22} ${y - h * .82} V ${y - h} Z" fill="${col}" stroke="${K.ink}" stroke-width="5"/>
  <rect x="${x - w * .26}" y="${y - h - 30}" width="${w * .52}" height="34" rx="6" fill="${K.woodL}" stroke="${K.ink}" stroke-width="4"/>${lbl ? `<rect x="${x - w * .42}" y="${y - h * .5}" width="${w * .84}" height="${h * .3}" rx="8" fill="${K.paper}" stroke="${K.ink}" stroke-width="4"/>${TX(lbl, x, y - h * .5 + h * .2, Math.round(w * .2), K.ink)}` : ''}`;
export default function renderShot(t) {
  const reach = eio(prog(t, 14.1, 14.6)), lift = eio(prog(t, 14.75, 15.4)), glow = Math.sin(prog(t, 14.95, 15.8) * Math.PI);
  const bx = 540, by = lerp(1040, 900, lift) ;
  const hx = lerp(1000, bx + 10, reach), hy = lerp(760, by - 300, reach) + (reach >= 1 ? 0 : 0);
  const shelf = (y) => `<rect x="-60" y="${y}" width="1200" height="34" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/><path d="M -60 ${y + 34} H 1140" stroke="${K.woodD}" stroke-width="10"/>`;
  const held = reach >= 1;
  const opium = bottle(bx, held ? by : 1040, 260, 400, K.bottle, 'OPIUM');
  const handY = held ? by - 300 : hy;
  const fingers = `<path d="M ${f1(hx - 30)} ${f1(handY - 10)} q -18 30 0 56 M ${f1(hx + 30)} ${f1(handY - 10)} q 18 30 0 56" fill="none" stroke="${K.ink}" stroke-width="6" stroke-linecap="round"/>`;
  const a = arm([1240, 420], [1080, 560], [hx, handY], 1.3, K.shirt, { bare: true });
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="760" rx="700" ry="600" fill="url(#nLamp)" opacity=".7"/>${shelf(1040)}
    ${bottle(210, 1040, 180, 300, '#2E4A3A', '', glow)}${bottle(870, 1040, 170, 330, '#5A2E3A', '', glow)}${opium}${a}${fingers}`;
}
