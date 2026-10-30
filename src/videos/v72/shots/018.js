// 46.46–49.1: heat can kill the mould ("abtöten" 47.54) — cutaway of the toaster: coils glow, the threads in the slice fade away
import { K, DEFS, BG, slice, hyphae, toxins, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const h = eio(prog(t, 46.5, 47.2)), k = eio(prog(t, 47.3, 48.3));
  const coils = [0, 1].map(i => `<path d="M ${300 + i * 480} 420 ${[...Array(10)].map((_, j) => `L ${300 + i * 480 + (j % 2 ? 40 : -40)} ${470 + j * 80}`).join(' ')}" fill="none" stroke="${h > .2 ? '#FF7A3C' : K.steelD}" stroke-width="12" stroke-linejoin="round"/>`).join('');
  const inner = `<g opacity="${f1(1 - k)}">${hyphae(-60, 40, 1, 200, 220, 2)}</g>${toxins(-150, -160, 300, 300, 14, 1, 7, t)}`;
  const sc = `${BG(K.steelD)}<rect x="160" y="300" width="760" height="1100" rx="80" fill="#2A3640" stroke="${K.ink}" stroke-width="6"/><circle cx="540" cy="860" r="560" fill="url(#kHeat)" opacity="${f1(h)}"/>${coils}${slice(540, 880, 2.2, { id: 's18', spot: 1 - k * .3, at: [-60, 40], toast: .3 * h, inner })}`;
  return `${DEFS}${cam(sc, 1.0, 540, 880)}`;
}
