// v96 shared pieces: the golden hourglass above du's head (sand state is a pure function of authored time),
// glowing phones (gradient screens), du + hourglass.
import { K, f1, op, cl, lerp, prog, eio, person, headAt, pool } from './lib.js';
const INK = K.ink;

// lower-bulb fill keyframes [t, fill]; flowing wherever the fill rises
const SAND = [[0, .06], [1.7, .06], [4.6, .12], [15.5, .12], [19.5, .28], [28.6, .44], [46.06, .44], [54.8, .66], [57.4, .66], [58.5, .76], [61.06, 1], [68.28, 1], [68.3, .04], [90, .04]];
export function sandAt(t) {
  for (let i = 1; i < SAND.length; i++) {
    const [t0, f0] = SAND[i - 1], [t1, f1_] = SAND[i];
    if (t < t1) { const p = cl((t - t0) / Math.max(1e-3, t1 - t0)); return { fill: lerp(f0, f1_, p), flow: f1_ > f0 + 1e-4 ? 1 : 0 }; }
  }
  return { fill: .04, flow: 0 };
}

// hourglass centred at (x,y); s=1 → 210 wide, 330 tall. o: t, fill, flow 0..1, id (unique), a, glow 0..1, tint
export function hourglass(x, y, s, o = {}) {
  const t = o.t || 0, st = sandAt(t);
  const fill = cl(o.fill === undefined ? st.fill : o.fill), flow = cl(o.flow === undefined ? st.flow : o.flow);
  const id = o.id || 'hg';
  const bob = Math.sin(t * 1.7 + 1) * 6, rot = Math.sin(t * 1.1) * 2.5;
  const glass = 'M -78 -128 C -78 -46 -14 -22 -11 0 C -14 22 -78 46 -78 128 H 78 C 78 46 14 22 11 0 C 14 -22 78 -46 78 -128 Z';
  const sand = '#f2c14e', sandSh = '#d9a032';
  let g = '';
  const gl = o.glow === undefined ? .35 + .35 * flow : o.glow;
  if (gl > 0) g += pool(0, 0, 230, 260, '#ffd36b', gl);
  g += `<defs><clipPath id="v96${id}c"><path d="${glass}"/></clipPath><linearGradient id="v96${id}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9a930"/><stop offset=".45" stop-color="#ffe08a"/><stop offset="1" stop-color="#c98a1e"/></linearGradient></defs>`;
  g += `<path d="${glass}" fill="#dff1f7" opacity=".55"/>`;
  // top sand (1-fill)
  const topY = lerp(-8, -112, cl(1 - fill));
  const botY = lerp(122, 18, fill);
  g += `<g clip-path="url(#v96${id}c)"><path d="M -90 ${f1(topY)} Q 0 ${f1(topY + 14)} 90 ${f1(topY)} V 2 H -90 Z" fill="${sand}"/>`;
  g += `<path d="M -90 130 V ${f1(botY + 22)} Q 0 ${f1(botY - 26)} 90 ${f1(botY + 22)} V 130 Z" fill="${sand}"/><path d="M -60 ${f1(botY + 30)} Q 0 ${f1(botY - 10)} 60 ${f1(botY + 30)}" stroke="${sandSh}" stroke-width="5" fill="none" opacity=".6"/>`;
  if (flow > 0 && fill < .999) {
    g += `<path d="M 0 0 V ${f1(botY)}" stroke="${sand}" stroke-width="6" opacity="${op(flow)}"/>`;
    for (let i = 0; i < 4; i++) { const p = (t * 2.4 + i / 4) % 1; g += `<circle cx="${f1(Math.sin(i * 7) * 2)}" cy="${f1(p * botY)}" r="4" fill="#fff3c0" opacity="${op(flow * .9)}"/>`; }
  }
  g += `</g>`;
  g += `<path d="${glass}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M -58 -112 C -58 -64 -30 -40 -20 -26" stroke="#fff" stroke-width="7" fill="none" opacity=".7" stroke-linecap="round"/>`;
  // frame: plates + posts
  g += `<rect x="-96" y="-122" width="14" height="244" rx="6" fill="url(#v96${id}g)" stroke="${INK}" stroke-width="4"/><rect x="82" y="-122" width="14" height="244" rx="6" fill="url(#v96${id}g)" stroke="${INK}" stroke-width="4"/>`;
  g += `<rect x="-108" y="-160" width="216" height="36" rx="12" fill="url(#v96${id}g)" stroke="${INK}" stroke-width="5"/><rect x="-108" y="124" width="216" height="36" rx="12" fill="url(#v96${id}g)" stroke="${INK}" stroke-width="5"/>`;
  if (o.tint) g += `<path d="M -110 -162 H 110 V 162 H -110 Z" fill="${o.tint}" opacity=".35"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y + bob)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// du + hourglass above the head. hg: options for the hourglass (s scale factor relative to the person, dy offset)
export function duHG(x, y, s, o = {}, hg = {}) {
  const [hx, hy] = headAt(x, y, s, o);
  const hs = (hg.s || .82) * s;
  return person('du', x, y, s, o) + (hg.hide ? '' : hourglass(hx + (hg.dx || 0) * s, hy - (165 + 175 + (hg.dy || 0)) * s, hs, { t: o.t, id: hg.id || 'hg', ...hg, s: undefined }));
}
// phone, screen glowing (gradient). lit 0..1, rot deg. Screen content: news lines when lit.
export function gphone(x, y, s = 1, rot = 0, o = {}) {
  const lit = o.lit === undefined ? 1 : o.lit, id = o.id || 'ph';
  let g = `<defs><linearGradient id="v96${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd4ff"/><stop offset="1" stop-color="#2f6fd6"/></linearGradient></defs>`;
  g += `<rect x="-62" y="-118" width="124" height="236" rx="20" fill="${INK}"/><rect x="-52" y="-102" width="104" height="204" rx="10" fill="#1e2a40"/>`;
  if (lit > 0) {
    g += `<rect x="-52" y="-102" width="104" height="204" rx="10" fill="url(#v96${id}s)" opacity="${op(lit)}"/>`;
    const sc = (o.scroll || 0) % 60;
    g += `<g opacity="${op(lit)}"><rect x="-42" y="-92" width="84" height="40" rx="6" fill="#fff" opacity=".85"/>`;
    for (let i = 0; i < 4; i++) { const yy = -40 + i * 40 - sc; if (yy > -50 && yy < 90) g += `<rect x="-42" y="${f1(yy)}" width="84" height="12" rx="5" fill="#fff" opacity=".75"/><rect x="-42" y="${f1(yy + 18)}" width="56" height="10" rx="5" fill="#fff" opacity=".5"/>`; }
    g += `</g>`;
  }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// phone lying face down (seen from above-front): dark slab with camera bump
export function phoneDown(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><rect x="-80" y="-22" width="160" height="34" rx="12" fill="#2e3440" stroke="${INK}" stroke-width="5"/><rect x="-80" y="-22" width="160" height="10" rx="5" fill="#4a5262"/><rect x="40" y="-30" width="28" height="10" rx="4" fill="#3a404c" stroke="${INK}" stroke-width="3"/></g>`;
}
// blue screen glow cast on a face/area
export const screenGlow = (x, y, r, a = .5) => pool(x, y, r, r * 1.1, '#6fc3ff', a);
export const blueRim = '#7fd4ff';
// phone held in a hand (person-local coords): phone + black hand dot over its lower edge
export function holdPhone(x, y, rot = 0, o = {}) {
  return gphone(x, y, o.s || .9, rot, o) + `<circle cx="${f1(x + (o.hx || 0))}" cy="${f1(y + (o.hy === undefined ? 70 : o.hy))}" r="24" fill="${INK}"/>`;
}
// world position of the hourglass that duHG draws
export function hgPos(x, y, s, o = {}, hg = {}) { const [hx, hy] = headAt(x, y, s, o); return [hx + (hg.dx || 0) * s, hy - (165 + 175 + (hg.dy || 0)) * s]; }
