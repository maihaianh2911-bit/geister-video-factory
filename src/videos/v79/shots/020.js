// 92.76–96.84 small talk while the wall clock runs on; then she brings the conversation back to one important detail
import { K, TEXT, CH, chip, twoShot, speech, office, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
function plate(x, y) { return `<g transform="translate(${x} ${y})"><ellipse rx="80" ry="30" fill="#fff" stroke="${K.ol}" stroke-width="6"/><ellipse rx="48" ry="16" fill="${K.gold}"/><path d="M -30 -4 q 15 -14 30 0 q 15 14 30 0" stroke="${K.accent}" stroke-width="6" fill="none"/></g>`; }
function sun(x, y, t) { return `<g transform="translate(${x} ${y}) rotate(${t * 20})"><circle r="34" fill="${K.gold}" stroke="${K.ol}" stroke-width="5"/>${Array.from({ length: 8 }, (_, i) => `<rect x="-4" y="-58" width="8" height="16" rx="4" fill="${K.gold}" transform="rotate(${i * 45})"/>`).join('')}</g>`; }
export default function renderShot(t) {
  const back = eio(prog(t, 94.85, 95.3));
  const W = { look: 1, mouth: back > .5 ? 'neutral' : 'smile', talk: talk(t, 92.8, 93.6, 7) + talk(t, 95.0, 96.5, 7), brow: .2 * back, hR: back > 0 ? [lerp(80, 125, back), lerp(-24, -360, back)] : [80, -24], handR: back > .1 ? 'point' : 'rest', blink: blink(t, 1) };
  const M = { look: -1, mouth: 'smile', talk: talk(t, 93.7, 94.7, 7), blink: blink(t, 2), brow: .3 * back };
  const hrs = 19 + 2.2 * eio(prog(t, 92.8, 95.2));
  const small = (1 - fade(t, 94.9, .35));
  const chat = small > 0 ? `<g opacity="${small}" transform="translate(560 420) scale(${pop(t, 92.85)}) translate(-560 -420)">${speech(330, 320, 460, 200, 560, 590, `${plate(460, 430)}${sun(670, 420, t)}`)}</g>` : '';
  const det = pop(t, 95.85);
  const ret = det > 0 ? `<g transform="translate(420 420) scale(${det}) translate(-420 -420)">${speech(200, 310, 440, 220, 330, 590, `${office(330, 480, .9)}<text x="520" y="460" ${TEXT(110, K.accent)}>?</text>`)}</g>` : '';
  const arc = back > 0 ? `<path d="M 780 300 Q 900 330 900 420" stroke="${K.accent}" stroke-width="0" fill="none"/>` : '';
  const arrow = t > 96.0 ? `<g opacity="${fade(t, 96.0)}"><path d="M 760 380 C 900 360 920 480 780 500" stroke="${K.accent}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M 780 500 l 28 -26 M 780 500 l 34 14" stroke="${K.accent}" stroke-width="14" stroke-linecap="round"/><text x="830" y="580" ${TEXT(40, K.cream)} stroke="${K.ink}" stroke-width="8" paint-order="stroke">ZURÜCK</text></g>` : '';
  return twoShot(t, W, M, { clock: hrs }) + chat + ret + arc + arrow + chip(CH[5]);
}
