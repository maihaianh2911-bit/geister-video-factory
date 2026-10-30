// 44.54–48.24: the later analysis of the recordings ("Auswertung der Aufnahmen"): an archive monitor replays the crowd footage frame by frame; a hand steps the jog dial
import { K, DEFS, BG, card, grain, TX, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const on = eout(prog(t, 44.6, 45.0)), scrub = prog(t, 45.0, 48.2);
  const fr = Math.floor(scrub * 12);
  let dots = '';
  for (let i = 0; i < 60; i++) { const x = 240 + (i % 10) * 64 + 20 * Math.sin(fr * .5 + i), y = 470 + Math.floor(i / 10) * 60 + 10 * Math.cos(fr * .4 + i * .7); dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="${K.c4}" stroke="${K.ink}" stroke-width="2"/>`; }
  const mon = `<rect x="160" y="360" width="760" height="560" rx="30" fill="#4A4038" stroke="${K.ink}" stroke-width="7"/><rect x="200" y="400" width="680" height="440" fill="#CFC6AE"/>
    <g opacity="${f1(on)}">${dots}<rect x="200" y="800" width="680" height="40" fill="#3B2F2A" opacity=".6"/><rect x="210" y="812" width="${f1(660 * scrub)}" height="16" fill="${K.redL}"/>${TX(`00:${String(10 + fr).padStart(2, '0')}`, 840, 790, 30, K.ink, 'end')}</g>`;
  const dial = `<circle cx="540" cy="1110" r="90" fill="#4A4038" stroke="${K.ink}" stroke-width="6"/><path d="M 540 1110 L ${f1(540 + 70 * Math.cos(scrub * 9))} ${f1(1110 + 70 * Math.sin(scrub * 9))}" stroke="${K.paperL}" stroke-width="10" stroke-linecap="round"/>`;
  const hx = 540 + 70 * Math.cos(scrub * 9), hy = 1110 + 70 * Math.sin(scrub * 9);
  const handArm = `<path d="M 1100 1500 L ${f1(hx + 40)} ${f1(hy + 40)}" stroke="${K.ink}" stroke-width="96" stroke-linecap="round"/><path d="M 1100 1500 L ${f1(hx + 40)} ${f1(hy + 40)}" stroke="${K.brown}" stroke-width="84" stroke-linecap="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${DEFS}${BG(K.paperD)}${grain(11)}<rect x="60" y="1000" width="960" height="260" rx="20" fill="#6A5A48" stroke="${K.ink}" stroke-width="5"/>${mon}${dial}${handArm}${card(540, 250, 'AUFNAHMEN', on, 64)}`;
}
