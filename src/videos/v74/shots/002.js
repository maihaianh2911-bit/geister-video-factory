import { P, cobbles, fig, rifle, rowHouses, sky, talk, frame, headline, prog, eout, back, lerp } from './lib.js';
// 2.05–3.9 Same man now in the captain's uniform gives an order; three soldiers snap to attention on "Soldaten".
export default function renderShot(t) {
  const tug = eout(prog(t, 2.05, 2.35)) * (1 - eout(prog(t, 2.35, 2.6)));
  const point = back(prog(t, 2.55, 2.85));
  const snap = [2.95, 3.05, 3.15];
  let sol = '';
  [[720, 1500], [860, 1520], [1000, 1540]].forEach(([x, y], i) => {
    const p = prog(t, snap[i] - .12, snap[i]);
    const st = t > snap[i] ? 1 - .06 * Math.exp(-(t - snap[i]) * 10) * Math.cos((t - snap[i]) * 30) : 1;
    sol += `<g transform="translate(${x} ${y}) scale(1 ${st.toFixed(3)}) translate(${-x} ${-y})">${fig(x, y, .95, { kind: 'soldier', backR: rifle, aR: -6, aL: 8, look: lerp(6, -14, eout(p)), headTilt: lerp(6, 0, p), brow: t > snap[i] ? 'up' : 'calm', mouth: 'flat' })}</g>`;
  });
  const hl = 1 - prog(t, 3.4, 3.7);
  return frame(t, `${sky()}${rowHouses(1150, P.paperDk, 600)}${cobbles(1150, 1920)}${sol}
    ${fig(310, 1720, 1.35, { kind: 'voigt', aR: lerp(-8, -92, point) + (tug > 0 ? -30 * tug : 0), bendR: tug > 0 ? -80 * tug : -6 * point, aL: 10, look: 12, lookY: -2, brow: 'angry', mouth: talk(t, 2.6, 3.4) })}
    ${headline(t, 'DER FALSCHE HAUPTMANN', 250, hl)}`);
}
