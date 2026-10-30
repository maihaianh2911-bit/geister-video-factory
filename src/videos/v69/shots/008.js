// 20.7–23.66: lifts normally have ventilation openings — cabin cutaway: slots at the top and bottom, air arrows stream in and out ("Lüftungsöffnungen")
import { K, DEFS, BG, headOf, label, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const v = eout(prog(t, 21.6, 22.2));
  // air enters through the bottom slots, rises through the cabin and leaves through the top slots
  let arr = '';
  for (let i = 0; i < 6; i++) {
    const u = (t * .5 + i / 6) % 1; if (v <= 0) break;
    const x = 360 + (i % 3) * 180 + 30 * Math.sin(u * 6 + i), y = lerp(1380, 330, u), a = v * Math.sin(u * Math.PI);
    arr += `<path d="M ${f1(x - 26)} ${f1(y + 20)} L ${f1(x)} ${f1(y - 6)} L ${f1(x + 26)} ${f1(y + 20)}" fill="none" stroke="#8FD0F0" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(a)}"/>`;
  }
  const slots = y => [...Array(7)].map((_, i) => `<rect x="${330 + i * 64}" y="${y}" width="40" height="18" rx="6" fill="#0A0D10" stroke="${eout(prog(t, 21.9, 22.3)) > 0 ? '#8FD0F0' : K.ink}" stroke-width="4"/>`).join('');
  return `${DEFS}${BG('#0E1316')}<rect x="260" y="380" width="560" height="960" rx="12" fill="${K.steelL}" stroke="${K.ink}" stroke-width="6"/><rect x="290" y="440" width="500" height="840" fill="#1A2026"/>
    ${light(540, 860, 360, .9)}${headOf('you', 380, 900, .9, { look: .3 })}${headOf('wom', 500, 890, .9)}${headOf('kid', 600, 940, .9, { mouth: 'flat' })}${headOf('man', 720, 885, .9, { look: -.3 })}
    ${slots(400)}${slots(1300)}${arr}${label(540, 260, 'LÜFTUNG', eout(prog(t, 22.1, 22.4)), '#8FD0F0', 64)}`;
}
