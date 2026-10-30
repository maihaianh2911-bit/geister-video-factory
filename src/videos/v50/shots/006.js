// 7.65–9.26 · "du musst die Augen zukneifen" — extreme close-up: eyes squeeze shut on "zukneifen", a tear
import { P, girl, painGlow, prog, eout, lerp } from '../lib.js';

export default function renderShot(t) {
  const shut = t >= 8.42;
  const squeeze = prog(t, 8.3, 8.44);
  const sh = shut ? 5 * Math.sin(t * 55) * Math.max(.3, Math.exp(-(t - 8.44) * 3)) : 0;
  const tear = prog(t, 8.7, 9.2);
  const s = lerp(3.5, 3.7, eout(prog(t, 7.65, 9.26)));
  return `<rect x="-20" y="-20" width="1120" height="1960" fill="#F6DCD3"/>
    <g transform="translate(${sh} 0)">${girl(540, 820 + 185 * s, s, { t, id: 's6', eyes: shut ? 'shut' : (squeeze > .3 ? 'closed' : 'half'), brow: lerp(.7, 1, squeeze), mouth: 'ouch', painFore: .8 + .2 * Math.sin(t * 9), handR: [400, 900], handL: [-400, 900] })}
    ${tear > 0 ? `<path d="M ${540 - 70 * s} ${830 + 300 * eout(tear)} q -18 30 0 44 q 18 -14 0 -44 Z" fill="#BFE3FA" stroke="${P.ink}" stroke-width="5"/>` : ''}</g>`;
}
