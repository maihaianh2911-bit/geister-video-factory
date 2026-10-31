// 48.72–52.96: in skin folds that are often damp, friction while moving irritates the skin ("Reibung" 50.9, "Bewegen" 51.44) — you walk; lens on the armpit fold: two skin surfaces rub, arrows, it turns pink
import { K, OL, f1, stick, walkFeet, lens, arrow, calNote, cam, prog, eio, lerp } from './lib.js';
import { bedroom, sweat, FY, FS } from './sets.js';
export default function renderShot(t) {
  const w = prog(t, 48.72, 52.96), x = lerp(300, 420, w);
  const [fL, fR] = walkFeet(x, FY, w * 4, 60, FS), sw = Math.sin(w * 25);
  const fig = stick(x, FY, FS, { shirt: K.orange, look: .5, mouth: 'flat', brow: 'knit', fL, fR, hL: [x - 70 + sw * 30, 1100], hR: [x + 70 - sw * 30, 1110] });
  const rb = eio(prog(t, 50.6, 51.2)), sh = Math.sin(t * 10) * 20;
  const fold = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.skin}"/><path d="M -60 ${f1(900 + sh)} Q 540 ${f1(780 + sh)} 1140 ${f1(900 + sh)} V -60 H -60 Z" fill="${K.skinD}" ${OL(8)}/><path d="M -60 ${f1(960 - sh)} Q 540 ${f1(1080 - sh)} 1140 ${f1(960 - sh)} V 2000 H -60 Z" fill="${K.skin}" ${OL(8)}/>
    <ellipse cx="540" cy="930" rx="340" ry="90" fill="${K.red}" opacity="${f1(.35 * rb)}"/>${sweat(360, 900, 30)}${sweat(720, 940, 26)}`;
  const arrows = rb > 0 ? `${arrow(780, 560, 980, 560, K.red, 12, rb)}${arrow(980, 640, 780, 640, K.red, 12, rb)}` : '';
  return `${cam(`${bedroom()}${fig}`, 1, 540, 960)}${lens(760, 600, 230, `<g transform="translate(760 600) scale(.42) translate(-540 -930)">${fold}</g>`, 'l17')}${arrows}${calNote(850, 150, ['IN DEN FOLGENDEN', 'TAGEN'])}`;
}
