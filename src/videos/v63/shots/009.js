// 16.74–18.5: they dig — the shovel strikes metal with a spark (graben und beschädigen)
import { K, DEFS, grain, cam, shk, prog, eout, eio, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
export default function renderShot(t) {
  const d1 = eio(prog(t, 16.8, 17.3)), hit = t > 17.36;
  const sy = hit ? 520 : lerp(200, 520, d1);
  const [kx, ky] = shk(t, 17.36, 16, 9);
  const shovel = `<g transform="translate(560 ${f1(sy)}) rotate(-12)"><rect x="-14" y="-700" width="28" height="640" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M -90 -70 L 90 -70 L 80 70 Q 0 130 -80 70 Z" fill="#7D8589" stroke="${K.ink}" stroke-width="6"/></g>`;
  const spark = hit ? (() => { const p = prog(t, 17.36, 17.8); return [...Array(10)].map((_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M ${f1(560 + Math.cos(a) * 40 * p)} ${f1(650 + Math.sin(a) * 40 * p)} L ${f1(560 + Math.cos(a) * 170 * p)} ${f1(650 + Math.sin(a) * 170 * p)}" stroke="${K.goldL}" stroke-width="10" stroke-linecap="round" opacity="${f1(1 - p)}"/>`; }).join(''); })() : '';
  return `${DEFS}<g transform="translate(${f1(kx)} ${f1(ky)})">${cam(soilBg(2) + `<ellipse cx="540" cy="700" rx="300" ry="120" fill="#2A1F16"/>` + shovel + spark, 1, 540, 800)}</g>${grain(t)}`;
}
