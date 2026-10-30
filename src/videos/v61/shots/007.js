// 9.26–11.3: see-through head in profile — the cold ice sits against the palate, cold spreads (plötzliche Kälte)
import { K, DEFS, BG, headProfile, lens, cam, flake, prog, eout, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const open = eout(prog(t, 9.26, 9.6));
  const ice = eout(prog(t, 9.3, 9.7)), cold = eio(prog(t, 9.8, 10.6));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'g', ice, cold })}</g>`;
  const r = lerp(60, 1300, open);
  return `${DEFS}${BG(K.bg2)}<clipPath id="g0"><circle cx="${f1(480 + 150 * 1.85)}" cy="${f1(800 + 100 * 1.85)}" r="${f1(r)}"/></clipPath>
    <g clip-path="url(#g0)">${BG(K.bg)}${head}</g>
    ${flake(820, 360, 1.1 * eout(prog(t, 9.9, 10.3)), prog(t, 9.9, 10.2))}`;
}
