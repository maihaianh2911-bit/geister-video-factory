// v80 shared kit: pastel flat backgrounds, big bold German text, simple black round-head silhouettes.
// Low motion: elements fade/slide in on their spoken word, poses change only between a few clear presets.
import { cl, prog, eio, eout, back, lerp } from '../../../engine/core.js';
export { cl, prog, eio, eout, back, lerp };

export const K = {
  ink: '#1f1d2b', ink2: '#4a4760', paper: '#ffffff',
  cream: '#fbf1df', mint: '#dcefe6', lav: '#e7e0f5', pink: '#f8dfe5', sky: '#dce9f7', butter: '#fbefc4',
  red: '#d94545', redL: '#f6c9c6', green: '#24946a', greenL: '#c4ead7', yellow: '#ffd84a', blue: '#3a6cd6', blueL: '#cddcf8',
  orange: '#f08a3c', purple: '#7a5bd0', grey: '#a9a6b8', greyL: '#e4e2ea',
};
const INK = K.ink;

export const fade = (t, t0, d = .35) => eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .4) => back(prog(t, t0, t0 + d), 1.6);

// ---------- text ----------
const W = {"0": 0.71, "1": 0.45, "2": 0.65, "3": 0.67, "4": 0.7, "5": 0.65, "6": 0.67, "7": 0.59, "8": 0.68, "9": 0.67, " ": 0.2, "!": 0.38, "%": 1.04, "&": 0.7, "'": 0.37, "(": 0.39, ")": 0.39, "+": 0.69, ",": 0.37, "-": 0.47, ".": 0.37, "/": 0.41, ":": 0.37, ";": 0.38, "=": 0.69, "?": 0.6, "A": 0.8, "B": 0.67, "C": 0.75, "D": 0.72, "E": 0.61, "F": 0.58, "G": 0.75, "H": 0.75, "I": 0.29, "J": 0.6, "K": 0.76, "L": 0.57, "M": 0.96, "N": 0.77, "O": 0.78, "P": 0.66, "Q": 0.79, "R": 0.67, "S": 0.67, "T": 0.69, "U": 0.72, "V": 0.8, "W": 1.08, "X": 0.79, "Y": 0.78, "Z": 0.69, "a": 0.6, "b": 0.65, "c": 0.6, "d": 0.65, "e": 0.61, "f": 0.42, "g": 0.65, "h": 0.65, "i": 0.3, "j": 0.3, "k": 0.61, "l": 0.3, "m": 0.94, "n": 0.65, "o": 0.63, "p": 0.65, "q": 0.65, "r": 0.45, "s": 0.59, "t": 0.42, "u": 0.65, "v": 0.65, "w": 0.88, "x": 0.61, "y": 0.65, "z": 0.59, "Ä": 0.8, "Ö": 0.78, "Ü": 0.72, "ä": 0.6, "ö": 0.63, "ü": 0.65, "ß": 0.69, "„": 0.59, "“": 0.62, "”": 0.61, "’": 0.35, "–": 0.5, "·": 0.37, "…": 1.12, "→": 1, "✓": 0.88, "Â": 0.8};
export function textW(s, size) {
  let w = 0;
  for (const ch of s) w += W[ch] !== undefined ? W[ch] : (/[A-ZÀ-Ỹ]/.test(ch) && ch === ch.toUpperCase() ? .75 : .63);
  return w * size;
}
export function wrap(s, size, maxW) {
  const words = s.split(' '), lines = [];
  let cur = '';
  for (const w of words) {
    const tr = cur ? cur + ' ' + w : w;
    if (textW(tr, size) > maxW && cur) { lines.push(cur); cur = w; } else cur = tr;
  }
  if (cur) lines.push(cur);
  return lines;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const T = (x, y, s, size, o = {}) => `<text x="${x}" y="${y}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || INK}" text-anchor="${o.anchor || 'middle'}" ${o.op !== undefined ? `opacity="${o.op}"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${esc(s)}</text>`;

// multi-line text block; returns {svg, h}
export function block(x, y, s, size, maxW, o = {}) {
  const lines = wrap(s, size, maxW), lh = size * (o.lh || 1.18);
  return { svg: lines.map((l, i) => T(x, y + i * lh, l, size, o)).join(''), h: lines.length * lh, lines };
}

// big headline with optional yellow marker on one word (mark: {word, t})
export function headline(t, y, s, size = 92, o = {}) {
  const a = o.t0 === undefined ? 1 : fade(t, o.t0, .4);
  const lines = o.lines || wrap(s, size, o.maxW || 940), lh = size * 1.1;
  let out = '';
  lines.forEach((l, i) => {
    const ly = y + i * lh;
    if (o.mark && l.includes(o.mark.word)) {
      const pre = l.slice(0, l.indexOf(o.mark.word)), full = textW(l, size), x0 = 540 - full / 2 + textW(pre, size), mw = textW(o.mark.word, size);
      const p = eout(prog(t, o.mark.t, o.mark.t + .35));
      if (p > 0) out += `<rect x="${x0 - 10}" y="${ly - size * .78}" width="${(mw + 20) * p}" height="${size * .95}" rx="10" fill="${o.mark.color || K.yellow}"/>`;
    }
    out += T(540, ly, l, size, { fill: o.fill });
  });
  return `<g opacity="${a}" transform="translate(0 ${(1 - a) * 20})">${out}</g>`;
}

export const bg = (col, o = {}) => `<rect width="1080" height="1920" fill="${col}"/>` +
  (o.floor === false ? '' : `<rect x="0" y="${o.fy || 1345}" width="1080" height="${1920 - (o.fy || 1345)}" fill="#000" opacity=".045"/><line x1="60" y1="${o.fy || 1345}" x2="1020" y2="${o.fy || 1345}" stroke="${INK}" stroke-width="4" opacity=".18" stroke-linecap="round"/>`);

// small label chip
export function chip(x, y, s, o = {}) {
  const size = o.size || 40, w = textW(s, size) + size * 1.1, h = size * 1.55;
  const a = o.a === undefined ? 1 : o.a;
  return `<g opacity="${a}" transform="translate(${x} ${y}) scale(${o.sc || 1})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${o.bg || INK}"/>${T(0, size * .36, s, size, { fill: o.fill || '#fff' })}</g>`;
}

// ---------- silhouettes ----------
// origin at feet centre, height ≈ 400·s, faces right when f=1. Points are in figure-local units.
const P = {
  stand: { lean: 0, head: [0, 0], aL: [[-44, -210], [-50, -148]], aR: [[44, -210], [50, -148]], legs: 'stand' },
  bow: { lean: 26, head: [6, 8], aL: [[8, -212], [34, -184]], aR: [[30, -214], [44, -188]], legs: 'stand' },
  deepbow: { lean: 44, head: [8, 14], aL: [[10, -210], [34, -180]], aR: [[30, -212], [46, -184]], legs: 'stand' },
  ask: { lean: 6, head: [0, 0], aL: [[-44, -210], [-50, -148]], aR: [[62, -236], [118, -236]], legs: 'stand' },
  point: { lean: 0, head: [0, 0], aL: [[-44, -210], [-50, -148]], aR: [[70, -262], [132, -300]], legs: 'stand' },
  idea: { lean: 0, head: [0, 0], aL: [[-44, -210], [-50, -148]], aR: [[52, -320], [56, -392]], legs: 'stand' },
  shrug: { lean: 0, head: [0, 4], aL: [[-68, -238], [-96, -282]], aR: [[68, -238], [96, -282]], legs: 'stand' },
  cheer: { lean: 0, head: [0, -4], aL: [[-62, -330], [-86, -404]], aR: [[62, -330], [86, -404]], legs: 'stand' },
  cross: { lean: 0, head: [0, 0], aL: [[-40, -222], [30, -236]], aR: [[40, -226], [-28, -244]], legs: 'stand' },
  hips: { lean: 0, head: [0, 0], aL: [[-74, -228], [-34, -176]], aR: [[74, -228], [34, -176]], legs: 'stand' },
  phone: { lean: 0, head: [4, 6], aL: [[-44, -210], [-50, -148]], aR: [[58, -214], [70, -278]], legs: 'stand' },
  show: { lean: 0, head: [0, 0], aL: [[-44, -210], [-50, -148]], aR: [[70, -240], [130, -270]], legs: 'stand' },
  think: { lean: 0, head: [0, 4], aL: [[-30, -212], [24, -214]], aR: [[52, -232], [30, -300]], legs: 'stand' },
  sit: { lean: 4, head: [0, 0], aL: [[-30, -205], [-20, -160]], aR: [[30, -205], [40, -160]], legs: 'sit' },
  type: { lean: 10, head: [10, 16], aL: [[40, -196], [104, -206]], aR: [[52, -194], [118, -210]], legs: 'sit' },
  sitTurn: { lean: -4, head: [-4, 0], aL: [[-30, -205], [-20, -160]], aR: [[60, -228], [116, -244]], legs: 'sit' },
  sitCheer: { lean: 0, head: [0, -4], aL: [[-50, -300], [-66, -372]], aR: [[60, -232], [116, -244]], legs: 'sit' },
};
const LEGS = {
  stand: { L: [[-24, -76], [-30, -6]], R: [[24, -76], [30, -6]], hip: -150 },
  sit: { L: [[66, -150], [70, -6]], R: [[80, -146], [86, -6]], hip: -150 },
};
const lp = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
function mix(a, b, p) {
  if (p <= 0) return a; if (p >= 1) return b;
  return { lean: lerp(a.lean, b.lean, p), head: lp(a.head, b.head, p), aL: [lp(a.aL[0], b.aL[0], p), lp(a.aL[1], b.aL[1], p)], aR: [lp(a.aR[0], b.aR[0], p), lp(a.aR[1], b.aR[1], p)], legs: p < .5 ? a.legs : b.legs };
}
// pose sequence: [[time, 'pose'], ...] → blended pose at t (0.4 s blend)
export function poseAt(t, seq) {
  let cur = P[seq[0][1]];
  for (let i = 1; i < seq.length; i++) { const [ti, name] = seq[i]; if (t >= ti) cur = mix(cur, P[name], eio(prog(t, ti, ti + .4))); }
  return cur;
}
const rot = (p, ang, c) => { const r = ang * Math.PI / 180, dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * Math.cos(r) - dy * Math.sin(r), c[1] + dx * Math.sin(r) + dy * Math.cos(r)]; };
const seg = (a, b, w, col) => `<path d="M ${a[0].toFixed(1)} ${a[1].toFixed(1)} L ${b[0].toFixed(1)} ${b[1].toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
const limb = (a, e, h, w, col) => `<path d="M ${a[0].toFixed(1)} ${a[1].toFixed(1)} L ${e[0].toFixed(1)} ${e[1].toFixed(1)} L ${h[0].toFixed(1)} ${h[1].toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

// who: 'ich' | 'trang' | 'chau' | 'vinh' | 'lam' | 'x' (generic). pose: name or pose object.
export function fig(x, y, s, who, pose, o = {}) {
  const p = typeof pose === 'string' ? P[pose] : pose, f = o.f || 1, col = o.col || INK;
  const L = LEGS[p.legs], hip = [0, L.hip], lean = p.lean;
  const R = q => rot(q, lean, hip);
  const neck = R([0, -296]), sh = R([0, -280]);
  const hc = R([p.head[0], -342 + p.head[1]]);
  const tall = who === 'lam' ? 1.06 : 1;
  let s2 = '';
  // legs
  s2 += limb([-16, -150], L.L[0], L.L[1], 26, col) + limb([16, -150], L.R[0], L.R[1], 26, col);
  s2 += `<ellipse cx="${L.L[1][0] - 2}" cy="-4" rx="22" ry="9" fill="${col}"/><ellipse cx="${L.R[1][0] + 6}" cy="-4" rx="22" ry="9" fill="${col}"/>`;
  // back arm
  s2 += limb(R([-14, -276]), R(p.aL[0]), R(p.aL[1]), 22, col);
  // torso
  const tA = R([-34, -282]), tB = R([34, -282]), tC = R([28, -146]), tD = R([-28, -146]);
  s2 += `<path d="M ${tA[0]} ${tA[1]} Q ${R([0, -300])[0]} ${R([0, -300])[1]} ${tB[0]} ${tB[1]} L ${tC[0]} ${tC[1]} Q ${hip[0]} ${hip[1] + 14} ${tD[0]} ${tD[1]} Z" fill="${col}" stroke="${col}" stroke-width="10" stroke-linejoin="round"/>`;
  if (who === 'lam') { const a = R([-12, -280]), b = R([12, -280]), c = R([0, -262]), d = R([0, -196]); s2 += `<path d="M ${a[0]} ${a[1]} L ${c[0]} ${c[1]} L ${b[0]} ${b[1]} Z" fill="#fff"/><path d="M ${c[0]} ${c[1]} L ${R([-9, -214])[0]} ${R([-9, -214])[1]} L ${d[0]} ${d[1]} L ${R([9, -214])[0]} ${R([9, -214])[1]} Z" fill="${K.red}"/>`; }
  s2 += seg(neck, sh, 24, col);
  // head
  s2 += `<circle cx="${hc[0]}" cy="${hc[1]}" r="44" fill="${col}"/><circle cx="${hc[0] + 40}" cy="${hc[1] + 6}" r="10" fill="${col}"/>`;
  if (who === 'trang') s2 += `<circle cx="${hc[0] - 26}" cy="${hc[1] - 44}" r="22" fill="${col}"/><path d="M ${hc[0] - 40} ${hc[1] - 10} Q ${hc[0] - 70} ${hc[1] + 40} ${hc[0] - 48} ${hc[1] + 70}" stroke="${col}" stroke-width="20" fill="none" stroke-linecap="round"/>`;
  if (who === 'chau') s2 += `<circle cx="${hc[0] + 22}" cy="${hc[1] - 6}" r="13" fill="none" stroke="#fff" stroke-width="5"/><path d="M ${hc[0] + 9} ${hc[1] - 8} L ${hc[0] - 28} ${hc[1] - 12}" stroke="#fff" stroke-width="5"/>`;
  if (who === 'vinh') s2 += `<path d="M ${hc[0] - 38} ${hc[1] + 2} A 46 46 0 0 1 ${hc[0] + 34} ${hc[1] - 18}" stroke="${col}" stroke-width="10" fill="none" transform="translate(0 -12)"/><rect x="${hc[0] - 16}" y="${hc[1] - 10}" width="22" height="34" rx="9" fill="#fff" stroke="${col}" stroke-width="5"/>`;
  if (who === 'ich') s2 += `<path d="M ${hc[0] - 30} ${hc[1] - 34} Q ${hc[0] - 4} ${hc[1] - 66} ${hc[0] + 26} ${hc[1] - 40}" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round"/>`;
  if (o.smile) s2 += `<path d="M ${hc[0] + 14} ${hc[1] + 16} Q ${hc[0] + 28} ${hc[1] + 28} ${hc[0] + 38} ${hc[1] + 14}" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity="${o.smile}"/>`;
  // front arm (+ optional prop in hand)
  const hand = R(p.aR[1]);
  s2 += limb(R([14, -276]), R(p.aR[0]), hand, 22, col);
  if (o.prop) s2 += `<g transform="translate(${hand[0]} ${hand[1]})">${o.prop}</g>`;
  s2 += `<circle cx="${hand[0]}" cy="${hand[1]}" r="14" fill="${col}"/>`;
  const out = `<g transform="translate(${x} ${y}) scale(${s * f * tall} ${s * tall})">${s2}</g>`;
  return (o.a === undefined || o.a >= 1) ? out : `<g opacity="${o.a}">${out}</g>`;
}
// head position in screen coords (for icons above a figure)
export function headXY(x, y, s, f = 1) { return [x + 0 * f, y - 342 * s]; }

