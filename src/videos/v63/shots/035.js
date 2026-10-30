// 66.4–68.74: arrests — the fence (hat, brown pullover) is already cuffed on the left; then a policeman seizes the buyer himself
// (suit, white collar + red tie, briefcase from shot 21) and the cuffs close on HIS wrists on "selbst"
import { K, DEFS, BG, fig, grain, cam, prog, eio, eout, lerp, f1 } from './lib.js';
import { collar } from './hands.js';
const mix = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
function ringPair(a, b, p, s = 1) {
  if (p <= 0) return '';
  const r = lerp(40, 24, eout(p)) * s;
  return `<g opacity="${f1(Math.min(1, p * 2))}"><path d="M ${f1(a[0])} ${f1(a[1])} L ${f1(b[0])} ${f1(b[1])}" stroke="#9AA3A6" stroke-width="${f1(7 * s)}" stroke-dasharray="${f1(10 * s)} ${f1(5 * s)}"/>
    ${[a, b].map(q => `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r)}" fill="none" stroke="${K.ink}" stroke-width="${f1(16 * s)}"/><circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r)}" fill="none" stroke="#C3CACC" stroke-width="${f1(9 * s)}"/>`).join('')}</g>`;
}
const hands = (m, s) => [m.hL, m.hR].map(h => `<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="${f1(24 * s)}" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/>`).join('');
export default function renderShot(t) {
  const F = 1400;
  // fence + his policeman (left)
  const fe = fig(300, F, .92, { col: K.pull, hat: true, aL: [-8, -40], aR: [-8, -40] });
  const c1 = fig(95, F, .95, { col: '#1B1F22', aR: [40, 30] });
  // the buyer: arms raised in shock → grabbed → wrists together in front
  const g = eio(prog(t, 67.1, 67.7));
  const aB = [lerp(28, -8, g), lerp(70, -40, g)];
  const bu = fig(660, F, .95, { col: K.suit, coat: true, aL: aB, aR: aB, lean: lerp(0, -3, g) });
  const reach = eio(prog(t, 66.7, 67.15));
  const c2 = fig(lerp(1010, 880, eio(prog(t, 66.5, 67.1))), F, .98, { col: '#1B1F22', walk: (t - 66.4) * 8 * (t < 67.1 ? 1 : 0), aL: [lerp(10, 48, reach), lerp(4, 30, reach)], aR: [lerp(8, 20, reach), 10] });
  const bag = `<g transform="translate(790 ${F - 120}) rotate(${f1(lerp(0, 8, g))} 80 120)"><rect x="0" y="0" width="160" height="120" rx="10" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M 50 0 V -24 H 110 V 0" fill="none" stroke="${K.ink}" stroke-width="8"/></g>`;
  const cuff = prog(t, 67.72, 67.95);
  const spot = `<circle cx="660" cy="1000" r="${f1(lerp(300, 420, g))}" fill="url(#nLamp)" opacity="${f1(lerp(.35, .8, g))}"/>`;
  const z = lerp(1, 1.3, eio(prog(t, 67.0, 67.75))), cx = lerp(540, 660, eio(prog(t, 67.0, 67.75)));
  return `${DEFS}${BG('#9C8B72')}${cam(`<rect x="-60" y="${F}" width="1200" height="700" fill="${K.brown}"/>${spot}${c1.svg}${fe.svg}${hands(fe, .92)}${ringPair(fe.hL, fe.hR, prog(t, 66.45, 66.7), .9)}
    ${bag}${bu.svg}${collar(660, F, .95, lerp(0, -3, g))}${hands(bu, .95)}${c2.svg}${ringPair(bu.hL, bu.hR, cuff)}`, z, cx, 1050)}${grain(t)}`;
}
