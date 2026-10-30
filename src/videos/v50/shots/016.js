// 26.1–29.12 · "mit vielen Bereichen im Gesicht verbunden" — front face: branches light up to forehead, cheek, jaw
import { P, pastel, girl, prog, eio, eout, back } from '../lib.js';

export default function renderShot(t) {
  const n = [eio(prog(t, 26.4, 26.9)), eio(prog(t, 26.8, 27.3)), eio(prog(t, 27.2, 27.7))];
  const all = t > 28.1 ? .5 + .5 * Math.sin((t - 28.1) * 12) : 0;
  const S = 1.75, X = 540, Y = 1420;
  const area = (cx, cy, rx, ry, a) => a > 0 ? `<ellipse cx="${X + cx * S}" cy="${Y + cy * S}" rx="${rx * S}" ry="${ry * S}" fill="${P.nerve}" opacity="${.22 * a + .15 * all}"/>` : '';
  return `${pastel(t, { color: '#FFF7E6' })}
    ${girl(X, Y, S, { t, id: 's16', eyes: 'open', look: 0, mouth: 'flat', brow: .3, nerves: n, handR: [260, 700], handL: [-260, 700] })}
    ${[1, -1].map(sd => area(60 * sd, -290, 60, 50, n[0]) + area(80 * sd, -125, 50, 40, n[1]) + area(90 * sd, -60, 45, 35, n[2])).join('')}`;
}
