// "mit vielen Bereichen im Gesicht": nerve branches light up across the face one by one.
import { P, prog, back, punch, bgPlain, head, nerve } from './lib.js';
const T0 = 26.10;
const BR = s => [`M ${150 * s} 10 C ${130 * s} -60 ${90 * s} -110 ${40 * s} -125`, `M ${150 * s} 10 C ${110 * s} 20 ${80 * s} 50 ${40 * s} 50`, `M ${150 * s} 10 C ${130 * s} 90 ${90 * s} 140 ${40 * s} 150`];
export default function renderShot(t) {
  const at = [26.40, 26.66, 27.0];
  let n = '';
  for (const s of [-1, 1]) BR(s).forEach((d, i) => { n += nerve(d, prog(t, at[i], at[i] + .3), 200, 7); });
  let nodes = '';
  for (const s of [-1, 1]) nodes += `<circle cx="${150 * s}" cy="10" r="${12 * back(prog(t, 26.2, 26.4))}" fill="${P.nerve}" stroke="${P.ink}" stroke-width="4"/>`;
  return punch(t, T0, `${bgPlain('#FFF7E0')}
    <g transform="translate(540 820) scale(2.2)">${head({ id: 's16', mouth: 'flat', eyes: 'open', brow: .2 })}${n}${nodes}</g>`);
}
