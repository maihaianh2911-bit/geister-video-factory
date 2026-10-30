// "Hält ein Kopfschmerz deutlich länger an": the clock runs on while the pain stays.
import { P, prog, eio, punch, bgPlain, head, painBurst } from './lib.js';
const T0 = 58.86;
export default function renderShot(t) {
  const spin = (t - T0) * 1.2 + 14 * eio(prog(t, 59.9, 60.6));
  const hand = (a, L, w, c) => `<path d="M 0 0 L ${Math.sin(a) * L} ${-Math.cos(a) * L}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<circle cx="${Math.sin(a) * 160}" cy="${-Math.cos(a) * 160}" r="9" fill="${P.ink}"/>`; }
  return punch(t, T0, `${bgPlain('#F3EEF7')}
    <g transform="translate(540 440)"><circle cx="0" cy="0" r="200" fill="#fff" stroke="${P.ink}" stroke-width="12"/>${ticks}${hand(spin / 12, 90, 18, P.ink)}${hand(spin, 140, 10, P.red)}<circle r="14" fill="${P.ink}"/></g>
    <g transform="translate(540 1010) scale(1.45)">${head({ id: 's32', eyes: 'squeeze', mouth: 'flat', brow: -1, blush: .3 })}</g>
    ${painBurst(540, 1010 - 78 * 1.45, 48 * (1 + .12 * Math.sin(t * 10)), 1)}`);
}
