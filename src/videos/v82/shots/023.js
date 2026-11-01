// 78.36–83.6 your knowledge becomes worthless: the golden memory chart greys out with a "WERTLOS" stamp, then "GEDACHT" ≠ "JETZT" on "anders"
import { K, kid, glow, cloudPath, T, chip, fade, pop, prog, eio, eout, f1 } from './lib.js';
function mini(x, y, pts, col, label) {
  return `<g transform="translate(${x} ${y})"><rect x="-190" y="-150" width="380" height="300" rx="26" fill="#26345c" stroke="${K.ol}" stroke-width="6"/>${T(0, -96, label, 40, { fill: '#cfe0ff' })}<path d="M ${pts.map(([a, b]) => `${a} ${b}`).join(' L ')}" stroke="${col}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="${K.night}"/><rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const g = eio(prog(t, 79.66, 80.1));           // drain to grey
  const top = eio(prog(t, 80.6, 81.1));          // cloud shrinks up to make room
  const cy = 520 - 120 * top, sc = 1 - .35 * top;
  s += glow(540, cy, 300 * sc, K.gold, .5 * (1 - g));
  s += `<g transform="translate(540 ${f1(cy)}) scale(${f1(sc * 100) / 100}) translate(-540 -520)"><path d="${cloudPath(540, 520, 360, 220, 11)}" fill="${g > .5 ? '#b9b4c2' : K.goldL}" stroke="${K.ol}" stroke-width="7"/>
    <path d="M 340 600 L 420 560 L 480 580 L 560 480 L 640 500 L 740 400" stroke="${g > .5 ? '#7d7690' : K.green}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${T(540, 410, 'DEIN WISSEN', 44, { fill: g > .5 ? '#5b5570' : K.ol })}
    <g opacity="${f1(fade(t, 79.66, .15) * 100) / 100}" transform="translate(540 540) rotate(-10) scale(${f1(pop(t, 79.66, .3) * 100) / 100})"><rect x="-210" y="-60" width="420" height="120" rx="14" fill="none" stroke="${K.red}" stroke-width="10"/>${T(0, 26, 'WERTLOS', 76, { fill: K.red })}</g></g>`;
  const m = fade(t, 81.14, .35);
  if (m > 0) {
    s += `<g opacity="${f1(m * 100) / 100}">` + mini(290, 960, [[-150, 90], [-60, 40], [20, 60], [150, -60]], K.gold, 'GEDACHT') + mini(790, 960, [[-150, -40], [-60, 50], [20, -10], [150, 90]], '#7fe0d0', 'JETZT') + `</g>`;
    s += `<g opacity="${f1(fade(t, 82.04, .2) * 100) / 100}" transform="translate(540 960) scale(${f1(pop(t, 82.04) * 100) / 100})"><circle r="56" fill="${K.red}" stroke="${K.ol}" stroke-width="6"/>${T(0, 26, '≠', 80, { fill: '#fff' })}</g>`;
  }
  return s;
}
