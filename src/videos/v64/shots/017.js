// 34.2–36.2: panic — close on Tuffi's face in the swaying cabin: ears flare, eyes go wide on "Panik", she trembles
import { K, DEFS, tuffi, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const pan = eout(prog(t, 35.0, 35.4));
  const tr = t > 35.2 ? 7 * Math.sin(t * 60) * pan : 0;
  const sway = 6 * Math.sin(t * 2.6);
  const win = `<g transform="rotate(${f1(sway * .4)} 540 900)"><rect x="-60" y="-60" width="1200" height="2040" fill="${K.cream}"/>
    <rect x="80" y="230" width="420" height="520" rx="16" fill="url(#wSky)" stroke="${K.ink}" stroke-width="8"/>
    <rect x="96" y="560" width="388" height="174" fill="#7D8C80"/><path d="M 100 600 q 40 -10 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#A3B0A2" stroke-width="5"/>
    <path d="M 96 470 Q 240 420 484 480 L 484 560 L 96 560 Z" fill="#949A78"/><path d="M 290 230 V 750" stroke="${K.ink}" stroke-width="6"/></g>`;
  return `${DEFS}${win}<g transform="translate(${f1(tr)} 0)">${tuffi(-60, 1800, 3.3, { ear: lerp(.2, 1, pan), eye: pan > .4 ? 'wide' : 'n', tr: lerp(.1, .35, pan), mouth: pan > .5 ? .6 : 0 })}</g>${grain(t)}`;
}
