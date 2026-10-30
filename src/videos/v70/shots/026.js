// 68.66–72.78: why it fails — water pressure pushes the door shut ("Wasserdruck"), it gets dark ("Dunkelheit"), and you must hold your breath ("Luft anzuhalten")
import { K, DEFS, BG, carSide, headOf, label, light, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const pr = eout(prog(t, 68.7, 69.1)), dk = eio(prog(t, 69.6, 70.2)), br = eout(prog(t, 71.5, 71.8));
  const s = 1.05, cx = 560, cy = 1480;
  const pulse = 1 + .06 * Math.sin(t * 8);
  // arrows pushing on the driver door from outside (car coords ~(60,-140))
  const arrows = [-1, 0, 1].map(k => { const ax = cx + 60 * s + k * 120, ay = cy - 130 * s - 360 * pr * pulse;
    return `<path d="M ${f1(ax)} ${f1(ay - 150)} L ${f1(ax)} ${f1(ay)} M ${f1(ax - 30)} ${f1(ay - 34)} L ${f1(ax)} ${f1(ay)} L ${f1(ax + 30)} ${f1(ay - 34)}" stroke="${K.foam}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="${f1(pr)}"/>`; }).join('')
    + [-1, 1].map(k => { const ax = cx + 60 * s + k * 330, ay = cy - 160 * s; return `<path d="M ${f1(ax + k * 130)} ${f1(ay)} L ${f1(ax)} ${f1(ay)} M ${f1(ax + k * 34)} ${f1(ay - 30)} L ${f1(ax)} ${f1(ay)} L ${f1(ax + k * 34)} ${f1(ay + 30)}" stroke="${K.foam}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="${f1(pr)}"/>`; }).join('');
  const meter = br <= 0 ? '' : `<g opacity="${f1(br)}"><circle cx="830" cy="560" r="150" fill="#0E1418" stroke="${K.amber}" stroke-width="8"/>${headOf('you', 830, 560, 1.4, { look: 0, brow: 1, mouth: 'puff', squeeze: true })}
    <rect x="700" y="760" width="260" height="30" rx="15" fill="#0E1418" stroke="${K.mono}" stroke-width="4"/><rect x="704" y="764" width="${f1(252 * (1 - .8 * prog(t, 71.7, 72.78)))}" height="22" rx="11" fill="${K.amber}"/></g>`;
  const sc = `${BG('#0A1A20')}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#eWater)"/>
    ${carSide(t, cx, cy, s, { tilt: 4, lights: 0, inner: .35 * (1 - dk), id: 's26c', only: ['you'], waterIn: 1, faces: { you: { look: .3, brow: 1, mouth: 'puff' } } })}
    ${arrows}<rect x="-60" y="-60" width="1200" height="2040" fill="#020406" opacity="${f1(.62 * dk)}"/>${light(cx, cy - 300, 260, .5 * dk)}${meter}`;
  return `${DEFS}${sc}${label(260, 300, 'DRUCK', pr, K.foam, 56)}${label(260, 400, 'DUNKEL', eout(prog(t, 69.6, 69.9)), K.mono, 56)}${label(830, 880, 'LUFT', br, K.amber, 56)}`;
}
