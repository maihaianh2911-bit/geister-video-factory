// 62.42–69.0 she watches his reaction: hectic counter-questions, then he changes a detail he just told ("Büro" → "kurz im Laden")
import { K, TEXT, CH, chip, twoShot, speech, cross, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const hect = eio(prog(t, 64.2, 64.5)) * (1 - eio(prog(t, 65.2, 65.5)));
  const W = { look: 1, lid: .3, brow: -.3 + .5 * eio(prog(t, 67.2, 67.6)), mouth: 'tight', blink: blink(t, 1) };
  const M = { look: -1, lookY: 0, brow: .9, talk: talk(t, 64.3, 65.2, 14) + talk(t, 65.4, 66.8, 9), lean: -6 * hect, sweat: eout(prog(t, 64.3, 64.6)),
    hL: [-150 + Math.sin(t * 12) * 30 * hect, -180], handL: 'palm', hR: [150 - Math.sin(t * 12) * 30 * hect, -180], handR: 'palm', blink: blink(t, 2) };
  let qs = '';
  [['WER?', 64.4, 640, 330], ['WANN?', 64.72, 880, 300], ['WO?', 65.0, 760, 220]].forEach(([w, tt, x, y]) => { const a = pop(t, tt, .25) * (1 - fade(t, 65.3, .3)); if (a > 0) qs += `<g transform="translate(${x} ${y}) scale(${a})"><circle r="70" fill="#fff2e8" stroke="${K.red}" stroke-width="7"/><text y="16" ${TEXT(42, K.red)}>${w}</text></g>`; });
  const st = pop(t, 65.35), strike = eout(prog(t, 65.75, 65.95)), rep = pop(t, 66.15);
  const stmt = st > 0 && t > 65.3 ? `<g transform="translate(560 380) scale(${st}) translate(-560 -380)">${speech(160, 260, 840, 250, 760, 600, `<text x="580" y="345" ${TEXT(50)}>Ich war im</text><text x="${rep > 0 ? 420 : 580}" y="440" ${TEXT(62)}>BÜRO</text>${strike > 0 ? `<path d="M 330 425 L ${330 + 180 * strike} 425" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>` : ''}${rep > 0 ? `<g transform="translate(720 420) scale(${rep}) translate(-720 -420)"><text x="720" y="440" ${TEXT(56, K.red)}>kurz im Laden</text></g>` : ''}`)}</g>` : '';
  const eye = `<g opacity="${fade(t, 62.6)}"><rect x="50" y="560" width="390" height="80" rx="40" fill="${K.ink}" opacity=".85"/><text x="245" y="615" ${TEXT(40, K.cream)}>ACHTE DARAUF</text></g>`;
  return twoShot(t, W, M) + qs + stmt + (t < 65.3 ? eye : '') + chip(CH[3]);
}
