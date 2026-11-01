// 286.36–295.77: the old sentence sounds polite but ends the conversation – or suggests you just ask anyone
import { K, bg, fade, pop, prog, eio, lerp, fig, chip, headline, T } from './lib.js';
export default function renderShot(t) {
  const part2 = fade(t, 290.9);
  let a = '';
  if (part2 < 1) a = `<g opacity="${1 - part2}">${chip(540, 470, 'KLINGT HÖFLICH …', { size: 54, bg: K.ink2, a: fade(t, 287.6) })}
    <g opacity="${fade(t, 289.9)}" transform="translate(540 860) scale(${pop(t, 289.9)})"><path d="M -150 -62 L -62 -150 L 62 -150 L 150 -62 L 150 62 L 62 150 L -62 150 L -150 62 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="8"/>${T(0, 28, 'ENDE', 84, { fill: '#fff' })}</g>
    ${chip(540, 1120, 'GESPRÄCH SOFORT BEENDET', { size: 46, bg: K.red, a: fade(t, 290.06) })}</g>`;
  let b = '';
  if (part2 > 0) {
    const xs = [170, 350, 530, 710, 860];
    b = `<g opacity="${part2}">${chip(540, 470, 'ODER: IRGENDWER?', { size: 54, bg: K.ink2 })}` + xs.map((x, i) => fig(x, 1340, .75, i === 0 ? 'trang' : 'x', 'stand', { col: i === 0 && t > 293.5 ? K.ink : K.ink2 })).join('');
    const p = eio(prog(t, 292.9, 293.6));
    b += `<g transform="translate(${lerp(860, 170, p)} 820)"><path d="M 0 0 L -30 -60 L 30 -60 Z" fill="${K.red}"/></g>`
      + chip(240, 700, 'DIE ERSTBESTE', { size: 38, bg: K.red, a: fade(t, 293.56) }) + '</g>';
  }
  return bg(K.pink) + headline(t, 280, 'DER ALTE SATZ', 92) + a + b;
}
