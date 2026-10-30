// "oder kommen andere Beschwerden dazu": extra warning badges pop up around the head.
import { P, prog, back, punch, bgPlain, head, painBurst } from './lib.js';
const T0 = 60.90;
export default function renderShot(t) {
  const S = 1.8, cx = 540, cy = 820;
  const pos = [[220, 520, 61.42], [860, 600, 61.76], [250, 1060, 62.1]];
  let b = '';
  for (const [x, y, t0] of pos) { const s = back(prog(t, t0, t0 + .2)); if (s > 0) b += `<g transform="translate(${x} ${y}) scale(${s})"><circle r="70" fill="${P.red}" stroke="${P.ink}" stroke-width="8"/><rect x="-11" y="-42" width="22" height="52" rx="11" fill="#fff"/><circle cy="30" r="12" fill="#fff"/></g>`; }
  return punch(t, T0, `${bgPlain('#F3EEF7')}
    <g transform="translate(${cx} ${cy}) scale(${S})">${head({ id: 's33', eyes: t > 61.42 ? 'wide' : 'squeeze', mouth: 'o', brow: t > 61.42 ? .6 : -1, blush: .2 })}</g>
    ${painBurst(cx, cy - 78 * S, 50, 1)}${b}`);
}
