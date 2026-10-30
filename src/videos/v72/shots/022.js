// 58.38–62.58: clear complaints after eating ("Beschwerden" 59.82) — hand on your aching stomach; you call for medical advice ("medizinischen Rat" 61.22–61.98)
import { K, DEFS, kitchen, bust, stomach, bodyWindow, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c = eio(prog(t, 60.6, 61.2));
  const win = bodyWindow(540, 1270, 1.6, stomach(540, 1280, .7, { mood: 'ill', rot: Math.sin(t * 18) * 2 }));
  const phone = `<g transform="translate(${f1(lerp(700, 640, c))} ${f1(lerp(1300, 890, c))}) rotate(-10)"><rect x="-44" y="-80" width="88" height="160" rx="16" fill="${K.ink}"/><rect x="-36" y="-70" width="72" height="130" rx="8" fill="${K.white}"/><path d="M -14 -6 h 28 M 0 -20 v 28" stroke="${K.red}" stroke-width="10" stroke-linecap="round" transform="translate(0 0)"/></g>`;
  const du = bust('du', 540, 1000, 1.3, { look: c > .5 ? .5 : 0, lookY: c > .5 ? 0 : .5, brow: 1, mouth: c > .5 ? 'o' : 'down', front: win,
    aL: [[400, 1240], [470, 1300]], aR: [[lerp(700, 720, c), lerp(1240, 1060, c)], [lerp(700, 640, c), lerp(1360, 960, c)]], heldR: phone });
  return `${DEFS}${cam(`${kitchen(1500)}${du}`, 1.0, 540, 1000)}`;
}
