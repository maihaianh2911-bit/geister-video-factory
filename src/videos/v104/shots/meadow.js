// v104 meadow set: tall grass drawn as rows of pointed blades (no blur), a dirt path whose clearness p (0..1) grows over the weeks,
// sky moods (dawn, morning, rain, gold), distant trees/houses (one light blur group), the house wall with the open front door at the left.
import { K, f1, op, cl, lerp, hash, T, pool, blur, plant } from './lib.js';
const INK = K.ink;
const lg = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
export const MOOD = {
  dawn: { sky: ['#f4b98a', '#f9dcb0', '#cfe0e6'], sun: '#fff0c2', g: ['#6f9a4a', '#5d8a3e', '#7fae55', '#4f7a36'], ground: '#5a6e34', light: '#ffd9a0', far: '#8aa07a' },
  morning: { sky: ['#8fc6ea', '#bfe3f5', '#e8f3f0'], sun: '#fff6c8', g: ['#79a94e', '#68983f', '#8bbd5c', '#567f37'], ground: '#62793a', light: '#fff3b0', far: '#9bb08a' },
  rain: { sky: ['#6d7787', '#8b94a1', '#a4abb4'], sun: null, g: ['#557a48', '#4a6b3f', '#628a52', '#3e5c36'], ground: '#46583a', light: '#c9d3de', far: '#7d8a86' },
  gold: { sky: ['#f29a5c', '#f7c27a', '#fbe3a8'], sun: '#fff1b8', g: ['#8a9d45', '#77893a', '#a1b351', '#65762f'], ground: '#6e6a34', light: '#ffcf7a', far: '#b3a06a' },
};
const HOR = 760;
// path centre x and half-width at row y (perspective)
export const pathX = y => 560 + 60 * Math.sin((y - HOR) / 260) * (1 - (y - HOR) / 1400) + (y - HOR) * -.05;
export const pathW = (y, p) => p * lerp(14, 300, cl((y - HOR) / 1160));
export function sky(t, o = {}) {
  const M = MOOD[o.mood || 'morning'];
  let s = `<defs>${lg('v104sky' + (o.mood || 'm'), [[0, M.sky[0]], [.6, M.sky[1]], [1, M.sky[2]]])}</defs><rect x="-200" y="-200" width="1480" height="${HOR + 260}" fill="url(#v104sky${o.mood || 'm'})"/>`;
  if (M.sun) s += pool(o.sunX || 760, o.sunY || 600, 420, 420, M.sun, .55) + `<circle cx="${o.sunX || 760}" cy="${o.sunY || 600}" r="60" fill="${M.sun}"/>`;
  else s += `<g fill="#9aa2ad" opacity=".9">${[[200, 260, 160], [520, 220, 200], [880, 280, 170]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .45}"/>`).join('')}</g>`;
  // far layer: hills, trees, houses, church tower, fence (blurred)
  let f = `<path d="M -200 ${HOR} C 100 ${HOR - 120} 300 ${HOR - 60} 520 ${HOR - 110} C 760 ${HOR - 160} 960 ${HOR - 70} 1280 ${HOR - 120} L 1280 ${HOR + 40} L -200 ${HOR + 40} Z" fill="${M.far}"/>`;
  for (const [x, r] of [[60, 60], [150, 46], [330, 52], [860, 64], [960, 48], [1040, 56]]) f += `<rect x="${x - 6}" y="${HOR - 40 - r}" width="12" height="${r}" fill="#5a4a3a"/><circle cx="${x}" cy="${HOR - 50 - r}" r="${r}" fill="${M.g[3]}"/>`;
  f += `<g fill="#d9cbb0">${[[480, 60], [560, 50], [640, 70]].map(([x, h]) => `<rect x="${x}" y="${HOR - 20 - h}" width="60" height="${h}"/><path d="M ${x - 6} ${HOR - 20 - h} L ${x + 30} ${HOR - 50 - h} L ${x + 66} ${HOR - 20 - h} Z" fill="#b0583f"/>`).join('')}</g><rect x="720" y="${HOR - 170}" width="30" height="150" fill="#cfc3a8"/><path d="M 714 ${HOR - 170} L 735 ${HOR - 220} L 756 ${HOR - 170} Z" fill="#7a8090"/>`;
  f += `<g stroke="#8a6a4a" stroke-width="5">${Array.from({ length: 14 }, (_, i) => `<path d="M ${-100 + i * 100} ${HOR + 10} v -30"/>`).join('')}<path d="M -200 ${HOR - 10} H 1280"/></g>`;
  return s + blur(f);
}
// ground + dirt path + grass rows. o: p (path 0..1), mood, tall (blade height factor), from/to row y range, wind
export function grass(t, o = {}) {
  const M = MOOD[o.mood || 'morning'], p = cl(o.p || 0), tall = o.tall || 1;
  const y0 = o.from || HOR + 10, y1 = o.to || 1990;
  let s = '';
  if (!o.noGround) {
    s += `<rect x="-200" y="${HOR}" width="1480" height="1400" fill="${M.ground}"/>`;
    if (p > 0) { // dirt path polygon
      let L = '', R = '';
      for (let y = HOR; y <= 2000; y += 40) { L += `${f1(pathX(y) - pathW(y, p))},${y} `; R = `${f1(pathX(y) + pathW(y, p))},${y} ` + R; }
      s += `<polygon points="${L}${R}" fill="#a3825a" opacity="${op(.5 + .5 * p)}"/>`;
    }
  }
  let y = y0, row = 0;
  while (y < y1) {
    const k = cl((y - HOR + 40) / 1200, .03, 1.2);
    const H = (40 + 360 * k) * tall, step = 30 + 84 * k;
    const bw = 20 + 58 * k;
    const cx = pathX(y), hw = pathW(y, p);
    let d = '', d2 = '';
    for (let x = -120 - (row % 2) * bw * .5; x < 1200; x += bw) {
      const hh = hash(row * 131 + Math.round(x)), inP = hw > 0 ? cl(1 - (Math.abs(x + bw / 2 - cx) - hw) / (bw * 1.2)) : 0;
      const flat = inP * cl(p * 2.4);
      const h = H * (.65 + .5 * hh) * (1 - .92 * flat);
      if (h < 4) continue;
      const sway = Math.sin(t * (o.wind || 1.6) + x * .013 + row) * 10 * k;
      const R = Math.round, seg = `M${R(x)} ${R(y)}Q${R(x + bw * .3)} ${R(y - h * .6)} ${R(x + bw * .5 + sway)} ${R(y - h)}Q${R(x + bw * .7)} ${R(y - h * .6)} ${R(x + bw)} ${R(y)}Z`;
      if (hh > .5) d += seg; else d2 += seg;
    }
    const c1 = M.g[row % 2 ? 0 : 1], c2 = M.g[row % 2 ? 2 : 3];
    s += `<path d="${d}" fill="${c1}"/><path d="${d2}" fill="${c2}"/>`;
    y += step; row++;
  }
  return s;
}
// house wall with the front door (left side). o.open 0..1, o.light (warm from inside)
export function house(t, o = {}) {
  const open = cl(o.open === undefined ? 1 : o.open);
  let s = `<rect x="-200" y="200" width="${o.w || 420}" height="1500" fill="#d8c7a8" stroke="${INK}" stroke-width="6"/>`;
  s += `<g stroke="#c2b08e" stroke-width="5">${[400, 520, 640, 760, 880, 1000, 1120].map(y => `<path d="M -200 ${y} H ${(o.w || 420) - 200}"/>`).join('')}</g>`;
  s += `<rect x="0" y="560" width="190" height="640" fill="#6e4a34" stroke="${INK}" stroke-width="6"/><rect x="12" y="572" width="166" height="628" fill="#ffd98a"/>` + pool(95, 900, 120, 300, '#fff0c0', .6);
  const w = 166 * (1 - open * .82);
  s += `<path d="M 12 572 L ${f1(12 + w)} ${f1(572 - 20 * open)} L ${f1(12 + w)} ${f1(1200 + 20 * open)} L 12 1200 Z" fill="#3e6f8f" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="-30" y="1200" width="260" height="40" fill="#9a9590" stroke="${INK}" stroke-width="5"/>`; // doorstep
  s += `<rect x="-10" y="420" width="220" height="40" rx="6" fill="#7a5a48"/>` + plant(250, 1200, .7, '#c25b4e');
  s += `<g transform="translate(-60 720)"><rect x="-50" y="-60" width="100" height="120" fill="#bfe3f5" stroke="#fff" stroke-width="10"/></g>`;
  return s;
}
// big counter card in the corner: TAG n
export function dayCounter(txt, x, y, p, o = {}) {
  if (p <= 0) return '';
  const w = 290, h = 120;
  return `<g transform="translate(${x} ${y}) scale(${f1(Math.max(.01, p) * 1000) / 1000})" opacity="${op(cl(p * 2))}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="24" fill="${o.bg || '#fbf8ef'}" stroke="${INK}" stroke-width="7"/>${T(0, 22, txt, 62, { fill: o.fill || K.txt })}</g>`;
}
// rain streaks over everything
export function rain(t, a = 1) {
  let s = '';
  for (let i = 0; i < 70; i++) { const x = (hash(i) * 1300 - 100 + t * 60) % 1300 - 100, y = ((hash(i + 3) * 2000 + t * 1400) % 2100) - 100; s += `<path d="M ${f1(x)} ${f1(y)} l -14 46" stroke="#dfe8f2" stroke-width="4" stroke-linecap="round" opacity="${op(.5 * a)}"/>`; }
  return s;
}
