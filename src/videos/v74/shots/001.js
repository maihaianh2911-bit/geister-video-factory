import { P, ST, fig, hammerP, helmetAt, jacketShape, strikeAt, frame, headline, workshop, benchFront, bootOnBench, prog, eout, lerp } from './lib.js';
// 0–2.05 Cover: the shoemaker hammers a boot; the captain's uniform hangs behind him. Headline.
export default function renderShot(t) {
  const hits = [.3, .74, 1.26];
  const hit = strikeAt(t, hits);
  const aR = t < 1.5 ? lerp(-150, -62, hit) : lerp(-62, -40, eout(prog(t, 1.5, 1.8)));
  const bR = t < 1.5 ? lerp(0, -20, hit) : -20;
  const th = t < 1.5 ? lerp(-170, -20, hit) : lerp(-20, -60, eout(prog(t, 1.5, 1.8)));
  const look = t > 1.45 ? 14 : 8, lookY = t > 1.45 ? -10 : 10;
  let sparks = '';
  for (const h of hits) { const p = prog(t, h, h + .2); if (p > 0 && p < 1) for (let i = 0; i < 6; i++) { const a = -2.6 + i * .45; sparks += `<path d="M ${900 + Math.cos(a) * 30 * (1 + p * 2)} ${1236 + Math.sin(a) * 30 * (1 + p * 2)} l ${Math.cos(a) * 26} ${Math.sin(a) * 26}" stroke="${P.goldHi}" stroke-width="7" stroke-linecap="round" opacity="${1 - p}"/>`; } }
  const glow = eout(prog(t, 1.45, 1.9));
  return frame(t, `${workshop()}
    <circle cx="820" cy="860" r="${360 * glow}" fill="url(#kspot)" opacity="${glow}"/>
    <path d="M 820 560 V 620" ${ST(5)}/><path d="M 720 670 Q 820 600 920 670" fill="none" stroke="${P.woodSh}" stroke-width="14"/>${jacketShape(820, 670, 1.25, { epaul: 1 })}${helmetAt(820, 560, .8, -6)}
    ${fig(380, 1820, 1.85, { kind: 'voigtShoe', aR, bendR: bR, propR: hammerP(th), aL: -28, bendL: -40, look, lookY, brow: t > 1.45 ? 'up' : 'calm', mouth: 'flat' })}
    ${benchFront()}${bootOnBench(790)}${sparks}
    ${headline(t, 'DER FALSCHE HAUPTMANN')}`);
}
