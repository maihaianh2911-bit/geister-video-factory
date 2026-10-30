// 0–3.06: cover — an open window at night, three mosquitoes circle the warm lamp; on "verschwinden" they dissolve into sparks
import { K, DEFS, BG, vig, stars, kcard, mosquito, f1, cam, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const gone = prog(t, 1.72, 2.25);
  let mos = '', spark = '';
  for (let i = 0; i < 3; i++) {
    const ph = t * (1.6 + i * .3) + i * 2.1;
    const x = 540 + Math.cos(ph) * (150 + i * 40), y = 640 + Math.sin(ph * 1.3) * (90 + i * 20);
    const ang = Math.cos(ph) > 0 ? -12 : 12, dir = -Math.sin(ph) >= 0 ? 1 : -1;
    if (gone < 1) mos += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${dir} 1)">${mosquito(0, 0, 1.25 - i * .12, { t: t + i, ang, alpha: 1 - gone, male: i === 1 })}</g>`;
    if (gone > 0 && gone < 1) for (let k = 0; k < 9; k++) { const a = hash(i * 9 + k) * 6.28, r = 20 + 140 * eout(gone); spark += `<circle cx="${f1(x + Math.cos(a) * r)}" cy="${f1(y + Math.sin(a) * r - 40 * gone)}" r="${f1(6 * (1 - gone) + 1)}" fill="${K.cyan}" opacity="${f1(1 - gone)}"/>`; }
  }
  const curt = s => `<path d="M ${s < 0 ? 150 : 930} 170 Q ${f1((s < 0 ? 230 : 850) + 14 * Math.sin(t * 1.4))} 600 ${s < 0 ? 160 : 920} 1060 L ${s < 0 ? 250 : 830} 1060 Q ${f1((s < 0 ? 300 : 780) + 10 * Math.sin(t * 1.4 + 1))} 600 ${s < 0 ? 250 : 830} 170 Z" fill="#3B2F5A" stroke="${K.ink}" stroke-width="4"/>`;
  const win = `<rect x="170" y="200" width="740" height="840" fill="url(#mNight)" stroke="${K.ink}" stroke-width="10"/>${stars(36, 3, 1000).replace(/cy="(\d+)/g, (m, v) => `cy="${200 + (+v) * .8}`)}
    <circle cx="760" cy="340" r="54" fill="#E8EEFF"/><circle cx="740" cy="330" r="54" fill="url(#mNight)" opacity=".0"/>
    <path d="M 170 900 Q 340 840 540 880 Q 740 920 910 860 L 910 1040 L 170 1040 Z" fill="#141B3A"/>
    <rect x="160" y="1030" width="760" height="40" fill="${K.woodD}" stroke="${K.ink}" stroke-width="5"/>
    <ellipse cx="540" cy="640" rx="360" ry="300" fill="url(#mLamp)" opacity=".55"/>`;
  const lamp = `<g transform="translate(540 1030)"><path d="M -14 0 L -14 -120 L 14 -120 L 14 0 Z" fill="#5A5E7A" stroke="${K.ink}" stroke-width="4"/><path d="M -90 -120 L -50 -220 L 50 -220 L 90 -120 Z" fill="${K.warm}" stroke="${K.ink}" stroke-width="4"/><ellipse cx="0" cy="-60" rx="160" ry="120" fill="url(#mLamp)"/></g>`;
  const sc = cam(`${BG(K.wall)}${win}${curt(-1)}${curt(1)}<rect x="130" y="160" width="820" height="26" rx="10" fill="${K.woodD}" stroke="${K.ink}" stroke-width="4"/>${lamp}${mos}${spark}`, lerp(1.04, 1, eio(prog(t, 0, 3.06))), 540, 700);
  return `${DEFS}${sc}${kcard(540, 1250, 'OHNE STECHMÜCKEN?', 1, { sz: 76, col: K.sun })}${vig()}`;
}
