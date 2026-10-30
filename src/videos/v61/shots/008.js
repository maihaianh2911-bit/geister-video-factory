// 11.3–13.28: closer on the mouth — the palate turns blue and the thermometer drops (Temperatur … Gaumen … sinken)
import { K, DEFS, BG, headProfile, cam, thermo, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const drop = eio(prog(t, 11.9, 12.75));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'h', ice: 1, cold: lerp(.6, 1, prog(t, 11.3, 12.2)) })}</g>`;
  const z = lerp(1.45, 1.6, eio(prog(t, 11.3, 13.28)));
  const col = drop > .5 ? K.cold : K.hot;
  return `${DEFS}${BG(K.bg)}${cam(head, z, 760, 940, -200, -40)}
    <path d="M 640 760 L 760 640" stroke="${K.ink}" stroke-width="6" stroke-dasharray="14 12"/>
    ${thermo(860, 520, 1, lerp(.85, .18, drop), drop > .55 ? K.cold : K.hot)}`;
}