// name tag under a figure
export const nameTag = (x, y, s, a = 1, col = K.ink) => chip(x, y, s, { a, size: 34, bg: col });

// ---------- props ----------
export function bubble(x, y, w, lines, o = {}) {
  // lines: array of {s, a?, strike?, mark?} or strings. o.tail: [tx, ty] tip point; o.size
  const size = o.size || 46, lh = size * 1.22, pad = 34;
  const L = [];
  lines.forEach(l => { const it = typeof l === 'string' ? { s: l } : l; wrap(it.s, size, w - pad * 2).forEach((ln, k) => L.push({ ...it, s: ln, first: k === 0 })); });
  const h = L.length * lh + pad * 1.4;
  const a = o.a === undefined ? 1 : o.a, sc = o.sc === undefined ? 1 : o.sc;
  const fill = o.fill || '#fff', stroke = o.stroke || INK;
  let tail = '';
  if (o.tail) { const [tx, ty] = o.tail, bx = cl(tx, x + 60, x + w - 60), by = ty > y + h ? y + h - 4 : y + 4; tail = `<path d="M ${bx - 30} ${by} L ${tx} ${ty} L ${bx + 30} ${by} Z" fill="${fill}" stroke="${stroke}" stroke-width="6" stroke-linejoin="round"/><rect x="${bx - 34}" y="${ty > y + h ? by - 10 : by}" width="68" height="12" fill="${fill}"/>`; }
  let txt = '';
  L.forEach((l, i) => {
    const ly = y + pad * .7 + size * .95 + i * lh, la = l.a === undefined ? 1 : l.a;
    if (la <= 0) return;
    if (l.mark !== undefined && l.mark > 0) txt += `<rect x="${x + pad - 8}" y="${ly - size * .82}" width="${(textW(l.s, size) + 16) * eout(l.mark)}" height="${size * 1.02}" rx="8" fill="${o.markCol || K.yellow}" opacity="${la}"/>`;
    txt += T(x + pad, ly, l.s, size, { anchor: 'start', fill: l.col || INK, op: la });
    if (l.strike !== undefined && l.strike > 0) txt += `<line x1="${x + pad - 6}" y1="${ly - size * .32}" x2="${x + pad - 6 + (textW(l.s, size) + 12) * eout(l.strike)}" y2="${ly - size * .32}" stroke="${K.red}" stroke-width="8" stroke-linecap="round"/>`;
  });
  return { svg: `<g opacity="${a}" transform="translate(${x + w / 2} ${y + h / 2}) scale(${sc}) translate(${-x - w / 2} ${-y - h / 2})">${tail}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${fill}" stroke="${stroke}" stroke-width="6"/>${txt}</g>`, h };
}

