// L9 39.68–44.74: sunny university campus; two psychologists (bun + green jacket, white coat + glasses) with clipboards in front of the
// building; label CORNELL on "Cornell-Universität" (41.15); three people step in at the right and on "Bedauern" (43.3) each gets a small
// sepia bubble (heart, plane, phone) = their biggest regret.
import { K, frame, cam, prog, eio, pop, person, shadow, label, paper } from './lib.js';
import { campus } from './sets.js';
import { memBubble } from './sets3.js';
const INK = K.ink;
const icon = (k) => {
  let s = `<rect x="-100" y="-80" width="200" height="160" fill="#efe2cf"/>`;
  if (k === 'heart') s += `<path d="M 0 50 C -80 0 -60 -60 0 -30 C 60 -60 80 0 0 50 Z" fill="#d9493f" stroke="${INK}" stroke-width="5"/>`;
  if (k === 'plane') s += `<path d="M -70 10 L 60 -30 Q 80 -34 74 -20 L -40 30 Z M -10 -6 L -40 -50 L -20 -50 L 20 -14 Z M -10 18 L -30 60 L -12 60 L 18 10 Z" fill="#2f7fb5" stroke="${INK}" stroke-width="4"/>`;
  if (k === 'phone') s += `<rect x="-34" y="-60" width="68" height="120" rx="12" fill="${INK}"/><rect x="-26" y="-48" width="52" height="92" rx="6" fill="#3c9a5f"/>`;
  return s;
};
export default function renderShot(t) {
  let s = campus(t, {});
  const ppl = [['stu1', 600, 1450, .55, 42.1], ['kun', 750, 1420, .53, 42.3], ['mate', 895, 1460, .55, 42.5]];
  for (const [w, x, y, sc, t0] of ppl) {
    const a = eio(prog(t, t0, t0 + .5));
    if (a <= 0) continue;
    s += shadow(x + 80 * (1 - a), y, 150) + person(w, x + 80 * (1 - a), y, sc, { t, seed: x, a, look: [-12, -6], brows: 'calm', mouth: 'flat', walk: a < 1 ? t * 1.6 : undefined });
  }
  const res = [['res1', 150, 1690], ['res2', 380, 1700]];
  res.forEach(([w, x, y], i) => {
    s += shadow(x, y, 160) + person(w, x, y, .8, { t, seed: 3 + i, look: [14, -2], brows: 'calm', mouth: 'small', armR: [150, -400], elbowR: [190, -320], front: paper(150, -440, 130, 170, -8, '', { lines: true }) });
  });
  const ks = ['heart', 'plane', 'phone'];
  ppl.forEach(([w, x, y, sc], i) => { s += memBubble(x - 10, y - 720 - (i % 2) * 70, 190, 150, x - 10, y - 760 * sc, pop(t, 43.3 + i * .15, .4), icon(ks[i]), 'r13' + i, { sepia: .15 }); });
  s = cam(s, 540, 1100, 1.0 + .07 * eio(prog(t, 39.68, 44.74)));
  s += label('CORNELL', 540, 250, 120, { p: pop(t, 41.15, .45) });
  return frame(s);
}
