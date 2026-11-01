// 196.23–202.58: "Vinh, you know our data system best – I'm stuck with this report"
import { K, bg, fade, prog, fig, poseAt, chip, bubble } from './lib.js';
export default function renderShot(t) {
  const v = fig(790, 1340, 1.2, 'vinh', poseAt(t, [[196.23, 'stand'], [200.8, 'think']]), { f: -1 });
  const ich = fig(280, 1340, 1.2, 'ich', poseAt(t, [[196.23, 'show'], [200.0, 'shrug']]));
  const b = bubble(70, 330, 940, [{ s: 'Vinh, du kennst dich mit unserem Datensystem am besten aus.', mark: prog(t, 198.72, 199.3) }, { s: 'Ich komme mit diesem Bericht nicht weiter.', a: fade(t, 200.06) }], { size: 58, a: fade(t, 196.3), tail: [330, 860], fill: K.greenL });
  return bg(K.sky) + chip(540, 200, 'STATT ENTSCHULDIGUNG:', { size: 44, bg: K.green }) + b.svg + ich + v + chip(790, 1300, 'VINH', { size: 34, bg: K.blue });
}
