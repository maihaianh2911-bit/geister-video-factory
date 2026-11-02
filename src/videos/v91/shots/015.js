// L14 52.32–55.36 SONNTAG: du on the sofa; three awkward moments of the week pop up as cards (colleague sad, mum's silent call, boss); du lets out a breath.
import { K, frame, bg, shadow, person, sofa, dayCard, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
function card(x, y, p, label, inner) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${f1(p * 100) / 100})"><rect x="-140" y="-120" width="280" height="250" rx="24" fill="#fff" stroke="${K.ink}" stroke-width="5"/>${inner}${T(0, 100, label, 34, { fill: K.ink })}</g>`;
}
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(540, 1380, 330) + sofa(540, 1380, 640);
  const sigh = eio(prog(t, 54.5, 54.9));
  s += person('du', 540, 1380, 1, { t, seed: 1, sit: true, eyes: sigh > .5 ? 'closed' : 'n', mouth: sigh > .5 ? 'o' : 'flat', brows: 'sad', look: [0, -10], headDy: 10 * sigh });
  const mini = (who, col, extra) => `<g transform="translate(0 -20) scale(.36)">${extra || ''}<circle cy="-40" r="100" fill="${K.ink}"/>${who}</g>`;
  const sadFace = `<circle cx="-32" cy="-48" r="17" fill="#fff"/><circle cx="32" cy="-48" r="17" fill="#fff"/><circle cx="-32" cy="-44" r="8" fill="${K.ink}"/><circle cx="32" cy="-44" r="8" fill="${K.ink}"/><path d="M -20 18 Q 0 2 20 18" stroke="#fff" stroke-width="8" fill="none"/>`;
  s += card(220, 620, pop(t, 53.44, .38), 'MONTAG', mini('kol', K.kol, `<circle cx="10" cy="-140" r="36" fill="${K.ink}"/><path d="M -110 80 Q 0 30 110 80 V 140 H -110 Z" fill="${K.kol}"/>`) + `<g transform="translate(0 -20) scale(.36)">${sadFace}</g>`);
  s += card(540, 520, pop(t, 53.7, .38), 'DIENSTAG', `<rect x="-60" y="-110" width="120" height="180" rx="16" fill="${K.ink}"/><rect x="-50" y="-98" width="100" height="150" rx="8" fill="#b9c0c6"/>` + `<text x="0" y="-10" font-family="Inter" font-weight="900" font-size="60" text-anchor="middle" fill="${K.ink}" style="font-family:'Inter';font-weight:900">…</text>`);
  s += card(860, 620, pop(t, 53.95, .38), 'MITTWOCH', mini('chef', K.chef, `<path d="M -110 80 Q 0 30 110 80 V 140 H -110 Z" fill="${K.chef}"/>`) + `<g transform="translate(0 -20) scale(.36)"><rect x="-50" y="-58" width="34" height="14" rx="6" fill="#fff"/><rect x="16" y="-58" width="34" height="14" rx="6" fill="#fff"/><path d="M -40 34 C -30 18 -8 20 0 30 C 8 20 30 18 40 34 C 30 30 14 40 0 36 C -14 40 -30 30 -40 34 Z" fill="#fff"/></g>`);
  s = cam(s, 540, 1000, 1 + .04 * eio(prog(t, 52.32, 55.36)));
  s += dayCard(t, 52.32, 'SONNTAG');
  return frame(s);
}
