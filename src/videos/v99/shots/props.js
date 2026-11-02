// v99 props: big chat phone, notebook (SORGEN-TAGEBUCH), stamp, folder, bar chart, flip calendar, hand-drawn X / check marks.
import { K, f1, op, cl, lerp, prog, eio, pop, T, textW, head, pool, check } from './lib.js';
const INK = K.ink;

// big phone with a chat (centre x,y; s=1 → 340×620). o: name, who (avatar head id), msgs [{txt, me, p, time}], clock 'HH:MM', status, typing p, buzz 0..1, id
export function chatPhone(t, x, y, s, o = {}) {
  const id = o.id || 'cp';
  const buzz = o.buzz ? Math.sin(t * 60) * 7 * o.buzz : 0;
  let g = `<defs><clipPath id="v99${id}"><rect x="-150" y="-280" width="300" height="560" rx="22"/></clipPath><linearGradient id="v99${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset="1" stop-color="#dfe6ee"/></linearGradient></defs>`;
  g += `<rect x="-170" y="-310" width="340" height="620" rx="44" fill="${INK}"/><rect x="-162" y="-302" width="324" height="604" rx="38" fill="#2b2f36"/>`;
  let sc = `<rect x="-150" y="-280" width="300" height="560" fill="url(#v99${id}bg)"/>`;
  // status bar + header
  sc += `<rect x="-150" y="-280" width="300" height="130" fill="#2fa59a"/>` + T(-110, -250, o.clock || '08:47', 22, { anchor: 'start', fill: '#fff', w: 700 });
  sc += `<circle cx="-92" cy="-190" r="30" fill="#e9f7f4"/>` + head(o.who || 'chef', -92, -190, .16, { t, blink: false, mouth: 'flat' });
  sc += T(-50, -190, o.name || 'Chef', 32, { anchor: 'start', fill: '#fff', w: 800 }) + T(-50, -160, o.status || 'online', 20, { anchor: 'start', fill: '#d7f0ec', w: 600 });
  let yy = -110;
  for (const m of (o.msgs || [])) {
    const p = m.p === undefined ? 1 : m.p; if (p <= 0) continue;
    const size = m.size || 30, L = m.lines || [m.txt], w = Math.min(250, Math.max(...L.map(l => textW(l, size))) + 40), h = L.length * size * 1.2 + 44;
    const bx = m.me ? 130 - w : -130;
    const k = Math.max(.01, p > 1 ? 1 : (p < 1 ? p : 1));
    sc += `<g transform="translate(${f1(bx + (m.me ? w : 0))} ${f1(yy)}) scale(${f1(k * 1000) / 1000}) translate(${f1(-(bx + (m.me ? w : 0)))} ${f1(-yy)})" opacity="${op(cl(p * 2))}"><rect x="${f1(bx)}" y="${f1(yy)}" width="${f1(w)}" height="${f1(h)}" rx="20" fill="${m.me ? '#cdeee3' : '#ffffff'}" stroke="#c4cbd3" stroke-width="2"/>`;
    L.forEach((l, i) => { sc += T(bx + 20, yy + 20 + size * .92 + i * size * 1.2, l, size, { anchor: 'start', fill: K.txt, w: 700 }); });
    sc += T(bx + w - 14, yy + h - 10, m.time || '', 16, { anchor: 'end', fill: '#7a838c', w: 600 }) + `</g>`;
    yy += h + 22;
  }
  if (o.typing > 0) { sc += `<rect x="-130" y="${yy}" width="100" height="50" rx="20" fill="#fff" opacity="${op(o.typing)}"/>${[0, 1, 2].map(i => `<circle cx="${-104 + i * 24}" cy="${yy + 25}" r="7" fill="#9aa3ad" opacity="${op(o.typing * (.4 + .6 * Math.abs(Math.sin(t * 5 + i))))}"/>`).join('')}`; }
  if (o.empty) sc += T(0, 120, o.empty, 22, { fill: '#9aa3ad', w: 700 });
  // input bar
  sc += `<rect x="-140" y="214" width="230" height="50" rx="25" fill="#fff" stroke="#c4cbd3" stroke-width="2"/><circle cx="120" cy="239" r="25" fill="#2fa59a"/>`;
  g += `<g clip-path="url(#v99${id})">${sc}</g>`;
  if (o.buzz > 0) g += `<g stroke="${K.yellow}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${op(o.buzz)}"><path d="M -200 -120 q -26 40 0 80"/><path d="M -232 -150 q -40 70 0 140"/><path d="M 200 -120 q 26 40 0 80"/><path d="M 232 -150 q 40 70 0 140"/></g>`;
  return `<g transform="translate(${f1(x + buzz)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}

// notebook lying on a desk, seen from above-front. open 0..1 (cover lifts away). page: inner SVG for the right page (local coords 0..380 × 0..500)
export function notebook(x, y, s, o = {}) {
  const open = cl(o.open || 0);
  let g = `<ellipse cx="0" cy="270" rx="430" ry="40" fill="#000" opacity=".25"/>`;
  if (open > 0) {
    // open pages
    g += `<rect x="-400" y="-250" width="400" height="510" rx="10" fill="#fbf7ea" stroke="${INK}" stroke-width="5"/><rect x="0" y="-250" width="400" height="510" rx="10" fill="#fbf7ea" stroke="${INK}" stroke-width="5"/>`;
    g += `<g stroke="#bcd0e6" stroke-width="3">${Array.from({ length: 9 }, (_, i) => `<path d="M -370 ${-170 + i * 50} H -30 M 30 ${-170 + i * 50} H 370"/>`).join('')}</g><path d="M 0 -250 V 260" stroke="#c9b99a" stroke-width="8"/>`;
    g += `<g transform="translate(-400 -250)">${o.left || ''}</g><g transform="translate(0 -250)">${o.page || ''}</g>`;
  }
  if (open < 1) {
    // cover rotates around the spine (x = 0): width shrinks then flips to the left
    const k = Math.cos(open * Math.PI), cw = 400 * k;
    const col = o.cover || '#2f6f8f';
    g += `<g transform="scale(${f1(k * 1000) / 1000} 1)"><rect x="0" y="-256" width="404" height="520" rx="14" fill="${k > 0 ? col : '#e8dcc8'}" stroke="${INK}" stroke-width="6"/>`;
    if (k > 0) g += `<rect x="0" y="-256" width="40" height="520" fill="#245a74"/><rect x="80" y="-130" width="290" height="150" rx="10" fill="#fbf7ea" stroke="${INK}" stroke-width="4"/>${T(225, -66, 'SORGEN-', 46, { fill: K.txt })}${T(225, -12, 'TAGEBUCH', 46, { fill: K.txt })}<rect x="200" y="140" width="50" height="124" fill="${K.yellow}" stroke="${INK}" stroke-width="3"/>`;
    g += `</g>`;
  }
  return `<g transform="translate(${f1(x - 202 * s * (1 - open))} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// handwritten line on a page (left-aligned), revealed with p
export function write(txt, x, y, size, p, id, col = '#22324d') {
  if (p <= 0) return '';
  const w = textW(txt, size) * 1.05;
  return `<defs><clipPath id="v99w${id}"><rect x="${f1(x - 4)}" y="${f1(y - size)}" width="${f1(w * cl(p) + 4)}" height="${f1(size * 1.4)}"/></clipPath></defs>${T(x, y, txt, size, { anchor: 'start', fill: col, w: 700 }).replace('<text ', `<text clip-path="url(#v99w${id})" `)}`;
}
// red hand-drawn X (draws with p)
export function cross(x, y, s = 1, p = 1, col = '#d9493f') {
  if (p <= 0) return '';
  const a = cl(p * 2), b = cl(p * 2 - 1), L = 60 * s;
  let g = `<path d="M ${f1(x - L / 2)} ${f1(y - L / 2)} L ${f1(x - L / 2 + L * a)} ${f1(y - L / 2 + L * a)}" stroke="${col}" stroke-width="${f1(11 * s)}" stroke-linecap="round"/>`;
  if (b > 0) g += `<path d="M ${f1(x + L / 2)} ${f1(y - L / 2)} L ${f1(x + L / 2 - L * b)} ${f1(y - L / 2 + L * b)}" stroke="${col}" stroke-width="${f1(11 * s)}" stroke-linecap="round"/>`;
  return g;
}
export { check };

// rubber stamp imprint (slams in with p: scale 1.6 → 1, rotation rot)
export function stamp(x, y, txt, size, p, o = {}) {
  if (p <= 0) return '';
  const k = lerp(1.7, 1, eio(cl(p))), col = o.col || '#d9493f', w = textW(txt, size) + size * 1.1, h = size * 1.7;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot === undefined ? -8 : o.rot)}) scale(${f1(k * 1000) / 1000})" opacity="${op(cl(p * 3) * .92)}"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(size * .25)}" fill="${o.bg || 'none'}" stroke="${col}" stroke-width="${f1(size * .14)}"/>${T(0, size * .36, txt, size, { fill: col, w: 900, ls: 2 })}</g>`;
}
// manila folder with a label
export function folder(x, y, s, txt, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><path d="M -170 -120 L -60 -120 L -40 -96 L 170 -96 L 170 120 L -170 120 Z" fill="#e0b862" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><rect x="-170" y="-80" width="340" height="200" rx="6" fill="#ecc874" stroke="${INK}" stroke-width="6"/><rect x="-140" y="-40" width="280" height="96" rx="8" fill="#fff" stroke="${INK}" stroke-width="4"/>${T(0, -2, txt[0], 34, { fill: K.txt })}${T(0, 40, txt[1] || '', 34, { fill: K.txt })}</g>`;
}
// flip calendar block showing a big number (day), small header text
export function calendar(x, y, s, hdr, num, o = {}) {
  const flip = o.flip || 0; // 0..1 page flipping over
  let g = `<rect x="-130" y="-150" width="260" height="300" rx="18" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/><rect x="-130" y="-150" width="260" height="80" rx="18" fill="#d9493f" stroke="${INK}" stroke-width="6"/><rect x="-130" y="-90" width="260" height="20" fill="#d9493f"/>${T(0, -96, hdr, 36, { fill: '#fff' })}`;
  g += `<circle cx="-70" cy="-150" r="12" fill="${INK}"/><circle cx="70" cy="-150" r="12" fill="${INK}"/>`;
  g += T(0, 90, String(num), 150, { fill: K.txt });
  if (flip > 0 && flip < 1) { const k = Math.cos(flip * Math.PI); g += `<g transform="translate(0 -70) scale(1 ${f1(k * 1000) / 1000}) translate(0 70)"><rect x="-130" y="-70" width="260" height="220" fill="${k > 0 ? '#fbf8ef' : '#e8e0cc'}" stroke="${INK}" stroke-width="5"/>${k > 0 ? T(0, 90, String(o.prev === undefined ? num - 1 : o.prev), 150, { fill: K.txt }) : ''}</g>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// sun with soft rays (radial gradient glow)
export function sun(x, y, r, t, a = 1) {
  if (a <= 0) return '';
  let g = pool(x, y, r * 3.2, r * 3.2, '#fff3b0', .55 * a);
  g += `<g opacity="${op(a)}"><g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(t * 8)})">${Array.from({ length: 12 }, (_, i) => `<rect x="-6" y="${f1(-r * 1.6)}" width="12" height="${f1(r * .35)}" rx="6" fill="#ffd23f" transform="rotate(${i * 30})"/>`).join('')}</g><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#ffd23f" stroke="${INK}" stroke-width="6"/></g>`;
  return g;
}
