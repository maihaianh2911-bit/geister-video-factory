// 13.22–14.72: the circus is in town — a striped tent goes up on a meadow by the river, banner ZIRKUS ALTHOFF
import { K, DEFS, tent, town, HL, grain, f1, cam, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const up = back(prog(t, 13.25, 13.85));
  const b = back(prog(t, 13.74, 14.0));
  const flag = 6 * Math.sin(t * 7);
  return `${DEFS}${cam(`<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${town(980)}
    <rect x="-60" y="970" width="1200" height="1000" fill="#8C9A68"/><path d="M -60 1000 Q 400 980 1140 1010" stroke="#7B8A58" stroke-width="20" fill="none"/>
    ${tent(540, 1330, 1.25, cl01(up))}
    ${[180, 900].map((x, i) => `<path d="M ${x} 1330 V 980" stroke="${K.ink}" stroke-width="8"/><path d="M ${x} 980 l ${70 + flag} 18 l -${70 + flag} 18 z" fill="${i ? K.olive : K.red}" ${'stroke="#3B2F2A" stroke-width="4"'}/>`).join('')}
    ${b > 0 ? `<g transform="translate(540 1260) scale(${f1(b)})"><rect x="-330" y="-62" width="660" height="110" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/>${HL('ZIRKUS ALTHOFF', 0, 22, 70, K.red, 0)}</g>` : ''}`, lerp(1, 1.05, prog(t, 13.22, 14.72)), 540, 1100)}${grain(t)}`;
}
const cl01 = v => Math.max(.02, Math.min(1.05, v));
