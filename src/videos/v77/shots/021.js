import { K, card, ground, bread, breadGhost, nestTop, trail, antOnRoute, f1, prog, eio, lerp } from './lib.js';
// 45.0–48.52 The scent trail is still there although the bread is gone: label DUFTSPUR; the dashed bread gets a red cross on "verschwunden".
export default function renderShot(t) {
  const x = eio(prog(t, 47.28, 47.6));
  let ants = ''; for (let i = 0; i < 4; i++) ants += antOnRoute(((t - 45) * .22 + i * .25) % 1 * .9, t, false, { s: 1.6, k: i });
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, 1.5)}${breadGhost(790, 470, 1)}${ants}
    ${x > 0 ? `<path d="M 690 370 L ${f1(lerp(690, 890, x))} ${f1(lerp(370, 570, x))} M 890 370 L ${f1(lerp(890, 690, x))} ${f1(lerp(370, 570, x))}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>` : ''}
    ${card(250, 760, 'DUFTSPUR', 62, prog(t, 45.22, 45.45), { col: K.trail })}${card(790, 720, 'BROT', 56, prog(t, 46.98, 47.2))}`;
}
