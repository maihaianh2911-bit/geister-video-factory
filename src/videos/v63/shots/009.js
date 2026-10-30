// 16.74–18.5: they dig — two fists drive the shovel down into the pit; the blade strikes metal with a spark (graben und beschädigen)
import { K, DEFS, grain, cam, shk, prog, eio, ein, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
import { shovel } from './hands.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 16.74, 17.05)), drive = ein(prog(t, 17.05, 17.36)), hit = t >= 17.36;
  const by = hit ? 560 + 6 * prog(t, 17.36, 17.5) : lerp(lerp(470, 330, lift), 560, drive);
  const [kx, ky] = shk(t, 17.36, 16, 9);
  const spark = hit ? (() => { const p = prog(t, 17.36, 17.8); return [...Array(10)].map((_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M ${f1(560 + Math.cos(a) * 40 * p)} ${f1(700 + Math.sin(a) * 40 * p)} L ${f1(560 + Math.cos(a) * 170 * p)} ${f1(700 + Math.sin(a) * 170 * p)}" stroke="${K.goldL}" stroke-width="10" stroke-linecap="round" opacity="${f1(1 - p)}"/>`; }).join(''); })() : '';
  const gleam = hit ? `<path d="M 470 735 Q 560 700 650 735" fill="none" stroke="${K.patL}" stroke-width="10" opacity="${f1(prog(t, 17.4, 17.7))}"/>` : '';
  return `${DEFS}<g transform="translate(${f1(kx)} ${f1(ky)})">${cam(soilBg(2) + `<ellipse cx="540" cy="740" rx="300" ry="120" fill="#2A1F16"/>` + gleam + shovel(560, by, -78, { L: 760 }) + spark, 1, 540, 800)}</g>${grain(t)}`;
}
