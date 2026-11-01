// 23.88–25.88 every test is child's play: ticks fill the "Klassenarbeit", red grade "1" stamped on "Kinderspiel"
import { K, kid, paper, T, fade, pop, prog, eout, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#d7eedf"/><rect x="0" y="1330" width="1080" height="590" fill="#b9d9c4"/>`;
  // school desk top
  s += `<rect x="40" y="1180" width="1000" height="40" rx="8" fill="${K.wood}" stroke="${K.ol}" stroke-width="6"/>`;
  const sl = eout(prog(t, 23.88, 24.3));
  let inner = '';
  for (let i = 0; i < 5; i++) {
    const a = fade(t, 24.2 + i * .16, .12);
    inner += `<path d="M 170 ${-110 + i * 92} l 18 20 l 34 -40" stroke="${K.green}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(a * 100) / 100}"/>`;
  }
  const st = pop(t, 25.3, .3);
  inner += `<g opacity="${f1(fade(t, 25.3, .1) * 100) / 100}" transform="translate(170 -330) rotate(-12) scale(${f1(st * 100) / 100})"><circle r="84" fill="none" stroke="${K.red}" stroke-width="12"/>${T(0, 42, '1', 130, { fill: K.red })}</g>`;
  inner += T(-230, 300, 'Note:', 44, { anchor: 'start', fill: K.grey });
  s += paper(560, 1680 - sl * 900, 620, 800, { title: 'Klassenarbeit', ts: 50, lines: 0, rot: -2, inner: [0, 1, 2, 3, 4].map(i => `<path d="M -240 ${-110 + i * 92} L 120 ${-110 + i * 92}" stroke="${K.greyL}" stroke-width="14" stroke-linecap="round"/>`).join('') + inner });
  s += kid(140, 1330, .7, { aL: [12, 6], aR: [150, 20], mouth: t > 25.3 ? 'grin' : 'smile', brows: 'up', look: [10, 0] });
  return s;
}
