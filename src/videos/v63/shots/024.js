// 43.34–45.5: the fence pulls a bundle wrapped in a towel from under his pullover (zieht … Handtuch)
import { K, DEFS, BG, grain, cam, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 43.7, 44.9));
  const bx = 540 + 0 * p, by = lerp(980, 1180, p);
  const torso = `<rect x="470" y="300" width="140" height="160" fill="${K.skin}" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 120 1500 Q 110 760 200 560 Q 300 470 470 440 Q 540 500 610 440 Q 780 470 880 560 Q 970 760 960 1500 Z" fill="${K.pull}" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 470 440 Q 540 520 610 440" fill="none" stroke="#6A4C38" stroke-width="22"/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${300 + i * 160} 700 Q ${310 + i * 160} 1000 ${300 + i * 160} 1380" stroke="#6A4C38" stroke-width="6" fill="none" opacity=".6"/>`).join('')}
    <path d="M 180 1400 Q 540 ${f1(1380 + 60 * p)} 900 1400" fill="none" stroke="#6A4C38" stroke-width="26"/>`;
  const bundle = `<g transform="translate(${f1(bx)} ${f1(by)}) rotate(${f1(-8 + 8 * p)})"><ellipse rx="220" ry="90" fill="${K.towel}" stroke="${K.ink}" stroke-width="6"/>${[0, 1, 2].map(i => `<path d="M ${-160 + i * 110} -70 Q ${-120 + i * 110} 0 ${-160 + i * 110} 70" fill="none" stroke="#C9C2AE" stroke-width="8"/>`).join('')}</g>`;
  const hidden = p < .35;
  const hands = `<g transform="translate(${f1(bx - 200)} ${f1(by + 10)})"><path d="M -260 155 L -10 10" stroke="${K.ink}" stroke-width="102" stroke-linecap="round"/><path d="M -262 156 L -10 10" stroke="${K.pull}" stroke-width="90" stroke-linecap="round"/><path d="M -62 -30 L -20 44" stroke="#6A4C38" stroke-width="10" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="50" ry="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/></g>
    <g transform="translate(${f1(bx + 200)} ${f1(by + 10)})"><path d="M 260 155 L 10 10" stroke="${K.ink}" stroke-width="102" stroke-linecap="round"/><path d="M 262 156 L 10 10" stroke="${K.pull}" stroke-width="90" stroke-linecap="round"/><path d="M 62 -30 L 20 44" stroke="#6A4C38" stroke-width="10" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="50" ry="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/></g>`;
  return `${DEFS}${BG('#9C8B72')}${cam(torso + (hidden ? `<g opacity=".0">${bundle}</g><path d="M 320 ${f1(by - 80)} Q 540 ${f1(by - 140)} 760 ${f1(by - 80)} Q 760 ${f1(by + 90)} 540 ${f1(by + 100)} Q 320 ${f1(by + 90)} 320 ${f1(by - 80)} Z" fill="#6A4C38" opacity=".7"/>` : bundle) + hands, lerp(1, 1.05, eio(prog(t, 43.34, 45.5))), 540, 1000)}${grain(t)}`;
}
