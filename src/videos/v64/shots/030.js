// 62.94–65.0: the court states it — a gavel strikes on "fest"
import { K, DEFS, BG, grain, f1, prog, eout, ein, lerp, shk } from './lib.js';
export default function renderShot(t) {
  const lift = t < 63.68 ? eout(prog(t, 62.94, 63.4)) * (1 - ein(prog(t, 63.45, 63.68))) : 0;
  const ang = -38 * lift;
  const [sx, sy] = shk(t, 63.68, 8, 7);
  const ring = prog(t, 63.68, 64.3);
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${BG('#BFA982')}<rect x="-60" y="1000" width="1200" height="1000" fill="#7A5A40"/><path d="M -60 1000 H 1140" stroke="${K.ink}" stroke-width="6"/>
    <ellipse cx="560" cy="1040" rx="170" ry="40" fill="#5A3E2A" stroke="${K.ink}" stroke-width="6"/><rect x="390" y="1000" width="340" height="40" fill="#6A4C34" stroke="${K.ink}" stroke-width="6"/>
    ${ring > 0 && ring < 1 ? `<ellipse cx="560" cy="1000" rx="${f1(180 + 260 * ring)}" ry="${f1(40 + 60 * ring)}" fill="none" stroke="${K.ink}" stroke-width="${f1(8 * (1 - ring))}"/>` : ''}
    <g transform="rotate(${f1(ang)} 900 960)"><rect x="520" y="945" width="400" height="30" rx="12" fill="#6A4C34" stroke="${K.ink}" stroke-width="6"/>
      <rect x="470" y="880" width="120" height="120" rx="16" fill="#5A3E2A" stroke="${K.ink}" stroke-width="6"/><rect x="460" y="900" width="140" height="22" fill="#C9A24A"/><rect x="460" y="958" width="140" height="22" fill="#C9A24A"/></g></g>${grain(t)}`;
}
