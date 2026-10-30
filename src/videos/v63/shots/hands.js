// v63 hands & held tools: every tool that moves is gripped by a fist whose forearm leaves the frame (Codex review 31/10)
import { K, f1 } from './lib.js';
const R = d => d * Math.PI / 180;
// fist wrapping a rod at (x,y). rodAng: rod direction (deg, screen). armAng: direction from the fist to the elbow. len: forearm length (px, unscaled)
export function fist(x, y, rodAng, armAng, s = 1, sleeve = K.night2, o = {}) {
  const a = R(armAng), len = (o.len ?? 700) * s;
  const wx = x + Math.cos(a) * 46 * s, wy = y + Math.sin(a) * 46 * s, ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
  const cx = x + Math.cos(a) * 92 * s, cy = y + Math.sin(a) * 92 * s, skin = o.skin || K.skin, w = 78 * s;
  const arm = `<path d="M ${f1(wx)} ${f1(wy)} L ${f1(ex)} ${f1(ey)}" stroke="${K.ink}" stroke-width="${f1(w + 10)}" stroke-linecap="round"/><path d="M ${f1(wx)} ${f1(wy)} L ${f1(ex)} ${f1(ey)}" stroke="${skin}" stroke-width="${f1(w * .8)}" stroke-linecap="round"/>
    <path d="M ${f1(cx)} ${f1(cy)} L ${f1(ex)} ${f1(ey)}" stroke="${K.ink}" stroke-width="${f1(w * 1.25 + 10)}" stroke-linecap="butt"/><path d="M ${f1(cx)} ${f1(cy)} L ${f1(ex)} ${f1(ey)}" stroke="${sleeve}" stroke-width="${f1(w * 1.25)}" stroke-linecap="butt"/>
    ${o.cuff ? `<path d="M ${f1(cx)} ${f1(cy)} L ${f1(cx + Math.cos(a) * 22 * s)} ${f1(cy + Math.sin(a) * 22 * s)}" stroke="#F2EEE6" stroke-width="${f1(w * 1.25)}"/>` : ''}`;
  // fist in rod-local coords (rod along local y); knuckles on the side facing away from the arm
  const side = Math.sin(R(armAng - rodAng)) >= 0 ? -1 : 1;
  const fistSvg = `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rodAng - 90)}) scale(${f1(s)})">
    <rect x="-46" y="-40" width="92" height="80" rx="30" fill="${skin}" stroke="${K.ink}" stroke-width="5"/>
    ${[-20, 0, 20].map(v => `<path d="M ${v} ${-40 * side} L ${v} ${-12 * side}" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <path d="M -40 ${18 * side} Q -6 ${4 * side} 30 ${22 * side}" fill="none" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/></g>`;
  return arm + fistSvg;
}
// shovel: blade top at (bx,by); d = direction from blade to handle (deg); two fists on the shaft, forearms leave toward armAng±spread
export function shovel(bx, by, d, o = {}) {
  const L = o.L || 640, s = o.s || 1, c = Math.cos(R(d)), sn = Math.sin(R(d));
  const ex = bx + c * L, ey = by + sn * L;
  const h1 = [bx + c * L * .42, by + sn * L * .42], h2 = [bx + c * L * .88, by + sn * L * .88];
  const arm = o.arm ?? d, sl = o.sleeve || K.night2;
  return `<path d="M ${f1(bx)} ${f1(by)} L ${f1(ex)} ${f1(ey)}" stroke="${K.ink}" stroke-width="38" stroke-linecap="round"/><path d="M ${f1(bx)} ${f1(by)} L ${f1(ex)} ${f1(ey)}" stroke="${K.brownD}" stroke-width="26" stroke-linecap="round"/>
    <g transform="translate(${f1(bx)} ${f1(by)}) rotate(${f1(d + 90)})"><path d="M -86 -10 L 86 -10 L 76 120 Q 0 190 -76 120 Z" fill="#7D8589" stroke="${K.ink}" stroke-width="6"/><path d="M -20 -10 L -20 -46 L 20 -46 L 20 -10" fill="#5E666A" stroke="${K.ink}" stroke-width="5"/></g>
    ${fist(h1[0], h1[1], d, arm - 18, s, sl)}${fist(h2[0], h2[1], d, arm + 14, s, sl)}`;
}
// white shirt collar + dark tie on a fig() silhouette (feet origin at x,y, scale s): the buyer/archaeologist's mark
export function collar(x, y, s, lean = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(lean)}) scale(${f1(s * 1000) / 1000})"><path d="M -30 -548 L 0 -470 L 30 -548 Z" fill="#F2EEE6"/><path d="M -9 -540 L 9 -540 L 12 -490 L 0 -472 L -12 -490 Z" fill="${K.red}"/></g>`;
}
