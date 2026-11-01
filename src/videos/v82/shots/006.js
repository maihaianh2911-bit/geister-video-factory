// 20.72–23.88 excitement: the kid jumps and cheers on "begeistert"; "DU KENNST DIE ZUKUNFT" marked on "Zukunft"
import { K, kid, headline, glow, sparks, arrow, T, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const jump = Math.max(0, Math.sin(Math.PI * prog(t, 21.54, 22.04))) + .5 * Math.max(0, Math.sin(Math.PI * prog(t, 22.1, 22.5)));
  const arms = eio(prog(t, 21.3, 21.6));
  let s = `<rect width="1080" height="1920" fill="#f8d9bf"/>`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * .15; s += `<path d="M 540 860 L ${f1(540 + Math.cos(a) * 1400)} ${f1(860 + Math.sin(a) * 1400)} L ${f1(540 + Math.cos(a + .26) * 1400)} ${f1(860 + Math.sin(a + .26) * 1400)} Z" fill="#fbe6cf"/>`; }
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#e7bf95"/>`;
  s += headline(t, 230, ['DU KENNST', 'DIE ZUKUNFT'], 96, { t0: 22.3, mark: { word: 'ZUKUNFT', t: 23.08 } });
  // future timeline arrow behind the kid
  const ar = eout(prog(t, 22.6, 23.3));
  s += arrow(120, 620, 960, 620, ar, K.teal, 18);
  [[300, '2010'], [520, '2015'], [740, '2020']].forEach(([x, y], i) => {
    const a = fade(t, 22.7 + i * .15, .25);
    s += `<g opacity="${f1(a * 100) / 100}"><circle cx="${x}" cy="620" r="22" fill="${K.gold}" stroke="${K.ol}" stroke-width="5"/>${T(x, 700, y, 40, { fill: K.ol })}</g>`;
  });
  if (t > 21.5) s += sparks(t, 540, 900, 300, 8, 21, fade(t, 21.54));
  s += kid(540, 1330 - jump * 120, 1.05, { aL: [lerp(12, 150, arms), lerp(6, 10, arms)], aR: [lerp(12, 150, arms), lerp(6, 10, arms)], mouth: t > 21.3 ? 'grin' : 'smile', brows: 'up' });
  return s;
}
