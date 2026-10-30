// 75.04–78.22: do not give up an escape route that is still open ("offenen Fluchtweg"): back at the surface, the open driver window glows as the way out and you climb through it
import { K, DEFS, BG, carSide, bust, water, rain, label, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const glow = eout(prog(t, 75.6, 76.1)), out = eio(prog(t, 76.4, 77.9));
  const s = 1.5, cx = 700, cy = 1500 + 4 * Math.sin(t * 2);
  // front window opening in car coords: x -82..168, y -352..-226
  const wx = cx + 40 * s, wy = cy - 226 * s;
  const yx = lerp(wx - 20, wx + 20, out), yy = lerp(wy + 260, wy - 70, out);
  const outline = `<path d="M 168 -226 L 52 -350 L -82 -352 L -82 -226 Z" fill="none" stroke="${K.amber}" stroke-width="${f1(10 / s * 1.5)}" opacity="${f1(glow)}"/>`;
  const sc = `${BG('url(#eSky)')}
    ${carSide(t, cx, cy, s, { tilt: 5, lights: .2, inner: .8, winF: 1, id: 's28c', only: [], over: outline })}
    <clipPath id="s28o"><path d="M -60 -60 H 1140 V ${f1(wy)} H -60 Z"/></clipPath>
    <g clip-path="url(#s28o)">${bust('you', yx, yy, 1.2, { look: -.6, lookY: -.4, brow: .6, mouth: 'flat', aL: [[yx - 170, yy - 20], [yx - 230, wy - 10]], aR: [[yx + 170, yy - 10], [yx + 150, wy - 10]] })}</g>
    <path d="M ${f1(cx - 82 * s)} ${f1(wy)} L ${f1(cx + 168 * s)} ${f1(wy)}" stroke="${K.carL}" stroke-width="14"/>
    ${light(wx, wy - 100, 420, .6 * glow)}
    ${water(t, 1250, { amp: 10, alpha: .93 })}${rain(t, .9, 60)}`;
  return `${DEFS}${sc}${label(540, 330, 'FLUCHTWEG', glow, K.amber, 76)}`;
}
