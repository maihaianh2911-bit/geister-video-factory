// 18.25–20.16 · "Das löst das Schmerzsignal aus" — at the vessel a nerve fires: a bright signal races upward
import { P, pastel, vesselTube, glowLine, polyAt, zap, sting, prog, eout, back } from '../lib.js';

const NERVE = [[540, 1240], [560, 1000], [500, 760], [580, 520], [540, 160]];
export default function renderShot(t) {
  const fire = prog(t, 18.95, 19.05);
  const sp = prog(t, 19.0, 19.9);
  const [sx, sy] = polyAt(NERVE, sp);
  const pulse = 1 + .1 * Math.sin(t * 20) * (t > 18.6 && t < 19 ? 1 : 0);
  return `${pastel(t, { color: '#FFF6E2' })}
    ${vesselTube(540, 1300, 1400, 1.5, '#E5484D', t, 2.5)}
    ${glowLine(NERVE, 1, 12, t > 19 ? P.nerve : '#E9D9A6')}
    ${t >= 19 && sp < 1 ? `<circle cx="${sx}" cy="${sy}" r="60" fill="#fff" opacity=".7" filter="url(#blur20)"/><circle cx="${sx}" cy="${sy}" r="26" fill="#fff" stroke="${P.nerve}" stroke-width="8"/>` : ''}
    ${sting(540, 1230, 200, prog(t, 19.0, 19.5))}
    <g transform="translate(540 1230) scale(${pulse}) translate(-540 -1230)">${zap(540, 1230, 1.3 * back(prog(t, 18.9, 19.1)))}</g>
    ${sp >= 1 ? `<circle cx="540" cy="160" r="${60 + 30 * Math.sin(t * 12)}" fill="${P.nerve}" opacity=".6" filter="url(#blur20)"/>` : ''}`;
}
