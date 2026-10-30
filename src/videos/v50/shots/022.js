// 40.64–42.75 · "Mediziner nennen das Kältekopfschmerz" — the doctor points to a chart: head + snowflake + pain bolt
import { P, pastel, doctor, snowflake, zap, prog, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const card = back(prog(t, 40.64, 40.9));
  const point = eio2(prog(t, 41.3, 41.65));
  const pop = back(prog(t, 41.6, 41.85));
  const cx = 700, cy = 640;
  const hx = lerp(215, 230, point), hy = lerp(400, -140, point);
  const head = `<path d="M -110 60 C -130 -80 -40 -150 40 -146 C 110 -140 140 -90 136 -30 L 160 20 L 136 30 Q 140 60 120 70 L 110 110 L 30 120 L 20 170 L -90 170 Z" fill="${P.bg2}" stroke="${P.ink}" stroke-width="8"/>`;
  return `${pastel(t, { color: '#E9F5F2' })}
    <rect x="80" y="1180" width="920" height="40" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="5"/>
    ${doctor(330, 1380, 1.12, { look: 10, handR: [hx, hy] })}
    ${point > .05 ? `<path d="M ${330 + hx * 1.12} ${1380 + hy * 1.12} L ${lerp(330 + hx * 1.12, cx - 60, point)} ${lerp(1380 + hy * 1.12, cy + 120, point)}" stroke="${P.ink}" stroke-width="16" stroke-linecap="round"/><path d="M ${330 + hx * 1.12} ${1380 + hy * 1.12} L ${lerp(330 + hx * 1.12, cx - 60, point)} ${lerp(1380 + hy * 1.12, cy + 120, point)}" stroke="#C9D3DC" stroke-width="8" stroke-linecap="round"/>` : ''}
    <g transform="translate(${cx} ${cy}) scale(${card})">
      <rect x="-230" y="-260" width="460" height="520" rx="36" fill="#fff" stroke="${P.ink}" stroke-width="8"/>
      <rect x="-80" y="-286" width="160" height="50" rx="16" fill="${P.teal}" stroke="${P.ink}" stroke-width="6"/>
      <g transform="translate(-10 20)">${head}
        ${snowflake(70, 60, .55 * pop, t * .4, P.cold)}
        ${zap(70, -95, .75 * pop)}</g>
    </g>`;
}
const eio2 = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
