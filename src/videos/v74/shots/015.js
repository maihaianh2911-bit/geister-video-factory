import { P, cobbles, fig, puff, rifle, rowHouses, shk, sky, talk, frame, prog, back, lerp } from './lib.js';
// 27.5–29.12 He gives the order and points ahead; the soldiers turn to his direction with a heel click on "Befehl".
export default function renderShot(t) {
  const point = back(prog(t, 28.1, 28.35));
  const turn = t >= 28.55;
  const click = shk(t, 28.6, 10, 9);
  let sol = '';
  [[520, 1500], [690, 1520], [860, 1540], [1030, 1560]].forEach(([x, y], i) => {
    sol += fig(x, y + (turn ? Math.abs(click) * .4 : 0), .9, { kind: 'soldier', flip: turn ? false : true, backR: rifle, aR: -6, aL: 6, look: turn ? 10 : 12, brow: 'calm', mouth: 'flat' });
  });
  return frame(t, `${sky()}${rowHouses(1150, P.paperDk, 1200)}${cobbles(1150, 1920)}${sol}
    ${fig(250, 1680, 1.3, { kind: 'voigt', aR: lerp(-8, -100, point), bendR: -4 * point, aL: 10, look: point > .5 ? 14 : 10, brow: 'angry', mouth: talk(t, 27.55, 28.5) })}
    ${t > 28.55 ? puff(780, 1530, t, 28.6, 8, 18, 260, P.paperSh) : ''}`);
}
