// 56.4–58.86 · "ein Schluck lauwarmes Wasser kann helfen" — she sips lukewarm water; a warm glow, then relief
import { P, parlour, girl, waterGlass, fingersOver, cam, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const S = 1.65, X = 540, Y = 1420;
  const lift = eio(prog(t, 56.4, 56.74)) * (1 - eio(prog(t, 57.5, 57.9)));
  const sip = lift > .9;
  const relief = t > 57.9;
  const gx = lerp(X + 260, X + 120, lift), gy = lerp(Y + 120, Y - 84 * S + 70, lift), rot = -28 * lift;
  const glow = eout(prog(t, 56.9, 57.5)) * (1 - prog(t, 58.2, 58.86));
  return `<g transform="${cam(lerp(1.0, 1.06, prog(t, 56.4, 58.86)), 540, 900, 540, 900)}">${parlour(t)}
    ${girl(X, Y, S, { t, id: 's30', eyes: sip ? 'closed' : (relief ? 'happy' : 'open'), look: 12, lookY: 14, brow: relief ? 0 : .5, mouth: sip ? 'sip' : (relief ? 'smile' : 'soft'), handR: [(gx - X) / S + 10, (gy - Y) / S + 50], handL: [-215, 420] })}
    <ellipse cx="${X}" cy="${Y - 70 * S}" rx="${150 * glow}" ry="${100 * glow}" fill="${P.warm}" opacity=".35" filter="url(#blur20)"/>
    <g transform="rotate(${rot} ${gx} ${gy})">${waterGlass(gx, gy, .72, { id: 's30w', level: lerp(.75, .55, prog(t, 56.8, 57.5)) })}</g>
    ${fingersOver(gx + 16, gy + 80)}</g>`;
}
