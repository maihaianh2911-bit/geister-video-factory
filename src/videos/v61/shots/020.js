// 35.0–37.6: the same with ice-cold drinks — an iced glass slides onto the counter, ice cubes clink
import { K, DEFS, BG, glass, prog, eout, eio, back, lerp, f1, hash } from './lib.js';
export default function renderShot(t) {
  const slide = eout(prog(t, 35.0, 35.55)), slide2 = eout(prog(t, 36.55, 37.0));
  const gx = lerp(980, 620, slide), g2 = lerp(-250, 290, slide2);
  const bob = Math.sin(Math.max(0, t - 35.55) * 9) * Math.exp(-Math.max(0, t - 35.55) * 3) * 6;
  const drops = [0, 1, 2, 3, 4].map(i => { const k = ((t * .35 + hash(i) ) % 1); return `<ellipse cx="${f1(gx - 80 + i * 40)}" cy="${f1(880 + k * 220)}" rx="7" ry="10" fill="#fff" opacity=".85"/>`; }).join('');
  const frost = [0, 1, 2].map(i => { const k = ((t * .5 + i / 3) % 1); return `<path d="M ${f1(gx - 40 + i * 40)} ${f1(700 - k * 160)} q 20 -30 0 -60" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${f1(.7 * (1 - k))}"/>`; }).join('');
  return `${DEFS}${BG(K.wall)}
    <rect x="-60" y="-60" width="1200" height="260" fill="${K.teal}" opacity=".35"/>
    <circle cx="840" cy="330" r="200" fill="url(#eSun)"/>
    <rect x="-60" y="1180" width="1200" height="40" fill="${K.counter}" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1220" width="1200" height="800" fill="${K.counterSh}"/>
    <ellipse cx="${f1(gx)}" cy="1186" rx="150" ry="16" fill="${K.ink}" opacity=".15"/>
    ${glass(g2, 1180 - 120 * 1.2, 1.2, { id: 'u2', level: .75, straw: false, ice: true })}
    ${glass(gx, 1180 - 120 * 1.7 + bob * .2, 1.7, { id: 'u', level: .82, straw: true, ice: true })}
    ${drops}${frost}`;
}
