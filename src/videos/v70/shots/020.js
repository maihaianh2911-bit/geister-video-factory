// 49.16–52.4: at your driver window — the hammer tip goes to a corner of the pane ("Ecke"), your other forearm comes up over your eyes ("schütze deine Augen"), strike: the pane crumbles
import { K, DEFS, BG, bust, hammer, water, rain, light, f1, prog, eio, ein, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const aim = eio(prog(t, 49.3, 49.9)), shield = eio(prog(t, 50.6, 51.1)), strike = ein(prog(t, 51.45, 51.65)), hit = t >= 51.65;
  const fall = prog(t, 51.65, 52.4);
  // window on the right: x 600..1040, y 330..1000; corner target (640, 960)
  const tx = 655, ty = 950;
  const pre = [lerp(560, tx + 168, aim), lerp(1250, ty + 30, aim)];
  const g = [pre[0] + 50 * (1 - strike) * (t > 51.2 ? prog(t, 51.2, 51.45) : 0), pre[1] + 50 * (1 - strike) * (t > 51.2 ? prog(t, 51.2, 51.45) : 0)];
  const ang = -45;
  let cubes = '';
  if (hit) for (let i = 0; i < 48; i++) { const cx = 620 + (i % 8) * 52 + 8 * hash(i), cy = 360 + Math.floor(i / 8) * 104;
    const d = fall * fall * (400 + 300 * hash(i)); cubes += `<rect x="${f1(cx)}" y="${f1(cy + d)}" width="24" height="24" fill="${K.glassL}" opacity="${f1(.7 * (1 - fall * .7))}" stroke="${K.ink}" stroke-width="2"/>`; }
  const sx = 330, sy = 1060, s = 1.3;
  const shieldArm = [[lerp(150, 140, shield), lerp(1330, 990, shield)], [lerp(170, 420, shield), lerp(1500, 935, shield)]];
  const hamArm = [[lerp(470, 520, aim), lerp(1300, 1180, aim)], [g[0], g[1]]];
  const sc = `${BG('#141B20')}<path d="M 600 330 L 1040 300 L 1040 1000 L 600 1000 Z" fill="#0E1418"/>
    <clipPath id="s20w"><path d="M 600 330 L 1040 300 L 1040 1000 L 600 1000 Z"/></clipPath><g clip-path="url(#s20w)">${water(t, 760, { amp: 12 })}${rain(t, 1, 30)}
      ${hit ? '' : `<rect x="590" y="290" width="460" height="720" fill="${K.glassL}" opacity=".25"/>`}</g>${cubes}
    <path d="M 600 330 L 1040 300 L 1040 1000 L 600 1000 Z" fill="none" stroke="${K.ink}" stroke-width="14"/>
    ${aim > .5 && !hit ? `<circle cx="${tx}" cy="${ty}" r="46" fill="none" stroke="${K.amber}" stroke-width="7" stroke-dasharray="14 10"/>` : ''}
    <path d="M -60 1000 L 1140 1000 L 1140 1980 L -60 1980 Z" fill="#232B31" stroke="${K.ink}" stroke-width="6"/>
    ${bust('you', sx, sy, s, { look: shield > .5 ? -1 : 1, brow: .8, mouth: 'flat', closed: shield > .6, tilt: lerp(0, -10, shield), hx: lerp(0, -16, shield), aL: shieldArm, aR: hamArm, belt: '' })}
    ${hammer(g[0], g[1], .8, ang).replace('<g ', '<g ')}<circle cx="${f1(g[0])}" cy="${f1(g[1])}" r="30" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>
    ${light(560, 900, 600, .35)}`;
  return `${DEFS}${sc}`;
}
