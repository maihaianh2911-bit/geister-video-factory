// 47.4–50.1: at noon the outage reaches deliveries ("Mittags" 47.4, "Lieferungen" 49.04) — midday sun over a warehouse, a delivery van waits at the closed gate
import { K, DEFS, BG, sky, label, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const vx = lerp(-200, 520, eio(prog(t, 47.5, 48.9)));
  const wh = `<path d="M 480 700 L 780 560 L 1080 700 V 1300 H 480 Z" fill="${K.wall2}" stroke="${K.ink}" stroke-width="4"/>${[0, 1, 2, 3, 4].map(i => `<path d="M 560 ${980 + i * 60} H 1000" stroke="${K.ink}" stroke-width="6"/>`).join('')}<rect x="560" y="960" width="440" height="340" fill="none" stroke="${K.ink}" stroke-width="6"/>`;
  const van = `<g transform="translate(${f1(vx)} 1300)"><rect x="-200" y="-220" width="300" height="200" rx="14" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M 100 -160 H 170 L 220 -100 V -20 H 100 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M 115 -150 H 165 L 200 -105 H 115 Z" fill="${K.data}" opacity=".7"/><circle cx="-130" cy="-20" r="40" fill="#0A0F22"/><circle cx="140" cy="-20" r="40" fill="#0A0F22"/></g>`;
  return `${DEFS}${BG('#2A4A8A')}${sky(.5)}${cam(`${wh}<rect x="-60" y="1300" width="1200" height="700" fill="${K.floor}"/>${van}`, 1, 540, 1000)}`;
}
