// 67.48–71.50: skin close-up with a short stitched line — bacteria crawl to it and slip inside ("einzudringen" 70.08); a faint red inflammation glows.
import { K, DEFS, bact, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const skin = `<rect x="-80" y="-80" width="1240" height="2080" fill="${K.skin}"/><ellipse cx="540" cy="900" rx="700" ry="500" fill="#F7D4B4" opacity=".7"/>${[...Array(18)].map((_, i) => `<circle cx="${f1((i * 211) % 1080)}" cy="${f1((i * 157) % 1300 + 200)}" r="4" fill="${K.skinD}" opacity=".5"/>`).join('')}`;
  const inf = eout(prog(t, 69.4, 71.2));
  const wound = `<ellipse cx="540" cy="900" rx="${f1(260 + 60 * inf)}" ry="${f1(120 + 30 * inf)}" fill="url(#nRed)" opacity="${f1(inf)}"/><path d="M 360 900 Q 540 880 720 900" fill="none" stroke="#B5605A" stroke-width="10" stroke-linecap="round"/>
    ${[400, 470, 540, 610, 680].map(x => `<path d="M ${x - 6} 860 L ${x + 6} 935" stroke="${K.ink}" stroke-width="6" stroke-linecap="round"/>`).join('')}`;
  let bs = '';
  for (let i = 0; i < 6; i++) {
    const sx = [120, 260, 900, 980, 200, 820][i], sy = [300, 520, 380, 620, 1250, 1300][i];
    const tx = 420 + i * 45, ty = 895;
    const p = eio(prog(t, 67.6 + i * .15, 69.8 + i * .1)), dive = eio(prog(t, 69.6 + i * .08, 70.2 + i * .08));
    const x = lerp(sx, tx, p) + 10 * Math.sin(t * 6 + i) * (1 - p), y = lerp(sy, ty, p);
    const ang = Math.atan2(ty - sy, tx - sx) * 180 / Math.PI + 180;
    if (dive < 1) bs += `<g opacity="${f1(1 - dive)}">${bact(x, y, 1.1 * (1 - .7 * dive), ang, t + i)}</g>`;
  }
  return `${DEFS}${skin}${wound}${bs}`;
}
