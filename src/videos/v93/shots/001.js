// L0 0–4.62 Platform, Monday crowd. Over du's shoulder: four strangers; a thought bubble pops over each head
// ("über jedem Fremden … was er gerade durchmacht"). Title DU SIEHST, WAS FREMDE DURCHMACHEN.
import { K, frame, cam, setPlatform, person, shadow, thought, icon, T, pop, fade, f1 } from './lib.js';
import { push } from './base.js';
const P = [['p1', 170, 1.0], ['p3', 420, 1.6], ['p2', 690, 2.1], ['p4', 920, 2.72]];
const IC = ['cross', 'coin', 'clock', 'cloud'];
export default function renderShot(t) {
  let s = setPlatform(t);
  const gy = 1440, sc = 1.12;
  P.forEach(([w, x], i) => { s += shadow(x, gy, 120) + person(w, x, gy, sc, { t, seed: i * 3 + 1, look: [i < 2 ? 4 : -4, 2], brows: i === 1 ? 'worried' : i === 3 ? 'sad' : 'flat', mouth: i === 0 ? 'grim' : 'flat' }); });
  P.forEach(([w, x, t0], i) => {
    const p = pop(t, t0, .4), hy = gy - 420 * sc;
    s += thought(x + (i === 3 ? -40 : 0), hy - 250, [''], x, hy - 120, { p, w: 170, h: 140, inner: icon[IC[i]](x + (i === 3 ? -40 : 0), hy - 250, 1.35) });
  });
  // du from behind, big, bottom-left (sharp foreground)
  s += person('du', 150, 2150, 1.9, { t, seed: 9, back: true, noLegs: true });
  let ttl = '';
  const tp = pop(t, .05, .45);
  ttl += `<g transform="translate(540 300) scale(${f1(tp * 1000) / 1000}) translate(-540 -300)">${T(540, 270, 'DU SIEHST, WAS', 80, { fill: '#fff', stroke: K.ink, sw: 18 })}${T(540, 368, 'FREMDE DURCHMACHEN', 80, { fill: K.yellow, stroke: K.ink, sw: 18 })}</g>`;
  return frame(cam(s, 540, 1000, push(t, 0, 4.62, 1.0, 1.08)) + ttl);
}
