// 14.02–16.76: the clean shirt quickly smells under the armpits ("Achseln" 15.82) — you lift your arm, sniff, wince; green smell lines rise from the armpit
import { K, stick, smell, calNote, cam, prog, eio, lerp } from './lib.js';
import { bathroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 14.3, 15.0)), sn = eio(prog(t, 15.0, 15.5)), sm = eio(prog(t, 15.2, 15.8));
  const fig = stick(540, FY, FS, { shirt: K.teal, lean: -8 * sn, look: lerp(0, .7, sn), lookY: .6 * sn, mouth: sm > .5 ? 'worried' : 'flat', brow: sm > .5 ? 'knit' : 'calm',
    hR: [lerp(640, 760, lift), lerp(1110, 640, lift)], hL: [460, 1100] });
  return `${cam(`${bathroom({ sink: false })}${fig}${smell(600, 900, t, sm, K.odor, 3)}`, lerp(1.25, 1.4, prog(t, 14.02, 16.76)), 560, 860)}${calNote(900, 150, ['NACH EINIGEN', 'TAGEN'])}`;
}
