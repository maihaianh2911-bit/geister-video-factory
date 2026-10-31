// 2.2–4.48: the night is over — the sky turns from night to morning, the clock runs on to almost seven; you look out, still in bed ("zur Arbeit" 3.64)
import { K, BG, bust, windowSky, clock, label, mix, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 2.3, 4.1)), h = lerp(3.4, 6.97, eio(prog(t, 2.2, 4.2))), hh = Math.floor(h), mm = (h - hh) * 60;
  const wall = mix('#2E4068', '#EAF6F4', p);
  const du = bust('du', 780, 1200, 1.0, { look: -1, lookY: -.3, tired: 1, lid: lerp(.45, .3, p), mouth: 'flat', brow: lerp(0, .4, p) });
  const blanket = `<path d="M 480 1370 Q 780 1340 1140 1360 L 1140 1980 L 480 1980 Z" fill="${K.teal}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${BG(wall)}${windowSky(90, 470, 500, 560, p)}${clock(830, 640, 150, hh, mm)}<rect x="560" y="1080" width="420" height="320" rx="50" fill="#E8EEF6" stroke="${K.ink}" stroke-width="5"/>${du}${blanket}
    <rect x="-60" y="1370" width="540" height="620" fill="${mix('#24365A', '#C9DCD8', p)}" stroke="${K.ink}" stroke-width="5"/>${label(540, 250, 'ZUR ARBEIT?', prog(t, 3.64, 3.9), K.ink, 64)}`;
}
