// 52.96–57.9: if the skin becomes red, sore or painful ("rot" 53.44, "wund" 54.1, "schmerzhaft" 54.64) it is more than smell — the fold patch reddens; you wince and hold your side; card
import { K, stick, lens, card, calNote, cam, prog, eio, lerp, f1 } from './lib.js';
import { bedroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const r = eio(prog(t, 53.3, 53.7)), wd = eio(prog(t, 54.0, 54.4)), p = eio(prog(t, 54.5, 54.9));
  const fig = stick(420, FY, FS, { shirt: K.orange, lean: -6 * p, look: .6, lookY: .4, mouth: p > .5 ? 'open' : 'worried', brow: 'knit', hR: [lerp(510, 470, p), lerp(1110, 920, p)], hL: [330, 1100] });
  const patch = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.skin}"/><ellipse cx="540" cy="940" rx="${f1(300 * (.5 + .5 * r))}" ry="${f1(200 * (.5 + .5 * r))}" fill="${K.red}" opacity="${f1(.55 * r)}"/>${wd > 0 ? `<path d="M 420 900 q 60 -30 120 0 q 60 30 120 0" fill="none" stroke="#B0302F" stroke-width="12" opacity="${f1(wd)}"/>` : ''}`;
  const pulse = p > 0 ? `<circle cx="760" cy="600" r="${f1(240 + 20 * Math.sin(t * 8))}" fill="none" stroke="${K.red}" stroke-width="8" opacity="${f1(.6 * p)}"/>` : '';
  return `${cam(`${bedroom()}${fig}`, 1, 540, 960)}${lens(760, 600, 230, `<g transform="translate(760 600) scale(.42) translate(-540 -940)">${patch}</g>`, 'l18')}${pulse}${card(540, 1230, 'MEHR ALS GERUCH', 54, eio(prog(t, 55.6, 55.9)), { col: K.red })}${calNote(850, 150, ['IN DEN FOLGENDEN', 'TAGEN'])}`;
}