// red cross-out over a box
export const crossOut = (x, y, w, h, p) => p <= 0 ? '' : `<g stroke="${K.red}" stroke-width="14" stroke-linecap="round" opacity=".9"><line x1="${x}" y1="${y}" x2="${lerp(x, x + w, eout(cl(p * 2)))}" y2="${lerp(y, y + h, eout(cl(p * 2)))}"/>${p > .5 ? `<line x1="${x + w}" y1="${y}" x2="${lerp(x + w, x, eout(cl(p * 2 - 1)))}" y2="${lerp(y, y + h, eout(cl(p * 2 - 1)))}"/>` : ''}</g>`;

export function badge(x, y, r, kind, o = {}) {
  const a = o.a === undefined ? 1 : o.a, sc = o.sc === undefined ? 1 : o.sc;
  let g = '';
  if (kind === 'check') g = `<circle r="${r}" fill="${K.green}"/><path d="M ${-r * .45} 0 L ${-r * .1} ${r * .35} L ${r * .5} ${-r * .35}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  else if (kind === 'x') g = `<circle r="${r}" fill="${K.red}"/><path d="M ${-r * .35} ${-r * .35} L ${r * .35} ${r * .35} M ${r * .35} ${-r * .35} L ${-r * .35} ${r * .35}" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round"/>`;
  else if (kind === 'star') g = `<path d="${starPath(r)}" fill="${K.yellow}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  else if (kind === 'q') g = `<circle r="${r}" fill="${K.ink}"/>${T(0, r * .38, '?', r * 1.15, { fill: '#fff' })}`;
  else if (kind === 'heart') g = `<path d="M 0 ${r * .8} C ${-r * 1.4} ${-r * .1} ${-r * .7} ${-r * 1.1} 0 ${-r * .45} C ${r * .7} ${-r * 1.1} ${r * 1.4} ${-r * .1} 0 ${r * .8} Z" fill="${K.red}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  else if (kind === 'angry') g = `<g stroke="${K.red}" stroke-width="${r * .22}" stroke-linecap="round" fill="none"><path d="M ${-r * .8} ${-r * .3} Q ${-r * .3} ${-r * .3} ${-r * .3} ${-r * .8}"/><path d="M ${r * .8} ${-r * .3} Q ${r * .3} ${-r * .3} ${r * .3} ${-r * .8}"/><path d="M ${-r * .8} ${r * .3} Q ${-r * .3} ${r * .3} ${-r * .3} ${r * .8}"/><path d="M ${r * .8} ${r * .3} Q ${r * .3} ${r * .3} ${r * .3} ${r * .8}"/></g>`;
  else if (kind === 'sweat') g = `<path d="M 0 ${-r} Q ${r * .8} ${r * .1} 0 ${r * .7} Q ${-r * .8} ${r * .1} 0 ${-r} Z" fill="#7cc4f2" stroke="${INK}" stroke-width="5"/>`;
  return `<g opacity="${a}" transform="translate(${x} ${y}) scale(${sc})">${g}</g>`;
}
export function starPath(r) { let d = ''; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * .45 : r, an = -Math.PI / 2 + i * Math.PI / 5; d += (i ? 'L' : 'M') + ` ${(rr * Math.cos(an)).toFixed(1)} ${(rr * Math.sin(an)).toFixed(1)} `; } return d + 'Z'; }

