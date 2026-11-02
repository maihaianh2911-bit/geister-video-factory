// L10a 53.9–56.82: week five (card WOCHE 5); rain runs down the bedroom window; du lies in bed under the blanket and looks out at the rain,
// then pulls the blanket up to his chin on "bleibst einmal im Bett" (55.86).
import { K, frame, cam, prog, eio, pop, label, head, f1, op, hash, pool } from './lib.js';
import { room } from './sets.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 7, mm: 0, sofa: false, light: 0 });
  // rain inside the window (window rect 600,300,380,520 in the room set)
  let r = '';
  for (let i = 0; i < 26; i++) { const x = 610 + hash(i) * 360, y = 300 + ((hash(i + 5) * 520 + t * 700) % 520); r += `<path d="M ${f1(x)} ${f1(y)} l -6 26" stroke="#dfe8f2" stroke-width="4" stroke-linecap="round" opacity=".7"/>`; }
  s += `<defs><clipPath id="v104win16"><rect x="600" y="300" width="380" height="520"/></clipPath></defs><g clip-path="url(#v104win16)">${r}</g>`;
  s += pool(790, 560, 300, 320, '#a9c8ff', .25);
  // bed (sharp foreground)
  const pull = eio(prog(t, 55.86, 56.5));
  s += `<rect x="-60" y="1060" width="80" height="560" rx="16" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/><rect x="-40" y="1320" width="1180" height="160" rx="24" fill="#e9ecf2" stroke="${INK}" stroke-width="6"/><rect x="20" y="1220" width="330" height="140" rx="50" fill="#f4f1ea" stroke="${INK}" stroke-width="6"/>`;
  s += head('du', 230, 1110, .95, { t, seed: 1, headTilt: -14, look: [16, -10], eyes: 'half', brows: 'sad', mouth: 'frown' });
  s += `<path d="M ${f1(150 - 20 * pull)} ${f1(1340 - 50 * pull)} C 400 ${f1(1270 - 50 * pull)} 800 1250 1140 1260 L 1140 1600 L 120 1600 Z" fill="#4f7fb5" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M 400 1300 C 560 1290 760 1300 1000 1320" stroke="#3e6694" stroke-width="8" fill="none"/>`;
  s = cam(s, 560, 980, 1.02 + .05 * eio(prog(t, 53.9, 56.82)));
  s += label('WOCHE 5', 540, 250, 104, { p: pop(t, 53.95, .45) });
  return frame(s);
}
