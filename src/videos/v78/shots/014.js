// 35.56–39.38: you change the shirt ("Shirt" 36.3) but the feeling on your body stays ("bleibt" 38.28) — teal shirt off, orange shirt on; you still rub your arm, frowning
import { K, OL, f1, stick, calNote, cam, prog, eio, lerp } from './lib.js';
import { bedroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const off = eio(prog(t, 35.7, 36.3)), on = eio(prog(t, 36.4, 37.0)), rub = eio(prog(t, 37.4, 37.8)), r = Math.sin(t * 12) * 18 * rub;
  const shirt = t < 36.35 ? K.teal : K.orange;
  const up = t < 36.35 ? off : 1 - on;
  const old = t > 36.3 ? `<g transform="translate(${f1(lerp(700, 860, eio(prog(t, 36.3, 36.8))))} ${f1(lerp(700, 1250, eio(prog(t, 36.3, 36.9))))})"><path d="M -60 -50 L -20 -60 Q 0 -40 20 -60 L 60 -50 L 90 0 L 60 10 V 90 H -60 V 10 L -90 0 Z" fill="${K.teal}" ${OL(5)}/></g>` : '';
  const fig = stick(520, FY, FS, { shirt, look: rub > .5 ? -.6 : 0, lookY: rub > .5 ? .5 : -.3 * up, mouth: rub > .5 ? 'worried' : 'flat', brow: rub > .5 ? 'knit' : 'calm',
    hL: rub > .1 ? [lerp(440, 590, rub) + r, lerp(1100, 960, rub)] : [lerp(440, 470, up), lerp(1100, 660, up)], hR: rub > .1 ? [620, 1080] : [lerp(620, 590, up), lerp(1110, 660, up)] });
  return `${cam(`${bedroom()}${fig}${old}`, 1.1, 540, 1000)}${calNote(900, 150, ['AM', 'WOCHENENDE'])}`;
}
