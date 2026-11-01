// 3.14–7.62 arguing doesn't solve it (shout bubbles burst on "nicht"), six numbered methods appear on "Methoden"
import { K, TEXT, twoShot, jag, prog, eio, eout, talk, blink, pop, fade, lerp, cross } from './lib.js';
export default function renderShot(t) {
  const fight = 1 - eio(prog(t, 4.9, 5.4));
  const W = { look: 1, brow: -1 * fight, talk: talk(t, 3.2, 4.0, 11) + talk(t, 4.4, 4.9, 11), mouth: fight > .5 ? 'frown' : 'neutral', lean: 7 * fight, hR: fight > .3 ? [190, -260] : [80, -24], handR: fight > .3 ? 'point' : 'rest', blink: blink(t, 3) };
  const M = { look: -1, brow: -1 * fight, talk: talk(t, 3.9, 4.6, 11), mouth: fight > .5 ? 'frown' : 'neutral', lean: -7 * fight, hL: fight > .3 ? [-190, -250] : [-80, -24], handL: 'palm', blink: blink(t, 5) };
  const burst = eout(prog(t, 4.92, 5.25));
  const shake = Math.sin(t * 40) * 4 * fight;
  const shouts = t < 5.3 ? `<g opacity="${1 - burst}" transform="translate(540 520) scale(${1 + burst * .4}) translate(-540 -520)">
      <g transform="translate(${330 + shake} 520) scale(${pop(t, 3.25)}) translate(-330 -520)">${jag(330, 520, 90, '!!', 70)}</g>
      <g transform="translate(${-shake} 0)">${t > 3.95 ? jag(760, 470, 90 * pop(t, 3.95), '!!', 70 * pop(t, 3.95)) : ''}</g>${cross(545, 500, 1.6 * eout(prog(t, 4.9, 5.05)))}</g>` : '';
  let discs = '';
  for (let i = 0; i < 6; i++) { const a = pop(t, 5.75 + i * .17); if (a > 0) discs += `<g transform="translate(${190 + i * 140} 330) scale(${a})"><circle r="56" fill="${K.accent}" stroke="${K.ol}" stroke-width="6"/><text y="24" ${TEXT(66, K.cream)}>${i + 1}</text></g>`; }
  const lab = fade(t, 6.74) ? `<g opacity="${fade(t, 6.74)}"><rect x="290" y="420" width="500" height="80" rx="40" fill="${K.ink}"/><text x="540" y="476" ${TEXT(46, K.cream)}>6 METHODEN</text></g>` : '';
  return twoShot(t, W, M) + shouts + discs + lab;
}
