// L9 41.28–44.50: two lists: UNERLEDIGT items glow and blink (pulse on "besser" 42.96); ERLEDIGT items with ticks fade grey on "erledigte" (43.4).
import { K, frame, cam, T, check, pool, prog, eio, fade, f1 } from './lib.js';
import { study } from './sets.js';
export default function renderShot(t) {
  let s = cam(study(t), 540, 960, 1.2);
  s += `<rect width="1080" height="1920" fill="#14100c" opacity=".6"/>`;
  const card = (x, title, items, col, o) => {
    let g = `<rect x="${x - 220}" y="420" width="440" height="780" rx="26" fill="#fbf8ef" stroke="${K.ink}" stroke-width="6"/>${T(x, 510, title, 50, { fill: col })}<path d="M ${x - 180} 540 H ${x + 180}" stroke="${col}" stroke-width="6"/>`;
    items.forEach((it, i) => {
      const y = 640 + i * 170, a = o.itemA(i);
      if (o.glow) g += `<rect x="${x - 200}" y="${y - 70}" width="400" height="120" rx="20" fill="${K.yellow}" opacity="${f1(a * 100) / 100}"/>`;
      g += T(x - (o.tick ? 30 : 0), y + 14, it, 48, { fill: o.tick ? '#3a3a3c' : K.txt, op: o.tick ? o.fadeA : 1 });
      if (o.tick) g += `<g opacity="${f1(o.fadeA * 100) / 100}">${check(x + 150, y, 1, K.green, fade(t, 41.5 + i * .25, .3))}</g>`;
    });
    return g;
  };
  const blink = i => .35 + .3 * Math.sin(t * 6 + i * 2) + .35 * Math.max(0, 1 - Math.abs(t - 43.1) / .5);
  const fadeA = 1 - .7 * eio(prog(t, 43.4, 44.0));
  const inL = eio(prog(t, 41.28, 41.6)), inR = eio(prog(t, 41.5, 41.85));
  s += pool(290, 800, 300, 420, K.yellow, .3 * inL);
  s += `<g transform="translate(${f1(-200 * (1 - inL))} 0)" opacity="${f1(inL)}">${card(290, 'UNERLEDIGT', ['Vermieter', 'Zahnarzt', 'Steuer'], K.red, { glow: true, itemA: blink })}</g>`;
  s += `<g transform="translate(${f1(200 * (1 - inR))} 0)" opacity="${f1(inR * (0.55 + .45 * fadeA))}">${card(790, 'ERLEDIGT', ['Einkauf', 'Müll', 'Rechnung'], '#55606e', { tick: true, fadeA, itemA: () => 0 })}</g>`;
  return frame(cam(s, 540, 800, 1 + .05 * eio(prog(t, 41.28, 44.5))));
}
