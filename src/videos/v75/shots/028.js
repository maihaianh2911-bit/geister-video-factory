// 78.34–83.364: while left-over tasks reach into the next day ("liegen gebliebenen Aufgaben" 78.76–79.48, "nächsten Tag" 80.92–81.22) — a task stack is carried across from today's calendar page to tomorrow's
import { K, DEFS, BG, card, TX, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 80.3, 81.5)), s = eio(prog(t, 78.6, 79.4));
  const page = (x, txt, col, a = 1) => `<g opacity="${f1(a)}"><rect x="${x - 190}" y="420" width="380" height="460" rx="20" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="${x - 190}" y="420" width="380" height="110" rx="20" fill="${col}"/>${TX(txt, x, 505, 64, K.white)}</g>`;
  const n = Math.round(lerp(2, 6, s));
  const stack = [...Array(n)].map((_, i) => `<g transform="translate(${f1(lerp(300, 780, m) + (i % 2) * 10)} ${f1(1180 - i * 46 - 40 * Math.sin(Math.PI * m))})"><rect x="-120" y="-22" width="240" height="44" rx="8" fill="${[K.data, K.green, K.sun][i % 3]}" stroke="${K.ink}" stroke-width="3"/></g>`).join('');
  return `${DEFS}${BG()}${page(300, 'HEUTE', K.ind3)}${page(780, 'MORGEN', K.dataD, eio(prog(t, 79.8, 80.3)))}<path d="M 470 1000 Q 540 900 610 1000" fill="none" stroke="${K.data}" stroke-width="10" stroke-dasharray="20 14" opacity="${f1(m)}"/>${stack}`;
}
