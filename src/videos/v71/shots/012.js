// 30.78–32.9: a colleague comes over and asks one more question ("Frage" 32.22); you turn towards her
import { K, BG, bust, monitor, table, label, TX, prog, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const enter = eio(prog(t, 30.8, 31.5)), turn = eio(prog(t, 32.4, 32.85)), q = back(prog(t, 32.22, 32.5));
  const ox = lerp(1260, 820, enter);
  const talk = t > 31.3 && t < 32.6 ? (Math.sin(t * 14) > 0 ? 'o' : 'flat') : 'flat';
  const col = bust('other', ox, 1040, 1.05, { look: -1, lookY: .1, brow: .4, mouth: talk, aL: [[ox - 120, 1250], [ox - 70, 1330]] });
  const du = bust('du', 380, 1080, 1.05, { look: lerp(-1, 1, turn), lookY: .2, tired: .9, lid: .45, brow: 0, mouth: 'flat' });
  const bubble = q > 0 ? `<g transform="translate(${f1(ox - 60)} 700) scale(${f1(q)})"><path d="M -90 -70 Q -90 -110 -50 -110 L 70 -110 Q 110 -110 110 -70 L 110 10 Q 110 50 70 50 L 10 50 L 40 100 L -30 50 L -50 50 Q -90 50 -90 10 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${TX('?', 10, 0, 110, K.ink)}</g>` : '';
  return `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>${monitor(40, 960, 420, 380, '')}${col}${du}${table(1262, '#DDE3E8', K.steelD)}${bubble}`;
}
