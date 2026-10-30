// 1846 operating theatre (shots 22–29): tiered audience behind a rail, high dome windows, patient in a wooden chair in the centre,
// Morton on the left with the glass inhaler, Warren on the right. Fixed positions keep continuity between cuts.
import { K, theatreWall, audience, seated, figure, inhaler, vapour, lerp, eio, cl, f1 } from './lib.js';
export const PT = [540, 1380];
// o.lean (audience), o.stand 0..1 audience rises; o.pt {face, aL, aR, neck}, o.morton {x, step, aL, aR, inh, face}, o.warren {x, step, aL, aR, face, lean}, o.over
export function theatre(t, o = {}) {
  const rise = cl(o.stand || 0);
  const aud = `<g transform="translate(0 ${f1(-40 * rise)})">${audience(t, 230, 4, o.lean || 0, 3)}</g><rect x="-80" y="830" width="1240" height="36" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/>${[...Array(12)].map((_, i) => `<rect x="${i * 100 - 20}" y="866" width="16" height="140" fill="${K.woodD}"/>`).join('')}<rect x="-80" y="1000" width="1240" height="20" fill="${K.wood}" stroke="${K.ink}" stroke-width="4"/>`;
  const floor = `<rect x="-80" y="1020" width="1240" height="1000" fill="#3A2C22"/>${[...Array(9)].map((_, i) => `<path d="M ${i * 140 - 60} 1020 L ${i * 190 - 300} 2000" stroke="#2A1F18" stroke-width="5"/>`).join('')}<ellipse cx="540" cy="1150" rx="620" ry="420" fill="url(#nLamp)" opacity=".7"/>`;
  const M = o.morton, W = o.warren, P = o.pt || {};
  const mortonSvg = M ? figure('morton', M.x, 1400, .95, { step: M.step || 0, look: M.look ?? .8, lookY: M.lookY ?? .2, brow: M.brow ?? .2, mouth: M.mouth || 'flat', aL: M.aL, aR: M.aR, heldR: M.inh || '', t }) : '';
  const warrenSvg = W ? figure('warren', W.x, 1400, 1.0, { step: W.step || 0, lean: W.lean || 0, look: W.look ?? -.8, lookY: W.lookY ?? .3, brow: W.brow ?? .3, mouth: W.mouth || 'flat', aL: W.aL, aR: W.aR, heldL: W.heldL || '', t }) : '';
  const pt = o.noPt ? '' : seated(PT[0], PT[1], .95, { face: { t, ...(P.face || {}) }, aL: P.aL, aR: P.aR, heldR: P.heldR, neck: P.neck, over: P.over });
  return `${theatreWall()}${aud}${floor}${o.back || ''}${W && W.behind ? warrenSvg : ''}${pt}${mortonSvg}${W && !W.behind ? warrenSvg : ''}${o.over || ''}`;
}