// event poster: state 0 = dull draft, 1 = improved colourful layout
export function poster(x, y, w, state = 0, o = {}) {
  const h = w * 1.36, a = o.a === undefined ? 1 : o.a, k = cl(state);
  const c1 = k > .5 ? K.purple : K.grey, c2 = k > .5 ? K.orange : K.greyL, c3 = k > .5 ? K.yellow : '#d4d2dc';
  const bgc = k > .5 ? '#fff4e0' : '#f1f0f4';
  let g = `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="${bgc}" stroke="${INK}" stroke-width="6"/>`;
  if (k <= .5) {
    g += `<rect x="${w * .12}" y="${h * .1}" width="${w * .76}" height="${h * .1}" rx="6" fill="${c1}"/>`
      + `<rect x="${w * .12}" y="${h * .26}" width="${w * .76}" height="${h * .36}" rx="8" fill="${c2}"/>`
      + [0, 1, 2].map(i => `<rect x="${w * .12}" y="${h * (.7 + i * .07)}" width="${w * (.76 - i * .14)}" height="${h * .035}" rx="4" fill="${c3}"/>`).join('');
  } else {
    g += `<circle cx="${w * .72}" cy="${h * .34}" r="${w * .26}" fill="${c2}"/><circle cx="${w * .3}" cy="${h * .44}" r="${w * .16}" fill="${c1}" opacity=".9"/>`
      + `<rect x="${w * .1}" y="${h * .08}" width="${w * .6}" height="${h * .12}" rx="8" fill="${INK}"/>`
      + `<rect x="${w * .1}" y="${h * .66}" width="${w * .8}" height="${h * .08}" rx="6" fill="${c1}"/>`
      + `<rect x="${w * .1}" y="${h * .78}" width="${w * .5}" height="${h * .05}" rx="5" fill="${c3}" stroke="${INK}" stroke-width="3"/>`
      + `<path d="${starPath(w * .07)}" transform="translate(${w * .84} ${h * .86})" fill="${K.yellow}" stroke="${INK}" stroke-width="3"/>`;
  }
  if (o.label) g += T(w / 2, h + 56, o.label, 38, { fill: INK });
  return `<g opacity="${a}" transform="translate(${x} ${y}) rotate(${o.rot || 0} ${w / 2} ${h / 2})">${g}</g>`;
}

