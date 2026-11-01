// 151.38–161.94: recognition must be honest and fit real strengths – not exaggerated praise as a trap
import { K, bg, fade, pop, prog, chip, headline, badge, T } from './lib.js';
export default function renderShot(t) {
  const ok = (y, s, t0) => `<g opacity="${fade(t, t0)}">${badge(200, y - 16, 44, 'check', { sc: pop(t, t0) })}${T(260, y + 6, s, 52, { anchor: 'start' })}</g>`;
  const ta = fade(t, 159.3);
  const snap = prog(t, 160.64, 160.8);
  const trap = `<g opacity="${ta}" transform="translate(540 1110)">
    <rect x="-260" y="40" width="520" height="80" rx="14" fill="${K.orange}" stroke="${K.ink}" stroke-width="7"/>
    <path d="M -200 40 L -200 ${40 - 150 * (1 - snap) - 10 * snap} L 200 ${40 - 150 * (1 - snap) - 10 * snap} L 200 40" stroke="${K.ink2}" stroke-width="14" fill="none" stroke-linejoin="round"/>
    <path d="M -40 30 Q 0 0 40 30" stroke="${K.ink2}" stroke-width="10" fill="none"/>
    <g transform="translate(0 -10)">${badge(0, 0, 46, 'star')}</g></g>`;
  return bg(K.pink) + headline(t, 280, 'DIE ANERKENNUNG MUSS …', 64)
    + ok(470, 'EHRLICH SEIN', 153.36) + ok(610, 'ZU ECHTEN STÄRKEN PASSEN', 155.48)
    + chip(540, 820, 'KEIN ÜBERTRIEBENES LOB', { size: 52, bg: K.red, a: fade(t, 159.38), sc: pop(t, 159.38) }) + trap
    + chip(540, 1290, 'KEINE FALLE', { size: 44, bg: K.ink, a: fade(t, 160.64) });
}
