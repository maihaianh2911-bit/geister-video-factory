// v98 shared pieces: phones (gradient screens), the yellow question bubble, crossed-out "about me" bubble,
// warm growing bubbles of the people who open up, the video-call phone with Papa.
import { K, f1, op, cl, lerp, prog, eio, pop, T, textW, head, pool } from './lib.js';
const INK = K.ink;
export function gphone(x, y, s = 1, rot = 0, o = {}) {
  const lit = o.lit === undefined ? 1 : o.lit, id = o.id || 'ph';
  let g = `<defs><linearGradient id="v98${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd4ff"/><stop offset="1" stop-color="#2f6fd6"/></linearGradient></defs>`;
  g += `<rect x="-62" y="-118" width="124" height="236" rx="20" fill="${INK}"/><rect x="-52" y="-102" width="104" height="204" rx="10" fill="#1e2a40"/>`;
  if (lit > 0) {
    g += `<rect x="-52" y="-102" width="104" height="204" rx="10" fill="url(#v98${id}s)" opacity="${op(lit)}"/>`;
    const sc = (o.scroll || 0) % 60;
    g += `<g opacity="${op(lit)}"><rect x="-42" y="-92" width="84" height="40" rx="6" fill="#fff" opacity=".85"/>`;
    for (let i = 0; i < 4; i++) { const yy = -40 + i * 40 - sc; if (yy > -50 && yy < 90) g += `<rect x="-42" y="${f1(yy)}" width="84" height="12" rx="5" fill="#fff" opacity=".75"/><rect x="-42" y="${f1(yy + 18)}" width="56" height="10" rx="5" fill="#fff" opacity=".5"/>`; }
    g += `</g>`;
  }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
export function phoneDown(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><rect x="-80" y="-22" width="160" height="34" rx="12" fill="#2e3440" stroke="${INK}" stroke-width="5"/><rect x="-80" y="-22" width="160" height="10" rx="5" fill="#4a5262"/><rect x="40" y="-30" width="28" height="10" rx="4" fill="#3a404c" stroke="${INK}" stroke-width="3"/></g>`;
}
export const screenGlow = (x, y, r, a = .5) => pool(x, y, r, r * 1.1, '#6fc3ff', a);
export function holdPhone(x, y, rot = 0, o = {}) {
  return gphone(x, y, o.s || .9, rot, o) + `<circle cx="${f1(x + (o.hx || 0))}" cy="${f1(y + (o.hy === undefined ? 70 : o.hy))}" r="24" fill="${INK}"/>`;
}
// yellow question bubble with a big "?" badge. lines: text lines (may be empty → only "?")
export function qBubble(x, y, lines, tx, ty, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const L = lines || [], size = o.size || 48, lh = size * 1.2;
  const w = L.length ? Math.max(...L.map(l => textW(l, size))) + 100 : 150, h = L.length ? L.length * lh + 60 : 150;
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h - 4 : by + 4;
  let s = `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 56))}" fill="${K.yellow}" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M ${f1(ex - 30)} ${f1(ey)} L ${f1(tx)} ${f1(ty)} L ${f1(ex + 30)} ${f1(ey)} Z" fill="${K.yellow}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M ${f1(ex - 26)} ${f1(ey)} L ${f1(ex + 26)} ${f1(ey)}" stroke="${K.yellow}" stroke-width="10"/>`;
  if (L.length) L.forEach((l, i) => { s += T(x, by + 30 + size * .88 + i * lh, l, size, { w: 800, fill: K.txt }); });
  else s += T(x, y + 36, '?', 110, { fill: K.txt });
  // badge
  s += `<circle cx="${f1(bx + w - 10)}" cy="${f1(by + 6)}" r="34" fill="#fff" stroke="${INK}" stroke-width="5"/>` + T(bx + w - 10, by + 24, '?', 52, { fill: '#e0a400' });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(cl(p * 2))}">${s}</g>`;
}
// white speech bubble that gets crossed out in red (strike 0..1) and fades (a)
export function selfBubble(x, y, lines, tx, ty, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const L = lines, size = o.size || 44, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 80, h = L.length * lh + 50;
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h - 4 : by + 4;
  let s = `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 46))}" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M ${f1(ex - 26)} ${f1(ey)} L ${f1(tx)} ${f1(ty)} L ${f1(ex + 26)} ${f1(ey)} Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M ${f1(ex - 22)} ${f1(ey)} L ${f1(ex + 22)} ${f1(ey)}" stroke="#fff" stroke-width="10"/>`;
  L.forEach((l, i) => { s += T(x, by + 24 + size * .88 + i * lh, l, size, { w: 800, fill: K.txt }); });
  const st = cl(o.strike || 0);
  if (st > 0) { const x0 = bx + 20, x1 = bx + 20 + (w - 40) * st; s += `<path d="M ${f1(x0)} ${f1(by + h - 20)} L ${f1(x1)} ${f1(by + h - 20 - (h - 40) * st)}" stroke="#d9493f" stroke-width="16" stroke-linecap="round"/><path d="M ${f1(x0)} ${f1(by + 20)} L ${f1(x1)} ${f1(by + 20 + (h - 40) * st)}" stroke="#d9493f" stroke-width="16" stroke-linecap="round"/>`; }
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(cl(p * 2) * (o.a === undefined ? 1 : o.a))}">${s}</g>`;
}
// warm bubble that grows (g 0..1 scales and warms) with inner picture content (drawn in bubble-local coords, centred)
export function warmBubble(x, y, w, h, tx, ty, inner, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const g = cl(o.grow === undefined ? 1 : o.grow), id = o.id || 'wb';
  const sc = (.7 + .3 * g) * Math.max(.01, p);
  let s = pool(0, 0, w * .75, h * .8, '#ffc46b', .25 + .4 * g);
  s += `<defs><clipPath id="v98${id}"><rect x="${-w / 2 + 10}" y="${-h / 2 + 10}" width="${w - 20}" height="${h - 20}" rx="40"/></clipPath></defs>`;
  const ex = cl(tx - x, -w / 2 + 60, w / 2 - 60), ey = ty > y ? h / 2 - 4 : -h / 2 + 4;
  s += `<path d="M ${f1(ex - 30)} ${f1(ey)} L ${f1((tx - x) / sc)} ${f1((ty - y) / sc)} L ${f1(ex + 30)} ${f1(ey)} Z" fill="#fff4dc" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  s += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="50" fill="#fff4dc" stroke="${INK}" stroke-width="6"/><path d="M ${f1(ex - 26)} ${f1(ey)} L ${f1(ex + 26)} ${f1(ey)}" stroke="#fff4dc" stroke-width="10"/>`;
  s += `<g clip-path="url(#v98${id})">${inner}</g>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 1000) / 1000})" opacity="${op(cl(p * 2))}">${s}</g>`;
}
// bubble picture: mountains at sunrise (bubble-local, ~ 360x220)
export function mountains(t, w = 360, h = 220) {
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#ffd9a0"/><circle cx="${w * .22}" cy="${-h * .12}" r="${h * .16}" fill="#fff3b0"/><path d="M ${-w / 2} ${h / 2} L ${-w * .2} ${-h * .2} L ${w * .02} ${h * .14} L ${w * .2} ${-h * .32} L ${w / 2} ${h / 2} Z" fill="#7b8fb0"/><path d="M ${-w * .26} ${-h * .1} L ${-w * .2} ${-h * .2} L ${-w * .14} ${-h * .1} Z M ${w * .14} ${-h * .22} L ${w * .2} ${-h * .32} L ${w * .26} ${-h * .22} Z" fill="#fff"/><path d="M ${-w / 2} ${h / 2} Q 0 ${h * .2} ${w / 2} ${h / 2} Z" fill="#6aa565"/>`;
}
// bubble picture: sepia old photo of young Papa with a motorbike
export function oldPhoto(t, w = 380, h = 260) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#d8b98a"/><rect x="${-w / 2 + 16}" y="${-h / 2 + 16}" width="${w - 32}" height="${h - 32}" fill="#c9a06a"/>`;
  s += `<rect x="${-w / 2 + 16}" y="${h * .12}" width="${w - 32}" height="${h * .38 - 16}" fill="#a77d4e"/>`;
  s += `<g transform="translate(${-w * .18} ${h * .2}) scale(.34)">${''}</g>`;
  // young papa (head + body), no glasses
  s += `<circle cx="${-w * .2}" cy="${-h * .1}" r="${h * .15}" fill="#4a3424"/><path d="M ${-w * .32} ${h * .3} C ${-w * .32} ${h * .02} ${-w * .08} ${h * .02} ${-w * .08} ${h * .3} Z" fill="#7a5a3a"/>`;
  // motorbike
  s += `<g fill="none" stroke="#4a3424" stroke-width="9"><circle cx="${w * .06}" cy="${h * .28}" r="${h * .12}"/><circle cx="${w * .32}" cy="${h * .28}" r="${h * .12}"/><path d="M ${w * .06} ${h * .28} L ${w * .16} ${h * .1} L ${w * .32} ${h * .28} M ${w * .16} ${h * .1} L ${w * .26} ${h * .08} L ${w * .3} ${-h * .02}"/></g>`;
  s += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#5a3a1a" opacity=".12"/>`;
  return s;
}
// large phone in a video call showing Papa in his living room. (x,y) centre, s scale (1 → 300x520)
export function callPhone(t, x, y, s, o = {}) {
  const id = o.id || 'cp';
  let g = `<defs><clipPath id="v98${id}"><rect x="-136" y="-244" width="272" height="488" rx="18"/></clipPath></defs>`;
  g += `<rect x="-150" y="-260" width="300" height="520" rx="34" fill="${INK}"/>`;
  let scr = `<rect x="-140" y="-250" width="280" height="500" fill="#a8744a"/><rect x="-140" y="-250" width="280" height="260" fill="#d9b48a"/><rect x="40" y="-210" width="80" height="100" fill="#e8dcc8"/><rect x="48" y="-202" width="64" height="84" fill="#8fb3a8"/><rect x="-130" y="-120" width="90" height="130" fill="#7a5a44"/>${[-110, -80].map(y => `<rect x="-126" y="${y}" width="82" height="8" fill="#5a3f2e"/>`).join('')}`;
  scr += pool(60, -160, 160, 160, '#ffb35a', .4);
  scr += `<path d="M -110 250 C -110 120 110 120 110 250 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="4"/>`;
  scr += head('papa', 0, 20, .62, { t, seed: 9, look: o.look, brows: o.brows, mouth: o.mouth || 'flat', eyes: o.eyes, headTilt: o.tilt || 0 });
  g += `<g clip-path="url(#v98${id})">${scr}</g>`;
  // own small preview + call bar
  g += `<rect x="58" y="120" width="70" height="104" rx="10" fill="#2fa59a" stroke="#fff" stroke-width="3"/><circle cx="93" cy="160" r="22" fill="${INK}"/>`;
  g += `<rect x="-120" y="-238" width="140" height="34" rx="17" fill="#000" opacity=".45"/>` + T(-50, -213, o.time || '00:12', 22, { fill: '#fff', w: 700 });
  if (o.ring) { const r = (t * 2) % 1; g += `<circle cx="0" cy="0" r="${f1(200 + r * 120)}" fill="none" stroke="#7fd4ff" stroke-width="8" opacity="${op(1 - r)}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