// smartphone frame with chat content (svg inside, local coords 0..w)
export function phone(x, y, w, h, inner, o = {}) {
  const a = o.a === undefined ? 1 : o.a;
  return `<g opacity="${a}" transform="translate(${x} ${y})"><rect x="-14" y="-14" width="${w + 28}" height="${h + 28}" rx="56" fill="${INK}"/><rect x="0" y="0" width="${w}" height="${h}" rx="44" fill="#f7f6fb"/>
    <rect x="0" y="0" width="${w}" height="96" rx="44" fill="#ecebf3"/><rect x="0" y="60" width="${w}" height="36" fill="#ecebf3"/>
    ${o.title ? T(w / 2, 66, o.title, 38, { fill: INK }) : ''}<rect x="${w / 2 - 60}" y="10" width="120" height="16" rx="8" fill="${INK}"/>${inner}</g>`;
}
// chat bubble inside phone; side 'l' (incoming) or 'r' (outgoing)
export function chat(w, y, lines, side, o = {}) {
  const size = o.size || 40, maxW = w * .84, pad = 26;
  const L = [];
  lines.forEach(l => { const it = typeof l === 'string' ? { s: l } : l; wrap(it.s, size, maxW - pad * 2).forEach(ln => L.push({ ...it, s: ln })); });
  const bw = Math.min(maxW, Math.max(...L.map(l => textW(l.s, size))) + pad * 2 + 10), lh = size * 1.22, bh = L.length * lh + pad * 1.2;
  const bx = side === 'r' ? w - 24 - bw : 24, a = o.a === undefined ? 1 : o.a;
  const fill = side === 'r' ? (o.fill || K.blueL) : '#fff';
  let txt = '';
  L.forEach((l, i) => {
    const ly = y + pad * .6 + size * .95 + i * lh;
    if (l.mark !== undefined && l.mark > 0) txt += `<rect x="${bx + pad - 6}" y="${ly - size * .82}" width="${(textW(l.s, size) + 12) * eout(l.mark)}" height="${size * 1.02}" rx="6" fill="${K.yellow}"/>`;
    txt += T(bx + pad, ly, l.s, size, { anchor: 'start', fill: INK, w: l.w || 800 });
  });
  return { svg: `<g opacity="${a}" transform="translate(0 ${(1 - a) * 24})"><rect x="${bx}" y="${y}" width="${bw}" height="${bh}" rx="26" fill="${fill}" stroke="${INK}" stroke-width="4"/>${txt}</g>`, h: bh };
}

