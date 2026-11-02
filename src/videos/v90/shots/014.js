// L13 46.16–48.5 the colleagues have long forgotten: each thinks of their own thing; the faded fall-bubble pops away on "vergessen".
import { K, frame, bg, shadow, person, thought, cup, phone, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  const P = [[200, 'gl', 5, 'cup'], [540, 'boss', 6, 'clock'], [880, 'cap', 4, 'phone']];
  for (const [x] of P) s += shadow(x, 1330, 90);
  P.forEach(([x, who, seed, th], i) => {
    s += person(who, x, 1330, .82, { t, seed, eyes: 'happy', mouth: 'smile', look: [0, -6] });
    const by = 790 + (i % 2) * 40, pp = pop(t, 46.3 + i * .18, .4);
    s += thought(x, by, ['    '], x, 930, { p: pp, size: 60 });
    if (pp > 0) {
      const ic = th === 'cup' ? cup(x - 4, by + 26, 1.0, '#ffffff') : th === 'phone' ? phone(x, by, .3) :
        `<circle cx="${x}" cy="${by}" r="30" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M ${x} ${by} V ${by - 20} M ${x} ${by} L ${x + 14} ${by + 6}" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`;
      s += `<g opacity="${f1(Math.min(1, pp) * 100) / 100}">${ic}</g>`;
    }
  });
  // the old moment (a small "trip" sketch) fades and shrinks away on "vergessen"
  const g = 1 - eio(prog(t, 47.56, 47.95));
  if (g > 0.01) s += `<g opacity="${f1(g * 55) / 100}" transform="translate(540 420) scale(${f1(g * 100) / 100})"><rect x="-130" y="-70" width="260" height="140" rx="40" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M -90 40 H 90" stroke="${K.ink}" stroke-width="4"/><g transform="translate(10 40) rotate(70) scale(.22)"><circle cx="0" cy="-420" r="100" fill="${K.ink}"/><path d="M -60 -240 C -60 -315 -40 -345 0 -345 C 40 -345 60 -315 60 -240 L 66 -130 C 66 -116 -66 -116 -66 -130 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="10"/></g></g>`;
  return frame(cam(s, 540, 1000, 1.02));
}
