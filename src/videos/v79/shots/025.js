// 112.96–117.08 he shrugs: "Ich hab ihr doch nur geholfen, es lag auf dem Weg." — in his bubble his car picks up a colleague on the way
import { K, TEXT, CH, chip, twoShot, speech, car, miniHead, tinyPerson, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const shrug = eio(prog(t, 114.5, 114.9));
  const M = { look: -1, talk: talk(t, 114.6, 116.8, 8), brow: lerp(.2, .7, shrug), mouth: 'smile', hL: [lerp(-80, -120, shrug), lerp(-24, -175, shrug)], handL: shrug > .3 ? 'palm' : 'rest', hR: [lerp(80, 120, shrug), lerp(-24, -175, shrug)], handR: shrug > .3 ? 'palm' : 'rest', dy: -6 * shrug, blink: blink(t, 2) };
  const W = { look: 1, lid: .25, brow: -.2, mouth: 'tight', blink: blink(t, 1) };
  const cx = t < 115.1 ? lerp(230, 640, eio(prog(t, 113.6, 115.1))) : lerp(640, 900, eio(prog(t, 115.4, 116.9)));
  const inCar = t >= 115.3;
  const inner = `<path d="M 110 600 L 970 600" stroke="#59606e" stroke-width="40"/><path d="M 130 600 L 970 600" stroke="#f6e7a0" stroke-width="5" stroke-dasharray="30 26"/>
    ${!inCar ? tinyPerson(700, 555, .95, '#c87fa8', '#e2c06a') : ''}
    <g clip-path="url(#v25c)">${car(cx, 610, .8, { inner: `${miniHead(60, -112, .9, K.mHair, K.mSkin)}${inCar ? miniHead(-10, -112, .9, '#e2c06a', K.wSkin, true) : ''}` })}</g>
    <text x="540" y="410" ${TEXT(40)}>${inCar ? 'LAG AUF DEM WEG' : 'NUR GEHOLFEN'}</text>`;
  const bub = `<g transform="translate(540 470) scale(${pop(t, 113.1)}) translate(-540 -470)"><clipPath id="v25c"><rect x="110" y="330" width="860" height="320" rx="40"/></clipPath>${speech(110, 330, 860, 320, 760, 620, inner)}</g>`;
  return twoShot(t, W, M) + bub + chip(CH[6]);
}
