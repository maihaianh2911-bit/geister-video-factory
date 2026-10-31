import { P, cobbles, fig, rifle, rowHouses, sky, frame, prog, eout, back, lerp, ring } from './lib.js';
// 25.1–27.5 On the road he steps out and raises his hand; the marching soldiers halt and bump together on "Soldaten an".
export default function renderShot(t) {
  const stopT = 26.7;
  let sol = '';
  for (let i = 5; i >= 0; i--) {
    const tx = 610 - i * 105;
    const run = t < stopT ? (t - stopT) * 160 : 0;
    const bumpT = stopT + i * .07;
    const sq = t > bumpT ? ring(t, bumpT, 3, 8) : 0;
    sol += fig(tx + run - sq * 12, 1400 + (i % 2) * 14, .82, { kind: 'soldier', walk: t < bumpT ? t * 9 + i : undefined, backR: rifle, aR: -6, aL: t < bumpT ? 15 * Math.sin(t * 9 + i) : 6, eyeS: t > bumpT ? 1.5 : 1, brow: t > bumpT ? 'up' : 'calm', mouth: t > bumpT ? 'o' : 'flat', rot: sq * -5, look: 6 });
  }
  const vx = lerp(1250, 860, eout(prog(t, 25.15, 25.8)));
  const raise = back(prog(t, 26.1, 26.35));
  return frame(t, `${sky()}${rowHouses(1200, P.paperDk, 900)}${cobbles(1200, 1920)}${sol}
    ${fig(vx, 1440, .95, { kind: 'voigt', walk: t < 25.8 ? t * 9 : undefined, aL: lerp(8, 95, raise), bendL: 30 * raise, aR: -8, look: -14, brow: 'angry', mouth: raise > .5 && t < 26.9 ? 'o' : 'flat' })}`);
}
