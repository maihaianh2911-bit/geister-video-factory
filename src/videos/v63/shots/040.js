// 78.0–81.08: what the arc measures — on the horizon the sunrise point wanders between two ends over the year
import { K, DEFS, grain, prog, eio, lerp, f1, TX } from './lib.js';
export default function renderShot(t) {
  const p = (t - 78.3) / 2.6, u = p < 0 ? 0 : .5 - .5 * Math.cos(Math.min(1, p) * Math.PI * 2);
  const x = lerp(260, 820, u), hy = 1000;
  const path = `M 260 ${hy} A 300 120 0 0 1 820 ${hy}`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nDawn)"/>
    <rect x="-60" y="${hy}" width="1200" height="1000" fill="${K.oliveD}"/><path d="M -60 ${hy} H 1140" stroke="${K.ink}" stroke-width="6"/>
    <path d="${path}" fill="none" stroke="${K.gold}" stroke-width="14" opacity=".9"/>
    <path d="M 260 ${hy} V ${hy - 40} M 820 ${hy} V ${hy - 40}" stroke="${K.ink}" stroke-width="8"/>
    <circle cx="${f1(x)}" cy="${hy}" r="90" fill="#FFD27A"/><circle cx="${f1(x)}" cy="${hy}" r="200" fill="url(#nGold)"/>
    <rect x="-60" y="${hy}" width="1200" height="1000" fill="${K.oliveD}" opacity=".97"/><path d="M -60 ${hy} H 1140" stroke="${K.ink}" stroke-width="6"/>
    <path d="M ${f1(x)} ${hy + 30} V ${hy + 120}" stroke="${K.goldL}" stroke-width="10" stroke-linecap="round"/>${grain(t)}`;
}
