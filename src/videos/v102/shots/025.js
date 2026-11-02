// L16a 63.16–66.98: close-up of du relaxed in the warm sunlight (eyes closed, gentle smile, sunbeams); on "mach den Test" (64.88) a challenge card pops: TEST: 1 WOCHE GENUG SCHLAF.
import { K, frame, cam, prog, eio, person, pool, chip, pop, f1, label } from './lib.js';
import { windowView } from './kit.js';
import { bar } from './base.js';
export default function renderShot(t) {
  let s = windowView(t, { sun: 1, strong: true });
  s += `<g opacity=".2">${[0, 1, 2, 3].map(i => `<path d="M 790 360 L ${-200 + i * 260} 1900 L ${-80 + i * 260} 1900 Z" fill="#fff6d0" transform="rotate(${f1(Math.sin(t * .6 + i) * 2)} 790 360)"/>`).join('')}</g>`;
  s += person('du', 540, 2160, 1.75, { t, seed: 1, eyes: 'happy', brows: 'calm', mouth: 'smile', legs: false, rimL: '#ffe3a0', headTilt: 5 * Math.sin(t * .9) });
  s += pool(700, 700, 500, 500, '#fff3b0', .25);
  s = cam(s, 540, 950, 1.0 + .06 * eio(prog(t, 63.16, 66.98)));
  const c = pop(t, 64.88, .45);
  if (c > 0) s += `<g transform="translate(540 330) scale(${f1(Math.max(.01, c) * 1000) / 1000}) translate(-540 -330)"><rect x="140" y="250" width="800" height="200" rx="40" fill="#fff" stroke="${K.ink}" stroke-width="8"/>${label('TEST:', 540, 330, 60, { fill: K.yellow })}${label('1 WOCHE GENUG SCHLAF', 540, 420, 62, { fill: K.green })}</g>`;
  s += bar(t);
  return frame(s);
}