export function calendar(x, y, w, o = {}) {
  const h = w * .9, a = o.a === undefined ? 1 : o.a;
  let g = `<rect x="0" y="0" width="${w}" height="${h}" rx="20" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h * .22}" rx="20" fill="${o.head || K.red}" stroke="${INK}" stroke-width="6"/><rect x="3" y="${h * .14}" width="${w - 6}" height="${h * .09}" fill="${o.head || K.red}"/>`
    + `<rect x="${w * .24}" y="-18" width="16" height="44" rx="8" fill="${INK}"/><rect x="${w * .76 - 16}" y="-18" width="16" height="44" rx="8" fill="${INK}"/>`;
  if (o.title) g += T(w / 2, h * .16, o.title, w * .1, { fill: '#fff' });
  const cols = o.cols || 4, rows = o.rows || 2, cw = w * .84 / cols, ch = h * .66 / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, cx = w * .08 + c * cw, cy = h * .28 + r * ch;
    g += `<rect x="${cx + 6}" y="${cy + 6}" width="${cw - 12}" height="${ch - 12}" rx="10" fill="${(o.fills && o.fills[i]) || K.greyL}"/>`;
    const xp = o.cross ? o.cross[i] || 0 : 0;
    if (xp > 0) g += `<g stroke="${K.red}" stroke-width="10" stroke-linecap="round"><line x1="${cx + 22}" y1="${cy + 22}" x2="${lerp(cx + 22, cx + cw - 22, eout(cl(xp * 2)))}" y2="${lerp(cy + 22, cy + ch - 22, eout(cl(xp * 2)))}"/>${xp > .5 ? `<line x1="${cx + cw - 22}" y1="${cy + 22}" x2="${lerp(cx + cw - 22, cx + 22, eout(cl(xp * 2 - 1)))}" y2="${lerp(cy + 22, cy + ch - 22, eout(cl(xp * 2 - 1)))}"/>` : ''}</g>`;
    if (o.check && o.check[i] > 0) g += badge(cx + cw / 2, cy + ch / 2, Math.min(cw, ch) * .3, 'check', { sc: back(o.check[i]) });
  }
  return `<g opacity="${a}" transform="translate(${x} ${y})">${g}</g>`;
}

