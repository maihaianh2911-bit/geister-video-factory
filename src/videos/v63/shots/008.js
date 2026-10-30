// 14.8–16.74: close on the metal detector sweeping the forest floor — it pings (Metalldetektoren … Wald)
import { K, DEFS, grain, cam, prog, eout, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
export default function renderShot(t) {
  const sw = Math.sin((t - 14.8) * 3.2) * 260;
  const ping = t > 15.95 ? prog(t, 15.95, 16.7) : 0;
  const det = `<g transform="translate(${f1(540 + sw)} 1100)"><rect x="-10" y="-900" width="20" height="820" fill="#5E666A" stroke="${K.ink}" stroke-width="4" transform="rotate(${f1(-sw / 40)})"/>
    <ellipse cx="0" cy="0" rx="160" ry="56" fill="#3C4448" stroke="${K.ink}" stroke-width="6"/><ellipse cx="0" cy="0" rx="110" ry="34" fill="none" stroke="#7D8589" stroke-width="6"/></g>`;
  const rings = ping ? [0, 1, 2].map(i => { const k = (ping * 1.6 + i / 3) % 1; return `<ellipse cx="${f1(540 + sw)}" cy="1100" rx="${f1(160 + 300 * k)}" ry="${f1(56 + 100 * k)}" fill="none" stroke="${K.goldL}" stroke-width="8" opacity="${f1(1 - k)}"/>`; }).join('') : '';
  const leaves = [...Array(16)].map((_, i) => `<ellipse cx="${(i * 197) % 1080}" cy="${900 + (i * 131) % 700}" rx="30" ry="14" fill="${K.olive}" transform="rotate(${i * 37} ${(i * 197) % 1080} ${900 + (i * 131) % 700})"/>`).join('');
  return `${DEFS}${cam(soilBg(4) + leaves + rings + det, 1, 540, 900)}<rect x="-60" y="-60" width="1200" height="2040" fill="#0B1210" opacity=".35"/>${grain(t)}`;
}
