// 6.15–7.65 · "sticht es mitten in der Stirn" — punch-in: sting bursts on the forehead, hand slaps to it
import { P, pastel, girl, sting, cam, prog, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const z = lerp(1.25, 1.0, eout(prog(t, 6.15, 6.4)));
  const sh = t > 6.22 ? 14 * Math.exp(-(t - 6.22) * 6) : 0;
  const sx = sh * Math.sin(t * 90), sy = sh * Math.cos(t * 77);
  const slap = back(prog(t, 6.82, 7.04));
  const handL = [lerp(-215, -20, slap), lerp(420, -300, slap)];
  const glow = prog(t, 6.22, 6.5) * (t > 7.02 ? 1 + .3 * Math.sin((t - 7.02) * 14) : 1);
  const pain = t > 6.35;
  return `${pastel(t, { color: '#FBE9EC' })}
    <g transform="translate(${sx} ${sy}) ${cam(z, 540, 820, 540, 820)}">
      ${girl(540, 1360, 1.95, { t, id: 's5', eyes: pain ? 'half' : 'wide', brow: pain ? 1 : 0, mouth: pain ? 'ouch' : 'o', painFore: glow, handL, palmL: slap > .05 ? 8 : 0, handR: [260, 900], tilt: -3 * prog(t, 6.3, 6.6) })}
      ${sting(540, 1360 - 300 * 1.95, 230, prog(t, 6.22, 6.75))}
      ${t > 7.0 ? sting(540, 1360 - 300 * 1.95, 300, prog(t, 7.02, 7.5), .4) : ''}
    </g>`;
}
