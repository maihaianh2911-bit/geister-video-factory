// 68.9–71.268 · "damit dein Mund nicht so plötzlich auskühlt" — lens: palate stays pink and warm, check; end back on the cone
import { P, parlour, girl, profileHead, lens, thermo, check, cam, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const S = 1.5, X = 520, Y = 1330;
  const out = eio(prog(t, 70.4, 70.9));
  const ls = back(prog(t, 68.9, 69.2)) * (1 - out);
  const hand = [lerp(190, 150, out), lerp(40, -20, out)];
  const inner = `<rect x="0" y="0" width="1080" height="1920" fill="#FFF3EA"/>
    ${profileHead(540 - 110 * 3.2, 620 - 62 * 3.2, 3.2, { t, id: 's36p', xray: 1, palWarm: .25, ice: .55, iceX: 140, eye: 'open' })}`;
  return `<g transform="${cam(lerp(1.0, 1.0, out), 540, 900, 540, 900)}">${parlour(t)}
    ${girl(X, Y, S, { t, id: 's36', hold: 'cone', handR: hand, bite: .45, biteSide: -1, eyes: out > .5 ? 'wide' : 'happy', look: 12, lookY: -8, mouth: out > .5 ? 'o' : 'smile', tilt: 6 * out })}</g>
    ${lens(540, 620, 330, inner, 's36l', ls)}
    ${ls > .5 ? thermo(160, 1080, .7, .55, { id: 's36t', col: P.pink }) : ''}
    ${check(880, 250, .7, prog(t, 69.5, 70.0) * (1 - out))}`;
}
