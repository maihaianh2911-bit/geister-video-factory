// 128.28–132.24 two yardsticks: FÜR SICH vs FÜR ANDERE — on "anderen Maß" the second scale squeezes: he measures with a different standard
import { K, TEXT, CH, chip, kitchen, yardstick, miniHead, prog, eio, eout, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const a = eout(prog(t, 128.35, 128.9)), b = eout(prog(t, 128.7, 129.25)), sq = eio(prog(t, 130.3, 130.9)), neq = pop(t, 130.78);
  let s = kitchen({ dim: .55 });
  s += `<g opacity="${fade(t, 128.3)}">${yardstick(330, 1250, 760 * a, 1.1, '', K.gold, 40)}${yardstick(750, 1250, 760 * b, 1.1, '', sq > .5 ? '#e7a0a0' : K.gold, lerp(40, 18, sq))}</g>`;
  s += `<rect x="130" y="1300" width="400" height="80" rx="40" fill="${K.cream}" stroke="${K.ol}" stroke-width="5"/><text x="330" y="1355" ${TEXT(40)}>FÜR SICH</text>`;
  s += `<rect x="550" y="1300" width="400" height="80" rx="40" fill="${K.cream}" stroke="${K.ol}" stroke-width="5"/><text x="750" y="1355" ${TEXT(40)}>FÜR ANDERE</text>`;
  s += `<g transform="translate(330 ${1250 - 836 * a - 70})">${miniHead(0, 0, 2.2 * a, K.mHair, K.mSkin)}</g>`;
  s += `<g transform="translate(660 ${1250 - 836 * b - 70})">${miniHead(0, 0, 1.6 * b, '#c9a24a', K.mSkin)}</g><g transform="translate(840 ${1250 - 836 * b - 70})">${miniHead(0, 0, 1.6 * b, K.wHair, K.wSkin, true)}</g>`;
  if (neq > 0) s += `<g transform="translate(540 760) scale(${neq})"><circle r="70" fill="${K.red}" stroke="${K.ol}" stroke-width="6"/><text y="32" ${TEXT(100, '#fff')}>≠</text></g>`;
  if (t > 130.9) s += `<g opacity="${fade(t, 130.9)}"><rect x="190" y="1430" width="700" height="0"/></g>`;
  return cam2(s, t) + chip(CH[6]);
}
function cam2(s, t) { const z = 1 + .04 * eio(prog(t, 128.3, 132.2)); return `<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${s}</g>`; }
