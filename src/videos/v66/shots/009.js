// 34.5–36.26: what would we have had instead? — you stand by the empty corner, a thought bubble fills with jars, a smoked sausage and dried fruit
import { K, DEFS, kitchen, person, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const b = back(prog(t, 34.7, 35.1));
  const p = person(360, 1400, 1.05, { aL: [[250, 960], [300, 870]], aR: [[470, 960], [420, 870]], head: { look: .6, lookY: -6, mouth: 'flat', brow: 1 } });
  const items = `<rect x="-150" y="-40" width="80" height="110" rx="12" fill="${K.jar}" stroke="${K.ink}" stroke-width="4"/><rect x="-150" y="-60" width="80" height="24" rx="6" fill="${K.red}" stroke="${K.ink}" stroke-width="4"/>
    <path d="M -20 -80 Q 0 40 30 80" stroke="#8A3B2B" stroke-width="34" stroke-linecap="round"/><path d="M -20 -80 v -30" stroke="${K.ink}" stroke-width="4"/>
    ${[0, 1, 2].map(i => `<circle cx="${110 + (i % 2) * 30}" cy="${-30 + i * 40}" r="26" fill="#D9A15A" stroke="${K.ink}" stroke-width="4"/><circle cx="${110 + (i % 2) * 30}" cy="${-30 + i * 40}" r="9" fill="#F2E3C0"/>`).join('')}`;
  const bub = b > 0 ? `${[[520, 620, 16], [570, 540, 26]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${f1(r * b)}" fill="#fff" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    <g transform="translate(760 360) scale(${f1(b)})"><ellipse rx="270" ry="180" fill="#fff" stroke="${K.ink}" stroke-width="5"/>${items}
    <text x="0" y="150" text-anchor="middle" fill="${K.sun}" style="font-family:'Inter';font-weight:900;font-size:70px">?</text></g>` : '';
  return `${DEFS}${cam(`${kitchen(t, { fridge: 0, ghost: .6 })}${p.svg}${bub}`, 1.05, 540, 800)}`;
}
