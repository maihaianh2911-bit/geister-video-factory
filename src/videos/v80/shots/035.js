// 263.32–270.68: … "please look over this plan one last time – with your feedback I'd feel more confident"
import { K, bg, fade, pop, prog, fig, poseAt, chip, bubble, doc } from './lib.js';
export default function renderShot(t) {
  const ich = fig(260, 1340, 1.15, 'ich', poseAt(t, [[263.32, 'stand'], [265.5, 'show']]), { prop: `<g transform="translate(-10 -60)">${doc(0, 0, 90, { title: 'PLAN' })}</g>` });
  const lam = fig(790, 1340, 1.15, 'lam', poseAt(t, [[263.32, 'cross'], [268.6, 'stand']]), { f: -1, smile: fade(t, 269.3) });
  const b = bubble(70, 330, 940, [{ s: '„Herr Lâm, bitte sehen Sie diesen Plan ein letztes Mal durch.', mark: prog(t, 266.34, 266.9) }, { s: 'Mit Ihrer Rückmeldung wäre ich sicherer.“', a: fade(t, 268.02), mark: prog(t, 269.5, 270) }], { size: 54, a: fade(t, 263.3), tail: [300, 840], fill: K.greenL });
  return bg(K.lav) + chip(540, 200, 'BESSER SO:', { size: 44, bg: K.green }) + b.svg + ich + lam + chip(790, 1300, 'HERR LÂM', { size: 34, bg: K.ink2 });
}
