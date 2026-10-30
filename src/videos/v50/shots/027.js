// 50.82–53.3 · "kurz aufhören zu essen" — she sets the cone down into a cup on the table and lets go
import { P, parlour, girl, table, cone, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const S = 1.3, X = 470, Y = 1260;
  const down = eio(prog(t, 51.7, 52.14));
  const rel = eio(prog(t, 52.3, 52.7));
  const cupX = 820, cupY = 1180;
  const hx = lerp(170, (cupX - X) / S, down), hy = lerp(0, (cupY - 40 - Y) / S, down);
  const handR = rel > 0 ? [lerp((cupX - X) / S, 215, rel), lerp((cupY - 40 - Y) / S, 420, rel)] : [hx, hy];
  const held = rel <= 0;
  const bob = t > 52.14 && t < 52.5 ? 6 * Math.sin((t - 52.14) * 40) * Math.exp(-(t - 52.14) * 8) : 0;
  return `${parlour(t)}
    ${girl(X, Y, S, { t, id: 's27', hold: held ? 'cone' : 'none', handR, bite: 1, biteSide: -1, eyes: 'open', look: 14, lookY: 10, brow: .4, mouth: 'flat' })}
    ${table(1200)}
    ${held ? '' : cone(cupX, cupY - 70 + bob, S * .9, { id: 's27c', bite: 1, biteSide: -1, t })}
    <path d="M ${cupX - 80} ${cupY - 40} L ${cupX + 80} ${cupY - 40} L ${cupX + 60} ${cupY + 60} L ${cupX - 60} ${cupY + 60} Z" fill="${P.teal}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="${cupX - 90}" y="${cupY - 56}" width="180" height="26" rx="10" fill="${P.tealD}" stroke="${P.ink}" stroke-width="6"/>`;
}
