// 34.44–38.42: say how many people are trapped and whether anyone is hurt — you speak toward the panel; chips 4 PERSONEN (on "Personen") and VERLETZT? (on "verletzt")
import { K, DEFS, cabin, bust, light, label, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const p = back(prog(t, 35.5, 35.85)), v = back(prog(t, 37.6, 37.95));
  let dots = '';
  for (let i = 0; i < 4; i++) { const a = back(prog(t, 35.6 + i * .1, 35.9 + i * .1)); dots += `<g transform="translate(${360 + i * 120} 560) scale(${f1(a)})"><circle cx="0" cy="-40" r="26" fill="${K.amber}"/><path d="M -38 40 Q -38 -6 0 -6 Q 38 -6 38 40 Z" fill="${K.amber}"/></g>`; }
  const sc = `${cabin(t, { lit: 0 })}${light(620, 1000, 480, 1)}<rect x="860" y="760" width="90" height="300" rx="10" fill="${K.panel}" stroke="${K.ink}" stroke-width="5"/><circle cx="905" cy="1000" r="18" fill="${K.amber}"/>
    ${bust('you', 600, 1120, 1.3, { look: .9, brow: .3, mouth: 'talk', t, aR: [[760, 1250], [700, 1380]] })}`;
  return `${DEFS}${cam(sc, 1.05, 620, 1000)}${dots}${label(540, 330, '4 PERSONEN', p, K.amber, 60)}${label(540, 720, 'VERLETZT?', v, K.red, 60)}`;
}
