// 67.72–71.82 every change rewires the future: one path splits into branches on "Entscheidung"; the known golden path goes dark and a new one lights up on "verändert"
import { K, kid, chip, T, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="${K.night}"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${(i * 197) % 1080}" cy="${(i * 331) % 1200}" r="${2 + (i % 3)}" fill="#fff" opacity=".25"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const root = [540, 1150];
  const ends = [[150, 330], [360, 260], [720, 260], [930, 330]];
  const g = eout(prog(t, 68.0, 68.9));
  const sw = eio(prog(t, 69.62, 70.3));          // known path (index 1) dies, new path (index 2) lights
  const fork = [540, 860];
  s += `<path d="M ${root[0]} ${root[1]} L ${fork[0]} ${fork[1]}" stroke="#8f9bd0" stroke-width="18" stroke-linecap="round"/>`;
  ends.forEach(([ex, ey], i) => {
    const p = g; if (p <= 0) return;
    const mx = lerp(fork[0], ex, .5), my = lerp(fork[1], ey, .3);
    const tx = lerp(fork[0], ex, p), ty = lerp(fork[1], ey, p);
    let col = '#5d6aa3', w = 12;
    if (i === 1) { col = sw > .5 ? '#3a4270' : K.gold; w = 18; }
    if (i === 2 && sw > .5) { col = '#7fe0d0'; w = 18; }
    s += `<path d="M ${fork[0]} ${fork[1]} Q ${f1(lerp(fork[0], mx, p))} ${f1(lerp(fork[1], my, p))} ${f1(tx)} ${f1(ty)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
    if (p > .95) s += `<circle cx="${ex}" cy="${ey}" r="26" fill="${col}" stroke="${K.ol}" stroke-width="5"/>`;
  });
  s += `<circle cx="${fork[0]}" cy="${fork[1]}" r="22" fill="#fff" stroke="${K.ol}" stroke-width="5"/>`;
  s += T(360, 200, 'BEKANNT', 40, { fill: K.gold, op: fade(t, 68.9) * (1 - sw) });
  s += T(720, 200, 'NEU', 44, { fill: '#7fe0d0', op: sw });
  s += chip(540, 980, 'JEDE ÄNDERUNG', { a: fade(t, 68.02), sc: pop(t, 68.02), bg: K.violet, size: 42 });
  s += kid(540, 1330, .45, { aL: [12, 6], aR: [12, 6], mouth: 'o', brows: 'worried', look: [0, -14] });
  return s;
}
