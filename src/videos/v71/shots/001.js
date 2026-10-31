// 0–2.2: cover — you sit up in bed at night, wide awake and tired; the wall clock's hands sweep through the night. Headline.
import { K, BG, bust, windowSky, clock, TX, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const h = lerp(2.1, 3.4, prog(t, 0, 2.2)), hh = Math.floor(h), mm = (h - hh) * 60;
  const blink = Math.sin(Math.PI * prog(t, .55, .95));
  const yawn = Math.sin(Math.PI * prog(t, 1.25, 2.1));
  const du = bust('du', 560, 1160, 1.35, { look: .7, lookY: -.5, tired: 1, lid: .35 + .6 * blink, mouth: yawn > .05 ? 'yawn' : 'flat', yawn });
  const blanket = `<path d="M -60 1330 Q 300 1290 560 1320 Q 820 1350 1140 1300 L 1140 1980 L -60 1980 Z" fill="${K.teal}" stroke="${K.ink}" stroke-width="5"/><path d="M 80 1420 q 120 -30 240 0 M 640 1440 q 140 -30 280 0" fill="none" stroke="${K.tealD}" stroke-width="8" stroke-linecap="round"/>`;
  const glow = `<circle cx="230" cy="1150" r="330" fill="#FFE9A8" opacity=".16"/>`;
  const room = `${BG('#2E4068')}${glow}${windowSky(90, 560, 300, 300, 0)}${clock(820, 680, 120, hh, mm)}<rect x="300" y="1010" width="520" height="360" rx="60" fill="#E8EEF6" stroke="${K.ink}" stroke-width="5"/>${du}${blanket}`;
  return `${cam(room, lerp(1.0, 1.04, prog(t, 0, 2.2)), 560, 1000)}<rect x="110" y="170" width="860" height="270" rx="44" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>${TX('NACHT OHNE', 540, 290, 104, K.ink)}${TX('SCHLAF?', 540, 405, 112, K.red)}`;
}
