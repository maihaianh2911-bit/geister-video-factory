// Cover 0–1.6: the bronze disc glowing on dark forest soil, headline HIMMELSSCHEIBE VON NEBRA
import { K, DEFS, BG, disc, grain, cam, HL, prog, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const z = lerp(1.12, 1, eout(prog(t, 0, 1.6)));
  const soil = `${BG(K.soilD)}${[...Array(30)].map((_, i) => `<circle cx="${(i * 137) % 1100}" cy="${(i * 263) % 1900}" r="${20 + (i % 5) * 9}" fill="${K.soil}" opacity=".6"/>`).join('')}`;
  return `${DEFS}${cam(soil + disc(540, 860, 330, { id: 'a', glow: .6 + .2 * Math.sin(t * 4), damage: true }), z, 540, 860)}
    ${HL('HIMMELSSCHEIBE', 540, 330, 108, K.goldL, 16)}${HL('VON NEBRA', 540, 460, 108, K.paperL, 16)}${grain(t)}`;
}
