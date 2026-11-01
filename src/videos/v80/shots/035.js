// 264.34–271.38: … "please look over this plan one last time – with your feedback I'd feel more confident"
import { K, bg, fade, pop, prog, fig, poseAt, chip, bubble, doc } from './lib.js';
export default function renderShot(t) {
  const ich = fig(260, 1340, 1.15, 'ich', poseAt(t, [[264.34, 'stand'], [266.58, 'show']]), { prop: `<g transform="translate(-10 -60)">${doc(0, 0, 90, { title: 'PLAN' })}</g>` });
  const becker = fig(790, 1340, 1.15, 'becker', poseAt(t, [[264.34, 'cross'], [269.74, 'stand']]), { f: -1, smile: fade(t, 270.49) });
  const b = bubble(70, 330, 940, [{ s: '„Herr Becker, bitte sehen Sie diesen Plan ein letztes Mal durch.', mark: prog(t, 267.48, 268.04) }, { s: 'Mit Ihrer Rückmeldung wäre ich sicherer.“', a: fade(t, 269.2), mark: prog(t, 270.72, 271.2) }], { size: 54, a: fade(t, 264.31), tail: [300, 840], fill: K.greenL });
  return bg(K.lav) + chip(540, 200, 'BESSER SO:', { size: 44, bg: K.green }) + b.svg + ich + becker + chip(790, 1300, 'HERR BECKER', { size: 34, bg: K.ink2 });
}
