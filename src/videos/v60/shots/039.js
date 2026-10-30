// Top-down: the four sit shoulder to shoulder in a tight cluster; wind streaks rush in and hit their turned backs on "Wind".
import { K, DEFS60, topFig, FG, prog, eio, lerp, hash } from './lib.js';

export default function renderShot(t) {
  const close = eio(prog(t, 60.8, 61.5));
  const d = lerp(220, 125, close);
  let wind = '';
  for (let i = 0; i < 14; i++) {
    const ph = ((t * .9 + hash(i)) % 1), y = 520 + hash(i * 3) * 700;
    const x = lerp(-200, 340, ph);
    wind += `<path d="M ${x.toFixed(0)} ${y.toFixed(0)} q 60 -16 120 0 t 120 0" stroke="#9DB8C8" stroke-width="8" fill="none" stroke-linecap="round" opacity="${(.7 * Math.sin(ph * Math.PI)).toFixed(2)}"/>`;
  }
  const hitW = t > 62.32 ? Math.max(0, 1 - (t - 62.32) * 2) : 0;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#1C2A22"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle cx="${(hash(i + 3) * 1080).toFixed(0)}" cy="${(hash(i * 7) * 1400).toFixed(0)}" r="${(30 + 30 * hash(i)).toFixed(0)}" fill="#24382C"/>`).join('')}
  <ellipse cx="560" cy="860" rx="300" ry="280" fill="url(#fAmb)" opacity=".55"/>
  <rect x="${560 - d - 120}" y="${860 - d - 100}" width="${2 * d + 240}" height="${2 * d + 200}" rx="60" fill="#3C6DB0" opacity=".5"/>
  ${topFig('red', 560 - d * .6, 860 - d, 1.45, 90)}${topFig('green', 560 - d * .6, 860 + d, 1.45, 90)}${topFig('yellow', 560 + d * .6, 860 - d, 1.45, 90)}${topFig('blue', 560 + d * .6, 860 + d, 1.45, 90)}
  ${wind}
  <ellipse cx="300" cy="860" rx="${(220 + 200 * (1 - hitW)).toFixed(0)}" ry="${(300 + 200 * (1 - hitW)).toFixed(0)}" fill="url(#fCold)" opacity="${(hitW * .8).toFixed(2)}"/>
  ${FG(1420)}`;
}
