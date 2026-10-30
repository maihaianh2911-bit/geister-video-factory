// 18.12–19.8: the change fires a pain signal — a spark on the vessel wall races along a nerve fibre
import { K, DEFS, BG, zap, prog, eout, back, lerp, f1, cl } from './lib.js';
import { palateLens } from './vlens.js';
export default function renderShot(t) {
  const fire = prog(t, 18.75, 18.95), run = eio2(prog(t, 18.9, 19.7));
  const nerve = `<path d="M 60 1260 Q 400 1180 560 1150 Q 760 1110 1040 700" fill="none" stroke="${K.ink}" stroke-width="30" stroke-linecap="round"/><path d="M 60 1260 Q 400 1180 560 1150 Q 760 1110 1040 700" fill="none" stroke="${K.nerveD}" stroke-width="18" stroke-linecap="round"/>
    <path d="M 60 1260 Q 400 1180 560 1150 Q 760 1110 1040 700" fill="none" stroke="${K.nerve}" stroke-width="18" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(cl(run))} 2" opacity="${run > 0 ? 1 : 0}"/>`;
  const px = run > 0 && run < 1 ? pt(run) : null;
  const extra = nerve + (px ? `<circle cx="${f1(px[0])}" cy="${f1(px[1])}" r="60" fill="url(#eNerve)"/><circle cx="${f1(px[0])}" cy="${f1(px[1])}" r="16" fill="#fff"/>` : '');
  return `${DEFS}${BG(K.bg2)}${palateLens(t, { id: 'l', lx: 540, ly: 860, r: 470, w: 1.35, hot: 1, speed: 1.4, vy: -90, extra })}
    ${zap(560, 1000, back(prog(t, 18.75, 19)) * 1.2, fire)}`;
}
function eio2(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
function pt(p) {
  const P = [[60, 1260], [400, 1180], [560, 1150]], Q = [[560, 1150], [760, 1110], [1040, 700]];
  const [A, B, C] = p < .5 ? P : Q, u = p < .5 ? p * 2 : (p - .5) * 2;
  return [(1 - u) * (1 - u) * A[0] + 2 * u * (1 - u) * B[0] + u * u * C[0], (1 - u) * (1 - u) * A[1] + 2 * u * (1 - u) * B[1] + u * u * C[1]];
}
