// 1.30–2.52 · "zu schnell isst" — extreme close-up: the cone rushes into the open mouth
import { P, pastel, girl, cone, prog, eio, ein, back, lerp, hash } from '../lib.js';

export default function renderShot(t) {
  const p = ein(prog(t, 1.36, 1.78));
  const hit = t > 1.78 ? Math.exp(-(t - 1.78) * 7) * Math.sin((t - 1.78) * 60) * 12 : 0;
  const cx = lerp(1180, 700, p) + hit, cy = lerp(1500, 1170, p);
  let speed = '';
  if (p > 0 && p < 1 || (t > 1.78 && t < 2.0)) for (let i = 0; i < 6; i++) {
    const o = (1 - prog(t, 1.78, 2.0)) * .8, y = cy - 260 + i * 70 + 20 * hash(i);
    speed += `<path d="M ${cx + 120 + 40 * hash(i + 3)} ${y} L ${cx + 340 + 120 * hash(i + 7)} ${y + 80}" stroke="#fff" stroke-width="${14 - i}" stroke-linecap="round" opacity="${o}"/>`;
  }
  const open = t > 1.5;
  const sh = t > 1.78 ? 6 * Math.sin(t * 70) * Math.exp(-(t - 1.78) * 6) : 0;
  return `${pastel(t, { color: '#E1F4F1' })}
    <g transform="translate(${sh} 0)">${girl(470, 1320, 2.7, { t, id: 's2', eyes: t > 1.8 ? 'happy' : 'wide', look: 16, lookY: 10, mouth: open ? 'open' : 'o', tilt: -4 * eio(prog(t, 1.4, 1.8)), handR: [500, 900], handL: [-500, 900] })}</g>
    ${speed}
    ${cone(cx, cy, 1.55, { id: 's2c', rot: -38, t })}
    <path d="M 1080 1700 L ${cx + 60} ${cy + 140}" stroke="${P.ink}" stroke-width="96" stroke-linecap="round"/>
    <path d="M 1080 1700 L ${cx + 60} ${cy + 140}" stroke="${P.skin}" stroke-width="82" stroke-linecap="round"/>
    <g transform="translate(${cx + 50} ${cy + 130}) rotate(-38) scale(1.5)"><ellipse cx="0" cy="0" rx="48" ry="42" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/><path d="M -20 -30 Q -8 -14 -20 4 M -2 -34 Q 10 -14 -2 8 M 16 -30 Q 28 -14 16 6" stroke="${P.skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
}
