// 92.4–95.556: … perhaps in a safe nobody knows about — the disc inside a safe, the heavy door swings shut
import { K, DEFS, BG, disc, grain, cam, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c = ein(prog(t, 92.6, 93.6)), dark = eio(prog(t, 94.2, 95.4));
  const door = `<g transform="translate(160 0) scale(${f1(1 - c)} 1) translate(-160 0)"><rect x="160" y="520" width="760" height="760" fill="#5E666A" stroke="${K.ink}" stroke-width="8"/><circle cx="740" cy="900" r="90" fill="#7D8589" stroke="${K.ink}" stroke-width="8"/>${[0, 1, 2, 3].map(i => `<path d="M 740 900 L ${f1(740 + 120 * Math.cos(i * 1.57))} ${f1(900 + 120 * Math.sin(i * 1.57))}" stroke="${K.ink}" stroke-width="16" stroke-linecap="round"/>`).join('')}</g>`;
  const closed = c >= 1 ? `<rect x="160" y="520" width="760" height="760" fill="#5E666A" stroke="${K.ink}" stroke-width="8"/><circle cx="540" cy="900" r="110" fill="#7D8589" stroke="${K.ink}" stroke-width="8"/>` : '';
  return `${DEFS}${BG('#2E3438')}${cam(`<rect x="120" y="480" width="840" height="840" fill="#3C4448" stroke="${K.ink}" stroke-width="8"/><rect x="180" y="540" width="720" height="720" fill="#151817"/>` + disc(540, 900, 230, { id: 'S', damage: true, glow: .25 }) + (c < 1 ? `<g transform="translate(920 0) scale(${f1(c)} 1) translate(-920 0)"><rect x="160" y="520" width="760" height="760" fill="#5E666A" stroke="${K.ink}" stroke-width="8"/></g>` : closed), lerp(1, 1.08, eio(prog(t, 92.4, 95.5))), 540, 900)}
    <rect x="-60" y="-60" width="1200" height="2040" fill="#000" opacity="${f1(dark * .55)}"/>${grain(t)}`;
}
