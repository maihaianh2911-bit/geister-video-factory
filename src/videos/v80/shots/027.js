// 203.18–210.52: "what takes you five minutes would cost me an hour – can you take a quick look?"
import { K, bg, fade, prog, eout, chip, clock, T, headline, bubble } from './lib.js';
export default function renderShot(t) {
  const a1 = fade(t, 203.54), a2 = fade(t, 206.26);
  const b1 = 860 * 5 / 60 * eout(prog(t, 203.54, 204.02)), b2 = 860 * eout(prog(t, 206.64, 207.48));
  const bars = `<g opacity="${a1}">${T(110, 560, 'FELIX', 54, { anchor: 'start' })}<rect x="110" y="590" width="860" height="90" rx="20" fill="#fff" stroke="${K.ink}" stroke-width="5"/><rect x="116" y="596" width="${Math.max(0, b1)}" height="78" rx="16" fill="${K.green}"/>${T(320, 652, '5 MINUTEN', 50, { anchor: 'start' })}</g>
    <g opacity="${a2}">${T(110, 800, 'ICH', 54, { anchor: 'start' })}<rect x="110" y="830" width="860" height="90" rx="20" fill="#fff" stroke="${K.ink}" stroke-width="5"/><rect x="116" y="836" width="${Math.max(0, b2 - 12)}" height="78" rx="16" fill="${K.red}"/>${T(540, 892, '1 STUNDE', 50, { fill: '#fff' })}</g>`;
  const ask = bubble(170, 1030, 740, [{ s: '„Kannst du dir diesen Teil kurz ansehen?“' }], { size: 52, a: fade(t, 208.1), fill: K.greenL });
  return bg(K.sky) + headline(t, 330, 'DEINE ZEIT VS. MEINE', 76) + bars + ask.svg;
}
