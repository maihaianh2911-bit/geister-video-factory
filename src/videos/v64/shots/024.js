// 47.0–49.08: soft landing — close on Tuffi sitting in the shallow river, her legs sink into the soft mud, mud rings spread
import { K, DEFS, tuffi, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const sink = eout(prog(t, 47.5, 48.4));
  let rings = '';
  for (let k = 0; k < 3; k++) { const p = prog(t, 47.56 + k * .25, 48.6 + k * .25); if (p > 0 && p < 1) rings += `<ellipse cx="560" cy="1250" rx="${f1(300 + 380 * p)}" ry="${f1(40 + 60 * p)}" fill="none" stroke="${K.mudD}" stroke-width="${f1(12 * (1 - p))}"/>`; }
  let blobs = '';
  for (let i = 0; i < 10; i++) { const p = prog(t, 47.56, 48.4); if (p > 0 && p < 1) { const a = Math.PI * (.1 + .8 * i / 9); blobs += `<circle cx="${f1(560 - Math.cos(a) * (300 + 260 * p))}" cy="${f1(1240 - Math.sin(a) * 260 * p + 380 * p * p)}" r="${f1(16 * (1 - p * .6))}" fill="${K.mud}" stroke="${K.ink}" stroke-width="3"/>`; } }
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    <path d="M -60 640 Q 300 580 640 660 Q 900 700 1140 620 L 1140 1000 L -60 1000 Z" fill="#949A78"/>
    <rect x="-60" y="990" width="1200" height="1000" fill="#7D8C80"/>
    ${tuffi(520, 1310 + 30 * sink, 1.5, { sit: .7, ear: .5, eye: t > 48.5 && t < 48.62 ? 'shut' : 'n', tr: .25 })}
    <rect x="-60" y="1230" width="1200" height="760" fill="${K.mud}"/><path d="M -60 1230 Q 300 ${f1(1215 - 15 * sink)} 560 1225 Q 820 ${f1(1240 + 10 * sink)} 1140 1230" fill="none" stroke="${K.mudD}" stroke-width="8"/>
    ${rings}${blobs}${grain(t)}`;
}
