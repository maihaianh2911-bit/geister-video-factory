// "...im Gesicht verbunden ist": wider view, the whole face network pulses together.
import { P, prog, back, punch, parlour, bust, nerve } from './lib.js';
const T0 = 27.60;
export default function renderShot(t) {
  const S = 1.35, ox = 540, oy = 1100;
  const pulse = .5 + .5 * Math.sin((t - 27.74) * 9);
  const BR = s => [`M ${150 * s} 10 C ${130 * s} -60 ${90 * s} -110 ${40 * s} -125`, `M ${150 * s} 10 C ${110 * s} 20 ${80 * s} 50 ${40 * s} 50`, `M ${150 * s} 10 C ${130 * s} 90 ${90 * s} 140 ${40 * s} 150`];
  let n = '', dots = '';
  for (const s of [-1, 1]) BR(s).forEach((d, i) => {
    n += nerve(d, 1, 200, 7 + 3 * pulse);
    const e = [[40, -125], [40, 50], [40, 150]][i];
    dots += `<circle cx="${e[0] * s}" cy="${e[1]}" r="${16 * back(prog(t, 27.74 + i * .1, 27.95 + i * .1))}" fill="#fff" stroke="${P.nerve}" stroke-width="6"/>`;
  });
  return punch(t, T0, `${parlour(t, { blur: true })}
    <rect x="0" y="0" width="1080" height="1920" fill="#16324F" opacity=".25"/>
    <g transform="translate(${ox} ${oy}) scale(${S})">${bust({ id: 's17', hand: [210, 330], head: { mouth: 'flat', eyes: 'open', brow: .2 }, coneO: { bite: 1 } })}
      <g transform="translate(0 -230)">${n}${dots}</g></g>`);
}
