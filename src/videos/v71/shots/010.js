// 23.64–26.36: a familiar task takes longer — you type, the progress bar on screen crawls while the wall clock races ("länger" 25.72)
import { K, BG, bust, monitor, table, arm, clock, label, prog, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = lerp(.12, .3, prog(t, 23.64, 26.36)), m = lerp(5, 55, prog(t, 23.64, 26.36));
  const scr = `<rect x="0" y="0" width="600" height="70" fill="${K.room2}"/>${[0, 1, 2].map(i => `<rect x="40" y="${100 + i * 56}" width="${[420, 360, 470][i]}" height="22" rx="9" fill="${K.steel}"/>`).join('')}
    <rect x="40" y="290" width="520" height="44" rx="22" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><rect x="46" y="296" width="${f1(508 * p)}" height="32" rx="16" fill="${K.amber}"/>`;
  const du = bust('du', 860, 1070, 1.05, { look: -1, lookY: .3, tired: .9, lid: .45, brow: .3, mouth: 'flat', noL: true, noR: true });
  const ty = k => 1282 - Math.abs(Math.sin(t * 11 + k)) * 14;
  const armL = arm([772, 1106], [700, 1240], [760, ty(0)], 1.05, K.du), armR = arm([948, 1106], [990, 1230], [900, ty(1.6)], 1.05, K.du);
  return `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>${clock(860, 430, 105, 9, m)}${monitor(400, 960, 600, 380, scr)}${du}${table(1262, '#DDE3E8', K.steelD)}
    <rect x="620" y="1268" width="380" height="34" rx="10" fill="${K.steel}" stroke="${K.ink}" stroke-width="4"/>${armL}${armR}${label(400, 560, 'LÄNGER', prog(t, 25.72, 25.95), K.amberD, 64)}`;
}
