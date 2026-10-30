// 57.5–60.34: water molecules pass through the membrane into the egg ("durch die Haut ins Ei")
import { K, OL, f1, arrow, prog, eio, lerp, hash } from './lib.js';
import { C, eggD } from './sets.js';
export default function renderShot(t) {
  const s = 5.2;
  let w = '';
  for (let i = 0; i < 10; i++) {
    const ang = -2.6 + i * .52, ph = ((t - 57.7) * .45 + hash(i)) % 1;
    if (t < 57.7 + hash(i) * .5) continue;
    const r0 = 430, r1 = 230, r = lerp(r0, r1, ph);
    const x = 540 + Math.cos(ang) * r, y = 900 + Math.sin(ang) * r * 1.2;
    w += `<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="${C.water}" ${OL(4)}/>`;
  }
  const ar = [-2.2, -.5, 1.0, 2.6].map((a, i) => arrow(540 + Math.cos(a) * 470, 900 + Math.sin(a) * 560, 540 + Math.cos(a) * 330, 900 + Math.sin(a) * 400, K.blue, 14, eio(prog(t, 58.6 + i * .1, 59.1 + i * .1)))).join('');
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="#DCEFF6"/>
  <g transform="translate(540 900) scale(${s})"><path d="${eggD(48, 60)}" fill="${C.white}"/><ellipse cx="0" cy="11" rx="24" ry="25" fill="${C.yolk}" ${OL(5 / s)}/>
  <path d="${eggD(48, 60)}" fill="none" stroke="${K.teal}" stroke-width="${f1(7 / s)}"/><path d="${eggD(48, 60)}" fill="none" stroke="${K.ink}" stroke-width="${f1(5 / s)}" stroke-dasharray="${f1(14 / s)} ${f1(10 / s)}"/></g>${w}${ar}`;
}
