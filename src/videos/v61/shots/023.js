// 42.7–44.7: most people just say HIRNFROST — frost crystals grow over the brain, frosty headline
import { K, DEFS, BG, headProfile, cam, HL, flake, prog, eout, eio, back, lerp, f1, hash } from './lib.js';
export default function renderShot(t) {
  const fr = eout(prog(t, 42.8, 43.7)), h = back(prog(t, 43.7, 44.0));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'x', ice: 1, cold: 1, brain: 0 })}
    <g opacity="${f1(.55 * fr)}"><path d="M -170 -160 Q -150 -250 -30 -246 Q 100 -246 130 -150 Q 150 -70 80 -40 Q -20 -10 -110 -40 Q -190 -70 -170 -160 Z" fill="${K.coldL}"/></g></g>`;
  const fl = [[260, 420], [420, 330], [600, 380], [700, 520], [330, 600], [540, 560]].map(([x, y], i) => flake(x, y, .55 * back(prog(t, 42.8 + i * .12, 43.1 + i * .12)), 1)).join('');
  return `${DEFS}${BG(K.bg)}${cam(head + fl, lerp(.95, 1.0, eio(prog(t, 42.7, 44.7))), 480, 600)}
    <g transform="translate(540 1340) scale(${f1(h)})">${HL('HIRNFROST', 0, 0, 150, K.coldL, 20)}</g>`;
}
