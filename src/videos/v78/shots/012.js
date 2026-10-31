// 28.92–31.82: at the weekend you go on a bike ride ("Wochenende" 29.94, "Fahrradtour" 31.82) — pedalling along a path past trees; feet stay on the pedals, which turn round the bottom bracket
import { K, OL, f1, stick, calNote, cam, prog, lerp } from './lib.js';
// bottom bracket sits between saddle and wheels so both pedals stay within leg reach (|hip-BB| + crank < 2 x leg)
const BB = (x, y, s) => [x - 30 * s, y - 120 * s];
const CR = 32;
export const crankAngle = t => t * 7;
export function pedals(x, y, t, s = 1) {
  const c = BB(x, y, s), pa = crankAngle(t);
  return [[c[0] + Math.cos(pa) * CR * s, c[1] + Math.sin(pa) * CR * s], [c[0] - Math.cos(pa) * CR * s, c[1] - Math.sin(pa) * CR * s]];
}
export function bike(x, y, t, s = 1) {
  const [bx, by] = BB(x, y, s);
  const W = (cx) => `<circle cx="${f1(x + cx * s)}" cy="${f1(y - 90 * s)}" r="${f1(90 * s)}" fill="none" ${OL(7)}/><path d="M ${f1(x + cx * s)} ${f1(y - 90 * s)} l ${f1(Math.cos(t * 9) * 80 * s)} ${f1(Math.sin(t * 9) * 80 * s)}" stroke="${K.grey}" stroke-width="4"/>`;
  return `${W(-150)}${W(150)}<path d="M ${f1(x - 150 * s)} ${f1(y - 90 * s)} L ${f1(bx)} ${f1(by)} L ${f1(x - 60 * s)} ${f1(y - 240 * s)} L ${f1(x + 110 * s)} ${f1(y - 240 * s)} L ${f1(x + 150 * s)} ${f1(y - 90 * s)} M ${f1(x + 110 * s)} ${f1(y - 240 * s)} L ${f1(x + 90 * s)} ${f1(y - 300 * s)} M ${f1(bx)} ${f1(by)} L ${f1(x + 110 * s)} ${f1(y - 240 * s)}" fill="none" stroke="${K.red}" stroke-width="${f1(12 * s)}" stroke-linejoin="round"/>
    <path d="M ${f1(x - 90 * s)} ${f1(y - 262 * s)} h ${f1(60 * s)}" ${OL(14)}/><path d="M ${f1(x + 70 * s)} ${f1(y - 300 * s)} h ${f1(50 * s)}" ${OL(10)}/>
    <circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(22 * s)}" fill="${K.grey}" ${OL(5)}/>`;
}
// crank arm + pedal for one side (drawn behind the far leg / in front of the near leg)
export function crank(x, y, t, s, side) {
  const [bx, by] = BB(x, y, s), p = pedals(x, y, t, s)[side];
  return `<path d="M ${f1(bx)} ${f1(by)} L ${f1(p[0])} ${f1(p[1])}" stroke="${K.ink}" stroke-width="${f1(9 * s)}" stroke-linecap="round"/><rect x="${f1(p[0] - 22 * s)}" y="${f1(p[1] - 5 * s)}" width="${f1(44 * s)}" height="${f1(12 * s)}" rx="4" fill="${K.grey}" ${OL(4)}/>`;
}
export function rider(x, y, t, s, o = {}) {
  const [pL, pR] = pedals(x, y, t, s);
  // stick(x,y) is the ground point under the hips; hips sit on the saddle (x-60, y-262); feet rest on the pedals, knees forward
  return stick(x - 60 * s, y - 262 * s + 168 * s, s, { lean: 18, fL: [pL[0], pL[1] - 6 * s], fR: [pR[0], pR[1] - 6 * s], kneeL: -1, kneeR: -1, hL: [x + 95 * s, y - 300 * s], hR: [x + 115 * s, y - 300 * s], backArm: 'L', look: .8, ...o });
}
export default function renderShot(t) {
  const off = (t * 420) % 360;
  const trees = [0, 1, 2, 3, 4].map(i => { const tx = ((i * 360 - off * 1.0) % 1800 + 1800) % 1800 - 300; return `<path d="M ${f1(tx)} 1230 V 900" ${OL(14)}/><circle cx="${f1(tx)}" cy="820" r="120" fill="${K.grassD}" ${OL()}/>`; }).join('');
  const sc = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.bg}"/><circle cx="200" cy="300" r="70" fill="#FFD66B" ${OL(6)}/>${trees}<rect x="-60" y="1230" width="1200" height="800" fill="${K.grass}"/><path d="M -60 1230 H 1140" ${OL()}/>
    ${crank(540, 1300, t, 1.3, 1)}${bike(540, 1300, t, 1.3)}${rider(540, 1300, t, 1.3, { shirt: K.teal, mouth: 'smile' })}${crank(540, 1300, t, 1.3, 0)}`;
  return `${cam(sc, 1, 540, 1000)}${calNote(900, 150, ['AM', 'WOCHENENDE'])}`;
}
