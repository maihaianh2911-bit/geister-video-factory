// L16 52.72–55.8 "Du musst sie nicht sofort aus deinem Leben streichen": a red line starts across Lena's contact card — du stops it, it retracts.
import { K, frame, bg, shadow, person, T, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  // contact card
  const cx = 600, cy = 640;
  s += `<g><rect x="${cx - 300}" y="${cy - 170}" width="600" height="340" rx="36" fill="#fff" stroke="${K.ink}" stroke-width="6"/>
    <circle cx="${cx - 160}" cy="${cy + 10}" r="80" fill="${K.ink}"/><circle cx="${cx - 150}" cy="${cy - 70}" r="30" fill="${K.ink}"/><circle cx="${cx - 186}" cy="${cy + 2}" r="15" fill="#fff"/><circle cx="${cx - 134}" cy="${cy + 2}" r="15" fill="#fff"/><path d="M ${cx - 178} ${cy + 40} q 18 14 36 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${T(cx + 90, cy + 34, 'LENA', 92, { fill: K.ink })}</g>`;
  // the strike: draws on "streichen" (54.44) only to the half, then retracts while du says no
  const draw = eio(prog(t, 53.4, 54.5)) * .62 * (1 - eio(prog(t, 54.7, 55.3)));
  if (draw > .005) s += `<path d="M ${cx - 280} ${cy + 20} L ${f1(cx - 280 + 560 * draw)} ${f1(cy + 20 - 30 * draw)}" stroke="${K.red}" stroke-width="22" stroke-linecap="round" opacity=".9"/>`;
  s += shadow(330, 1330);
  const stop = eio(prog(t, 54.5, 54.8));
  const shake = t > 54.6 && t < 55.4 ? Math.sin((t - 54.6) * 22) * 8 : 0;
  s += person('du', 330, 1330, 1, { t, seed: 1, armR: stop > .02 ? [80 + 90 * stop, -212 - 200 * stop] : null, eyes: 'n', mouth: 'flat', look: [12, -12], headTilt: shake });
  return frame(cam(s, 540, 900, 1 + .03 * eio(prog(t, 52.72, 55.8))));
}
