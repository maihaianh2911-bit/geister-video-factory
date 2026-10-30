// 61.04–63.1: you rub your hand over a patch of skin ("reibst" 61.04, "Hautstelle" 62.38) — close on the forearm under running water, the hand rubs back and forth
import { K, OL, f1, BG, cam, prog, eio, hash } from './lib.js';
export function forearm(t, o = {}) {
  const rub = Math.sin(t * 12) * 60 * (o.rub ?? 1);
  let drops = '';
  for (let i = 0; i < 16; i++) { const ph = (t * 1.5 + hash(i)) % 1; drops += `<path d="M ${f1(160 + hash(i * 3) * 760)} ${f1(-40 + ph * 760)} v 30" stroke="${K.water}" stroke-width="8" stroke-linecap="round" opacity="${f1(1 - ph * .3)}"/>`; }
  const arm = `<path d="M -60 900 L 1140 760" stroke="${K.ink}" stroke-width="250" stroke-linecap="round"/><path d="M -60 900 L 1140 760" stroke="${K.skin}" stroke-width="236" stroke-linecap="round"/>`;
  const hand = `<g transform="translate(${f1(520 + rub)} 760) rotate(-8)"><path d="M -120 -40 Q -130 -110 -40 -110 H 120 Q 170 -110 170 -60 Q 170 -20 120 -20 H -60" fill="${K.skin}" ${OL(8)}/>${[0, 1, 2].map(i => `<path d="M ${10 + i * 40} -110 V -60" ${OL(5)}/>`).join('')}<path d="M -130 -60 L -360 -260" stroke="${K.ink}" stroke-width="150" stroke-linecap="round"/><path d="M -130 -60 L -360 -260" stroke="${K.skin}" stroke-width="136" stroke-linecap="round"/></g>`;
  return `${BG(K.tile)}${drops}${arm}${o.under || ''}${hand}`;
}
export default function renderShot(t) {
  const r = eio(prog(t, 61.04, 61.4));
  return cam(forearm(t, { rub: r, under: `<ellipse cx="560" cy="820" rx="200" ry="70" fill="#B98E6E" opacity=".55"/>` }), 1, 540, 840);
}
