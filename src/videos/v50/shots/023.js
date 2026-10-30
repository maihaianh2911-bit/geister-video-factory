// 42.75–44.86 · "viele sagen einfach Hirnfrost" — frost creeps over a brain, the HIRNFROST stamp slams down
import { P, pastel, label, snowflake, prog, eio, eout, back, lerp, mix, hash } from '../lib.js';

export default function renderShot(t) {
  const fr = eio(prog(t, 42.85, 43.7));
  const st = prog(t, 43.62, 43.8);
  const land = t >= 43.8;
  const sh = land ? 16 * Math.exp(-(t - 43.8) * 7) * Math.sin(t * 85) : 0;
  const brain = mix('#FFB7C5', '#CFE8FA', fr);
  let crystals = '';
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2, r = 260 + 30 * hash(i);
    const p = prog(fr, i / 20, i / 20 + .3);
    if (p > 0) crystals += snowflake(540 + Math.cos(a) * r, 760 + Math.sin(a) * r * .72, .35 * p, i, '#fff');
  }
  let shards = '';
  if (land) for (let i = 0; i < 10; i++) { const p = prog(t, 43.8, 44.4), a = i / 10 * Math.PI * 2; if (p < 1) shards += `<path d="M ${540 + Math.cos(a) * (300 + 300 * p)} ${1180 + Math.sin(a) * (60 + 140 * p)} l 14 -26 l 14 26 Z" fill="${P.coldL}" stroke="${P.ink}" stroke-width="3" opacity="${1 - p}"/>`; }
  const sc = land ? 1 : lerp(2.4, 1, ein2(st));
  return `${pastel(t, { color: mix('#FDEFF2', '#E2F0FA', fr) })}
    <g transform="translate(${sh} ${sh * .6})"><g transform="translate(540 740) scale(1.3) translate(-540 -740)">
    <ellipse cx="540" cy="760" rx="330" ry="250" fill="${P.coldL}" opacity="${.5 * fr}" filter="url(#blur40)"/>
    <path d="M 260 820 C 180 700 260 520 400 520 C 440 450 600 440 650 500 C 780 470 880 580 840 700 C 900 800 820 920 700 900 C 640 960 480 960 420 910 C 320 940 230 900 260 820 Z" fill="${brain}" stroke="${P.ink}" stroke-width="10"/>
    <path d="M 540 520 C 520 620 560 760 540 920 M 340 640 q 60 -30 100 20 q 40 50 90 0 M 590 620 q 50 -40 100 0 q 50 40 110 0 M 320 790 q 60 -40 110 10 M 620 800 q 60 -40 120 0" stroke="${mix(P.pinkD, P.cold, fr)}" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${crystals}</g>
    ${st > 0 ? label('HIRNFROST', 540, 1180, 120, { scale: sc, rot: -6, fill: P.cold, color: '#fff', w: 760 }) : ''}${shards}</g>`;
}
const ein2 = x => x * x * x;
