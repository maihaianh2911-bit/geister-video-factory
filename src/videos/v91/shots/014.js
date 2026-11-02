// L13 48.86–52.32 small lies smooth conversations: between two talking people a jagged line; small "kleine Lüge" pills slide in; on "glatter" the line becomes a smooth wave.
import { K, frame, bg, shadow, person, chip, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { sc: 1.08 });
  s += shadow(200, 1380, 90) + shadow(880, 1380, 90);
  const sm = eio(prog(t, 50.9, 51.5));
  s += person('kol', 200, 1380, .85, { t, seed: 2, look: [12, 0], mouth: sm > .5 ? 'smile' : 'flat', eyes: sm > .5 ? 'happy' : 'n' });
  s += person('cap', 880, 1380, .85, { t, seed: 5, look: [-12, 0], mouth: sm > .5 ? 'smile' : 'flat', eyes: sm > .5 ? 'happy' : 'n' });
  // conversation line from x 300 to 780 at y 900
  let d = '';
  for (let i = 0; i <= 48; i++) {
    const x = 300 + i * 10, jag = (i % 2 ? 1 : -1) * 46 * (i % 4 === 1 ? 1.2 : .8);
    const wave = Math.sin(i / 48 * Math.PI * 2 + t * 3) * 26;
    d += `${i ? 'L' : 'M'} ${x} ${f1(900 + lerp(jag, wave, sm))} `;
  }
  s += `<path d="${d}" fill="none" stroke="${sm > .5 ? K.green : K.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
  const P = [[330, 740, 49.3], [750, 740, 49.55], [540, 1060, 49.8]];
  P.forEach(([x, y, t0], i) => { const p = pop(t, t0, .38); if (p > 0) s += chip(x, y - 10 * Math.sin(t * 2 + i), 'kleine Lüge', { p, size: 36, bg: '#fff', rot: (i - 1) * 5 }); });
  s += chip(540, 380, sm > .5 ? 'GESPRÄCH: GLATT' : 'GESPRÄCH: HOLPRIG', { p: pop(t, 48.95, .4), size: 54, bg: sm > .5 ? '#d7f0dd' : K.yellow });
  return frame(cam(s, 540, 960, 1 + .04 * eio(prog(t, 48.86, 52.32))));
}
