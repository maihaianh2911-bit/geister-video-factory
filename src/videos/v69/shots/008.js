// 20.7–23.66: lifts normally have ventilation openings — cabin cutaway: slots at the top and bottom, air arrows stream in and out ("Lüftungsöffnungen")
import { K, DEFS, BG, headOf, label, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const v = eout(prog(t, 21.6, 22.2));
  let arr = '';
  for (let i = 0; i < 4; i++) { const u = (t * .7 + i / 4) % 1; if (v <= 0) break;
    arr += `<path d="M ${f1(lerp(120, 300, u))} ${1290} q 40 -20 80 0" fill="none" stroke="#8FD0F0" stroke-width="8" stroke-linecap="round" opacity="${f1(v * Math.sin(u * Math.PI))}"/>`;
    arr += `<path d="M ${f1(lerp(780, 960, u))} ${420} q 40 -20 80 0" fill="none" stroke="#8FD0F0" stroke-width="8" stroke-linecap="round" opacity="${f1(v * Math.sin(u * Math.PI))}"/>`;
    arr += `<path d="M ${f1(lerp(320, 760, u))} ${f1(lerp(1200, 520, u))} l 0 0" stroke="#8FD0F0" stroke-width="14" stroke-linecap="round" opacity="${f1(v * .7 * Math.sin(u * Math.PI))}"/>`; }
  const slots = y => [...Array(7)].map((_, i) => `<rect x="${330 + i * 64}" y="${y}" width="40" height="18" rx="6" fill="#0A0D10" stroke="${eout(prog(t, 21.9, 22.3)) > 0 ? '#8FD0F0' : K.ink}" stroke-width="4"/>`).join('');
  return `${DEFS}${BG('#0E1316')}<rect x="260" y="380" width="560" height="960" rx="12" fill="${K.steelL}" stroke="${K.ink}" stroke-width="6"/><rect x="290" y="440" width="500" height="840" fill="#1A2026"/>
    ${light(540, 860, 360, .9)}${headOf('you', 380, 900, .9, { look: .3 })}${headOf('wom', 500, 890, .9)}${headOf('kid', 600, 940, .9, { mouth: 'flat' })}${headOf('man', 720, 885, .9, { look: -.3 })}
    ${slots(400)}${slots(1300)}${arr}${label(540, 260, 'LÜFTUNG', eout(prog(t, 22.1, 22.4)), '#8FD0F0', 64)}`;
}