export function clock(x, y, r, minutes = 0, o = {}) {
  const a = o.a === undefined ? 1 : o.a, ang = minutes / 60 * 360, hang = minutes / 720 * 360 + (o.h0 || 0);
  return `<g opacity="${a}" transform="translate(${x} ${y})"><circle r="${r}" fill="#fff" stroke="${INK}" stroke-width="8"/>
    ${[0, 1, 2, 3].map(i => `<rect x="-4" y="${-r + 10}" width="8" height="18" rx="3" fill="${INK}" transform="rotate(${i * 90})"/>`).join('')}
    ${o.sector ? `<path d="M 0 0 L 0 ${-r + 8} A ${r - 8} ${r - 8} 0 ${o.sector > .5 ? 1 : 0} 1 ${((r - 8) * Math.sin(o.sector * 2 * Math.PI)).toFixed(1)} ${(-(r - 8) * Math.cos(o.sector * 2 * Math.PI)).toFixed(1)} Z" fill="${o.secCol || K.yellow}" opacity=".85"/>` : ''}
    <line x1="0" y1="0" x2="0" y2="${-r * .5}" stroke="${INK}" stroke-width="10" stroke-linecap="round" transform="rotate(${hang})"/>
    <line x1="0" y1="0" x2="0" y2="${-r * .75}" stroke="${INK}" stroke-width="7" stroke-linecap="round" transform="rotate(${ang})"/><circle r="10" fill="${INK}"/></g>`;
}

export function desk(x, y, w, o = {}) {
  // top surface at y; monitor optional
  let g = `<rect x="${x}" y="${y}" width="${w}" height="22" rx="8" fill="${K.ink2}"/><rect x="${x + 24}" y="${y + 20}" width="16" height="${1345 - y - 20}" fill="${K.ink2}"/><rect x="${x + w - 40}" y="${y + 20}" width="16" height="${1345 - y - 20}" fill="${K.ink2}"/>`;
  if (o.monitor) { const mx = o.mx === undefined ? x + w * .55 : o.mx; g += `<rect x="${mx - 20}" y="${y - 60}" width="40" height="62" fill="${K.ink2}"/><rect x="${mx - 120}" y="${y - 230}" width="240" height="170" rx="14" fill="${K.ink2}"/><rect x="${mx - 106}" y="${y - 216}" width="212" height="142" rx="8" fill="${o.screen || '#bfd3f3'}"/>${o.screenSvg || ''}`; }
  return g;
}
export function chair(x, y) { // seat top at y (≈ hip height), x = seat centre
  return `<rect x="${x - 60}" y="${y}" width="120" height="20" rx="8" fill="${K.ink2}"/><rect x="${x - 70}" y="${y - 150}" width="20" height="170" rx="8" fill="${K.ink2}"/><rect x="${x - 6}" y="${y + 18}" width="12" height="${1345 - y - 30}" fill="${K.ink2}"/><rect x="${x - 50}" y="1330" width="100" height="12" rx="6" fill="${K.ink2}"/>`;
}

