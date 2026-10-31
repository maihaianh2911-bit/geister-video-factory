// 14.48–17.0: office — you read the same e-mail several times: the reading marker runs down, then jumps back to the top ("mehrmals" 15.88); a 2× chip
import { K, BG, bust, monitor, emailLines, table, arm, label, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const pass = t < 15.88 ? prog(t, 14.6, 15.8) : prog(t, 15.95, 16.95);
  const line = Math.min(4, pass * 5), y = 110 + Math.floor(line) * 62 - 10;
  const hl = `<rect x="30" y="${f1(y)}" width="540" height="44" rx="12" fill="${K.amber}" opacity=".45"/>`;
  const scr = `${emailLines(600, 5)}${hl}`;
  const du = bust('du', 860, 1070, 1.05, { look: -1, lookY: lerp(-.2, .5, line / 4), tired: .9, lid: .4, brow: t > 15.9 ? .4 : 0, mouth: 'flat', noL: true, noR: true });
  const wall = `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>`;
  const kb = `<rect x="620" y="1268" width="380" height="34" rx="10" fill="${K.steel}" stroke="${K.ink}" stroke-width="4"/>`;
  const armL = arm([772, 1106], [700, 1240], [740, 1282], 1.05, K.du), armR = arm([948, 1106], [990, 1230], [930, 1286], 1.05, K.du);
  return `${wall}${monitor(400, 960, 600, 380, scr)}${du}${table(1262, '#DDE3E8', K.steelD)}${kb}${armL}${armR}${label(860, 560, '2×', prog(t, 15.88, 16.1), K.amberD, 70)}`;
}
