// v78 sets for this video only: bathroom, shower, bedroom, washing machine, skin lens content
import { K, OL, LW, f1, TX, BG, lerp, hash, cl } from './lib.js';
export const FY = 1350, FS = 1.5; // figure ground line and scale in full shots
// bathroom wall + floor; sink with tap at (sx, top y 1050)
export function bathroom(o = {}) {
  let tiles = '';
  for (let i = 0; i < 9; i++) tiles += `<path d="M ${i * 140 - 40} 0 V 1360" stroke="${K.tileD}" stroke-width="4"/><path d="M -60 ${i * 150} H 1140" stroke="${K.tileD}" stroke-width="4"/>`;
  return `${BG(K.tile)}${tiles}<rect x="-60" y="1350" width="1200" height="700" fill="${K.fence}"/><path d="M -60 1350 H 1140" ${OL()}/>${o.sink === false ? '' : sink(o.sx ?? 780)}`;
}
export function sink(x) {
  return `<rect x="${x - 60}" y="560" width="120" height="300" rx="14" fill="${K.paper}" ${OL(6)}/>
    <rect x="${x - 170}" y="1030" width="340" height="40" rx="10" fill="${K.white}" ${OL()}/><path d="M ${x - 150} 1070 Q ${x} 1180 ${x + 150} 1070" fill="${K.white}" ${OL()}/><rect x="${x - 20}" y="1150" width="40" height="200" fill="${K.white}" ${OL(6)}/>
    <path d="M ${x + 70} 1030 V 980 Q ${x + 70} 950 ${x + 40} 950 H ${x + 20}" fill="none" stroke="${K.grey}" stroke-width="16" stroke-linecap="round"/>`;
}
export const water = (x, y0, y1, a = 1) => a <= 0 ? '' : `<path d="M ${x} ${y0} V ${y1}" stroke="${K.water}" stroke-width="10" stroke-linecap="round" opacity="${f1(a)}"/>`;
// shower stall: curtain covers the body from shoulders down; head at (x, hy)
export function shower(x, t, o = {}) {
  const on = o.on ?? 1;
  let drops = '';
  if (on > 0) for (let i = 0; i < 18; i++) { const ph = (t * 1.6 + hash(i)) % 1; drops += `<path d="M ${f1(x - 120 + hash(i * 3) * 240)} ${f1(330 + ph * 560)} v 26" stroke="${K.water}" stroke-width="6" stroke-linecap="round" opacity="${f1(on * (1 - ph * .4))}"/>`; }
  return `<path d="M ${x - 30} 160 V 230 Q ${x - 30} 260 ${x} 270 L ${x + 40} 280" fill="none" stroke="${K.grey}" stroke-width="14" stroke-linecap="round"/><path d="M ${x + 10} 300 L ${x + 90} 260 L ${x + 120} 320 Z" fill="${K.grey}" ${OL(5)}/>${drops}`;
}
export function curtain(x0, x1, top = 820) {
  let folds = '';
  for (let x = x0 + 40; x < x1; x += 70) folds += `<path d="M ${x} ${top + 20} Q ${x + 14} ${top + 300} ${x} 1350" stroke="${K.blue}" stroke-width="6" fill="none" opacity=".45"/>`;
  return `<path d="M ${x0 - 30} ${top - 10} H ${x1 + 30}" ${OL(10)}/><path d="M ${x0} ${top} H ${x1} V 1350 H ${x0} Z" fill="${K.water}" ${OL()}/>${folds}`;
}
// bedroom: bed with pillow (pillow centre px,py) and duvet
export function bedroom(o = {}) {
  const sm = o.stripped ? 1 : 0;
  return `${BG(K.bg)}<rect x="640" y="260" width="300" height="360" rx="10" fill="#CFE0F0" ${OL()}/><path d="M 790 260 V 620 M 640 440 H 940" ${OL(6)}/>
    <rect x="-60" y="1350" width="1200" height="700" fill="${K.fence}"/><path d="M -60 1350 H 1140" ${OL()}/>
    <rect x="80" y="880" width="40" height="470" rx="10" fill="${K.wood}" ${OL()}/><rect x="80" y="1100" width="920" height="140" rx="16" fill="${K.wood}" ${OL()}/><rect x="960" y="1050" width="40" height="300" rx="10" fill="${K.wood}" ${OL()}/>
    <rect x="110" y="1020" width="880" height="90" rx="20" fill="${sm ? '#F4F4F0' : K.sheet}" ${OL()}/>`;
}
export const pillow = (x, y, s = 1, cover = true) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -120 -40 Q -130 -60 -100 -62 H 100 Q 130 -60 120 -40 V 40 Q 130 60 100 62 H -100 Q -130 60 -120 40 Z" fill="${cover ? K.pillow : '#ECE8DE'}" ${OL()}/>${cover ? '' : `<path d="M -60 -10 h 40 M 20 20 h 50" stroke="${K.grey}" stroke-width="5"/>`}</g>`;
export const duvet = (x0, x1, y, lift = 0) => `<path d="M ${x0} ${f1(y - lift)} Q ${(x0 + x1) / 2} ${f1(y - 50 - lift)} ${x1} ${f1(y - lift)} L ${x1 + 10} ${y + 90} H ${x0 - 10} Z" fill="${K.sheet}" ${OL()}/><path d="M ${x0 + 60} ${f1(y + 30 - lift * .5)} H ${x1 - 60}" stroke="${K.white}" stroke-width="8" opacity=".7"/>`;
// skin patch for lens close-ups: base skin colour, pores, optional sweat/dirt/flakes
export function skin(o = {}) {
  let s = `<rect x="-60" y="-60" width="1200" height="2040" fill="${o.col || K.skin}"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${f1(hash(i * 3.1) * 1080)}" cy="${f1(hash(i * 5.3) * 1920)}" r="${f1(6 + hash(i) * 6)}" fill="${K.skinD}" opacity=".6"/>`;
  return s;
}
export const sweat = (x, y, r = 22, a = 1) => a <= 0 ? '' : `<path d="M ${f1(x)} ${f1(y - r * 1.5)} Q ${f1(x + r)} ${f1(y - r * .2)} ${f1(x)} ${f1(y + r)} Q ${f1(x - r)} ${f1(y - r * .2)} ${f1(x)} ${f1(y - r * 1.5)} Z" fill="${K.water}" stroke="${K.ink}" stroke-width="4" opacity="${f1(cl(a))}"/>`;
export const bacterium = (x, y, s = 1, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-34" y="-16" width="68" height="32" rx="16" fill="${K.bact}" stroke="${K.ink}" stroke-width="4"/><circle cx="-10" cy="-2" r="4" fill="${K.ink}"/><circle cx="10" cy="-2" r="4" fill="${K.ink}"/></g>`;
// washing machine at (x, ground y)
export const washer = (x, y, o = {}) => `<rect x="${x - 170}" y="${y - 420}" width="340" height="420" rx="24" fill="${K.white}" ${OL()}/><rect x="${x - 170}" y="${y - 420}" width="340" height="70" rx="20" fill="${K.paper}" ${OL(6)}/><circle cx="${x + 110}" cy="${y - 385}" r="16" fill="${K.grey}"/>
  <circle cx="${x}" cy="${y - 180}" r="120" fill="${K.water}" ${OL()}/><circle cx="${x}" cy="${y - 180}" r="90" fill="${o.full ? K.sheet : '#BFE1F2'}" ${OL(5)}/>`;