export function doc(x, y, w, o = {}) {
  const h = w * 1.3, a = o.a === undefined ? 1 : o.a;
  let g = `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  if (o.title) g += T(w / 2, h * .14, o.title, w * .12, { fill: INK });
  const n = o.n || 5;
  for (let i = 0; i < n; i++) g += `<rect x="${w * .14}" y="${h * (.24 + i * .13)}" width="${w * (i % 2 ? .56 : .72)}" height="${h * .045}" rx="4" fill="${(o.lineCol && o.lineCol[i]) || K.greyL}"/>`;
  if (o.extra) g += o.extra;
  return `<g opacity="${a}" transform="translate(${x} ${y}) rotate(${o.rot || 0} ${w / 2} ${h / 2})">${g}</g>`;
}

export function book(x, y, w, o = {}) {
  const h = w * 1.42, a = o.a === undefined ? 1 : o.a;
  let g = `<rect x="14" y="14" width="${w}" height="${h}" rx="12" fill="${INK}" opacity=".25"/><rect x="0" y="0" width="${w}" height="${h}" rx="12" fill="${o.col || K.blue}" stroke="${INK}" stroke-width="7"/><rect x="0" y="0" width="${w * .1}" height="${h}" rx="6" fill="#000" opacity=".2"/>
    <rect x="${w * .16}" y="${h * .08}" width="${w * .74}" height="${h * .46}" rx="10" fill="#fff" opacity=".95"/>`;
  (o.lines || []).forEach((l, i) => g += T(w * .53, h * .2 + i * w * .14, l, w * .1, { fill: INK }));
  g += `<circle cx="${w * .53}" cy="${h * .76}" r="${w * .14}" fill="${K.yellow}" stroke="${INK}" stroke-width="5"/><path d="M ${w * .45} ${h * .76} q ${w * .08} ${w * .08} ${w * .16} 0" stroke="${INK}" stroke-width="5" fill="none"/>`;
  return `<g opacity="${a}" transform="translate(${x} ${y}) rotate(${o.rot || 0} ${w / 2} ${h / 2})">${g}</g>`;
}

// numbered method title card (big)
export function methodCard(t, t0, n, title, y = 330, col = K.ink) {
  const p = pop(t, t0, .45), a = fade(t, t0, .25);
  const size = Math.min(84, 700 / textW(title, 1));
  return `<g opacity="${a}" transform="translate(540 ${y}) scale(${.85 + .15 * p})">
    <rect x="-490" y="-120" width="980" height="240" rx="40" fill="${col}"/>
    <circle cx="-370" cy="0" r="82" fill="${K.yellow}"/>${T(-370, 34, String(n), 100, { fill: INK })}
    ${T(100, size * .36, title, size, { fill: '#fff' })}</g>`;
}

// old → new sentence pair cards (strike old, reveal new)
export function oldNew(t, y, oldS, newS, tStrike, tNew, o = {}) {
  const ob = bubble(70, y, 940, [{ s: oldS, strike: prog(t, tStrike, tStrike + .5) }], { size: o.size || 46, a: fade(t, o.tOld === undefined ? 0 : o.tOld), fill: '#fff' });
  let s = chip(170, y - 30, 'ALT', { size: 34, bg: K.red }) + ob.svg + badge(980, y + 10, 40, 'x', { a: fade(t, tStrike + .3), sc: pop(t, tStrike + .3) });
  if (newS) {
    const ny = y + ob.h + 90, na = fade(t, tNew, .4);
    const nb = bubble(70, ny, 940, [{ s: newS }], { size: o.size || 46, a: na, fill: K.greenL });
    s += `<g transform="translate(0 ${(1 - na) * 30})">${chip(170, ny - 30, 'NEU', { size: 34, bg: K.green, a: na })}${nb.svg}${badge(980, ny + 10, 40, 'check', { a: na, sc: pop(t, tNew + .2) })}</g>`;
  }
  return s;
}

// Trang's workplace (shots 6–9): desk on the right, Trang sitting at x 640 facing her monitor
export function trangDesk(pose, o = {}) {
  const s = 1.15, hipY = 1340 - 150 * s;
  const scr = o.screen === undefined ? `<rect x="792" y="${1090 - 200}" width="80" height="14" rx="5" fill="#fff"/><rect x="792" y="${1090 - 176}" width="140" height="14" rx="5" fill="#fff" opacity=".7"/><rect x="792" y="${1090 - 150}" width="110" height="40" rx="6" fill="${K.purple}" opacity=".6"/>` : o.screen;
  return chair(700, hipY) + desk(520, 1090, 480, { monitor: true, mx: 880, screenSvg: scr })
    + `<rect x="770" y="1076" width="130" height="16" rx="5" fill="${K.grey}"/>`
    + (o.onDesk || '') + fig(700, 1340, s, 'trang', pose);
}
