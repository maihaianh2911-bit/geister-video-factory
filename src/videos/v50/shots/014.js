// "warum tut dann deine Stirn weh?": dotted path mouth → forehead, pain at the forehead, big "?".
import { P, prog, back, eout, punch, bgPlain, head, painBurst, label, bez } from './lib.js';
const T0 = 22.00;
export default function renderShot(t) {
  const S = 2.0, cx = 560, cy = 900;
  const my = cy + 100 * S, fy = cy - 80 * S;
  const d = eout(prog(t, 22.05, 22.8));
  const pts = [[cx + 60, my + 10], [cx + 330, my - 60], [cx + 330, fy - 140], [cx + 40, fy - 10]];
  let dots = '';
  for (let i = 0; i <= 16; i++) if (i / 16 <= d) { const [x, y] = bez(pts, i / 16); dots += `<circle cx="${x}" cy="${y}" r="11" fill="${P.teal}" stroke="${P.ink}" stroke-width="4"/>`; }
  const pain = back(prog(t, 22.88, 23.05));
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    <g transform="translate(${cx} ${cy}) scale(${S})">${head({ id: 's14', mouth: 'flat', eyes: t > 22.88 ? 'squeeze' : 'open', brow: t > 22.88 ? -1 : .4, lookY: -12 })}</g>
    ${dots}
    ${painBurst(cx, fy, 70 * pain, pain)}
    <g transform="translate(240 380) scale(${back(prog(t, 22.9, 23.15))})">${label(0, 0, '?', 170, { col: P.red })}</g>`);
}
