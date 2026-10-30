// 28.26–34.5: the big pot of food for the next days — portions labelled for the coming days; without cooling it's not a good stock: warning on "keine gute Vorratsidee"
import { K, DEFS, BG, pot, colony, f1, prog, eio, eout, back, lerp, TX } from './lib.js';
export default function renderShot(t) {
  const bowls = ['MO', 'DI', 'MI'];
  const warn = back(prog(t, 32.2, 32.6));
  const g = prog(t, 30.8, 33.2);
  let b = '';
  bowls.forEach((d, i) => {
    const a = back(prog(t, 29.4 + i * .3, 29.7 + i * .3)); if (a <= 0) return;
    const x = 230 + i * 310;
    b += `<g transform="translate(${x} 1100) scale(${f1(a)})"><path d="M -110 -30 Q -100 80 0 90 Q 100 80 110 -30 Z" fill="#F2F5FF" stroke="${K.ink}" stroke-width="4"/><ellipse cx="0" cy="-30" rx="110" ry="24" fill="#B8743A" stroke="${K.ink}" stroke-width="4"/>${TX(d, 0, 170, 48, K.ink)}
      ${i > 0 ? colony(0, -34, Math.round(g * (i === 1 ? 6 : 14)), 9, t, { spread: 70, seed: i }) : ''}</g>`;
  });
  return `${DEFS}${BG('url(#kWall)')}<rect x="-60" y="760" width="1200" height="40" fill="${K.counterT}" stroke="${K.ink}" stroke-width="4"/><rect x="-60" y="800" width="1200" height="1200" fill="${K.counter}"/>
    ${pot(540, 600, 1.6, .9 * (1 - eout(prog(t, 30.5, 31.5))), t)}${b}
    ${warn > 0 ? `<g transform="translate(540 340) scale(${f1(warn)})"><path d="M 0 -110 L 120 100 L -120 100 Z" fill="${K.warm}" stroke="${K.ink}" stroke-width="6" stroke-linejoin="round"/><text y="80" text-anchor="middle" fill="${K.ink}" style="font-family:'Inter';font-weight:900;font-size:130px">!</text></g>` : ''}`;
}
