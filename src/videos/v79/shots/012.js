// 52.34–58.84 her example: "Ein Freund … im Einkaufszentrum gesehen. Was war da los?" — friend, mall and him appear in her bubble; he stiffens
import { K, TEXT, CH, chip, twoShot, speech, tinyPerson, mall, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const shock = eio(prog(t, 56.9, 57.3));
  const W = { look: 1, talk: talk(t, 52.4, 54.4, 7) + talk(t, 55.1, 58.3, 7), brow: .2, hR: [110, -190], handR: 'palm', blink: blink(t, 1) };
  const M = { look: -1, wide: shock, brow: .9 * shock, mouth: shock > .5 ? 'open' : 'tight', sweat: shock, blink: shock > 0 ? 0 : blink(t, 2) };
  const fr = pop(t, 53.5), ml = pop(t, 55.8), see = eio(prog(t, 56.6, 56.95)), q = pop(t, 57.7);
  let inner = fr < 1 ? `<text x="530" y="560" ${TEXT(220, K.accent)} opacity="${1 - fr}">„ “</text>` : '';
  if (fr > 0) inner += `<g transform="translate(220 560) scale(${fr}) translate(-220 -560)">${tinyPerson(220, 560, 1.2, '#8a6fb0', '#d8b25a')}<text x="220" y="650" ${TEXT(34)}>FREUND</text></g>`;
  if (ml > 0) inner += `<g transform="translate(600 560) scale(${ml}) translate(-600 -560)">${mall(600, 560, 1.15)}${tinyPerson(760, 590, .8, K.shirt, K.mHair)}<path d="M 790 600 L 800 650 L 830 650 L 822 600 Z" fill="${K.gold}" stroke="${K.ol}" stroke-width="4"/><text x="600" y="650" ${TEXT(36)}>EINKAUFSZENTRUM</text></g>`;
  if (see > 0) inner += `<path d="M 280 470 Q 500 380 720 500" stroke="${K.accent}" stroke-width="8" fill="none" stroke-dasharray="18 14" pathLength="1" style="stroke-dasharray:${see} 1"/>`;
  if (q > 0) inner += `<g transform="translate(920 380) scale(${q})"><circle r="44" fill="${K.accent}" stroke="${K.ol}" stroke-width="5"/><text y="22" ${TEXT(64, '#fff')}>?</text></g>`;
  const bub = `<g transform="translate(400 470) scale(${pop(t, 52.4)}) translate(-400 -470)">${speech(70, 225, 920, 395, 330, 620, `<g transform="translate(0 -45)">${inner}</g>`)}</g>`;
  return twoShot(t, W, M) + bub + chip(CH[3]);
}
