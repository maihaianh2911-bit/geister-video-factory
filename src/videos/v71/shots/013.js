// 32.9–34.38: closer — you react irritated ("gereizt" 33.62): frown, sharp stop gesture, jagged lines; the colleague is taken aback
import { K, BG, bust, shoulders, elbow, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 33.2, 33.62)), j = prog(t, 33.62, 33.9);
  const [, shR] = shoulders(420, 1100, 1.3), hand = [lerp(560, 640, a), lerp(1400, 980, a)];
  const du = bust('du', 420, 1100, 1.3, { look: 1, lookY: 0, tired: .9, lid: lerp(.4, .15, a), brow: -lerp(.2, 1, a), mouth: a > .8 ? 'snap' : 'down', aR: [elbow(shR, hand, 60), hand] });
  const col = bust('other', 1010, 1080, 1.2, { look: -1, brow: lerp(.3, 1, j), mouth: j > .2 ? 'o' : 'flat', hx: lerp(0, 18, j) });
  const zig = j > 0 ? [0, 1, 2].map(i => `<path d="M ${f1(560 + i * 30)} ${f1(760 - i * 40)} l 30 -20 l -10 30 l 34 -18" fill="none" stroke="${K.red}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(Math.sin(Math.PI * Math.min(1, j * 1.3)) * .9 + .1)}"/>`).join('') : '';
  return `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>${col}${du}${zig}`;
}
