// 5.44–7.66: she survives — Tuffi stands up in the shallow river, shakes her ears; a magnifier finds the one scratch on her rump
import { K, DEFS, river, tuffi, HL, grain, f1, cam, prog, eout, eio, back, lerp, WY } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 5.44, 6.0));
  const shake = Math.sin(prog(t, 5.8, 6.5) * Math.PI * 4) * (t > 5.8 && t < 6.5 ? 1 : 0);
  const o = { sit: lerp(.5, 0, up), ear: .5 + .5 * shake, tr: .1 + .1 * Math.abs(shake), eye: t > 6.9 && t < 7.05 ? 'shut' : 'n', scratch: prog(t, 6.6, 6.8), rot: 4 * shake };
  const scene = `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    <path d="M -60 620 Q 300 560 640 640 Q 900 690 1140 600 L 1140 980 L -60 980 Z" fill="#949A78"/>
    ${river(t, 960, 1500)}<rect x="-60" y="1480" width="1200" height="500" fill="${K.mud}"/>
    ${tuffi(560, 1260, 1.25, o)}
    <rect x="-60" y="1180" width="1200" height="320" fill="${K.water}" opacity=".55"/><path d="M -60 1180 q 90 -12 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0" fill="none" stroke="${K.waterL}" stroke-width="6"/>`;
  // magnifier on the rump scratch (Tuffi local (-133,-241) → world)
  const m = back(prog(t, 6.6, 6.95));
  const hx = 560 - 133 * 1.25, hy = 1260 - 241 * 1.25;
  const lens = m > 0 ? `<g transform="translate(${f1(hx + 10)} ${f1(hy - 250)}) scale(${f1(m)})">
      <clipPath id="w4l"><circle r="150"/></clipPath><circle r="150" fill="${K.ele}"/>
      <g clip-path="url(#w4l)"><g transform="scale(2.6) translate(${133 * 1.25 * 0 + 133} ${241})">${tuffi(0, 0, 1, { scratch: 1, blanket: false })}</g></g>
      <circle r="150" fill="none" stroke="${K.ink}" stroke-width="14"/><path d="M -60 150 L -110 290" stroke="${K.ink}" stroke-width="26" stroke-linecap="round"/></g>
      <path d="M ${f1(hx)} ${f1(hy)} L ${f1(hx + 10)} ${f1(hy - 100)}" stroke="${K.ink}" stroke-width="4" stroke-dasharray="10 8" opacity="${f1(m)}"/>` : '';
  return `${DEFS}${cam(scene, lerp(1, 1.06, eio(prog(t, 5.44, 7.66))), 540, 1000)}${lens}${grain(t)}`;
}
