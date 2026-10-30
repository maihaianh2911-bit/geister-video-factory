// 17.9–22.72: some make food dangerous without a smell or taste — you sniff the pack calmly; a magnifier shows the red-marked germs on "gefährlich"; nose/tongue chips stay "OK"
import { K, DEFS, kitchen, person, meat, colony, chip, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 18.0, 18.8));
  const mx = lerp(560, 470, lift), my = lerp(1000, 830, lift);
  const p = person(330, 1400, 1.05, { aR: [[460, 980], [mx - 60, my + 10]], head: { look: .8, lookY: 6 * lift, mouth: 'flat' } });
  const lens = back(prog(t, 19.2, 19.5));
  const sniff = eout(prog(t, 20.9, 21.3)), taste = eout(prog(t, 21.5, 21.9));
  const smell = lift > .8 ? [0, 1, 2].map(i => `<path d="M ${f1(mx - 70 - i * 6)} ${f1(my - 60 - i * 26)} q -30 -10 -50 ${-6 + i * 4}" fill="none" stroke="#9AA6CC" stroke-width="5" stroke-linecap="round" opacity="${f1(.6 * (.5 + .5 * Math.sin(t * 5 + i)))}"/>`).join('') : '';
  const mag = lens > 0 ? `<g transform="translate(800 560) scale(${f1(lens)})"><clipPath id="c6m"><circle r="190"/></clipPath><g clip-path="url(#c6m)"><rect x="-200" y="-200" width="400" height="400" fill="${K.meat}"/>${colony(0, 0, 14, 22, t, { spread: 150, bad: true })}</g>
    <circle r="190" fill="none" stroke="${K.line}" stroke-width="14"/><path d="M -134 134 l -110 110" stroke="${K.line}" stroke-width="26" stroke-linecap="round"/></g>
    <path d="M ${f1(mx + 50)} ${f1(my - 20)} L 640 690" stroke="${K.line}" stroke-width="4" stroke-dasharray="10 10" opacity="${f1(lens)}"/>` : '';
  const sc = `${kitchen(t, { fridge: 0, ghost: .5 })}${p.svg}${meat(mx, my, 1.3)}${smell}${mag}`;
  return `${DEFS}${cam(sc, 1.1, 520, 860)}${chip(300, 300, 'GERUCH: OK', sniff, K.green, 44)}${chip(700, 1300, 'GESCHMACK: OK', taste, K.green, 44)}`;
}
