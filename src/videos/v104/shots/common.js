// v104 shot helpers: du in the meadow (grass behind, du, grass in front), signpost, wall calendar, small heads grid.
import { K, f1, op, cl, prog, eio, pop, person, shadow, T, head } from './lib.js';
import { sky, grass, house } from './meadow.js';
const INK = K.ink;
// meadow with du standing in it at feet (x,y), scale s. o: mood, p, tall (front grass), du (person options), house, sunX
export function field(t, x, y, s, o = {}) {
  let g = sky(t, { mood: o.mood, sunX: o.sunX, sunY: o.sunY }) + grass(t, { mood: o.mood, p: o.p, to: y, tall: o.tallBack || 1 });
  if (o.house) g += `<g transform="translate(${o.house.dx || 0} 0)">${house(t, o.house)}</g>`;
  if (o.before) g += o.before;
  if (o.du !== false) g += shadow(x, y, 190 * s) + person('du', x, y, s, { t, seed: 1, ...(o.du || {}) });
  const fg = grass(t, { mood: o.mood, p: o.p, from: y + 1, noGround: true, tall: o.tall || 1 });
  g += o.frontClip ? `<defs><clipPath id="v104fc${Math.round(o.frontClip)}"><rect x="${o.frontClip}" y="0" width="2000" height="2100"/></clipPath></defs><g clip-path="url(#v104fc${Math.round(o.frontClip)})">${fg}</g>` : fg;
  return g;
}
export function signpost(x, y, s, txt, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><rect x="-14" y="-520" width="28" height="520" fill="#7a5a3a" stroke="${INK}" stroke-width="5"/><rect x="-170" y="-560" width="340" height="190" rx="14" fill="#c9a26b" stroke="${INK}" stroke-width="7"/><rect x="-150" y="-540" width="300" height="150" rx="8" fill="#e8d2a8"/>${T(0, -430, txt, 110, { fill: o.fill || K.txt })}${o.inner || ''}</g>`;
}
// wall calendar with N small day cells; o.title, o.cols, o.mark: {i: 'x'|'v'|'empty'}, o.p reveal count
export function calendar(x, y, w, title, n, o = {}) {
  const cols = o.cols || 7, cw = (w - 40) / cols, rows = Math.ceil(n / cols), h = 110 + rows * cw * .78 + 20;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${f1(h)}" rx="14" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/><rect x="${x}" y="${y}" width="${w}" height="80" rx="14" fill="${o.head || '#c25b4e'}" stroke="${INK}" stroke-width="6"/>` + T(x + w / 2, y + 56, title, 44, { fill: '#fff' });
  const shown = o.shown === undefined ? n : o.shown;
  for (let i = 0; i < n; i++) {
    const cx = x + 20 + (i % cols) * cw, cy = y + 100 + Math.floor(i / cols) * cw * .78;
    const m = (o.mark || {})[i];
    s += `<rect x="${f1(cx + 4)}" y="${f1(cy)}" width="${f1(cw - 8)}" height="${f1(cw * .78 - 8)}" rx="6" fill="${m === 'empty' ? '#f4f0e8' : '#eef0f2'}" stroke="#b9b2a4" stroke-width="3"/>`;
    if (i < shown && m !== 'empty') s += `<path d="M ${f1(cx + cw * .25)} ${f1(cy + cw * .38)} l ${f1(cw * .15)} ${f1(cw * .15)} l ${f1(cw * .3)} ${f1(-cw * .3)}" stroke="${K.green}" stroke-width="${f1(Math.max(4, cw * .09))}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return s;
}
export { sky, grass, house };
