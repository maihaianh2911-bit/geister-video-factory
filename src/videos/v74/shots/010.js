import { P, ST, cobbles, fig, rowHouses, sky, frame, tag, prog, back, lerp } from './lib.js';
// 17.2–18.9 Out of work: on the street he turns out his empty trouser pockets on "arbeitslos".
export default function renderShot(t) {
  const out = back(prog(t, 17.3, 17.55));
  const shrug = Math.sin(prog(t, 17.7, 18.3) * Math.PI);
  const lining = s => (hx, hy) => out > 0 ? `<g transform="translate(${hx + s * 6} ${hy + 18}) scale(${s * out} ${out})"><path d="M -6 0 Q 34 6 40 46 Q 10 60 -4 34 Z" fill="${P.white}" ${ST(4)}/></g>` : '';
  return frame(t, `${sky()}${rowHouses(1200, P.paperDk, 1800)}${cobbles(1200, 1920)}
    <g transform="translate(760 0)"><rect x="0" y="560" width="260" height="640" fill="#2A221E" ${ST(6)}/><rect x="10" y="570" width="240" height="630" fill="${P.woodSh}" ${ST(5)}/><circle cx="210" cy="900" r="12" fill="${P.gold}" ${ST(3)}/></g>
    ${fig(470, 1700, 1.45, { kind: 'voigtCiv', aL: lerp(8, 26, out) + 14 * shrug, bendL: -14 * shrug, aR: lerp(-8, -26, out) - 14 * shrug, bendR: 14 * shrug, propL: lining(-1), propR: lining(1), headTilt: -5 * shrug, lookY: 10, look: -4, mouth: 'frown', brow: 'worried' })}
    ${tag(540, 330, 'ARBEITSLOS', back(prog(t, 17.32, 17.55)), { sz: 64, rot: -3 })}`);
}
