// 60.06–62.6: the example — the speedometer needle rises to fifty ("fünfzig" 60.45)
import { K, BG, speedo, label, TX, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const v = 50 * eio(prog(t, 60.08, 60.45)) + (t > 60.45 ? Math.sin(t * 6) * .6 : 0);
  return `${BG('#2B3A4F')}${speedo(540, 860, 330, v)}${TX(String(Math.round(50 * eio(prog(t, 60.08, 60.45)))), 540, 1080, 120, K.white)}${label(540, 330, '50 KM/H', prog(t, 60.45, 60.7), K.ink, 70)}`;
}
