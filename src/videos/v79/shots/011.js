// 46.53–52.34 she holds back the accusation ("Du lügst!" is cancelled), remembers what a friend told her, then raises it calmly
import { K, TEXT, CH, chip, twoShot, jag, thought, tinyPerson, cross, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const back_ = eio(prog(t, 47.0, 47.7));
  const W = { look: 1, brow: lerp(-.9, 0, back_), mouth: back_ < .5 ? 'frown' : 'neutral', talk: talk(t, 46.55, 46.95, 11) + talk(t, 50.4, 51.9, 7), lean: lerp(6, 0, back_),
    hR: [lerp(195, 80, back_), lerp(-280, -24, back_)], handR: back_ < .6 ? 'point' : 'rest', lookY: t > 48.1 && t < 49.9 ? -.7 : 0, blink: blink(t, 1) };
  const M = { look: -1, brow: .3, mouth: 'tight', blink: blink(t, 2) };
  const acc = t < 47.8 ? `<g opacity="${1 - fade(t, 47.3, .4)}" transform="translate(470 470) scale(${pop(t, 46.55) * (1 - .3 * eio(prog(t, 47.2, 47.7)))}) translate(-470 -470)">${jag(470, 470, 100, 'Du lügst!', 46)}${cross(470, 470, 1.8 * eout(prog(t, 46.98, 47.15)))}</g>` : '';
  const mem = t > 48.05 && t < 50.4 ? `<g opacity="${fade(t, 48.05) * (1 - fade(t, 50.1))}">${thought(360, 400, 230, 170, 300, 610, `${tinyPerson(300, 470, 1.1, '#8a6fb0', '#d8b25a')}<g transform="translate(410 400)"><rect x="-28" y="-46" width="56" height="92" rx="10" fill="${K.ink}"/><rect x="-21" y="-36" width="42" height="64" rx="4" fill="#bfe0ee"/><circle cx="0" cy="-5" r="${10 + 4 * Math.sin(t * 9)}" fill="${K.green}"/></g><text x="360" y="560" ${TEXT(34)}>EIN FREUND</text>`)}</g>` : '';
  const calm = t > 50.5 ? `<g opacity="${fade(t, 50.5) * .9}"><rect x="300" y="440" width="380" height="84" rx="42" fill="${K.green}" stroke="${K.ol}" stroke-width="5"/><text x="490" y="498" ${TEXT(44, '#fff')}>GANZ RUHIG</text><path d="M 400 565 q 30 -20 60 0 t 60 0 t 60 0" stroke="${K.green}" stroke-width="10" fill="none" stroke-linecap="round"/></g>` : '';
  return twoShot(t, W, M) + acc + mem + calm + chip(CH[3]);
}
