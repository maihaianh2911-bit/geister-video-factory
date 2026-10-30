// 59.8–61.92: your fridge keeps cooling ("Kühlschrank kühlt weiter" 59.96–60.94) — the door opens: light on, cold air flows out, green tick
import { K, DEFS, glow, tick, cam, prog, eio, lerp, f1 } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  const o = eio(prog(t, 59.9, 60.5));
  const air = o > 0 ? [0, 1, 2].map(i => `<path d="M ${640 + i * 30} ${800 + i * 140} q 60 -20 120 0 t 120 0" fill="none" stroke="${K.data}" stroke-width="8" stroke-linecap="round" opacity="${f1(o * (.5 + .4 * Math.sin(t * 4 + i)))}" stroke-dasharray="40 30" stroke-dashoffset="${f1(-t * 60)}"/>`).join('') : '';
  const fridge = `<rect x="300" y="420" width="380" height="900" rx="30" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="330" y="450" width="320" height="840" rx="16" fill="#DDEBFF"/>${glow(490, 700, 300, o, 'iGlow')}
    ${[0, 1, 2].map(i => `<rect x="330" y="${650 + i * 200}" width="320" height="10" fill="${K.greyL}"/>`).join('')}<rect x="380" y="590" width="90" height="60" rx="10" fill="${K.green}"/><rect x="500" y="800" width="100" height="50" rx="10" fill="${K.sun}"/>
    <g transform="translate(680 420) scale(${f1(lerp(1, -.35, o))} 1)"><rect x="-380" y="0" width="380" height="900" rx="30" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="-340" y="380" width="20" height="160" rx="10" fill="${K.grey}"/></g>`;
  return `${DEFS}${cam(`${room(1)}${fridge}${air}`, 1.05, 540, 950)}${tick(860, 400, 1.4, eio(prog(t, 60.5, 60.9)))}`;
}
