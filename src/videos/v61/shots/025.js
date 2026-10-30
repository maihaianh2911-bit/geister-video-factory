// 47.4–49.18: how long — a few seconds up to a few minutes: SEKUNDEN – MINUTEN on a time bar
import { K, DEFS, BG, TX, HL, OL, prog, eout, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const s1 = back(prog(t, 47.6, 47.85)), fill = eio(prog(t, 47.7, 48.8)), s2 = back(prog(t, 48.75, 49.0));
  const ang = (t - 47.4) * 300;
  const watch = `<g transform="translate(540 560)"><rect x="-34" y="-250" width="68" height="50" rx="10" fill="${K.teal}" ${OL(6)}/><circle r="210" fill="${K.white}" ${OL(8)}/>
    <path d="M 0 0 L 0 -190 A 190 190 0 ${fill > .5 ? 1 : 0} 1 ${f1(190 * Math.sin(fill * 2 * Math.PI * .999))} ${f1(-190 * Math.cos(fill * 2 * Math.PI * .999))} Z" fill="${K.tealL}"/>
    ${[...Array(12)].map((_, i) => `<path d="M 0 -190 V -160" transform="rotate(${i * 30})" ${OL(8)}/>`).join('')}
    <path d="M 0 0 L 0 -150" transform="rotate(${f1(ang)})" stroke="${K.pinkD}" stroke-width="14" stroke-linecap="round"/><circle r="18" fill="${K.ink}"/></g>`;
  return `${DEFS}${BG(K.bg)}${watch}
    <rect x="110" y="980" width="860" height="56" rx="28" fill="${K.white}" ${OL(6)}/>
    <rect x="118" y="988" width="${f1(844 * fill)}" height="40" rx="20" fill="${K.teal}"/>
    <g transform="translate(540 1170) scale(${f1(s1)})">${HL('SEKUNDEN –', 0, 0, 104, K.white, 16)}</g>
    <g transform="translate(540 1310) scale(${f1(s2)})">${HL('MINUTEN', 0, 0, 104, K.white, 16)}</g>`;
}
