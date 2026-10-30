// "beim schnellen Trinken durch den Strohhalm": fast sip, level drops, frost stab at the forehead.
import { P, prog, eio, back, lerp, punch, shake, parlour, bust, glass, painBurst, frostCrystal } from './lib.js';
const T0 = 37.80;
export default function renderShot(t) {
  const S = 1.3, ox = 540, oy = 1100;
  const sip = eio(prog(t, 38.64, 39.6));
  const hit = back(prog(t, 39.82, 40.0));
  const [sx, sy] = shake(t, 39.82, 10, 6);
  const H = [120, 140];
  const g = `<g transform="translate(0 -170) scale(.55)">${glass({ id: 's22g', level: lerp(.95, .25, sip), frost: .6 })}</g>`;
  const straw = `<path d="M ${H[0] + 30} ${H[1] - 70} L 8 -132" stroke="${P.ink}" stroke-width="26" stroke-linecap="round"/><path d="M ${H[0] + 30} ${H[1] - 70} L 8 -132" stroke="${t > 38.64 && t < 39.7 ? '#FFB86B' : P.teal}" stroke-width="15" stroke-linecap="round"/>`;
  const fy = oy - (230 + 78) * S;
  return punch(t, T0, `${parlour(t, { blur: true, dx: -40 })}
    <g transform="translate(${ox + sx} ${oy + sy}) scale(${S})">${bust({ id: 's22', hand: H, holdR: g, head: { mouth: 'sip', eyes: t > 39.82 ? 'squeeze' : 'open', brow: t > 39.82 ? -1 : 0, look: 12, lookY: 14 } })}${straw}</g>
    ${painBurst(ox + sx, fy + sy, 56 * hit, hit, P.cold)}${frostCrystal(ox + sx, fy + sy, 80 * hit, 0, '#fff')}`);
}
