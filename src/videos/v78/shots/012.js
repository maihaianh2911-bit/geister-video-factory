// 28.92–31.82: at the weekend you go on a bike ride ("Wochenende" 29.94, "Fahrradtour" 31.82) — pedalling along a path past trees
import { K, OL, f1, stick, calendar, cam, prog, lerp } from './lib.js';
export function bike(x, y, t, s = 1) {
  const W = (cx) => `<circle cx="${f1(x + cx * s)}" cy="${f1(y - 90 * s)}" r="${f1(90 * s)}" fill="none" ${OL(7)}/><path d="M ${f1(x + cx * s)} ${f1(y - 90 * s)} l ${f1(Math.cos(t * 9) * 80 * s)} ${f1(Math.sin(t * 9) * 80 * s)}" stroke="${K.grey}" stroke-width="4"/>`;
  return `${W(-150)}${W(150)}<path d="M ${f1(x - 150 * s)} ${f1(y - 90 * s)} L ${f1(x - 20 * s)} ${f1(y - 90 * s)} L ${f1(x - 60 * s)} ${f1(y - 240 * s)} L ${f1(x + 110 * s)} ${f1(y - 240 * s)} L ${f1(x + 150 * s)} ${f1(y - 90 * s)} M ${f1(x + 110 * s)} ${f1(y - 240 * s)} L ${f1(x + 90 * s)} ${f1(y - 300 * s)} M ${f1(x - 20 * s)} ${f1(y - 90 * s)} L ${f1(x - 60 * s)} ${f1(y - 240 * s)}" fill="none" stroke="${K.red}" stroke-width="${f1(12 * s)}" stroke-linejoin="round"/>
    <path d="M ${f1(x - 90 * s)} ${f1(y - 262 * s)} h ${f1(60 * s)}" ${OL(14)}/><path d="M ${f1(x + 70 * s)} ${f1(y - 300 * s)} h ${f1(50 * s)}" ${OL(10)}/>`;
}
export function rider(x, y, t, s, o = {}) {
  const c = [x - 20 * s, y - 90 * s], pa = t * 9;
  const pL = [c[0] + Math.cos(pa) * 40 * s, c[1] + Math.sin(pa) * 40 * s], pR = [c[0] - Math.cos(pa) * 40 * s, c[1] - Math.sin(pa) * 40 * s];
  // stick(x,y) is the ground point under the hips; hips sit on the saddle (x-60, y-262)
  return stick(x - 60 * s, y - 262 * s + 168 * s, s, { lean: 18, fL: pL, fR: pR, hL: [x + 95 * s, y - 300 * s], hR: [x + 115 * s, y - 300 * s], backArm: 'L', look: .8, ...o });
}
export default function renderShot(t) {
  const off = (t * 420) % 360;
  const trees = [0, 1, 2, 3, 4].map(i => { const tx = ((i * 360 - off * 1.0) % 1800 + 1800) % 1800 - 300; return `<path d="M ${f1(tx)} 1230 V 900" ${OL(14)}/><circle cx="${f1(tx)}" cy="820" r="120" fill="${K.grassD}" ${OL()}/>`; }).join('');
  const sc = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.bg}"/><circle cx="860" cy="260" r="70" fill="#FFD66B" ${OL(6)}/>${trees}<rect x="-60" y="1230" width="1200" height="800" fill="${K.grass}"/><path d="M -60 1230 H 1140" ${OL()}/>
    ${bike(540, 1300, t, 1.3)}${rider(540, 1300, t, 1.3, { shirt: K.teal, mouth: 'smile' })}`;
  return `${cam(sc, 1, 540, 1000)}${calendar(930, 150, 13)}`;
}
