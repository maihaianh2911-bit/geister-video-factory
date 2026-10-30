// 2.52–4.0 · "Du beißt ein großes Stück ab" — profile: lunge, chomp on "Stück", a big piece is gone
import { P, pastel, profileHead, cone, arm, fingersOver, prog, eio, eout, back, lerp, hash } from '../lib.js';

export default function renderShot(t) {
  const lunge = eio(prog(t, 2.95, 3.3)) * (1 - eio(prog(t, 3.42, 3.8)));
  const hx = 330 + 120 * lunge, hy = 860 + 10 * lunge;
  const bite = t >= 3.32 ? 1 : 0;
  const chomp = t > 3.3 && t < 3.5 ? Math.sin(prog(t, 3.3, 3.5) * Math.PI) * 8 : 0;
  let bits = '';
  if (t > 3.32) for (let i = 0; i < 9; i++) {
    const dt = t - 3.32, a = -2.4 + i * .35;
    const x = 740 + Math.cos(a) * 260 * dt * (1 + hash(i)), y = 760 + Math.sin(a) * 260 * dt + 600 * dt * dt;
    if (dt < .6) bits += `<rect x="${x}" y="${y}" width="${16 + 10 * hash(i + 2)}" height="${14 + 8 * hash(i + 4)}" rx="5" fill="${i % 3 ? P.pink : '#fff'}" stroke="${P.ink}" stroke-width="3" opacity="${1 - dt / .6}" transform="rotate(${i * 40} ${x} ${y})"/>`;
  }
  const a = arm(lerp(330, 380, lunge) + 30, 1340, 830, 1240, 1);
  return `${pastel(t, { color: '#E6F5F2' })}
    <path d="M ${hx - 210} 1300 Q ${hx} ${1240} ${hx + 150} 1310 L ${hx + 230} 1980 L ${hx - 260} 1980 Z" fill="${P.shirt}" stroke="${P.ink}" stroke-width="7"/>
    <g transform="translate(0 ${chomp})">${profileHead(hx, hy, 1.55, { t, id: 's3', eye: t > 3.28 && t < 3.6 ? 'shut' : 'open' })}</g>
    ${a.svg}
    ${cone(830 - 10 * lunge, 1210, 1.05, { id: 's3c', rot: -12, bite, biteSide: -1, t })}
    ${fingersOver(830 - 10 * lunge, 1240)}
    ${bits}`;
}
