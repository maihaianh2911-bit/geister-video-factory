import { P, cobbles, fig, rifle, rowHouses, sky, frame } from './lib.js';
// 29.12–31.3 Tracking side view: Voigt leads, real soldiers with rifles march behind him ("marschierte").
export default function renderShot(t) {
  const sc = (t - 29.12) * 260;
  let sol = '';
  for (let i = 4; i >= 1; i--) sol += fig(720 - i * 140, 1500 + (i % 2) * 12, .85, { kind: 'soldier', walk: t * 8 + i * .7, backR: rifle, aR: -6, look: 10 });
  return frame(t, `${sky()}${rowHouses(1150, P.paperDk, 2000 + sc * .6)}${cobbles(1150, 1920, sc)}${sol}
    ${fig(790, 1510, .95, { kind: 'voigt', walk: t * 8, aL: 12 * Math.sin(t * 8), aR: -8, look: 12, brow: 'angry' })}`);
}
