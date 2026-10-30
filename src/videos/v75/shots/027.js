// 75.8–78.34: the day without internet can be over ("Tag ohne Internet" 76.0–76.54, "vorbei" 77.18) — over the street the sun sets and the moon rises, houses still lit
import { K, DEFS, BG, sky, stars, glow, wifi, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 75.8, 77.4)), n = eio(prog(t, 76.8, 77.6));
  const houses = [0, 1, 2].map(i => { const x = 200 + i * 340, h = 420 + (i % 2) * 120, y = 1300 - h;
    return `${glow(x, y + 180, 240, .5, 'iWarm')}<path d="M ${x - 140} ${y} L ${x} ${y - 120} L ${x + 140} ${y} V 1300 H ${x - 140} Z" fill="${K.wall2}" stroke="${K.ink}" stroke-width="4"/>${[0, 1].map(r => [0, 1].map(c => `<rect x="${x - 80 + c * 100}" y="${y + 80 + r * 140}" width="70" height="90" fill="${K.sunL}" stroke="${K.ink}" stroke-width="3"/>`).join('')).join('')}${wifi(x, y - 190, .55, 1)}`; }).join('');
  const sun = `<g opacity="${f1(1 - n)}">${sky(lerp(.75, 1.05, p))}</g>`, moon = `<circle cx="${f1(lerp(80, 220, n))}" cy="${f1(lerp(420, 280, n))}" r="44" fill="${K.star}" opacity="${f1(n)}"/>`;
  return `${DEFS}${BG(`#${n > .5 ? '0B1026' : '2A3C78'}`)}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#iSky)" opacity="${f1(n)}"/><g opacity="${f1(n)}">${stars(30, 3)}</g>${sun}${moon}${cam(`${houses}<rect x="-60" y="1300" width="1200" height="700" fill="${K.floor}"/>`, 1, 540, 1000)}`;
}
