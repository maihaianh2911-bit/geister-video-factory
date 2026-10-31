import { K, card, antSide, yardSide, f1, prog, eio, lerp } from './lib.js';
// 66.8–70.93 Final macro: the ant walks on the scent dots; the information is right under its feet ("Boden", "Füßen") — dots glow.
export default function renderShot(t) {
  const x = lerp(240, 760, prog(t, 66.8, 70.93));
  const glow = eio(prog(t, 68.66, 69.6));
  let dots = ''; for (let i = 0; i < 16; i++) { const dx = i * 72 + 10, near = Math.abs(dx - x) < 150; dots += `<ellipse cx="${dx}" cy="1156" rx="${f1(22 + (near ? 10 * glow : 0))}" ry="10" fill="${K.trail}" opacity="${f1(.7 + .3 * glow)}"/>`; }
  return `${yardSide(1150)}${glow > 0 ? `<ellipse cx="${f1(x)}" cy="1156" rx="${f1(220 * glow)}" ry="${f1(60 * glow)}" fill="${K.trailL}" opacity=".45"/>` : ''}${dots}
    ${antSide(x, 1150, 4, t * 12, {})}
    ${card(540, 420, 'INFORMATION', 80, prog(t, 66.98, 67.2), { col: K.trail })}${card(540, 560, 'AM BODEN', 64, prog(t, 68.66, 68.9))}`;
}
