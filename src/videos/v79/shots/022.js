// 101.56–106.56 the two answers differ (VORHIN 18 Uhr ≠ JETZT 20 Uhr); she asks why and watches how he explains
import { K, TEXT, CH, chip, twoShot, speech, clockFace, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const why = eio(prog(t, 103.4, 103.8)), watch = eio(prog(t, 104.5, 104.9));
  const W = { look: 1, talk: talk(t, 103.5, 104.3, 9), lid: .3 * watch, brow: .4 * why - .2 * watch, mouth: 'tight', blink: watch > 0 ? 0 : blink(t, 1) };
  const nerv = watch;
  const M = { look: -1 + nerv * .5 * Math.sin(t * 5), talk: talk(t, 104.6, 106.4, 10), brow: .8, sweat: nerv, hL: [-150 + Math.sin(t * 9) * 30 * nerv, -170 * nerv - 24 * (1 - nerv)], handL: nerv > .3 ? 'palm' : 'rest', hR: [150 - Math.sin(t * 9) * 30 * nerv, -170 * nerv - 24 * (1 - nerv)], handR: nerv > .3 ? 'palm' : 'rest', blink: blink(t, 2) };
  const sh = lerp(1, .82, why);
  const box = (x, a, head, h, val) => a > 0 ? `<g transform="translate(${x} 390) scale(${a}) translate(${-x} -390)"><rect x="${x - 190}" y="250" width="380" height="290" rx="34" fill="${K.cream}" stroke="${K.ol}" stroke-width="6"/><text x="${x}" y="310" ${TEXT(40, '#7a6a5c')}>${head}</text>${clockFace(x - 90, 420, 60, h)}<text x="${x + 70}" y="440" ${TEXT(58, K.accent)}>${val}</text></g>` : '';
  const neq = pop(t, 102.2);
  const top = `<g transform="translate(540 250) scale(${sh}) translate(-540 -250)">${box(300, pop(t, 101.6), 'VORHIN', 18, '18 Uhr')}${box(780, pop(t, 101.95), 'JETZT', 20, '20 Uhr')}${neq > 0 ? `<g transform="translate(540 400) scale(${neq})"><circle r="56" fill="${K.red}" stroke="${K.ol}" stroke-width="5"/><text y="26" ${TEXT(80, '#fff')}>≠</text></g>` : ''}</g>`;
  const w = pop(t, 103.5);
  const wb = w > 0 ? `<g transform="translate(300 620) scale(${w}) translate(-300 -620)">${speech(140, 560, 330, 110, 260, 690, `<text x="305" y="634" ${TEXT(50)}>Warum?</text>`)}</g>` : '';
  return twoShot(t, W, M) + top + wb + chip(CH[5]);
}
