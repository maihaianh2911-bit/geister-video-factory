// L1b 7.84–10.28: closer on du in the street: a warm glowing note appears ("Ausweg" 8.24), du looks up with hope ("leichter" 8.9).
import { K, frame, person, cam, shadow, paper, pen, pool, check, prog, eio, pop, fade, headAt } from './lib.js';
import { street } from './sets.js';
import { GY, packOf } from './base.js';
export default function renderShot(t) {
  const x = 680, hope = eio(prog(t, 8.24, 8.9));
  let s = street(t, { dx: -40 });
  s += shadow(x, GY, 200) + person('du', x, GY, .98, { t, pack: packOf(5), hunch: 1 - .35 * hope, brows: hope > .5 ? 'up' : 'strain', mouth: hope > .6 ? 'small' : 'wavy', look: [14 * hope, -14 * hope], sweat: 1 - hope, rim: hope > .3 ? '#ffd98a' : null });
  const p = pop(t, 8.24, .5), fy = 720 + Math.sin(t * 2.4) * 10;
  if (p > 0) {
    s += pool(850, fy, 220, 220, '#ffd98a', .7 * Math.min(1, p));
    s += `<g transform="translate(860 ${fy}) scale(${Math.max(.01, p)}) translate(-860 ${-fy})">` + paper(860, fy, 230, 280, 6, '') + `<g transform="rotate(6 860 ${fy})">${check(800, fy - 60, .9, K.green, fade(t, 8.9, .4))}${check(800, fy + 10, .9, K.green, fade(t, 9.3, .4))}<rect x="850" y="${fy - 74}" width="110" height="14" rx="7" fill="#6a7a90"/><rect x="850" y="${fy - 4}" width="90" height="14" rx="7" fill="#6a7a90"/></g>` + pen(960, fy + 120, .8, 30) + '</g>';
  }
  const [hx, hy] = headAt(x, GY, .98, { hunch: 1 });
  s = cam(s, hx - 40, hy + 160, 1.12 + .06 * eio(prog(t, 7.84, 10.28)), 540 - (hx - 40), 900 - (hy + 160));
  return frame(s);
}
